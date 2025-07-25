'use client';

import * as React from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react'; 
import { Button } from './Button';

interface Song {
  title: string;
  artist: string;
}

interface ChoicePopupProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  data: any[]; 
  isLoading: boolean;
}

const ChoicePopup: React.FC<ChoicePopupProps> = ({ isOpen, onClose, title, data, isLoading }) => {
  const dummySongs: Song[] = [
    { title: "Bungong Jeumpa", artist: "Aceh",  },
    { title: "Butet", artist: "Sumatera Utara" },
    { title: "Soleram", artist: "Riau" },
    { title: "Apuse", artist: "Papua" },
    { title: "Yamko Rambe Yamko", artist: "Papua" },
  ];

  React.useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden'; // Mencegah body di belakang ikut scroll
    }
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={onClose}>
      <div
        className="relative w-full max-w-lg rounded-lg bg-white p-6 shadow-xl dark:bg-slate-900 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <div className="overflow-y-auto flex-1">
          {isLoading ? (
            <p>Loading data...</p>
          ) : (
            <ul className="space-y-4">
              {data.length > 0 ? data.map((item) => (
                <li key={item.id} className="border-b pb-2">
                  <p className="font-semibold">{item.name}</p>
                  {item.audioSrc && (
                    <audio controls className="w-full mt-2">
                      <source src={item.audioSrc} type="audio/mpeg" />
                    </audio>
                  )}
                   {item.imageUrl && (
                    <img src={item.imageUrl} alt={item.name} className="w-full h-auto mt-2 rounded" />
                  )}
                </li>
              )) : <p>Tidak ada data ditemukan.</p>}
            </ul>
          )}
        </div>
        <div className="mt-6 flex justify-end">
           <Button onClick={onClose}>Tutup</Button>
        </div>
      </div>
    </div>,
    document.body 
  );
};

export default ChoicePopup;