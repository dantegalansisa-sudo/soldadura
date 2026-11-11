import type { IconName } from '../data/site';

const P = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };

export function ServiceIcon({ name }: { name: IconName }) {
  switch (name) {
    case 'beam':
      return (<svg viewBox="0 0 48 48" {...P}><path d="M6 10h36M6 38h36M14 10v28M34 10v28M14 24h20" /><path d="M10 10v-3h28v3M10 38v3h28v-3" /></svg>);
    case 'gate':
      return (<svg viewBox="0 0 48 48" {...P}><path d="M6 42V12M42 42V12M6 14h36M6 40h36" /><path d="M13 14v26M20 14v26M28 14v26M35 14v26" /><path d="M13 8l3 4M20 6l2 6M28 6l-2 6M35 8l-3 4" /></svg>);
    case 'stairs':
      return (<svg viewBox="0 0 48 48" {...P}><path d="M6 42h8v-8h8v-8h8v-8h8v-8h4" /><path d="M10 34V20l28-14" /><path d="M16 31V17M24 25V13M32 19V9" /></svg>);
    case 'tig':
      return (<svg viewBox="0 0 48 48" {...P}><path d="M30 6l-14 22h8l-4 14 16-22h-8l6-14z" /><circle cx="38" cy="38" r="2" /><circle cx="10" cy="12" r="1.5" /></svg>);
    case 'wrench':
      return (<svg viewBox="0 0 48 48" {...P}><path d="M30 8a9 9 0 0 0-8 12L8 34a4 4 0 0 0 6 6l14-14a9 9 0 0 0 12-8l-6 2-4-4 2-6a9 9 0 0 0-2-2z" /></svg>);
    case 'truck':
      return (<svg viewBox="0 0 48 48" {...P}><path d="M4 12h24v22H4zM28 20h9l7 8v6H28" /><circle cx="12" cy="36" r="4" /><circle cx="36" cy="36" r="4" /><path d="M10 20l4 4 6-8" /></svg>);
    case 'cube':
      return (<svg viewBox="0 0 48 48" {...P}><path d="M24 4l18 10v20L24 44 6 34V14z" /><path d="M6 14l18 10 18-10M24 24v20" /></svg>);
    case 'pipe':
      return (<svg viewBox="0 0 48 48" {...P}><path d="M4 16h16a8 8 0 0 1 8 8v20M4 26h12a2 2 0 0 1 2 2v16" /><path d="M20 12v8M28 34h-8M30 6h14v14H30z" /></svg>);
  }
}

export const IconArrow = ({ dir = 'right' }: { dir?: 'right' | 'left' | 'down' | 'up-right' }) => {
  const r = { right: 0, left: 180, down: 90, 'up-right': -45 }[dir];
  return (<svg viewBox="0 0 24 24" width="18" height="18" {...P} strokeWidth={1.8} style={{ transform: `rotate(${r}deg)` }}><path d="M4 12h16M14 6l6 6-6 6" /></svg>);
};

export const IconWhatsApp = ({ size = 20 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true"><path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.65-2.05-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.27.49 1.7.63.72.23 1.37.2 1.88.12.58-.09 1.75-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35zM12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.31l-.34-.2-3.57.93.95-3.48-.22-.36a9.43 9.43 0 1 1 7.99 4.42zm8.02-17.45A11.27 11.27 0 0 0 12.05.75C5.8.75.72 5.83.72 12.07c0 2 .52 3.95 1.52 5.66L.62 23.62l6.03-1.58a11.3 11.3 0 0 0 5.4 1.38h.01c6.24 0 11.32-5.08 11.33-11.32 0-3.02-1.18-5.87-3.32-8.01z" /></svg>
);

export const IconPhone = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" {...P} strokeWidth={1.8}><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" /></svg>
);

export const IconMail = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" {...P} strokeWidth={1.8}><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M22 6l-10 7L2 6" /></svg>
);

export const IconInstagram = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" {...P} strokeWidth={1.8}><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" /></svg>
);

export const IconPin = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" {...P} strokeWidth={1.8}><path d="M12 22s-8-6.5-8-13a8 8 0 0 1 16 0c0 6.5-8 13-8 13z" /><circle cx="12" cy="9" r="3" /></svg>
);

export const IconClock = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" {...P} strokeWidth={1.8}><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
);

export const IconCheck = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" {...P} strokeWidth={2.2}><path d="M4 12l5 5L20 6" /></svg>
);

export const IconShield = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" {...P} strokeWidth={1.6}><path d="M12 2l8 3v6c0 5-3.5 9.3-8 11-4.5-1.7-8-6-8-11V5z" /><path d="M8.5 12l2.5 2.5 4.5-5" /></svg>
);

export const IconSpark = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" {...P} strokeWidth={1.6}><path d="M12 2v5M12 17v5M2 12h5M17 12h5M5 5l3.5 3.5M15.5 15.5L19 19M5 19l3.5-3.5M15.5 8.5L19 5" /></svg>
);

export const IconRuler = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" {...P} strokeWidth={1.6}><path d="M3 17L17 3l4 4L7 21z" /><path d="M7 13l2 2M10 10l2 2M13 7l2 2" /></svg>
);

export const IconMedal = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" {...P} strokeWidth={1.6}><circle cx="12" cy="15" r="6" /><path d="M8.5 10L5 2h5l2 4 2-4h5l-3.5 8" /><path d="M12 12.5l.9 1.8 2 .3-1.4 1.4.3 2-1.8-.9-1.8.9.3-2-1.4-1.4 2-.3z" /></svg>
);
