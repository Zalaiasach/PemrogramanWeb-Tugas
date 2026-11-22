import { useNavigate } from "react-router";
import Button from "../components/atoms/Button";

export default function SettingsPage({
  viewMode,
  onChangeViewMode,
  cartCount,
  onResetCart,
}) {
  const navigate = useNavigate();

  return (
    <section className="max-w-2xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">
          Pengaturan Tampilan & Toko
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Sesuaikan tata letak daftar produk pada halaman katalog.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-base font-bold text-slate-900">
          Mode Tampilan Katalog Produk
        </h3>
        <p className="mt-1 text-sm text-slate-500">
          Pilih tampilan kartu produk saat membuka halaman Produk.
        </p>

        <div className="my-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => onChangeViewMode("grid")}
            className={`flex flex-col gap-1.5 rounded-xl border-2 p-4 text-left transition ${
              viewMode === "grid"
                ? "border-blue-600 bg-blue-50"
                : "border-slate-200 bg-white hover:bg-slate-50"
            }`}
          >
            <strong className="text-sm text-slate-900">Grid View</strong>
            <span className="text-xs text-slate-500">
              Menampilkan produk dalam beberapa kolom kartu.
            </span>
          </button>

          <button
            type="button"
            onClick={() => onChangeViewMode("list")}
            className={`flex flex-col gap-1.5 rounded-xl border-2 p-4 text-left transition ${
              viewMode === "list"
                ? "border-blue-600 bg-blue-50"
                : "border-slate-200 bg-white hover:bg-slate-50"
            }`}
          >
            <strong className="text-sm text-slate-900">List View</strong>
            <span className="text-xs text-slate-500">
              Menampilkan produk dalam baris memanjang ke bawah.
            </span>
          </button>
        </div>

        <Button variant="primary" onClick={() => navigate("/products")}>
          Terapkan & Lihat Katalog
        </Button>
      </div>

      <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-base font-bold text-slate-900">
          Reset Simulasi Keranjang
        </h3>
        <p className="mt-1 mb-4 text-sm text-slate-500">
          Saat ini terdapat <strong>{cartCount} item</strong> di keranjang simulasi.
        </p>
        <Button
          variant="outlineDanger"
          disabled={cartCount === 0}
          onClick={onResetCart}
        >
          Kosongkan Keranjang
        </Button>
      </div>
    </section>
  );
}