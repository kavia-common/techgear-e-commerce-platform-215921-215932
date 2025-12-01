import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

// PUBLIC_INTERFACE
export default function Login() {
  /** Login page with redirect handling. */
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [msg, setMsg] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const submit = async (e) => {
    e.preventDefault();
    setMsg(null);
    const res = await login(form.email, form.password);
    if (res.success) {
      const dest = location.state?.from?.pathname || '/';
      navigate(dest, { replace: true });
    } else setMsg(res.error || 'Login failed');
  };

  return (
    <div className="container" style={{ maxWidth: 480 }}>
      <div className="card" style={{ padding:16 }}>
        <h2>Login</h2>
        {msg ? <div className="badge" style={{ background:'var(--ocean-error)' }}>{msg}</div> : null}
        <form onSubmit={submit} style={{ display:'grid', gap:10 }}>
          <div><label>Email</label><input className="input" type="email" value={form.email} onChange={(e)=>setForm(f=>({...f,email:e.target.value}))} required /></div>
          <div><label>Password</label><input className="input" type="password" value={form.password} onChange={(e)=>setForm(f=>({...f,password:e.target.value}))} required /></div>
          <button className="btn" type="submit">Login</button>
        </form>
        <p className="muted">No account? <Link to="/register">Register</Link></p>
      </div>
    </div>
  );
}
