import { motion } from 'framer-motion';
import Img from './Img';

export default function AmenityCard({ amenity, index = 0 }) {
  const Icon = amenity.icon;
  return (
    <motion.article initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, delay: (index % 4) * 0.08 }} className="group border border-sand bg-white">
      <Img id={amenity.image} alt={amenity.title} sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw" className="aspect-[4/3]" imgClassName="group-hover:scale-105" />
      <div className="relative px-6 pb-7 pt-9">
        <span className="absolute -top-6 left-6 grid h-12 w-12 place-items-center bg-gold text-charcoal"><Icon size={20} /></span>
        <h3 className="text-2xl">{amenity.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-charcoal/70">{amenity.text}</p>
      </div>
    </motion.article>
  );
}
