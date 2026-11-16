const CATEGORIES = ["Semua", "Periferal", "Audio", "Penyimpanan"];

export default function FilterBar({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  totalFiltered,
}) {
  return (
    <section className="filter-section">
      <div className="filter-controls">
        <input
          type="text"
          className="search-input"
          placeholder="Cari nama produk..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <div className="category-pills">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              className={`pill-btn ${selectedCategory === category ? "active" : ""}`}
              onClick={() => onCategoryChange(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      <span className="product-counter">{totalFiltered} produk</span>
    </section>
  );
}