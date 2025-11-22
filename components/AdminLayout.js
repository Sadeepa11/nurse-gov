// components/AdminLayout.js
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const NAV_ITEMS = [
  { href: '/admin/news', label: '📰 News & Events' },
  { href: '/admin/gallery', label: '🖼️ Gallery' },
  { href: '/admin/applications', label: '📥 Applications' },
];

const STORAGE_KEY = 'adminSession';
const ADMIN_LOGIN_ROUTE = '/admin/login';

const AdminLayout = ({ children, title }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [checked, setChecked] = useState(false);
  const [authorized, setAuthorized] = useState(false);
  const [session, setSession] = useState(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const rawSession = window.localStorage.getItem(STORAGE_KEY);
      if (!rawSession) {
        setAuthorized(false);
        setSession(null);
        router.replace(ADMIN_LOGIN_ROUTE);
        return;
      }

      const parsed = JSON.parse(rawSession);
      if (!parsed || parsed.role !== 'admin') {
        window.localStorage.removeItem(STORAGE_KEY);
        setAuthorized(false);
        setSession(null);
        router.replace(ADMIN_LOGIN_ROUTE);
        return;
      }

      setSession(parsed);
      setAuthorized(true);
    } catch (error) {
      console.error('Failed to validate admin session:', error);
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(STORAGE_KEY);
      }
      setAuthorized(false);
      setSession(null);
      router.replace(ADMIN_LOGIN_ROUTE);
    } finally {
      setChecked(true);
    }
  }, [router, pathname]);

  useEffect(() => {
    if (!authorized) return;
    document.body.classList.add('admin-shell');
    return () => {
      document.body.classList.remove('admin-shell');
    };
  }, [authorized]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleStorage = (event) => {
      if (event.key === STORAGE_KEY && event.newValue === null) {
        router.replace(ADMIN_LOGIN_ROUTE);
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => {
      window.removeEventListener('storage', handleStorage);
    };
  }, [router]);

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(STORAGE_KEY);
    }
    setAuthorized(false);
    setSession(null);
    router.replace(ADMIN_LOGIN_ROUTE);
  };

  if (!checked) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f4f7f9', color: '#343a40' }}>
        <p style={{ fontSize: '1.1rem' }}>Validating admin access…</p>
      </div>
    );
  }

  if (!authorized) {
    return null;
  }

  const isActive = (href) => pathname && pathname.startsWith(href);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f4f7f9' }}>
      {/* Sidebar */}
      <aside style={{ width: '250px', background: '#343a40', color: 'white', padding: '20px' }}>
        <h2 style={{ color: '#17a2b8' }}>Admin Panel</h2>
        {session?.email && (
          <p style={{ fontSize: '0.9rem', color: '#ced4da', marginTop: '8px', wordBreak: 'break-word' }}>
            Signed in as
            <br />
            <strong style={{ color: '#fff' }}>{session.email}</strong>
          </p>
        )}
        <nav style={{ marginTop: '30px' }}>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {NAV_ITEMS.map((item) => (
              <li key={item.href} style={{ marginBottom: '10px' }}>
                <Link
                  href={item.href}
                  style={{
                    color: 'white',
                    textDecoration: 'none',
                    display: 'block',
                    padding: '8px 12px',
                    borderRadius: '4px',
                    background: isActive(item.href) ? '#495057' : 'transparent',
                  }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <button
          type="button"
          onClick={handleLogout}
          style={{
            marginTop: '20px',
            background: '#dc3545',
            color: 'white',
            border: 'none',
            width: '100%',
            padding: '10px 16px',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Log Out
        </button>
      </aside>

      {/* Content Area */}
      <main style={{ flexGrow: 1, padding: '40px' }}>
        <h1 style={{ borderBottom: '2px solid #ccc', paddingBottom: '10px' }}>{title}</h1>
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;