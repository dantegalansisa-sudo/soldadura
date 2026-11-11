import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CONTACT, EASE } from '../data/site';
import { IconPhone } from './Icons';
import { MagneticButton } from './ui';

const LINKS = [
  { href: '#servicios', label: 'Servicios' },
  { href: '#nosotros', label: 'Nosotros' },
  { href: '#proceso', label: 'Proceso' },
  { href: '#proyectos', label: 'Proyectos' },
  { href: '#faq', label: 'FAQ' },
];

export function Logo() {
  return (
    <a href="#inicio" className="logo" aria-label="ARCOS inicio">
      <svg viewBox="0 0 40 40" className="logo__mark" aria-hidden="true">
        <path d="M6 33 L20 7 L34 33" fill="none" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 33 Q20 20 28 33" fill="none" stroke="var(--orange)" strokeWidth="3" strokeLinecap="round" />
        <circle cx="20" cy="27" r="2.6" fill="var(--amber)" className="logo__spark" />
      </svg>
      <span className="logo__text">
        <strong>ARCOS</strong>
        <small>Welding · Puerto Rico</small>
      </span>
    </a>
  );
}

export default function Navbar({ ready }: { ready: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);

  return (
    <>
      <motion.header
        className={`nav ${scrolled ? 'nav--scrolled' : ''}`}
        initial={{ y: -80, opacity: 0 }}
        animate={ready ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.2, ease: EASE.premium }}
      >
        <div className="nav__inner">
          <Logo />
          <nav className="nav__links" aria-label="Principal">
            {LINKS.map((l) => (
              <a key={l.href} href={l.href} className="nav__link">
                <span data-text={l.label}>{l.label}</span>
              </a>
            ))}
          </nav>
          <div className="nav__actions">
            <a href={CONTACT.phoneHref} className="nav__phone">
              <IconPhone /> <span>{CONTACT.phone}</span>
            </a>
            <MagneticButton href="#cotizar" className="btn btn--amber btn--sm">
              Cotizar
            </MagneticButton>
            <button className={`burger ${open ? 'is-open' : ''}`} onClick={() => setOpen(!open)} aria-label="Abrir menú" aria-expanded={open}>
              <span /><span /><span />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-menu"
            initial={{ clipPath: 'circle(0% at 92% 4%)' }}
            animate={{ clipPath: 'circle(150% at 92% 4%)' }}
            exit={{ clipPath: 'circle(0% at 92% 4%)' }}
            transition={{ duration: 0.7, ease: EASE.premium }}
          >
            <nav>
              {[...LINKS, { href: '#cotizar', label: 'Cotizar' }].map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 + i * 0.06, duration: 0.5, ease: EASE.smooth }}
                >
                  <small>0{i + 1}</small>
                  {l.label}
                </motion.a>
              ))}
            </nav>
            <div className="mobile-menu__foot">
              <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
              <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
