'use client'

import { Button } from "@/components/Button";
import ChoicePopup from "@/components/ChoicePopup";
import {
  Music,
  Utensils,
  PersonStanding,
  Shirt,
  Home,
  BookOpen,
  Palmtree
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface IconDataItem {
  title: string;
  linkto: string;
  Icon: React.ElementType;
}

interface SukuPageData{
  id: string;
  name: string;
  desc: string;
  region_id: string;
}

type PopupDataItem = {
  id: number;
  name: string;
};

export default function page() {
  const iconData = [
    { title: "Lagu Tradisional", linkto: "suku/lagu-tradisional", Icon: Music },
    { title: "Makanan Tradisional", linkto: "suku/makanan-tradisional", Icon: Utensils },
    { title: "Tari Tradisional", linkto: "suku/tari-tradisional", Icon: PersonStanding },
    { title: "Baju Tradisional", linkto: "suku/baju-tradisional", Icon: Shirt },
    { title: "Rumah Adat", linkto: "suku/rumah-adat", Icon: Home },
    { title: "Cerita Rakyat", linkto: "suku/cerita-rakyat", Icon: BookOpen },
    { title: "Tradisi", linkto: "suku/tradisi", Icon: Palmtree },
  ];

  const [sukuData, setSukuData] = useState<SukuPageData | null>(null);
  const [isPageLoading, setIsPageLoading] = useState(true);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<IconDataItem | null>(null);
  const [popupData, setPopupData] = useState<PopupDataItem[]>([]);
  const [isPopupLoading, setIsPopupLoading] = useState(false);

  useEffect(() => {
    const fetchSukuData = async () => {
      try {
        // Ganti "Ambon" dengan nama suku yang dinamis jika perlu
        const response = await fetch('/api/suku/Ambon');
        const data = await response.json();
        setSukuData(data);
      } catch (error) {
        console.error("Gagal mengambil data suku:", error);
        // Fallback jika API gagal
        setSukuData({
          id: "gs52",
          name: "Suku Ambon",
          desc: "Deskripsi Suku Ambon...",
          region_id: "R-22"
        });
      } finally {
        setIsPageLoading(false);
      }
    };
    fetchSukuData();
  }, []);

  // 2. API call saat ikon "Lihat lebih jauh" diklik
  const handleIconClick = async (item: IconDataItem) => {
    setSelectedItem(item);
    setIsPopupOpen(true);
    setIsPopupLoading(true);
    try {
      // Ganti "Ambon" dengan nama suku dinamis dari state sukuData
      const sukuName = sukuData?.name || 'Ambon';
      const response = await fetch(`/api/suku/${sukuName}/${item.linkto}`);
      const result = await response.json();
      setPopupData(result.data);
    } catch (error) {
      console.error(`Gagal mengambil data untuk ${item.title}:`, error);
      setPopupData([]); // Kosongkan data jika error
    } finally {
      setIsPopupLoading(false);
    }
  };

  if (isPageLoading) {
    return <div className="text-center p-20">Loading...</div>;
  }

  return (
    <>
    <main className="container mx-auto p-8 font-serif">

      <div className="mt-12 grid grid-cols-3 gap-12">
        <aside className="md:col-span-1 flex flex-col items-center gap-8">
          {/* Placeholder untuk gambar utama */}
          <div className="w-full max-w-sm aspect-square border-2 border-current rounded-lg" />

          {/* Placeholder untuk gambar peta */}
          <div className="w-4/5 h-48 bg-current opacity-20" />
          <p className="text-lg">Maluku Tengah</p>
        </aside>

        <section className="col-span-2">
          <h1 className="text-4xl font-bold">Suku Ambon</h1>
          <p className="mt-4 text-lg leading-relaxed text-justify">
            Suku Ambon adalah sebuah kelompok etnis dengan ras campuran Austronesia-Polinesia yang terutama mendiami Kepulauan Maluku bagian tengah. Suku Ambon adalah kelompok etnis terbesar di Provinsi Maluku, terutama mendiami wilayah Ambon, Saparua, Seram bagian selatan, Nusalaut, Haruku, dan Ambalau. Suku Ambon merupakan suku yang dikenal paling berpengaruh di antara suku-suku asal Kepulauan Maluku lainnya. Mereka mulai meluaskan pengaruhnya ketika masa Pemerintah Portugis. Hal inilah yang menyebabkan sering kali istilah orang Ambon dipadankan dengan orang Maluku. Setelah kedatangan bangsa-bangsa Eropa yang menyusul penyebaran Islam, suku Ambon dicirikan oleh persaingan Islam-Kristennya
          </p>

          <div className="mt-10">
            <h3 className="text-2xl font-semibold">Lihat lebih jauh</h3>
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-7 gap-4">
              {iconData.map((item) => (
                <button key={item.title} onClick={() => handleIconClick(item)} className="flex flex-col max-w-40 aspect-square bg-[#B9875D]/25 items-center justify-center text-center p-4 rounded-lg transition-transform hover:scale-105">
                    <item.Icon className="w-10 h-10 mb-2" />
                  <div className="text-sm font-bold">
                    {item.title.split(' ').map((word, index) => (
                      <div key={index}>{word}</div>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-10">
            <h3 className="text-2xl font-semibold">Fakta Unik</h3>
            <p className="mt-2 text-lg leading-relaxed">
              Masyarakat Ambon hanya mengenal dua petunjuk, yakni kadara dan kalao. Kadara menunjukkan arah ke daratan menuju gunung, sedangkan kalao menunjukkan arah menuju pantai.
            </p>
          </div>
        </section>
      </div>
    </main>

      <ChoicePopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        title={selectedItem?.title || ''}
        data={popupData}
        isLoading={isPopupLoading}
      />
      </>
  );
}