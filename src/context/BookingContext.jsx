import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { defaultStay } from '../utils/booking';

const Ctx = createContext(null);

export function BookingProvider({ children }) {
  const [search, setSearch] = useState(defaultStay);
  const [modal, setModal] = useState({ open: false, initial: null, key: 0 });
  const openBooking = useCallback((initial = null) => setModal({ open: true, initial, key: Date.now() }), []);
  const closeBooking = useCallback(() => setModal((m) => ({ ...m, open: false })), []);
  const value = useMemo(() => ({ search, setSearch, modal, openBooking, closeBooking }), [search, modal, openBooking, closeBooking]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useBooking = () => useContext(Ctx);
