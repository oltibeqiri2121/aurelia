import { useEffect, useRef, useState } from 'react';
import { imgUrl } from '../data/images';

export default function Img({ id, alt = '', sizes = '100vw', widths = [480, 800, 1200, 1800], className = '', imgClassName = '', priority = false }) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const ref = useRef(null);
  useEffect(() => { if (ref.current?.complete && ref.current.naturalWidth > 0) setLoaded(true); }, []);
  const srcSet = widths.map((w) => `${imgUrl(id, w)} ${w}w`).join(', ');

  return (
    <div className={`relative overflow-hidden bg-beige ${className}`}>
      {failed ? (
        <div className="grid h-full w-full place-items-center bg-sand/60 p-4 text-center">
          <div>
            <p className="font-serif text-4xl tracking-[0.3em] text-gold-dark">A</p>
            {alt && <p className="mt-2 text-[11px] uppercase tracking-[0.16em] text-charcoal/50">{alt}</p>}
          </div>
        </div>
      ) : (
        <img ref={ref} src={imgUrl(id, widths[1])} srcSet={srcSet} sizes={sizes} alt={alt}
          loading={priority ? 'eager' : 'lazy'} fetchpriority={priority ? 'high' : 'auto'} decoding="async"
          onLoad={() => setLoaded(true)} onError={() => setFailed(true)}
          className={`h-full w-full object-cover transition-[opacity,transform] duration-[900ms] ${loaded ? 'opacity-100' : 'opacity-0'} ${imgClassName}`} />
      )}
    </div>
  );
}
