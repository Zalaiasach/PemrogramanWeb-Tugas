import { NavLink } from "react-router";

export default function Navbar({ cartCount }) {
  const navClass = ({ isActive }) =>
    `rounded-lg px-3 py-1.5 text-sm transition ${
      isActive
        ? "bg-blue-50 font-bold text-blue-600"
        : "font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900"
    }`;

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-3.5">
        <div className="flex flex-wrap items-center gap-6">
          <span className="text-lg font-extrabold tracking-tight text-blue-600">
            ZalaTech Store
          </span>
          <nav className="flex items-center gap-2">
            <NavLink to="/" end className={navClass}>
              Dashboard
            </NavLink>
            <NavLink to="/products" className={navClass}>
              Produk
            </NavLink>
            <NavLink to="/settings" className={navClass}>
              Settings
            </NavLink>
          </nav>
        </div>

        <div className="rounded-lg bg-blue-100 px-3.5 py-1.5 text-sm text-blue-900">
          Keranjang: <strong>{cartCount} item</strong>
        </div>
      </div>
    </header>
  );
}