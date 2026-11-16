import PageHeader from '../components/PageHeader';
import ExperienceGrid from '../components/ExperienceGrid';
import Offers from '../components/Offers';
import { IMG } from '../data/images';
import usePageMeta from '../hooks/usePageMeta';

export default function Experiences() {
  usePageMeta('Experiences', 'Sample experiences at Aurelia: romantic getaways, spa days, fine dining and more.');
  return (
    <>
      <PageHeader eyebrow="Experiences" title="Moments Worth Travelling For" subtitle="Curated sample experiences for every kind of stay." image={IMG.romantic} />
      <ExperienceGrid />
      <Offers />
    </>
  );
}
