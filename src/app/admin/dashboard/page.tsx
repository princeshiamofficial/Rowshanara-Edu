"use client";

import React, { useState, useEffect } from 'react';

import { useRouter } from 'next/navigation';
import {
  School,
  FileText,
  Users,
  GraduationCap,
  Search,
  Bell,
  Plus,
  CheckCircle2,
  Trash2,
  Globe,
  X
} from 'lucide-react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { toast } from 'sonner';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('Overview');
  const [activeSubTab, setActiveSubTab] = useState('Billing');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Dynamic destinations state
  const [dbDestinations, setDbDestinations] = useState<any[]>([]);
  const [isDestModalOpen, setIsDestModalOpen] = useState(false);
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
        bullets: [newDest.bullet1, newDest.bullet2, newDest.bullet3].filter(Boolean)
      };

      const res = await fetch('/api/destinations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.status === 'success') {
        setIsDestModalOpen(false);
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
        toast.success('Destination added successfully!');
        fetchDestinations();
      } else {
        toast.error(data.message || 'Failed to add destination');
      }
    } catch (err: any) {
      toast.error(err.message || 'An error occurred');
    }
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
    } catch (err: any) {
      toast.error(err.message || 'An error occurred');
    }
  };

  // Mock student applications data
  const [applications] = useState([
    { id: 'APP-0941', name: 'Tanvir Rahman', university: 'University of Oxford', country: 'United Kingdom', course: 'MSc Computer Science', date: '2026-06-08', status: 'Approved' },
    { id: 'APP-0940', name: 'Nusrat Jahan', university: 'University of Toronto', country: 'Canada', course: 'BBA Finance', date: '2026-06-07', status: 'Pending' },
    { id: 'APP-0939', name: 'Fahim Shakil', university: 'Monash University', country: 'Australia', course: 'BSc Software Engineering', date: '2026-06-06', status: 'Reviewing' },
    { id: 'APP-0938', name: 'Sanjida Akhter', university: 'Technical University of Munich', country: 'Germany', course: 'MSc Data Science', date: '2026-06-05', status: 'Approved' },
    { id: 'APP-0937', name: 'Arif Chowdhury', university: 'University of Melbourne', country: 'Australia', course: 'MBA Global Business', date: '2026-06-04', status: 'Pending' },
  ]);

  // Destination Country Stats
  const destinations = [
    { country: 'United Kingdom', count: 582, percentage: 39, color: '#E09100' },
    { country: 'Canada', count: 358, percentage: 24, color: '#3b82f6' },
    { country: 'Australia', count: 298, percentage: 20, color: '#10b981' },
    { country: 'Germany', count: 149, percentage: 10, color: '#8b5cf6' },
    { country: 'United States', count: 95, percentage: 7, color: '#ef4444' },
  ];

  // Quick Task List
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Review application files for Tanvir Rahman', done: true },
    { id: 2, text: 'Schedule visa guidance call with Nusrat Jahan', done: false },
    { id: 3, text: 'Upload new tuition fee guidelines for Monash Uni', done: false },
  ]);

  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const handleLogout = () => {
    router.push('/admin');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return { bg: '#e8f5e9', text: '#2e7d32' };
      case 'Pending': return { bg: '#fff8e1', text: '#f57f17' };
      case 'Reviewing': return { bg: '#e3f2fd', text: '#1565c0' };
      default: return { bg: '#f5f5f5', text: '#616161' };
    }
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
        {activeTab === 'Settings' && activeSubTab === 'Destinations' ? (
          <>
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
                              <img 
                                src={`https://flagcdn.com/w40/${dest.code.toLowerCase()}.png`} 
                                alt={dest.name} 
                                style={{ height: '18px', borderRadius: '2px' }} 
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
                    <h2 style={{ fontSize: '1.2rem', fontWeight: 700, margin: 0 }}>Add New Study Destination</h2>
                    <button onClick={() => setIsDestModalOpen(false)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#64748b' }}>
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
                        onClick={() => setIsDestModalOpen(false)}
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
          </>
        ) : (
          <>
            {/* Header Bar */}
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', margin: 0, fontFamily: 'var(--font-sans), sans-serif' }}>
                  Welcome back, Admin
                </h1>
                <p style={{ fontSize: '0.875rem', color: '#64748b', margin: '0.2rem 0 0 0' }}>
                  Rowshanara Edu Management Portal Overview
                </p>
              </div>

              {/* Quick Actions Search & Notification */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '10px',
                    padding: '0.4rem 0.8rem',
                    width: '260px',
                  }}
                >
                  <Search size={16} color="#94a3b8" style={{ marginRight: '0.5rem' }} />
                  <input
                    type="text"
                    placeholder="Search queries, applications..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    style={{ border: 'none', outline: 'none', width: '100%', fontSize: '0.825rem', color: '#1e293b' }}
                  />
                </div>

                {/* Notification bell */}
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    position: 'relative',
                  }}
                >
                  <Bell size={18} color="#64748b" />
                  <span
                    style={{
                      position: 'absolute',
                      top: '6px',
                      right: '6px',
                      width: '7px',
                      height: '7px',
                      backgroundColor: '#ef4444',
                      borderRadius: '50%',
                    }}
                  ></span>
                </div>

                {/* Admin Avatar */}
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    backgroundColor: '#E09100',
                    color: '#ffffff',
                    borderRadius: '50%',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 2px 6px rgba(224, 145, 0, 0.25)',
                  }}
                >
                  AD
                </div>
              </div>
            </header>

            {/* Overview Metric Grid */}
            <section
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '1.5rem',
              }}
            >
              {[
                { title: 'Total Applications', value: '1,482', icon: <FileText size={20} color="#E09100" />, trend: '+12.4%', colorBg: 'rgba(224, 145, 0, 0.08)' },
                { title: 'Enrolled Students', value: '845', icon: <GraduationCap size={20} color="#3b82f6" />, trend: '+8.2%', colorBg: 'rgba(59, 130, 246, 0.08)' },
                { title: 'Partner Universities', value: '52', icon: <School size={20} color="#10b981" />, trend: '+4 new', colorBg: 'rgba(16, 185, 129, 0.08)' },
                { title: 'Consultations', value: '120', icon: <Users size={20} color="#8b5cf6" />, trend: 'Pending', colorBg: 'rgba(139, 92, 246, 0.08)' },
              ].map((card, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '16px',
                    padding: '1.25rem 1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.01), 0 2px 4px -1px rgba(0, 0, 0, 0.006)',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.02)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.01), 0 2px 4px -1px rgba(0, 0, 0, 0.006)';
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.775rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      {card.title}
                    </span>
                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        backgroundColor: card.colorBg,
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {card.icon}
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.6rem' }}>
                    <span style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a' }}>{card.value}</span>
                    <span
                      style={{
                        fontSize: '0.725rem',
                        fontWeight: 600,
                        color: card.trend.startsWith('+') ? '#10b981' : '#E09100',
                        backgroundColor: card.trend.startsWith('+') ? '#d1fae5' : '#fff3e0',
                        padding: '2px 6px',
                        borderRadius: '9999px',
                      }}
                    >
                      {card.trend}
                    </span>
                  </div>
                </div>
              ))}
            </section>

            {/* Data Workspace Section split layout */}
            <section
              style={{
                display: 'grid',
                gridTemplateColumns: '2fr 1fr',
                gap: '1.75rem',
              }}
            >
              {/* Left Block: Recent Student Applications */}
              <div
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '16px',
                  padding: '1.5rem',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.01)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.25rem',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h2 style={{ fontSize: '1rem', fontWeight: 700, margin: 0 }}>Recent Applications</h2>
                    <p style={{ fontSize: '0.75rem', color: '#64748b', margin: '0.1rem 0 0 0' }}>Latest student study abroad submissions</p>
                  </div>
                  <button
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      backgroundColor: '#E09100',
                      color: '#ffffff',
                      padding: '0.4rem 0.8rem',
                      borderRadius: '8px',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      border: 'none',
                    }}
                  >
                    <Plus size={14} />
                    <span>New Applicant</span>
                  </button>
                </div>

                {/* Applications Table */}
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.825rem' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid #f1f5f9', color: '#64748b', fontWeight: 600 }}>
                        <th style={{ padding: '0.75rem 0.5rem' }}>ID</th>
                        <th style={{ padding: '0.75rem 0.5rem' }}>Student</th>
                        <th style={{ padding: '0.75rem 0.5rem' }}>Destination</th>
                        <th style={{ padding: '0.75rem 0.5rem' }}>University</th>
                        <th style={{ padding: '0.75rem 0.5rem' }}>Date</th>
                        <th style={{ padding: '0.75rem 0.5rem' }}>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {applications.map((app) => {
                        const colors = getStatusColor(app.status);
                        return (
                          <tr key={app.id} style={{ borderBottom: '1px solid #f1f5f9', transition: 'background-color 0.1s' }}>
                            <td style={{ padding: '1rem 0.5rem', fontWeight: 600, color: '#64748b' }}>{app.id}</td>
                            <td style={{ padding: '1rem 0.5rem' }}>
                              <div>
                                <div style={{ fontWeight: 600, color: '#0f172a' }}>{app.name}</div>
                                <div style={{ fontSize: '0.725rem', color: '#94a3b8' }}>{app.course}</div>
                              </div>
                            </td>
                            <td style={{ padding: '1rem 0.5rem', color: '#334155' }}>{app.country}</td>
                            <td style={{ padding: '1rem 0.5rem', color: '#334155' }}>{app.university}</td>
                            <td style={{ padding: '1rem 0.5rem', color: '#64748b' }}>{app.date}</td>
                            <td style={{ padding: '1rem 0.5rem' }}>
                              <span
                                style={{
                                  backgroundColor: colors.bg,
                                  color: colors.text,
                                  padding: '2px 8px',
                                  borderRadius: '9999px',
                                  fontSize: '0.725rem',
                                  fontWeight: 600,
                                }}
                              >
                                {app.status}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Right Block: Destination Trends & Tasks */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
                
                {/* STUDY DESTINATION CHART CARD */}
                <div
                  style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '16px',
                    padding: '1.5rem',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.01)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.25rem',
                  }}
                >
                  <div>
                    <h2 style={{ fontSize: '1rem', fontWeight: 700, margin: 0 }}>Study Destinations</h2>
                    <p style={{ fontSize: '0.75rem', color: '#64748b', margin: '0.1rem 0 0 0' }}>Student queries by country</p>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                    {destinations.map((dest, idx) => (
                      <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.775rem', fontWeight: 600 }}>
                          <span style={{ color: '#334155' }}>{dest.country}</span>
                          <span style={{ color: '#64748b' }}>{dest.count} ({dest.percentage}%)</span>
                        </div>
                        {/* Visual Bar progress */}
                        <div style={{ width: '100%', height: '7px', backgroundColor: '#f1f5f9', borderRadius: '9999px', overflow: 'hidden' }}>
                          <div
                            style={{
                              height: '100%',
                              width: `${dest.percentage}%`,
                              backgroundColor: dest.color,
                              borderRadius: '9999px',
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* QUICK TASK MANAGER WIDGET */}
                <div
                  style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '16px',
                    padding: '1.5rem',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.01)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.25rem',
                  }}
                >
                  <div>
                    <h2 style={{ fontSize: '1rem', fontWeight: 700, margin: 0 }}>Action Items</h2>
                    <p style={{ fontSize: '0.75rem', color: '#64748b', margin: '0.1rem 0 0 0' }}>Daily administrative checklists</p>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {tasks.map((task) => (
                      <div
                        key={task.id}
                        onClick={() => toggleTask(task.id)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.75rem',
                          padding: '0.5rem',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          transition: 'background-color 0.2s',
                        }}
                        onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f8fafc'}
                        onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                      >
                        <div
                          style={{
                            width: '18px',
                            height: '18px',
                            borderRadius: '4px',
                            border: task.done ? 'none' : '1.5px solid #cbd5e1',
                            backgroundColor: task.done ? '#E09100' : 'transparent',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#ffffff',
                          }}
                        >
                          {task.done && <CheckCircle2 size={12} strokeWidth={3} />}
                        </div>
                        <span
                          style={{
                            fontSize: '0.8rem',
                            color: task.done ? '#94a3b8' : '#334155',
                            textDecoration: task.done ? 'line-through' : 'none',
                            transition: 'color 0.2s',
                          }}
                        >
                          {task.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}
