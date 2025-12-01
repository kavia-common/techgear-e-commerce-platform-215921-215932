import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

// PUBLIC_INTERFACE
export default function Register() {
  /** Registration page creating user then signing in. */
  const { register } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [msg, setMsg] = useState(null);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setMsg(null);
    const res = await register(form);
    if (res.success) navigate('/');
    else setMsg(res.error || 'Registration failed');
  };

  return (
    <div className="container" style={{ maxWidth: 480 }}>
      <div className="card" style={{ padding:16 }}>
        <h2>Create account</h2>
        {msg ? <div className="badge" style={{ background:'var(--ocean-error)' }}>{msg}</div> : null}
        <form onSubmit={submit} style={{ display:'grid', gap:10 }}>
          <div><label>Name</label><input className="input" value={form.name} onChange={(e)=>setForm(f=>({...f,name:e.target.value}))} required /></div>
          <div><label>Email</label><input className="input" type="email" value={form.email} onChange={(e)=>setForm(f=>({...f,email:e.target.value}))} required /></div>
          <div><label>Password</label><input className="input" type="password" value={form.password} onChange={(e)=>setForm(f=>({...f,password:e.target.value}))} required /></div>
          <button className="btn" type="submit">Register</button>
        </form>
        <p className="muted">Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  );
}
