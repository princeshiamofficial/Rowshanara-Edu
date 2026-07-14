"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  Plus,
  Trash2,
  Edit2,
  FileText,
  X
} from 'lucide-react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { toast } from 'sonner';

interface Service {
  id: number;
  title: string;
  icon: string;
  image: string;
  description: string;
  highlights: string[];
}

export default function AdminServicesPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('Settings');
  const [activeSubTab, setActiveSubTab] = useState('Services');

  // Dynamic services state
  const [dbServices, setDbServices] = useState<Service[]>([]);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newService, setNewService] = useState({
    title: '',
    icon: 'FaBookOpen',
    image: '',
    description: '',
    highlights: ['']
  });

  const fetchServices = () => {
    fetch('/api/services')
      .then(res => res.json())
      .then(res => {
        if (res.status === 'success') {
          setDbServices(res.data);
        }
      })
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleAddHighlightField = () => {
    setNewService(prev => ({
      ...prev,
      highlights: [...prev.highlights, '']
    }));
  };

  const handleHighlightChange = (index: number, value: string) => {
    const updated = [...newService.highlights];
    updated[index] = value;
    setNewService(prev => ({
      ...prev,
      highlights: updated
    }));
  };

  const handleRemoveHighlightField = (index: number) => {
    if (newService.highlights.length <= 1) return;
    const updated = newService.highlights.filter((_, idx) => idx !== index);
    setNewService(prev => ({
      ...prev,
      highlights: updated
    }));
  };

  const handleAddService = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...newService,
        id: editingId,
        highlights: newService.highlights.filter(Boolean)
      };

      const url = '/api/services';
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.status === 'success') {
        setIsServiceModalOpen(false);
        setEditingId(null);
        setNewService({
          title: '',
          icon: 'FaBookOpen',
          image: '',
          description: '',
          highlights: ['']
        });
        toast.success(editingId ? 'Service updated successfully!' : 'Service added successfully!');
        fetchServices();
      } else {
        toast.error(data.message || 'Failed to save service');
      }
    } catch (err: unknown) {
      const error = err as Error;
      toast.error(error.message || 'An error occurred');
    }
  };

  const handleEditClick = (srv: Service) => {
    setEditingId(srv.id);
    setNewService({
      title: srv.title,
      icon: srv.icon || 'FaBookOpen',
      image: srv.image,
      description: srv.description,
      highlights: Array.isArray(srv.highlights) && srv.highlights.length > 0 ? [...srv.highlights] : ['']
    });
    setIsServiceModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsServiceModalOpen(false);
    setEditingId(null);
    setNewService({
      title: '',
      icon: 'FaBookOpen',
      image: '',
      description: '',
      highlights: ['']
    });
  };

  const handleDeleteService = async (id: number) => {
    if (!confirm('Are you sure you want to delete this service?')) return;
    try {
      const res = await fetch(`/api/services?id=${id}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (data.status === 'success') {
        toast.success('Service deleted successfully!');
        fetchServices();
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
      {/* Sidebar Navigation Component */}
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={handleLogout}
        activeSubTab={activeSubTab}
        setActiveSubTab={(sub) => {
          setActiveTab('Settings');
          setActiveSubTab(sub);
        }}
      />

      {/* Main Content Panel */}
      <main style={{ flexGrow: 1, padding: '2.5rem 3rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {/* Header Bar */}
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', margin: 0, fontFamily: 'var(--font-sans), sans-serif' }}>
              Manage Services
            </h1>
            <p style={{ fontSize: '0.875rem', color: '#64748b', margin: '0.2rem 0 0 0' }}>
              Add, update, or remove student study services
            </p>
          </div>

          <button
            onClick={() => setIsServiceModalOpen(true)}
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
            <span>Add Service</span>
          </button>
        </header>

        {/* List Table */}
        <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '1.5rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.01)' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #f1f5f9', color: '#64748b', fontWeight: 700 }}>
                  <th style={{ padding: '1rem 0.5rem' }}>Service Title</th>
                  <th style={{ padding: '1rem 0.5rem' }}>Icon Class</th>
                  <th style={{ padding: '1rem 0.5rem' }}>Image Path</th>
                  <th style={{ padding: '1rem 0.5rem' }}>Description Summary</th>
                  <th style={{ padding: '1rem 0.5rem', textAlign: 'center' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {dbServices.length === 0 ? (
                  <tr>
                    <td colSpan={5} style={{ textAlign: 'center', padding: '3rem 1rem', color: '#94a3b8' }}>
                      <FileText size={40} style={{ margin: '0 auto 1rem auto', opacity: 0.5 }} />
                      <div>No services loaded or database is offline.</div>
                    </td>
                  </tr>
                ) : (
                  dbServices.map((srv) => (
                    <tr key={srv.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '1rem 0.5rem', fontWeight: 600, color: '#0f172a' }}>{srv.title}</td>
                      <td style={{ padding: '1rem 0.5rem', color: '#64748b' }}>{srv.icon}</td>
                      <td style={{ padding: '1rem 0.5rem' }}>
                        <div style={{ position: 'relative', width: '55px', height: '38px', borderRadius: '6px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
                          <Image
                            src={srv.image}
                            alt={srv.title}
                            fill
                            style={{ objectFit: 'cover' }}
                            unoptimized
                          />
                        </div>
                      </td>
                      <td style={{ padding: '1rem 0.5rem', color: '#475569', maxWidth: '300px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{srv.description}</td>
                      <td style={{ padding: '1rem 0.5rem', textAlign: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                          <button
                            onClick={() => handleEditClick(srv)}
                            style={{
                              background: 'transparent',
                              border: 'none',
                              color: '#3b82f6',
                              cursor: 'pointer',
                              padding: '0.25rem',
                              borderRadius: '4px',
                              transition: 'background-color 0.2s',
                            }}
                            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#eff6ff'}
                            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteService(srv.id)}
                            style={{
                              background: 'transparent',
                              border: 'none',
                              color: '#ef4444',
                              cursor: 'pointer',
                              padding: '0.25rem',
                              borderRadius: '4px',
                              transition: 'background-color 0.2s',
                            }}
                            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#fef2f2'}
                            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                          >
                            <Trash2 size={16} />
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

        {/* Modal Overlay */}
        {isServiceModalOpen && (
          <div style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.4)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
          }}>
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              width: '90%',
              maxWidth: '600px',
              maxHeight: '90vh',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              border: '1px solid #e2e8f0'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem', borderBottom: '1px solid #f1f5f9' }}>
                <h2 style={{ fontSize: '1.2rem', fontWeight: 700, margin: 0 }}>
                  {editingId ? 'Edit Study Service' : 'Add New Study Service'}
                </h2>
                <button onClick={handleCloseModal} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#64748b' }}>
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleAddService} style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.775rem', fontWeight: 600, color: '#475569', marginBottom: '0.4rem' }}>Service Title</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Accommodation Search"
                      value={newService.title}
                      onChange={e => setNewService({ ...newService, title: e.target.value })}
                      style={{ width: '100%', padding: '0.6rem 0.8rem', border: '1px solid #cbd5e1', borderRadius: '8px', outline: 'none' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.775rem', fontWeight: 600, color: '#475569', marginBottom: '0.4rem' }}>Icon Class (Lucide / Fa)</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. FaBriefcase"
                      value={newService.icon}
                      onChange={e => setNewService({ ...newService, icon: e.target.value })}
                      style={{ width: '100%', padding: '0.6rem 0.8rem', border: '1px solid #cbd5e1', borderRadius: '8px', outline: 'none' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.775rem', fontWeight: 600, color: '#475569', marginBottom: '0.4rem' }}>Header Image Path</label>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <input
                      required
                      type="text"
                      placeholder="e.g. /images/services/counselling.png"
                      value={newService.image}
                      onChange={e => setNewService({ ...newService, image: e.target.value })}
                      style={{ flexGrow: 1, padding: '0.6rem 0.8rem', border: '1px solid #cbd5e1', borderRadius: '8px', outline: 'none' }}
                    />
                    {newService.image && (
                      <div style={{ position: 'relative', width: '60px', height: '40px', borderRadius: '6px', overflow: 'hidden', border: '1px solid #e2e8f0', flexShrink: 0 }}>
                        <Image
                          src={newService.image}
                          alt="Preview"
                          fill
                          style={{ objectFit: 'cover' }}
                          unoptimized
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.775rem', fontWeight: 600, color: '#475569', marginBottom: '0.4rem' }}>Description</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Provide a comprehensive description of the study assistance service..."
                    value={newService.description}
                    onChange={e => setNewService({ ...newService, description: e.target.value })}
                    style={{ width: '100%', padding: '0.6rem 0.8rem', border: '1px solid #cbd5e1', borderRadius: '8px', outline: 'none', resize: 'vertical', fontFamily: 'inherit' }}
                  />
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                    <label style={{ fontSize: '0.775rem', fontWeight: 600, color: '#475569' }}>Key Highlights / Bullet Points</label>
                    <button
                      type="button"
                      onClick={handleAddHighlightField}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#E09100',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.2rem'
                      }}
                    >
                      <Plus size={12} />
                      <span>Add New</span>
                    </button>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {newService.highlights.map((highlight, index) => (
                      <div key={index} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <input
                          required
                          type="text"
                          placeholder={`Highlight ${index + 1}`}
                          value={highlight}
                          onChange={e => handleHighlightChange(index, e.target.value)}
                          style={{ flexGrow: 1, padding: '0.6rem 0.8rem', border: '1px solid #cbd5e1', borderRadius: '8px', outline: 'none' }}
                        />
                        {newService.highlights.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveHighlightField(index)}
                            style={{
                              background: 'transparent',
                              border: 'none',
                              color: '#ef4444',
                              cursor: 'pointer',
                              padding: '0.25rem',
                              borderRadius: '4px',
                            }}
                          >
                            <X size={16} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem', borderTop: '1px solid #f1f5f9', paddingTop: '1.25rem' }}>
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    style={{
                      backgroundColor: '#f1f5f9',
                      color: '#475569',
                      padding: '0.6rem 1.2rem',
                      borderRadius: '8px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      border: 'none'
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    style={{
                      backgroundColor: '#E09100',
                      color: '#ffffff',
                      padding: '0.6rem 1.2rem',
                      borderRadius: '8px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      border: 'none',
                      boxShadow: '0 2px 8px rgba(224, 145, 0, 0.25)'
                    }}
                  >
                    Save Service
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
