import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BedDouble, Maximize2, Users } from 'lucide-react';
import Img from './Img';
import { Button } from './ui';
import { useBooking } from '../context/BookingContext';
import { formatMoney } from '../utils/booking';

export default function RoomCard({ room, index = 0 }) {
  const { openBooking } = useBooking();
  return (
    <motion.article initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: (index % 3) * 0.08 }} className="group flex flex-col border border-sand bg-white">
      <Link to={`/rooms/${room.id}`} aria-label={`View details for ${room.name}`} className="relative block aspect-[4/3] overflow-hidden">
        <Img id={room.images[0]} alt={`${room.name}: ${room.tagline}`} sizes="(min-width:1280px) 33vw, (min-width:768px) 50vw, 100vw" className="h-full w-full" imgClassName="group-hover:scale-105" />
        <div className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
          <Img id={room.images[1]} alt="" sizes="(min-width:1280px) 33vw, (min-width:768px) 50vw, 100vw" className="h-full w-full" imgClassName="scale-105" />
        </div>
        <span className="absolute left-4 top-4 bg-ivory/95 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.18em]">{room.category === 'Rooms' ? 'Room' : room.category === 'Suites' ? 'Suite' : 'Family'}</span>
      </Link>
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <h3 className="text-3xl">{room.name}</h3>
        <p className="mt-3 text-sm leading-relaxed text-charcoal/70">{room.description}</p>
        <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs text-charcoal/70">
          <li className="inline-flex items-center gap-1.5"><Users size={14} className="text-gold-dark" /> Up to {room.maxGuests} guests</li>
          <li className="inline-flex items-center gap-1.5"><Maximize2 size={14} className="text-gold-dark" /> {room.size} m²</li>
          <li className="inline-flex items-center gap-1.5"><BedDouble size={14} className="text-gold-dark" /> {room.bed}</li>
        </ul>
        <ul className="mt-4 flex flex-wrap gap-2">
          {room.amenities.slice(0, 4).map((a) => <li key={a} className="border border-sand px-2.5 py-1 text-[11px] text-charcoal/70">{a}</li>)}
          <li className="px-1 py-1 text-[11px] text-gold-dark">+{room.amenities.length - 4} more</li>
        </ul>
        <div className="mt-6 border-t border-sand pt-5">
          <p className="text-[10px] uppercase tracking-[0.18em] text-charcoal/50">Example nightly rate · demo price</p>
          <p className="font-serif text-4xl">{formatMoney(room.price)} <span className="font-sans text-sm text-charcoal/60">/ night</span></p>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3">
          <Button variant="outline" to={`/rooms/${room.id}`} className="!px-3">View Details</Button>
          <Button onClick={() => openBooking({ roomId: room.id })} className="!px-3">Book Now</Button>
        </div>
      </div>
    </motion.article>
  );
}
