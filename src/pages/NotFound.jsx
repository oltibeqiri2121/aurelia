import { Button } from '../components/ui';
import usePageMeta from '../hooks/usePageMeta';

export default function NotFound() {
  usePageMeta('Page Not Found');
  return (
    <section className="grid min-h-[80vh] place-items-center bg-espresso px-6 pt-24 text-center text-ivory">
      <div>
        <p className="font-serif text-8xl text-gold sm:text-9xl">404</p>
        <h1 className="mt-4 text-4xl sm:text-5xl">This Page Has Checked Out</h1>
        <p className="mx-auto mt-4 max-w-md text-ivory/70">The page you are looking for doesn’t exist or has moved. Let us guide you back.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button to="/">Return Home</Button>
          <Button variant="light" to="/rooms">View Rooms</Button>
        </div>
      </div>
    </section>
  );
}
