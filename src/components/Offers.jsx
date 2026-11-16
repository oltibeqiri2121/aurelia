import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';
import Img from './Img';
import Modal from './Modal';
import { Button, DemoNotice, Reveal, SectionHeading } from './ui';
import { offers } from '../data/offers';
import { useBooking } from '../context/BookingContext';

export default function Offers() {
  const [active, setActive] = useState(null);
  const navigate = useNavigate();
  const { openBooking } = useBooking();
  return (
    <section id="offers" className="scroll-mt-20 bg-beige py-24 lg:py-32">
      <div className="container-x">
        <SectionHeading eyebrow="Special offers" title="Stay a Little Longer">
          All offers below are sample content and are not currently available.
        </SectionHeading>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {offers.map((o, i) => (
            <Reveal key={o.id} delay={i * 0.08}>
              <article className="group flex h-full flex-col border border-sand bg-white">
                <div className="relative">
                  <Img id={o.image} alt={o.title} sizes="(min-width:1024px) 25vw, 50vw" className="aspect-[4/3]" imgClassName="group-hover:scale-105" />
                  <span className="absolute left-3 top-3 bg-charcoal px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-ivory">Sample offer</span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-2xl">{o.title}</h3>
                  <p className="mt-1 text-sm font-medium text-gold-dark">{o.price}</p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-charcoal/70">{o.text}</p>
                  <Button variant="outline" className="mt-6 !px-4" onClick={() => setActive(o)}>View Offer</Button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
      <Modal open={!!active} onClose={() => setActive(null)} title={active?.title || 'Offer'} size="max-w-2xl">
        {active && (
          <>
            <Img id={active.image} alt={active.title} sizes="672px" className="aspect-[16/9]" />
            <div className="p-6 sm:p-10">
              <p className="eyebrow mb-2">Sample offer</p>
              <h3 className="text-4xl">{active.title}</h3>
              <p className="mt-2 font-medium text-gold-dark">{active.price}</p>
              <p className="mt-4 leading-relaxed text-charcoal/75">{active.text}</p>
              <ul className="mt-5 space-y-2">
                {active.includes.map((x) => (
                  <li key={x} className="flex items-center gap-2 text-sm"><Check size={15} className="text-gold-dark" /> {x}</li>
                ))}
              </ul>
              <DemoNotice className="mt-6">Sample content only. This offer is fictional and is not currently available to book.</DemoNotice>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button onClick={() => { setActive(null); openBooking(); }}>Try the Demo Booking</Button>
                <Button variant="outline" onClick={() => { setActive(null); navigate('/rooms'); }}>Browse Rooms</Button>
              </div>
            </div>
          </>
        )}
      </Modal>
    </section>
  );
}
