import { Link } from "react-router";

export default function NotFoundPage() {
  return (
    <main className="flex min-h-[75vh] flex-col items-center justify-center gap-3 p-5 text-center">
      <span className="text-6xl font-extrabold text-blue-600">404</span>
      <h1 className="text-2xl font-bold text-slate-900">
        Halaman tidak ditemukan
      </h1>
      <p className="max-w-md text-sm text-slate-500">
        Alamat URL yang Anda tuju tidak tersedia atau telah dipindahkan.
      </p>
      <Link
        to="/products"
        className="mt-2 inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
      >
        Kembali ke Produk
      </Link>
    </main>
  );
}