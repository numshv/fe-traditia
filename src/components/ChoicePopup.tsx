'use client';

import * as React from 'react';
import { createPortal } from 'react-dom';

interface AlertDialogProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const ChoicePopup: React.FC<AlertDialogProps> = ({ isOpen, onClose, children }) => {
  React.useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
    }
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      onClick={onClose} 
    >
      <div
        className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-xl dark:bg-slate-900"
        onClick={(e) => e.stopPropagation()} // Mencegah dialog tertutup saat area di dalamnya diklik
      >
        {children}
      </div>
    </div>,
    document.body 
  );
};

export default ChoicePopup;