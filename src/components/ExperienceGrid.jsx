import { useState } from 'react';
import { Check } from 'lucide-react';
import Img from './Img';
import Modal from './Modal';
import { Button, DemoNotice, Reveal, SectionHeading } from './ui';
import { experiences } from '../data/experiences';
import { useBooking } from '../context/BookingContext';

export default function ExperienceGrid() {
  const [active, setActive] = useState(null);
  const { openBooking } = useBooking();
  return (
    <section className="bg-beige py-24 lg:py-32" id="experiences">
      <div className="container-x">
        <SectionHeading eyebrow="Experiences" title="Make Every Moment Special">
          Six sample experiences, each shaped around a different way of travelling.
        </SectionHeading>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {experiences.map((e, i) => {
            const Icon = e.icon;
            return (
              <Reveal key={e.id} delay={(i % 3) * 0.08}>
                <article className="group relative h-full overflow-hidden bg-espresso text-ivory">
                  <Img id={e.image} alt={e.title} sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw" className="aspect-[4/5]" imgClassName="opacity-80 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <Icon className="mb-3 text-gold" size={24} strokeWidth={1.4} />
                    <h3 className="text-3xl">{e.title}</h3>
                    <p className="mt-2 text-sm text-ivory/80">{e.short}</p>
                    <Button variant="light" className="mt-5 !px-5 !py-3" onClick={() => setActive(e)}>Explore Experience</Button>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
      <Modal open={!!active} onClose={() => setActive(null)} title={active?.title || 'Experience'} size="max-w-2xl">
        {active && (
          <>
            <Img id={active.image} alt={active.title} sizes="672px" className="aspect-[16/9]" />
            <div className="p-6 sm:p-10">
              <p className="eyebrow mb-2">Sample experience</p>
              <h3 className="text-4xl">{active.title}</h3>
              <p className="mt-2 font-medium text-gold-dark">{active.from}</p>
              <p className="mt-4 leading-relaxed text-charcoal/75">{active.long}</p>
              <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                {active.includes.map((x) => <li key={x} className="flex items-center gap-2 text-sm"><Check size={15} className="text-gold-dark" /> {x}</li>)}
              </ul>
              <DemoNotice className="mt-6">Fictional experience and example pricing for demonstration. Nothing here can be booked for real.</DemoNotice>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button onClick={() => { setActive(null); openBooking(); }}>Plan a Demo Stay</Button>
                <Button variant="outline" onClick={() => setActive(null)}>Close</Button>
              </div>
            </div>
          </>
        )}
      </Modal>
    </section>
  );
}
