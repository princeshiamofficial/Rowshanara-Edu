"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  Plus,
  Trash2,
  Edit2,
  Globe,
  X
} from 'lucide-react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { toast } from 'sonner';

interface Destination {
  id: number;
  code: string;
  name: string;
  region: string;
  cost: string;
  work: string;
  pr: string;
  gradient: string;
  bullets: string[];
  cities: string;
  visaInfo: string;
}

export default function AdminDestinationsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('Settings');
  const [activeSubTab, setActiveSubTab] = useState('Destinations');

  // Dynamic destinations state
  const [dbDestinations, setDbDestinations] = useState<Destination[]>([]);
  const [isDestModalOpen, setIsDestModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newDest, setNewDest] = useState({
    code: '',
    name: '',
    region: '',
    cost: '',
    work: '',
    pr: '',
    gradient: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
    bullet1: '',
    bullet2: '',
    bullet3: '',
    cities: '',
    visaInfo: ''
  });

  const fetchDestinations = () => {
    fetch('/api/destinations')
      .then(res => res.json())
      .then(res => {
        if (res.status === 'success') {
          setDbDestinations(res.data);
        }
      })
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchDestinations();
  }, []);

  const handleAddDestination = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...newDest,
        id: editingId,
        bullets: [newDest.bullet1, newDest.bullet2, newDest.bullet3].filter(Boolean)
      };

      const url = '/api/destinations';
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.status === 'success') {
        setIsDestModalOpen(false);
        setEditingId(null);
        setNewDest({
          code: '',
          name: '',
          region: '',
          cost: '',
          work: '',
          pr: '',
          gradient: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
          bullet1: '',
          bullet2: '',
          bullet3: '',
          cities: '',
          visaInfo: ''
        });
        toast.success(editingId ? 'Destination updated successfully!' : 'Destination added successfully!');
        fetchDestinations();
      } else {
        toast.error(data.message || 'Failed to save destination');
      }
    } catch (err: unknown) {
      const error = err as Error;
      toast.error(error.message || 'An error occurred');
    }
  };

  const handleEditClick = (dest: Destination) => {
    setEditingId(dest.id);
    setNewDest({
      code: dest.code,
      name: dest.name,
      region: dest.region,
      cost: dest.cost,
      work: dest.work,
      pr: dest.pr,
      gradient: dest.gradient || 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
      bullet1: Array.isArray(dest.bullets) ? (dest.bullets[0] || '') : '',
      bullet2: Array.isArray(dest.bullets) ? (dest.bullets[1] || '') : '',
      bullet3: Array.isArray(dest.bullets) ? (dest.bullets[2] || '') : '',
      cities: dest.cities,
      visaInfo: dest.visaInfo
    });
    setIsDestModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsDestModalOpen(false);
    setEditingId(null);
    setNewDest({
      code: '',
      name: '',
      region: '',
      cost: '',
      work: '',
      pr: '',
      gradient: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
      bullet1: '',
      bullet2: '',
      bullet3: '',
      cities: '',
      visaInfo: ''
    });
  };

  const handleDeleteDestination = async (id: number) => {
    if (!confirm('Are you sure you want to delete this destination?')) return;
    try {
      const res = await fetch(`/api/destinations?id=${id}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (data.status === 'success') {
        toast.success('Destination deleted successfully!');
        fetchDestinations();
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

      {/* Main Content Dashboard Panel */}
      <main style={{ flexGrow: 1, padding: '2.5rem 3rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {/* Header Bar */}
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', margin: 0, fontFamily: 'var(--font-sans), sans-serif' }}>
              Manage Destinations
            </h1>
            <p style={{ fontSize: '0.875rem', color: '#64748b', margin: '0.2rem 0 0 0' }}>
              Add, update, or remove study abroad destination countries
            </p>
          </div>

          <button
            onClick={() => setIsDestModalOpen(true)}
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
            <span>Add Destination</span>
          </button>
        </header>

        {/* List Table */}
        <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '1.5rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.01)' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #f1f5f9', color: '#64748b', fontWeight: 700 }}>
                  <th style={{ padding: '1rem 0.5rem' }}>Country</th>
                  <th style={{ padding: '1rem 0.5rem' }}>Code</th>
                  <th style={{ padding: '1rem 0.5rem' }}>Region</th>
                  <th style={{ padding: '1rem 0.5rem' }}>Cost</th>
                  <th style={{ padding: '1rem 0.5rem' }}>Work Rights</th>
                  <th style={{ padding: '1rem 0.5rem' }}>PR Pathways</th>
                  <th style={{ padding: '1rem 0.5rem', textAlign: 'center' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {dbDestinations.length === 0 ? (
                  <tr>
                    <td colSpan={7} style={{ textAlign: 'center', padding: '3rem 1rem', color: '#94a3b8' }}>
                      <Globe size={40} style={{ margin: '0 auto 1rem auto', opacity: 0.5 }} />
                      <div>No destinations loaded or database is offline.</div>
                    </td>
                  </tr>
                ) : (
                  dbDestinations.map((dest) => (
                    <tr key={dest.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '1rem 0.5rem', fontWeight: 600, color: '#0f172a' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <Image 
                            src={`https://flagcdn.com/w40/${dest.code.toLowerCase()}.png`} 
                            alt={dest.name} 
                            width={24}
                            height={18}
                            style={{ borderRadius: '2px', objectFit: 'contain' }} 
                            unoptimized
                          />
                          <span>{dest.name}</span>
                        </div>
                      </td>
                      <td style={{ padding: '1rem 0.5rem', color: '#64748b' }}>{dest.code}</td>
                      <td style={{ padding: '1rem 0.5rem', color: '#475569' }}>{dest.region}</td>
                      <td style={{ padding: '1rem 0.5rem', color: '#475569' }}>{dest.cost}</td>
                      <td style={{ padding: '1rem 0.5rem', color: '#475569' }}>{dest.work}</td>
                      <td style={{ padding: '1rem 0.5rem', color: '#475569' }}>{dest.pr}</td>
                      <td style={{ padding: '1rem 0.5rem', textAlign: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                          <button
                            onClick={() => handleEditClick(dest)}
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
                            onClick={() => handleDeleteDestination(dest.id)}
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
        {isDestModalOpen && (
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
                  {editingId ? 'Edit Study Destination' : 'Add New Study Destination'}
                </h2>
                <button onClick={handleCloseModal} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#64748b' }}>
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleAddDestination} style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.775rem', fontWeight: 600, color: '#475569', marginBottom: '0.4rem' }}>Country Name</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Japan"
                      value={newDest.name}
                      onChange={e => setNewDest({ ...newDest, name: e.target.value })}
                      style={{ width: '100%', padding: '0.6rem 0.8rem', border: '1px solid #cbd5e1', borderRadius: '8px', outline: 'none' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.775rem', fontWeight: 600, color: '#475569', marginBottom: '0.4rem' }}>Country Code (2 Letters)</label>
                    <input
                      required
                      type="text"
                      maxLength={2}
                      placeholder="e.g. JP"
                      value={newDest.code}
                      onChange={e => setNewDest({ ...newDest, code: e.target.value.toUpperCase() })}
                      style={{ width: '100%', padding: '0.6rem 0.8rem', border: '1px solid #cbd5e1', borderRadius: '8px', outline: 'none' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.775rem', fontWeight: 600, color: '#475569', marginBottom: '0.4rem' }}>Region</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Asia"
                      value={newDest.region}
                      onChange={e => setNewDest({ ...newDest, region: e.target.value })}
                      style={{ width: '100%', padding: '0.6rem 0.8rem', border: '1px solid #cbd5e1', borderRadius: '8px', outline: 'none' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.775rem', fontWeight: 600, color: '#475569', marginBottom: '0.4rem' }}>Tuition Cost</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. $8,000 - $18,000/year"
                      value={newDest.cost}
                      onChange={e => setNewDest({ ...newDest, cost: e.target.value })}
                      style={{ width: '100%', padding: '0.6rem 0.8rem', border: '1px solid #cbd5e1', borderRadius: '8px', outline: 'none' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.775rem', fontWeight: 600, color: '#475569', marginBottom: '0.4rem' }}>Work Rights</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. 28 hours/week"
                      value={newDest.work}
                      onChange={e => setNewDest({ ...newDest, work: e.target.value })}
                      style={{ width: '100%', padding: '0.6rem 0.8rem', border: '1px solid #cbd5e1', borderRadius: '8px', outline: 'none' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.775rem', fontWeight: 600, color: '#475569', marginBottom: '0.4rem' }}>PR Opportunities</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Yes / Through Work Visa"
                      value={newDest.pr}
                      onChange={e => setNewDest({ ...newDest, pr: e.target.value })}
                      style={{ width: '100%', padding: '0.6rem 0.8rem', border: '1px solid #cbd5e1', borderRadius: '8px', outline: 'none' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.775rem', fontWeight: 600, color: '#475569', marginBottom: '0.4rem' }}>Major Study Cities</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Tokyo, Kyoto, Osaka"
                    value={newDest.cities}
                    onChange={e => setNewDest({ ...newDest, cities: e.target.value })}
                    style={{ width: '100%', padding: '0.6rem 0.8rem', border: '1px solid #cbd5e1', borderRadius: '8px', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.775rem', fontWeight: 600, color: '#475569', marginBottom: '0.4rem' }}>Visa Information</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Certificate of Eligibility required, processing 6-8 weeks"
                    value={newDest.visaInfo}
                    onChange={e => setNewDest({ ...newDest, visaInfo: e.target.value })}
                    style={{ width: '100%', padding: '0.6rem 0.8rem', border: '1px solid #cbd5e1', borderRadius: '8px', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.775rem', fontWeight: 600, color: '#475569', marginBottom: '0.4rem' }}>Key Highlights / Bullet Points (Enter 3)</label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <input
                      required
                      type="text"
                      placeholder="Highlight 1 (e.g. High tech innovations)"
                      value={newDest.bullet1}
                      onChange={e => setNewDest({ ...newDest, bullet1: e.target.value })}
                      style={{ width: '100%', padding: '0.6rem 0.8rem', border: '1px solid #cbd5e1', borderRadius: '8px', outline: 'none' }}
                    />
                    <input
                      required
                      type="text"
                      placeholder="Highlight 2 (e.g. Rich traditional culture)"
                      value={newDest.bullet2}
                      onChange={e => setNewDest({ ...newDest, bullet2: e.target.value })}
                      style={{ width: '100%', padding: '0.6rem 0.8rem', border: '1px solid #cbd5e1', borderRadius: '8px', outline: 'none' }}
                    />
                    <input
                      required
                      type="text"
                      placeholder="Highlight 3 (e.g. Safe and clean living environment)"
                      value={newDest.bullet3}
                      onChange={e => setNewDest({ ...newDest, bullet3: e.target.value })}
                      style={{ width: '100%', padding: '0.6rem 0.8rem', border: '1px solid #cbd5e1', borderRadius: '8px', outline: 'none' }}
                    />
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
                    Save Destination
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
