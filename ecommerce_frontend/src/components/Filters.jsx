import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

// PUBLIC_INTERFACE
export default function Filters({ categories = [], brands = [] }) {
  /** Sidebar filters controlling URL search params. */
  const [params, setParams] = useSearchParams();
  const [category, setCategory] = useState(params.get('category') || '');
  const [brand, setBrand] = useState(params.get('brand') || '');
  const [min, setMin] = useState(params.get('min') || '');
  const [max, setMax] = useState(params.get('max') || '');
  const [sort, setSort] = useState(params.get('sort') || '');

  useEffect(() => {
    setCategory(params.get('category') || '');
    setBrand(params.get('brand') || '');
    setMin(params.get('min') || '');
    setMax(params.get('max') || '');
    setSort(params.get('sort') || '');
  }, [params]);

  const apply = () => {
    const p = new URLSearchParams(params);
    const setOrDel = (k, v) => (v ? p.set(k, v) : p.delete(k));
    setOrDel('category', category);
    setOrDel('brand', brand);
    setOrDel('min', min);
    setOrDel('max', max);
    setOrDel('sort', sort);
    setOrDel('page', '1');
    setParams(p, { replace: true });
  };

  const clear = () => {
    const p = new URLSearchParams();
    const q = params.get('q'); if (q) p.set('q', q);
    setParams(p, { replace: true });
  };

  return (
    <aside className="sidebar card" aria-label="Filters">
      <div style={{ display:'grid', gap:10 }}>
        <div>
          <label>Category</label>
          <select value={category} onChange={(e)=>setCategory(e.target.value)}>
            <option value="">All</option>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label>Brand</label>
          <select value={brand} onChange={(e)=>setBrand(e.target.value)}>
            <option value="">All</option>
            {brands.map(b => <option key={b} value={b}>{b}</option>)}
          </select>
        </div>
        <div style={{ display:'flex', gap:8 }}>
          <div>
            <label>Min</label>
            <input className="input" value={min} onChange={(e)=>setMin(e.target.value)} placeholder="0" />
          </div>
          <div>
            <label>Max</label>
            <input className="input" value={max} onChange={(e)=>setMax(e.target.value)} placeholder="5000" />
          </div>
        </div>
        <div>
          <label>Sort</label>
          <select value={sort} onChange={(e)=>setSort(e.target.value)}>
            <option value="">Relevance</option>
            <option value="price_asc">Price ↑</option>
            <option value="price_desc">Price ↓</option>
            <option value="newest">Newest</option>
          </select>
        </div>
        <div style={{ display:'flex', gap:8 }}>
          <button className="btn" onClick={apply}>Apply</button>
          <button className="btn secondary" onClick={clear}>Clear</button>
        </div>
      </div>
    </aside>
  );
}
