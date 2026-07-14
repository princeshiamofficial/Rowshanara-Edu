"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  Plus, Trash2, Edit2, X, GripVertical, Image as ImageIcon, Eye, EyeOff
} from 'lucide-react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { toast } from 'sonner';

interface PartnerUniversity {
  id: number;
  logo: string;
  sortOrder: number;
  isActive: boolean;
}

export default function AdminPartnerUniversitiesPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('Partner Universities');
  const [universities, setUniversities] = useState<PartnerUniversity[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragActive, setIsDragActive] = useState(false);

  const [form, setForm] = useState({
    logo: '',
    isActive: true,
  });

  const fetchUniversities = () => {
    fetch('/api/partner-universities')
      .then(r => r.json())
      .then(res => { if (res.status === 'success') setUniversities(res.data); })
      .catch(err => console.error(err));
  };

  useEffect(() => { fetchUniversities(); }, []);

  const uploadFile = async (file: File) => {
    setIsUploading(true);
    const fd = new FormData();
    fd.append('file', file);
    try {
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      const result = await res.json();
      if (result.status === 'success') {
        setForm(prev => ({ ...prev, logo: result.data.url }));
        toast.success('Logo uploaded!');
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
    if (!form.logo) { toast.error('Logo is required'); return; }
    try {
      const method = editingId ? 'PUT' : 'POST';
      const res = await fetch('/api/partner-universities', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, id: editingId })
      });
      const data = await res.json();
      if (data.status === 'success') {
        toast.success(editingId ? 'University updated!' : 'University added!');
        setIsModalOpen(false);
        resetForm();
        fetchUniversities();
      } else {
        toast.error(data.message || 'Failed to save');
      }
    } catch {
      toast.error('An error occurred');
    }
  };

  const handleEdit = (uni: PartnerUniversity) => {
    setEditingId(uni.id);
    setForm({ logo: uni.logo, isActive: uni.isActive });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this partner university?')) return;
    const res = await fetch(`/api/partner-universities?id=${id}`, { method: 'DELETE' });
    const data = await res.json();
    if (data.status === 'success') { toast.success('University deleted!'); fetchUniversities(); }
    else toast.error(data.message || 'Failed to delete');
  };

  const handleToggleActive = async (uni: PartnerUniversity) => {
    try {
      const res = await fetch('/api/partner-universities', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: uni.id, logo: uni.logo, isActive: !uni.isActive })
      });
      const data = await res.json();
      if (data.status === 'success') {
        toast.success(uni.isActive ? 'Hidden from homepage' : 'Shown on homepage');
        fetchUniversities();
      }
    } catch {
      toast.error('Failed to update');
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setForm({ logo: '', isActive: true });
  };

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); };

  const handleDropRow = async (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === targetIndex) return;
    const updated = [...universities];
    const [dragged] = updated.splice(draggedIndex, 1);
    updated.splice(targetIndex, 0, dragged);
    setUniversities(updated);
    setDraggedIndex(null);
    const loadingId = toast.loading('Saving order...');
    try {
      const order = updated.map((u, idx) => ({ id: u.id, sortOrder: idx }));
      const res = await fetch('/api/partner-universities', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ order }) });
      const data = await res.json();
      toast.dismiss(loadingId);
      if (data.status === 'success') toast.success('Order updated!');
      else { toast.error('Failed to save order'); fetchUniversities(); }
    } catch { toast.dismiss(loadingId); toast.error('Failed to save order'); fetchUniversities(); }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', width: '100vw', backgroundColor: '#f8fafc', fontFamily: 'var(--font-sans), system-ui, sans-serif', color: '#0f172a' }}>
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={() => router.push('/admin')} />

      <main style={{ flexGrow: 1, padding: '2.5rem 3rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>Partner Universities</h1>
            <p style={{ fontSize: '0.875rem', color: '#64748b', margin: '0.2rem 0 0 0' }}>Manage university logos displayed on the homepage</p>
          </div>
          <button
            onClick={() => { resetForm(); setIsModalOpen(true); }}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#E09100', color: '#ffffff', padding: '0.6rem 1.2rem', borderRadius: '10px', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer', border: 'none', boxShadow: '0 2px 8px rgba(224, 145, 0, 0.25)' }}
          >
            <Plus size={16} /><span>Add Logo</span>
          </button>
        </header>

        <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '1.5rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.01)' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #f1f5f9', color: '#64748b', fontWeight: 700 }}>
                  <th style={{ padding: '1rem 0.5rem', width: '36px' }}></th>
                  <th style={{ padding: '1rem 0.5rem', width: '80px' }}>Logo</th>
                  <th style={{ padding: '1rem 0.5rem', textAlign: 'center', width: '80px' }}>Status</th>
                  <th style={{ padding: '1rem 0.5rem', textAlign: 'center', width: '120px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {universities.length === 0 ? (
                  <tr>
                    <td colSpan={4} style={{ textAlign: 'center', padding: '3rem 1rem', color: '#94a3b8' }}>
                      <ImageIcon size={40} style={{ margin: '0 auto 1rem auto', opacity: 0.4 }} />
                      <div>No partner university logos found.</div>
                    </td>
                  </tr>
                ) : universities.map((uni, index) => (
                  <tr
                    key={uni.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDropRow(e, index)}
                    style={{ borderBottom: '1px solid #f1f5f9', backgroundColor: draggedIndex === index ? '#f8fafc' : '#ffffff', transition: 'background-color 0.15s', cursor: 'grab', opacity: uni.isActive ? 1 : 0.6 }}
                  >
                    <td style={{ padding: '0.75rem 0.5rem', color: '#cbd5e1', verticalAlign: 'middle' }}><GripVertical size={16} /></td>
                    <td style={{ padding: '0.75rem 0.5rem' }}>
                      <div style={{ position: 'relative', width: '60px', height: '60px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #e2e8f0', backgroundColor: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Image src={uni.logo} alt="University logo" fill style={{ objectFit: 'contain', padding: '4px' }} unoptimized />
                      </div>
                    </td>
                    <td style={{ padding: '1rem 0.5rem', textAlign: 'center' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem', fontWeight: 600, padding: '0.25rem 0.6rem', borderRadius: '9999px', backgroundColor: uni.isActive ? '#dcfce7' : '#f1f5f9', color: uni.isActive ? '#166534' : '#64748b' }}>
                        {uni.isActive ? <Eye size={12} /> : <EyeOff size={12} />}
                        {uni.isActive ? 'Visible' : 'Hidden'}
                      </span>
                    </td>
                    <td style={{ padding: '1rem 0.5rem', textAlign: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                        <button onClick={() => handleToggleActive(uni)} title={uni.isActive ? 'Hide from homepage' : 'Show on homepage'} style={{ background: 'transparent', border: 'none', color: uni.isActive ? '#f59e0b' : '#94a3b8', cursor: 'pointer', padding: '0.25rem', borderRadius: '4px' }} onMouseEnter={e => e.currentTarget.style.backgroundColor = '#fef3c7'} onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}>
                          {uni.isActive ? <Eye size={16} /> : <EyeOff size={16} />}
                        </button>
                        <button onClick={() => handleEdit(uni)} style={{ background: 'transparent', border: 'none', color: '#3b82f6', cursor: 'pointer', padding: '0.25rem', borderRadius: '4px' }} onMouseEnter={e => e.currentTarget.style.backgroundColor = '#eff6ff'} onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}><Edit2 size={16} /></button>
                        <button onClick={() => handleDelete(uni.id)} style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '0.25rem', borderRadius: '4px' }} onMouseEnter={e => e.currentTarget.style.backgroundColor = '#fef2f2'} onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {isModalOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15,23,42,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200, padding: '1rem' }}>
          <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', width: '100%', maxWidth: '480px', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem 1.5rem', borderBottom: '1px solid #f1f5f9' }}>
              <span style={{ fontWeight: 700, fontSize: '1rem', color: '#0f172a' }}>{editingId ? 'Edit Logo' : 'Add New Logo'}</span>
              <button onClick={() => { setIsModalOpen(false); resetForm(); }} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#94a3b8', padding: '0.25rem', borderRadius: '4px' }}><X size={18} /></button>
            </div>

            <form onSubmit={handleSubmit} style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.775rem', fontWeight: 600, color: '#475569', marginBottom: '0.4rem' }}>University Logo</label>
                <div
                  onDragEnter={handleDrag} onDragOver={handleDrag} onDragLeave={handleDrag} onDrop={handleDrop}
                  onClick={() => document.getElementById('uni-logo-input')?.click()}
                  style={{ border: `2px dashed ${isDragActive ? '#E09100' : '#cbd5e1'}`, borderRadius: '10px', padding: '1.25rem', textAlign: 'center', cursor: 'pointer', backgroundColor: isDragActive ? '#fffbeb' : '#f8fafc', transition: 'all 0.2s' }}
                >
                  {isUploading ? (
                    <p style={{ color: '#64748b', fontSize: '0.85rem', margin: 0 }}>Uploading...</p>
                  ) : form.logo ? (
                    <div style={{ position: 'relative', width: '120px', height: '80px', margin: '0 auto', borderRadius: '8px', overflow: 'hidden' }}>
                      <Image src={form.logo} alt="preview" fill style={{ objectFit: 'contain' }} unoptimized />
                    </div>
                  ) : (
                    <>
                      <ImageIcon size={28} style={{ color: '#94a3b8', marginBottom: '0.5rem' }} />
                      <p style={{ color: '#64748b', fontSize: '0.85rem', margin: 0 }}>Drag & drop or click to upload logo</p>
                      <p style={{ color: '#94a3b8', fontSize: '0.75rem', margin: '0.25rem 0 0 0' }}>PNG, SVG, or WebP recommended</p>
                    </>
                  )}
                </div>
                <input id="uni-logo-input" type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFileInput} />
                {form.logo && (
                  <button type="button" onClick={() => setForm(prev => ({ ...prev, logo: '' }))} style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>Remove logo</button>
                )}
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.25rem' }}>
                <button type="button" onClick={() => { setIsModalOpen(false); resetForm(); }} style={{ padding: '0.6rem 1.2rem', borderRadius: '8px', border: '1px solid #cbd5e1', backgroundColor: '#ffffff', color: '#475569', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
                <button type="submit" style={{ padding: '0.6rem 1.4rem', borderRadius: '8px', border: 'none', backgroundColor: '#E09100', color: '#ffffff', fontSize: '0.875rem', fontWeight: 700, cursor: 'pointer' }}>
                  {editingId ? 'Update' : 'Add Logo'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
