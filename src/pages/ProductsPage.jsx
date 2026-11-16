import { useState } from "react";
import FilterBar from "../components/FilterBar";
import ProductCard from "../components/ProductCard";
import ProductFormModal from "../components/ProductFormModal";
import DeleteConfirmModal from "../components/DeleteConfirmModal";

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
      <div className="page-header">
        <div>
          <h1>Manajemen Produk</h1>
          <p className="subtitle">
            Kelola daftar produk, harga, stok, dan lihat detail masing-masing item.
          </p>
        </div>
        <button className="btn btn-primary" onClick={handleOpenAddModal}>
          + Tambah Produk
        </button>
      </div>

      <FilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        totalFiltered={filteredProducts.length}
      />

      {filteredProducts.length > 0 ? (
        <div className={viewMode === "list" ? "product-list" : "product-grid"}>
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
        <div className="empty-state">
          <p>Produk tidak ditemukan untuk kata kunci atau kategori tersebut.</p>
        </div>
      )}

      <footer className="store-footer">
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