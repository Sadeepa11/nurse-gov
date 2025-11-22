'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const STORAGE_KEY = 'adminSession';
const ADMIN_HOME_ROUTE = '/admin/news';

const formWrapperStyle = {
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(135deg, #0d6efd 0%, #1db8a6 100%)',
  padding: '20px',
};

const cardStyle = {
  background: 'white',
  width: '100%',
  maxWidth: '420px',
  borderRadius: '12px',
  boxShadow: '0 20px 45px rgba(0, 0, 0, 0.18)',
  padding: '32px 36px',
};

const inputStyle = {
  width: '100%',
  padding: '12px 14px',
  marginTop: '6px',
  marginBottom: '16px',
  borderRadius: '6px',
  border: '1px solid #ced4da',
  fontSize: '1rem',
};

const buttonStyle = {
  width: '100%',
  padding: '12px 14px',
  borderRadius: '6px',
  border: 'none',
  background: '#0d6efd',
  color: '#fff',
  fontWeight: '600',
  cursor: 'pointer',
  fontSize: '1rem',
};

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    document.body.classList.remove('admin-shell');
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const rawSession = window.localStorage.getItem(STORAGE_KEY);
    if (!rawSession) {
      return;
    }
    try {
      const parsed = JSON.parse(rawSession);
      if (parsed?.role === 'admin') {
        router.replace(ADMIN_HOME_ROUTE);
      }
    } catch (error) {
      console.error('Failed to parse stored session:', error);
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, [router]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (submitting) return;

    setError('');

    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      setError('Please enter both email and password.');
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmedEmail, password: trimmedPassword }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({ message: 'Invalid credentials.' }));
        setError(data?.message || 'Invalid credentials.');
        setSubmitting(false);
        return;
      }

      const session = await response.json();
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
      }
      router.replace(ADMIN_HOME_ROUTE);
    } catch (err) {
      console.error('Admin login failed:', err);
      setError('Unable to sign in right now. Please try again shortly.');
      setSubmitting(false);
    }
  };

  return (
    <div style={formWrapperStyle}>
      <div style={cardStyle}>
        <h2 style={{ marginBottom: '24px', textAlign: 'center', color: '#0d6efd' }}>Admin Sign In</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="admin-email" style={{ color: '#495057', fontWeight: 600 }}>
            Email
          </label>
          <input
            id="admin-email"
            type="email"
            placeholder="info@acnu.lk"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="username"
            style={inputStyle}
            disabled={submitting}
            required
          />

          <label htmlFor="admin-password" style={{ color: '#495057', fontWeight: 600 }}>
            Password
          </label>
          <input
            id="admin-password"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            style={inputStyle}
            disabled={submitting}
            required
          />

          {error && (
            <div style={{ marginBottom: '16px', color: '#dc3545', fontSize: '0.95rem' }}>
              {error}
            </div>
          )}

          <button type="submit" style={{ ...buttonStyle, opacity: submitting ? 0.7 : 1 }} disabled={submitting}>
            {submitting ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
        <p style={{ marginTop: '20px', fontSize: '0.9rem', color: '#6c757d', textAlign: 'center' }}>
          Protected administrative access. Contact the site administrator if you need help.
        </p>
      </div>
    </div>
  );
}
