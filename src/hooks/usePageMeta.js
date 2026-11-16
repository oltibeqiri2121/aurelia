import { useEffect } from 'react';

export default function usePageMeta(title, description) {
  useEffect(() => {
    document.title = title ? `${title} | Aurelia Hotel & Resort` : 'Aurelia Hotel & Resort — A Stay Beyond Expectations';
    if (description) {
      let m = document.querySelector('meta[name="description"]');
      if (!m) { m = document.createElement('meta'); m.setAttribute('name', 'description'); document.head.appendChild(m); }
      m.setAttribute('content', description);
    }
  }, [title, description]);
}
