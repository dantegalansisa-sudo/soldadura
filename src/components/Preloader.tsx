import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Sparks from './Sparks';
import { EASE } from '../data/site';

export default function Preloader({ onDone }: { onDone: () => void }) {
  const [pct, setPct] = useState(0);
  const [lit, setLit] = useState(false);
  const helmetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const start = performance.now();
    const dur = 2100;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      setPct(Math.round(p * 100));
      if (p > 0.25) setLit(true);
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(onDone, 250);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  return (
    <motion.div
      className="preloader"
      initial={{ clipPath: 'inset(0 0 0% 0)' }}
      exit={{ clipPath: 'inset(0 0 100% 0)' }}
      transition={{ duration: 0.9, ease: EASE.cinematic }}
    >
      <div className="preloader__stage">
        <motion.div
          ref={helmetRef}
          className="preloader__helmet"
          initial={{ y: 40, opacity: 0, rotate: -8 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          transition={{ duration: 0.9, ease: EASE.premium }}
        >
          <img src="/images/helmet.webp" alt="" />
          <span className={`preloader__visor ${lit ? 'is-lit' : ''}`} />
        </motion.div>
        {lit && <Sparks anchorRef={helmetRef} point={{ x: 0.08, y: 0.98 }} rate={2.4} />}
      </div>
      <div className="preloader__meta">
        <span className="preloader__brand">ARCOS</span>
        <span className="preloader__pct">{String(pct).padStart(3, '0')}</span>
      </div>
      <div className="preloader__bar"><span style={{ transform: `scaleX(${pct / 100})` }} /></div>
    </motion.div>
  );
}
