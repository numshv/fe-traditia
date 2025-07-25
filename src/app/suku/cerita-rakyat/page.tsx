'use client';
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRef } from 'react';
import dynamic from "next/dynamic";

const PDFLinkClient = dynamic(
  () => import("@/components/PdfLinkClient"),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  },
);

function splitTextToPages(text: string, maxCharPerColumn: number): string[][] {
  const chunks: string[] = [];
  let i = 0;

  while (i < text.length) {
    const nextChunk = text.slice(i, i + maxCharPerColumn);
    const lastSpace = nextChunk.lastIndexOf(" ");
    const end = lastSpace > 0 ? i + lastSpace : i + maxCharPerColumn;

    chunks.push(text.slice(i, end).trim());
    i = end;
  }

  // Gabungkan 2 kolom per halaman
  const pages: string[][] = [];
  for (let j = 0; j < chunks.length; j += 2) {
    pages.push([chunks[j], chunks[j + 1] || ""]);
  }

  return pages;
}


const text = `Kesenian tradisional khas Maluku yang pertama adalah tari Tide-Tide. Tari yang dikenal sebagai tarian pergaulan khas Halmahera ini, biasanya ditampilkan di beberapa acara adat, seperti perkawinan adat dan pesta rakyat Halmahera.
Tidak hanya itu, tari Tide-Tide biasanya dibawakan oleh 12 orang penari yang saling berpasangan.
Oleh karena itu, 12 orang penari tersebut terbagi menjadi enam penari pria dan enam penari wanita.
Hal tersebut dikarenakan, tari Tide-Tide merupakan tarian yang memberikan gambaran tentang kehidupan pergaulan antara pria dan wanita di Halmahera pada masa itu.
Dalam pertunjukannya, para penari akan diiringi dengan alunan musik dari biola, tifa dan gong.
Kesenian tradisional khas Maluku yang pertama adalah tari Tide-Tide. Tari yang dikenal sebagai tarian pergaulan khas Halmahera ini, biasanya ditampilkan di beberapa acara adat, seperti perkawinan adat dan pesta rakyat Halmahera.
Tidak hanya itu, tari Tide-Tide biasanya dibawakan oleh 12 orang penari yang saling berpasangan.
Oleh karena itu, 12 orang penari tersebut terbagi menjadi enam penari pria dan enam penari wanita.
Hal tersebut dikarenakan, tari Tide-Tide merupakan tarian yang memberikan gambaran tentang kehidupan pergaulan antara pria dan wanita di Halmahera pada masa itu.
Dalam pertunjukannya, para penari akan diiringi dengan alunan musik dari biola, tifa dan gong.
Kesenian tradisional khas Maluku yang pertama adalah tari Tide-Tide. Tari yang dikenal sebagai tarian pergaulan khas Halmahera ini, biasanya ditampilkan di beberapa acara adat, seperti perkawinan adat dan pesta rakyat Halmahera.
Tidak hanya itu, tari Tide-Tide biasanya dibawakan oleh 12 orang penari yang saling berpasangan.
Oleh karena itu, 12 orang penari tersebut terbagi menjadi enam penari pria dan enam penari wanita.
Hal tersebut dikarenakan, tari Tide-Tide merupakan tarian yang memberikan gambaran tentang kehidupan pergaulan antara pria dan wanita di Halmahera pada masa itu.
Dalam pertunjukannya, para penari akan diiringi dengan alunan musik dari biola, tifa dan gong.
Kesenian tradisional khas Maluku yang pertama adalah tari Tide-Tide. Tari yang dikenal sebagai tarian pergaulan khas Halmahera ini, biasanya ditampilkan di beberapa acara adat, seperti perkawinan adat dan pesta rakyat Halmahera.
Tidak hanya itu, tari Tide-Tide biasanya dibawakan oleh 12 orang penari yang saling berpasangan.
Oleh karena itu, 12 orang penari tersebut terbagi menjadi enam penari pria dan enam penari wanita.
Hal tersebut dikarenakan, tari Tide-Tide merupakan tarian yang memberikan gambaran tentang kehidupan pergaulan antara pria dan wanita di Halmahera pada masa itu.
Dalam pertunjukannya, para penari akan diiringi dengan alunan musik dari biola, tifa dan gong.
Kesenian tradisional khas Maluku yang pertama adalah tari Tide-Tide. Tari yang dikenal sebagai tarian pergaulan khas Halmahera ini, biasanya ditampilkan di beberapa acara adat, seperti perkawinan adat dan pesta rakyat Halmahera.
Tidak hanya itu, tari Tide-Tide biasanya dibawakan oleh 12 orang penari yang saling berpasangan.
Oleh karena itu, 12 orang penari tersebut terbagi menjadi enam penari pria dan enam penari wanita.
Hal tersebut dikarenakan, tari Tide-Tide merupakan tarian yang memberikan gambaran tentang kehidupan pergaulan antara pria dan wanita di Halmahera pada masa itu.
Dalam pertunjukannya, para penari akan diiringi dengan alunan musik dari biola, tifa dan gong.

Kesenian tradisional khas Maluku yang pertama adalah tari Tide-Tide. Tari yang dikenal sebagai tarian pergaulan khas Halmahera ini, biasanya ditampilkan di beberapa acara adat, seperti perkawinan adat dan pesta rakyat Halmahera.
Tidak hanya itu, tari Tide-Tide biasanya dibawakan oleh 12 orang penari yang saling berpasangan.
Oleh karena itu, 12 orang penari tersebut terbagi menjadi enam penari pria dan enam penari wanita.
Hal tersebut dikarenakan, tari Tide-Tide merupakan tarian yang memberikan gambaran tentang kehidupan pergaulan antara pria dan wanita di Halmahera pada masa itu.
Dalam pertunjukannya, para penari akan diiringi dengan alunan musik dari biola, tifa dan gong.

Kesenian tradisional khas Maluku yang pertama adalah tari Tide-Tide. Tari yang dikenal sebagai tarian pergaulan khas Halmahera ini, biasanya ditampilkan di beberapa acara adat, seperti perkawinan adat dan pesta rakyat Halmahera.
Tidak hanya itu, tari Tide-Tide biasanya dibawakan oleh 12 orang penari yang saling berpasangan.
Oleh karena itu, 12 orang penari tersebut terbagi menjadi enam penari pria dan enam penari wanita.
Hal tersebut dikarenakan, tari Tide-Tide merupakan tarian yang memberikan gambaran tentang kehidupan pergaulan antara pria dan wanita di Halmahera pada masa itu.
Dalam pertunjukannya, para penari akan diiringi dengan alunan musik dari biola, tifa dan gong.`;

