'use client'

// pages/admin/galleries.js
import React, { useState, useEffect } from 'react';
import AdminLayout from '../../../components/AdminLayout';

const GalleryAdminPage = () => {
  const [galleries, setGalleries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [albumTitle, setAlbumTitle] = useState('');
  const [albumDescription, setAlbumDescription] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const MAX_PHOTOS = 15;

  const fetchGalleries = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/gallery', { cache: 'no-store' });
      if (!res.ok) throw new Error('Failed to fetch galleries');
      const data = await res.json();
      const normalized = Array.isArray(data)
        ? [...data].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        : [];
      setGalleries(normalized);
    } catch (error) {
      console.error(error);
      alert('Unable to load gallery data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGalleries();
  }, []);

  const handleFileChange = (e) => {
    // Limit selection to MAX_PHOTOS for a new album
    const files = Array.from(e.target.files).slice(0, MAX_PHOTOS);
    setSelectedFiles(files);
  };

  const handleCreateAlbum = async (e) => {
    e.preventDefault();
    if (!albumTitle) return alert('Album Title is required.');
    if (saving) return;

    const formData = new FormData();
    formData.append('albumTitle', albumTitle);
    formData.append('description', albumDescription);

    selectedFiles.forEach(file => {
        formData.append('photos', file); // Use the key 'photos' as expected by the API
    });

    try {
        setSaving(true);
        setUploading(true);
        const res = await fetch('/api/gallery', {
          method: 'POST',
          body: formData, // No Content-Type header needed for FormData
        });

        if (res.ok) {
          alert('Album created successfully!');
          await fetchGalleries();
          setAlbumTitle('');
          setAlbumDescription('');
          setSelectedFiles([]);
        } else {
          const errorData = await res.json().catch(() => ({}));
          alert(`Failed to create album: ${errorData.message || 'Unknown error'}`);
        }
    } catch (error) {
        console.error(error);
        alert('An unknown error occurred during upload.');
    } finally {
      setSaving(false);
      setUploading(false);
    }
  };

  const handleDeleteAlbum = async (albumId) => {
    if (!window.confirm('Delete this album and all of its photos?')) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/gallery?albumId=${albumId}`, { method: 'DELETE' });
      if (res.status !== 204) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData?.message || 'Failed to delete');
      }
      await fetchGalleries();
      alert('Album deleted.');
    } catch (error) {
      console.error(error);
      alert('Unable to delete album.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <AdminLayout title="Gallery">Loading...</AdminLayout>;

  return (
    <>
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .upload-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.45);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }
        .upload-dialog {
          background: #ffffff;
          padding: 24px 32px;
          border-radius: 12px;
          box-shadow: 0 20px 45px rgba(15, 23, 42, 0.25);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          max-width: 320px;
          width: 100%;
          text-align: center;
        }
        .upload-spinner {
          width: 48px;
          height: 48px;
          border: 4px solid rgba(220, 38, 38, 0.15);
          border-top-color: #dc2626;
          border-radius: 50%;
          animation: spin 0.9s linear infinite;
        }
        .upload-dialog p {
          margin: 0;
          font-weight: 600;
          color: #1f2937;
        }
        .upload-dialog span {
          font-size: 0.9rem;
          color: #6b7280;
        }
      `}</style>

      {uploading && (
        <div className="upload-overlay" role="status" aria-live="polite">
          <div className="upload-dialog">
            <div className="upload-spinner" />
            <p>Uploading album photos…</p>
            <span>Please keep this tab open until the upload completes.</span>
          </div>
        </div>
      )}

      <AdminLayout title="Gallery Management (Max 15 Photos/Album)">
      {/* Create Album Form */}
      <form onSubmit={handleCreateAlbum} style={{ background: 'white', padding: '20px', borderRadius: '5px', marginBottom: '40px' }}>
        <h3>Create New Album</h3>
        <div style={{ marginBottom: '15px' }}>
            <label>Album Title:</label>
            <input type="text" value={albumTitle} onChange={(e) => setAlbumTitle(e.target.value)} required style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
        </div>
        <div style={{ marginBottom: '15px' }}>
            <label>Description:</label>
            <textarea value={albumDescription} onChange={(e) => setAlbumDescription(e.target.value)} style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} rows="2" />
        </div>
        <div style={{ marginBottom: '15px' }}>
            <label>Select Photos (Max 15):</label>
            <input type="file" multiple onChange={handleFileChange} accept="image/*" />
            <p style={{ fontSize: '0.9em', color: '#6c757d' }}>{selectedFiles.length} files selected.</p>
        </div>
        <button type="submit" style={{ padding: '10px 20px', background: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px' }} disabled={saving}>
          {uploading ? 'Uploading…' : 'Create Album'}
        </button>
      </form>

      {/* Existing Albums List */}
      <h2>Existing Albums ({galleries.length})</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white' }}>
        <thead>
          <tr style={{ background: '#f8f9fa' }}>
            <th style={{ padding: '10px', border: '1px solid #dee2e6' }}>Title</th>
            <th style={{ padding: '10px', border: '1px solid #dee2e6' }}>Photos</th>
            <th style={{ padding: '10px', border: '1px solid #dee2e6' }}>Created</th>
            <th style={{ padding: '10px', border: '1px solid #dee2e6' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {galleries.map((album) => (
            <tr key={album.id}>
              <td style={{ padding: '10px', border: '1px solid #dee2e6' }}>{album.albumTitle}</td>
              <td style={{ padding: '10px', border: '1px solid #dee2e6' }}>
                {album.images.length} / {MAX_PHOTOS}
              </td>
              <td style={{ padding: '10px', border: '1px solid #dee2e6' }}>{new Date(album.createdAt).toLocaleDateString()}</td>
              <td style={{ padding: '10px', border: '1px solid #dee2e6' }}>
                <button onClick={() => alert(`View/Add Photos feature coming soon.`)} style={{ marginRight: '10px' }} disabled={saving}>
                  View/Add Photos
                </button>
                <button onClick={() => handleDeleteAlbum(album.id)} style={{ color: 'red' }} disabled={saving}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {galleries.length === 0 && (
            <tr>
              <td colSpan={4} style={{ padding: '20px', textAlign: 'center', border: '1px solid #dee2e6' }}>
                No albums yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </AdminLayout>
    </>
  );
};

export default GalleryAdminPage;