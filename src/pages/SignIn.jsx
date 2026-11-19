import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LockKeyhole, Mail } from 'lucide-react';
import { Button, DemoNotice, Field, fieldProps } from '../components/ui';
import { ADMIN_EMAIL, useAuth } from '../context/AuthContext';
import usePageMeta from '../hooks/usePageMeta';

export default function SignIn() {
  usePageMeta('Sign In');
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const result = signIn(email, password);
    if (!result.ok) return setError(result.error);
    navigate(result.user.role === 'admin' ? '/admin' : '/booking');
  };

  return (
    <section className="min-h-[72vh] bg-beige pb-20 pt-32">
      <div className="mx-auto max-w-md px-5">
        <div className="border border-sand bg-white p-7 shadow-sm sm:p-10">
          <p className="eyebrow mb-3">Aurelia account</p>
          <h1 className="text-4xl">Sign In</h1>
          <p className="mt-3 text-sm leading-relaxed text-charcoal/65">Access your demo bookings or enter the hotel administration area.</p>
          <form onSubmit={handleSubmit} className="mt-8 space-y-5" noValidate>
            <Field label="Email address" id="email" error={error && !email ? error : ''}>
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/40" />
                <input {...fieldProps('email', error && !email)} type="email" value={email} onChange={(e) => { setEmail(e.target.value); setError(''); }} className="input pl-11" placeholder="you@example.com" autoComplete="email" />
              </div>
            </Field>
            <Field label="Password" id="password" error={error && email && password.length < 6 && email.toLowerCase() !== ADMIN_EMAIL ? error : ''}>
              <div className="relative">
                <LockKeyhole size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/40" />
                <input {...fieldProps('password', error && email && !password)} type="password" value={password} onChange={(e) => { setPassword(e.target.value); setError(''); }} className="input pl-11" placeholder="At least 6 characters" autoComplete="current-password" />
              </div>
            </Field>
            {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
            <Button type="submit" className="w-full">Sign In</Button>
          </form>
          <DemoNotice className="mt-6">
            This is a demo account system. Guest sign-in uses a valid email and a password of at least 6 characters.
          </DemoNotice>
          <p className="mt-6 text-center text-sm text-charcoal/60"><Link to="/" className="hover:text-gold-dark">Return to the website</Link></p>
        </div>
      </div>
    </section>
  );
}
