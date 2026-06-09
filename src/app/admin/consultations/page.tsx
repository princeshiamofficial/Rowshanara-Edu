"use client";

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search,
  Bell,
  Plus,
  Eye,
  X,
  ChevronDown,
  Download,
  CheckCircle2,
  Clock,
  XCircle,
  CalendarDays,
  Phone,
  Mail,
  MapPin,
  Globe,
  User,
  MessageSquare,
  Video,
  PhoneCall,
  ChevronLeft,
  ChevronRight,
  Pencil,
  Trash2,
  Flag,
  Users,
} from 'lucide-react';
import AdminSidebar from '@/components/admin/AdminSidebar';

// ─── Types ────────────────────────────────────────────────────────────────────
type ConsultStatus = 'Scheduled' | 'Completed' | 'Cancelled' | 'Pending';
type ConsultMode   = 'Video Call' | 'Phone Call' | 'In-Person';

interface Consultation {
  id: string;
  studentName: string;
  email: string;
  phone: string;
  nationality: string;
  targetCountry: string;
  targetLevel: string;
  consultant: string;
  consultantAvatar: string;
  mode: ConsultMode;
  date: string;
  time: string;
  duration: string;
  status: ConsultStatus;
  topic: string;
  notes: string;
  followUp: boolean;
  avatar: string;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────
const ALL_CONSULTATIONS: Consultation[] = [
  { id: 'CON-1041', studentName: 'Nusrat Jahan',     email: 'nusrat@example.com',   phone: '+880 1711-000002', nationality: 'Bangladeshi', targetCountry: 'Canada',         targetLevel: 'Bachelors', consultant: 'Anika Sultana',  consultantAvatar: 'AS', mode: 'Video Call',  date: '2026-06-12', time: '10:00 AM', duration: '45 min', status: 'Scheduled',  topic: 'University shortlisting for BBA Finance', notes: 'Student prefers Toronto or Vancouver. Budget: $18k/yr.', followUp: false, avatar: 'NJ' },
  { id: 'CON-1040', studentName: 'Arif Chowdhury',   email: 'arif@example.com',     phone: '+880 1711-000005', nationality: 'Bangladeshi', targetCountry: 'Australia',      targetLevel: 'Masters',   consultant: 'Rafiq Ahmed',    consultantAvatar: 'RA', mode: 'Phone Call',  date: '2026-06-11', time: '02:30 PM', duration: '30 min', status: 'Scheduled',  topic: 'Visa requirements and timeline', notes: 'Previously rejected Canadian visa. Needs alternate route.', followUp: true, avatar: 'AC' },
  { id: 'CON-1039', studentName: 'Farhana Begum',    email: 'farhana@example.com',  phone: '+880 1711-000012', nationality: 'Bangladeshi', targetCountry: 'New Zealand',    targetLevel: 'Bachelors', consultant: 'Anika Sultana',  consultantAvatar: 'AS', mode: 'In-Person',   date: '2026-06-10', time: '11:00 AM', duration: '60 min', status: 'Scheduled',  topic: 'IELTS score review & application plan', notes: 'IELTS score 5.5, needs 6.5. Counselling for retake.', followUp: false, avatar: 'FB' },
  { id: 'CON-1038', studentName: 'Imran Hossain',    email: 'imran@example.com',    phone: '+880 1711-000009', nationality: 'Bangladeshi', targetCountry: 'Germany',        targetLevel: 'Masters',   consultant: 'Tariq Hassan',   consultantAvatar: 'TH', mode: 'Video Call',  date: '2026-06-09', time: '03:00 PM', duration: '45 min', status: 'Completed',  topic: 'Language requirement & blocked account', notes: 'Advised to open Deutsche Bank blocked account. Referred to Goethe-Institut.', followUp: true, avatar: 'IH' },
  { id: 'CON-1037', studentName: 'Karim Uddin',      email: 'karim@example.com',    phone: '+880 1711-000011', nationality: 'Bangladeshi', targetCountry: 'Netherlands',    targetLevel: 'Masters',   consultant: 'Rafiq Ahmed',    consultantAvatar: 'RA', mode: 'Video Call',  date: '2026-06-08', time: '10:30 AM', duration: '30 min', status: 'Completed',  topic: 'LLM programme options at Leiden', notes: 'Shortlisted Leiden & Utrecht. Follow-up SOP session booked.', followUp: false, avatar: 'KU' },
  { id: 'CON-1036', studentName: 'Rabeya Sultana',   email: 'rabeya@example.com',   phone: '+880 1711-000006', nationality: 'Bangladeshi', targetCountry: 'United Kingdom', targetLevel: 'Masters',   consultant: 'Anika Sultana',  consultantAvatar: 'AS', mode: 'Phone Call',  date: '2026-06-07', time: '04:00 PM', duration: '30 min', status: 'Cancelled',  topic: 'Re-application strategy after rejection', notes: 'Student cancelled at last minute. Rescheduling needed.', followUp: true, avatar: 'RS' },
  { id: 'CON-1035', studentName: 'Mehedi Hasan',     email: 'mehedi@example.com',   phone: '+880 1711-000007', nationality: 'Bangladeshi', targetCountry: 'Canada',         targetLevel: 'Bachelors', consultant: 'Tariq Hassan',   consultantAvatar: 'TH', mode: 'In-Person',   date: '2026-06-06', time: '12:00 PM', duration: '60 min', status: 'Completed',  topic: 'Scholarship opportunities at McGill', notes: 'Conditional offer received. Guided on next steps.', followUp: false, avatar: 'MH' },
  { id: 'CON-1034', studentName: 'Sharmin Akter',    email: 'sharmin@example.com',  phone: '+880 1711-000008', nationality: 'Bangladeshi', targetCountry: 'Australia',      targetLevel: 'Doctorate', consultant: 'Rafiq Ahmed',    consultantAvatar: 'RA', mode: 'Video Call',  date: '2026-06-05', time: '09:30 AM', duration: '60 min', status: 'Completed',  topic: 'PhD supervisor outreach strategy', notes: 'Reviewed 3 potential supervisors. Email templates provided.', followUp: true, avatar: 'SA' },
  { id: 'CON-1033', studentName: 'Tania Islam',      email: 'tania@example.com',    phone: '+880 1711-000010', nationality: 'Bangladeshi', targetCountry: 'United States',  targetLevel: 'Masters',   consultant: 'Anika Sultana',  consultantAvatar: 'AS', mode: 'Video Call',  date: '2026-06-13', time: '01:00 PM', duration: '45 min', status: 'Pending',    topic: 'GRE score evaluation & program fit', notes: 'Awaiting GRE result. Session tentatively booked.', followUp: false, avatar: 'TI' },
  { id: 'CON-1032', studentName: 'Tanvir Rahman',    email: 'tanvir@example.com',   phone: '+880 1711-000001', nationality: 'Bangladeshi', targetCountry: 'United Kingdom', targetLevel: 'Masters',   consultant: 'Tariq Hassan',   consultantAvatar: 'TH', mode: 'In-Person',   date: '2026-06-14', time: '11:30 AM', duration: '30 min', status: 'Pending',    topic: 'Post-offer visa appointment booking', notes: 'Oxford offer confirmed. Visa appointment guidance needed.', followUp: false, avatar: 'TR' },
  { id: 'CON-1031', studentName: 'Sanjida Akhter',   email: 'sanjida@example.com',  phone: '+880 1711-000004', nationality: 'Bangladeshi', targetCountry: 'Germany',        targetLevel: 'Masters',   consultant: 'Rafiq Ahmed',    consultantAvatar: 'RA', mode: 'Phone Call',  date: '2026-06-04', time: '03:30 PM', duration: '30 min', status: 'Completed',  topic: 'Scholarship confirmation at TU Munich', notes: 'Partial scholarship confirmed. Budget gap covered by part-time plan.', followUp: true, avatar: 'SA' },
  { id: 'CON-1030', studentName: 'Fahim Shakil',     email: 'fahim@example.com',    phone: '+880 1711-000003', nationality: 'Bangladeshi', targetCountry: 'Australia',      targetLevel: 'Bachelors', consultant: 'Anika Sultana',  consultantAvatar: 'AS', mode: 'Video Call',  date: '2026-06-03', time: '02:00 PM', duration: '45 min', status: 'Cancelled',  topic: 'Application status review & timeline', notes: 'Student unreachable. Second attempt scheduled.', followUp: true, avatar: 'FS' },
];

// ─── Config ───────────────────────────────────────────────────────────────────
type StatusCfg = { bg: string; text: string; border: string; icon: React.ReactNode };

const STATUS_CFG: Record<ConsultStatus, StatusCfg> = {
  Scheduled: { bg: '#eff6ff', text: '#1e40af', border: '#bfdbfe', icon: <CalendarDays size={12} /> },
  Completed: { bg: '#ecfdf5', text: '#065f46', border: '#a7f3d0', icon: <CheckCircle2 size={12} /> },
  Cancelled: { bg: '#fef2f2', text: '#991b1b', border: '#fecaca', icon: <XCircle size={12} /> },
  Pending:   { bg: '#fffbeb', text: '#92400e', border: '#fcd34d', icon: <Clock size={12} /> },
};

const MODE_CFG: Record<ConsultMode, { icon: React.ReactNode; color: string }> = {
  'Video Call':  { icon: <Video size={13} />,    color: '#3b82f6' },
  'Phone Call':  { icon: <PhoneCall size={13} />, color: '#10b981' },
  'In-Person':   { icon: <Users size={13} />,    color: '#8b5cf6' },
};

const AVATAR_COLORS: Record<string, string> = {
  NJ: '#3b82f6', AC: '#f43f5e', FB: '#ec4899', IH: '#f97316',
  KU: '#a855f7', RS: '#64748b', MH: '#06b6d4', SA: '#8b5cf6',
  TI: '#84cc16', TR: '#E09100', FS: '#10b981',
  AS: '#E09100', RA: '#3b82f6', TH: '#10b981',
};

const CONSULTANTS = ['All', 'Anika Sultana', 'Rafiq Ahmed', 'Tariq Hassan'];
const PAGE_SIZE = 8;

// ─── Main Component ───────────────────────────────────────────────────────────
export default function ConsultationsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('Consultations');
  const [searchQuery, setSearchQuery]     = useState('');
  const [statusFilter, setStatusFilter]   = useState<'All' | ConsultStatus>('All');
  const [consultantFilter, setConsultantFilter] = useState('All');
  const [modeFilter, setModeFilter]       = useState('All');
  const [currentPage, setCurrentPage]     = useState(1);
  const [selectedItem, setSelectedItem]   = useState<Consultation | null>(null);
  const [statusDropdown, setStatusDropdown] = useState<string | null>(null);
  const [consultations, setConsultations] = useState<Consultation[]>(ALL_CONSULTATIONS);

