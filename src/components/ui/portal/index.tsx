import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

const Portal = ({ children }: { children: ReactNode }) => {
  return createPortal(children, document.getElementById('portal-root')!);
};

export default Portal;
