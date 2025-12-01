import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import Home from './routes/Home';
import ProductList from './routes/ProductList';
import ProductDetail from './routes/ProductDetail';
import Cart from './routes/Cart';
import Checkout from './routes/Checkout';
import Login from './routes/Login';
import Register from './routes/Register';
import Orders from './routes/Orders';
import AdminDashboard from './routes/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';

// PUBLIC_INTERFACE
function App() {
  /** Root app shell with Header/Footer and route definitions. */
  return (
    <div className="app-shell">
      <Header />
      <main className="container page-container" role="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/orders" element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          } />
          <Route path="/admin" element={
            <ProtectedRoute adminOnly>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
