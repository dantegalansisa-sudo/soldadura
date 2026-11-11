import { useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { CONTACT, EASE, FAQS, MARQUEE, PROCESS, PROJECTS, SECTORS, SERVICES, waLink } from '../data/site';
import { AnimatedCounter, Eyebrow, MagneticButton, RevealText, cardVariants, containerVariants } from './ui';
import { IconArrow, IconCheck, IconMedal, IconRuler, IconShield, IconSpark, IconWhatsApp, ServiceIcon } from './Icons';
import { useQuote } from '../quote';

/* ───────── Marquee ───────── */
export function Marquee() {
  const items = [...MARQUEE, ...MARQUEE];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {items.map((t, i) => (
          <span key={i}>{t}<i className="marquee__spark">✦</i></span>
        ))}
      </div>
    </div>
  );
}

/* ───────── About ───────── */
export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [-60, 60]);
  const badgeY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section id="nosotros" className="about section">
      <div className="container about__grid">
        <motion.div className="about__media" ref={ref} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }}>
          <motion.div
            className="about__img"
            variants={{ hidden: { clipPath: 'inset(0 100% 0 0)' }, show: { clipPath: 'inset(0 0% 0 0)' } }}
            transition={{ duration: 1.2, ease: EASE.premium }}
          >
            <motion.img src="/images/soldador-atardecer.webp" alt="Soldador trabajando en una estructura al atardecer" style={{ y, scale: 1.18 }} />
          </motion.div>
          <motion.div className="about__badge" style={{ y: badgeY }}>
            <strong><AnimatedCounter target={24} />h</strong>
            <span>Respuesta a tu<br />cotización</span>
          </motion.div>
          <div className="about__frame" aria-hidden="true" />
        </motion.div>

        <div className="about__copy">
          <Eyebrow>Quiénes somos</Eyebrow>
          <RevealText tag="h2" className="h2">Unimos metal. Construimos confianza.</RevealText>
          <motion.p
            className="lead"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            En <strong>ARCOS</strong> somos una empresa familiar puertorriqueña dedicada a la soldadura y fabricación metálica.
            Trabajamos cada proyecto —desde una reja hasta una estructura completa— con la misma precisión,
            puntualidad y compromiso con la seguridad de tu hogar o negocio.
          </motion.p>
          <ul className="about__checks">
            {['Trabajo residencial, comercial e industrial', 'Servicio móvil en toda la isla', 'Materiales de primera calidad', 'Garantía en mano de obra'].map((t, i) => (
              <motion.li key={t} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 + i * 0.08 }}>
                <span><IconCheck /></span>{t}
              </motion.li>
            ))}
          </ul>
          <div className="stats">
            <div className="stat"><strong><AnimatedCounter target={10} prefix="+" /></strong><span>Años de experiencia</span></div>
            <div className="stat"><strong><AnimatedCounter target={350} prefix="+" /></strong><span>Proyectos entregados</span></div>
            <div className="stat"><strong><AnimatedCounter target={78} /></strong><span>Municipios cubiertos</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────── Services ───────── */
