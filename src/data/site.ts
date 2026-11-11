export const CONTACT = {
  brand: 'ARCOS',
  tagline: 'Soldadura & Fabricación Metálica',
  person: 'Gamaliel',
  phone: '(939) 428-2133',
  phoneHref: 'tel:+19394282133',
  whatsapp: '19394282133',
  email: 'gamalielconcepcion1@gmail.com',
  instagram: 'https://www.instagram.com/arcos.family',
  instagramHandle: '@arcos.family',
  location: 'Puerto Rico',
  hours: 'Lun – Sáb · 7:00 AM – 6:00 PM',
};

export const waLink = (text: string) =>
  `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(text)}`;

export const EASE = {
  premium: [0.76, 0, 0.24, 1] as [number, number, number, number],
  smooth: [0.25, 0.8, 0.25, 1] as [number, number, number, number],
  cinematic: [0.86, 0, 0.07, 1] as [number, number, number, number],
};

export interface HeroSlide {
  key: string;
  tab: string;
  eyebrow: string;
  desc: string;
  image: string;
  imageAlt: string;
  /** torch point relative to the image box, for the spark emitter */
  torch: { x: number; y: number };
  thumb: string;
  thumbLabel: string;
  specs: { label: string; value: string; unit?: string }[];
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    key: 'estructural',
    tab: 'Estructural',
    eyebrow: 'Soldadura estructural',
    desc: 'Vigas, columnas, techos y marquesinas en acero. Unimos cada pieza con la resistencia que tu proyecto exige.',
    image: '/images/welder-orange.webp',
    imageAlt: 'Soldador con careta naranja soldando una pieza de acero',
    torch: { x: 0.5, y: 0.89 },
    thumb: '/images/estructura-acero.webp',
    thumbLabel: 'Montaje de estructura',
    specs: [
      { label: 'Proceso', value: 'SMAW', unit: '/ MIG' },
      { label: 'Material', value: 'Acero', unit: 'A36' },
      { label: 'Aplicación', value: 'Vigas', unit: '& columnas' },
      { label: 'Sector', value: 'Res.', unit: '/ Comercial' },
      { label: 'Cotización', value: '24', unit: 'horas' },
    ],
  },
  {
    key: 'movil',
    tab: 'En sitio',
    eyebrow: 'Servicio móvil',
    desc: 'Llegamos con planta portátil a tu casa, negocio o finca. Reparaciones e instalaciones sin mover la pieza.',
    image: '/images/welder-blue.webp',
    imageAlt: 'Soldador con overol azul soldando un tubo de metal',
    torch: { x: 0.63, y: 0.66 },
    thumb: '/images/soldadura-industrial.webp',
    thumbLabel: 'Trabajo en sitio',
    specs: [
      { label: 'Proceso', value: 'MIG', unit: '/ Arco' },
      { label: 'Cobertura', value: 'Toda', unit: 'la isla' },
      { label: 'Equipo', value: 'Planta', unit: 'portátil' },
      { label: 'Trabajos', value: 'Rejas', unit: '& portones' },
      { label: 'Respuesta', value: 'Rápida', unit: '' },
    ],
  },
  {
    key: 'tig',
    tab: 'Precisión TIG',
    eyebrow: 'Inoxidable & aluminio',
    desc: 'Cordones limpios y finos en acero inoxidable y aluminio. Ideal para barandas, cocinas comerciales y piezas marinas.',
    image: '/images/helmet.webp',
    imageAlt: 'Careta de soldar automática de color negro',
    torch: { x: 0.06, y: 0.93 },
    thumb: '/images/soldador-noche.webp',
    thumbLabel: 'Cordón de precisión',
    specs: [
      { label: 'Proceso', value: 'TIG', unit: '/ GTAW' },
      { label: 'Materiales', value: 'Inox', unit: '& aluminio' },
      { label: 'Acabado', value: 'Fino', unit: 'sin escoria' },
      { label: 'Uso', value: 'Marino', unit: '& cocina' },
      { label: 'Cotización', value: '24', unit: 'horas' },
    ],
  },
];

export type IconName = 'beam' | 'gate' | 'stairs' | 'tig' | 'wrench' | 'truck' | 'cube' | 'pipe';

export interface Service {
  id: string;
  title: string;
  desc: string;
  tags: string[];
  icon: IconName;
}

