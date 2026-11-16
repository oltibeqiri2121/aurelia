import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { BedDouble, Check, ChevronLeft, ChevronRight, Clock, Eye, Maximize2, Users } from 'lucide-react';
import Img from '../components/Img';
import Lightbox from '../components/Lightbox';
import RoomCard from '../components/RoomCard';
import { Button, DemoNotice, Field, fieldProps } from '../components/ui';
import NotFound from './NotFound';
import { getRoom, rooms } from '../data/rooms';
import { SITE } from '../config';
import { useBooking } from '../context/BookingContext';
import { useToast } from '../context/ToastContext';
import usePageMeta from '../hooks/usePageMeta';
import { addDays, calcTotal, formatMoney, getAvailability, nightsBetween, todayISO, validateStay } from '../utils/booking';

function Details({ room }) {
  usePageMeta(room.name, room.description);
  const { search, setSearch, openBooking } = useBooking();
  const { toast } = useToast();
  const [i, setI] = useState(0);
  const [lb, setLb] = useState(null);
  const [stay, setStay] = useState(search);
  const [errors, setErrors] = useState({});
  const imgs = room.images.map((id, n) => ({ id, alt: `${room.name}, photo ${n + 1}` }));
  const go = (d) => setI((c) => (c + d + imgs.length) % imgs.length);
  const nights = nightsBetween(stay.checkIn, stay.checkOut);
  const av = nights > 0 ? getAvailability(room, stay) : null;
  const cls = (e) => `input ${e ? 'input-error' : ''}`;

  const upd = (k, v) => {
    setStay((s) => {
      const n = { ...s, [k]: v };
      if (k === 'checkIn' && v && nightsBetween(v, n.checkOut) <= 0) n.checkOut = addDays(v, 1);
      return n;
    });
    setErrors({});
  };
  const submit = (e) => {
    e.preventDefault();
    const errs = validateStay(stay);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    if (!av.available) return toast(av.fits ? 'Not available for these dates (demo). Try other dates.' : `This room sleeps up to ${room.maxGuests} per room. Add rooms or choose another.`, 'error');
    setSearch(stay);
    openBooking({ ...stay, roomId: room.id, startStep: 3 });
  };
  const others = rooms.filter((r) => r.id !== room.id).slice(0, 3);

  return (
    <div className="pt-28">
      <div className="container-x">
        <nav aria-label="Breadcrumb" className="mb-6 text-xs text-charcoal/60">
          <Link to="/" className="hover:text-gold-dark">Home</Link> / <Link to="/rooms" className="hover:text-gold-dark">Rooms & Suites</Link> / <span className="text-charcoal">{room.name}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-14">
          <div>
            <div className="relative">
              <button onClick={() => setLb(i)} aria-label="Open larger image" className="block w-full cursor-zoom-in">
                <AnimatePresence mode="wait">
                  <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
                    <Img id={imgs[i].id} alt={imgs[i].alt} priority sizes="(min-width:1024px) 60vw, 100vw" className="aspect-[3/2]" />
                  </motion.div>
                </AnimatePresence>
              </button>
              <button onClick={() => go(-1)} aria-label="Previous image" className="absolute left-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center bg-ivory/90 hover:bg-gold"><ChevronLeft size={18} /></button>
              <button onClick={() => go(1)} aria-label="Next image" className="absolute right-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center bg-ivory/90 hover:bg-gold"><ChevronRight size={18} /></button>
              <span className="absolute bottom-3 right-3 bg-charcoal/70 px-3 py-1 text-xs text-ivory">{i + 1} / {imgs.length}</span>
            </div>
            <ul className="mt-3 grid grid-cols-3 gap-3">
              {imgs.map((m, n) => (
                <li key={m.id + n}>
                  <button onClick={() => setI(n)} aria-label={`Show photo ${n + 1}`} aria-current={n === i} className={`block w-full border-2 ${n === i ? 'border-gold' : 'border-transparent opacity-70 hover:opacity-100'}`}>
                    <Img id={m.id} alt="" widths={[240, 480]} sizes="200px" className="aspect-[3/2]" />
                  </button>
                </li>
              ))}
            </ul>

            <p className="eyebrow mb-3 mt-12">{room.category === 'Suites' ? 'Suite' : room.category === 'Family' ? 'Family' : 'Room'}</p>
            <h1 className="text-5xl">{room.name}</h1>
            <p className="mt-2 font-serif text-xl italic text-gold-dark">{room.tagline}</p>
            <p className="mt-6 leading-relaxed text-charcoal/75">{room.details}</p>

            <ul className="mt-8 grid grid-cols-2 gap-4 border-y border-sand py-6 text-sm sm:grid-cols-4">
              <li className="flex items-center gap-2"><Users size={18} className="text-gold-dark" /> Up to {room.maxGuests} guests</li>
              <li className="flex items-center gap-2"><Maximize2 size={18} className="text-gold-dark" /> {room.size} m²</li>
              <li className="flex items-center gap-2"><BedDouble size={18} className="text-gold-dark" /> {room.bed}</li>
              <li className="flex items-center gap-2"><Eye size={18} className="text-gold-dark" /> {room.view}</li>
            </ul>

            <h2 className="mb-5 mt-10 text-3xl">Amenities</h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              {room.amenities.map((a) => <li key={a} className="flex items-center gap-2 text-sm"><Check size={16} className="shrink-0 text-gold-dark" /> {a}</li>)}
            </ul>

            <h2 className="mb-5 mt-10 text-3xl">Check-in & Check-out</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {[['Check-in', `From ${SITE.checkIn}`], ['Check-out', `By ${SITE.checkOut}`]].map(([k, v]) => (
                <div key={k} className="flex items-center gap-3 border border-sand bg-white p-4"><Clock className="text-gold-dark" size={20} /><div><p className="text-[11px] uppercase tracking-[0.16em] text-charcoal/60">{k}</p><p className="font-serif text-xl">{v}</p></div></div>
              ))}
            </div>
            <p className="mt-3 text-xs text-charcoal/60">Example times for demonstration only.</p>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <form onSubmit={submit} noValidate aria-label={`Book ${room.name}`} className="border border-sand bg-white p-6 shadow-sm sm:p-8">
              <p className="text-[10px] uppercase tracking-[0.18em] text-charcoal/50">Example nightly rate · demo price</p>
              <p className="mb-6 font-serif text-5xl">{formatMoney(room.price)} <span className="font-sans text-sm text-charcoal/60">/ night</span></p>
              <div className="grid gap-4">
                <Field label="Check-in" id="rd-in" error={errors.checkIn}>
                  <input {...fieldProps('rd-in', errors.checkIn)} type="date" min={todayISO()} value={stay.checkIn} onChange={(e) => upd('checkIn', e.target.value)} className={cls(errors.checkIn)} />
                </Field>
                <Field label="Check-out" id="rd-out" error={errors.checkOut}>
                  <input {...fieldProps('rd-out', errors.checkOut)} type="date" min={stay.checkIn ? addDays(stay.checkIn, 1) : todayISO()} value={stay.checkOut} onChange={(e) => upd('checkOut', e.target.value)} className={cls(errors.checkOut)} />
                </Field>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Guests" id="rd-guests" error={errors.guests}>
                    <select {...fieldProps('rd-guests', errors.guests)} value={stay.guests} onChange={(e) => upd('guests', Number(e.target.value))} className={cls(errors.guests)}>
                      {Array.from({ length: 12 }, (_, n) => n + 1).map((n) => <option key={n} value={n}>{n}</option>)}
                    </select>
                  </Field>
                  <Field label="Rooms" id="rd-rooms" error={errors.rooms}>
                    <select {...fieldProps('rd-rooms', errors.rooms)} value={stay.rooms} onChange={(e) => upd('rooms', Number(e.target.value))} className={cls(errors.rooms)}>
                      {Array.from({ length: 6 }, (_, n) => n + 1).map((n) => <option key={n} value={n}>{n}</option>)}
                    </select>
                  </Field>
                </div>
              </div>
              {av && (
                <div className="mt-5 border-t border-sand pt-4 text-sm" aria-live="polite">
                  <p className="text-charcoal/70">{av.label}</p>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-charcoal/50">Estimated total · {nights} {nights === 1 ? 'night' : 'nights'}</p>
                  <p className="font-serif text-3xl">{formatMoney(calcTotal(room, nights, stay.rooms))}</p>
                </div>
              )}
              <Button type="submit" className="mt-5 w-full">Reserve (Demo)</Button>
              <DemoNotice className="mt-4">Demo availability and price. No payment is taken.</DemoNotice>
            </form>
          </aside>
        </div>

        <section className="py-20" aria-labelledby="rec">
          <h2 id="rec" className="mb-8 text-center text-4xl">You May Also Like</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{others.map((r, n) => <RoomCard key={r.id} room={r} index={n} />)}</div>
        </section>
      </div>
      <Lightbox items={imgs} index={lb} onClose={() => setLb(null)} onIndex={setLb} />
    </div>
  );
}

export default function RoomDetails() {
  const { slug } = useParams();
  const room = getRoom(slug);
  return room ? <Details key={slug} room={room} /> : <NotFound />;
}
