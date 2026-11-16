import { useNavigate } from 'react-router-dom';
import BookingFlow from '../components/BookingFlow';
import usePageMeta from '../hooks/usePageMeta';

export default function Book() {
  usePageMeta('Book a Room (Demo)', 'Walk through the Aurelia demo booking flow.');
  const navigate = useNavigate();
  return (
    <section className="bg-beige pb-20 pt-28">
      <div className="container-x max-w-3xl">
        <h1 className="sr-only">Book Your Stay</h1>
        <div className="bg-ivory shadow-sm"><BookingFlow onComplete={(ref) => navigate(`/booking/${ref}`)} /></div>
      </div>
    </section>
  );
}
