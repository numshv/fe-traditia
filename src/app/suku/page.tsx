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

  return (
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
                <div key={item.title} className="flex flex-col max-w-40 aspect-square bg-[#B9875D]/25 items-center justify-center text-center p-4 rounded-lg transition-transform hover:scale-105">
                  <Link href={item.linkto} className="items-center justify-center flex flex-col">
                    <item.Icon className="w-10 h-10 mb-2" />
                  <div className="text-sm font-bold">
                    {item.title.split(' ').map((word, index) => (
                      <div key={index}>{word}</div>
                    ))}
                  </div>
                  </Link>
                </div>
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
  );
}