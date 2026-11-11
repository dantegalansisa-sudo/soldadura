import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { EASE } from '../data/site';

/* ───────── Custom cursor ───────── */
export function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { damping: 25, stiffness: 250 });
  const sy = useSpring(y, { damping: 25, stiffness: 250 });
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as HTMLElement | null;
      setHover(!!t?.closest('a, button, input, select, textarea, label, .hover-target'));
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, [x, y]);

  return (
    <>
      <motion.div className="cursor-dot" style={{ x, y }} />
      <motion.div className={`cursor-ring ${hover ? 'cursor--hover' : ''}`} style={{ x: sx, y: sy }} />
    </>
  );
}

/* ───────── Reveal text (word mask) ───────── */
interface RevealTextProps {
  children: string;
  className?: string;
  delay?: number;
  tag?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  animateNow?: boolean;
}
export function RevealText({ children, className = '', delay = 0, tag = 'h2', animateNow }: RevealTextProps) {
  const MotionTag = motion[tag];
  const words = children.split(' ');
  return (
    <MotionTag
      className={`reveal-text ${className}`}
      aria-label={children}
      initial="hidden"
      {...(animateNow ? { animate: 'show' } : { whileInView: 'show', viewport: { once: true, amount: 0.3 } })}
    >
      {words.map((word, i) => (
        <span key={i} className="reveal-mask" aria-hidden="true">
          <motion.span
            style={{ display: 'inline-block' }}
            variants={{ hidden: { y: '110%', rotate: 3 }, show: { y: 0, rotate: 0 } }}
            transition={{ duration: 0.9, delay: delay + i * 0.07, ease: EASE.premium }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </MotionTag>
  );
}

/* ───────── Magnetic button ───────── */
interface MagneticProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  strength?: number;
  target?: string;
  type?: 'button' | 'submit';
  ariaLabel?: string;
}
export function MagneticButton({ children, href, onClick, className = '', strength = 0.35, target, type = 'button', ariaLabel }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const move = (e: React.MouseEvent) => {
    const r = ref.current!.getBoundingClientRect();
    setPos({ x: (e.clientX - (r.left + r.width / 2)) * strength, y: (e.clientY - (r.top + r.height / 2)) * strength });
  };
  return (
    <div ref={ref} className="magnetic" onMouseMove={move} onMouseLeave={() => setPos({ x: 0, y: 0 })}>
      <motion.div animate={pos} transition={{ type: 'spring', stiffness: 200, damping: 18 }}>
        {href ? (
          <a href={href} className={className} target={target} rel={target ? 'noopener noreferrer' : undefined} onClick={onClick} aria-label={ariaLabel}>
            {children}
          </a>
        ) : (
          <button type={type} className={className} onClick={onClick} aria-label={ariaLabel}>
            {children}
          </button>
        )}
      </motion.div>
    </div>
  );
}

/* ───────── Animated counter ───────── */
export function AnimatedCounter({ target, suffix = '', prefix = '', duration = 1800 }: { target: number; suffix?: string; prefix?: string; duration?: number }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, duration]);
  return <span ref={ref}>{prefix}{n.toLocaleString('es-PR')}{suffix}</span>;
}

/* ───────── Stagger variants ───────── */
export const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};
export const cardVariants = {
  hidden: { opacity: 0, y: 48, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: EASE.premium } },
};

/* ───────── Section eyebrow ───────── */
export function Eyebrow({ children, light }: { children: React.ReactNode; light?: boolean }) {
  return (
    <motion.span
      className={`eyebrow ${light ? 'eyebrow--light' : ''}`}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: EASE.smooth }}
    >
      <i className="eyebrow__arc" />
      {children}
    </motion.span>
  );
}
