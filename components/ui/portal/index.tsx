import { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';

type PortalProps = {
  selector: string;
  children: React.ReactNode;
};

const Portal: React.FC<PortalProps> = ({ selector, children }) => {
  const ref = useRef<Element | null>(null);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    const selectorPrefixed = '#' + selector.replace(/^#/, '');
    ref.current = document.querySelector(selectorPrefixed);

    if (!ref.current) {
      const div = document.createElement('div');
      div.setAttribute('id', selector);
      div.setAttribute('data-xwallet', `0.1.1`);
      document.body.appendChild(div);
      ref.current = div;
    }

    setMounted(true);
  }, [selector]);

  if (!ref.current) return null;
  return mounted ? createPortal(children, ref.current) : null;
};

export default Portal;
