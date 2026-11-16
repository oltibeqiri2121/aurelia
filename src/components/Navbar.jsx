import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from './ui';
import { useBooking } from '../context/BookingContext';

const links = [
  { to: '/', label: 'Home' },
  { to: '/rooms', label: 'Rooms & Suites' },
  { to: '/dining', label: 'Dining' },
  { to: '/experiences', label: 'Experiences' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/contact', label: 'Contact' },
];
const heroRoutes = links.map((l) => l.to);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const { openBooking } = useBooking();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = ''; document.removeEventListener('keydown', onKey); };
  }, [open]);

  const transparent = heroRoutes.includes(pathname) && !scrolled && !open;
  const light = transparent || open;
  const linkCls = ({ isActive }) =>
    `relative py-2 text-[12px] font-medium uppercase tracking-[0.18em] transition-colors after:absolute after:bottom-0 after:left-0 after:h-px after:bg-gold after:transition-all ${
      isActive ? 'after:w-full' : 'after:w-0 hover:after:w-full'
    } ${light ? 'text-ivory' : 'text-charcoal'}`;

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        open ? 'bg-transparent' : transparent ? 'bg-transparent py-5' : 'border-b border-sand bg-ivory/95 py-3 shadow-sm backdrop-blur'
      }`}>
        <div className="container-x flex items-center justify-between">
          <Link to="/" aria-label="Aurelia Hotel & Resort — home" className={`leading-none ${light ? 'text-ivory' : 'text-espresso'}`}>
            <span className="block font-serif text-3xl tracking-[0.35em]">AURELIA</span>
            <span className="mt-1 block text-[9px] uppercase tracking-[0.4em] text-gold">Hotel & Resort</span>
          </Link>
          <nav aria-label="Main navigation" className="hidden items-center gap-8 lg:flex">
            {links.map((l) => <NavLink key={l.to} to={l.to} end={l.to === '/'} className={linkCls}>{l.label}</NavLink>)}
          </nav>
          <div className="flex items-center gap-3">
            <Button onClick={() => openBooking()} className="hidden !px-6 !py-3 sm:inline-flex">Book a Room</Button>
            <button className={`grid h-11 w-11 place-items-center lg:hidden ${light ? 'text-ivory' : 'text-charcoal'}`}
              aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen((o) => !o)}>
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div id="mobile-menu" className="fixed inset-0 z-40 overflow-y-auto bg-espresso pt-28 text-ivory lg:hidden"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <nav aria-label="Mobile navigation" className="container-x flex flex-col">
              {links.map((l, i) => (
                <motion.div key={l.to} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i }}>
                  <NavLink to={l.to} end={l.to === '/'} className={({ isActive }) => `block border-b border-white/10 py-4 font-serif text-3xl ${isActive ? 'text-gold' : ''}`}>{l.label}</NavLink>
                </motion.div>
              ))}
              <Button onClick={() => { setOpen(false); openBooking(); }} className="mt-8">Book a Room</Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
