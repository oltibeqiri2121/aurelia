import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Img from './Img';
import BookingSearch from './BookingSearch';
import { Button } from './ui';
import { IMG } from '../data/images';
import { useBooking } from '../context/BookingContext';

export default function Hero({ onSearch }) {
  const { openBooking } = useBooking();
  return (
    <section className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-espresso text-ivory">
      <motion.div className="absolute inset-0" initial={{ scale: 1.12 }} animate={{ scale: 1 }} transition={{ duration: 9, ease: 'easeOut' }}>
        <Img id={IMG.hero} alt="Luxury resort with an infinity pool at golden hour" priority sizes="100vw" className="h-full w-full" />
      </motion.div>
      <div className="absolute inset-0 bg-charcoal/45" />
      <div className="container-x relative pb-10 pt-36 lg:pb-14">
        <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="eyebrow mb-5 !text-gold-light">Hotel & Resort · Demo experience</motion.p>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3 }}
          className="max-w-4xl text-5xl leading-[1.05] sm:text-7xl lg:text-8xl">A Stay Beyond <em className="text-gold-light">Expectations.</em></motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.7 }} className="mt-6 max-w-xl text-lg leading-relaxed text-ivory/85">
          Discover exceptional comfort, thoughtful hospitality, and unforgettable experiences in a destination designed for you.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.95 }} className="mt-9 flex flex-wrap gap-4">
          <Button variant="light" to="/rooms">Explore Our Rooms</Button>
          <Button onClick={() => openBooking()}>Book Your Stay</Button>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 1.1 }} className="mt-12 text-charcoal">
          <BookingSearch onSearch={onSearch} />
        </motion.div>
        <ChevronDown className="mx-auto mt-6 hidden animate-bounce text-ivory/60 lg:block" aria-hidden="true" />
      </div>
    </section>
  );
}
