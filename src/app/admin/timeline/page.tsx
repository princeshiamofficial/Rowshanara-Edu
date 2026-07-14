"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { Plus, Pencil, Trash2, X, FileText, Clock } from "lucide-react";
import { toast, Toaster } from "sonner";

interface TimelineStep {
  id?: number;
  section: string;
  itemKey: string;
  title: string;
  body: string;
  value: string;
  sortOrder: number;
  isActive: boolean;
}

export default function AdminTimelinePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('Process Timeline');
  const [steps, setSteps] = useState<TimelineStep[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  
  const [newStep, setNewStep] = useState({
    title: '',
    body: ''
  });

  const fetchSteps = () => {
    fetch('/api/content?section=service_process&includeInactive=true')
      .then(res => res.json())
      .then(res => {
        if (res.status === 'success') {
          // Sort items by sortOrder
          const sorted = (res.data || []).sort((a: any, b: any) => Number(a.sortOrder || 0) - Number(b.sortOrder || 0));
          setSteps(sorted);
        }
      })
      .catch(err => {
        console.error(err);
        toast.error("Failed to load timeline steps from database.");
      });
  };

  useEffect(() => {
    fetchSteps();
  }, []);

  const handleAddOrEditStep = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Generate a unique item key based on title if adding new
      const itemKey = editingId 
        ? steps.find(s => s.id === editingId)?.itemKey || `step_${Date.now()}`
        : `step_${newStep.title.toLowerCase().replace(/[^a-z0-9]+/g, '_')}_${Date.now()}`;

      let sortOrder = steps.length + 1;
      if (editingId) {
        const found = steps.find(s => s.id === editingId);
        if (found) sortOrder = found.sortOrder;
      } else {
        sortOrder = Math.max(...steps.map(s => s.sortOrder), 0) + 1;
      }

      const payload = {
        id: editingId || undefined,
        section: "service_process",
        itemKey,
        title: newStep.title,
        body: newStep.body,
        value: String(sortOrder),
        sortOrder: sortOrder,
        isActive: true
      };

      const url = '/api/content';
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.status === 'success') {
        setIsModalOpen(false);
        setEditingId(null);
        setNewStep({
          title: '',
          body: ''
        });
        toast.success(editingId ? 'Step updated successfully!' : 'Step added successfully!');
        fetchSteps();
      } else {
        toast.error(data.message || 'Failed to save step');
      }
    } catch (err: unknown) {
      const error = err as Error;
      toast.error(error.message || 'An error occurred');
    }
  };

  const handleEditClick = (step: TimelineStep) => {
    setEditingId(step.id || null);
    setNewStep({
      title: step.title,
      body: step.body
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setNewStep({
      title: '',
      body: ''
    });
  };

  const handleDeleteStep = async (id: number) => {
    if (!confirm('Are you sure you want to delete this process step?')) return;
    try {
      const res = await fetch(`/api/content?id=${id}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (data.status === 'success') {
        toast.success('Step deleted successfully!');
        fetchSteps();
      } else {
        toast.error(data.message || 'Failed to delete');
      }
    } catch (err: unknown) {
      const error = err as Error;
      toast.error(error.message || 'An error occurred');
    }
  };

  const handleLogout = () => {
    router.push('/admin');
  };

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        width: '100vw',
        backgroundColor: '#f8fafc',
        fontFamily: 'var(--font-sans), system-ui, -apple-system, sans-serif',
        color: '#0f172a',
      }}
    >
      <Toaster position="top-right" />
      
      {/* Sidebar Navigation Component */}
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={handleLogout}
      />

      {/* Main Content Panel */}
      <main style={{ flexGrow: 1, padding: '2.5rem 3rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', margin: 0, fontFamily: 'var(--font-sans), sans-serif' }}>
              Manage Process Timeline
            </h1>
            <p style={{ fontSize: '0.875rem', color: '#64748b', margin: '0.2rem 0 0 0' }}>
              Configure the public 'How It Works / Our Process' timeline steps.
            </p>
          </div>

          <button
            onClick={() => {
              setNewStep({
                title: '',
                body: '',
                value: '',
                sortOrder: steps.length + 1
              });
              setIsModalOpen(true);
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              backgroundColor: '#E09100',
              color: '#ffffff',
              padding: '0.6rem 1.2rem',
              borderRadius: '10px',
              fontSize: '0.875rem',
              fontWeight: 600,
              cursor: 'pointer',
              border: 'none',
              boxShadow: '0 2px 8px rgba(224, 145, 0, 0.25)',
            }}
          >
            <Plus size={16} />
            <span>Add Step</span>
          </button>
        </header>

        {/* List Table */}
        <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '1.5rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.01)' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #f1f5f9', color: '#64748b', fontWeight: 700 }}>
                  <th style={{ padding: '1rem 0.5rem', width: '80px' }}>Step No.</th>
                  <th style={{ padding: '1rem 0.5rem' }}>Step Title</th>
                  <th style={{ padding: '1rem 0.5rem' }}>Description</th>
                  <th style={{ padding: '1rem 0.5rem', textAlign: 'center', width: '120px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {steps.length === 0 ? (
                  <tr>
                    <td colSpan={4} style={{ textAlign: 'center', padding: '3rem 1rem', color: '#94a3b8' }}>
                      <Clock size={40} style={{ margin: '0 auto 1rem auto', opacity: 0.5 }} />
                      <div>No timeline steps loaded or database is offline.</div>
                    </td>
                  </tr>
                ) : (
                  steps.map((step) => (
                    <tr key={step.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '1rem 0.5rem', fontWeight: 700, color: '#E09100' }}>#{step.sortOrder}</td>
                      <td style={{ padding: '1rem 0.5rem', fontWeight: 600, color: '#0f172a' }}>{step.title}</td>
                      <td style={{ padding: '1rem 0.5rem', color: '#475569' }}>{step.body}</td>
                      <td style={{ padding: '1rem 0.5rem', textAlign: 'center' }}>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
                          <button
                            onClick={() => handleEditClick(step)}
                            style={{ padding: '0.4rem', border: '1px solid #e2e8f0', borderRadius: '6px', background: 'transparent', cursor: 'pointer', color: '#475569' }}
                            title="Edit"
                          >
                            <Pencil size={14} />
                          </button>
                          <button
                            onClick={() => step.id && handleDeleteStep(step.id)}
                            style={{ padding: '0.4rem', border: '1px solid #fee2e2', borderRadius: '6px', background: 'transparent', cursor: 'pointer', color: '#ef4444' }}
                            title="Delete"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Modal Form */}
      {isModalOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15, 23, 42, 0.3)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: '#ffffff', borderRadius: '20px', width: '500px', maxWidth: '90%', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)', display: 'flex', flexDirection: 'column', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem 1.5rem', borderBottom: '1px solid #f1f5f9' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', margin: 0, fontFamily: 'var(--font-sans), sans-serif' }}>
                {editingId ? 'Edit Timeline Step' : 'Add New Timeline Step'}
              </h3>
              <button onClick={handleCloseModal} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#64748b' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddOrEditStep} style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

              <div>
                <label style={{ display: 'block', fontSize: '0.775rem', fontWeight: 600, color: '#475569', marginBottom: '0.4rem' }}>Step Title</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Initial Consultation"
                  value={newStep.title}
                  onChange={e => setNewStep({ ...newStep, title: e.target.value })}
                  style={{ width: '100%', padding: '0.6rem 0.8rem', border: '1px solid #cbd5e1', borderRadius: '8px', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.775rem', fontWeight: 600, color: '#475569', marginBottom: '0.4rem' }}>Step Description</label>
                <textarea
                  required
                  placeholder="e.g. Meet with our counselors to discuss your goals..."
                  value={newStep.body}
                  onChange={e => setNewStep({ ...newStep, body: e.target.value })}
                  rows={3}
                  style={{ width: '100%', padding: '0.6rem 0.8rem', border: '1px solid #cbd5e1', borderRadius: '8px', outline: 'none', resize: 'none', fontFamily: 'var(--font-sans), sans-serif' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  style={{ padding: '0.6rem 1.2rem', borderRadius: '8px', border: '1px solid #cbd5e1', backgroundColor: '#ffffff', color: '#475569', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ padding: '0.6rem 1.2rem', borderRadius: '8px', border: 'none', backgroundColor: '#E09100', color: '#ffffff', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer', boxShadow: '0 2px 4px rgba(224, 145, 0, 0.15)' }}
                >
                  {editingId ? 'Save Changes' : 'Add Step'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
