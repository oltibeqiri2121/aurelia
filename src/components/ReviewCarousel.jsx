import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import { SectionHeading } from './ui';
import { reviews } from '../data/reviews';

export default function ReviewCarousel() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const go = (d) => setI((c) => (c + d + reviews.length) % reviews.length);

  useEffect(() => {
    if (paused) return undefined;
    const t = setInterval(() => setI((c) => (c + 1) % reviews.length), 8000);
    return () => clearInterval(t);
  }, [paused]);

  const r = reviews[i];
  return (
    <section className="bg-espresso py-24 text-ivory lg:py-32" aria-roledescription="carousel" aria-label="Guest reviews"
      onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
      <div className="container-x">
        <SectionHeading eyebrow="Guest reviews" title="Words from Our Guests" light>
          Demonstration content: these fictional reviews are placeholders until real guest feedback is available.
        </SectionHeading>
        <div className="mx-auto max-w-3xl text-center">
          <Quote className="mx-auto mb-6 text-gold" size={36} strokeWidth={1.2} />
          <div className="min-h-[260px] sm:min-h-[220px]" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.figure key={r.id} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }} transition={{ duration: 0.4 }}>
                <div className="mb-5 flex justify-center gap-1" role="img" aria-label={`${r.rating} out of 5 stars`}>
                  {Array.from({ length: 5 }, (_, n) => <Star key={n} size={18} className={n < r.rating ? 'fill-gold text-gold' : 'text-ivory/30'} />)}
                </div>
                <blockquote className="font-serif text-2xl leading-relaxed sm:text-3xl">“{r.text}”</blockquote>
                <figcaption className="mt-6 text-sm">
                  <span className="font-medium uppercase tracking-[0.18em]">{r.name}</span>
                  {r.stay && <span className="block text-ivory/60">{r.stay} · sample review</span>}
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>
          <div className="mt-8 flex items-center justify-center gap-5">
            <button onClick={() => go(-1)} aria-label="Previous review" className="grid h-11 w-11 place-items-center border border-white/30 hover:bg-white/10"><ChevronLeft size={18} /></button>
            <div className="flex gap-2">
              {reviews.map((x, n) => (
                <button key={x.id} onClick={() => setI(n)} aria-label={`Show review ${n + 1}`} aria-current={n === i}
                  className={`h-1.5 transition-all ${n === i ? 'w-8 bg-gold' : 'w-3 bg-white/30 hover:bg-white/60'}`} />
              ))}
            </div>
            <button onClick={() => go(1)} aria-label="Next review" className="grid h-11 w-11 place-items-center border border-white/30 hover:bg-white/10"><ChevronRight size={18} /></button>
          </div>
        </div>
      </div>
    </section>
  );
}
