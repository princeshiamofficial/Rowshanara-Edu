"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  Plus, Trash2, Edit2, X, GripVertical, Image as ImageIcon, Type
} from 'lucide-react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { toast } from 'sonner';

interface HeroSlide {
  id: number;
  title: string;
  image: string;
  buttonText: string;
  link: string;
  sortOrder: number;
}

export default function AdminHeroPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('Hero');
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragActive, setIsDragActive] = useState(false);

  const [form, setForm] = useState({
    title: '',
    image: '',
    buttonText: 'BOOK FREE CONSULTATION',
    link: '/contact'
  });

  const fetchSlides = () => {
    fetch('/api/hero')
      .then(r => r.json())
      .then(res => { if (res.status === 'success') setSlides(res.data); })
      .catch(err => console.error(err));
  };

  useEffect(() => { fetchSlides(); }, []);

  const uploadFile = async (file: File) => {
    setIsUploading(true);
    const fd = new FormData();
    fd.append('file', file);
    try {
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      const result = await res.json();
      if (result.status === 'success') {
        setForm(prev => ({ ...prev, image: result.data.url }));
        toast.success('Image uploaded!');
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

  const handleDrop = async (e: React.DragEvent) => {
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
    if (!form.title || !form.image) { toast.error('Title and image are required'); return; }
    try {
      const method = editingId ? 'PUT' : 'POST';
      const res = await fetch('/api/hero', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, id: editingId })
      });
      const data = await res.json();
      if (data.status === 'success') {
        toast.success(editingId ? 'Slide updated!' : 'Slide added!');
        setIsModalOpen(false);
        resetForm();
        fetchSlides();
      } else {
        toast.error(data.message || 'Failed to save');
      }
    } catch {
      toast.error('An error occurred');
    }
  };

  const handleEdit = (slide: HeroSlide) => {
    setEditingId(slide.id);
    setForm({ title: slide.title, image: slide.image, buttonText: slide.buttonText, link: slide.link });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this hero slide?')) return;
    const res = await fetch(`/api/hero?id=${id}`, { method: 'DELETE' });
    const data = await res.json();
    if (data.status === 'success') { toast.success('Slide deleted!'); fetchSlides(); }
    else toast.error(data.message || 'Failed to delete');
  };

  const resetForm = () => {
    setEditingId(null);
    setForm({ title: '', image: '', buttonText: 'BOOK FREE CONSULTATION', link: '/contact' });
  };

  // Row drag-drop
  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); };

  const handleDropRow = async (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === targetIndex) return;
    const updated = [...slides];
    const [dragged] = updated.splice(draggedIndex, 1);
    updated.splice(targetIndex, 0, dragged);
    setSlides(updated);
    setDraggedIndex(null);
    const loadingId = toast.loading('Saving order...');
    try {
      const order = updated.map((s, idx) => ({ id: s.id, sortOrder: idx }));
      const res = await fetch('/api/hero', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ order }) });
      const data = await res.json();
      toast.dismiss(loadingId);
      if (data.status === 'success') toast.success('Order updated!');
      else { toast.error('Failed to save order'); fetchSlides(); }
    } catch { toast.dismiss(loadingId); toast.error('Failed to save order'); fetchSlides(); }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '0.6rem 0.8rem', border: '1px solid #cbd5e1',
    borderRadius: '8px', outline: 'none', fontSize: '0.875rem',
    fontFamily: 'var(--font-sans), sans-serif', boxSizing: 'border-box'
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', width: '100vw', backgroundColor: '#f8fafc', fontFamily: 'var(--font-sans), system-ui, sans-serif', color: '#0f172a' }}>
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={() => router.push('/admin')} />

      <main style={{ flexGrow: 1, padding: '2.5rem 3rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {/* Header */}
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>Hero Slides</h1>
            <p style={{ fontSize: '0.875rem', color: '#64748b', margin: '0.2rem 0 0 0' }}>Manage homepage hero images and headlines</p>
          </div>
          <button
            onClick={() => { resetForm(); setIsModalOpen(true); }}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#E09100', color: '#ffffff', padding: '0.6rem 1.2rem', borderRadius: '10px', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer', border: 'none', boxShadow: '0 2px 8px rgba(224, 145, 0, 0.25)' }}
          >
            <Plus size={16} /><span>Add Slide</span>
          </button>
        </header>

        {/* Slides Table */}
        <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '1.5rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.01)' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #f1f5f9', color: '#64748b', fontWeight: 700 }}>
                  <th style={{ padding: '1rem 0.5rem', width: '36px' }}></th>
                  <th style={{ padding: '1rem 0.5rem', width: '70px' }}>Image</th>
                  <th style={{ padding: '1rem 0.5rem' }}>Hero Title</th>
                  <th style={{ padding: '1rem 0.5rem' }}>Button Text</th>
                  <th style={{ padding: '1rem 0.5rem', textAlign: 'center', width: '100px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {slides.length === 0 ? (
                  <tr>
                    <td colSpan={5} style={{ textAlign: 'center', padding: '3rem 1rem', color: '#94a3b8' }}>
                      <ImageIcon size={40} style={{ margin: '0 auto 1rem auto', opacity: 0.4 }} />
                      <div>No hero slides found.</div>
                    </td>
                  </tr>
                ) : slides.map((slide, index) => (
                  <tr
                    key={slide.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDropRow(e, index)}
                    style={{ borderBottom: '1px solid #f1f5f9', backgroundColor: draggedIndex === index ? '#f8fafc' : '#ffffff', transition: 'background-color 0.15s', cursor: 'grab' }}
                  >
                    <td style={{ padding: '0.75rem 0.5rem', color: '#cbd5e1', verticalAlign: 'middle' }}><GripVertical size={16} /></td>
                    <td style={{ padding: '0.75rem 0.5rem' }}>
                      <div style={{ position: 'relative', width: '80px', height: '50px', borderRadius: '6px', overflow: 'hidden', border: '1px solid #e2e8f0', backgroundColor: '#f1f5f9' }}>
                        <Image src={slide.image} alt={slide.title} fill style={{ objectFit: 'cover' }} unoptimized />
                      </div>
                    </td>
                    <td style={{ padding: '1rem 0.5rem', fontWeight: 600, color: '#0f172a' }}>{slide.title}</td>
                    <td style={{ padding: '1rem 0.5rem', color: '#64748b', fontSize: '0.8rem' }}>{slide.buttonText}</td>
                    <td style={{ padding: '1rem 0.5rem', textAlign: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                        <button onClick={() => handleEdit(slide)} style={{ background: 'transparent', border: 'none', color: '#3b82f6', cursor: 'pointer', padding: '0.25rem', borderRadius: '4px' }} onMouseEnter={e => e.currentTarget.style.backgroundColor = '#eff6ff'} onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}><Edit2 size={16} /></button>
                        <button onClick={() => handleDelete(slide.id)} style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '0.25rem', borderRadius: '4px' }} onMouseEnter={e => e.currentTarget.style.backgroundColor = '#fef2f2'} onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}><Trash2 size={16} /></button>
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
          <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', width: '100%', maxWidth: '520px', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem 1.5rem', borderBottom: '1px solid #f1f5f9' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Type size={18} color="#E09100" />
                <span style={{ fontWeight: 700, fontSize: '1rem', color: '#0f172a' }}>{editingId ? 'Edit Slide' : 'Add New Slide'}</span>
              </div>
              <button onClick={() => { setIsModalOpen(false); resetForm(); }} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#94a3b8', padding: '0.25rem', borderRadius: '4px' }}><X size={18} /></button>
            </div>

            <form onSubmit={handleSubmit} style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {/* Hero Title */}
              <div>
                <label style={{ display: 'block', fontSize: '0.775rem', fontWeight: 600, color: '#475569', marginBottom: '0.4rem' }}>Hero Title (h1)</label>
                <input required type="text" placeholder="e.g. Study in Australia" value={form.title} onChange={e => setForm(prev => ({ ...prev, title: e.target.value }))} style={inputStyle} />
              </div>

              {/* Image Upload */}
              <div>
                <label style={{ display: 'block', fontSize: '0.775rem', fontWeight: 600, color: '#475569', marginBottom: '0.4rem' }}>Hero Background Image</label>
                <div
                  onDragEnter={handleDrag} onDragOver={handleDrag} onDragLeave={handleDrag} onDrop={handleDrop}
                  onClick={() => document.getElementById('hero-image-input')?.click()}
                  style={{ border: `2px dashed ${isDragActive ? '#E09100' : '#cbd5e1'}`, borderRadius: '10px', padding: '1.25rem', textAlign: 'center', cursor: 'pointer', backgroundColor: isDragActive ? '#fffbeb' : '#f8fafc', transition: 'all 0.2s' }}
                >
                  {isUploading ? (
                    <p style={{ color: '#64748b', fontSize: '0.85rem', margin: 0 }}>Uploading…</p>
                  ) : form.image ? (
                    <div style={{ position: 'relative', width: '100%', height: '120px', borderRadius: '8px', overflow: 'hidden' }}>
                      <Image src={form.image} alt="preview" fill style={{ objectFit: 'cover' }} unoptimized />
                    </div>
                  ) : (
                    <>
                      <ImageIcon size={28} style={{ color: '#94a3b8', marginBottom: '0.5rem' }} />
                      <p style={{ color: '#64748b', fontSize: '0.85rem', margin: 0 }}>Drag & drop, paste, or click to upload</p>
                    </>
                  )}
                </div>
                <input id="hero-image-input" type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFileInput} />
                {form.image && (
                  <button type="button" onClick={() => setForm(prev => ({ ...prev, image: '' }))} style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>Remove image</button>
                )}
              </div>

              {/* Button Text */}
              <div>
                <label style={{ display: 'block', fontSize: '0.775rem', fontWeight: 600, color: '#475569', marginBottom: '0.4rem' }}>Button Text</label>
                <input type="text" placeholder="BOOK FREE CONSULTATION" value={form.buttonText} onChange={e => setForm(prev => ({ ...prev, buttonText: e.target.value }))} style={inputStyle} />
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.25rem' }}>
                <button type="button" onClick={() => { setIsModalOpen(false); resetForm(); }} style={{ padding: '0.6rem 1.2rem', borderRadius: '8px', border: '1px solid #cbd5e1', backgroundColor: '#ffffff', color: '#475569', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
                <button type="submit" style={{ padding: '0.6rem 1.4rem', borderRadius: '8px', border: 'none', backgroundColor: '#E09100', color: '#ffffff', fontSize: '0.875rem', fontWeight: 700, cursor: 'pointer' }}>
                  {editingId ? 'Update Slide' : 'Add Slide'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
