'use client';

import { userAgent } from 'next/server';
import { useState } from 'react';

export default function UploadBudayaPage() {
  const [photo, setPhoto] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [form, setForm] = useState({
    nama: '',
    kategori: '',
    suku: '',
    deskripsi: '',
    image: '',
    userId: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhoto(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let imageUrl = '';
    if (photo) {
        imageUrl = await uploadImageToCloudinary(photo);
    }
    const userId = '1'; // DUMMY blm ada session manager
    const formData = { ...form, image: imageUrl, userId };

    // TODO: Upload to backend
    console.log('Form:', formData);
  };

    const uploadImageToCloudinary = async (file: File) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);

        const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
            method: 'POST',
            body: formData,
        });

        const data = await res.json();
        return data.secure_url;
    };

  return (
    <div className="min-h-screen bg-[#f6f7ec] font-serif px-4 py-10 md:px-20">

      <form onSubmit={handleSubmit} className="border border-[#392514] p-6 rounded-lg max-w-5xl mx-auto">
        <h2 className="text-center text-2xl font-semibold text-[#4b3b2a] mb-6">Upload Budaya</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left: Upload Foto */}
            <div className="flex flex-col items-center justify-between  h-[300px] p-4">
                <div className="flex-1 flex items-center justify-center w-full border border-gray-300 rounded-lg">
                    {preview ? (
                    <img src={preview} alt="Preview" className="h-full object-contain rounded" />
                    ) : (
                    <span className="text-gray-500">insert photo</span>
                    )}
                </div>
                <label className="mt-4 cursor-pointer text-[#392514] border border-[#392514] rounded px-3 py-1 text-sm hover:bg-[#eee] transition">
                    Pilih File
                    <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="hidden"
                    />
                </label>
            </div>


          {/* Right: Form */}
          <div className="space-y-4">
            <input
              name="nama"
              value={form.nama}
              onChange={handleChange}
              type="text"
              placeholder="Nama Budaya"
              className="w-full px-4 py-2 border border-[#4b3b2a] rounded-md bg-[#f6f7ec] focus:outline-none"
            />
            <select
                name="kategori"
                value={form.kategori}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-[#4b3b2a] rounded-md bg-[#f6f7ec] focus:outline-none"
                >
                <option value="" className=''>Pilih Kategori</option>
                <option value="Lagu Tradisional">Lagu Tradisional</option>
                <option value="Makanan Tradisional">Makanan Tradisional</option>
                <option value="Tari Tradisional">Tari Tradisional</option>
                <option value="Baju Tradisional">Baju Tradisional</option>
                <option value="Rumah Adat">Rumah Adat</option>
                <option value="Cerita Rakyat">Cerita Rakyat</option>
                <option value="Tradisi">Tradisi</option>
            </select>
            <input
              name="suku"
              value={form.suku}
              onChange={handleChange}
              type="text"
              placeholder="Asal Suku"
              className="w-full px-4 py-2 border border-[#4b3b2a] rounded-md bg-[#f6f7ec] focus:outline-none"
            />
            <textarea
              name="deskripsi"
              value={form.deskripsi}
              onChange={handleChange}
              placeholder="Deskripsi"
              rows={4}
              className="w-full px-4 py-2 border border-[#4b3b2a] rounded-md bg-[#f6f7ec] focus:outline-none resize-none"
            ></textarea>
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="bg-[#4b3b2a] text-white px-8 py-2 rounded-md hover:bg-[#3c2f23] transition"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
