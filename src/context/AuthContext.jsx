import { createContext, useCallback, useContext, useMemo, useState } from 'react';

const SESSION_KEY = 'aurelia_demo_session_v1';
export const ADMIN_EMAIL = 'admin@aurelia.com';
export const ADMIN_PASSWORD = 'aurelia123';

function readSession() {
  try { return JSON.parse(localStorage.getItem(SESSION_KEY)) || null; } catch { return null; }
}

const Ctx = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readSession);

  const signIn = useCallback((email, password) => {
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !password) return { ok: false, error: 'Please enter your email and password.' };
    if (cleanEmail === ADMIN_EMAIL) {
      if (password !== ADMIN_PASSWORD) return { ok: false, error: 'Incorrect admin password.' };
      const admin = { name: 'Aurelia Admin', email: cleanEmail, role: 'admin' };
      localStorage.setItem(SESSION_KEY, JSON.stringify(admin));
      setUser(admin);
      return { ok: true, user: admin };
    }
    if (password.length < 6) return { ok: false, error: 'Password must be at least 6 characters.' };
    const guest = { name: cleanEmail.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()), email: cleanEmail, role: 'guest' };
    localStorage.setItem(SESSION_KEY, JSON.stringify(guest));
    setUser(guest);
    return { ok: true, user: guest };
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  }, []);

  const value = useMemo(() => ({ user, signIn, signOut, isAdmin: user?.role === 'admin' }), [user, signIn, signOut]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useAuth = () => useContext(Ctx);
