import { useCallback, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import { About, CtaStrip, Faq, Marquee, Process, Projects, Safety, Services } from './components/Sections';
import QuoteForm from './components/QuoteForm';
import Footer, { WhatsAppFloat } from './components/Footer';
import { QuoteContext } from './quote';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [service, setService] = useState('');
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  const done = useCallback(() => {
    setLoading(false);
    document.body.style.overflow = '';
  }, []);

  const requestQuote = useCallback((id?: string) => {
    if (id) setService(id);
    document.getElementById('cotizar')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return (
    <QuoteContext.Provider value={{ service, requestQuote }}>
      <AnimatePresence>{loading && <Preloader onDone={done} />}</AnimatePresence>
      <motion.div className="scroll-progress" style={{ scaleX: progress }} />
      <Navbar ready={!loading} />
      <main>
        <Hero ready={!loading} />
        <Marquee />
        <About />
        <Services />
        <CtaStrip />
        <Process />
        <Projects />
        <Safety />
        <QuoteForm />
        <Faq />
      </main>
      <Footer />
      <WhatsAppFloat />
    </QuoteContext.Provider>
  );
}
