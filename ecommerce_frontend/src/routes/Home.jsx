import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../services/api';
import Filters from '../components/Filters';
import ProductCard from '../components/ProductCard';
import Pagination from '../components/Pagination';
import useCart from '../hooks/useCart';

const CATEGORIES = ['Laptops','Desktops','Peripherals','CCTV','Networking','Accessories'];
const BRANDS = ['Lenovo','HP','Dell','Asus','Acer','Hikvision','Dahua'];

// PUBLIC_INTERFACE
export default function Home() {
  /** Home page product listing with filters and pagination. */
  const [params, setParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addItem } = useCart();

  const page = Number(params.get('page') || '1');

  useEffect(() => {
    const load = async () => {
      setLoading(true); setError(null);
      try {
        const res = await api.get('/products', { params: Object.fromEntries(params.entries()) });
        const data = res.data;
        setProducts(Array.isArray(data.items) ? data.items : data);
        setPages(data.pages || 1);
      } catch (e) {
        // Placeholder fallback mocked list if backend not ready
        const q = params.get('q') || '';
        const mock = Array.from({ length: 12 }).map((_, i) => ({
          id: i + 1 + (page - 1) * 12,
          title: `Sample Product ${i + 1}${q ? ` - ${q}` : ''}`,
          brand: BRANDS[i % BRANDS.length],
          price: 499 + (i * 25),
          image: 'https://via.placeholder.com/600x400?text=Product'
        }));
        setProducts(mock);
        setPages(5);
        setError(e?.response?.data?.detail || e.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [params]); // eslint-disable-line react-hooks/exhaustive-deps

  const onPage = (p) => {
    const next = new URLSearchParams(params);
    next.set('page', String(p));
    setParams(next);
  };

  const headerNote = useMemo(() => {
    const q = params.get('q');
    return q ? `Showing results for "${q}"` : 'Featured products';
  }, [params]);

  return (
    <div className="container" style={{ display:'grid', gridTemplateColumns:'260px 1fr', gap:16 }}>
      <Filters categories={CATEGORIES} brands={BRANDS} />
      <section>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12 }}>
          <h2 style={{ margin:0 }}>{headerNote}</h2>
          {error ? <div className="badge" style={{ background:'var(--ocean-error)' }}>Showing placeholder data</div> : null}
        </div>
        {loading ? <div>Loading...</div> : (
          <>
            <div className="grid" style={{ gridTemplateColumns:'repeat(auto-fill, minmax(220px,1fr))' }}>
              {products.map(p => (
                <ProductCard key={p.id} product={p} onAdd={addItem} />
              ))}
            </div>
            <Pagination page={page} pages={pages} onPage={onPage} />
          </>
        )}
      </section>
    </div>
  );
}
