import { useState } from 'react';
import { Clock } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import Img from '../components/Img';
import Modal from '../components/Modal';
import { Button, DemoNotice, Reveal } from '../components/ui';
import { diningHours, diningImage, diningImage2, menu } from '../data/dining';
import { IMG } from '../data/images';
import { formatMoney } from '../utils/booking';
import usePageMeta from '../hooks/usePageMeta';

const MenuList = ({ items }) => (
  <ul className="divide-y divide-sand">
    {items.map((m) => (
      <li key={m.name} className="flex items-baseline justify-between gap-6 py-4">
        <div><p className="font-serif text-xl">{m.name}</p><p className="text-sm text-charcoal/65">{m.desc}</p></div>
        <p className="font-serif text-xl text-gold-dark">{formatMoney(m.price)}</p>
      </li>
    ))}
  </ul>
);

export default function Dining() {
  usePageMeta('Restaurant & Dining', 'Explore the fictional Aurelia restaurant with a sample menu and example opening hours.');
  const cats = Object.keys(menu);
  const [tab, setTab] = useState(cats[0]);
  const [open, setOpen] = useState(false);
  return (
    <>
      <PageHeader eyebrow="Restaurant & dining" title="An Evening to Savour" subtitle="Seasonal cooking, thoughtful wines and a room made for lingering." image={IMG.restaurant2} />
      <section className="py-20 lg:py-28">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal><Img id={diningImage} alt="Aurelia restaurant dining room" sizes="(min-width:1024px) 50vw, 100vw" className="aspect-[4/5]" /></Reveal>
          <Reveal>
            <p className="eyebrow mb-4">The restaurant</p>
            <h2 className="text-4xl sm:text-5xl">Crafted with Season and Care</h2>
            <p className="mt-6 leading-relaxed text-charcoal/75">Imagine candlelit tables, an open kitchen and plates built around the best of each season. From slow breakfasts to a multi-course tasting dinner, dining at Aurelia is designed to feel unhurried and personal.</p>
            <DemoNotice className="mt-6">The menu, prices and opening hours on this page are fictional examples.</DemoNotice>
            <div className="mt-8 border border-sand bg-white p-6">
              <h3 className="mb-4 flex items-center gap-2 text-2xl"><Clock size={20} className="text-gold-dark" /> Example opening hours</h3>
              <ul className="space-y-2 text-sm">{diningHours.map((h) => <li key={h.label} className="flex justify-between border-b border-sand/70 pb-2 last:border-0"><span>{h.label}</span><span className="text-charcoal/70">{h.time}</span></li>)}</ul>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button onClick={() => setOpen(true)}>View Menu</Button>
              <Button variant="outline" to="/contact">Ask About a Table</Button>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-beige py-20 lg:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <Img id={diningImage2} alt="Table set for dinner" sizes="(min-width:1024px) 40vw, 100vw" className="aspect-[4/3] lg:aspect-auto lg:min-h-[420px]" />
          <div>
            <p className="eyebrow mb-4">Sample menu</p>
            <h2 className="mb-6 text-4xl">Menu Highlights</h2>
            <div role="tablist" aria-label="Menu categories" className="mb-4 flex flex-wrap gap-2">
              {cats.map((c) => (
                <button key={c} role="tab" aria-selected={tab === c} onClick={() => setTab(c)}
                  className={`border px-4 py-2 text-[11px] uppercase tracking-[0.16em] ${tab === c ? 'border-espresso bg-espresso text-ivory' : 'border-sand bg-white hover:border-gold'}`}>{c}</button>
              ))}
            </div>
            <div role="tabpanel"><MenuList items={menu[tab]} /></div>
          </div>
        </div>
      </section>

      <Modal open={open} onClose={() => setOpen(false)} title="Sample menu" size="max-w-2xl">
        <div className="p-6 sm:p-10">
          <p className="eyebrow mb-2">Fictional menu</p>
          <h2 className="mb-6 text-4xl">Aurelia Menu</h2>
          {cats.map((c) => <div key={c} className="mb-8"><h3 className="mb-1 border-b border-gold pb-2 text-2xl">{c}</h3><MenuList items={menu[c]} /></div>)}
          <p className="text-xs text-charcoal/60">Demonstration content. Items and prices are not real.</p>
        </div>
      </Modal>
    </>
  );
}
