import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { isEmail } from '../utils/validation';

const SESSION_KEY = 'aurelia_demo_session_v1';
const ACCOUNTS_KEY = 'aurelia_demo_accounts_v1';
export const ADMIN_EMAIL = 'admin@aurelia.com';
export const ADMIN_PASSWORD = 'aurelia123';

function readSession() {
  try { return JSON.parse(localStorage.getItem(SESSION_KEY)) || null; } catch { return null; }
}

function readAccounts() {
  try { return JSON.parse(localStorage.getItem(ACCOUNTS_KEY)) || []; } catch { return []; }
}

const Ctx = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readSession);

  const signIn = useCallback((email, password, suppliedName = '') => {
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !password) return { ok: false, error: 'Please enter your email and password.' };
    if (!isEmail(cleanEmail)) return { ok: false, error: 'Please enter a valid email address.' };
    if (cleanEmail === ADMIN_EMAIL) {
      if (password !== ADMIN_PASSWORD) return { ok: false, error: 'Incorrect admin password.' };
      const admin = { name: 'Aurelia Admin', email: cleanEmail, role: 'admin' };
      try { localStorage.setItem(SESSION_KEY, JSON.stringify(admin)); } catch { return { ok: false, error: 'Your browser blocked account storage.' }; }
      setUser(admin);
      return { ok: true, user: admin };
    }
    if (password.length < 6) return { ok: false, error: 'Password must be at least 6 characters.' };
    const account = readAccounts().find((item) => item.email === cleanEmail);
    if (!account) return { ok: false, error: 'No account found for this email. Please create an account.' };
    if (account.password !== password) return { ok: false, error: 'Incorrect email or password.' };
    const fallbackName = cleanEmail.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
    const guest = { name: suppliedName || account.name || fallbackName, email: cleanEmail, role: 'guest' };
    try { localStorage.setItem(SESSION_KEY, JSON.stringify(guest)); } catch { return { ok: false, error: 'Your browser blocked account storage.' }; }
    setUser(guest);
    return { ok: true, user: guest };
  }, []);

  const createAccount = useCallback((name, email, password) => {
    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanName) return { ok: false, error: 'Please enter your name.' };
    if (!isEmail(cleanEmail)) return { ok: false, error: 'Please enter a valid email address.' };
    if (password.length < 6) return { ok: false, error: 'Password must be at least 6 characters.' };
    if (cleanEmail === ADMIN_EMAIL) return { ok: false, error: 'This email is reserved.' };
    const accounts = readAccounts();
    if (accounts.some((item) => item.email === cleanEmail)) return { ok: false, error: 'An account with this email already exists.' };
    const account = { name: cleanName, email: cleanEmail, password };
    try { localStorage.setItem(ACCOUNTS_KEY, JSON.stringify([...accounts, account])); }
    catch { return { ok: false, error: 'Your browser blocked account storage.' }; }
    return signIn(cleanEmail, password, cleanName);
  }, [signIn]);

  const signOut = useCallback(() => {
    try { localStorage.removeItem(SESSION_KEY); } catch { /* ignore */ }
    setUser(null);
  }, []);

  const value = useMemo(() => ({ user, signIn, createAccount, signOut, isAdmin: user?.role === 'admin' }), [user, signIn, createAccount, signOut]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useAuth = () => useContext(Ctx);
