import { formatRupiah } from "../utils/formatCurrency";

export default function ProductCard({ product, onEdit, onDelete, onAddToCart }) {
  const isOutOfStock = product.stock === 0;
  const isLowStock = product.stock > 0 && product.stock <= 4;

  return (
    <article className="product-card">
      <div className="card-top">
        <span className="product-id">ID: {product.id}</span>
        <span className="category-tag">{product.category}</span>
      </div>

      <h2 className="product-title">{product.name}</h2>
      <p className="product-price">{formatRupiah(product.price)}</p>

      <div className="stock-row">
        <span
          className={`stock-badge ${
            isOutOfStock ? "stock-empty" : isLowStock ? "stock-low" : "stock-ok"
          }`}
        >
          {isOutOfStock
            ? "Stok Habis"
            : isLowStock
            ? `Sisa ${product.stock} unit`
            : `Stok: ${product.stock} unit`}
        </span>
      </div>

      <div className="card-actions">
        <button
          type="button"
          className="btn btn-buy"
          disabled={isOutOfStock}
          onClick={() => onAddToCart(product.id)}
        >
          {isOutOfStock ? "Habis" : "+ Beli"}
        </button>
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={() => onEdit(product)}
        >
          Edit
        </button>
        <button
          type="button"
          className="btn btn-outline-danger"
          onClick={() => onDelete(product)}
        >
          Hapus
        </button>
      </div>
    </article>
  );
}