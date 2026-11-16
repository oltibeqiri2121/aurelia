import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Maximize2 } from 'lucide-react';
import Img from './Img';
import Lightbox from './Lightbox';
import { galleryCategories, galleryItems } from '../data/gallery';

export default function Gallery({ limit, filters = true }) {
  const [cat, setCat] = useState('All');
  const [idx, setIdx] = useState(null);
  const items = useMemo(() => galleryItems.filter((i) => cat === 'All' || i.cat === cat), [cat]);
  const shown = limit ? items.slice(0, limit) : items;

  return (
    <div>
      {filters && (
        <div role="group" aria-label="Filter gallery by category" className="mb-10 flex flex-wrap justify-center gap-2">
          {galleryCategories.map((c) => (
            <button key={c} onClick={() => setCat(c)} aria-pressed={cat === c}
              className={`border px-4 py-2 text-[11px] uppercase tracking-[0.16em] transition-colors ${cat === c ? 'border-espresso bg-espresso text-ivory' : 'border-sand hover:border-gold'}`}>{c}</button>
          ))}
        </div>
      )}
      {shown.length === 0 ? (
        <p className="py-16 text-center text-charcoal/60">No photos in this category yet.</p>
      ) : (
        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
          {shown.map((item, n) => (
            <motion.button key={item.id} layout initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              onClick={() => setIdx(n)} aria-label={`Open image: ${item.alt}`} className="group relative block w-full break-inside-avoid overflow-hidden">
              <Img id={item.id} alt={item.alt} widths={[480, 800, 1200]} sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                className={n % 3 === 0 ? 'aspect-[3/4]' : n % 3 === 1 ? 'aspect-[4/3]' : 'aspect-square'} imgClassName="group-hover:scale-105" />
              <span className="absolute inset-0 flex items-end justify-between bg-charcoal/0 p-4 text-ivory opacity-0 transition-all duration-500 group-hover:bg-charcoal/40 group-hover:opacity-100 group-focus-visible:opacity-100">
                <span className="text-[11px] uppercase tracking-[0.18em]">{item.cat}</span><Maximize2 size={18} />
              </span>
            </motion.button>
          ))}
        </div>
      )}
      <Lightbox items={shown} index={idx} onClose={() => setIdx(null)} onIndex={setIdx} />
    </div>
  );
}