export const SERVICES: Service[] = [
  { id: 'estructural', title: 'Soldadura estructural', desc: 'Estructuras de acero, vigas, columnas, techos, marquesinas y entrepisos para residencias y comercios.', tags: ['Acero', 'SMAW', 'MIG'], icon: 'beam' },
  { id: 'portones', title: 'Portones & rejas', desc: 'Portones corredizos y batientes, rejas de seguridad para ventanas y puertas, a la medida y con diseño.', tags: ['Ornamental', 'Seguridad'], icon: 'gate' },
  { id: 'barandas', title: 'Barandas & escaleras', desc: 'Barandas para balcones, terrazas y escaleras metálicas interiores o exteriores con acabado profesional.', tags: ['Residencial', 'Comercial'], icon: 'stairs' },
  { id: 'tig', title: 'Inoxidable & aluminio', desc: 'Soldadura TIG de precisión para acero inoxidable y aluminio: cocinas comerciales, piezas marinas y más.', tags: ['TIG', 'Inox', 'Aluminio'], icon: 'tig' },
  { id: 'reparacion', title: 'Reparación de equipos', desc: 'Reparamos maquinaria, equipo pesado, remolques y piezas agrícolas o industriales rotas o desgastadas.', tags: ['Mantenimiento'], icon: 'wrench' },
  { id: 'movil', title: 'Soldadura móvil', desc: 'Servicio en sitio con planta portátil. Llegamos a tu proyecto en cualquier punto de Puerto Rico.', tags: ['En sitio', 'Toda la isla'], icon: 'truck' },
  { id: 'fabricacion', title: 'Fabricación a medida', desc: 'Remolques, racks, mesas de trabajo, carports, toldos y cualquier pieza metálica que puedas imaginar.', tags: ['Custom', 'Diseño'], icon: 'cube' },
  { id: 'tuberia', title: 'Tuberías & tanques', desc: 'Soldadura de tuberías, tanques de agua y sistemas metálicos con uniones seguras y herméticas.', tags: ['Industrial'], icon: 'pipe' },
];

export const PROCESS = [
  { n: '01', title: 'Nos contactas', desc: 'Escríbenos por WhatsApp, llámanos o llena el formulario con los detalles de tu proyecto.' },
  { n: '02', title: 'Visita & medición', desc: 'Evaluamos el lugar, tomamos medidas y te recomendamos el material y proceso ideal.' },
  { n: '03', title: 'Cotización clara', desc: 'Recibes un estimado detallado, sin letras pequeñas, en un plazo de 24 horas.' },
  { n: '04', title: 'Fabricación & entrega', desc: 'Fabricamos, soldamos e instalamos. Entregamos limpio y con garantía en mano de obra.' },
];

export const PROJECTS = [
  { img: '/images/soldadura-industrial.webp', title: 'Estructura industrial', cat: 'Estructural', size: 'wide' },
  { img: '/images/soldador-atardecer.webp', title: 'Montaje en altura', cat: 'En sitio', size: 'normal' },
  { img: '/images/soldador-naranja.webp', title: 'Unión de placas', cat: 'Fabricación', size: 'normal' },
  { img: '/images/soldador-noche.webp', title: 'Cordón de precisión', cat: 'TIG', size: 'normal' },
  { img: '/images/taller-chispas.webp', title: 'Rejas de seguridad', cat: 'Ornamental', size: 'normal' },
  { img: '/images/estructura-acero.webp', title: 'Marco de acero', cat: 'Estructural', size: 'wide' },
];

export const FAQS = [
  { q: '¿La cotización tiene algún costo?', a: 'No. La cotización es gratis. Para proyectos que requieren visita, coordinamos una evaluación en sitio y luego te enviamos un estimado detallado.' },
  { q: '¿Trabajan en toda la isla?', a: 'Sí. Contamos con servicio móvil y planta portátil para trabajar en cualquier municipio de Puerto Rico. El traslado se incluye en la cotización.' },
  { q: '¿Qué materiales trabajan?', a: 'Acero al carbono, acero galvanizado, acero inoxidable y aluminio. Te recomendamos el material ideal según el uso, la exposición al salitre y tu presupuesto.' },
  { q: '¿Cuánto tarda un proyecto?', a: 'Depende del alcance. Reparaciones sencillas se resuelven en el día; portones, rejas y barandas suelen tomar de 3 a 10 días hábiles; las estructuras se calendarizan por fases.' },
  { q: '¿Ofrecen garantía?', a: 'Sí. Todos nuestros trabajos incluyen garantía en mano de obra. Te explicamos los términos en tu cotización.' },
  { q: '¿Puedo enviar fotos de lo que necesito?', a: 'Claro. Envíanos fotos o un dibujo por WhatsApp junto a las medidas aproximadas y te damos un estimado más rápido.' },
];

export const SECTORS = ['Residencial', 'Comercial', 'Industrial', 'Agrícola', 'Marino', 'Construcción'];

export const MARQUEE = ['Soldadura MIG', 'TIG', 'Arco eléctrico', 'Estructuras', 'Portones', 'Rejas', 'Barandas', 'Acero inoxidable', 'Aluminio', 'Reparaciones'];
