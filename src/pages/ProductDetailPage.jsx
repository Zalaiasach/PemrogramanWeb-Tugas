import { Link, useParams, useNavigate } from "react-router";
import { formatRupiah } from "../utils/formatCurrency";
import Button from "../components/atoms/Button";

export default function ProductDetailPage({ products, onAddToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = products.find((p) => String(p.id) === id);

  if (!product) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 bg-white px-5 py-12 text-center">
        <h2 className="text-lg font-bold text-slate-900">
          Produk tidak tersedia
        </h2>
        <p className="mt-2 mb-5 text-sm text-slate-500">
          Data produk dengan ID "{id}" tidak ditemukan di katalog.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Kembali ke Daftar Produk
        </Link>
      </div>
    );
  }

  const isOutOfStock = product.stock === 0;

  return (
    <section className="mx-auto max-w-2xl">
      <div className="mb-4 flex items-center justify-between">
        <Link
          to="/products"
          className="text-sm font-semibold text-blue-600 hover:text-blue-700"
        >
          ← Kembali ke Daftar Produk
        </Link>
        <span className="text-xs text-slate-400">Kode Produk: #{product.id}</span>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
          {product.category}
        </span>
        <h1 className="mt-3 text-2xl font-bold text-slate-900">
          {product.name}
        </h1>
        <p className="mt-1 mb-5 text-2xl font-bold text-blue-600">
          {formatRupiah(product.price)}
        </p>

        <div className="mb-6 space-y-3 border-y border-slate-200 py-4 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-500">Status Ketersediaan</span>
            <strong className="text-slate-900">
              {isOutOfStock ? "Stok Habis" : `${product.stock} unit tersedia`}
            </strong>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Kategori</span>
            <strong className="text-slate-900">{product.category}</strong>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Garansi Toko</span>
            <strong className="text-slate-900">1 Tahun Resmi ZalaTech</strong>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button
            variant="primary"
            disabled={isOutOfStock}
            onClick={() => onAddToCart(product.id)}
          >
            {isOutOfStock ? "Stok Habis" : "+ Tambah ke Keranjang"}
          </Button>
          <Button variant="secondary" onClick={() => navigate("/products")}>
            Lihat Produk Lain
          </Button>
        </div>
      </div>
    </section>
  );
}