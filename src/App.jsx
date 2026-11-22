import { useState } from "react";
import { Routes, Route } from "react-router";
import { initialProducts } from "./data/initialProducts";
import AppLayout from "./layouts/AppLayout";
import DashboardPage from "./pages/DashboardPage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import SettingsPage from "./pages/SettingsPage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  const [products, setProducts] = useState(initialProducts);
  const [cartCount, setCartCount] = useState(0);
  const [viewMode, setViewMode] = useState("grid");

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
  }

  function handleDeleteProduct(id) {
    setProducts((prev) => prev.filter((item) => item.id !== id));
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

  function handleResetCart() {
    setCartCount(0);
  }

  return (
    <Routes>
      <Route path="/" element={<AppLayout cartCount={cartCount} />}>
        <Route
          index
          element={<DashboardPage products={products} cartCount={cartCount} />}
        />
        <Route
          path="products"
          element={
            <ProductsPage
              products={products}
              viewMode={viewMode}
              onSaveProduct={handleSaveProduct}
              onDeleteProduct={handleDeleteProduct}
              onAddToCart={handleAddToCart}
            />
          }
        />
        <Route
          path="products/:id"
          element={
            <ProductDetailPage
              products={products}
              onAddToCart={handleAddToCart}
            />
          }
        />
        <Route
          path="settings"
          element={
            <SettingsPage
              viewMode={viewMode}
              onChangeViewMode={setViewMode}
              cartCount={cartCount}
              onResetCart={handleResetCart}
            />
          }
        />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}