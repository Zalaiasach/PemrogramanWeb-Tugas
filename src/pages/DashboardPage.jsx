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
      <div className="page-header">
        <div>
          <h1>Dashboard Ringkasan Toko</h1>
          <p className="subtitle">
            Pantau statistik inventaris dan navigasi cepat ke katalog produk.
          </p>
        </div>
        <Link to="/products" className="btn btn-primary">
          Kelola Produk →
        </Link>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-label">Total Jenis Produk</span>
          <strong className="stat-value">{totalProducts}</strong>
        </div>
        <div className="stat-card">
          <span className="stat-label">Total Unit Stok</span>
          <strong className="stat-value">{totalStock} unit</strong>
        </div>
        <div className="stat-card">
          <span className="stat-label">Perlu Restock (≤ 4)</span>
          <strong className="stat-value text-warning">{lowStockCount} produk</strong>
        </div>
        <div className="stat-card">
          <span className="stat-label">Item di Keranjang</span>
          <strong className="stat-value">{cartCount} item</strong>
        </div>
      </div>

      <div className="info-banner">
        <div>
          <h3>Estimasi Nilai Aset Inventaris</h3>
          <p className="banner-amount">{formatRupiah(inventoryValue)}</p>
        </div>
        <Link to="/settings" className="btn btn-secondary">
          Atur Tampilan Katalog
        </Link>
      </div>
    </section>
  );
}