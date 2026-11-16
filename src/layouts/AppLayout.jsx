import { Outlet } from "react-router";
import Navbar from "../components/Navbar";

export default function AppLayout({ cartCount }) {
  return (
    <>
      <Navbar cartCount={cartCount} />
      <main className="app-container">
        <Outlet />
      </main>
    </>
  );
}