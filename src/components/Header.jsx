export default function Header({ cartCount, onOpenAddModal }) {
  return (
    <header className="store-header">
      <div>
        <h1>ZalaTech Store — Katalog Produk</h1>
        <p className="subtitle">
          Kelola daftar inventaris produk, harga, dan simulasi transaksi dalam satu tempat.
        </p>
      </div>
      <div className="header-actions">
        <div className="cart-badge">
          Keranjang: <strong>{cartCount} item</strong>
        </div>
        <button className="btn btn-primary" onClick={onOpenAddModal}>
          + Tambah Produk
        </button>
      </div>
    </header>
  );
}