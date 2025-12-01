import React from 'react';
import { Link } from 'react-router-dom';
import useCart from '../hooks/useCart';

// PUBLIC_INTERFACE
export default function Cart() {
  /** Full cart page with editable items and totals. */
  const { items, totals, removeItem, updateQuantity, clear } = useCart();
  return (
    <div className="container">
      <h2>Shopping Cart</h2>
      {items.length === 0 ? (
        <div className="card" style={{ padding:16 }}>
          Your cart is empty. <Link className="btn secondary" to="/">Continue shopping</Link>
        </div>
      ) : (
        <div style={{ display:'grid', gridTemplateColumns:'1fr 360px', gap:16 }}>
          <div className="card" style={{ padding:12, display:'grid', gap:12 }}>
            {items.map(i => (
              <div key={i.id} className="card" style={{ padding:10, display:'grid', gap:8 }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                  <strong>{i.title}</strong>
                  <button className="btn secondary" onClick={()=>removeItem(i.id)}>Remove</button>
                </div>
                <div className="muted">${i.price} x {i.quantity} = ${(i.price*i.quantity).toFixed(2)}</div>
                <div style={{ display:'flex', gap:8, alignItems:'center' }}>
                  <label htmlFor={`q-${i.id}`}>Qty</label>
                  <input id={`q-${i.id}`} className="input" type="number" min={1} value={i.quantity} onChange={(e)=>updateQuantity(i.id, Number(e.target.value))} style={{ width: 90 }} />
                </div>
              </div>
            ))}
            <button className="btn secondary" onClick={clear}>Clear cart</button>
          </div>
          <div className="card" style={{ padding:12, height:'max-content' }}>
            <h3>Summary</h3>
            <div style={{ display:'grid', gap:8 }}>
              <div style={{ display:'flex', justifyContent:'space-between' }}><span className="muted">Subtotal</span><strong>${totals.subtotal.toFixed(2)}</strong></div>
              <div style={{ display:'flex', justifyContent:'space-between' }}><span className="muted">Shipping</span><strong>${totals.shipping.toFixed(2)}</strong></div>
              <div style={{ display:'flex', justifyContent:'space-between' }}><span className="muted">Tax</span><strong>${totals.tax.toFixed(2)}</strong></div>
              <div style={{ display:'flex', justifyContent:'space-between', borderTop:'1px solid var(--ocean-border)', paddingTop:8 }}><span>Total</span><strong>${totals.total.toFixed(2)}</strong></div>
              <Link className="btn" to="/checkout">Proceed to Checkout</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
