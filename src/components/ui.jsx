import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Minus, Plus, Info, Loader2 } from 'lucide-react';

const base = 'inline-flex items-center justify-center gap-2 px-7 py-3.5 text-[12px] font-medium uppercase tracking-[0.18em] transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-50';
const variants = {
  gold: 'bg-gold text-charcoal hover:bg-gold-dark hover:text-white',
  dark: 'bg-espresso text-ivory hover:bg-charcoal',
  outline: 'border border-charcoal/30 text-charcoal hover:border-charcoal hover:bg-charcoal hover:text-ivory',
  light: 'border border-white/70 text-white hover:bg-white hover:text-charcoal',
  ghost: 'px-0 text-charcoal underline-offset-8 hover:text-gold-dark hover:underline',
};

export function Button({ variant = 'gold', to, className = '', children, ...props }) {
  const cls = `${base} ${variants[variant]} ${className}`;
  if (to) return <Link to={to} className={cls} {...props}>{children}</Link>;
  return <button type="button" className={cls} {...props}>{children}</button>;
}

export function Reveal({ children, delay = 0, y = 28, className = '' }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

export function SectionHeading({ eyebrow, title, children, align = 'center', light = false }) {
  return (
    <Reveal className={`mb-14 max-w-2xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      {eyebrow && <p className={`eyebrow mb-4 ${light ? '!text-gold-light' : ''}`}>{eyebrow}</p>}
      <h2 className={`text-4xl leading-tight sm:text-5xl ${light ? 'text-ivory' : ''}`}>{title}</h2>
      <span className="mx-auto mt-6 block h-px w-16 bg-gold" style={align === 'center' ? {} : { marginLeft: 0 }} />
      {children && <p className={`mt-6 leading-relaxed ${light ? 'text-ivory/75' : 'text-charcoal/70'}`}>{children}</p>}
    </Reveal>
  );
}

export const fieldProps = (id, error) => ({
  id,
  'aria-invalid': error ? true : undefined,
  'aria-describedby': error ? `${id}-error` : undefined,
});

export function Field({ label, id, error, children, className = '' }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-[11px] font-medium uppercase tracking-[0.16em] text-charcoal/70">{label}</label>
      {children}
      {error && <p id={`${id}-error`} role="alert" className="mt-1.5 text-xs text-red-700">{error}</p>}
    </div>
  );
}

export function Counter({ id, label, value, min = 1, max = 12, onChange, error }) {
  return (
    <Field label={label} id={id} error={error}>
      <div className="flex items-center justify-between border border-sand bg-white px-2 py-1.5">
        <button type="button" aria-label={`Decrease ${label}`} disabled={value <= min} onClick={() => onChange(value - 1)}
          className="grid h-9 w-9 place-items-center hover:bg-beige disabled:opacity-30"><Minus size={16} /></button>
        <output id={id} aria-live="polite" className="font-serif text-2xl">{value}</output>
        <button type="button" aria-label={`Increase ${label}`} disabled={value >= max} onClick={() => onChange(value + 1)}
          className="grid h-9 w-9 place-items-center hover:bg-beige disabled:opacity-30"><Plus size={16} /></button>
      </div>
    </Field>
  );
}

export function DemoNotice({ children, className = '' }) {
  return (
    <p className={`flex items-start gap-2 border border-gold/40 bg-gold-light/20 px-4 py-3 text-xs leading-relaxed text-espresso ${className}`}>
      <Info size={15} className="mt-0.5 shrink-0 text-gold-dark" /> <span>{children}</span>
    </p>
  );
}

export const Spinner = ({ size = 28 }) => <Loader2 size={size} className="animate-spin text-gold-dark" aria-label="Loading" />;
