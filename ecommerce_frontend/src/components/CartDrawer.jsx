import React from 'react';
import { Link } from 'react-router-dom';
import useCart from '../hooks/useCart';

export default function CartDrawer({ open, onClose }) {
  const { items, totals, removeItem, updateQuantity } = useCart();
  return (
    <aside className={`cart-drawer ${open ? 'open' : ''}`} aria-hidden={!open}>
      <div className="cart-header">
        <strong>Cart</strong>
        <button className="btn secondary" onClick={onClose}>Close</button>
      </div>
      <div className="cart-body">
        {items.length === 0 ? <div className="muted">Your cart is empty.</div> : null}
        {items.map(i => (
          <div key={i.id} className="card" style={{ padding:10, display:'grid', gap:8 }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <strong>{i.title}</strong>
              <button className="btn secondary" onClick={()=>removeItem(i.id)}>Remove</button>
            </div>
            <div className="muted">${(i.price*i.quantity).toFixed(2)}</div>
            <div style={{ display:'flex', gap:8, alignItems:'center' }}>
              <label htmlFor={`qty-${i.id}`}>Qty</label>
              <input
                id={`qty-${i.id}`}
                className="input"
                type="number"
                min={1}
                value={i.quantity}
                onChange={(e)=>updateQuantity(i.id, Number(e.target.value))}
                style={{ width: 90 }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="cart-footer">
        <div style={{ display:'grid', gap:4 }}>
          <div style={{ display:'flex', justifyContent:'space-between' }}><span className="muted">Subtotal</span><strong>${totals.subtotal.toFixed(2)}</strong></div>
          <div style={{ display:'flex', justifyContent:'space-between' }}><span className="muted">Shipping</span><strong>${totals.shipping.toFixed(2)}</strong></div>
          <div style={{ display:'flex', justifyContent:'space-between' }}><span className="muted">Tax</span><strong>${totals.tax.toFixed(2)}</strong></div>
          <div style={{ display:'flex', justifyContent:'space-between', borderTop:'1px solid var(--ocean-border)', paddingTop:8 }}>
            <span>Total</span><strong>${totals.total.toFixed(2)}</strong>
          </div>
        </div>
        <Link className="btn" to="/checkout" onClick={onClose}>Checkout</Link>
        <Link className="btn secondary" to="/cart" onClick={onClose}>View Cart</Link>
      </div>
    </aside>
  );
}
