import { SITE } from '../config';

const KEY = 'aurelia_demo_bookings_v1';
const pad = (n) => String(n).padStart(2, '0');
const parse = (iso) => { const [y, m, d] = iso.split('-').map(Number); return [y, m, d]; };

export const toISO = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
export const todayISO = () => toISO(new Date());
export const addDays = (iso, n) => { const [y, m, d] = parse(iso); return toISO(new Date(y, m - 1, d + n)); };

export const nightsBetween = (a, b) => {
  if (!a || !b) return 0;
  const [y1, m1, d1] = parse(a); const [y2, m2, d2] = parse(b);
  return Math.round((Date.UTC(y2, m2 - 1, d2) - Date.UTC(y1, m1 - 1, d1)) / 86400000);
};

export const formatDate = (iso) => {
  if (!iso) return '';
  const [y, m, d] = parse(iso);
  return new Date(y, m - 1, d).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
};

export const formatMoney = (n) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: SITE.currency, maximumFractionDigits: 0 }).format(n);

export const defaultStay = () => {
  const t = todayISO();
  return { checkIn: addDays(t, 14), checkOut: addDays(t, 17), guests: 2, rooms: 1 };
};

export function validateStay(s) {
  const e = {};
  if (!s.checkIn) e.checkIn = 'Please choose a check-in date.';
  else if (s.checkIn < todayISO()) e.checkIn = 'Check-in cannot be in the past.';
  if (!s.checkOut) e.checkOut = 'Please choose a check-out date.';
  else if (s.checkIn && nightsBetween(s.checkIn, s.checkOut) <= 0) e.checkOut = 'Check-out must be after check-in.';
  else if (nightsBetween(s.checkIn, s.checkOut) > 30) e.checkOut = 'Demo stays are limited to 30 nights.';
  if (!(Number(s.guests) >= 1)) e.guests = 'At least one guest is required.';
  if (!(Number(s.rooms) >= 1)) e.rooms = 'At least one room is required.';
  else if (Number(s.rooms) > Number(s.guests)) e.rooms = 'Each room needs at least one guest.';
  return e;
}

// DEMO ONLY: deterministic, simulated availability. Replace with a real inventory API in production.
export function getAvailability(room, stay) {
  const seed = `${room.id}|${stay.checkIn}`;
  let h = 0;
  for (const c of seed) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  const left = h % (room.inventory + 1);
  const fits = Number(stay.guests) <= room.maxGuests * Number(stay.rooms);
  const available = fits && left >= Number(stay.rooms);
  let status = 'available';
  let label = 'Available (demo)';
  if (!fits) { status = 'capacity'; label = 'Too small for this party'; }
  else if (!available) { status = 'soldout'; label = 'Unavailable for these dates (demo)'; }
  else if (left <= 2) { status = 'limited'; label = `Only ${left} left (demo)`; }
  return { fits, left, available, status, label };
}

export const searchRooms = (rooms, stay) => rooms.map((room) => ({ room, ...getAvailability(room, stay) }));
export const calcTotal = (room, nights, qty) => room.price * nights * qty;

export function getBookings() {
  try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch { return []; }
}
export function getBookingByRef(ref) {
  return getBookings().find((b) => b.ref.toLowerCase() === String(ref).trim().toLowerCase()) || null;
}
export function saveBooking(booking) {
  try { localStorage.setItem(KEY, JSON.stringify([{ ...booking, status: 'pending' }, ...getBookings()])); return true; } catch { return false; }
}
export function deleteBooking(ref) {
  try { localStorage.setItem(KEY, JSON.stringify(getBookings().filter((b) => b.ref !== ref))); } catch { /* ignore */ }
}
export function updateBookingStatus(ref, status) {
  try {
    localStorage.setItem(KEY, JSON.stringify(getBookings().map((booking) =>
      booking.ref === ref ? { ...booking, status } : booking
    )));
  } catch { /* ignore */ }
}
export function generateReference() {
  const existing = new Set(getBookings().map((b) => b.ref));
  let ref;
  do {
    const t = Date.now().toString(36).slice(-4).toUpperCase();
    const r = Math.random().toString(36).slice(2, 6).toUpperCase();
    ref = `AUR-DEMO-${t}${r}`;
  } while (existing.has(ref));
  return ref;
}
