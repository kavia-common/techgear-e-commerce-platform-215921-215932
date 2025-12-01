import React from 'react';

export function Footer() {
  return (
    <footer className="footer">
      <div className="container inner">
        <div>
          <h4>TechGear</h4>
          <p className="muted">Premium laptops, computers, and CCTV equipment.</p>
        </div>
        <div>
          <h4>Support</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display:'grid', gap:8 }}>
            <li><a href="#shipping">Shipping & Returns</a></li>
            <li><a href="#warranty">Warranty</a></li>
            <li><a href="#contact">Contact us</a></li>
          </ul>
        </div>
        <div>
          <h4>Newsletter</h4>
          <div style={{ display:'flex', gap:8 }}>
            <input className="input" placeholder="you@example.com" />
            <button className="btn">Subscribe</button>
          </div>
        </div>
      </div>
      <div className="container copyright">© {new Date().getFullYear()} TechGear Inc. All rights reserved.</div>
    </footer>
  );
}
