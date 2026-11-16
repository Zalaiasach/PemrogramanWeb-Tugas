import { useNavigate } from "react-router";

export default function SettingsPage({
  viewMode,
  onChangeViewMode,
  cartCount,
  onResetCart,
}) {
  const navigate = useNavigate();

  function handleSelectMode(mode) {
    onChangeViewMode(mode);
  }

  return (
    <section className="settings-wrapper">
      <div className="page-header">
        <div>
          <h1>Pengaturan Tampilan & Toko</h1>
          <p className="subtitle">
            Sesuaikan tata letak daftar produk pada halaman katalog.
          </p>
        </div>
      </div>

      <div className="settings-card">
        <h3>Mode Tampilan Katalog Produk</h3>
        <p className="subtitle">
          Pilih tampilan kartu produk saat membuka halaman Produk.
        </p>

        <div className="view-mode-options">
          <button
            type="button"
            className={`mode-option ${viewMode === "grid" ? "selected" : ""}`}
            onClick={() => handleSelectMode("grid")}
          >
            <strong>Grid View</strong>
            <span>Menampilkan produk dalam beberapa kolom kartu.</span>
          </button>

          <button
            type="button"
            className={`mode-option ${viewMode === "list" ? "selected" : ""}`}
            onClick={() => handleSelectMode("list")}
          >
            <strong>List View</strong>
            <span>Menampilkan produk dalam baris memanjang ke bawah.</span>
          </button>
        </div>

        <div className="settings-footer-actions">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => navigate("/products")}
          >
            Terapkan & Lihat Katalog
          </button>
        </div>
      </div>

      <div className="settings-card" style={{ marginTop: "20px" }}>
        <h3>Reset Simulasi Keranjang</h3>
        <p className="subtitle">
          Saat ini terdapat <strong>{cartCount} item</strong> di keranjang simulasi.
        </p>
        <div style={{ marginTop: "14px" }}>
          <button
            type="button"
            className="btn btn-outline-danger"
            disabled={cartCount === 0}
            onClick={onResetCart}
          >
            Kosongkan Keranjang
          </button>
        </div>
      </div>
    </section>
  );
}