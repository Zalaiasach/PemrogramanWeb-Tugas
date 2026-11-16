import { NavLink } from "react-router";

export default function Navbar({ cartCount }) {
  return (
    <header className="top-navbar">
      <div className="navbar-inner">
        <div className="brand-group">
          <span className="brand-title">ZalaTech Store</span>
          <nav className="nav-links">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive ? "nav-item active" : "nav-item"
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                isActive ? "nav-item active" : "nav-item"
              }
            >
              Produk
            </NavLink>
            <NavLink
              to="/settings"
              className={({ isActive }) =>
                isActive ? "nav-item active" : "nav-item"
              }
            >
              Settings
            </NavLink>
          </nav>
        </div>

        <div className="cart-badge">
          Keranjang: <strong>{cartCount} item</strong>
        </div>
      </div>
    </header>
  );
}