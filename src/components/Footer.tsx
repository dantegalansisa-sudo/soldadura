import { motion } from 'framer-motion';
import { CONTACT, SERVICES, waLink } from '../data/site';
import { Logo } from './Navbar';
import { IconArrow, IconInstagram, IconMail, IconPhone, IconWhatsApp } from './Icons';
import { useQuote } from '../quote';

export default function Footer() {
  const { requestQuote } = useQuote();
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <Logo />
            <p>Soldadura y fabricación metálica con precisión, seguridad y compromiso. Empresa familiar al servicio de todo Puerto Rico.</p>
            <div className="footer__social">
              <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><IconInstagram /></a>
              <a href={waLink('Hola ARCOS')} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><IconWhatsApp size={18} /></a>
              <a href={`mailto:${CONTACT.email}`} aria-label="Correo"><IconMail /></a>
              <a href={CONTACT.phoneHref} aria-label="Llamar"><IconPhone /></a>
            </div>
          </div>
          <div className="footer__col">
            <h4>Servicios</h4>
            {SERVICES.slice(0, 6).map((s) => (
              <button key={s.id} onClick={() => requestQuote(s.id)}>{s.title}</button>
            ))}
          </div>
          <div className="footer__col">
            <h4>Empresa</h4>
            <a href="#nosotros">Nosotros</a>
            <a href="#proceso">Proceso</a>
            <a href="#proyectos">Proyectos</a>
            <a href="#faq">Preguntas frecuentes</a>
            <a href="#cotizar">Cotizar</a>
          </div>
          <div className="footer__col">
            <h4>Contacto</h4>
            <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
            <a href={`mailto:${CONTACT.email}`} className="footer__email">{CONTACT.email}</a>
            <span>{CONTACT.hours}</span>
            <span>Servicio en todo {CONTACT.location}</span>
          </div>
        </div>

        <motion.a
          href="#cotizar"
          className="footer__giant hover-target"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <span>ARCOS</span>
          <i><IconArrow dir="up-right" /></i>
        </motion.a>

        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} ARCOS · Soldadura & Fabricación. Todos los derechos reservados.</span>
          <a href="#inicio">Volver arriba ↑</a>
        </div>
      </div>
    </footer>
  );
}

export function WhatsAppFloat() {
  return (
    <motion.a
      className="wa-float"
      href={waLink('Hola ARCOS, quiero una cotización.')}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 3, type: 'spring', stiffness: 260, damping: 18 }}
    >
      <IconWhatsApp size={26} />
      <span className="wa-float__tip">¿Cotizamos tu proyecto?</span>
    </motion.a>
  );
}
