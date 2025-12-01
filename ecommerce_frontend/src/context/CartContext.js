import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { getCart, saveCart } from '../utils/storage';

export const CartContext = createContext(null);

// PUBLIC_INTERFACE
export function CartProvider({ children }) {
  /** Cart provider to manage items, totals, and persistence. */
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);

  // load cart
  useEffect(() => {
    const stored = getCart();
    if (stored?.items) setItems(stored.items);
  }, []);

  // persist cart
  useEffect(() => {
    saveCart({ items });
  }, [items]);

  const addItem = useCallback((product, quantity = 1) => {
    setItems(prev => {
      const idx = prev.findIndex(i => i.id === product.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], quantity: next[idx].quantity + quantity };
        return next;
      }
      return [...prev, { id: product.id, title: product.title, price: product.price, image: product.image, quantity }];
    });
    setOpen(true);
  }, []);

  const removeItem = useCallback((id) => {
    setItems(prev => prev.filter(i => i.id !== id));
  }, []);

  const updateQuantity = useCallback((id, quantity) => {
    setItems(prev => prev.map(i => (i.id === id ? { ...i, quantity: Math.max(1, quantity) } : i)));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const totals = useMemo(() => {
    const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const shipping = subtotal > 0 ? 9.99 : 0;
    const tax = subtotal * 0.07;
    const total = subtotal + shipping + tax;
    return { subtotal, shipping, tax, total };
  }, [items]);

  const value = useMemo(() => ({
    items, addItem, removeItem, updateQuantity, clear, totals, open, setOpen
  }), [items, addItem, removeItem, updateQuantity, clear, totals, open]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
