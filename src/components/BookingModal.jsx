import { useNavigate } from 'react-router-dom';
import Modal from './Modal';
import BookingFlow from './BookingFlow';
import { useBooking } from '../context/BookingContext';

export default function BookingModal() {
  const { modal, closeBooking } = useBooking();
  const navigate = useNavigate();
  const initial = modal.initial || {};
  return (
    <Modal open={modal.open} onClose={closeBooking} title="Book a room (demo)" size="max-w-3xl">
      {modal.open && (
        <BookingFlow key={modal.key} initial={initial} startStep={initial.startStep || 0}
          onComplete={(ref) => { closeBooking(); navigate(`/booking/${ref}`); }} />
      )}
    </Modal>
  );
}
