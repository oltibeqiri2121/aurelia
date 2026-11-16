import { useState } from 'react';
import { Search } from 'lucide-react';
import { Button, Field, fieldProps } from './ui';
import { useBooking } from '../context/BookingContext';
import { addDays, nightsBetween, todayISO, validateStay } from '../utils/booking';

export default function BookingSearch({ onSearch }) {
  const { search, setSearch } = useBooking();
  const [errors, setErrors] = useState({});
  const today = todayISO();

  const update = (key, value) => {
    setSearch((s) => {
      const next = { ...s, [key]: value };
      if (key === 'checkIn' && value && nightsBetween(value, next.checkOut) <= 0) next.checkOut = addDays(value, 1);
      return next;
    });
    setErrors((e) => ({ ...e, [key]: undefined, ...(key === 'checkIn' ? { checkOut: undefined } : {}) }));
  };

  const submit = (e) => {
    e.preventDefault();
    const errs = validateStay(search);
    setErrors(errs);
    if (Object.keys(errs).length === 0) onSearch(search);
  };
  const cls = (err) => `input ${err ? 'input-error' : ''}`;

  return (
    <form onSubmit={submit} noValidate aria-label="Search room availability"
      className="grid gap-4 bg-ivory p-5 shadow-2xl sm:grid-cols-2 lg:grid-cols-[1.2fr_1.2fr_1fr_1fr_auto] lg:p-6">
      <Field label="Check-in" id="hs-in" error={errors.checkIn}>
        <input {...fieldProps('hs-in', errors.checkIn)} type="date" min={today} value={search.checkIn} onChange={(e) => update('checkIn', e.target.value)} className={cls(errors.checkIn)} />
      </Field>
      <Field label="Check-out" id="hs-out" error={errors.checkOut}>
        <input {...fieldProps('hs-out', errors.checkOut)} type="date" min={search.checkIn ? addDays(search.checkIn, 1) : today} value={search.checkOut} onChange={(e) => update('checkOut', e.target.value)} className={cls(errors.checkOut)} />
      </Field>
      <Field label="Guests" id="hs-guests" error={errors.guests}>
        <select {...fieldProps('hs-guests', errors.guests)} value={search.guests} onChange={(e) => update('guests', Number(e.target.value))} className={cls(errors.guests)}>
          {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => <option key={n} value={n}>{n} {n === 1 ? 'guest' : 'guests'}</option>)}
        </select>
      </Field>
      <Field label="Rooms" id="hs-rooms" error={errors.rooms}>
        <select {...fieldProps('hs-rooms', errors.rooms)} value={search.rooms} onChange={(e) => update('rooms', Number(e.target.value))} className={cls(errors.rooms)}>
          {Array.from({ length: 6 }, (_, i) => i + 1).map((n) => <option key={n} value={n}>{n} {n === 1 ? 'room' : 'rooms'}</option>)}
        </select>
      </Field>
      <Button type="submit" className="sm:col-span-2 lg:col-span-1 lg:mt-[26px] lg:self-start"><Search size={15} /> Search Availability</Button>
    </form>
  );
}
