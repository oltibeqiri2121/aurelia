import PageHeader from '../components/PageHeader';
import { DemoNotice } from '../components/ui';
import { IMG } from '../data/images';
import usePageMeta from '../hooks/usePageMeta';

const content = {
  privacy: {
    title: 'Privacy Policy',
    body: [
      ['Demonstration site', 'Aurelia is a fictional demonstration website. It has no backend and does not transmit personal data to any server.'],
      ['LocalStorage', 'Demo bookings (name, email, phone, stay details) are stored only in your own browser so you can revisit a confirmation. Use the Remove button on a booking, or clear your browser data, to delete them.'],
      ['Forms', 'The contact and newsletter forms validate input but do not send, store or share anything.'],
      ['Production use', 'Before launching a real hotel site, replace this text with a legally reviewed policy.'],
    ],
  },
  terms: {
    title: 'Terms of Use',
    body: [
      ['Demonstration only', 'Rooms, prices, offers, menus, hours and reviews are fictional. Nothing on this site constitutes a real offer or booking.'],
      ['No payments', 'No payments are processed and no card details are collected.'],
      ['Images', 'Photographs are loaded from Unsplash and remain the property of their creators under the Unsplash licence.'],
      ['Production use', 'Replace these terms with legally reviewed terms before real-world use.'],
    ],
  },
};

export default function Legal({ type }) {
  const c = content[type];
  usePageMeta(c.title);
  return (
    <>
      <PageHeader eyebrow="Legal" title={c.title} image={IMG.lobby2} />
      <section className="py-16"><div className="container-x max-w-3xl">
        <DemoNotice className="mb-10">Placeholder text for a demonstration website, not legal advice.</DemoNotice>
        {c.body.map(([h, p]) => <div key={h} className="mb-8"><h2 className="text-3xl">{h}</h2><p className="mt-2 leading-relaxed text-charcoal/75">{p}</p></div>)}
      </div></section>
    </>
  );
}
