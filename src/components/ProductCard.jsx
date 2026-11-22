import { Link } from "react-router";
import { formatRupiah } from "../utils/formatCurrency";
import Button from "./atoms/Button";

export default function ProductCard({
  product,
  viewMode = "grid",
  onEdit,
  onDelete,
  onAddToCart,
}) {
  const isOutOfStock = product.stock === 0;
  const isLowStock = product.stock > 0 && product.stock <= 4;
  const isList = viewMode === "list";

  return (
    <article
      className={`rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md ${
        isList
          ? "flex flex-col justify-between gap-4 md:flex-row md:items-center"
          : "flex flex-col justify-between gap-3"
      }`}
    >
      <div
        className={
          isList
            ? "flex flex-1 flex-wrap items-center justify-between gap-4"
            : "space-y-2"
        }
      >
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs text-slate-400">ID: {product.id}</span>
          <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-700">
            {product.category}
          </span>
        </div>

        <h2 className="text-lg font-bold text-slate-900">{product.name}</h2>

        <p className="text-xl font-bold text-blue-600">
          {formatRupiah(product.price)}
        </p>

        <div>
          <span
            className={`inline-block rounded-md px-2.5 py-1 text-xs font-medium ${
              isOutOfStock
                ? "bg-red-100 text-red-800"
                : isLowStock
                ? "bg-amber-100 text-amber-800"
                : "bg-emerald-100 text-emerald-800"
            }`}
          >
            {isOutOfStock
              ? "Stok Habis"
              : isLowStock
              ? `Sisa ${product.stock} unit`
              : `Stok: ${product.stock} unit`}
          </span>
        </div>
      </div>

      <div
        className={`grid grid-cols-4 gap-1.5 ${
          isList ? "w-full md:w-auto md:min-w-72" : "mt-2"
        }`}
      >
        <Link
          to={`/products/${product.id}`}
          className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-slate-100 px-2.5 py-2 text-xs font-semibold text-slate-800 transition hover:bg-slate-200"
        >
          Detail
        </Link>
        <Button
          variant="dark"
          disabled={isOutOfStock}
          onClick={() => onAddToCart(product.id)}
          className="px-2.5 text-xs"
        >
          {isOutOfStock ? "Habis" : "+ Beli"}
        </Button>
        <Button
          variant="outlinePrimary"
          onClick={() => onEdit(product)}
          className="px-2.5 text-xs"
        >
          Edit
        </Button>
        <Button
          variant="outlineDanger"
          onClick={() => onDelete(product)}
          className="px-2.5 text-xs"
        >
          Hapus
        </Button>
      </div>
    </article>
  );
}