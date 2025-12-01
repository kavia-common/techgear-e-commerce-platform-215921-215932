import React, { useState } from 'react';
import useAuth from '../hooks/useAuth';

export default function AuthModal({ open, onClose }) {
  const { login, register } = useAuth();
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ email: '', password: '', name: '' });
  const [msg, setMsg] = useState(null);
  if (!open) return null;

  const submit = async (e) => {
    e.preventDefault();
    setMsg(null);
    const action = mode === 'login' ? login : register;
    const res = await action(form.email, form.password, form.name ? { ...form, password: form.password } : form.password);
    if (res.success) onClose();
    else setMsg(res.error || 'Failed. Please try again.');
  };

  return (
    <div role="dialog" aria-modal="true" style={{
      position:'fixed', inset:0, background:'rgba(0,0,0,.4)', display:'grid', placeItems:'center', zIndex:70
    }}>
      <div className="card" style={{ width:'100%', maxWidth:420, padding:16 }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <strong>{mode === 'login' ? 'Login' : 'Register'}</strong>
          <button className="btn secondary" onClick={onClose}>Close</button>
        </div>
        {msg ? <div className="badge" style={{ background:'var(--ocean-error)' }}>{msg}</div> : null}
        <form onSubmit={submit} style={{ display:'grid', gap:10, marginTop:10 }}>
          {mode === 'register' && (
            <div>
              <label>Name</label>
              <input className="input" value={form.name} onChange={(e)=>setForm(f=>({...f,name:e.target.value}))} required />
            </div>
          )}
          <div>
            <label>Email</label>
            <input className="input" type="email" value={form.email} onChange={(e)=>setForm(f=>({...f,email:e.target.value}))} required />
          </div>
          <div>
            <label>Password</label>
            <input className="input" type="password" value={form.password} onChange={(e)=>setForm(f=>({...f,password:e.target.value}))} required />
          </div>
          <button className="btn" type="submit">{mode === 'login' ? 'Login' : 'Create account'}</button>
        </form>
        <div style={{ marginTop:8, fontSize:14 }}>
          {mode === 'login' ? (
            <>No account? <button className="btn secondary" onClick={()=>setMode('register')}>Register</button></>
          ) : (
            <>Have an account? <button className="btn secondary" onClick={()=>setMode('login')}>Login</button></>
          )}
        </div>
      </div>
    </div>
  );
}
