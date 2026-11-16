import { useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { Button, Counter, DemoNotice, Field, fieldProps, Spinner } from './ui';
import AvailabilityResults from './AvailabilityResults';
import { useBooking } from '../context/BookingContext';
import { useToast } from '../context/ToastContext';
import { rooms } from '../data/rooms';
import { SITE } from '../config';
import { isEmail, isPhone } from '../utils/validation';
import {
  addDays, calcTotal, formatDate, formatMoney, generateReference, nightsBetween,
  saveBooking, searchRooms, todayISO, validateStay,
} from '../utils/booking';

const STEPS = ['Dates', 'Guests', 'Rooms', 'Details', 'Review'];

export default function BookingFlow({ initial = {}, startStep = 0, onComplete }) {
  const { search, setSearch } = useBooking();
  const { toast } = useToast();
  const [stay, setStay] = useState({
    checkIn: initial.checkIn || search.checkIn, checkOut: initial.checkOut || search.checkOut,
    guests: initial.guests || search.guests, rooms: initial.rooms || search.rooms,
  });
  const [roomId, setRoomId] = useState(initial.roomId || null);
  const [guest, setGuest] = useState({ name: '', email: '', phone: '' });
  const [agree, setAgree] = useState(false);
  const [step, setStep] = useState(startStep);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const topRef = useRef(null);

  const all = useMemo(() => searchRooms(rooms, stay), [stay]);
  const fitting = all.filter((r) => r.fits);
  const selected = all.find((r) => r.room.id === roomId);
  const nights = nightsBetween(stay.checkIn, stay.checkOut);
  const total = selected ? calcTotal(selected.room, nights, stay.rooms) : 0;
  const cls = (e) => `input ${e ? 'input-error' : ''}`;

  const setStayField = (k, v) => {
    setStay((s) => {
      const n = { ...s, [k]: v };
      if (k === 'checkIn' && v && nightsBetween(v, n.checkOut) <= 0) n.checkOut = addDays(v, 1);
      return n;
    });
    setErrors({});
  };

  const next = () => {
    const stayErrors = validateStay(stay);
    if (step === 0) {
      const e = { checkIn: stayErrors.checkIn, checkOut: stayErrors.checkOut };
      if (e.checkIn || e.checkOut) return setErrors(e);
    }
    if (step === 1) {
      const e = { guests: stayErrors.guests, rooms: stayErrors.rooms };
      if (e.guests || e.rooms) return setErrors(e);
    }
    if (step === 2) {
      if (!selected) return setErrors({ room: 'Please choose a room to continue.' });
      if (!selected.available) return setErrors({ room: 'That room is not available for these dates (demo).' });
    }
    if (step === 3) {
      const e = {};
      if (guest.name.trim().length < 2) e.name = 'Please enter your full name.';
      if (!isEmail(guest.email)) e.email = 'Please enter a valid email address.';
      if (!isPhone(guest.phone)) e.phone = 'Please enter a valid phone number.';
      if (Object.keys(e).length) return setErrors(e);
    }
    setErrors({});
    setStep((s) => s + 1);
    topRef.current?.scrollIntoView({ block: 'nearest' });
  };
  const back = () => { setErrors({}); setStep((s) => Math.max(0, s - 1)); };

  const confirm = async () => {
    if (!agree) return setErrors({ agree: 'Please acknowledge that this is a demo reservation.' });
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 900));
    const room = selected.room;
    const ref = generateReference();
    const booking = {
      ref, createdAt: new Date().toISOString(), demo: true,
      roomId: room.id, roomName: room.name, roomImage: room.images[0], pricePerNight: room.price,
      checkIn: stay.checkIn, checkOut: stay.checkOut, nights, guests: stay.guests, rooms: stay.rooms,
      total: calcTotal(room, nights, stay.rooms), guest: { ...guest, name: guest.name.trim(), email: guest.email.trim() },
    };
    const ok = saveBooking(booking);
    setSearch(stay);
    toast(ok ? `Demo booking saved · ${ref}` : 'Booking created, but your browser blocked LocalStorage.', ok ? 'success' : 'error');
    setSubmitting(false);
    onComplete?.(ref);
  };

  return (
    <div ref={topRef} className="p-6 sm:p-10">
      <p className="eyebrow mb-2">Demo reservation</p>
      <h2 className="mb-8 text-3xl sm:text-4xl">Plan Your Stay</h2>

      <ol className="mb-8 flex items-center gap-2" aria-label="Booking progress">
        {STEPS.map((label, i) => (
          <li key={label} className="flex flex-1 items-center gap-2 last:flex-none" aria-current={i === step ? 'step' : undefined}>
            <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs ${i < step ? 'border-gold bg-gold text-charcoal' : i === step ? 'border-charcoal bg-charcoal text-ivory' : 'border-sand text-charcoal/40'}`}>
              {i < step ? <Check size={14} /> : i + 1}
            </span>
            <span className={`hidden text-[11px] uppercase tracking-[0.14em] sm:block ${i === step ? 'text-charcoal' : 'text-charcoal/40'}`}>{label}</span>
            {i < STEPS.length - 1 && <span className="h-px flex-1 bg-sand" />}
          </li>
        ))}
      </ol>

      <AnimatePresence mode="wait">
        <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
          {step === 0 && (
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Check-in date" id="bf-in" error={errors.checkIn}>
                <input {...fieldProps('bf-in', errors.checkIn)} type="date" min={todayISO()} value={stay.checkIn} onChange={(e) => setStayField('checkIn', e.target.value)} className={cls(errors.checkIn)} />
              </Field>
              <Field label="Check-out date" id="bf-out" error={errors.checkOut}>
                <input {...fieldProps('bf-out', errors.checkOut)} type="date" min={stay.checkIn ? addDays(stay.checkIn, 1) : todayISO()} value={stay.checkOut} onChange={(e) => setStayField('checkOut', e.target.value)} className={cls(errors.checkOut)} />
              </Field>
              {nights > 0 && <p className="text-sm text-charcoal/70 sm:col-span-2">{nights} {nights === 1 ? 'night' : 'nights'} · {formatDate(stay.checkIn)} to {formatDate(stay.checkOut)}</p>}
            </div>
          )}

          {step === 1 && (
            <div className="grid gap-5 sm:grid-cols-2">
              <Counter id="bf-guests" label="Guests" value={stay.guests} max={12} error={errors.guests} onChange={(v) => setStayField('guests', v)} />
              <Counter id="bf-rooms" label="Rooms" value={stay.rooms} max={6} error={errors.rooms} onChange={(v) => setStayField('rooms', v)} />
            </div>
          )}

          {step === 2 && (
            <div>
              <p className="mb-4 text-sm text-charcoal/70">
                {formatDate(stay.checkIn)} → {formatDate(stay.checkOut)} · {nights} {nights === 1 ? 'night' : 'nights'} · {stay.guests} guests · {stay.rooms} {stay.rooms === 1 ? 'room' : 'rooms'}
              </p>
              <AvailabilityResults mode="select" items={fitting} stay={stay} selectedId={roomId} onSelect={(r) => { setRoomId(r.id); setErrors({}); }} />
              {errors.room && <p role="alert" className="mt-3 text-sm text-red-700">{errors.room}</p>}
            </div>
          )}

          {step === 3 && (
            <div className="grid gap-5">
              <Field label="Full name" id="bf-name" error={errors.name}>
                <input {...fieldProps('bf-name', errors.name)} autoComplete="name" value={guest.name} onChange={(e) => setGuest({ ...guest, name: e.target.value })} className={cls(errors.name)} />
              </Field>
              <Field label="Email" id="bf-email" error={errors.email}>
                <input {...fieldProps('bf-email', errors.email)} type="email" autoComplete="email" value={guest.email} onChange={(e) => setGuest({ ...guest, email: e.target.value })} className={cls(errors.email)} />
              </Field>
              <Field label="Phone number" id="bf-phone" error={errors.phone}>
                <input {...fieldProps('bf-phone', errors.phone)} type="tel" autoComplete="tel" value={guest.phone} onChange={(e) => setGuest({ ...guest, phone: e.target.value })} className={cls(errors.phone)} />
              </Field>
              <p className="text-xs text-charcoal/60">We only ask for what is necessary. No payment or card details are collected.</p>
            </div>
          )}

          {step === 4 && selected && (
            <div>
              <dl className="divide-y divide-sand border border-sand bg-white text-sm">
                {[
                  ['Room', selected.room.name],
                  ['Check-in', `${formatDate(stay.checkIn)} · from ${SITE.checkIn}`],
                  ['Check-out', `${formatDate(stay.checkOut)} · by ${SITE.checkOut}`],
                  ['Guests', `${stay.guests}`],
                  ['Rooms', `${stay.rooms}`],
                  ['Guest', `${guest.name} · ${guest.email} · ${guest.phone}`],
                ].map(([k, v]) => (
                  <div key={k} className="grid gap-1 px-4 py-3 sm:grid-cols-[140px_1fr]"><dt className="text-charcoal/60">{k}</dt><dd>{v}</dd></div>
                ))}
                <div className="grid gap-1 bg-beige px-4 py-4 sm:grid-cols-[140px_1fr]">
                  <dt className="text-charcoal/60">Estimated total</dt>
                  <dd><span className="font-serif text-3xl">{formatMoney(total)}</span>
                    <span className="ml-2 text-xs text-charcoal/60">{formatMoney(selected.room.price)} × {nights} {nights === 1 ? 'night' : 'nights'} × {stay.rooms} {stay.rooms === 1 ? 'room' : 'rooms'}</span></dd>
                </div>
              </dl>
              <DemoNotice className="mt-5">This is a demo reservation, not a confirmed real-world hotel booking. No payment is taken and no room is held.</DemoNotice>
              <label className="mt-4 flex items-start gap-3 text-sm">
                <input type="checkbox" checked={agree} onChange={(e) => { setAgree(e.target.checked); setErrors({}); }} className="mt-1 h-4 w-4 accent-[#A5883F]" aria-invalid={errors.agree ? true : undefined} />
                <span>I understand this is a demonstration booking only.</span>
              </label>
              {errors.agree && <p role="alert" className="mt-1.5 text-xs text-red-700">{errors.agree}</p>}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="mt-8 flex items-center justify-between border-t border-sand pt-6">
        <Button variant="outline" onClick={back} disabled={step === 0 || submitting}><ArrowLeft size={15} /> Back</Button>
        {step < STEPS.length - 1 ? (
          <Button onClick={next}>Continue <ArrowRight size={15} /></Button>
        ) : (
          <Button onClick={confirm} disabled={submitting}>{submitting ? <><Spinner size={16} /> Confirming…</> : 'Confirm Demo Booking'}</Button>
        )}
      </div>
    </div>
  );
}
