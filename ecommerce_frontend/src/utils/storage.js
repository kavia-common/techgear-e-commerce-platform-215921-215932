const LS_AUTH_KEY = 'tg_auth';
const LS_CART_KEY = 'tg_cart';

// PUBLIC_INTERFACE
export function saveAuth(data) {
  /** Persist auth data (token, user) to localStorage. */
  try { localStorage.setItem(LS_AUTH_KEY, JSON.stringify(data)); } catch {}
}

// PUBLIC_INTERFACE
export function getAuth() {
  /** Retrieve auth data from localStorage. */
  try {
    const raw = localStorage.getItem(LS_AUTH_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

// PUBLIC_INTERFACE
export function clearAuth() {
  /** Clear auth state from storage. */
  try { localStorage.removeItem(LS_AUTH_KEY); } catch {}
}

// PUBLIC_INTERFACE
export function getToken() {
  /** Convenience accessor for JWT token from stored auth. */
  const a = getAuth();
  return a?.token || null;
}

// PUBLIC_INTERFACE
export function saveCart(cart) {
  /** Persist cart items and metadata to storage. */
  try { localStorage.setItem(LS_CART_KEY, JSON.stringify(cart)); } catch {}
}

// PUBLIC_INTERFACE
export function getCart() {
  /** Retrieve cart from storage, returns default empty state on failure. */
  try {
    const raw = localStorage.getItem(LS_CART_KEY);
    return raw ? JSON.parse(raw) : { items: [] };
  } catch {
    return { items: [] };
  }
}
