import { useState } from "react";
import Button from "./atoms/Button";

export default function ProductFormModal({ initialData, onClose, onSave }) {
  const isEditMode = Boolean(initialData);

  const [name, setName] = useState(initialData ? initialData.name : "");
  const [category, setCategory] = useState(
    initialData ? initialData.category : "Periferal"
  );
  const [price, setPrice] = useState(initialData ? String(initialData.price) : "");
  const [stock, setStock] = useState(initialData ? String(initialData.stock) : "10");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const trimmedName = name.trim();
    const numericPrice = Number(price);
    const numericStock = Number(stock);

    if (!trimmedName) {
      setError("Nama produk wajib diisi.");
      return;
    }
    if (!numericPrice || numericPrice <= 0) {
      setError("Harga harus lebih dari 0.");
      return;
    }
    if (Number.isNaN(numericStock) || numericStock < 0) {
      setError("Stok tidak boleh kurang dari 0.");
      return;
    }

    onSave({
      id: isEditMode ? initialData.id : null,
      name: trimmedName,
      category,
      price: numericPrice,
      stock: numericStock,
    });
  }

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
      >
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              {isEditMode ? "Edit Produk" : "Tambah Produk"}
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              {isEditMode
                ? "Perbarui informasi produk yang dipilih."
                : "Masukkan informasi produk baru."}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-2xl leading-none text-slate-400 hover:text-slate-600"
          >
            ×
          </button>
        </div>

        {isEditMode && (
          <p className="mb-3 text-xs font-medium text-slate-400">
            ID: {initialData.id}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <label className="block text-sm font-semibold text-slate-700">
            Nama Produk
            <input
              type="text"
              placeholder="Contoh: Mechanical Keyboard"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-normal outline-none focus:border-blue-600"
            />
          </label>

          <label className="block text-sm font-semibold text-slate-700">
            Kategori
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-normal outline-none focus:border-blue-600"
            >
              <option value="Periferal">Periferal</option>
              <option value="Audio">Audio</option>
              <option value="Penyimpanan">Penyimpanan</option>
            </select>
          </label>

          <label className="block text-sm font-semibold text-slate-700">
            Harga (Rp)
            <input
              type="number"
              placeholder="Contoh: 250000"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-normal outline-none focus:border-blue-600"
            />
            <span className="mt-1 block text-xs font-normal text-slate-400">
              Harga harus lebih dari 0.
            </span>
          </label>

          <label className="block text-sm font-semibold text-slate-700">
            Stok Unit
            <input
              type="number"
              min="0"
              placeholder="Contoh: 10"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-normal outline-none focus:border-blue-600"
            />
          </label>

          {error && <p className="text-sm font-medium text-red-600">{error}</p>}

          <div className="mt-4 grid grid-cols-2 gap-2.5 pt-2">
            <Button variant="secondary" onClick={onClose}>
              Batal
            </Button>
            <Button type="submit" variant="primary">
              {isEditMode ? "Simpan Perubahan" : "Simpan Produk"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}