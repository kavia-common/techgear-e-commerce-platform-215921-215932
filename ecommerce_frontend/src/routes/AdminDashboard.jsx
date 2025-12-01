import React, { useEffect, useState } from 'react';
import api from '../services/api';

// PUBLIC_INTERFACE
export default function AdminDashboard() {
  /** Minimal admin panel to manage products (create/update). */
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ title: '', brand: '', price: 0, category: 'Laptops', image: '' });
  const [msg, setMsg] = useState(null);

  const load = async () => {
    try {
      const res = await api.get('/products');
      setProducts(res.data.items || res.data || []);
    } catch (e) {
      // placeholder
      setProducts([{ id: 1, title: 'Sample Admin Product', brand: 'Brand', price: 999 }]);
      setMsg('Backend not ready. Using placeholder.');
    }
  };

  useEffect(() => { load(); }, []);

  const create = async (e) => {
    e.preventDefault();
    setMsg(null);
    try {
      await api.post('/products', form);
      setForm({ title: '', brand: '', price: 0, category: 'Laptops', image: '' });
      await load();
    } catch (e2) {
      setMsg(e2?.response?.data?.detail || 'Create failed (placeholder only).');
      setProducts(prev => [{ id: Math.random(), ...form }, ...prev]);
    }
  };

  return (
    <div className="container" style={{ display:'grid', gridTemplateColumns:'380px 1fr', gap:16 }}>
      <div className="card" style={{ padding:12 }}>
        <h3>Create product</h3>
        {msg ? <div className="badge" style={{ background:'var(--ocean-error)' }}>{msg}</div> : null}
        <form onSubmit={create} style={{ display:'grid', gap:8 }}>
          <input className="input" placeholder="Title" value={form.title} onChange={(e)=>setForm(f=>({...f,title:e.target.value}))} required />
          <input className="input" placeholder="Brand" value={form.brand} onChange={(e)=>setForm(f=>({...f,brand:e.target.value}))} required />
          <input className="input" type="number" step="0.01" placeholder="Price" value={form.price} onChange={(e)=>setForm(f=>({...f,price:Number(e.target.value)}))} required />
          <input className="input" placeholder="Category" value={form.category} onChange={(e)=>setForm(f=>({...f,category:e.target.value}))} />
          <input className="input" placeholder="Image URL" value={form.image} onChange={(e)=>setForm(f=>({...f,image:e.target.value}))} />
          <button className="btn" type="submit">Create</button>
        </form>
      </div>
      <div className="card" style={{ padding:12 }}>
        <h3>Products</h3>
        <div className="grid" style={{ gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))' }}>
          {products.map(p => (
            <div key={p.id} className="card" style={{ padding:10 }}>
              <strong>{p.title}</strong>
              <div className="muted">{p.brand}</div>
              <div>${p.price}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
