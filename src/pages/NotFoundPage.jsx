import { Link } from "react-router";

export default function NotFoundPage() {
  return (
    <main className="not-found-box">
      <span className="error-code">404</span>
      <h1>Halaman tidak ditemukan</h1>
      <p className="subtitle">
        Alamat URL yang Anda tuju tidak tersedia atau telah dipindahkan.
      </p>
      <Link to="/products" className="btn btn-primary">
        Kembali ke Produk
      </Link>
    </main>
  );
}