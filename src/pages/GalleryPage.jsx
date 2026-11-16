import PageHeader from '../components/PageHeader';
import Gallery from '../components/Gallery';
import { IMG } from '../data/images';
import usePageMeta from '../hooks/usePageMeta';

export default function GalleryPage() {
  usePageMeta('Gallery', 'Browse photos of the Aurelia hotel exterior, rooms, suites, pool, restaurant, spa and destination.');
  return (
    <>
      <PageHeader eyebrow="Gallery" title="Inside Aurelia" subtitle="Rooms, pool, dining and the destination beyond." image={IMG.pool} />
      <section className="py-16 lg:py-24"><div className="container-x"><Gallery /></div></section>
    </>
  );
}
