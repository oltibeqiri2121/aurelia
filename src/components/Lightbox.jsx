import { useRef } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { imgUrl } from '../data/images';
import useDialog from '../hooks/useDialog';

export default function Lightbox({ items, index, onClose, onIndex }) {
  const ref = useRef(null);
  const open = index !== null && index !== undefined && items.length > 0;
  const go = (d) => onIndex((index + d + items.length) % items.length);
  useDialog(open, onClose, ref, (e) => {
    if (e.key === 'ArrowLeft') go(-1);
    if (e.key === 'ArrowRight') go(1);
  });
  const item = open ? items[index] : null;

  return createPortal(
    <AnimatePresence>
      {open && item && (
        <motion.div ref={ref} role="dialog" aria-modal="true" aria-label="Image viewer" tabIndex={-1}
          className="fixed inset-0 z-[95] flex flex-col bg-charcoal/95"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="flex items-center justify-between px-5 py-4 text-ivory">
            <p className="text-xs uppercase tracking-[0.2em]">{index + 1} / {items.length}</p>
            <button onClick={onClose} aria-label="Close image viewer" className="grid h-11 w-11 place-items-center border border-white/30 hover:bg-white/10"><X size={20} /></button>
          </div>
          <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 sm:px-20" onClick={onClose}>
            <AnimatePresence mode="wait">
              <motion.img key={item.id} src={imgUrl(item.id, 1800)} alt={item.alt}
                initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
                onClick={(e) => e.stopPropagation()} className="max-h-full max-w-full object-contain" />
            </AnimatePresence>
            {items.length > 1 && (
              <>
                <button onClick={(e) => { e.stopPropagation(); go(-1); }} aria-label="Previous image"
                  className="absolute left-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center border border-white/30 text-ivory hover:bg-white/10 sm:left-6"><ChevronLeft /></button>
                <button onClick={(e) => { e.stopPropagation(); go(1); }} aria-label="Next image"
                  className="absolute right-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center border border-white/30 text-ivory hover:bg-white/10 sm:right-6"><ChevronRight /></button>
              </>
            )}
          </div>
          <p className="px-5 py-4 text-center text-sm text-ivory/80">{item.alt}</p>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
