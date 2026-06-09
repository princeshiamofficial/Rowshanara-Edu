"use client";

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import {
  GraduationCap,
  Search,
  Bell,
  Filter,
  Plus,
  Eye,
  X,
  ChevronDown,
  Download,
  CheckCircle2,
  Clock,
  AlertCircle,
  XCircle,
  FileText,
  Mail,
  Phone,
  MapPin,
  Calendar,
  School,
  BookOpen,
  Globe,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import AdminSidebar from '@/components/admin/AdminSidebar';

// ─── Types ──────────────────────────────────────────────────────────────────
type Status = 'Approved' | 'Pending' | 'Reviewing' | 'Rejected';

interface Application {
  id: string;
  name: string;
  email: string;
  phone: string;
  nationality: string;
  university: string;
  country: string;
  course: string;
  level: string;
  intake: string;
  appliedDate: string;
  status: Status;
  documents: string[];
  notes: string;
  avatar: string;
}

// ─── Mock Data ───────────────────────────────────────────────────────────────
const ALL_APPLICATIONS: Application[] = [
  { id: 'APP-0941', name: 'Tanvir Rahman',    email: 'tanvir@example.com',    phone: '+880 1711-000001', nationality: 'Bangladesh', university: 'University of Oxford',           country: 'United Kingdom', course: 'MSc Computer Science',      level: 'Masters',      intake: 'Sep 2026', appliedDate: '2026-06-08', status: 'Approved',   documents: ['Passport', 'Transcripts', 'SOP', 'IELTS'], notes: 'Strong academic background. Visa approved.', avatar: 'TR' },
  { id: 'APP-0940', name: 'Nusrat Jahan',     email: 'nusrat@example.com',    phone: '+880 1711-000002', nationality: 'Bangladesh', university: 'University of Toronto',          country: 'Canada',         course: 'BBA Finance',               level: 'Bachelors',    intake: 'Jan 2026', appliedDate: '2026-06-07', status: 'Pending',    documents: ['Passport', 'Transcripts', 'SOP'],          notes: 'Awaiting financial documents.',              avatar: 'NJ' },
  { id: 'APP-0939', name: 'Fahim Shakil',     email: 'fahim@example.com',     phone: '+880 1711-000003', nationality: 'Bangladesh', university: 'Monash University',              country: 'Australia',      course: 'BSc Software Engineering',  level: 'Bachelors',    intake: 'Feb 2027', appliedDate: '2026-06-06', status: 'Reviewing',  documents: ['Passport', 'Transcripts'],                 notes: 'Admission review in progress.',              avatar: 'FS' },
  { id: 'APP-0938', name: 'Sanjida Akhter',   email: 'sanjida@example.com',   phone: '+880 1711-000004', nationality: 'Bangladesh', university: 'Technical University of Munich', country: 'Germany',        course: 'MSc Data Science',          level: 'Masters',      intake: 'Oct 2026', appliedDate: '2026-06-05', status: 'Approved',   documents: ['Passport', 'Transcripts', 'SOP', 'GRE'],   notes: 'Scholarship partially confirmed.',           avatar: 'SA' },
  { id: 'APP-0937', name: 'Arif Chowdhury',   email: 'arif@example.com',      phone: '+880 1711-000005', nationality: 'Bangladesh', university: 'University of Melbourne',        country: 'Australia',      course: 'MBA Global Business',       level: 'Masters',      intake: 'Sep 2026', appliedDate: '2026-06-04', status: 'Pending',    documents: ['Passport', 'Transcripts', 'SOP'],          notes: 'Letter of reference pending.',               avatar: 'AC' },
  { id: 'APP-0936', name: 'Rabeya Sultana',   email: 'rabeya@example.com',    phone: '+880 1711-000006', nationality: 'Bangladesh', university: 'University of Edinburgh',        country: 'United Kingdom', course: 'MSc International Law',     level: 'Masters',      intake: 'Sep 2026', appliedDate: '2026-06-03', status: 'Rejected',   documents: ['Passport', 'Transcripts'],                 notes: 'Application unsuccessful. IELTS score low.',avatar: 'RS' },
  { id: 'APP-0935', name: 'Mehedi Hasan',     email: 'mehedi@example.com',    phone: '+880 1711-000007', nationality: 'Bangladesh', university: 'McGill University',              country: 'Canada',         course: 'BSc Biotechnology',         level: 'Bachelors',    intake: 'Sep 2026', appliedDate: '2026-06-02', status: 'Approved',   documents: ['Passport', 'Transcripts', 'SOP', 'IELTS'], notes: 'Conditional offer received.',                avatar: 'MH' },
  { id: 'APP-0934', name: 'Sharmin Akter',    email: 'sharmin@example.com',   phone: '+880 1711-000008', nationality: 'Bangladesh', university: 'University of Queensland',       country: 'Australia',      course: 'PhD Environmental Science', level: 'Doctorate',    intake: 'Feb 2027', appliedDate: '2026-06-01', status: 'Reviewing',  documents: ['Passport', 'Transcripts', 'Research Proposal'], notes: 'Supervisor match in progress.',         avatar: 'SA' },
  { id: 'APP-0933', name: 'Imran Hossain',    email: 'imran@example.com',     phone: '+880 1711-000009', nationality: 'Bangladesh', university: 'Freie Universität Berlin',       country: 'Germany',        course: 'MA Political Science',      level: 'Masters',      intake: 'Oct 2026', appliedDate: '2026-05-30', status: 'Pending',    documents: ['Passport', 'Transcripts'],                 notes: 'German language test pending.',              avatar: 'IH' },
  { id: 'APP-0932', name: 'Tania Islam',      email: 'tania@example.com',     phone: '+880 1711-000010', nationality: 'Bangladesh', university: 'Boston University',              country: 'United States',  course: 'MS Public Health',          level: 'Masters',      intake: 'Jan 2027', appliedDate: '2026-05-28', status: 'Approved',   documents: ['Passport', 'Transcripts', 'SOP', 'GRE'],   notes: 'Full scholarship awarded.',                  avatar: 'TI' },
  { id: 'APP-0931', name: 'Karim Uddin',      email: 'karim@example.com',     phone: '+880 1711-000011', nationality: 'Bangladesh', university: 'Leiden University',              country: 'Netherlands',    course: 'LLM International Trade',   level: 'Masters',      intake: 'Sep 2026', appliedDate: '2026-05-25', status: 'Reviewing',  documents: ['Passport', 'Transcripts', 'SOP'],          notes: 'Under departmental review.',                 avatar: 'KU' },
  { id: 'APP-0930', name: 'Farhana Begum',    email: 'farhana@example.com',   phone: '+880 1711-000012', nationality: 'Bangladesh', university: 'University of Auckland',         country: 'New Zealand',    course: 'BEd Primary Education',     level: 'Bachelors',    intake: 'Feb 2027', appliedDate: '2026-05-22', status: 'Pending',    documents: ['Passport', 'Transcripts'],                 notes: 'Missing IELTS certificate.',                 avatar: 'FB' },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────
const STATUS_CONFIG: Record<Status, { bg: string; text: string; border: string; icon: React.ReactNode }> = {
  Approved:  { bg: '#ecfdf5', text: '#065f46', border: '#a7f3d0', icon: <CheckCircle2 size={12} /> },
  Pending:   { bg: '#fffbeb', text: '#92400e', border: '#fcd34d', icon: <Clock size={12} /> },
  Reviewing: { bg: '#eff6ff', text: '#1e40af', border: '#bfdbfe', icon: <AlertCircle size={12} /> },
  Rejected:  { bg: '#fef2f2', text: '#991b1b', border: '#fecaca', icon: <XCircle size={12} /> },
};

const AVATAR_COLORS: Record<string, string> = {
  TR: '#E09100', NJ: '#3b82f6', FS: '#10b981', SA: '#8b5cf6',
  AC: '#f43f5e', RS: '#64748b', MH: '#06b6d4', IH: '#f97316',
  TI: '#84cc16', KU: '#a855f7', FB: '#ec4899',
};

const PAGE_SIZE = 12;

// ─── Component ───────────────────────────────────────────────────────────────
export default function ApplicationsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('Applications');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | Status>('All');
  const [countryFilter, setCountryFilter] = useState('All');
  const [levelFilter, setLevelFilter] = useState('All');
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showStatusDropdown, setShowStatusDropdown] = useState<string | null>(null);
  const [applications, setApplications] = useState<Application[]>(ALL_APPLICATIONS);

  // ── Derived Lists ──
  const countries = useMemo(() => ['All', ...Array.from(new Set(applications.map(a => a.country)))], [applications]);
  const levels    = useMemo(() => ['All', ...Array.from(new Set(applications.map(a => a.level)))], [applications]);

  const filtered = useMemo(() => {
    return applications.filter(app => {
      const q = searchQuery.toLowerCase();
      const matchSearch = !q || app.name.toLowerCase().includes(q) || app.id.toLowerCase().includes(q) || app.university.toLowerCase().includes(q) || app.course.toLowerCase().includes(q);
      const matchStatus  = statusFilter === 'All' || app.status === statusFilter;
      const matchCountry = countryFilter === 'All' || app.country === countryFilter;
      const matchLevel   = levelFilter   === 'All' || app.level   === levelFilter;
      return matchSearch && matchStatus && matchCountry && matchLevel;
    });
  }, [applications, searchQuery, statusFilter, countryFilter, levelFilter]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated  = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const counts = useMemo(() => ({
    All:       applications.length,
    Approved:  applications.filter(a => a.status === 'Approved').length,
    Pending:   applications.filter(a => a.status === 'Pending').length,
    Reviewing: applications.filter(a => a.status === 'Reviewing').length,
    Rejected:  applications.filter(a => a.status === 'Rejected').length,
  }), [applications]);

  const updateStatus = (id: string, newStatus: Status) => {
    setApplications(prev => prev.map(a => a.id === id ? { ...a, status: newStatus } : a));
    if (selectedApp?.id === id) setSelectedApp(prev => prev ? { ...prev, status: newStatus } : null);
    setShowStatusDropdown(null);
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', width: '100vw', backgroundColor: '#f8fafc', fontFamily: 'var(--font-sans), system-ui, -apple-system, sans-serif', color: '#0f172a' }}>

      {/* Sidebar */}
      <AdminSidebar activeTab={activeTab} setActiveTab={(tab) => { setActiveTab(tab); if (tab === 'Dashboard') router.push('/admin/dashboard'); }} onLogout={() => router.push('/admin')} />

      {/* Main Panel */}
      <main style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', padding: '2.5rem 3rem', gap: '1.75rem' }}>

        {/* ── Header ── */}
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>Applications</h1>
            <p style={{ fontSize: '0.875rem', color: '#64748b', margin: '0.2rem 0 0 0' }}>
              Manage and track all student study abroad applications
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {/* Search */}
            <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '0.4rem 0.8rem', width: '240px' }}>
              <Search size={15} color="#94a3b8" style={{ marginRight: '0.5rem', flexShrink: 0 }} />
              <input
                type="text"
                placeholder="Search by name, ID, course…"
                value={searchQuery}
                onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                style={{ border: 'none', outline: 'none', width: '100%', fontSize: '0.8rem', color: '#1e293b', background: 'transparent' }}
              />
            </div>
            {/* Bell */}
            <div style={{ width: '38px', height: '38px', backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', position: 'relative' }}>
              <Bell size={18} color="#64748b" />
              <span style={{ position: 'absolute', top: '6px', right: '6px', width: '7px', height: '7px', backgroundColor: '#ef4444', borderRadius: '50%' }} />
            </div>
            {/* Avatar */}
            <div style={{ width: '38px', height: '38px', backgroundColor: '#E09100', color: '#fff', borderRadius: '50%', fontWeight: 700, fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 6px rgba(224,145,0,0.25)' }}>
              AD
            </div>
          </div>
        </header>

        {/* ── Stat Pills ── */}
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          {(['All', 'Approved', 'Pending', 'Reviewing', 'Rejected'] as const).map(s => {
            const isActive = statusFilter === s;
            const cfg = s !== 'All' ? STATUS_CONFIG[s] : null;
            return (
              <button
                key={s}
                onClick={() => { setStatusFilter(s); setCurrentPage(1); }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.4rem',
                  padding: '0.4rem 0.9rem', borderRadius: '9999px', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', border: '1.5px solid',
                  borderColor: isActive ? (cfg?.border ?? '#cbd5e1') : '#e2e8f0',
                  backgroundColor: isActive ? (cfg?.bg ?? '#fff') : '#fff',
                  color: isActive ? (cfg?.text ?? '#0f172a') : '#64748b',
                  transition: 'all 0.15s',
                }}
              >
                {cfg && <span>{cfg.icon}</span>}
                {s}
                <span style={{ backgroundColor: isActive ? (cfg?.text ?? '#0f172a') : '#e2e8f0', color: isActive ? '#fff' : '#475569', borderRadius: '9999px', padding: '1px 6px', fontSize: '0.7rem', fontWeight: 700 }}>
                  {counts[s]}
                </span>
              </button>
            );
          })}
        </div>

        {/* ── Filter Bar + Export ── */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            {/* Country Filter */}
            <SelectFilter label="Country" value={countryFilter} options={countries} onChange={v => { setCountryFilter(v); setCurrentPage(1); }} />
            {/* Level Filter */}
            <SelectFilter label="Level" value={levelFilter} options={levels} onChange={v => { setLevelFilter(v); setCurrentPage(1); }} />
          </div>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.45rem 1rem', borderRadius: '8px', border: '1px solid #e2e8f0', backgroundColor: '#fff', fontSize: '0.8rem', fontWeight: 600, color: '#475569', cursor: 'pointer' }}>
              <Download size={14} /> Export CSV
            </button>
            <button style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.45rem 1rem', borderRadius: '8px', border: 'none', backgroundColor: '#E09100', fontSize: '0.8rem', fontWeight: 600, color: '#fff', cursor: 'pointer' }}>
              <Plus size={14} /> New Application
            </button>
          </div>
        </div>

        {/* ── Table Card ── */}
        <div style={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '16px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)', overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.825rem', textAlign: 'left' }}>
              <thead>
                <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                  {['App ID', 'Student', 'University', 'Country', 'Course / Level', 'Intake', 'Applied', 'Status', 'Actions'].map(h => (
                    <th key={h} style={{ padding: '0.9rem 1rem', fontWeight: 700, fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginated.length === 0 ? (
                  <tr>
                    <td colSpan={9} style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8', fontSize: '0.875rem' }}>
                      No applications found matching your filters.
                    </td>
                  </tr>
                ) : paginated.map((app) => {
                  const cfg = STATUS_CONFIG[app.status];
                  const avatarColor = AVATAR_COLORS[app.avatar] ?? '#E09100';
                  return (
                    <tr
                      key={app.id}
                      style={{ borderBottom: '1px solid #f1f5f9', transition: 'background-color 0.1s' }}
                      onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#fafbfc')}
                      onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                    >
                      {/* ID */}
                      <td style={{ padding: '1rem', fontWeight: 700, color: '#64748b', fontFamily: 'monospace', fontSize: '0.78rem' }}>{app.id}</td>

                      {/* Student */}
                      <td style={{ padding: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                          <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: avatarColor, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', fontWeight: 800, flexShrink: 0 }}>
                            {app.avatar}
                          </div>
                          <div>
                            <div style={{ fontWeight: 700, color: '#0f172a' }}>{app.name}</div>
                            <div style={{ fontSize: '0.71rem', color: '#94a3b8' }}>{app.nationality}</div>
                          </div>
                        </div>
                      </td>

                      {/* University */}
                      <td style={{ padding: '1rem', color: '#334155', maxWidth: '180px' }}>
                        <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={app.university}>{app.university}</div>
                      </td>

                      {/* Country */}
                      <td style={{ padding: '1rem', color: '#334155', whiteSpace: 'nowrap' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                          <Globe size={13} color="#94a3b8" />
                          {app.country}
                        </div>
                      </td>

                      {/* Course / Level */}
                      <td style={{ padding: '1rem', maxWidth: '160px' }}>
                        <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: '#0f172a', fontWeight: 600 }} title={app.course}>{app.course}</div>
                        <div style={{ fontSize: '0.71rem', color: '#94a3b8', marginTop: '1px' }}>{app.level}</div>
                      </td>

                      {/* Intake */}
                      <td style={{ padding: '1rem', color: '#475569', whiteSpace: 'nowrap' }}>
                        <span style={{ backgroundColor: '#f1f5f9', color: '#475569', padding: '2px 8px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 600 }}>{app.intake}</span>
                      </td>

                      {/* Date */}
                      <td style={{ padding: '1rem', color: '#64748b', whiteSpace: 'nowrap' }}>{app.appliedDate}</td>

                      {/* Status */}
                      <td style={{ padding: '1rem' }}>
                        <div style={{ position: 'relative' }}>
                          <button
                            onClick={() => setShowStatusDropdown(showStatusDropdown === app.id ? null : app.id)}
                            style={{
                              display: 'flex', alignItems: 'center', gap: '0.3rem',
                              backgroundColor: cfg.bg, color: cfg.text,
                              border: `1px solid ${cfg.border}`, borderRadius: '9999px',
                              padding: '3px 10px', fontSize: '0.72rem', fontWeight: 700, cursor: 'pointer',
                            }}
                          >
                            {cfg.icon}
                            {app.status}
                            <ChevronDown size={10} />
                          </button>
                          {showStatusDropdown === app.id && (
                            <div style={{ position: 'absolute', top: '100%', left: 0, marginTop: '4px', backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '10px', boxShadow: '0 8px 24px rgba(0,0,0,0.1)', zIndex: 50, minWidth: '130px', overflow: 'hidden' }}>
                              {(['Approved', 'Pending', 'Reviewing', 'Rejected'] as Status[]).map(s => {
                                const sc = STATUS_CONFIG[s];
                                return (
                                  <button
                                    key={s}
                                    onClick={() => updateStatus(app.id, s)}
                                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', width: '100%', padding: '0.5rem 0.75rem', border: 'none', background: app.status === s ? sc.bg : 'transparent', color: sc.text, fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer', textAlign: 'left' }}
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
                      <td style={{ padding: '1rem' }}>
                        <button
                          onClick={() => setSelectedApp(app)}
                          style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', padding: '0.35rem 0.75rem', borderRadius: '7px', border: '1px solid #e2e8f0', backgroundColor: '#fff', fontSize: '0.78rem', fontWeight: 600, color: '#475569', cursor: 'pointer', transition: 'all 0.15s' }}
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

          {/* ── Pagination ── */}
          {totalPages > 1 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.25rem', borderTop: '1px solid #f1f5f9' }}>
              <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                Showing {(currentPage - 1) * PAGE_SIZE + 1}–{Math.min(currentPage * PAGE_SIZE, filtered.length)} of {filtered.length} applications
              </span>
              <div style={{ display: 'flex', gap: '0.4rem' }}>
                <PageBtn onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>
                  <ChevronLeft size={14} />
                </PageBtn>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                  <PageBtn key={p} onClick={() => setCurrentPage(p)} active={p === currentPage}>{p}</PageBtn>
                ))}
                <PageBtn onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>
                  <ChevronRight size={14} />
                </PageBtn>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* ── Detail Modal ── */}
      {selectedApp && (
        <div
          style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15,23,42,0.45)', backdropFilter: 'blur(4px)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}
          onClick={() => setSelectedApp(null)}
        >
          <div
            style={{ width: '480px', height: '100vh', backgroundColor: '#fff', boxShadow: '-4px 0 40px rgba(0,0,0,0.15)', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div style={{ padding: '1.5rem 1.75rem', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'sticky', top: 0, backgroundColor: '#fff', zIndex: 10 }}>
              <div>
                <div style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: 700, fontFamily: 'monospace', marginBottom: '0.25rem' }}>{selectedApp.id}</div>
                <h2 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>{selectedApp.name}</h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.4rem' }}>
                  <span
                    style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', backgroundColor: STATUS_CONFIG[selectedApp.status].bg, color: STATUS_CONFIG[selectedApp.status].text, border: `1px solid ${STATUS_CONFIG[selectedApp.status].border}`, padding: '3px 10px', borderRadius: '9999px', fontSize: '0.72rem', fontWeight: 700 }}
                  >
                    {STATUS_CONFIG[selectedApp.status].icon} {selectedApp.status}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{selectedApp.intake}</span>
                </div>
              </div>
              <button onClick={() => setSelectedApp(null)} style={{ border: 'none', background: '#f1f5f9', borderRadius: '8px', padding: '0.4rem', cursor: 'pointer', color: '#64748b', display: 'flex', alignItems: 'center' }}>
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div style={{ padding: '1.5rem 1.75rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', flex: 1 }}>

              {/* Contact Info */}
              <Section title="Contact Information">
                <DetailRow icon={<Mail size={14} />} label="Email" value={selectedApp.email} />
                <DetailRow icon={<Phone size={14} />} label="Phone" value={selectedApp.phone} />
                <DetailRow icon={<MapPin size={14} />} label="Nationality" value={selectedApp.nationality} />
              </Section>

              {/* Academic Info */}
              <Section title="Academic Details">
                <DetailRow icon={<School size={14} />} label="University" value={selectedApp.university} />
                <DetailRow icon={<Globe size={14} />} label="Country" value={selectedApp.country} />
                <DetailRow icon={<BookOpen size={14} />} label="Course" value={selectedApp.course} />
                <DetailRow icon={<GraduationCap size={14} />} label="Level" value={selectedApp.level} />
                <DetailRow icon={<Calendar size={14} />} label="Applied On" value={selectedApp.appliedDate} />
              </Section>

              {/* Documents */}
              <Section title="Submitted Documents">
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {selectedApp.documents.map(doc => (
                    <span key={doc} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', backgroundColor: '#f1f5f9', color: '#334155', padding: '4px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 600 }}>
                      <FileText size={12} color="#64748b" /> {doc}
                    </span>
                  ))}
                </div>
              </Section>

              {/* Notes */}
              <Section title="Admin Notes">
                <p style={{ margin: 0, fontSize: '0.825rem', color: '#475569', lineHeight: 1.6, backgroundColor: '#f8fafc', padding: '0.75rem', borderRadius: '8px', borderLeft: '3px solid #E09100' }}>
                  {selectedApp.notes}
                </p>
              </Section>

              {/* Status Changer */}
              <Section title="Update Status">
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {(['Approved', 'Pending', 'Reviewing', 'Rejected'] as Status[]).map(s => {
                    const sc = STATUS_CONFIG[s];
                    const isActive = selectedApp.status === s;
                    return (
                      <button
                        key={s}
                        onClick={() => updateStatus(selectedApp.id, s)}
                        style={{
                          display: 'flex', alignItems: 'center', gap: '0.3rem',
                          padding: '0.4rem 0.9rem', borderRadius: '9999px', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer',
                          border: `1.5px solid ${isActive ? sc.border : '#e2e8f0'}`,
                          backgroundColor: isActive ? sc.bg : '#fff', color: isActive ? sc.text : '#94a3b8',
                          transition: 'all 0.15s',
                        }}
                      >
                        {sc.icon} {s}
                      </button>
                    );
                  })}
                </div>
              </Section>
            </div>
          </div>
        </div>
      )}

      {/* Close status dropdown on outside click */}
      {showStatusDropdown && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 40 }} onClick={() => setShowStatusDropdown(null)} />
      )}
    </div>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{title}</div>
      {children}
    </div>
  );
}

function DetailRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
      <span style={{ color: '#94a3b8', display: 'flex', alignItems: 'center', marginTop: '1px', flexShrink: 0 }}>{icon}</span>
      <span style={{ fontSize: '0.78rem', color: '#94a3b8', minWidth: '90px', flexShrink: 0 }}>{label}</span>
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
        {options.map(o => <option key={o} value={o}>{o === 'All' ? `All ${label === 'Country' ? 'Countries' : label + 's'}` : o}</option>)}
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
