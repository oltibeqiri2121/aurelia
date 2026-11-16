import { motion } from 'framer-motion';
import Img from './Img';

export default function PageHeader({ eyebrow, title, subtitle, image }) {
  return (
    <section className="relative flex min-h-[52vh] items-end overflow-hidden bg-espresso pb-16 pt-36 text-ivory">
      <div className="absolute inset-0"><Img id={image} alt="" priority className="h-full w-full" /></div>
      <div className="absolute inset-0 bg-charcoal/55" />
      <div className="container-x relative">
        {eyebrow && <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="eyebrow mb-4 !text-gold-light">{eyebrow}</motion.p>}
        <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="max-w-3xl text-5xl sm:text-6xl">{title}</motion.h1>
        {subtitle && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-5 max-w-xl text-ivory/80">{subtitle}</motion.p>}
      </div>
    </section>
  );
}
