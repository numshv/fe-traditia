'use client';

import dynamic from 'next/dynamic';
import { InputField } from '@/components/InputField'; // Impor komponen input
import { useState } from 'react';

const Map = dynamic(
  () => import('@/components/IndonesiaMap'),
  { 
    ssr: false,
    loading: () => <div className="h-full w-full flex items-center justify-center"><p>Memuat Peta...</p></div>
  }
);


export default function Home() {
  const [isMapFocused, setIsMapFocused] = useState(false);
  return (
    <main className="h-screen w-full relative font-serif p-8">
      <section className="absolute inset-0 z-10">
        <Map onFocusChange={setIsMapFocused} /> 
      </section>
      <section className={`
        absolute inset-0 z-20 flex flex-col items-center mt-8 text-center gap-4 p-8 pointer-events-none 
        transition-opacity duration-500 
        ${isMapFocused ? 'opacity-0' : 'opacity-100'}
      `}>
        <div className="pointer-events-auto">
          <h1 className="text-3xl font-medium">
            Temukan Kekayaan Budaya, Mulai dari Sini
          </h1>
          <div className="w-full max-w-lg mt-2">
            <InputField placeholder="Ketik pencarian Anda..." />
          </div>
          <p className="mt-2 text-sm">
            atau... klik peta dan jelajahi keragaman budaya Indonesia
          </p>
        </div>
      </section>
      
    </main>
  );
}