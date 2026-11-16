import AmenityCard from './AmenityCard';
import { SectionHeading } from './ui';
import { amenities } from '../data/amenities';

export default function AmenitiesSection() {
  return (
    <section className="py-24 lg:py-32" id="amenities">
      <div className="container-x">
        <SectionHeading eyebrow="Hotel amenities" title="Everything, Beautifully Considered">
          Sample amenities for this fictional resort, designed to show how a premium hotel might present its services.
        </SectionHeading>
        <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {amenities.map((a, i) => <AmenityCard key={a.id} amenity={a} index={i} />)}
        </div>
      </div>
    </section>
  );
}
