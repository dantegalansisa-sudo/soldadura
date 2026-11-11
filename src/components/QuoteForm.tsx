import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CONTACT, EASE, SERVICES, waLink } from '../data/site';
import { Eyebrow, MagneticButton, RevealText } from './ui';
import { IconArrow, IconCheck, IconClock, IconInstagram, IconMail, IconPhone, IconPin, IconWhatsApp } from './Icons';
import { useQuote } from '../quote';

const PROJECT_TYPES = ['Residencial', 'Comercial', 'Industrial', 'Agrícola / Finca', 'Marino'];
const MATERIALS = ['Acero / Hierro', 'Acero galvanizado', 'Acero inoxidable', 'Aluminio', 'No estoy seguro'];
const URGENCY = ['Lo antes posible', 'Esta semana', 'Este mes', 'Solo explorando precios'];
const CONTACT_PREF = ['WhatsApp', 'Llamada', 'Correo'];

interface FormState {
  name: string; phone: string; email: string; town: string;
  service: string; type: string; material: string; urgency: string;
  pref: string; details: string; visit: boolean;
}

const EMPTY: FormState = {
  name: '', phone: '', email: '', town: '',
  service: '', type: 'Residencial', material: 'No estoy seguro', urgency: 'Esta semana',
  pref: 'WhatsApp', details: '', visit: true,
};

