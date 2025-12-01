import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ product, onAdd }) {
  const { id, title, price, image, brand } = product;
  return (
    <div className="card product-card">
      <Link to={`/products/${id}`} aria-label={`View ${title}`}>
        <img className="product-thumb" src={image || 'https://via.placeholder.com/600x400?text=Product'} alt={title} />
      </Link>
      <div style={{ display:'grid', gap:4 }}>
        <Link to={`/products/${id}`}><strong>{title}</strong></Link>
        <div className="muted">{brand}</div>
        <div className="price">${price?.toFixed ? price.toFixed(2) : price}</div>
      </div>
      <div style={{ display:'flex', gap:8, marginTop:'auto' }}>
        <Link className="btn secondary" to={`/products/${id}`}>Details</Link>
        <button className="btn" onClick={() => onAdd?.(product)}>Add to Cart</button>
      </div>
    </div>
  );
}
