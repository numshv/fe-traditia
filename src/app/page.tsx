'use client';

import dynamic from 'next/dynamic';

const Map = dynamic(
  () => import('@/components/IndonesiaMap'),
  { 
    ssr: false,
    // Opsional: tampilkan loading state agar lebih baik
    loading: () => (
      <div className="w-full h-full flex items-center justify-center">
        <p>Memuat Peta...</p>
      </div>
    )
  }
);

export default function Home() {
  return (
    // 1. Kontainer utama dibuat setinggi layar dan diberi PADDING
    // Padding ini berfungsi sebagai margin untuk konten di dalamnya.
    <main className="h-screen w-screen p-10">

      {/* 2. Kontainer ini sekarang mengisi ruang di dalam padding dengan aman */}
      <div className="h-full w-full relative">
        <Map /> 
      </div>
      
    </main>
  );
}