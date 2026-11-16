import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { CheckCircle2, Printer, Search, Trash2 } from 'lucide-react';
import Img from '../components/Img';
import { Button, DemoNotice, Field, fieldProps } from '../components/ui';
import { SITE } from '../config';
import { useBooking } from '../context/BookingContext';
import { useToast } from '../context/ToastContext';
import { deleteBooking, formatDate, formatMoney, getBookingByRef, getBookings } from '../utils/booking';
import usePageMeta from '../hooks/usePageMeta';

export default function BookingConfirmation() {
  usePageMeta('Demo Booking Confirmation');
  const { ref } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { openBooking } = useBooking();
  const [lookup, setLookup] = useState('');
  const [err, setErr] = useState('');
  const booking = ref ? getBookingByRef(ref) : null;

  const find = (e) => {
    e.preventDefault();
    if (!getBookingByRef(lookup)) return setErr('No demo booking with that reference was found in this browser.');
    navigate(`/booking/${lookup.trim()}`);
  };

  if (!booking) {
    const list = ref ? [] : getBookings();
    return (
      <section className="min-h-[70vh] bg-beige pb-20 pt-32">
        <div className="container-x max-w-2xl">
          <h1 className="text-5xl">{ref ? 'Booking not found' : 'My Demo Bookings'}</h1>
          <p className="mt-3 text-charcoal/70">{ref ? `We couldn’t find reference “${ref}” in this browser’s LocalStorage.` : 'Demo bookings are stored only in this browser.'}</p>
          <form onSubmit={find} noValidate className="mt-8 flex items-start gap-3">
            <Field label="Booking reference" id="lookup" error={err} className="flex-1">
              <input {...fieldProps('lookup', err)} value={lookup} onChange={(e) => { setLookup(e.target.value); setErr(''); }} placeholder="AUR-DEMO-XXXXXXXX" className="input" />
            </Field>
            <Button type="submit" className="mt-[26px]"><Search size={15} /> Find</Button>
          </form>
          {list.length > 0 && (
            <ul className="mt-10 space-y-3">
              {list.map((b) => (
                <li key={b.ref}><Link to={`/booking/${b.ref}`} className="flex items-center justify-between border border-sand bg-white p-4 hover:border-gold">
                  <span><span className="block font-serif text-xl">{b.roomName}</span><span className="text-xs text-charcoal/60">{b.ref} · {formatDate(b.checkIn)}</span></span>
                  <span className="font-serif text-xl">{formatMoney(b.total)}</span>
                </Link></li>
              ))}
            </ul>
          )}
          {!ref && list.length === 0 && <p className="mt-10 border border-dashed border-sand bg-white p-8 text-center text-charcoal/60">No saved demo bookings yet.</p>}
          <div className="mt-10"><Button onClick={() => openBooking()}>Start a Demo Booking</Button></div>
        </div>
      </section>
    );
  }

  const b = booking;
  const remove = () => {
    deleteBooking(b.ref);
    toast('Demo booking removed from this browser.', 'info');
    navigate('/booking');
  };
  const rows = [
    ['Reference', b.ref], ['Room', `${b.roomName} × ${b.rooms}`],
    ['Check-in', `${formatDate(b.checkIn)} · from ${SITE.checkIn}`], ['Check-out', `${formatDate(b.checkOut)} · by ${SITE.checkOut}`],
    ['Nights', b.nights], ['Guests', b.guests], ['Guest', `${b.guest.name} · ${b.guest.email} · ${b.guest.phone}`],
  ];
  return (
    <section className="bg-beige pb-20 pt-32">
      <div className="container-x max-w-3xl">
        <div className="text-center">
          <CheckCircle2 className="mx-auto text-gold-dark" size={48} strokeWidth={1.3} />
          <p className="eyebrow mb-3 mt-4">Demo reservation confirmed</p>
          <h1 className="text-5xl">Thank You, {b.guest.name.split(' ')[0]}</h1>
          <p className="mt-3 text-charcoal/70">Your demo booking reference is</p>
          <p className="mt-1 font-serif text-4xl tracking-wider text-gold-dark">{b.ref}</p>
        </div>
        <div className="mt-10 border border-sand bg-white">
          <Img id={b.roomImage} alt={b.roomName} sizes="768px" className="aspect-[16/7]" />
          <dl className="divide-y divide-sand text-sm">
            {rows.map(([k, v]) => <div key={k} className="grid gap-1 px-5 py-3 sm:grid-cols-[140px_1fr]"><dt className="text-charcoal/60">{k}</dt><dd>{v}</dd></div>)}
            <div className="grid gap-1 bg-beige px-5 py-4 sm:grid-cols-[140px_1fr]">
              <dt className="text-charcoal/60">Estimated total</dt>
              <dd><span className="font-serif text-3xl">{formatMoney(b.total)}</span><span className="ml-2 text-xs text-charcoal/60">{formatMoney(b.pricePerNight)} × {b.nights} nights × {b.rooms} rooms</span></dd>
            </div>
          </dl>
        </div>
        <DemoNotice className="mt-6">This is a demo reservation, not a confirmed real-world hotel booking. No payment was taken, no room is held, and no confirmation email was sent. It is saved only in this browser’s LocalStorage.</DemoNotice>
        <div className="mt-8 flex flex-wrap justify-center gap-3 print:hidden">
          <Button variant="dark" onClick={() => window.print()}><Printer size={15} /> Print</Button>
          <Button variant="outline" to="/booking">All Demo Bookings</Button>
          <Button variant="outline" onClick={remove}><Trash2 size={15} /> Remove</Button>
          <Button to="/">Back Home</Button>
        </div>
      </div>
    </section>
  );
}
