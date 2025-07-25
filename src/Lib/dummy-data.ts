// src/lib/dummy-data.ts

// Definisikan tipe data berdasarkan schema.ts Anda
export interface Region {
  id: number;
  name: string;
}

export interface EthnicGroup {
  id: number;
  name: string;
  description: string;
  region_id: number;
}

export interface Landmark {
  id: number;
  name: string;
  description: string;
  history: string;
  region_id: number;
}

export interface TraditionalSong {
  id: number;
  name: string;
}

export interface TraditionalDance {
  id: number;
  name: string;
  description: string;
  ethnic_group_id: number;
}

// ... Anda bisa menambahkan interface lain sesuai kebutuhan

// Data Dummy Utama
export const dummyData = {
  // --- REGIONS ---
  regions: [
    { id: 1, name: "Sumatera Utara" },
    { id: 2, name: "Jawa Tengah" },
    { id: 3, name: "Papua" },
  ] as Region[],

  // --- ETHNIC GROUPS ---
  ethnic_groups: [
    { id: 101, name: "Batak Toba", description: "Suku asli dari wilayah Toba, Sumatera Utara.", region_id: 1 },
    { id: 102, name: "Jawa", description: "Suku terbesar di Indonesia, mayoritas di Jawa Tengah.", region_id: 2 },
    { id: 103, name: "Asmat", description: "Suku yang terkenal dengan seni ukirnya di Papua.", region_id: 3 },
  ] as EthnicGroup[],

  // --- LANDMARKS ---
  landmarks: [
    { id: 201, name: "Danau Toba", description: "Danau vulkanik terbesar di dunia.", history: "Terbentuk dari letusan supervulkan.", region_id: 1 },
    { id: 202, name: "Candi Borobudur", description: "Candi Buddha terbesar di dunia.", history: "Dibangun pada masa Dinasti Syailendra.", region_id: 2 },
    { id: 203, name: "Lembah Baliem", description: "Lembah indah di pegunungan Jayawijaya.", history: "Dihuni oleh suku Dani, Yali, dan Lani.", region_id: 3 },
  ] as Landmark[],

  // --- TRADITIONAL SONGS ---
  traditional_songs: [
    { id: 301, name: "Sinanggar Tullo" },
    { id: 302, name: "Suwe Ora Jamu" },
    { id: 303, name: "Yamko Rambe Yamko" },
  ] as TraditionalSong[],

  // --- SINGS (Join Table for Songs and Ethnic Groups) ---
  sings: [
    { traditional_song_id: 301, ethnic_group_id: 101 }, // Batak Toba sings Sinanggar Tullo
    { traditional_song_id: 302, ethnic_group_id: 102 }, // Jawa sings Suwe Ora Jamu
    { traditional_song_id: 303, ethnic_group_id: 103 }, // Asmat sings Yamko Rambe Yamko
  ],
  
  // --- TRADITIONAL DANCES ---
  traditional_dances: [
      { id: 401, name: "Tari Tor-Tor", description: "Tarian tradisional Batak.", ethnic_group_id: 101 },
      { id: 402, name: "Tari Bedhaya", description: "Tarian sakral dari keraton Jawa.", ethnic_group_id: 102 },
      { id: 403, name: "Tari Perang", description: "Tarian yang menggambarkan keberanian suku Asmat.", ethnic_group_id: 103 },
  ] as TraditionalDance[],
  
  // Anda bisa melanjutkan untuk menambahkan data dummy untuk tabel lain seperti:
  // traditional_food, eats, traditional_clothes, wear, dll.
};