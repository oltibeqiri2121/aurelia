import { useEffect, useRef } from 'react';

const FOCUSABLE = 'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';

export default function useDialog(open, onClose, panelRef, onKey) {
  const closeRef = useRef(onClose); closeRef.current = onClose;
  const keyRef = useRef(onKey); keyRef.current = onKey;

  useEffect(() => {
    if (!open) return undefined;
    const previous = document.activeElement;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const list = () => (panelRef.current ? [...panelRef.current.querySelectorAll(FOCUSABLE)] : []);
    (list()[0] || panelRef.current)?.focus();

    const handler = (e) => {
      if (e.key === 'Escape') { e.stopPropagation(); closeRef.current?.(); return; }
      keyRef.current?.(e);
      if (e.key === 'Tab') {
        const f = list();
        if (!f.length) return;
        const first = f[0]; const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener('keydown', handler);
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = overflow;
      previous?.focus?.();
    };
  }, [open, panelRef]);
}
