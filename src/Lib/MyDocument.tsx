import { Document, Page, Text, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 30, fontFamily: "Times-Roman" },
  title: { fontSize: 20, marginBottom: 10 },
  info: { fontSize: 12, marginBottom: 10 },
  para: { fontSize: 12, marginBottom: 8 },
});

export default function PdfDocument({ pages }: { pages: string[][] }) {
  return (
    <Document>
      {pages.map((page, idx) => (
        <Page key={idx} style={styles.page}>
          <Text style={styles.title}>Malin Kundang</Text>
          <Text style={styles.info}>Asal Suku: Suku Ambon</Text>
          <Text style={styles.info}>Asal Daerah: Maluku</Text>
          {page.map((col, colIdx) => (
            <Text key={colIdx} style={styles.para}>{col}</Text>
          ))}
          <Text style={styles.info}>Halaman {idx + 1} dari {pages.length}</Text>
        </Page>
      ))}
    </Document>
  );
}