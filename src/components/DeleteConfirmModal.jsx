import { formatRupiah } from "../utils/formatCurrency";
import Button from "./atoms/Button";

export default function DeleteConfirmModal({ product, onCancel, onConfirm }) {
  if (!product) return null;

  return (
    <div
      onClick={onCancel}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md rounded-2xl bg-white p-6 text-center shadow-xl"
      >
        <button
          type="button"
          onClick={onCancel}
          className="absolute top-4 right-5 text-2xl leading-none text-slate-400 hover:text-slate-600"
        >
          ×
        </button>

        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-red-100 text-xl">
          🗑️
        </div>
        <h3 className="text-lg font-bold text-slate-900">Hapus Produk?</h3>
        <p className="mt-1 text-sm text-slate-500">
          Produk yang dihapus tidak dapat dikembalikan.
        </p>

        <div className="my-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-left">
          <span className="text-xs text-slate-400">ID: {product.id}</span>
          <h4 className="mt-1 font-bold text-slate-900">{product.name}</h4>
          <p className="mt-0.5 font-bold text-blue-600">
            {formatRupiah(product.price)}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <Button variant="secondary" onClick={onCancel}>
            Batal
          </Button>
          <Button variant="danger" onClick={() => onConfirm(product.id)}>
            Hapus Produk
          </Button>
        </div>
      </div>
    </div>
  );
}