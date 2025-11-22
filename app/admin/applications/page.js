'use client'

import React, { useEffect, useMemo, useState } from 'react';
import AdminLayout from '../../../components/AdminLayout';

const emptyFields = {
  title: '',
  description: '',
  status: 'active',
};

const statusLabel = {
  active: 'Active',
  archived: 'Archived',
};

const ApplicationsAdminPage = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [fields, setFields] = useState(() => ({ ...emptyFields }));
  const [fileInput, setFileInput] = useState(null);
  const [fileUrlInput, setFileUrlInput] = useState('');
  const [removeFile, setRemoveFile] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const sortedApplications = useMemo(() => (
    [...applications].sort((a, b) => {
      const bDate = b.updatedAt || b.createdAt || 0;
      const aDate = a.updatedAt || a.createdAt || 0;
      return new Date(bDate) - new Date(aDate);
    })
  ), [applications]);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/applications', { cache: 'no-store' });
      if (!res.ok) throw new Error('Failed to fetch applications');
      const data = await res.json();
      setApplications(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
      alert('Unable to load applications. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const resetForm = () => {
    setFields({ ...emptyFields });
    setFileInput(null);
    setFileUrlInput('');
    setRemoveFile(false);
    setEditingId(null);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFields((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileSelect = (event) => {
    const file = event.target.files && event.target.files[0];
    if (!file) return;
    setFileInput(file);
    setFileUrlInput('');
    setRemoveFile(false);
  };

  const handleFileUrlChange = (event) => {
    setFileUrlInput(event.target.value);
    setFileInput(null);
    setRemoveFile(false);
  };

  const handleRemoveFile = () => {
    setFileInput(null);
    setFileUrlInput('');
    setRemoveFile(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (saving) return;

    if (!fields.title.trim()) {
      alert('Title is required.');
      return;
    }

    if (!fileInput && !fileUrlInput && !editingId) {
      alert('Please upload a file or provide a file URL.');
      return;
    }

    if (!fileInput && !fileUrlInput && removeFile) {
      alert('An application must have an associated file.');
      return;
    }

    const payload = new FormData();
    payload.append('title', fields.title);
    payload.append('description', fields.description || '');
    payload.append('status', fields.status || 'active');

    if (editingId) {
      payload.append('id', editingId);
    }

    if (fileInput) {
      payload.append('file', fileInput);
    }

    if (fileUrlInput) {
      payload.append('fileUrl', fileUrlInput);
    }

    if (removeFile) {
      payload.append('removeFile', 'true');
    }

    setSaving(true);
    try {
      const method = editingId ? 'PUT' : 'POST';
      const res = await fetch('/api/applications', {
        method,
        body: payload,
      });
      if (!res.ok) throw new Error('Failed request');
      alert(`Application ${editingId ? 'updated' : 'created'} successfully!`);
      resetForm();
      await fetchApplications();
    } catch (error) {
      console.error(error);
      alert('Unable to save application.');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setFields({
      title: item.title || '',
      description: item.description || '',
      status: item.status || 'active',
    });
    setFileInput(null);
    setFileUrlInput(item.fileUrl || '');
    setRemoveFile(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this application?')) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/applications?id=${id}`, { method: 'DELETE' });
      if (res.status !== 204) throw new Error('Failed delete');
      if (editingId === id) {
        resetForm();
      }
      await fetchApplications();
      alert('Application deleted.');
    } catch (error) {
      console.error(error);
      alert('Unable to delete application.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout title="Applications Management">
      <form
        onSubmit={handleSubmit}
        style={{ background: 'white', padding: '20px', borderRadius: '5px', marginBottom: '20px' }}
      >
        <h3>{editingId ? 'Edit Application' : 'Add Application'}</h3>
        <div style={{ marginBottom: '15px' }}>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={fields.title}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Description:</label>
          <textarea
            name="description"
            value={fields.description}
            onChange={handleChange}
            rows="3"
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Application File:</label>
          {fileUrlInput && (
            <div style={{ marginBottom: '10px', fontSize: '0.9em' }}>
              Current file: <a href={fileUrlInput} target="_blank" rel="noopener noreferrer">{fileUrlInput}</a>
            </div>
          )}
          <input
            type="file"
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            onChange={handleFileSelect}
            disabled={saving}
            style={{ display: 'block', marginBottom: '10px' }}
          />
          {fileInput && (
            <div style={{ marginBottom: '10px', fontSize: '0.9em', color: '#6c757d' }}>
              Selected file: {fileInput.name}
            </div>
          )}
          <input
            type="text"
            value={fileUrlInput}
            onChange={handleFileUrlChange}
            placeholder="Optional: enter a direct file URL"
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            disabled={saving}
          />
          {(fileInput || fileUrlInput || (editingId && !removeFile)) && (
            <button
              type="button"
              onClick={handleRemoveFile}
              style={{ marginTop: '10px', padding: '6px 12px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '4px' }}
              disabled={saving}
            >
              Remove File
            </button>
          )}
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Status:</label>
          <select
            name="status"
            value={fields.status}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          >
            <option value="active">Active</option>
            <option value="archived">Archived</option>
          </select>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            type="submit"
            style={{ padding: '10px 20px', background: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
            disabled={saving}
          >
            {editingId ? 'Save Changes' : 'Create Application'}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              style={{ padding: '10px 20px', background: '#6c757d', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
              disabled={saving}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h2>Available Applications ({sortedApplications.length})</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white' }}>
            <thead>
              <tr style={{ background: '#f8f9fa' }}>
                <th style={{ padding: '10px', border: '1px solid #dee2e6' }}>Title</th>
                <th style={{ padding: '10px', border: '1px solid #dee2e6' }}>Status</th>
                <th style={{ padding: '10px', border: '1px solid #dee2e6' }}>Updated</th>
                <th style={{ padding: '10px', border: '1px solid #dee2e6' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedApplications.map((item) => (
                <tr key={item.id}>
                  <td style={{ padding: '10px', border: '1px solid #dee2e6' }}>
                    <strong>{item.title}</strong>
                    {item.description && (
                      <div style={{ fontSize: '0.9em', color: '#6c757d', marginTop: '4px' }}>{item.description}</div>
                    )}
                  </td>
                  <td style={{ padding: '10px', border: '1px solid #dee2e6' }}>
                    {statusLabel[item.status] || 'Unknown'}
                  </td>
                  <td style={{ padding: '10px', border: '1px solid #dee2e6' }}>
                    {item.updatedAt ? new Date(item.updatedAt).toLocaleString() : '—'}
                  </td>
                  <td style={{ padding: '10px', border: '1px solid #dee2e6' }}>
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                      <a
                        href={item.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: '#007bff' }}
                      >
                        View
                      </a>
                      <a href={item.fileUrl} download style={{ color: '#28a745' }}>
                        Download
                      </a>
                      <button onClick={() => handleEdit(item)} disabled={saving}>
                        Edit
                      </button>
                      <button onClick={() => handleDelete(item.id)} style={{ color: 'red' }} disabled={saving}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {sortedApplications.length === 0 && (
                <tr>
                  <td colSpan={4} style={{ padding: '20px', textAlign: 'center', border: '1px solid #dee2e6' }}>
                    No applications found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </>
      )}
    </AdminLayout>
  );
};

export default ApplicationsAdminPage;
