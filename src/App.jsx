import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { MotionConfig, motion } from 'framer-motion';
import { ToastProvider } from './context/ToastContext';
import { BookingProvider } from './context/BookingContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import ScrollToTop from './components/ScrollToTop';
import { Spinner } from './components/ui';
import { AuthProvider } from './context/AuthContext';

const Home = lazy(() => import('./pages/Home'));
const Rooms = lazy(() => import('./pages/Rooms'));
const RoomDetails = lazy(() => import('./pages/RoomDetails'));
const Dining = lazy(() => import('./pages/Dining'));
const Experiences = lazy(() => import('./pages/Experiences'));
const GalleryPage = lazy(() => import('./pages/GalleryPage'));
const Contact = lazy(() => import('./pages/Contact'));
const Book = lazy(() => import('./pages/Book'));
const BookingConfirmation = lazy(() => import('./pages/BookingConfirmation'));
const Legal = lazy(() => import('./pages/Legal'));
const NotFound = lazy(() => import('./pages/NotFound'));
const SignIn = lazy(() => import('./pages/SignIn'));
const Admin = lazy(() => import('./pages/Admin'));

function Layout() {
  const { pathname } = useLocation();
  return (
    <>
      <a href="#main" className="sr-only z-[200] bg-gold px-4 py-2 text-charcoal focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
        Skip to content
      </a>
      <Navbar />
      <motion.main id="main" key={pathname} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <Suspense fallback={<div className="grid min-h-[60vh] place-items-center"><Spinner /></div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/rooms/:slug" element={<RoomDetails />} />
            <Route path="/dining" element={<Dining />} />
            <Route path="/experiences" element={<Experiences />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/book" element={<Book />} />
            <Route path="/booking" element={<BookingConfirmation />} />
            <Route path="/booking/:ref" element={<BookingConfirmation />} />
            <Route path="/privacy" element={<Legal type="privacy" />} />
            <Route path="/terms" element={<Legal type="terms" />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </motion.main>
      <Footer />
      <BookingModal />
    </>
  );
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <ToastProvider>
        <AuthProvider>
          <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <BookingProvider>
              <ScrollToTop />
              <Layout />
            </BookingProvider>
          </BrowserRouter>
        </AuthProvider>
      </ToastProvider>
    </MotionConfig>
  );
}
