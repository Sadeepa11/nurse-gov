'use client'

// pages/admin/news.js
import React, { useState, useEffect } from 'react';
import AdminLayout from '../../../components/AdminLayout';
import NewsForm from '../../../components/NewsForm';

const NewsAdminPage = () => {
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState(null);
  const [loadingAction, setLoadingAction] = useState(false);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/news', { cache: 'no-store' });
      if (!res.ok) throw new Error('Failed to fetch news');
      const data = await res.json();
      const normalized = Array.isArray(data)
        ? [...data].sort((a, b) => {
            const bDate = b.updatedAt || b.createdAt || 0;
            const aDate = a.updatedAt || a.createdAt || 0;
            return new Date(bDate) - new Date(aDate);
          })
        : [];
      setNewsItems(normalized);
    } catch (error) {
      console.error(error);
      alert('Unable to load news items. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleCreate = async (formData) => {
    setLoadingAction(true);
    try {
      const res = await fetch('/api/news', {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) throw new Error('Request failed');
      alert('Item created!');
      await fetchNews();
      return true;
    } catch (error) {
      console.error(error);
      alert('Failed to create item.');
      return false;
    } finally {
      setLoadingAction(false);
    }
  };

  const handleUpdate = async (formData) => {
    if (!editingItem?.id) return false;
    setLoadingAction(true);
    try {
      const res = await fetch('/api/news', {
        method: 'PUT',
        body: formData,
      });
      if (!res.ok) throw new Error('Request failed');
      alert('Item updated!');
      setEditingItem(null);
      await fetchNews();
      return true;
    } catch (error) {
      console.error(error);
      alert('Failed to update item.');
      return false;
    } finally {
      setLoadingAction(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    setLoadingAction(true);
    try {
      const res = await fetch(`/api/news?id=${id}`, {
        method: 'DELETE',
      });
      if (res.status !== 204) throw new Error('Failed delete');
      alert('Item deleted!');
      if (editingItem?.id === id) {
        setEditingItem(null);
      }
      await fetchNews();
    } catch (error) {
      console.error(error);
      alert('Failed to delete item.');
    } finally {
      setLoadingAction(false);
    }
  };

  if (loading) return <AdminLayout title="News & Events">Loading...</AdminLayout>;

  return (
    <AdminLayout title="News & Events Management">
      <NewsForm
        key={editingItem?.id || 'create'}
        onSubmit={editingItem ? handleUpdate : handleCreate}
        initialData={editingItem || {}}
        onCancel={() => setEditingItem(null)}
        isSubmitting={loadingAction}
      />
      
      <h2>Existing Items ({newsItems.length})</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white' }}>
        <thead>
          <tr style={{ background: '#f8f9fa' }}>
            <th style={{ padding: '10px', border: '1px solid #dee2e6' }}>Title</th>
            <th style={{ padding: '10px', border: '1px solid #dee2e6' }}>Type</th>
            <th style={{ padding: '10px', border: '1px solid #dee2e6' }}>Created</th>
            <th style={{ padding: '10px', border: '1px solid #dee2e6' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {newsItems.map((item) => (
            <tr key={item.id}>
              <td style={{ padding: '10px', border: '1px solid #dee2e6' }}>{item.title}</td>
              <td style={{ padding: '10px', border: '1px solid #dee2e6' }}>{item.type}</td>
              <td style={{ padding: '10px', border: '1px solid #dee2e6' }}>{new Date(item.createdAt).toLocaleDateString()}</td>
              <td style={{ padding: '10px', border: '1px solid #dee2e6' }}>
                  <button
                    onClick={() => setEditingItem(item)}
                    style={{ marginRight: '10px' }}
                    disabled={loadingAction}
                  >
                    {editingItem?.id === item.id ? 'Editing…' : 'Edit'}
                  </button>
                  <button onClick={() => handleDelete(item.id)} style={{ color: 'red' }} disabled={loadingAction}>
                    Delete
                  </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdminLayout>
  );
};

export default NewsAdminPage;