  // ── Derived ──
  const counts = useMemo(() => ({
    All:       consultations.length,
    Scheduled: consultations.filter(c => c.status === 'Scheduled').length,
    Completed: consultations.filter(c => c.status === 'Completed').length,
    Pending:   consultations.filter(c => c.status === 'Pending').length,
    Cancelled: consultations.filter(c => c.status === 'Cancelled').length,
  }), [consultations]);

  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return consultations.filter(c => {
      const matchSearch     = !q || c.studentName.toLowerCase().includes(q) || c.id.toLowerCase().includes(q) || c.topic.toLowerCase().includes(q) || c.consultant.toLowerCase().includes(q);
      const matchStatus     = statusFilter === 'All' || c.status === statusFilter;
      const matchConsultant = consultantFilter === 'All' || c.consultant === consultantFilter;
      const matchMode       = modeFilter === 'All' || c.mode === modeFilter;
      return matchSearch && matchStatus && matchConsultant && matchMode;
    });
  }, [consultations, searchQuery, statusFilter, consultantFilter, modeFilter]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated  = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const updateStatus = (id: string, newStatus: ConsultStatus) => {
    setConsultations(prev => prev.map(c => c.id === id ? { ...c, status: newStatus } : c));
    if (selectedItem?.id === id) setSelectedItem(prev => prev ? { ...prev, status: newStatus } : null);
    setStatusDropdown(null);
  };

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', width: '100vw', backgroundColor: '#f8fafc', fontFamily: 'var(--font-sans), system-ui, -apple-system, sans-serif', color: '#0f172a' }}>

      {/* Sidebar */}
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={(tab) => { setActiveTab(tab); if (tab === 'Dashboard') router.push('/admin/dashboard'); if (tab === 'Applications') router.push('/admin/applications'); }}
        onLogout={() => router.push('/admin')}
      />

      {/* Main Panel */}
      <main style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto', padding: '2.5rem 3rem', gap: '1.75rem' }}>

        {/* ── Header ── */}
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>Consultations</h1>
            <p style={{ fontSize: '0.875rem', color: '#64748b', margin: '0.2rem 0 0 0' }}>
              Manage student consultation sessions, schedules, and follow-ups
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '0.4rem 0.8rem', width: '240px' }}>
              <Search size={15} color="#94a3b8" style={{ marginRight: '0.5rem', flexShrink: 0 }} />
              <input
                type="text"
                placeholder="Search by name, ID, topic…"
                value={searchQuery}
                onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                style={{ border: 'none', outline: 'none', width: '100%', fontSize: '0.8rem', color: '#1e293b', background: 'transparent' }}
              />
            </div>
            <div style={{ width: '38px', height: '38px', backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', position: 'relative' }}>
              <Bell size={18} color="#64748b" />
              <span style={{ position: 'absolute', top: '6px', right: '6px', width: '7px', height: '7px', backgroundColor: '#ef4444', borderRadius: '50%' }} />
            </div>
            <div style={{ width: '38px', height: '38px', backgroundColor: '#E09100', color: '#fff', borderRadius: '50%', fontWeight: 700, fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 6px rgba(224,145,0,0.25)' }}>
              AD
            </div>
          </div>
        </header>


        {/* ── Status Pills ── */}
        <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
          {(['All', 'Scheduled', 'Completed', 'Pending', 'Cancelled'] as const).map(s => {
            const isActive = statusFilter === s;
            const cfg = s !== 'All' ? STATUS_CFG[s] : null;
            return (
              <button
                key={s}
                onClick={() => { setStatusFilter(s); setCurrentPage(1); }}
                style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.38rem 0.9rem', borderRadius: '9999px', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer', border: '1.5px solid', borderColor: isActive ? (cfg?.border ?? '#cbd5e1') : '#e2e8f0', backgroundColor: isActive ? (cfg?.bg ?? '#fff') : '#fff', color: isActive ? (cfg?.text ?? '#0f172a') : '#64748b', transition: 'all 0.15s' }}
              >
                {cfg && <span>{cfg.icon}</span>}
                {s}
                <span style={{ backgroundColor: isActive ? (cfg?.text ?? '#0f172a') : '#e2e8f0', color: isActive ? '#fff' : '#475569', borderRadius: '9999px', padding: '1px 6px', fontSize: '0.68rem', fontWeight: 700 }}>
                  {counts[s]}
                </span>
              </button>
            );
          })}
        </div>

        {/* ── Filter Bar ── */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <SelectFilter label="Consultant" value={consultantFilter} options={CONSULTANTS} onChange={v => { setConsultantFilter(v); setCurrentPage(1); }} />
            <SelectFilter label="Mode" value={modeFilter} options={['All', 'Video Call', 'Phone Call', 'In-Person']} onChange={v => { setModeFilter(v); setCurrentPage(1); }} />
          </div>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.45rem 1rem', borderRadius: '8px', border: '1px solid #e2e8f0', backgroundColor: '#fff', fontSize: '0.8rem', fontWeight: 600, color: '#475569', cursor: 'pointer' }}>
              <Download size={14} /> Export CSV
            </button>
            <button style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.45rem 1rem', borderRadius: '8px', border: 'none', backgroundColor: '#E09100', fontSize: '0.8rem', fontWeight: 600, color: '#fff', cursor: 'pointer' }}>
              <Plus size={14} /> Book Session
            </button>
          </div>
        </div>

        {/* ── Table ── */}
        <div style={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '16px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)', overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.825rem', textAlign: 'left' }}>
              <thead>
                <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                  {['Session ID', 'Student', 'Consultant', 'Topic', 'Mode', 'Date & Time', 'Duration', 'Follow-Up', 'Status', 'Actions'].map(h => (
                    <th key={h} style={{ padding: '0.9rem 1rem', fontWeight: 700, fontSize: '0.72rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginated.length === 0 ? (
                  <tr>
                    <td colSpan={10} style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8', fontSize: '0.875rem' }}>
                      No consultations found matching your filters.
                    </td>
                  </tr>
                ) : paginated.map(c => {
                  const sCfg  = STATUS_CFG[c.status];
                  const mCfg  = MODE_CFG[c.mode];
                  const sColor = AVATAR_COLORS[c.avatar] ?? '#E09100';
                  const cColor = AVATAR_COLORS[c.consultantAvatar] ?? '#64748b';
                  return (
                    <tr key={c.id} style={{ borderBottom: '1px solid #f1f5f9', transition: 'background-color 0.1s' }}
                      onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#fafbfc')}
                      onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                    >
                      {/* ID */}
                      <td style={{ padding: '0.9rem 1rem', fontWeight: 700, color: '#64748b', fontFamily: 'monospace', fontSize: '0.75rem' }}>{c.id}</td>

                      {/* Student */}
                      <td style={{ padding: '0.9rem 1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                          <div style={{ width: '30px', height: '30px', borderRadius: '50%', backgroundColor: sColor, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem', fontWeight: 800, flexShrink: 0 }}>{c.avatar}</div>
                          <div>
                            <div style={{ fontWeight: 700, color: '#0f172a', whiteSpace: 'nowrap' }}>{c.studentName}</div>
                            <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{c.nationality}</div>
                          </div>
                        </div>
                      </td>

                      {/* Consultant */}
                      <td style={{ padding: '0.9rem 1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <div style={{ width: '26px', height: '26px', borderRadius: '50%', backgroundColor: cColor, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.55rem', fontWeight: 800, flexShrink: 0 }}>{c.consultantAvatar}</div>
                          <span style={{ color: '#334155', fontWeight: 600, fontSize: '0.8rem', whiteSpace: 'nowrap' }}>{c.consultant}</span>
                        </div>
                      </td>

                      {/* Topic */}
                      <td style={{ padding: '0.9rem 1rem', maxWidth: '200px' }}>
                        <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: '#334155', fontWeight: 500 }} title={c.topic}>{c.topic}</div>
                      </td>

                      {/* Mode */}
                      <td style={{ padding: '0.9rem 1rem' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: mCfg.color, fontWeight: 600, fontSize: '0.78rem', whiteSpace: 'nowrap' }}>
                          {mCfg.icon} {c.mode}
                        </span>
                      </td>

                      {/* Date & Time */}
                      <td style={{ padding: '0.9rem 1rem', whiteSpace: 'nowrap' }}>
                        <div style={{ fontWeight: 600, color: '#0f172a', fontSize: '0.8rem' }}>{c.date}</div>
                        <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>{c.time}</div>
                      </td>

                      {/* Duration */}
                      <td style={{ padding: '0.9rem 1rem' }}>
                        <span style={{ backgroundColor: '#f1f5f9', color: '#475569', padding: '2px 8px', borderRadius: '6px', fontSize: '0.73rem', fontWeight: 600 }}>{c.duration}</span>
                      </td>

                      {/* Follow-Up */}
                      <td style={{ padding: '0.9rem 1rem' }}>
                        {c.followUp
                          ? <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#E09100', fontWeight: 700, fontSize: '0.75rem' }}><Flag size={12} /> Required</span>
                          : <span style={{ color: '#cbd5e1', fontSize: '0.75rem' }}>—</span>
                        }
                      </td>

                      {/* Status */}
                      <td style={{ padding: '0.9rem 1rem' }}>
                        <div style={{ position: 'relative' }}>
                          <button
                            onClick={() => setStatusDropdown(statusDropdown === c.id ? null : c.id)}
                            style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', backgroundColor: sCfg.bg, color: sCfg.text, border: `1px solid ${sCfg.border}`, borderRadius: '9999px', padding: '3px 10px', fontSize: '0.72rem', fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap' }}
                          >
                            {sCfg.icon} {c.status} <ChevronDown size={10} />
                          </button>
                          {statusDropdown === c.id && (
                            <div style={{ position: 'absolute', top: '100%', left: 0, marginTop: '4px', backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '10px', boxShadow: '0 8px 24px rgba(0,0,0,0.1)', zIndex: 50, minWidth: '140px', overflow: 'hidden' }}>
                              {(['Scheduled', 'Completed', 'Pending', 'Cancelled'] as ConsultStatus[]).map(s => {
                                const sc = STATUS_CFG[s];
                                return (
                                  <button key={s} onClick={() => updateStatus(c.id, s)}
                                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', width: '100%', padding: '0.5rem 0.75rem', border: 'none', background: c.status === s ? sc.bg : 'transparent', color: sc.text, fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer', textAlign: 'left' }}
                                  >
                                    {sc.icon} {s}
                                  </button>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Actions */}
                      <td style={{ padding: '0.9rem 1rem' }}>
                        <button
                          onClick={() => setSelectedItem(c)}
                          style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', padding: '0.32rem 0.7rem', borderRadius: '7px', border: '1px solid #e2e8f0', backgroundColor: '#fff', fontSize: '0.77rem', fontWeight: 600, color: '#475569', cursor: 'pointer', transition: 'all 0.15s' }}
                          onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#f8fafc'; e.currentTarget.style.borderColor = '#cbd5e1'; }}
                          onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#fff'; e.currentTarget.style.borderColor = '#e2e8f0'; }}
                        >
                          <Eye size={13} /> View
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.25rem', borderTop: '1px solid #f1f5f9' }}>
              <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                Showing {(currentPage - 1) * PAGE_SIZE + 1}–{Math.min(currentPage * PAGE_SIZE, filtered.length)} of {filtered.length} consultations
              </span>
              <div style={{ display: 'flex', gap: '0.4rem' }}>
                <PageBtn onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}><ChevronLeft size={14} /></PageBtn>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                  <PageBtn key={p} onClick={() => setCurrentPage(p)} active={p === currentPage}>{p}</PageBtn>
                ))}
                <PageBtn onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}><ChevronRight size={14} /></PageBtn>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* ── Detail Slide-over ── */}
      {selectedItem && (
        <div
          style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15,23,42,0.45)', backdropFilter: 'blur(4px)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}
          onClick={() => setSelectedItem(null)}
        >
          <div
            style={{ width: '500px', height: '100vh', backgroundColor: '#fff', boxShadow: '-4px 0 40px rgba(0,0,0,0.15)', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div style={{ padding: '1.5rem 1.75rem', borderBottom: '1px solid #f1f5f9', position: 'sticky', top: 0, backgroundColor: '#fff', zIndex: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ fontSize: '0.7rem', fontFamily: 'monospace', color: '#94a3b8', fontWeight: 700, marginBottom: '0.25rem' }}>{selectedItem.id}</div>
                  <h2 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800 }}>{selectedItem.studentName}</h2>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', backgroundColor: STATUS_CFG[selectedItem.status].bg, color: STATUS_CFG[selectedItem.status].text, border: `1px solid ${STATUS_CFG[selectedItem.status].border}`, padding: '3px 10px', borderRadius: '9999px', fontSize: '0.72rem', fontWeight: 700 }}>
                      {STATUS_CFG[selectedItem.status].icon} {selectedItem.status}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: MODE_CFG[selectedItem.mode].color, fontSize: '0.75rem', fontWeight: 600 }}>
                      {MODE_CFG[selectedItem.mode].icon} {selectedItem.mode}
                    </span>
                    {selectedItem.followUp && (
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#E09100', fontSize: '0.72rem', fontWeight: 700 }}>
                        <Flag size={11} /> Follow-Up Required
                      </span>
                    )}
                  </div>
                </div>
                <button onClick={() => setSelectedItem(null)} style={{ border: 'none', background: '#f1f5f9', borderRadius: '8px', padding: '0.4rem', cursor: 'pointer', color: '#64748b', display: 'flex', alignItems: 'center' }}>
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div style={{ padding: '1.5rem 1.75rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', flex: 1 }}>

              {/* Session Info */}
              <Section title="Session Details">
                <DetailRow icon={<CalendarDays size={14} />} label="Date"       value={selectedItem.date} />
                <DetailRow icon={<Clock size={14} />}        label="Time"       value={selectedItem.time} />
                <DetailRow icon={<Clock size={14} />}        label="Duration"   value={selectedItem.duration} />
                <DetailRow icon={MODE_CFG[selectedItem.mode].icon} label="Mode" value={selectedItem.mode} />
              </Section>

              {/* Topic */}
              <Section title="Consultation Topic">
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#0f172a', fontWeight: 600, lineHeight: 1.5 }}>{selectedItem.topic}</p>
              </Section>

              {/* Student Info */}
              <Section title="Student Information">
                <DetailRow icon={<Mail size={14} />}    label="Email"          value={selectedItem.email} />
                <DetailRow icon={<Phone size={14} />}   label="Phone"          value={selectedItem.phone} />
                <DetailRow icon={<MapPin size={14} />}  label="Nationality"    value={selectedItem.nationality} />
                <DetailRow icon={<Globe size={14} />}   label="Target Country" value={selectedItem.targetCountry} />
                <DetailRow icon={<Flag size={14} />}    label="Study Level"    value={selectedItem.targetLevel} />
              </Section>

              {/* Consultant */}
              <Section title="Assigned Consultant">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', backgroundColor: '#f8fafc', borderRadius: '10px' }}>
                  <div style={{ width: '38px', height: '38px', borderRadius: '50%', backgroundColor: AVATAR_COLORS[selectedItem.consultantAvatar] ?? '#64748b', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 800, flexShrink: 0 }}>
                    {selectedItem.consultantAvatar}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.875rem' }}>{selectedItem.consultant}</div>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Senior Education Consultant</div>
                  </div>
                </div>
              </Section>

              {/* Admin Notes */}
              <Section title="Session Notes">
                <p style={{ margin: 0, fontSize: '0.825rem', color: '#475569', lineHeight: 1.6, backgroundColor: '#f8fafc', padding: '0.75rem', borderRadius: '8px', borderLeft: '3px solid #E09100' }}>
                  {selectedItem.notes}
                </p>
              </Section>

              {/* Status Changer */}
              <Section title="Update Status">
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {(['Scheduled', 'Completed', 'Pending', 'Cancelled'] as ConsultStatus[]).map(s => {
                    const sc = STATUS_CFG[s];
                    const isActive = selectedItem.status === s;
                    return (
                      <button
                        key={s}
                        onClick={() => updateStatus(selectedItem.id, s)}
                        style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', padding: '0.4rem 0.9rem', borderRadius: '9999px', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer', border: `1.5px solid ${isActive ? sc.border : '#e2e8f0'}`, backgroundColor: isActive ? sc.bg : '#fff', color: isActive ? sc.text : '#94a3b8', transition: 'all 0.15s' }}
                      >
                        {sc.icon} {s}
                      </button>
                    );
                  })}
                </div>
              </Section>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '0.75rem', paddingTop: '0.5rem', borderTop: '1px solid #f1f5f9', marginTop: 'auto' }}>
                <button style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', padding: '0.6rem', borderRadius: '10px', border: '1px solid #e2e8f0', backgroundColor: '#fff', fontSize: '0.825rem', fontWeight: 600, color: '#475569', cursor: 'pointer' }}>
                  <Pencil size={14} /> Edit Session
                </button>
                <button style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', padding: '0.6rem', borderRadius: '10px', border: 'none', backgroundColor: '#E09100', fontSize: '0.825rem', fontWeight: 600, color: '#fff', cursor: 'pointer' }}>
                  <MessageSquare size={14} /> Send Reminder
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Close dropdowns on outside click */}
      {statusDropdown && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 40 }} onClick={() => setStatusDropdown(null)} />
      )}
    </div>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <div style={{ fontSize: '0.68rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{title}</div>
      {children}
    </div>
  );
}

function DetailRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
      <span style={{ color: '#94a3b8', display: 'flex', alignItems: 'center', marginTop: '1px', flexShrink: 0 }}>{icon}</span>
      <span style={{ fontSize: '0.78rem', color: '#94a3b8', minWidth: '110px', flexShrink: 0 }}>{label}</span>
      <span style={{ fontSize: '0.825rem', color: '#0f172a', fontWeight: 600 }}>{value}</span>
    </div>
  );
}

function SelectFilter({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (v: string) => void }) {
  return (
    <div style={{ position: 'relative' }}>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{ appearance: 'none', WebkitAppearance: 'none', padding: '0.4rem 2rem 0.4rem 0.75rem', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 600, color: '#475569', backgroundColor: '#fff', cursor: 'pointer', outline: 'none' }}
      >
        {options.map(o => <option key={o} value={o}>{o === 'All' ? `All ${label}s` : o}</option>)}
      </select>
      <ChevronDown size={13} color="#94a3b8" style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
    </div>
  );
}

function PageBtn({ onClick, disabled, active, children }: { onClick: () => void; disabled?: boolean; active?: boolean; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{ width: '32px', height: '32px', borderRadius: '7px', border: '1px solid', borderColor: active ? '#E09100' : '#e2e8f0', backgroundColor: active ? '#E09100' : disabled ? '#f8fafc' : '#fff', color: active ? '#fff' : disabled ? '#cbd5e1' : '#475569', fontSize: '0.78rem', fontWeight: 600, cursor: disabled ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s' }}
    >
      {children}
    </button>
  );
}
