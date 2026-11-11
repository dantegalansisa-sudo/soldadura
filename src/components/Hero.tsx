import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import { CONTACT, EASE, HERO_SLIDES, waLink } from '../data/site';
import Sparks from './Sparks';
import { IconArrow, IconWhatsApp } from './Icons';
import { MagneticButton } from './ui';
import { useQuote } from '../quote';

const AUTOPLAY = 7000;

export default function Hero({ ready }: { ready: boolean }) {
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(false);
  const slide = HERO_SLIDES[i];
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLDivElement | null>(null);
  const setImg = useCallback((el: HTMLDivElement | null) => { if (el) imgRef.current = el; }, []);
  const { requestQuote } = useQuote();

  const go = useCallback((n: number) => {
    setDir(n > i || (i === HERO_SLIDES.length - 1 && n === 0) ? 1 : -1);
    setI((n + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, [i]);

  useEffect(() => {
    if (!ready || paused) return;
    const t = setTimeout(() => go(i + 1), AUTOPLAY);
    return () => clearTimeout(t);
  }, [i, ready, paused, go]);

  // pointer tilt
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [5, -5]), { stiffness: 120, damping: 20 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-7, 7]), { stiffness: 120, damping: 20 });
  const tx = useSpring(useTransform(mx, [-0.5, 0.5], [-18, 18]), { stiffness: 120, damping: 20 });
  const titleX = useSpring(useTransform(mx, [-0.5, 0.5], [14, -14]), { stiffness: 80, damping: 20 });

  const onMove = (e: React.MouseEvent) => {
    const r = sectionRef.current!.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  // scroll parallax
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const visualY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const visualScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const letters = 'ARCOS'.split('');

  return (
    <section
      id="inicio"
      ref={sectionRef}
      className={`hero hero--${slide.key}`}
      onMouseMove={onMove}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => { setPaused(false); mx.set(0); my.set(0); }}
    >
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__grid" />
        <motion.div
          className="hero__block"
          initial={{ scaleY: 0 }}
          animate={ready ? { scaleY: 1 } : {}}
          transition={{ duration: 1.1, delay: 0.25, ease: EASE.cinematic }}
        />
      </div>

      {/* Vertical side label + dots (Mustang style) */}
      <motion.aside className="hero__side" style={{ opacity: fade }}>
        <span className="hero__vertical">Soldadura profesional · Puerto Rico</span>
        <div className="hero__dots">
          {HERO_SLIDES.map((s, n) => (
            <button key={s.key} className={n === i ? 'is-active' : ''} onClick={() => go(n)} aria-label={`Ver ${s.tab}`} />
          ))}
        </div>
      </motion.aside>

      {/* Tabs (year-selector style) */}
      <motion.div
        className="hero__tabs"
        initial={{ opacity: 0, y: -20 }}
        animate={ready ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.7, ease: EASE.smooth }}
      >
        <button className="hero__tab-arrow" onClick={() => go(i - 1)} aria-label="Anterior"><IconArrow dir="left" /></button>
        {HERO_SLIDES.map((s, n) => (
          <button key={s.key} className={`hero__tab ${n === i ? 'is-active' : ''}`} onClick={() => go(n)}>
            {s.tab}
            {n === i && (
              <motion.span
                className="hero__tab-line"
                layoutId="tabline"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              >
                <motion.i
                  key={`${i}-${paused}`}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: paused ? 0 : 1 }}
                  transition={{ duration: paused ? 0.2 : AUTOPLAY / 1000, ease: 'linear' }}
                />
              </motion.span>
            )}
          </button>
        ))}
        <button className="hero__tab-arrow" onClick={() => go(i + 1)} aria-label="Siguiente"><IconArrow /></button>
      </motion.div>

      {/* Giant title */}
      <motion.div className="hero__title-wrap" style={{ y: titleY, x: titleX }}>
        <AnimatePresence mode="wait">
          <motion.p
            key={slide.eyebrow}
            className="hero__eyebrow"
            initial={{ opacity: 0, y: 14 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.45, ease: EASE.smooth, delay: ready ? 0.1 : 0 }}
          >
            {slide.eyebrow}
          </motion.p>
        </AnimatePresence>
        <h1 className="hero__title" aria-label="ARCOS — Soldadura y fabricación metálica">
          {letters.map((l, n) => (
            <span key={n} className="hero__letter-mask" aria-hidden="true">
              <motion.span
                className="hero__letter"
                initial={{ y: '105%' }}
                animate={ready ? { y: 0 } : {}}
                transition={{ duration: 1, delay: 0.45 + n * 0.08, ease: EASE.premium }}
              >
                {l}
              </motion.span>
            </span>
          ))}
        </h1>
      </motion.div>

      {/* Cutout visual */}
      <motion.div className="hero__visual" style={{ y: visualY, scale: visualScale }}>
        <motion.div className="hero__tilt" style={{ rotateX: rx, rotateY: ry, x: tx }}>
          <AnimatePresence mode="popLayout" custom={dir} initial={false}>
            <motion.div
              key={slide.key}
              ref={setImg}
              className={`hero__img hero__img--${slide.key}`}
              custom={dir}
              initial={ready ? { opacity: 0, x: dir * 160, filter: 'blur(10px)' } : { opacity: 0, y: 120 }}
              animate={ready ? { opacity: 1, x: 0, y: 0, filter: 'blur(0px)' } : {}}
              exit={{ opacity: 0, x: dir * -160, filter: 'blur(10px)' }}
              transition={{ duration: 0.9, ease: EASE.premium, delay: ready && i === 0 ? 0.55 : 0 }}
            >
              <img src={slide.image} alt={slide.imageAlt} draggable={false} />
            </motion.div>
          </AnimatePresence>
          <div className="hero__shadow" aria-hidden="true" />
        </motion.div>
      </motion.div>

      {ready && <Sparks anchorRef={imgRef} point={slide.torch} className="hero__sparks" />}

      {/* Right side arrows */}
      <motion.div className="hero__arrows" style={{ opacity: fade }}>
        <button onClick={() => go(i + 1)} aria-label="Siguiente"><IconArrow /></button>
        <button onClick={() => go(i - 1)} aria-label="Anterior"><IconArrow dir="left" /></button>
      </motion.div>

      {/* Copy on amber block */}
      <motion.div
        className="hero__copy"
        initial={{ opacity: 0, y: 30 }}
        animate={ready ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 1.1, ease: EASE.smooth }}
      >
        <AnimatePresence mode="wait">
          <motion.p
            key={slide.key}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
          >
            {slide.desc}
          </motion.p>
        </AnimatePresence>
        <div className="hero__ctas">
          <MagneticButton className="btn btn--dark" onClick={() => requestQuote(slide.key === 'movil' ? 'movil' : slide.key === 'tig' ? 'tig' : 'estructural')}>
            Solicitar cotización <IconArrow />
          </MagneticButton>
          <a className="btn btn--ghost-dark" href={waLink(`Hola ${CONTACT.brand}, quiero información sobre ${slide.eyebrow.toLowerCase()}.`)} target="_blank" rel="noopener noreferrer">
            <IconWhatsApp size={18} /> WhatsApp
          </a>
        </div>
      </motion.div>

      {/* Spec bar */}
      <motion.div
        className="hero__specs"
        initial={{ y: 60, opacity: 0 }}
        animate={ready ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.9, delay: 1.25, ease: EASE.premium }}
      >
        <a href="#servicios" className="hero__scroll" aria-label="Ver servicios">
          <span />
        </a>
        <div className="hero__spec-list">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.key}
              className="hero__spec-row"
              initial="hidden"
              animate="show"
              exit="hide"
              variants={{ show: { transition: { staggerChildren: 0.05 } }, hide: { transition: { staggerChildren: 0.03 } } }}
            >
              {slide.specs.map((s) => (
                <motion.div
                  key={s.label}
                  className="hero__spec"
                  variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 }, hide: { opacity: 0, y: -10 } }}
                  transition={{ duration: 0.35 }}
                >
                  <small>{s.label}</small>
                  <strong>{s.value} {s.unit && <em>{s.unit}</em>}</strong>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
        <a href="#proyectos" className="hero__thumb" aria-label={slide.thumbLabel}>
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.img
              key={slide.thumb}
              src={slide.thumb}
              alt=""
              initial={{ opacity: 0, scale: 1.2 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            />
          </AnimatePresence>
          <span className="hero__thumb-play"><IconArrow dir="up-right" /></span>
        </a>
      </motion.div>
    </section>
  );
}
