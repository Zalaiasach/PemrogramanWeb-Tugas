import { Link, useParams, useNavigate } from "react-router";
import { formatRupiah } from "../utils/formatCurrency";

export default function ProductDetailPage({ products, onAddToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = products.find((p) => String(p.id) === id);

  if (!product) {
    return (
      <div className="empty-state">
        <h2>Produk tidak tersedia</h2>
        <p className="subtitle" style={{ margin: "8px 0 16px" }}>
          Data produk dengan ID "{id}" tidak ditemukan di katalog.
        </p>
        <Link to="/products" className="btn btn-primary">
          Kembali ke Daftar Produk
        </Link>
      </div>
    );
  }

  const isOutOfStock = product.stock === 0;

  return (
    <section className="detail-wrapper">
      <div className="detail-top-bar">
        <Link to="/products" className="back-link">
          ← Kembali ke Daftar Produk
        </Link>
        <span className="product-id">Kode Produk: #{product.id}</span>
      </div>

      <div className="detail-card">
        <span className="category-tag">{product.category}</span>
        <h1 className="detail-title">{product.name}</h1>
        <p className="detail-price">{formatRupiah(product.price)}</p>

        <div className="detail-meta">
          <div className="meta-row">
            <span>Status Ketersediaan</span>
            <strong>{isOutOfStock ? "Stok Habis" : `${product.stock} unit tersedia`}</strong>
          </div>
          <div className="meta-row">
            <span>Kategori</span>
            <strong>{product.category}</strong>
          </div>
          <div className="meta-row">
            <span>Garansi Toko</span>
            <strong>1 Tahun Resmi ZalaTech</strong>
          </div>
        </div>

        <div className="detail-actions">
          <button
            type="button"
            className="btn btn-primary"
            disabled={isOutOfStock}
            onClick={() => onAddToCart(product.id)}
          >
            {isOutOfStock ? "Stok Habis" : "+ Tambah ke Keranjang"}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/products")}
          >
            Lihat Produk Lain
          </button>
        </div>
      </div>
    </section>
  );
}