const pages = splitTextToPages(text, 600);

export default function ceritaPage() {
  const [pageIndex, setPageIndex] = useState(0);

  const handleNext = () => {
    if (pageIndex < pages.length - 1) setPageIndex(pageIndex + 1);
  };

  const handlePrev = () => {
    if (pageIndex > 0) setPageIndex(pageIndex - 1);
  };

  const printRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen bg-[#f8f7f4] px-6 py-10 md:px-20 font-serif">
      <h2 className="text-2xl font-semibold mb-2 text-black">Malin Kundang</h2>
      <p className="text-black"><strong>Asal Suku:</strong> Suku Ambon</p>
      <p className="mb-4 text-black"><strong>Asal Daerah:</strong> Maluku</p>
      <div className="flex gap-4 flex-wrap mb-6">
        <button className="bg-[#41362c] text-white px-4 py-2 rounded-md hover:opacity-90">Baca tentang Suku Ambon</button>
        <PDFLinkClient pages={pages} />
      </div> <div ref={printRef} style={{ display: 'none' }}>
        <h1>Malin Kundang</h1>
        <div className="story-info">
          <p><strong>Asal Suku:</strong> Suku Ambon</p>
          <p><strong>Asal Daerah:</strong> Maluku</p>
        </div>
        
        {pages.map((page, pageIdx) => (
          <div key={pageIdx}>
            {pageIdx > 0 && <div className="page-break"></div>}
            
            {page.map((column, colIdx) => (
              <div key={colIdx} className="story-content">
                <p>{column}</p>
              </div>
            ))}
            
            <div className="page-number">
              Halaman {pageIdx + 1} dari {pages.length}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-8 rounded-xl shadow-md max-w-5xl mx-auto">
        {/* Halaman Buku */}
        <div className="relative w-full h-[400px] border rounded-xl overflow-hidden">
          {/* Garis Tengah */}
          <div className="absolute top-0 bottom-0 left-1/2 w-px bg-gray-300 z-10"></div>

          <AnimatePresence mode="wait">
            <motion.div
              key={pageIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute top-0 left-0 right-0 bottom-0 grid grid-cols-2 gap-4 p-6 text-justify text-black"
            >
              {pages[pageIndex].map((para, idx) => (
                <div key={idx} className="p-4">
                  <p>{para}</p>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigasi */}
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={handlePrev}
            disabled={pageIndex === 0}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-40"
          >
            Previous
          </button>
          
          <span className="text-gray-600">
            Halaman {pageIndex + 1} dari {pages.length}
          </span>
          
          <button
            onClick={handleNext}
            disabled={pageIndex === pages.length - 1}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}