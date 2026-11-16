import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Clock, Mail, MapPin, Phone } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { Button, DemoNotice, Field, fieldProps } from '../components/ui';
import { faqs } from '../data/faq';
import { IMG } from '../data/images';
import { SITE } from '../config';
import { useToast } from '../context/ToastContext';
import { isEmail, isPhone } from '../utils/validation';
import usePageMeta from '../hooks/usePageMeta';

function FAQ({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-sand">
      <button onClick={() => setOpen((o) => !o)} aria-expanded={open} className="flex w-full items-center justify-between gap-4 py-5 text-left font-serif text-xl">
        {q}<ChevronDown size={18} className={`shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden pb-5 text-sm leading-relaxed text-charcoal/70">{a}</motion.p>}
      </AnimatePresence>
    </div>
  );
}

export default function Contact() {
  usePageMeta('Contact & Location', 'Contact the fictional Aurelia Hotel & Resort. Demo contact form, FAQs and check-in information.');
  const { toast } = useToast();
  const [f, setF] = useState({ name: '', email: '', phone: '', subject: 'General enquiry', message: '' });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const set = (k) => (e) => { setF({ ...f, [k]: e.target.value }); setErrors({ ...errors, [k]: undefined }); setSent(false); };
  const cls = (e) => `input ${e ? 'input-error' : ''}`;

  const submit = (e) => {
    e.preventDefault();
    const er = {};
    if (f.name.trim().length < 2) er.name = 'Please enter your name.';
    if (!isEmail(f.email)) er.email = 'Please enter a valid email address.';
    if (f.phone && !isPhone(f.phone)) er.phone = 'Please enter a valid phone number or leave it blank.';
    if (f.message.trim().length < 10) er.message = 'Please write at least 10 characters.';
    setErrors(er);
    if (Object.keys(er).length) return;
    setSent(true);
    setF({ name: '', email: '', phone: '', subject: 'General enquiry', message: '' });
    toast('Demo form validated. Nothing was sent.', 'info');
  };

  return (
    <>
      <PageHeader eyebrow="Contact & location" title="We’d Love to Hear from You" subtitle="Send a message through the demo form below." image={IMG.lobby} />
      <section className="py-20 lg:py-28">
        <div className="container-x grid gap-14 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
          <form onSubmit={submit} noValidate aria-label="Contact form" className="grid gap-5">
            <h2 className="text-4xl">Send a Message</h2>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Full name" id="c-name" error={errors.name}><input {...fieldProps('c-name', errors.name)} autoComplete="name" value={f.name} onChange={set('name')} className={cls(errors.name)} /></Field>
              <Field label="Email" id="c-email" error={errors.email}><input {...fieldProps('c-email', errors.email)} type="email" autoComplete="email" value={f.email} onChange={set('email')} className={cls(errors.email)} /></Field>
              <Field label="Phone (optional)" id="c-phone" error={errors.phone}><input {...fieldProps('c-phone', errors.phone)} type="tel" autoComplete="tel" value={f.phone} onChange={set('phone')} className={cls(errors.phone)} /></Field>
              <Field label="Subject" id="c-subject">
                <select id="c-subject" value={f.subject} onChange={set('subject')} className="input">
                  {['General enquiry', 'Rooms & suites', 'Dining', 'Events & celebrations'].map((s) => <option key={s}>{s}</option>)}
                </select>
              </Field>
            </div>
            <Field label="Message" id="c-message" error={errors.message}><textarea {...fieldProps('c-message', errors.message)} rows={6} value={f.message} onChange={set('message')} className={cls(errors.message)} /></Field>
            <div><Button type="submit">Send Message</Button></div>
            {sent && <DemoNotice role="status">Demo success: your message passed validation, but no backend or email service is connected, so it was not sent to anyone.</DemoNotice>}
          </form>

          <div>
            <h2 className="text-4xl">Find Us</h2>
            <ul className="mt-6 space-y-4 text-sm">
              <li className="flex gap-3"><MapPin size={18} className="mt-0.5 shrink-0 text-gold-dark" /> {SITE.address.join(', ')} <span className="text-charcoal/50">(placeholder)</span></li>
              <li className="flex gap-3"><Phone size={18} className="shrink-0 text-gold-dark" /> {SITE.phone} <span className="text-charcoal/50">(placeholder)</span></li>
              <li className="flex gap-3"><Mail size={18} className="shrink-0 text-gold-dark" /> {SITE.email} <span className="text-charcoal/50">(placeholder)</span></li>
              <li className="flex gap-3"><Clock size={18} className="shrink-0 text-gold-dark" /> Check-in from {SITE.checkIn} · Check-out by {SITE.checkOut}</li>
            </ul>
            <div className="mt-8 aspect-[4/3] overflow-hidden border border-sand bg-beige">
              {SITE.mapEmbedUrl ? (
                <iframe title="Hotel location map" src={SITE.mapEmbedUrl} loading="lazy" className="h-full w-full border-0" referrerPolicy="no-referrer-when-downgrade" />
              ) : (
                <div className="grid h-full place-items-center p-6 text-center">
                  <div><MapPin className="mx-auto mb-3 text-gold-dark" size={32} /><p className="font-serif text-2xl">Map placeholder</p><p className="mt-1 text-xs text-charcoal/60">Set <code>mapEmbedUrl</code> in <code>src/config.js</code> to show a real map.</p></div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <section className="bg-beige py-20">
        <div className="container-x max-w-3xl">
          <h2 className="mb-8 text-center text-4xl">Frequently Asked Questions</h2>
          <div className="border-t border-sand">{faqs.map((x) => <FAQ key={x.q} {...x} />)}</div>
        </div>
      </section>
    </>
  );
}
