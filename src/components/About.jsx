import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BedDouble, ConciergeBell, Sparkles } from 'lucide-react';
import { Button, Reveal } from './ui';
import aboutHotelNight from '../assets/about-hotel-night.png';

const highlights = [
  { icon: ConciergeBell, title: 'Exceptional Service', text: 'Attentive, discreet and always one step ahead.' },
  { icon: BedDouble, title: 'Refined Comfort', text: 'Carefully designed rooms made for deep rest.' },
  { icon: Sparkles, title: 'Memorable Experiences', text: 'Moments curated around how you like to travel.' },
];

export default function About() {
  const [more, setMore] = useState(false);
  return (
    <section className="py-24 lg:py-32" id="about">
      <div className="container-x grid items-center gap-14 lg:grid-cols-2 lg:gap-24">
        <div className="relative">
          <motion.div initial={{ clipPath: 'inset(0 100% 0 0)' }} whileInView={{ clipPath: 'inset(0 0% 0 0)' }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 1.3, ease: [0.76, 0, 0.24, 1] }} className="relative overflow-hidden rounded-[1.5rem] shadow-[0_25px_60px_rgba(26,22,18,0.10)]">
            <img src={aboutHotelNight} alt="The Aurelia hotel façade and terrace at night" className="aspect-[4/5] w-full object-cover" />
          </motion.div>
          {/* <span aria-hidden="true" className="absolute -bottom-5 -right-5 -z-10 hidden h-3/4 w-3/4 border border-gold sm:block" /> */}
        </div>
        <Reveal>
          <p className="eyebrow mb-4">About our hotel</p>
          <h2 className="text-4xl leading-tight sm:text-5xl">Where Luxury Meets Comfort.</h2>
          <span className="mt-6 block h-px w-16 bg-gold" />
          <p className="mt-6 leading-relaxed text-charcoal/75">
            Aurelia is an imagined retreat built around carefully designed rooms, attentive service, relaxing spaces and memorable experiences. Every corner is shaped by warm materials, natural light and a quiet confidence that lets you simply arrive and exhale.
          </p>
          <AnimatePresence initial={false}>
            {more && (
              <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden leading-relaxed text-charcoal/75">
                <span className="mt-4 block">From a morning swim in the infinity pool to an evening tasting menu, the day unfolds at your pace. Our team anticipates what you need before you ask, whether it is a quiet table, a late check-out or a private tour of the city. This website and hotel are fictional and created for demonstration purposes.</span>
              </motion.p>
            )}
          </AnimatePresence>
          <ul className="my-10 grid gap-6 sm:grid-cols-3">
            {highlights.map(({ icon: Icon, title, text }) => (
              <li key={title}>
                <Icon className="mb-3 text-gold-dark" size={26} strokeWidth={1.4} />
                <h3 className="text-xl">{title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-charcoal/65">{text}</p>
              </li>
            ))}
          </ul>
          <Button variant="outline" onClick={() => setMore((m) => !m)} aria-expanded={more}>{more ? 'Show Less' : 'Learn More'}</Button>
        </Reveal>
      </div>
    </section>
  );
}
