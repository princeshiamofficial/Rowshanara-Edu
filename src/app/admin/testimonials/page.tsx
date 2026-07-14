"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Plus, Trash2, Edit2, X, GripVertical, MessageSquare, Star, Image as ImageIcon } from 'lucide-react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { toast } from 'sonner';

interface Testimonial {
  id: number;
  section: string;
  itemKey: string;
  title: string;       // person name
  subtitle: string;    // university
  body: string;        // quote text
  imageUrl: string;    // photo
  sortOrder: number;
  isActive: boolean;
}

export default function AdminTestimonialsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('Testimonials');
  const [items, setItems] = useState<Testimonial[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragActive, setIsDragActive] = useState(false);

  const [form, setForm] = useState({
    name: '',
    university: '',
    quote: '',
    image: '',
  });

  // Fetch all success_stories testimonials
  const fetchItems = () => {
    fetch('/api/content?section=success_stories&includeInactive=true')
      .then(r => r.json())
      .then(res => {
        if (res.status === 'success') {
          const sorted = (res.data || []).sort((a: Testimonial, b: Testimonial) =>
            Number(a.sortOrder || 0) - Number(b.sortOrder || 0)
          );
          setItems(sorted);
        }
      })
      .catch(err => console.error(err));
  };

  useEffect(() => { fetchItems(); }, []);

  const resetForm = () => {
    setEditingId(null);
    setForm({ name: '', university: '', quote: '', image: '' });
  };

  // Image upload
  const uploadFile = async (file: File) => {
    setIsUploading(true);
    const fd = new FormData();
    fd.append('file', file);
    try {
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      const result = await res.json();
      if (result.status === 'success') {
        setForm(prev => ({ ...prev, image: result.data.url }));
        toast.success('Photo uploaded!');
      } else {
        toast.error(result.message || 'Upload failed');
      }
    } catch {
      toast.error('Upload error');
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) await uploadFile(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(e.type === 'dragenter' || e.type === 'dragover');
  };

  const handleDropImage = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file?.type.startsWith('image/')) await uploadFile(file);
    else toast.error('Please drop an image file.');
  };

  // Paste handler
  const handlePaste = useCallback(async (e: ClipboardEvent) => {
    if (!isModalOpen) return;
    const items = e.clipboardData?.items;
    if (!items) return;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        const file = items[i].getAsFile();
        if (file) { await uploadFile(file); break; }
      }
    }
  }, [isModalOpen]);

  useEffect(() => {
    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [handlePaste]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.quote.trim()) {
      toast.error('Name and quote are required');
      return;
    }

    const nextOrder = editingId
      ? (items.find(i => i.id === editingId)?.sortOrder ?? items.length)
      : Math.max(...items.map(i => i.sortOrder), -1) + 1;

    const itemKey = editingId
      ? (items.find(i => i.id === editingId)?.itemKey ?? `testimonial_${Date.now()}`)
      : `testimonial_${form.name.toLowerCase().replace(/[^a-z0-9]+/g, '_')}_${Date.now()}`;

    const payload = {
      id: editingId || undefined,
      section: 'success_stories',
      itemKey,
      title: form.name,
      subtitle: form.university,
      body: `"${form.quote.replace(/^"|"$/g, '')}"`,
      imageUrl: form.image || '',
      sortOrder: nextOrder,
      isActive: true,
    };

    try {
      const method = editingId ? 'PUT' : 'POST';
      const res = await fetch('/api/content', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.status === 'success') {
        toast.success(editingId ? 'Testimonial updated!' : 'Testimonial added!');
        setIsModalOpen(false);
        resetForm();
        fetchItems();
      } else {
        toast.error(data.message || 'Failed to save');
      }
    } catch {
      toast.error('An error occurred');
    }
  };

  const handleEdit = (item: Testimonial) => {
    setEditingId(item.id);
    setForm({
      name: item.title,
      university: item.subtitle || '',
      quote: item.body?.replace(/^"|"$/g, '') || '',
      image: item.imageUrl || '',
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this testimonial?')) return;
    const res = await fetch(`/api/content?id=${id}`, { method: 'DELETE' });
    const data = await res.json();
    if (data.status === 'success') { toast.success('Deleted!'); fetchItems(); }
    else toast.error(data.message || 'Failed to delete');
  };

  // Row drag-drop reorder
  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };
  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); };

  const handleDropRow = async (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === targetIndex) return;
    const updated = [...items];
    const [dragged] = updated.splice(draggedIndex, 1);
    updated.splice(targetIndex, 0, dragged);
    setItems(updated);
    setDraggedIndex(null);

    const loadingId = toast.loading('Saving order...');
    try {
      await Promise.all(updated.map((item, idx) =>
        fetch('/api/content', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...item, sortOrder: idx })
        })
      ));
      toast.dismiss(loadingId);
      toast.success('Order updated!');
    } catch {
      toast.dismiss(loadingId);
      toast.error('Failed to save order');
      fetchItems();
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '0.6rem 0.8rem', border: '1px solid #cbd5e1',
    borderRadius: '8px', outline: 'none', fontSize: '0.875rem',
    fontFamily: 'var(--font-sans), sans-serif', boxSizing: 'border-box', color: '#0f172a'
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', width: '100vw', backgroundColor: '#f8fafc', fontFamily: 'var(--font-sans), system-ui, sans-serif', color: '#0f172a' }}>
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={() => router.push('/admin')} />

      <main style={{ flexGrow: 1, padding: '2.5rem 3rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {/* Header */}
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>Testimonials</h1>
            <p style={{ fontSize: '0.875rem', color: '#64748b', margin: '0.2rem 0 0 0' }}>Manage student success stories shown on the homepage</p>
          </div>
          <button
            onClick={() => { resetForm(); setIsModalOpen(true); }}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#E09100', color: '#fff', padding: '0.6rem 1.2rem', borderRadius: '10px', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer', border: 'none', boxShadow: '0 2px 8px rgba(224,145,0,0.25)' }}
          >
            <Plus size={16} /><span>Add Testimonial</span>
          </button>
        </header>

        {/* Table */}
        <div style={{ backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '1.5rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.01)' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #f1f5f9', color: '#64748b', fontWeight: 700 }}>
                  <th style={{ padding: '1rem 0.5rem', width: '36px' }}></th>
                  <th style={{ padding: '1rem 0.5rem', width: '60px' }}>Photo</th>
                  <th style={{ padding: '1rem 0.5rem' }}>Name</th>
                  <th style={{ padding: '1rem 0.5rem' }}>University</th>
                  <th style={{ padding: '1rem 0.5rem' }}>Quote Preview</th>
                  <th style={{ padding: '1rem 0.5rem', width: '80px' }}>Stars</th>
                  <th style={{ padding: '1rem 0.5rem', textAlign: 'center', width: '100px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.length === 0 ? (
                  <tr>
                    <td colSpan={7} style={{ textAlign: 'center', padding: '3rem 1rem', color: '#94a3b8' }}>
                      <MessageSquare size={40} style={{ margin: '0 auto 1rem auto', opacity: 0.4 }} />
                      <div>No testimonials yet. Click &quot;Add Testimonial&quot; to get started.</div>
                    </td>
                  </tr>
                ) : items.map((item, index) => (
                  <tr
                    key={item.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDropRow(e, index)}
                    style={{ borderBottom: '1px solid #f1f5f9', backgroundColor: draggedIndex === index ? '#f8fafc' : '#fff', transition: 'background-color 0.15s', cursor: 'grab' }}
                  >
                    <td style={{ padding: '0.75rem 0.5rem', color: '#cbd5e1', verticalAlign: 'middle' }}><GripVertical size={16} /></td>
                    <td style={{ padding: '0.75rem 0.5rem' }}>
                      {item.imageUrl ? (
                        <div style={{ position: 'relative', width: '44px', height: '44px', borderRadius: '50%', overflow: 'hidden', border: '2px solid #e2e8f0' }}>
                          <Image src={item.imageUrl} alt={item.title} fill style={{ objectFit: 'cover' }} unoptimized />
                        </div>
                      ) : (
                        <div style={{ width: '44px', height: '44px', borderRadius: '50%', backgroundColor: '#E09100', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>
                          {item.title?.charAt(0) || '?'}
                        </div>
                      )}
                    </td>
                    <td style={{ padding: '1rem 0.5rem', fontWeight: 600, color: '#0f172a' }}>{item.title}</td>
                    <td style={{ padding: '1rem 0.5rem', color: '#64748b', fontSize: '0.82rem' }}>{item.subtitle}</td>
                    <td style={{ padding: '1rem 0.5rem', color: '#475569', maxWidth: '280px' }}>
                      <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: '0.82rem', fontStyle: 'italic' }}>{item.body}</div>
                    </td>
                    <td style={{ padding: '1rem 0.5rem' }}>
                      <div style={{ display: 'flex', gap: '1px' }}>
                        {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="#E09100" color="#E09100" />)}
                      </div>
                    </td>
                    <td style={{ padding: '1rem 0.5rem', textAlign: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                        <button onClick={() => handleEdit(item)} style={{ background: 'transparent', border: 'none', color: '#3b82f6', cursor: 'pointer', padding: '0.25rem', borderRadius: '4px' }} onMouseEnter={e => e.currentTarget.style.backgroundColor = '#eff6ff'} onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}><Edit2 size={16} /></button>
                        <button onClick={() => handleDelete(item.id)} style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '0.25rem', borderRadius: '4px' }} onMouseEnter={e => e.currentTarget.style.backgroundColor = '#fef2f2'} onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Modal */}
      {isModalOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15,23,42,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200, padding: '1rem' }}>
          <div style={{ backgroundColor: '#fff', borderRadius: '16px', width: '100%', maxWidth: '520px', boxShadow: '0 20px 60px rgba(0,0,0,0.2)', maxHeight: '90vh', overflowY: 'auto' }}>
            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem 1.5rem', borderBottom: '1px solid #f1f5f9', position: 'sticky', top: 0, backgroundColor: '#fff', zIndex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MessageSquare size={18} color="#E09100" />
                <span style={{ fontWeight: 700, fontSize: '1rem', color: '#0f172a' }}>{editingId ? 'Edit Testimonial' : 'Add Testimonial'}</span>
              </div>
              <button onClick={() => { setIsModalOpen(false); resetForm(); }} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#94a3b8', padding: '0.25rem', borderRadius: '4px' }}><X size={18} /></button>
            </div>

            <form onSubmit={handleSubmit} style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {/* Name */}
              <div>
                <label style={{ display: 'block', fontSize: '0.775rem', fontWeight: 600, color: '#475569', marginBottom: '0.4rem' }}>Student Name *</label>
                <input required type="text" placeholder="e.g. Fatima Ahmed" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} style={inputStyle} />
              </div>

              {/* University */}
              <div>
                <label style={{ display: 'block', fontSize: '0.775rem', fontWeight: 600, color: '#475569', marginBottom: '0.4rem' }}>University / Institution</label>
                <input type="text" placeholder="e.g. University of Toronto" value={form.university} onChange={e => setForm(p => ({ ...p, university: e.target.value }))} style={inputStyle} />
              </div>

              {/* Quote */}
              <div>
                <label style={{ display: 'block', fontSize: '0.775rem', fontWeight: 600, color: '#475569', marginBottom: '0.4rem' }}>Testimonial Quote *</label>
                <textarea
                  required
                  placeholder="Global Study Pathways made my dream of studying abroad a reality..."
                  value={form.quote}
                  onChange={e => setForm(p => ({ ...p, quote: e.target.value }))}
                  rows={4}
                  style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }}
                />
              </div>

              {/* Photo Upload */}
              <div>
                <label style={{ display: 'block', fontSize: '0.775rem', fontWeight: 600, color: '#475569', marginBottom: '0.4rem' }}>Student Photo</label>
                <div
                  onDragEnter={handleDrag} onDragOver={handleDrag} onDragLeave={handleDrag} onDrop={handleDropImage}
                  onClick={() => document.getElementById('testimonial-photo-input')?.click()}
                  style={{ border: `2px dashed ${isDragActive ? '#E09100' : '#cbd5e1'}`, borderRadius: '10px', padding: '1.25rem', textAlign: 'center', cursor: 'pointer', backgroundColor: isDragActive ? '#fffbeb' : '#f8fafc', transition: 'all 0.2s' }}
                >
                  {isUploading ? (
                    <p style={{ color: '#64748b', fontSize: '0.85rem', margin: 0 }}>Uploading…</p>
                  ) : form.image ? (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
                      <div style={{ position: 'relative', width: '60px', height: '60px', borderRadius: '50%', overflow: 'hidden', border: '2px solid #e2e8f0' }}>
                        <Image src={form.image} alt="preview" fill style={{ objectFit: 'cover' }} unoptimized />
                      </div>
                      <span style={{ color: '#64748b', fontSize: '0.82rem' }}>Click to change photo</span>
                    </div>
                  ) : (
                    <>
                      <ImageIcon size={28} style={{ color: '#94a3b8', marginBottom: '0.5rem' }} />
                      <p style={{ color: '#64748b', fontSize: '0.85rem', margin: 0 }}>Drag & drop, paste, or click to upload student photo</p>
                    </>
                  )}
                </div>
                <input id="testimonial-photo-input" type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFileInput} />
                {form.image && (
                  <button type="button" onClick={() => setForm(p => ({ ...p, image: '' }))} style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>Remove photo</button>
                )}
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.25rem' }}>
                <button type="button" onClick={() => { setIsModalOpen(false); resetForm(); }} style={{ padding: '0.6rem 1.2rem', borderRadius: '8px', border: '1px solid #cbd5e1', backgroundColor: '#fff', color: '#475569', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
                <button type="submit" style={{ padding: '0.6rem 1.4rem', borderRadius: '8px', border: 'none', backgroundColor: '#E09100', color: '#fff', fontSize: '0.875rem', fontWeight: 700, cursor: 'pointer' }}>
                  {editingId ? 'Update' : 'Add Testimonial'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
