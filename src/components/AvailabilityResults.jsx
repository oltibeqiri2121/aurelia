import { Link } from 'react-router-dom';
import { BedDouble, Maximize2, Users } from 'lucide-react';
import Img from './Img';
import { Button, DemoNotice } from './ui';
import { calcTotal, formatMoney, nightsBetween } from '../utils/booking';

const chip = {
  available: 'bg-emerald-50 text-emerald-800',
  limited: 'bg-amber-50 text-amber-800',
  soldout: 'bg-stone-200 text-stone-700',
  capacity: 'bg-stone-200 text-stone-700',
};

export default function AvailabilityResults({ items, stay, mode = 'link', selectedId, onSelect, onBook }) {
  const nights = nightsBetween(stay.checkIn, stay.checkOut);
  if (!items.length) {
    return (
      <div className="border border-sand bg-white p-10 text-center">
        <BedDouble className="mx-auto mb-3 text-gold-dark" />
        <p className="font-serif text-2xl">No demo rooms match this party size</p>
        <p className="mt-2 text-sm text-charcoal/70">Try adding another room or reducing the number of guests.</p>
      </div>
    );
  }
  return (
    <div>
      <DemoNotice className="mb-5">Demo availability: results are simulated for illustration and are not connected to any real hotel inventory.</DemoNotice>
      <ul className="space-y-4">
        {items.map(({ room, available, status, label }) => {
          const selected = selectedId === room.id;
          return (
            <li key={room.id} className={`grid gap-4 border bg-white p-3 sm:grid-cols-[200px_1fr_auto] sm:items-center ${selected ? 'border-gold ring-1 ring-gold' : 'border-sand'} ${available ? '' : 'opacity-60'}`}>
              <Img id={room.images[0]} alt={room.name} sizes="200px" className="aspect-[4/3] sm:aspect-[4/3]" />
              <div>
                <span className={`inline-block px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.14em] ${chip[status]}`}>{label}</span>
                <h3 className="mt-2 text-2xl">{room.name}</h3>
                <p className="mt-1 flex flex-wrap gap-x-4 text-xs text-charcoal/65">
                  <span className="inline-flex items-center gap-1"><Users size={13} /> Up to {room.maxGuests}</span>
                  <span className="inline-flex items-center gap-1"><Maximize2 size={13} /> {room.size} m²</span>
                  <span className="inline-flex items-center gap-1"><BedDouble size={13} /> {room.bed}</span>
                </p>
                <p className="mt-2 text-xs text-charcoal/60">{formatMoney(room.price)} / night (example price)</p>
              </div>
              <div className="flex flex-col gap-2 sm:items-end sm:text-right">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.16em] text-charcoal/50">Estimated total · {nights} {nights === 1 ? 'night' : 'nights'}</p>
                  <p className="font-serif text-3xl">{formatMoney(calcTotal(room, nights, stay.rooms))}</p>
                </div>
                {mode === 'select' ? (
                  <Button variant={selected ? 'dark' : 'outline'} disabled={!available} aria-pressed={selected} onClick={() => onSelect(room)} className="!px-5 !py-3">
                    {selected ? 'Selected' : 'Select'}
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button variant="outline" to={`/rooms/${room.id}`} className="!px-4 !py-3">Details</Button>
                    <Button disabled={!available} onClick={() => onBook(room)} className="!px-4 !py-3">Book</Button>
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
