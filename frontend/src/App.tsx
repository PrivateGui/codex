import { Link, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { AuthPage } from "./pages/AuthPage";
import { AdminPage } from "./pages/AdminPage";

export const App = () => (
  <div className="mx-auto max-w-6xl px-6 py-8">
    <header className="glass mb-8 flex items-center justify-between rounded-2xl p-4">
      <h1 className="text-xl font-semibold">Velvet Ink</h1>
      <nav className="space-x-4 text-sm text-zinc-300"><Link to="/">Articles</Link><Link to="/auth">Sign in</Link><Link to="/admin">Admin</Link></nav>
    </header>
    <Routes><Route path="/" element={<HomePage />} /><Route path="/auth" element={<AuthPage />} /><Route path="/admin" element={<AdminPage />} /></Routes>
  </div>
);
