import { useEffect, useRef } from 'react';

interface SparksProps {
  /** element the emitter is anchored to */
  anchorRef: React.RefObject<HTMLElement>;
  /** emitter position relative to the anchor box (0-1) */
  point: { x: number; y: number };
  /** particles per frame (average) */
  rate?: number;
  className?: string;
  glow?: boolean;
}

interface P {
  x: number; y: number; vx: number; vy: number;
  life: number; max: number; w: number;
}

const reduced = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function Sparks({ anchorRef, point, rate = 3.2, className = '', glow = true }: SparksProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointRef = useRef(point);
  pointRef.current = point;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = 0, h = 0, dpr = 1;
    const resize = () => {
      const r = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width; h = r.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let visible = true;
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    io.observe(canvas);

    const parts: P[] = [];
    const still = reduced();
    let raf = 0;
    let t = 0;
    let burst = 0;

    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (!visible) return;
      t++;
      ctx.clearRect(0, 0, w, h);

      const anchor = anchorRef.current;
      if (!anchor) return;
      const cr = canvas.getBoundingClientRect();
      const ar = anchor.getBoundingClientRect();
      const ox = ar.left - cr.left + ar.width * pointRef.current.x;
      const oy = ar.top - cr.top + ar.height * pointRef.current.y;
      const scale = Math.max(0.55, Math.min(1.3, ar.width / 700));

      // flickering arc: random bursts
      if (Math.random() < 0.04) burst = 10 + Math.random() * 18;
      const emit = still ? 0 : rate * (0.4 + Math.random() * 1.2) + (burst > 0 ? 6 : 0);
      if (burst > 0) burst--;

      for (let i = 0; i < emit; i++) {
        const a = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 1.85;
        const s = (2 + Math.random() * 8.5) * scale;
        parts.push({
          x: ox, y: oy,
          vx: Math.cos(a) * s,
          vy: Math.sin(a) * s - Math.random() * 1.5,
          life: 0,
          max: 26 + Math.random() * 46,
          w: 0.6 + Math.random() * 1.6,
        });
      }

      ctx.globalCompositeOperation = 'lighter';

      if (glow && !still) {
        const flick = 0.75 + Math.random() * 0.35 + (burst > 0 ? 0.3 : 0);
        const R = 90 * scale * flick;
        const g = ctx.createRadialGradient(ox, oy, 0, ox, oy, R);
        g.addColorStop(0, 'rgba(255,255,240,0.95)');
        g.addColorStop(0.12, 'rgba(255,220,140,0.65)');
        g.addColorStop(0.4, 'rgba(255,140,40,0.22)');
        g.addColorStop(1, 'rgba(255,100,20,0)');
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(ox, oy, R, 0, Math.PI * 2); ctx.fill();
      }

      for (let i = parts.length - 1; i >= 0; i--) {
        const p = parts[i];
        p.life++;
        p.vy += 0.2 * scale;
        p.vx *= 0.985;
        p.x += p.vx; p.y += p.vy;
        const k = p.life / p.max;
        if (k >= 1 || p.y > h + 20) { parts.splice(i, 1); continue; }
        const hue = 50 - k * 32;
        const light = 92 - k * 45;
        ctx.strokeStyle = `hsla(${hue},100%,${light}%,${1 - k * 0.85})`;
        ctx.lineWidth = p.w * (1 - k * 0.5);
        ctx.beginPath();
        ctx.moveTo(p.x - p.vx * 2.4, p.y - p.vy * 2.4);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();
      }
      if (parts.length > 900) parts.splice(0, parts.length - 900);
      ctx.globalCompositeOperation = 'source-over';
    };
    loop();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, [anchorRef, rate, glow]);

  return <canvas ref={canvasRef} className={`sparks-canvas ${className}`} aria-hidden="true" />;
}
