"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Trash2, Edit2, X, GripVertical, HelpCircle } from 'lucide-react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { toast } from 'sonner';

interface Faq {
  id: number;
  q: string;
  a: string;
  sortOrder: number;
}

export default function AdminFaqPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('FAQ');
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const [form, setForm] = useState({ question: '', answer: '' });

  const fetchFaqs = () => {
    fetch('/api/faq')
      .then(r => r.json())
      .then(res => { if (res.status === 'success') setFaqs(res.data); })
      .catch(err => console.error(err));
  };

  useEffect(() => { fetchFaqs(); }, []);

  const resetForm = () => {
    setEditingId(null);
    setForm({ question: '', answer: '' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.question.trim() || !form.answer.trim()) {
      toast.error('Question and answer are required');
      return;
    }
    try {
      const method = editingId ? 'PUT' : 'POST';
      const res = await fetch('/api/faq', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, id: editingId })
      });
      const data = await res.json();
      if (data.status === 'success') {
        toast.success(editingId ? 'FAQ updated!' : 'FAQ added!');
        setIsModalOpen(false);
        resetForm();
        fetchFaqs();
      } else {
        toast.error(data.message || 'Failed to save');
      }
    } catch {
      toast.error('An error occurred');
    }
  };

  const handleEdit = (faq: Faq) => {
    setEditingId(faq.id);
    setForm({ question: faq.q, answer: faq.a });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this FAQ?')) return;
    try {
      const res = await fetch(`/api/faq?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.status === 'success') { toast.success('FAQ deleted!'); fetchFaqs(); }
      else toast.error(data.message || 'Failed to delete');
    } catch {
      toast.error('An error occurred');
    }
  };

  // Drag-and-drop row reordering
  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); };

  const handleDropRow = async (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === targetIndex) return;
    const updated = [...faqs];
    const [dragged] = updated.splice(draggedIndex, 1);
    updated.splice(targetIndex, 0, dragged);
    setFaqs(updated);
    setDraggedIndex(null);

    const loadingId = toast.loading('Saving order...');
    try {
      const order = updated.map((f, idx) => ({ id: f.id, sortOrder: idx }));
      const res = await fetch('/api/faq', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order })
      });
      const data = await res.json();
      toast.dismiss(loadingId);
      if (data.status === 'success') toast.success('Order updated!');
      else { toast.error('Failed to save order'); fetchFaqs(); }
    } catch {
      toast.dismiss(loadingId);
      toast.error('Failed to save order');
      fetchFaqs();
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.6rem 0.8rem',
    border: '1px solid #cbd5e1',
    borderRadius: '8px',
    outline: 'none',
    fontSize: '0.875rem',
    fontFamily: 'var(--font-sans), sans-serif',
    boxSizing: 'border-box',
    color: '#0f172a',
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', width: '100vw', backgroundColor: '#f8fafc', fontFamily: 'var(--font-sans), system-ui, sans-serif', color: '#0f172a' }}>
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={() => router.push('/admin')} />

      <main style={{ flexGrow: 1, padding: '2.5rem 3rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {/* Header */}
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', margin: 0, fontFamily: 'var(--font-sans), sans-serif' }}>FAQ Management</h1>
            <p style={{ fontSize: '0.875rem', color: '#64748b', margin: '0.2rem 0 0 0' }}>Add, edit, delete and reorder frequently asked questions</p>
          </div>
          <button
            onClick={() => { resetForm(); setIsModalOpen(true); }}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#E09100', color: '#ffffff', padding: '0.6rem 1.2rem', borderRadius: '10px', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer', border: 'none', boxShadow: '0 2px 8px rgba(224, 145, 0, 0.25)' }}
          >
            <Plus size={16} /><span>Add FAQ</span>
          </button>
        </header>

        {/* FAQ Table */}
        <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '1.5rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.01)' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #f1f5f9', color: '#64748b', fontWeight: 700 }}>
                  <th style={{ padding: '1rem 0.5rem', width: '36px' }}></th>
                  <th style={{ padding: '1rem 0.5rem', width: '40px' }}>#</th>
                  <th style={{ padding: '1rem 0.5rem' }}>Question</th>
                  <th style={{ padding: '1rem 0.5rem' }}>Answer Preview</th>
                  <th style={{ padding: '1rem 0.5rem', textAlign: 'center', width: '100px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {faqs.length === 0 ? (
                  <tr>
                    <td colSpan={5} style={{ textAlign: 'center', padding: '3rem 1rem', color: '#94a3b8' }}>
                      <HelpCircle size={40} style={{ margin: '0 auto 1rem auto', opacity: 0.4 }} />
                      <div>No FAQs found. Click &quot;Add FAQ&quot; to get started.</div>
                    </td>
                  </tr>
                ) : faqs.map((faq, index) => (
                  <tr
                    key={faq.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDropRow(e, index)}
                    style={{
                      borderBottom: '1px solid #f1f5f9',
                      backgroundColor: draggedIndex === index ? '#f8fafc' : '#ffffff',
                      transition: 'background-color 0.15s',
                      cursor: 'grab'
                    }}
                  >
                    <td style={{ padding: '0.75rem 0.5rem', color: '#cbd5e1', verticalAlign: 'middle' }}>
                      <GripVertical size={16} />
                    </td>
                    <td style={{ padding: '1rem 0.5rem', fontWeight: 700, color: '#E09100' }}>{index + 1}</td>
                    <td style={{ padding: '1rem 0.5rem', fontWeight: 600, color: '#0f172a', maxWidth: '280px' }}>
                      <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{faq.q}</div>
                    </td>
                    <td style={{ padding: '1rem 0.5rem', color: '#475569', maxWidth: '340px' }}>
                      <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: '0.82rem' }}>{faq.a}</div>
                    </td>
                    <td style={{ padding: '1rem 0.5rem', textAlign: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                        <button
                          onClick={() => handleEdit(faq)}
                          title="Edit"
                          style={{ background: 'transparent', border: 'none', color: '#3b82f6', cursor: 'pointer', padding: '0.25rem', borderRadius: '4px', transition: 'background 0.15s' }}
                          onMouseEnter={e => e.currentTarget.style.backgroundColor = '#eff6ff'}
                          onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(faq.id)}
                          title="Delete"
                          style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '0.25rem', borderRadius: '4px', transition: 'background 0.15s' }}
                          onMouseEnter={e => e.currentTarget.style.backgroundColor = '#fef2f2'}
                          onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                        >
                          <Trash2 size={16} />
                        </button>
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
          <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', width: '100%', maxWidth: '560px', boxShadow: '0 20px 60px rgba(0,0,0,0.2)', maxHeight: '90vh', overflowY: 'auto' }}>
            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem 1.5rem', borderBottom: '1px solid #f1f5f9', position: 'sticky', top: 0, backgroundColor: '#ffffff', zIndex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <HelpCircle size={18} color="#E09100" />
                <span style={{ fontWeight: 700, fontSize: '1rem', color: '#0f172a' }}>
                  {editingId ? 'Edit FAQ' : 'Add New FAQ'}
                </span>
              </div>
              <button
                onClick={() => { setIsModalOpen(false); resetForm(); }}
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#94a3b8', padding: '0.25rem', borderRadius: '4px' }}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {/* Question */}
              <div>
                <label style={{ display: 'block', fontSize: '0.775rem', fontWeight: 600, color: '#475569', marginBottom: '0.4rem' }}>Question</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. What is the typical timeline for the entire process?"
                  value={form.question}
                  onChange={e => setForm(prev => ({ ...prev, question: e.target.value }))}
                  style={inputStyle}
                />
              </div>

              {/* Answer */}
              <div>
                <label style={{ display: 'block', fontSize: '0.775rem', fontWeight: 600, color: '#475569', marginBottom: '0.4rem' }}>Answer</label>
                <textarea
                  required
                  placeholder="Write the full answer here..."
                  value={form.answer}
                  onChange={e => setForm(prev => ({ ...prev, answer: e.target.value }))}
                  rows={6}
                  style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }}
                />
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.25rem' }}>
                <button
                  type="button"
                  onClick={() => { setIsModalOpen(false); resetForm(); }}
                  style={{ padding: '0.6rem 1.2rem', borderRadius: '8px', border: '1px solid #cbd5e1', backgroundColor: '#ffffff', color: '#475569', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ padding: '0.6rem 1.4rem', borderRadius: '8px', border: 'none', backgroundColor: '#E09100', color: '#ffffff', fontSize: '0.875rem', fontWeight: 700, cursor: 'pointer' }}
                >
                  {editingId ? 'Update FAQ' : 'Add FAQ'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
