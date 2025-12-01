import React from 'react';

// PUBLIC_INTERFACE
export default function Pagination({ page, pages, onPage }) {
  /** Simple pagination control. */
  if (pages <= 1) return null;
  const prev = () => onPage(Math.max(1, page - 1));
  const next = () => onPage(Math.min(pages, page + 1));

  return (
    <div style={{ display:'flex', gap:8, alignItems:'center', justifyContent:'center', marginTop:16 }}>
      <button className="btn secondary" onClick={prev} disabled={page===1}>Prev</button>
      <div className="badge">Page {page} / {pages}</div>
      <button className="btn secondary" onClick={next} disabled={page===pages}>Next</button>
    </div>
  );
}
