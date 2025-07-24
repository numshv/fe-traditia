'use client';
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const text = `Kesenian tradisional khas Maluku yang pertama adalah tari Tide-Tide. Tari yang dikenal sebagai tarian pergaulan khas Halmahera ini, biasanya ditampilkan di beberapa acara adat...`;

const pages = [
  [text, text],
  [text, text],
  [text, text],
];

export default function MalinKundang() {
  const [pageIndex, setPageIndex] = useState(0);

  const handleNext = () => {
    if (pageIndex < pages.length - 1) setPageIndex(pageIndex + 1);
  };

  const handlePrev = () => {
    if (pageIndex > 0) setPageIndex(pageIndex - 1);
  };

  return (
    <div className="min-h-screen bg-[#f8f7f4] px-6 py-10 md:px-20 font-serif">
        <h2 className="text-2xl font-semibold mb-2 text-black">Malin Kundang</h2>
        <p className="text-black"><strong>Asal Suku:</strong> Suku Ambon</p>
        <p className="mb-4 text-black"><strong>Asal Daerah:</strong> Maluku</p>
        <div className="flex gap-4 flex-wrap mb-6">
          <button className="bg-[#41362c] text-white px-4 py-2 rounded-md hover:opacity-90">Baca tentang Suku Ambon</button>
          <button className="bg-[#a3916e] text-white px-4 py-2 rounded-md hover:opacity-90">Download PDF</button>
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
              className="absolute top-0 left-0 right-0 bottom-0 grid grid-cols-2 gap-4 p-6 text-justify"
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
        <div className="flex justify-between mt-4">
          <button
            onClick={handlePrev}
            disabled={pageIndex === 0}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-40"
          >
            Previous
          </button>
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
