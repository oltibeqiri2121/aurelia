import { useMemo, useState } from 'react';
import PageHeader from '../components/PageHeader';
import RoomCard from '../components/RoomCard';
import { DemoNotice } from '../components/ui';
import { roomCategories, rooms } from '../data/rooms';
import { IMG } from '../data/images';
import usePageMeta from '../hooks/usePageMeta';

const sorts = {
  recommended: ['Recommended', (a, b) => a.order - b.order],
  'price-asc': ['Price: low to high', (a, b) => a.price - b.price],
  'price-desc': ['Price: high to low', (a, b) => b.price - a.price],
  capacity: ['Occupancy: highest first', (a, b) => b.maxGuests - a.maxGuests],
  size: ['Size: largest first', (a, b) => b.size - a.size],
};

export default function Rooms() {
  usePageMeta('Rooms & Suites', 'Browse demonstration rooms and suites at Aurelia Hotel & Resort, with example nightly prices.');
  const [cat, setCat] = useState('All');
  const [sort, setSort] = useState('recommended');
  const list = useMemo(
    () => rooms.filter((r) => cat === 'All' || r.category === cat).sort(sorts[sort][1]),
    [cat, sort]
  );
  return (
    <>
      <PageHeader eyebrow="Accommodation" title="Rooms & Suites" subtitle="Calm, elegant spaces designed for deep rest." image={IMG.suite1} />
      <section className="py-16 lg:py-24">
        <div className="container-x">
          <DemoNotice className="mb-10">All room details and prices are fictional demonstration content.</DemoNotice>
          <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div role="group" aria-label="Filter rooms by category" className="flex flex-wrap gap-2">
              {roomCategories.map((c) => (
                <button key={c} onClick={() => setCat(c)} aria-pressed={cat === c}
                  className={`border px-5 py-2.5 text-[11px] uppercase tracking-[0.16em] transition-colors ${cat === c ? 'border-espresso bg-espresso text-ivory' : 'border-sand hover:border-gold'}`}>{c}</button>
              ))}
            </div>
            <div className="sm:w-64">
              <label htmlFor="sort" className="mb-2 block text-[11px] uppercase tracking-[0.16em] text-charcoal/70">Sort by</label>
              <select id="sort" value={sort} onChange={(e) => setSort(e.target.value)} className="input">
                {Object.entries(sorts).map(([k, [label]]) => <option key={k} value={k}>{label}</option>)}
              </select>
            </div>
          </div>
          <p className="mb-6 text-sm text-charcoal/60" aria-live="polite">{list.length} {list.length === 1 ? 'option' : 'options'} shown</p>
          {list.length === 0 ? (
            <p className="py-16 text-center text-charcoal/60">No rooms in this category.</p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">{list.map((r, i) => <RoomCard key={r.id} room={r} index={i} />)}</div>
          )}
        </div>
      </section>
    </>
  );
}
