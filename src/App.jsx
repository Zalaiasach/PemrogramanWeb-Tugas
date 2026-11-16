import { useState } from "react";
import { initialProducts } from "./data/initialProducts";
import Header from "./components/Header";
import FilterBar from "./components/FilterBar";
import ProductCard from "./components/ProductCard";
import ProductFormModal from "./components/ProductFormModal";
import DeleteConfirmModal from "./components/DeleteConfirmModal";
import "./App.css";

export default function App() {
  const [products, setProducts] = useState(initialProducts);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [cartCount, setCartCount] = useState(0);

  // State untuk kontrol Pop-up Modal
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

  function handleSaveProduct(formData) {
    if (formData.id) {
      setProducts((prev) =>
        prev.map((item) => (item.id === formData.id ? formData : item))
      );
    } else {
      const nextId =
        products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1;
      setProducts((prev) => [...prev, { ...formData, id: nextId }]);
    }
    setIsFormOpen(false);
    setEditingProduct(null);
  }

  function handleConfirmDelete(id) {
    setProducts((prev) => prev.filter((item) => item.id !== id));
    setDeletingProduct(null);
  }

  function handleAddToCart(id) {
    setProducts((prev) =>
      prev.map((item) =>
        item.id === id && item.stock > 0
          ? { ...item, stock: item.stock - 1 }
          : item
      )
    );
    setCartCount((prev) => prev + 1);
  }

  return (
    <div className="app-container">
      <Header cartCount={cartCount} onOpenAddModal={handleOpenAddModal} />

      <FilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        totalFiltered={filteredProducts.length}
      />

      {filteredProducts.length > 0 ? (
        <main className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onEdit={handleOpenEditModal}
              onDelete={(item) => setDeletingProduct(item)}
              onAddToCart={handleAddToCart}
            />
          ))}
        </main>
      ) : (
        <div className="empty-state">
          <p>Produk tidak ditemukan untuk kata kunci atau kategori tersebut.</p>
        </div>
      )}

      <footer className="store-footer">
        Menampilkan {filteredProducts.length} dari {products.length} produk
      </footer>

      {isFormOpen && (
        <ProductFormModal
          initialData={editingProduct}
          onClose={() => {
            setIsFormOpen(false);
            setEditingProduct(null);
          }}
          onSave={handleSaveProduct}
        />
      )}

      {deletingProduct && (
        <DeleteConfirmModal
          product={deletingProduct}
          onCancel={() => setDeletingProduct(null)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
}