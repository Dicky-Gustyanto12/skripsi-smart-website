import TableHasilRekomendasi from "../components/TableHasilRekomendasi";

export default function DataHasilRekomendasi() {
  return (
    <section>
      <div className="bg-white shadow p-4 md:p-6 rounded">
        <h1 className="text-lg md:text-2xl font-bold mb-4 text-center">
          Data Hasil Rekomendasi
        </h1>
        <TableHasilRekomendasi />
      </div>
    </section>
  );
}
