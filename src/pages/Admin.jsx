import { useMemo, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { CalendarDays, CircleDollarSign, Hotel, Trash2, Users } from 'lucide-react';
import { Button, DemoNotice } from '../components/ui';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { deleteBooking, formatDate, formatMoney, getBookings, updateBookingStatus } from '../utils/booking';
import usePageMeta from '../hooks/usePageMeta';

export default function Admin() {
  usePageMeta('Admin Dashboard');
  const { user, isAdmin, signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState(getBookings);

  const stats = useMemo(() => ({
    reservations: bookings.length,
    guests: bookings.reduce((sum, booking) => sum + Number(booking.guests || 0), 0),
    revenue: bookings.reduce((sum, booking) => sum + Number(booking.total || 0), 0),
  }), [bookings]);

  if (!isAdmin) return <Navigate to="/signin" replace />;

  const remove = (booking) => {
    deleteBooking(booking.ref);
    setBookings(getBookings());
    toast(`Removed ${booking.ref}`, 'info');
  };

  const changeStatus = (ref, status) => {
    updateBookingStatus(ref, status);
    setBookings(getBookings());
  };

  const logout = () => {
    signOut();
    navigate('/');
  };

  const cards = [
    { label: 'Reservations', value: stats.reservations, icon: CalendarDays },
    { label: 'Guests', value: stats.guests, icon: Users },
    { label: 'Demo revenue', value: formatMoney(stats.revenue), icon: CircleDollarSign },
  ];

  return (
    <section className="min-h-[80vh] bg-beige pb-20 pt-32">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="eyebrow mb-3">Aurelia management</p>
            <h1 className="text-5xl">Admin Dashboard</h1>
            <p className="mt-3 text-charcoal/65">Signed in as {user.email}</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" to="/">View website</Button>
            <Button variant="dark" onClick={logout}>Sign Out</Button>
          </div>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {cards.map(({ label, value, icon: Icon }) => (
            <div key={label} className="border border-sand bg-white p-6">
              <Icon size={22} strokeWidth={1.5} className="text-gold-dark" />
              <p className="mt-5 text-xs uppercase tracking-[0.16em] text-charcoal/55">{label}</p>
              <p className="mt-1 font-serif text-4xl">{value}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 border border-sand bg-white">
          <div className="flex items-center gap-3 border-b border-sand px-5 py-4">
            <Hotel size={18} className="text-gold-dark" />
            <h2 className="font-serif text-2xl">Demo reservations</h2>
          </div>
          {bookings.length === 0 ? (
            <p className="p-10 text-center text-charcoal/60">No demo bookings have been created.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-left text-sm">
                <thead className="border-b border-sand bg-beige/60 text-[10px] uppercase tracking-[0.14em] text-charcoal/60">
                  <tr><th className="px-5 py-3">Reference</th><th className="px-5 py-3">Guest</th><th className="px-5 py-3">Stay</th><th className="px-5 py-3">Total</th><th className="px-5 py-3">Status</th><th className="px-5 py-3">Action</th></tr>
                </thead>
                <tbody className="divide-y divide-sand">
                  {bookings.map((booking) => (
                    <tr key={booking.ref}>
                      <td className="px-5 py-4"><Link to={`/booking/${booking.ref}`} className="font-medium text-gold-dark hover:underline">{booking.ref}</Link></td>
                      <td className="px-5 py-4"><span className="block">{booking.guest?.name}</span><span className="text-xs text-charcoal/55">{booking.guest?.email}</span></td>
                      <td className="px-5 py-4"><span className="block">{booking.roomName}</span><span className="text-xs text-charcoal/55">{formatDate(booking.checkIn)} · {booking.nights} nights</span></td>
                      <td className="px-5 py-4 font-medium">{formatMoney(booking.total)}</td>
                      <td className="px-5 py-4"><select value={booking.status || 'pending'} onChange={(e) => changeStatus(booking.ref, e.target.value)} className="input !w-auto !py-2">
                        <option value="pending">Pending</option><option value="confirmed">Confirmed</option><option value="cancelled">Cancelled</option>
                      </select></td>
                      <td className="px-5 py-4"><button type="button" onClick={() => remove(booking)} aria-label={`Delete ${booking.ref}`} className="grid h-9 w-9 place-items-center border border-sand text-charcoal/60 hover:border-red-700 hover:text-red-700"><Trash2 size={15} /></button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <DemoNotice className="mt-6">This is a browser-only demo dashboard. Reservations and account sessions are stored on this device and are not secure production authentication.</DemoNotice>
      </div>
    </section>
  );
}
