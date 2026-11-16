import { formatRupiah } from "../utils/formatCurrency";

export default function DeleteConfirmModal({ product, onCancel, onConfirm }) {
  if (!product) return null;

  return (
    <div className="modal-backdrop" onClick={onCancel}>
      <div className="modal-box modal-delete" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="close-btn delete-close" onClick={onCancel}>
          ×
        </button>

        <div className="delete-icon">🗑️</div>
        <h3>Hapus Produk?</h3>
        <p className="modal-desc">Produk yang dihapus tidak dapat dikembalikan.</p>

        <div className="delete-preview">
          <span className="product-id">ID: {product.id}</span>
          <h4>{product.name}</h4>
          <p className="product-price">{formatRupiah(product.price)}</p>
        </div>

        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Batal
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => onConfirm(product.id)}
          >
            Hapus Produk
          </button>
        </div>
      </div>
    </div>
  );
}