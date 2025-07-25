'use client';

import { PDFDownloadLink } from '@react-pdf/renderer';
import MyDocument from '@/Lib/MyDocument';

export default function PDFLinkClient({ pages }: { pages: string[][] }) {
  return (
    <PDFDownloadLink
      document={<MyDocument pages={pages} />}
      fileName="cerita-rakyat.pdf"
    >
      {({ loading }) => (
        <button className="bg-[#a3916e] text-white px-4 py-2 rounded-md hover:opacity-90">
          {loading ? "Menyiapkan PDF..." : "Download PDF"}
        </button>
      )}
    </PDFDownloadLink>
  );
}
