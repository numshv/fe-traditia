"use client";

import { useState } from "react";

const imageUrls = [
  "https://images.pexels.com/photos/2016121/pexels-photo-2016121.jpeg",
  "https://images.pexels.com/photos/2016121/pexels-photo-2016121.jpeg",
  "https://images.pexels.com/photos/2016121/pexels-photo-2016121.jpeg",
  "https://images.pexels.com/photos/2016121/pexels-photo-2016121.jpeg",
]; 

export default function TariTideTidePage(id: string) {
  const [startIndex, setStartIndex] = useState(0);

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setStartIndex((prev) => Math.min(prev + 1, imageUrls.length - 1));
  };

  return (
    <div className="p-6 max-w-6xl mx-auto text-[#2a1e14] bg-[#f8f9f2] min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-black">Tari Tide Tide</h1>
      <p className="mb-1">
        <strong>Asal Suku:</strong> Suku Ambon
      </p>
      <p className="mb-4">
        <strong>Asal Daerah:</strong> Maluku
      </p>

      <p className="mb-2">
        Kesenian tradisional khas Maluku yang pertama adalah tari Tide-Tide. Tari yang dikenal sebagai tarian pergaulan khas Halmahera ini, biasanya ditampilkan di beberapa acara adat, seperti perkawinan adat dan pesta rakyat Halmahera.
      </p>
      <p className="mb-2">
        Tidak hanya itu, tari Tide-Tide biasanya dibawakan oleh 12 orang penari yang saling berpasangan. Oleh karena itu, 12 orang penari tersebut terbagi menjadi enam penari pria dan enam penari wanita.
      </p>
      <p className="mb-2">
        Hal tersebut dikarenakan, tari Tide-Tide merupakan tarian yang memberikan gambaran tentang kehidupan pergaulan antara pria dan wanita di Halmahera pada masa itu.
      </p>
      <p className="mb-6">
        Dalam pertunjukannya, para penari akan diiringi dengan alunan musik dari biola, tifa dan gong.
      </p>

      <div className="relative">
        <div className="flex items-center space-x-4 overflow-hidden">
          {startIndex > 0 && (
            <button
              onClick={handlePrev}
              className="absolute left-0 z-10 bg-white px-2 py-1 rounded shadow"
            >
              ←
            </button>
          )}
          <div className="flex space-x-4 overflow-x-auto pl-8 pr-8">
            {imageUrls.slice(startIndex, startIndex + 4).map((src, index) => (
              <div
                key={index}
                className="w-60 h-40 flex-shrink-0 border rounded overflow-hidden"
              >
                <img
                  src={src}
                  alt={`Gambar ${index + 1}`}
                  width={240}
                  height={160}
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
          </div>
          {startIndex + 4 < imageUrls.length && (
            <button
              onClick={handleNext}
              className="absolute right-0 z-10 bg-white px-2 py-1 rounded shadow"
            >
              →
            </button>
          )}
        </div>
      </div>

      <button className="mt-6 px-4 py-2 bg-[#4c2e1e] text-white rounded">
        Baca tentang Suku Ambon
      </button>
    </div>
  );
}
