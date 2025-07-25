'use client';

import * as React from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react'; // Impor ikon untuk tombol close

// Definisikan tipe untuk properti lagu
interface Song {
  title: string;
  artist: string;
  audioSrc: string; // URL ke file MP3
}

// UBAH: Hilangkan `children` karena konten sekarang spesifik untuk lagu
interface MusicPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChoicePopup: React.FC<MusicPopupProps> = ({ isOpen, onClose }) => {
  // BARU: Data dummy untuk daftar lagu
  const dummySongs: Song[] = [
    { title: "Bungong Jeumpa", artist: "Aceh", audioSrc: "/path/to/song1.mp3" },
    { title: "Butet", artist: "Sumatera Utara", audioSrc: "/path/to/song2.mp3" },
    { title: "Soleram", artist: "Riau", audioSrc: "/path/to/song3.mp3" },
    { title: "Apuse", artist: "Papua", audioSrc: "/path/to/song4.mp3" },
    { title: "Yamko Rambe Yamko", artist: "Papua", audioSrc: "/path/to/song5.mp3" },
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
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      onClick={onClose} 
    >
      {/* UBAH: Ukuran popup dibuat lebih tinggi dan lebar */}
      <div
        className="relative flex flex-col w-full max-w-xl h-[80vh] rounded-lg bg-white p-6 shadow-xl dark:bg-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* BARU: Header untuk popup */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Lagu Tradisional</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* BARU: Kontainer slider/carousel horizontal yang scrollable */}
        <div className="flex-1 overflow-x-auto snap-x snap-mandatory scroll-smooth flex">
          {dummySongs.map((song, index) => (
            <div key={index} className="flex-shrink-0 w-full h-full snap-center flex flex-col items-center justify-center p-4">
              <div className="w-full max-w-sm">
                <div className="aspect-square w-full bg-gray-200 dark:bg-slate-800 rounded-lg mb-4">
                  {/* Anda bisa menaruh gambar album di sini */}
                </div>
                <h3 className="text-lg font-semibold">{song.title}</h3>
                <p className="text-sm text-slate-500">{song.artist}</p>
                <audio controls className="w-full mt-4">
                  <source src={song.audioSrc} type="audio/mpeg" />
                  Browser Anda tidak mendukung elemen audio.
                </audio>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>,
    document.body 
  );
};

export default ChoicePopup;