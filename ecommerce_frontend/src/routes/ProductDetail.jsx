import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import useCart from '../hooks/useCart';

// PUBLIC_INTERFACE
export default function ProductDetail() {
  /** Shows product details and allows adding to cart. */
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [error, setError] = useState(null);
  const { addItem } = useCart();

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get(`/products/${id}`);
        setProduct(res.data);
      } catch (e) {
        setError(e?.response?.data?.detail || e.message);
        setProduct({
          id,
          title: `Sample Product #${id}`,
          brand: 'TechBrand',
          price: 999.99,
          stock: 12,
          description: 'High-performance device for professionals.',
          specs: { CPU: 'Intel i7', RAM: '16GB', Storage: '512GB SSD' },
          images: ['https://via.placeholder.com/1200x800?text=Product']
        });
      }
    };
    load();
  }, [id]);

  if (!product) return <div className="container">Loading...</div>;

  return (
    <div className="container" style={{ display:'grid', gridTemplateColumns:'1.1fr .9fr', gap:20 }}>
      <div className="card" style={{ padding:12 }}>
        <img alt={product.title} src={(product.images && product.images[0]) || product.image || 'https://via.placeholder.com/1200x800?text=Product'} style={{ width:'100%', borderRadius:12 }} />
      </div>
      <div className="card" style={{ padding:16, display:'grid', gap:10, alignSelf:'start' }}>
        {error ? <div className="badge" style={{ background:'var(--ocean-error)' }}>Placeholder details shown</div> : null}
        <h2 style={{ margin:'4px 0' }}>{product.title}</h2>
        <div className="muted">{product.brand}</div>
        <div><strong className="price">${product.price}</strong> {product.stock ? <span className="badge" style={{ background:'var(--ocean-success)' }}>In stock</span> : <span className="badge" style={{ background:'var(--ocean-error)' }}>Out of stock</span>}</div>
        <p>{product.description || 'No description provided.'}</p>
        {product.specs ? (
          <div className="card" style={{ padding:10 }}>
            <strong>Specifications</strong>
            <ul>
              {Object.entries(product.specs).map(([k,v]) => <li key={k}><strong>{k}:</strong> {v}</li>)}
            </ul>
          </div>
        ) : null}
        <div style={{ display:'flex', gap:10, alignItems:'center' }}>
          <label htmlFor="qty">Quantity</label>
          <input id="qty" className="input" type="number" min={1} value={qty} onChange={(e)=>setQty(Number(e.target.value))} style={{ width:100 }} />
        </div>
        <div style={{ display:'flex', gap:8 }}>
          <button className="btn" onClick={()=>addItem(product, qty)} disabled={product.stock===0}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
}
