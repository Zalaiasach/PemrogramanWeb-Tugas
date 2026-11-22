import { Link } from "react-router";
import { formatRupiah } from "../utils/formatCurrency";

export default function DashboardPage({ products, cartCount }) {
  const totalProducts = products.length;
  const totalStock = products.reduce((sum, item) => sum + item.stock, 0);
  const lowStockCount = products.filter((item) => item.stock <= 4).length;
  const inventoryValue = products.reduce(
    (sum, item) => sum + item.price * item.stock,
    0
  );

  return (
    <section>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Dashboard Ringkasan Toko
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Pantau statistik inventaris dan navigasi cepat ke katalog produk.
          </p>
        </div>
        <Link
          to="/products"
          className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          Kelola Produk →
        </Link>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <span className="text-xs font-medium text-slate-500">
            Total Jenis Produk
          </span>
          <strong className="mt-2 block text-2xl font-bold text-slate-900">
            {totalProducts}
          </strong>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <span className="text-xs font-medium text-slate-500">
            Total Unit Stok
          </span>
          <strong className="mt-2 block text-2xl font-bold text-slate-900">
            {totalStock} unit
          </strong>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <span className="text-xs font-medium text-slate-500">
            Perlu Restock (≤ 4)
          </span>
          <strong className="mt-2 block text-2xl font-bold text-amber-600">
            {lowStockCount} produk
          </strong>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <span className="text-xs font-medium text-slate-500">
            Item di Keranjang
          </span>
          <strong className="mt-2 block text-2xl font-bold text-slate-900">
            {cartCount} item
          </strong>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div>
          <h3 className="text-sm font-semibold text-slate-600">
            Estimasi Nilai Aset Inventaris
          </h3>
          <p className="mt-1 text-2xl font-extrabold text-blue-600">
            {formatRupiah(inventoryValue)}
          </p>
        </div>
        <Link
          to="/settings"
          className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
        >
          Atur Tampilan Katalog
        </Link>
      </div>
    </section>
  );
}