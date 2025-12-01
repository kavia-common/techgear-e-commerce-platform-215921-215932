import React from 'react';
import { Link } from 'react-router-dom';

// PUBLIC_INTERFACE
export default function CategorySidebar({ categories }) {
  /** Simple category list for side navigation. */
  return (
    <div className="card sidebar">
      <h4 style={{ marginTop:0 }}>Categories</h4>
      <div style={{ display:'grid', gap:8 }}>
        {categories.map(c => (
          <Link className="badge" key={c} to={`/?category=${encodeURIComponent(c)}`}>{c}</Link>
        ))}
      </div>
    </div>
  );
}
