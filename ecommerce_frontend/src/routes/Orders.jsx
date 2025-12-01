import React, { useEffect, useState } from 'react';
import api from '../services/api';

// PUBLIC_INTERFACE
export default function Orders() {
  /** Shows authenticated user's past orders and basic details. */
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get('/orders');
        setOrders(res.data.items || res.data || []);
      } catch (e) {
        setError(e?.response?.data?.detail || e.message);
        // placeholder orders
        setOrders([{ id: 101, total: 1299.99, status: 'processing', created_at: new Date().toISOString(), items: [{ title: 'Sample Product', qty: 1 }] }]);
      }
    };
    load();
  }, []);

  return (
    <div className="container">
      <h2>Your Orders</h2>
      {error ? <div className="badge" style={{ background:'var(--ocean-error)' }}>Showing placeholder orders</div> : null}
      {orders.length === 0 ? <div className="card" style={{ padding:12 }}>No orders yet.</div> : (
        <div className="grid">
          {orders.map(o => (
            <div key={o.id} className="card" style={{ padding:12 }}>
              <div style={{ display:'flex', justifyContent:'space-between' }}>
                <strong>Order #{o.id}</strong>
                <span className="badge">{o.status || 'complete'}</span>
              </div>
              <div className="muted">{new Date(o.created_at).toLocaleString()}</div>
              <div>Total: <strong>${(o.total || 0).toFixed(2)}</strong></div>
              {o.items ? <ul>{o.items.map((i, idx)=> <li key={idx}>{i.title || i.name} x {i.qty || i.quantity}</li>)}</ul> : null}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
