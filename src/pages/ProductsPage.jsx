import { useState } from "react";
import FilterBar from "../components/FilterBar";
import ProductCard from "../components/ProductCard";
import ProductFormModal from "../components/ProductFormModal";
import DeleteConfirmModal from "../components/DeleteConfirmModal";
import Button from "../components/atoms/Button";

export default function ProductsPage({
  products,
  viewMode,
  onSaveProduct,
  onDeleteProduct,
  onAddToCart,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deletingProduct, setDeletingProduct] = useState(null);

  const filteredProducts = products.filter((item) => {
    const matchesName = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "Semua" || item.category === selectedCategory;
    return matchesName && matchesCategory;
  });

  function handleOpenAddModal() {
    setEditingProduct(null);
    setIsFormOpen(true);
  }

  function handleOpenEditModal(product) {
    setEditingProduct(product);
    setIsFormOpen(true);
  }

  function handleSave(formData) {
    onSaveProduct(formData);
    setIsFormOpen(false);
    setEditingProduct(null);
  }

  function handleConfirmDelete(id) {
    onDeleteProduct(id);
    setDeletingProduct(null);
  }

  return (
    <section>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Manajemen Produk</h1>
          <p className="mt-1 text-sm text-slate-500">
            Kelola daftar produk, harga, stok, dan lihat detail masing-masing item.
          </p>
        </div>
        <Button variant="primary" onClick={handleOpenAddModal}>
          + Tambah Produk
        </Button>
      </div>

      <FilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        totalFiltered={filteredProducts.length}
      />

      {filteredProducts.length > 0 ? (
        <div
          className={
            viewMode === "list"
              ? "flex flex-col gap-3.5"
              : "grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
          }
        >
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              viewMode={viewMode}
              onEdit={handleOpenEditModal}
              onDelete={(item) => setDeletingProduct(item)}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white px-5 py-12 text-center text-sm text-slate-500">
          Produk tidak ditemukan untuk kata kunci atau kategori tersebut.
        </div>
      )}

      <footer className="mt-6 text-sm text-slate-500">
        Menampilkan {filteredProducts.length} dari {products.length} produk (Mode:{" "}
        {viewMode.toUpperCase()})
      </footer>

      {isFormOpen && (
        <ProductFormModal
          initialData={editingProduct}
          onClose={() => {
            setIsFormOpen(false);
            setEditingProduct(null);
          }}
          onSave={handleSave}
        />
      )}

      {deletingProduct && (
        <DeleteConfirmModal
          product={deletingProduct}
          onCancel={() => setDeletingProduct(null)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </section>
  );
}