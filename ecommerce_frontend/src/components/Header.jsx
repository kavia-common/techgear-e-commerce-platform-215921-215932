import React, { useEffect, useMemo, useState } from 'react';
import { Link, NavLink, useNavigate, useSearchParams } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useCart from '../hooks/useCart';
import CartDrawer from './CartDrawer';
import AuthModal from './AuthModal';

export function Header() {
  const { isAuthenticated, user, logout } = useAuth();
  const { items, open, setOpen } = useCart();
  const [searchParams, setSearchParams] = useSearchParams();
  const [catOpen, setCatOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const navigate = useNavigate();

  const count = useMemo(() => items.reduce((n, i) => n + i.quantity, 0), [items]);
  const [q, setQ] = useState(searchParams.get('q') || '');

  useEffect(() => { setQ(searchParams.get('q') || ''); }, [searchParams]);

  const onSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (q) params.set('q', q); else params.delete('q');
    navigate(`/?${params.toString()}`);
  };

  return (
    <>
      <header className="header">
        <div className="container topbar">
          <Link className="brand" to="/">
            <span role="img" aria-label="logo">🌊</span> TechGear
          </Link>
          <form className="searchbar" onSubmit={onSearch} role="search">
            <input
              className="input"
              type="search"
              placeholder="Search laptops, desktops, CCTV..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
              aria-label="Search products"
            />
            <button className="btn" type="submit">Search</button>
          </form>
          <nav className="nav" aria-label="Primary">
            <NavLink to="/" end>Home</NavLink>
            <button className="btn secondary" type="button" onClick={() => setCatOpen((v) => !v)} aria-expanded={catOpen}>Categories ▾</button>
            {isAuthenticated ? (
              <>
                <NavLink to="/orders">Orders</NavLink>
                {user?.is_admin ? <NavLink to="/admin">Admin</NavLink> : null}
                <button className="btn secondary" onClick={logout}>Logout</button>
              </>
            ) : (
              <button className="btn secondary" onClick={() => setAuthOpen(true)}>Login</button>
            )}
            <button className="btn" onClick={() => setOpen(true)} aria-label={`Open cart with ${count} items`}>
              🛒 <span className="badge">{count}</span>
            </button>
          </nav>
        </div>
        {catOpen && (
          <div className="container" style={{ paddingBottom: 12 }}>
            <div className="card" style={{ padding: 12, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {['Laptops','Desktops','Peripherals','CCTV','Networking','Accessories'].map(c => (
                <Link key={c} to={`/?category=${encodeURIComponent(c)}`} className="badge">{c}</Link>
              ))}
            </div>
          </div>
        )}
      </header>
      <CartDrawer open={open} onClose={() => setOpen(false)} />
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
}
