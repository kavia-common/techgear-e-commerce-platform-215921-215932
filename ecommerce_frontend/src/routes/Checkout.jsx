import React, { useState } from 'react';
import useCart from '../hooks/useCart';
import useAuth from '../hooks/useAuth';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

// PUBLIC_INTERFACE
export default function Checkout() {
  /** Checkout flow with shipping form and mock payment. */
  const { items, totals, clear } = useCart();
  const { user } = useAuth();
  const [form, setForm] = useState({ name: user?.name || '', address: '', city: '', zip: '', payment: 'card' });
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const placeOrder = async () => {
    setPlacing(true); setError(null);
    try {
      const res = await api.post('/orders', { items, shipping: form, totals });
      const order = res.data;
      clear();
      navigate('/orders', { state: { placed: true, id: order.id } });
    } catch (e) {
      setError(e?.response?.data?.detail || 'Backend not ready. Order simulated.');
      // Simulate order placement
      clear();
      navigate('/orders', { state: { placed: true, id: Math.floor(Math.random()*100000) } });
    } finally {
      setPlacing(false);
    }
  };

  if (!items.length) {
    return <div className="container card" style={{ padding:16 }}>Your cart is empty.</div>;
  }

  return (
    <div className="container" style={{ display:'grid', gridTemplateColumns:'1fr 380px', gap:16 }}>
      <div className="card" style={{ padding:16, display:'grid', gap:10 }}>
        <h2>Shipping</h2>
        {error ? <div className="badge" style={{ background:'var(--ocean-error)' }}>{error}</div> : null}
        <div style={{ display:'grid', gap:10 }}>
          <div><label>Name</label><input className="input" value={form.name} onChange={(e)=>setForm(f=>({...f,name:e.target.value}))} required /></div>
          <div><label>Address</label><input className="input" value={form.address} onChange={(e)=>setForm(f=>({...f,address:e.target.value}))} required /></div>
          <div style={{ display:'flex', gap:8 }}>
            <div style={{ flex:1 }}><label>City</label><input className="input" value={form.city} onChange={(e)=>setForm(f=>({...f,city:e.target.value}))} required /></div>
            <div style={{ width:160 }}><label>ZIP</label><input className="input" value={form.zip} onChange={(e)=>setForm(f=>({...f,zip:e.target.value}))} required /></div>
          </div>
          <div>
            <label>Payment</label>
            <select value={form.payment} onChange={(e)=>setForm(f=>({...f,payment:e.target.value}))}>
              <option value="card">Credit/Debit Card</option>
              <option value="cod">Cash on Delivery</option>
            </select>
          </div>
        </div>
      </div>
      <div className="card" style={{ padding:16, height:'max-content' }}>
        <h3>Order Review</h3>
        <ul>
          {items.map(i => <li key={i.id}>{i.title} x {i.quantity} — ${(i.price*i.quantity).toFixed(2)}</li>)}
        </ul>
        <div style={{ display:'grid', gap:6 }}>
          <div style={{ display:'flex', justifyContent:'space-between' }}><span className="muted">Subtotal</span><strong>${totals.subtotal.toFixed(2)}</strong></div>
          <div style={{ display:'flex', justifyContent:'space-between' }}><span className="muted">Shipping</span><strong>${totals.shipping.toFixed(2)}</strong></div>
          <div style={{ display:'flex', justifyContent:'space-between' }}><span className="muted">Tax</span><strong>${totals.tax.toFixed(2)}</strong></div>
          <div style={{ display:'flex', justifyContent:'space-between', borderTop:'1px solid var(--ocean-border)', paddingTop:8 }}><span>Total</span><strong>${totals.total.toFixed(2)}</strong></div>
        </div>
        <button className="btn" onClick={placeOrder} disabled={placing} style={{ marginTop:10 }}>{placing ? 'Placing...' : 'Place Order'}</button>
      </div>
    </div>
  );
}
