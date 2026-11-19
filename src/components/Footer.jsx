import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Facebook, Instagram, Mail, MapPin, Phone, Twitter, Youtube } from 'lucide-react';
import { Button } from './ui';
import { SITE } from '../config';
import { useToast } from '../context/ToastContext';
import { useBooking } from '../context/BookingContext';
import { useAuth } from '../context/AuthContext';
import { isEmail } from '../utils/validation';

const socials = [
  { key: 'instagram', label: 'Instagram', icon: Instagram },
  { key: 'facebook', label: 'Facebook', icon: Facebook },
  { key: 'twitter', label: 'Twitter / X', icon: Twitter },
  { key: 'youtube', label: 'YouTube', icon: Youtube },
];

export default function Footer() {
  const { toast } = useToast();
  const { openBooking } = useBooking();
  const { user, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  const subscribe = (e) => {
    e.preventDefault();
    if (!isEmail(email)) { setDone(false); return setError('Please enter a valid email address.'); }
    setError(''); setDone(true); setEmail('');
    toast('Demo only: no mailing list is connected, so nothing was subscribed.', 'info');
  };
  const col = 'text-sm text-ivory/70 transition-colors hover:text-gold';
  const handleSignOut = () => {
    signOut();
    navigate('/');
  };

  return (
    <footer className="bg-charcoal text-ivory">
      <div className="container-x grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.3fr]">
        <div>
          <Link to="/" className="block leading-none">
            <span className="block font-serif text-3xl tracking-[0.35em]">AURELIA</span>
            <span className="mt-1 block text-[9px] uppercase tracking-[0.4em] text-gold">Hotel & Resort</span>
          </Link>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-ivory/70">A fictional luxury retreat of refined rooms, attentive service and memorable experiences. This website is a demonstration.</p>
          <div className="mt-6 flex gap-3">
            {socials.map(({ key, label, icon: Icon }) => SITE.social[key] ? (
              <a key={key} href={SITE.social[key]} target="_blank" rel="noreferrer" aria-label={label} className="grid h-10 w-10 place-items-center border border-white/20 hover:border-gold hover:text-gold"><Icon size={16} /></a>
            ) : (
              <button key={key} aria-label={`${label} (demo link)`} onClick={() => toast(`${label} is a demo link. Add a real URL in src/config.js.`, 'info')} className="grid h-10 w-10 place-items-center border border-white/20 hover:border-gold hover:text-gold"><Icon size={16} /></button>
            ))}
          </div>
        </div>

        <nav aria-label="Footer navigation">
          <h3 className="mb-5 text-xl text-gold">Explore</h3>
          <ul className="space-y-3">
            {[['/', 'Home'], ['/rooms', 'Rooms & Suites'], ['/dining', 'Dining'], ['/experiences', 'Experiences'], ['/gallery', 'Gallery'], ['/contact', 'Contact'], ['/booking', 'My Demo Booking'], ...(!user ? [['/signin', 'Sign In']] : !isAdmin ? [['/booking', 'My Account']] : [])].map(([to, l]) => (
              <li key={to}><Link to={to} className={col}>{l}</Link></li>
            ))}
            {user && <li><button type="button" onClick={handleSignOut} className={col}>Sign Out</button></li>}
          </ul>
        </nav>

        <div>
          <h3 className="mb-5 text-xl text-gold">Rooms & Services</h3>
          <ul className="space-y-3">
            <li><Link to="/rooms/deluxe-garden-room" className={col}>Deluxe Rooms</Link></li>
            <li><Link to="/rooms/executive-suite" className={col}>Executive Suite</Link></li>
            <li><Link to="/rooms/presidential-suite" className={col}>Presidential Suite</Link></li>
            <li><Link to="/rooms/family-room" className={col}>Family Room</Link></li>
            <li><Link to="/experiences" className={col}>Spa & Wellness</Link></li>
            <li><button onClick={() => openBooking()} className={col}>Book a Room</button></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-5 text-xl text-gold">Contact</h3>
          <ul className="space-y-3 text-sm text-ivory/70">
            <li className="flex gap-3"><MapPin size={16} className="mt-0.5 shrink-0 text-gold" /> <span>{SITE.address.join(', ')}</span></li>
            <li className="flex gap-3"><Phone size={16} className="shrink-0 text-gold" /> {SITE.phone}</li>
            <li className="flex gap-3"><Mail size={16} className="shrink-0 text-gold" /> {SITE.email}</li>
          </ul>
          <form onSubmit={subscribe} noValidate className="mt-6" aria-label="Newsletter subscription">
            <label htmlFor="nl-email" className="sr-only">Email address for newsletter</label>
            <div className="flex">
              <input id="nl-email" type="email" value={email} onChange={(e) => { setEmail(e.target.value); setError(''); }} placeholder="Your email address"
                aria-invalid={error ? true : undefined} aria-describedby="nl-msg"
                className="min-w-0 flex-1 border border-white/20 bg-transparent px-4 py-3 text-sm placeholder:text-ivory/40 focus:border-gold focus:outline-none" />
              <Button type="submit" className="!px-5">Join</Button>
            </div>
            <p id="nl-msg" role={error ? 'alert' : 'status'} className={`mt-2 text-xs ${error ? 'text-red-300' : 'text-gold-light'}`}>
              {error || (done ? 'Demo success: no email was stored or sent.' : 'Demo newsletter form: no mailing list is connected.')}
            </p>
          </form>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-6 text-xs text-ivory/55 sm:flex-row">
          <p>© {new Date().getFullYear()} Aurelia Hotel & Resort. A fictional demonstration brand.</p>
          <p className="flex gap-5"><Link to="/privacy" className="hover:text-gold">Privacy Policy</Link><Link to="/terms" className="hover:text-gold">Terms</Link></p>
        </div>
      </div>
    </footer>
  );
}
