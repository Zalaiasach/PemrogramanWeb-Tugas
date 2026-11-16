import { useState } from "react";

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
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h3>{isEditMode ? "Edit Produk" : "Tambah Produk"}</h3>
            <p className="modal-desc">
              {isEditMode
                ? "Perbarui informasi produk yang dipilih."
                : "Masukkan informasi produk baru."}
            </p>
          </div>
          <button type="button" className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        {isEditMode && <p className="edit-id-label">ID: {initialData.id}</p>}

        <form onSubmit={handleSubmit} className="modal-form">
          <label>
            Nama Produk
            <input
              type="text"
              placeholder="Contoh: Mechanical Keyboard"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>

          <label>
            Kategori
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="Periferal">Periferal</option>
              <option value="Audio">Audio</option>
              <option value="Penyimpanan">Penyimpanan</option>
            </select>
          </label>

          <label>
            Harga (Rp)
            <input
              type="number"
              placeholder="Contoh: 250000"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <small className="hint-text">Harga harus lebih dari 0.</small>
          </label>

          <label>
            Stok Unit
            <input
              type="number"
              min="0"
              placeholder="Contoh: 10"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
          </label>

          {error && <p className="error-text">{error}</p>}

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Batal
            </button>
            <button type="submit" className="btn btn-primary">
              {isEditMode ? "Simpan Perubahan" : "Simpan Produk"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}