import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import About from '../components/About';
import AmenitiesSection from '../components/AmenitiesSection';
import ExperienceGrid from '../components/ExperienceGrid';
import Gallery from '../components/Gallery';
import ReviewCarousel from '../components/ReviewCarousel';
import Offers from '../components/Offers';
import RoomCard from '../components/RoomCard';
import AvailabilityResults from '../components/AvailabilityResults';
import Img from '../components/Img';
import { Button, Reveal, SectionHeading, Spinner } from '../components/ui';
import { rooms } from '../data/rooms';
import { IMG } from '../data/images';
import { useBooking } from '../context/BookingContext';
import { formatDate, nightsBetween, searchRooms } from '../utils/booking';
import usePageMeta from '../hooks/usePageMeta';

export default function Home() {
  usePageMeta('', 'Aurelia Hotel & Resort is a demonstration luxury hotel website with a working demo booking flow.');
  const { openBooking } = useBooking();
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const ref = useRef(null);
  const featured = ['deluxe-garden-room', 'executive-suite', 'presidential-suite'].map((id) => rooms.find((r) => r.id === id));

  const onSearch = (stay) => {
    setResults(null); setLoading(true);
    setTimeout(() => { setResults({ stay, items: searchRooms(rooms, stay) }); setLoading(false); }, 700);
  };
  useEffect(() => {
    if (loading || results) ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [loading, results]);

  return (
    <>
      <Hero onSearch={onSearch} />

      {(loading || results) && (
        <section ref={ref} className="scroll-mt-20 bg-beige py-16" aria-live="polite">
          <div className="container-x">
            {loading ? (
              <div className="grid place-items-center gap-3 py-12"><Spinner size={34} /><p className="text-sm text-charcoal/60">Searching demo availability…</p></div>
            ) : (
              <>
                <h2 className="text-3xl sm:text-4xl">Demo availability</h2>
                <p className="mb-6 mt-2 text-sm text-charcoal/70">
                  {formatDate(results.stay.checkIn)} → {formatDate(results.stay.checkOut)} · {nightsBetween(results.stay.checkIn, results.stay.checkOut)} nights · {results.stay.guests} guests · {results.stay.rooms} {results.stay.rooms === 1 ? 'room' : 'rooms'}
                </p>
                <AvailabilityResults items={results.items} stay={results.stay} onBook={(room) => openBooking({ ...results.stay, roomId: room.id, startStep: 3 })} />
              </>
            )}
          </div>
        </section>
      )}

      <About />

      <section className="bg-beige py-24 lg:py-32">
        <div className="container-x">
          <SectionHeading eyebrow="Rooms & suites" title="Rest, Beautifully">Example rooms with fictional demonstration prices.</SectionHeading>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{featured.map((r, i) => <RoomCard key={r.id} room={r} index={i} />)}</div>
          <div className="mt-12 text-center"><Button variant="dark" to="/rooms">View All Rooms & Suites</Button></div>
        </div>
      </section>

      <AmenitiesSection />

      <section className="bg-espresso text-ivory">
        <div className="grid lg:grid-cols-2">
          <Img id={IMG.restaurant} alt="Elegant restaurant dining room" sizes="(min-width:1024px) 50vw, 100vw" className="aspect-[4/3] lg:aspect-auto lg:min-h-[560px]" />
          <Reveal className="flex flex-col justify-center px-6 py-16 sm:px-14 lg:px-20">
            <p className="eyebrow mb-4 !text-gold-light">Restaurant & dining</p>
            <h2 className="text-4xl sm:text-5xl">An Evening to Savour</h2>
            <span className="mt-6 block h-px w-16 bg-gold" />
            <p className="mt-6 max-w-md leading-relaxed text-ivory/75">Seasonal tasting menus, a considered wine list and a dining room made for lingering. Menu and hours are fictional examples.</p>
            <div className="mt-8"><Button to="/dining">Discover Dining</Button></div>
          </Reveal>
        </div>
      </section>

      <ExperienceGrid />

      <section className="py-24 lg:py-32">
        <div className="container-x">
          <SectionHeading eyebrow="Gallery" title="A Glimpse of Aurelia">Sample photography of rooms, pool, dining and destination.</SectionHeading>
          <Gallery limit={6} filters={false} />
          <div className="mt-12 text-center"><Button variant="outline" to="/gallery">View Full Gallery</Button></div>
        </div>
      </section>

      <ReviewCarousel />
      <Offers />

      <section className="py-20 text-center">
        <Reveal className="container-x">
          <h2 className="text-4xl sm:text-5xl">Ready to Experience Aurelia?</h2>
          <p className="mx-auto mt-4 max-w-md text-charcoal/70">Walk through the complete demo booking flow in under a minute.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button onClick={() => openBooking()}>Book a Room</Button>
            <Button variant="outline" to="/contact">Contact Us</Button>
          </div>
          <p className="mt-6 text-xs text-charcoal/50"><Link to="/booking" className="underline underline-offset-4 hover:text-gold-dark">Find a saved demo booking</Link></p>
        </Reveal>
      </section>
    </>
  );
}
