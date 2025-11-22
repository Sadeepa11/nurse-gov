// components/NewsForm.js
import React, { useEffect, useState } from 'react';

const emptyFields = { title: '', description: '', type: 'news' };

const NewsForm = ({ onSubmit, initialData = {}, onCancel, isSubmitting = false }) => {
  const isEditMode = Boolean(initialData.id);

  const [fields, setFields] = useState(() => ({
    title: initialData.title || '',
    description: initialData.description || '',
    type: initialData.type || 'news',
  }));
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(initialData.imageUrl || '');
  const [imageUrlInput, setImageUrlInput] = useState(initialData.imageUrl || '');
  const [removeImage, setRemoveImage] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setFields({
      title: initialData.title || '',
      description: initialData.description || '',
      type: initialData.type || 'news',
    });
    setImageFile(null);
    setImagePreview(initialData.imageUrl || '');
    setImageUrlInput(initialData.imageUrl || '');
    setRemoveImage(false);
  }, [initialData]);

  useEffect(() => () => {
    if (imagePreview && imagePreview.startsWith('blob:')) {
      URL.revokeObjectURL(imagePreview);
    }
  }, [imagePreview]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFields((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files && event.target.files[0];
    if (!file) return;
    if (imagePreview && imagePreview.startsWith('blob:')) {
      URL.revokeObjectURL(imagePreview);
    }
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    setImageUrlInput('');
    setRemoveImage(false);
  };

  const handleRemoveImage = () => {
    if (imagePreview && imagePreview.startsWith('blob:')) {
      URL.revokeObjectURL(imagePreview);
    }
    setImageFile(null);
    setImagePreview('');
    setImageUrlInput('');
    setRemoveImage(true);
  };

  const handleImageUrlChange = (event) => {
    const value = event.target.value;
    if (imagePreview && imagePreview.startsWith('blob:')) {
      URL.revokeObjectURL(imagePreview);
    }
    setImageFile(null);
    setImagePreview(value);
    setImageUrlInput(value);
    setRemoveImage(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    let success = false;
    try {
      const payload = new FormData();
      payload.append('title', fields.title);
      payload.append('description', fields.description);
      payload.append('type', fields.type);

      if (isEditMode && initialData.id) {
        payload.append('id', initialData.id);
      }

      if (imageFile) {
        payload.append('image', imageFile);
      }

      if (imageUrlInput && !imageFile) {
        payload.append('imageUrl', imageUrlInput);
      }

      if (removeImage) {
        payload.append('removeImage', 'true');
      }

      success = await onSubmit(payload);
      if (success && !isEditMode) {
        setFields({ ...emptyFields });
        setImageFile(null);
        if (imagePreview && imagePreview.startsWith('blob:')) {
          URL.revokeObjectURL(imagePreview);
        }
        setImagePreview('');
        setImageUrlInput('');
        setRemoveImage(false);
      }
    } catch (error) {
      console.error('News form submission failed:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const isSaving = submitting || isSubmitting;
  const hasCurrentPreview = Boolean(imagePreview || imageFile);
  const hasExistingServerImage = Boolean(isEditMode && initialData.imageUrl && !removeImage);
  const showRemoveButton = hasCurrentPreview || hasExistingServerImage;

  return (
    <form onSubmit={handleSubmit} style={{ background: 'white', padding: '20px', borderRadius: '5px', marginBottom: '20px' }}>
      <h3>{isEditMode ? 'Edit' : 'Create'} News/Event</h3>

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
          required
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          rows="4"
        />
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label>Type:</label>
        <select
          name="type"
          value={fields.type}
          onChange={handleChange}
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
        >
          <option value="news">News</option>
          <option value="event">Event</option>
        </select>
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label>Featured Image:</label>
        {imagePreview ? (
          <div style={{ marginBottom: '10px' }}>
            <img
              src={imagePreview}
              alt="Selected preview"
              style={{ maxWidth: '100%', maxHeight: '200px', display: 'block', borderRadius: '6px' }}
            />
          </div>
        ) : (
          <p style={{ fontSize: '0.9em', color: '#6c757d' }}>No image selected.</p>
        )}
        <input type="file" accept="image/*" onChange={handleFileChange} disabled={isSaving} />
        <input
          type="text"
          value={imageUrlInput}
          onChange={handleImageUrlChange}
          placeholder="Optional direct image URL"
          style={{ marginTop: '10px', width: '100%', padding: '8px', boxSizing: 'border-box' }}
          disabled={isSaving}
        />
        {showRemoveButton && (
          <button
            type="button"
            onClick={handleRemoveImage}
            style={{ marginTop: '10px', padding: '6px 12px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '4px' }}
            disabled={isSaving}
          >
            Remove Image
          </button>
        )}
      </div>

      <div style={{ display: 'flex', gap: '10px' }}>
        <button
          type="submit"
          style={{ padding: '10px 20px', background: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
          disabled={isSaving}
        >
          {isEditMode ? 'Save Changes' : 'Create Item'}
        </button>
        {isEditMode && (
          <button
            type="button"
            onClick={onCancel}
            style={{ padding: '10px 20px', background: '#6c757d', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
            disabled={isSaving}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default NewsForm;