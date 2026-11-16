import { useRef } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import useDialog from '../hooks/useDialog';

export default function Modal({ open, onClose, title, children, size = 'max-w-3xl' }) {
  const ref = useRef(null);
  useDialog(open, onClose, ref);
  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[90] flex items-end justify-center sm:items-center sm:p-6"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-charcoal/70" onClick={onClose} aria-hidden="true" />
          <motion.div ref={ref} role="dialog" aria-modal="true" aria-label={title} tabIndex={-1}
            initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.35 }}
            className={`relative max-h-[92vh] w-full overflow-y-auto bg-ivory shadow-2xl ${size}`}>
            <button onClick={onClose} aria-label="Close dialog"
              className="absolute right-3 top-3 z-10 grid h-10 w-10 place-items-center bg-white/90 text-charcoal hover:bg-gold">
              <X size={18} />
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