export function Services() {
  const { requestQuote } = useQuote();
  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
  };
  return (
    <section id="servicios" className="services section section--dark">
      <div className="container">
        <div className="section-head">
          <div>
            <Eyebrow light>Nuestros servicios</Eyebrow>
            <RevealText tag="h2" className="h2 h2--light">Soldadura para cada proyecto</RevealText>
          </div>
          <motion.p className="section-head__text" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
            Desde reparaciones rápidas hasta estructuras completas. Elige tu servicio y recibe una cotización sin compromiso.
          </motion.p>
        </div>

        <motion.div className="services__grid" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
          {SERVICES.map((s, n) => (
            <motion.article key={s.id} className="service-card hover-target" variants={cardVariants} onMouseMove={onMove} whileHover={{ y: -8, transition: { duration: 0.25 } }}>
              <div className="service-card__top">
                <span className="service-card__icon"><ServiceIcon name={s.icon} /></span>
                <span className="service-card__num">{String(n + 1).padStart(2, '0')}</span>
              </div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <div className="service-card__tags">
                {s.tags.map((t) => <span key={t}>{t}</span>)}
              </div>
              <button className="service-card__cta" onClick={() => requestQuote(s.id)}>
                Cotizar este servicio <IconArrow />
              </button>
              <i className="service-card__bead" aria-hidden="true" />
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ───────── Mid CTA strip ───────── */
export function CtaStrip() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-15%', '15%']);
  const { requestQuote } = useQuote();
  return (
    <section className="cta-strip" ref={ref}>
      <motion.div className="cta-strip__bg" style={{ y }}>
        <img src="/images/taller-chispas.webp" alt="" />
      </motion.div>
      <div className="container cta-strip__inner">
        <div>
          <RevealText tag="h2" className="cta-strip__title">¿Tienes un proyecto en mente?</RevealText>
          <p>Cuéntanos qué necesitas. La cotización es <strong>gratis</strong> y sin compromiso.</p>
        </div>
        <div className="cta-strip__actions">
          <MagneticButton className="btn btn--amber btn--lg" onClick={() => requestQuote()}>
            Cotizar ahora <IconArrow />
          </MagneticButton>
          <a className="btn btn--ghost" href={waLink('Hola ARCOS, tengo un proyecto y quiero una cotización.')} target="_blank" rel="noopener noreferrer">
            <IconWhatsApp size={18} /> Escríbenos
          </a>
        </div>
      </div>
    </section>
  );
}

/* ───────── Process ───────── */
export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 55%'] });
  const fill = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });
  const left = useTransform(fill, (v) => `${v * 100}%`);
  return (
    <section id="proceso" className="process section section--light">
      <div className="container">
        <div className="section-head section-head--center">
          <Eyebrow>Cómo trabajamos</Eyebrow>
          <RevealText tag="h2" className="h2">Del primer contacto al último cordón</RevealText>
        </div>
        <div className="process__track" ref={ref}>
          <div className="process__line" aria-hidden="true">
            <motion.span style={{ scaleX: fill }} />
            <motion.i className="process__torch" style={{ left }} />
          </div>
          <motion.div className="process__grid" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
            {PROCESS.map((p) => (
              <motion.div key={p.n} className="process__step" variants={cardVariants}>
                <span className="process__num">{p.n}</span>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ───────── Projects ───────── */
export function Projects() {
  return (
    <section id="proyectos" className="projects section section--dark">
      <div className="container">
        <div className="section-head">
          <div>
            <Eyebrow light>Trabajos</Eyebrow>
            <RevealText tag="h2" className="h2 h2--light">Proyectos con chispa</RevealText>
          </div>
          <a className="link-arrow" href={CONTACT.instagram} target="_blank" rel="noopener noreferrer">
            Ver más en Instagram <IconArrow dir="up-right" />
          </a>
        </div>
        <motion.div className="projects__grid" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
          {PROJECTS.map((p) => (
            <motion.figure key={p.title} className={`project project--${p.size} hover-target`} variants={cardVariants}>
              <img src={p.img} alt={p.title} loading="lazy" />
              <figcaption>
                <small>{p.cat}</small>
                <span>{p.title}</span>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ───────── Safety / helmet ───────── */
export function Safety() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const rotate = useTransform(scrollYProgress, [0, 1], [-18, 14]);
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1, 0.95]);
  const bigX = useTransform(scrollYProgress, [0, 1], ['10%', '-30%']);

  const points = [
    { icon: <IconShield />, title: 'Seguridad primero', desc: 'Equipo de protección, áreas delimitadas y prácticas seguras en cada trabajo.' },
    { icon: <IconRuler />, title: 'Precisión milimétrica', desc: 'Medimos dos veces y soldamos una. Piezas que encajan a la primera.' },
    { icon: <IconSpark />, title: 'Cordones limpios', desc: 'Uniones fuertes, parejas y con un acabado que se nota.' },
    { icon: <IconMedal />, title: 'Garantía real', desc: 'Respaldamos nuestro trabajo con garantía en mano de obra.' },
  ];

  return (
    <section className="safety" ref={ref}>
      <motion.div className="safety__big" style={{ x: bigX }} aria-hidden="true">PRECISIÓN · SEGURIDAD · PRECISIÓN</motion.div>
      <div className="container safety__grid">
        <div className="safety__copy">
          <Eyebrow>Por qué ARCOS</Eyebrow>
          <RevealText tag="h2" className="h2">Detrás de cada careta, un compromiso</RevealText>
          <motion.div className="safety__points" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
            {points.map((p) => (
              <motion.div key={p.title} className="safety__point" variants={cardVariants}>
                <span className="safety__icon">{p.icon}</span>
                <div>
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
        <div className="safety__visual">
          <motion.div className="safety__helmet" style={{ rotate, y, scale }}>
            <img src="/images/helmet.webp" alt="Careta de soldar" loading="lazy" />
            <span className="safety__visor" aria-hidden="true" />
          </motion.div>
          <div className="safety__ring" aria-hidden="true" />
        </div>
      </div>
      <div className="sectors">
        <span className="sectors__label">Sectores que servimos</span>
        <div className="sectors__list">
          {SECTORS.map((s) => <span key={s}>{s}</span>)}
        </div>
      </div>
    </section>
  );
}

/* ───────── FAQ ───────── */
export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const { requestQuote } = useQuote();
  return (
    <section id="faq" className="faq section section--light">
      <div className="container faq__grid">
        <div className="faq__head">
          <Eyebrow>Preguntas frecuentes</Eyebrow>
          <RevealText tag="h2" className="h2">Lo que más nos preguntan</RevealText>
          <p className="lead">¿No encuentras tu respuesta? Escríbenos y te contestamos el mismo día.</p>
          <div className="faq__ctas">
            <MagneticButton className="btn btn--dark" onClick={() => requestQuote()}>Pedir cotización <IconArrow /></MagneticButton>
          </div>
        </div>
        <div className="faq__list">
          {FAQS.map((f, n) => (
            <div key={f.q} className={`faq__item ${open === n ? 'is-open' : ''}`}>
              <button onClick={() => setOpen(open === n ? null : n)} aria-expanded={open === n}>
                <span>{f.q}</span>
                <i aria-hidden="true" />
              </button>
              <AnimatePresence initial={false}>
                {open === n && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: EASE.smooth }}
                    className="faq__answer"
                  >
                    <p>{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
