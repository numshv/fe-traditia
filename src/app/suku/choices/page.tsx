'use client';

import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// Definisikan tipe data untuk setiap item
interface Person {
  id: number;
  name: string;
  title: string;
  img: string;
}

const Choices: React.FC = () => {
  // State untuk menyimpan data dari API, loading, dan item aktif
  const [persons, setPersons] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeItem, setActiveItem] = useState(0);

  const wrapperRef = useRef<HTMLUListElement | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // useEffect untuk mengambil data dari API
  useEffect(() => {
    const fetchPersons = async () => {
      try {
        const dummyData: Person[] = [
          { id: 1, name: "Aurora", title: "Lead Vocalist", img: "https://images.pexels.com/photos/7414283/pexels-photo-7414283.jpeg" },
          { id: 2, name: "Leo", title: "Guitarist", img: "https://images.pexels.com/photos/7414283/pexels-photo-7414283.jpeg" },
          { id: 3, name: "Mia", title: "Bassist", img: "https://images.pexels.com/photos/7414283/pexels-photo-7414283.jpeg" },
          { id: 4, name: "Kai", title: "Drummer", img: "https://images.pexels.com/photos/7414283/pexels-photo-7414283.jpeg" },
          { id: 5, name: "Zoe", title: "Keyboardist", img: "https://images.pexels.com/photos/7414283/pexels-photo-7414283.jpeg" },
        ];
        
        await new Promise(resolve => setTimeout(resolve, 1000));

        setPersons([{}, ...dummyData, {}] as Person[]);
        setActiveItem(Math.floor(dummyData.length / 2) + 1);
      } catch (error) {
        console.error("Failed to fetch persons:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPersons();
  }, []);

  // useEffect untuk menangani animasi transisi
  useEffect(() => {
    if (!wrapperRef.current) return;
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    wrapperRef.current.style.setProperty("--transition", "600ms cubic-bezier(0.22, 0.61, 0.36, 1)");
    timeoutRef.current = setTimeout(() => {
      wrapperRef.current?.style.removeProperty("--transition");
    }, 900);
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [activeItem]);

  if (isLoading) {
    return <div className="text-center">Loading Data...</div>;
  }

  return (
    <div className="h-full w-full items-center justify-center my-10 font-serif p-8">
      <h1 className="w-full justify-center text-center text-3xl font-medium">Tari Tradisional Suku Batak</h1>
    <div className="flex h-full w-full items-center justify-center my-6">
      <div className="w-[1200px] max-w-full">
        <ul
          ref={wrapperRef}
          className="group flex flex-col gap-3 md:h-[640px] md:flex-row md:gap-[1.5%] justify-center"
        >
          {persons.map((person, index) => {
            // Logika untuk menentukan kelas `li`
            const isEdge = index === 0 || index === persons.length - 1;
            const isActive = activeItem === index;
            
          const baseClasses = "relative cursor-pointer transition-[width] duration-200 ease-in-out";
          let stateClasses = "";

          if (isEdge) {
            stateClasses = "md:w-[1%] pointer-events-none";
          } else if (isActive) {
            stateClasses = "md:w-[48%]";
          } else {
            // Gaya hover hanya berlaku untuk item yang tidak aktif
            stateClasses = "md:w-[8%] md:hover:w-[12%] md:[&:not(:hover)]:group-hover:w-[7%]";
          }

          const liClasses = `${baseClasses} ${stateClasses}`.trim();
            
            const imgClasses = `
              absolute right-0  h-auto w-24 max-w-none object-cover 
              md:left-1/2 md:h-[640px] md:w-[590px] md:-translate-x-1/2
              ${isEdge ? 'opacity-0' : ''}
            `.trim();

            const textClasses = `
              absolute left-8 top-8 w-[590px] p-4 transition-transform transition-opacity duration-300 md:p-0
              ${isActive ? 'md:translate-x-0 md:opacity-100' : 'md:translate-x-4 md:opacity-0'}
            `.trim();

            return (
              <li
                key={person.id || index}
                onClick={() => setActiveItem(index)}
                className={liClasses}
                style={{ transition: 'width var(--transition, 200ms ease-in)' }}
              >
                <div className="relative h-full w-full overflow-hidden rounded-2xl bg-[#c9c6c7]">
                  <img
                    className={imgClasses}
                    src={person.img}
                    alt={person.name}
                    width={590}
                    height={640}
                  />
                  
                  <div className={textClasses}>
                    <p className="text-sm uppercase text-primary md:text-lg">{person.title}</p>
                    <p className="text-lg font-bold text-black md:text-4xl">{person.name}</p>
                  </div>

                    <button className={`
                      absolute bottom-8 right-8 z-10 flex items-center gap-2 rounded-full 
                      bg-white/20 px-4 py-2 text-white backdrop-blur-sm 
                      hover:bg-white/30
                      transition-opacity duration-300
                      ${isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'}
                    `}>
                      Lihat Detail
                      <ArrowRight className="h-4 w-4" />
                    </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
    </div>
  );
};

export default Choices;