export default function QuoteForm() {
  const { service } = useQuote();
  const [f, setF] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (service) setF((s) => ({ ...s, service }));
  }, [service]);

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) => {
    setF((s) => ({ ...s, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const serviceTitle = SERVICES.find((s) => s.id === f.service)?.title ?? 'Otro / No estoy seguro';

  const buildMessage = () =>
    [
      `*Solicitud de cotización — ${CONTACT.brand}*`,
      '',
      `👤 Nombre: ${f.name}`,
      `📞 Teléfono: ${f.phone}`,
      f.email ? `✉️ Correo: ${f.email}` : false,
      `📍 Municipio: ${f.town}`,
      '',
      `🔧 Servicio: ${serviceTitle}`,
      `🏗️ Tipo de proyecto: ${f.type}`,
      `🔩 Material: ${f.material}`,
      `⏱️ Urgencia: ${f.urgency}`,
      `📅 Visita para medir: ${f.visit ? 'Sí' : 'No'}`,
      `💬 Prefiero contacto por: ${f.pref}`,
      '',
      `📝 Detalles: ${f.details}`,
    ].filter((l): l is string => typeof l === 'string').join('\n');

  const validate = () => {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (f.name.trim().length < 2) e.name = 'Escribe tu nombre';
    if (f.phone.replace(/\D/g, '').length < 10) e.phone = 'Teléfono de 10 dígitos';
    if (f.email && !/^\S+@\S+\.\S+$/.test(f.email)) e.email = 'Correo no válido';
    if (f.town.trim().length < 2) e.town = '¿En qué municipio?';
    if (!f.service) e.service = 'Elige un servicio';
    if (f.details.trim().length < 10) e.details = 'Cuéntanos un poco más (medidas, cantidad, etc.)';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    window.open(waLink(buildMessage()), '_blank', 'noopener');
    setSent(true);
  };

  const mailto = () => {
    if (!validate()) return;
    const subject = encodeURIComponent(`Cotización: ${serviceTitle} — ${f.name}`);
    const body = encodeURIComponent(buildMessage().replace(/\*/g, ''));
    window.location.href = `mailto:${CONTACT.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <section id="cotizar" className="quote section section--dark">
      <div className="quote__glow" aria-hidden="true" />
      <div className="container quote__grid">
        <div className="quote__info">
          <Eyebrow light>Cotización gratis</Eyebrow>
          <RevealText tag="h2" className="h2 h2--light">Cuéntanos tu proyecto</RevealText>
          <p className="lead lead--light">
            Llena el formulario y recibe tu estimado en <strong>24 horas</strong>. Mientras más detalles nos des
            (medidas, fotos, material), más precisa será tu cotización.
          </p>

          <ul className="quote__contact">
            <li><span><IconWhatsApp size={18} /></span><a href={waLink('Hola ARCOS, quiero una cotización.')} target="_blank" rel="noopener noreferrer"><small>WhatsApp</small>{CONTACT.phone}</a></li>
            <li><span><IconPhone /></span><a href={CONTACT.phoneHref}><small>Llámanos</small>{CONTACT.phone}</a></li>
            <li><span><IconMail /></span><a href={`mailto:${CONTACT.email}`}><small>Correo</small>{CONTACT.email}</a></li>
            <li><span><IconPin /></span><div><small>Área de servicio</small>Toda la isla de {CONTACT.location}</div></li>
            <li><span><IconClock /></span><div><small>Horario</small>{CONTACT.hours}</div></li>
            <li><span><IconInstagram /></span><a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer"><small>Instagram</small>{CONTACT.instagramHandle}</a></li>
          </ul>
          <div className="quote__person">
            <span className="quote__avatar">G</span>
            <div><strong>{CONTACT.person}</strong><small>Te atiende directamente</small></div>
          </div>
        </div>

        <motion.div
          className="quote__card"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.9, ease: EASE.premium }}
        >
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div key="ok" className="quote__success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
                <span className="quote__success-icon"><IconCheck /></span>
                <h3>¡Solicitud lista!</h3>
                <p>Abrimos WhatsApp (o tu correo) con todos los detalles. Solo presiona <strong>enviar</strong> y {CONTACT.person} te contactará pronto.</p>
                <button className="btn btn--ghost" onClick={() => { setSent(false); setF(EMPTY); }}>Nueva cotización</button>
              </motion.div>
            ) : (
              <motion.form key="form" onSubmit={submit} noValidate initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="quote__card-head">
                  <h3>Solicitar cotización</h3>
                  <span>Paso único · 2 min</span>
                </div>

                <fieldset className="field field--full">
                  <legend>¿Qué servicio necesitas? *</legend>
                  <div className="chips">
                    {SERVICES.map((s) => (
                      <button type="button" key={s.id} className={`chip ${f.service === s.id ? 'is-active' : ''}`} onClick={() => set('service', s.id)}>
                        {s.title}
                      </button>
                    ))}
                    <button type="button" className={`chip ${f.service === 'otro' ? 'is-active' : ''}`} onClick={() => set('service', 'otro')}>Otro</button>
                  </div>
                  {errors.service && <em className="field__err">{errors.service}</em>}
                </fieldset>

                <div className="form-grid">
                  <Field label="Nombre completo *" err={errors.name}>
                    <input value={f.name} onChange={(e) => set('name', e.target.value)} placeholder="Tu nombre" autoComplete="name" />
                  </Field>
                  <Field label="Teléfono *" err={errors.phone}>
                    <input value={f.phone} onChange={(e) => set('phone', e.target.value)} placeholder="(787) 000-0000" inputMode="tel" autoComplete="tel" />
                  </Field>
                  <Field label="Correo (opcional)" err={errors.email}>
                    <input value={f.email} onChange={(e) => set('email', e.target.value)} placeholder="tu@correo.com" inputMode="email" autoComplete="email" />
                  </Field>
                  <Field label="Municipio *" err={errors.town}>
                    <input value={f.town} onChange={(e) => set('town', e.target.value)} placeholder="Ej. Bayamón" autoComplete="address-level2" />
                  </Field>
                  <Field label="Tipo de proyecto">
                    <select value={f.type} onChange={(e) => set('type', e.target.value)}>{PROJECT_TYPES.map((o) => <option key={o}>{o}</option>)}</select>
                  </Field>
                  <Field label="Material">
                    <select value={f.material} onChange={(e) => set('material', e.target.value)}>{MATERIALS.map((o) => <option key={o}>{o}</option>)}</select>
                  </Field>
                  <Field label="¿Para cuándo?">
                    <select value={f.urgency} onChange={(e) => set('urgency', e.target.value)}>{URGENCY.map((o) => <option key={o}>{o}</option>)}</select>
                  </Field>
                  <Field label="Prefiero que me contacten por">
                    <select value={f.pref} onChange={(e) => set('pref', e.target.value)}>{CONTACT_PREF.map((o) => <option key={o}>{o}</option>)}</select>
                  </Field>
                  <Field label="Describe tu proyecto *" err={errors.details} full>
                    <textarea rows={4} value={f.details} onChange={(e) => set('details', e.target.value)} placeholder="Ej. Portón corredizo de 14 pies de ancho con motor, en acero galvanizado y pintura negra." />
                  </Field>
                </div>

                <label className="toggle">
                  <input type="checkbox" checked={f.visit} onChange={(e) => set('visit', e.target.checked)} />
                  <span className="toggle__ui" />
                  Quiero una visita para tomar medidas
                </label>

                <div className="quote__actions">
                  <MagneticButton type="submit" className="btn btn--amber btn--lg btn--block" strength={0.15}>
                    <IconWhatsApp size={18} /> Enviar por WhatsApp
                  </MagneticButton>
                  <button type="button" className="btn btn--ghost" onClick={mailto}>
                    Enviar por correo <IconArrow />
                  </button>
                </div>
                <p className="quote__note">Tus datos solo se usan para preparar tu cotización. Puedes enviarnos fotos por WhatsApp.</p>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

function Field({ label, err, full, children }: { label: string; err?: string; full?: boolean; children: React.ReactNode }) {
  return (
    <label className={`field ${full ? 'field--full' : ''} ${err ? 'has-err' : ''}`}>
      <span>{label}</span>
      {children}
      {err && <em className="field__err">{err}</em>}
    </label>
  );
}
