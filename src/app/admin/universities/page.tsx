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
  Globe,
  MapPin,
  Star,
  BookOpen,
  Users,
  TrendingUp,
  CheckCircle2,
  BadgeCheck,
  Clock,
  XCircle,
  LayoutGrid,
  List,
  ExternalLink,
  GraduationCap,
  Building2,
  Award,
  ChevronLeft,
  ChevronRight,
  Pencil,
  Phone,
  Mail,
  Calendar,
} from 'lucide-react';
import AdminSidebar from '@/components/admin/AdminSidebar';

// ─── Types ────────────────────────────────────────────────────────────────────
type PartnerStatus = 'Active' | 'Pending' | 'Inactive';

interface University {
  id: string;
  name: string;
  country: string;
  city: string;
  ranking: number;
  type: string;
  partnerSince: string;
  status: PartnerStatus;
  courses: number;
  students: number;
  acceptanceRate: number;
  tuitionRange: string;
  intakes: string[];
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  description: string;
  tags: string[];
  logo: string; // initials
  logoColor: string;
  website: string;
  specializations: string[];
  subjectAreas: string[];
  popularPrograms: string[];
  requirements: string[];
  established: number;
  isOfficialPartner: boolean;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────
const ALL_UNIVERSITIES: University[] = [
  { id: 'UNI-001', name: 'University of Oxford',           country: 'United Kingdom', city: 'Oxford',           ranking: 1,   type: 'Research',  partnerSince: '2020', status: 'Active',   isOfficialPartner: true,  established: 1096, courses: 45, students: 124, acceptanceRate: 15, tuitionRange: '£25k–£35k/yr',  intakes: ['September'],            contactName: 'Dr. Sarah Clarke',     contactEmail: 'partnerships@ox.ac.uk',        contactPhone: '+44 1865 000001', description: 'The oldest university in the English-speaking world, Oxford is a unique and historic institution consistently ranked among the top universities globally. Known for its collegiate system and tutorial-based teaching.', tags: ['Official Partner', 'Scholarship Available', 'Research-Intensive'], logo: 'OX', logoColor: '#1a1a2e', website: 'ox.ac.uk',         specializations: ['Philosophy, Politics & Economics', 'Computer Science', 'Medicine', 'MBA'],         subjectAreas: ['Arts', 'Science', 'Business', 'Engineering', 'Medicine'], popularPrograms: ['Philosophy, Politics and Economics (PPE)', 'Computer Science', 'Medicine', 'MBA'],                                              requirements: ['IELTS 7.5 or equivalent', 'GPA 3.8+ (A-levels: A*A*A*)', 'GRE/GMAT (for graduate business programs)', 'Personal Statement & References'] },
  { id: 'UNI-002', name: 'University of Cambridge',        country: 'United Kingdom', city: 'Cambridge',        ranking: 2,   type: 'Research',  partnerSince: '2020', status: 'Active',   isOfficialPartner: true,  established: 1209, courses: 42, students: 108, acceptanceRate: 16, tuitionRange: '£24k–£34k/yr',  intakes: ['September'],            contactName: 'Dr. Emily Blackwood',  contactEmail: 'international@cam.ac.uk',       contactPhone: '+44 1223 000001', description: "A collegiate research university in Cambridge, United Kingdom. Founded in 1209, Cambridge is the world's fourth-oldest surviving university and is renowned for its scientific breakthroughs and rich academic history.", tags: ['Official Partner', 'Top 5 Global', 'Research Excellence'],    logo: 'CA', logoColor: '#800020', website: 'cam.ac.uk',         specializations: ['Natural Sciences', 'Mathematics', 'Engineering', 'Law'],                           subjectAreas: ['Arts', 'Science', 'Business', 'Engineering', 'Medicine'], popularPrograms: ['Natural Sciences', 'Mathematics', 'Engineering', 'Law'],                                                                         requirements: ['IELTS 7.5 or TOEFL 110', 'GPA 3.8+ (A-levels: A*A*A)', 'Subject-specific entrance tests', 'Academic Interview'] },
  { id: 'UNI-003', name: 'MIT',                            country: 'United States',  city: 'Cambridge, MA',   ranking: 3,   type: 'Technical', partnerSince: '2021', status: 'Active',   isOfficialPartner: true,  established: 1861, courses: 55, students: 62,  acceptanceRate: 3,  tuitionRange: '$45k–$55k/yr',   intakes: ['September'],            contactName: 'Ms. Rachel Torres',    contactEmail: 'intl@mit.edu',                  contactPhone: '+1 617 253 0001', description: 'The Massachusetts Institute of Technology is a private land-grant research university in Cambridge, Massachusetts. Known for its cutting-edge research, innovation, and intense academic environment in STEM fields.', tags: ['Official Partner', 'STEM Leader', 'Innovation Hub'],          logo: 'MI', logoColor: '#a31f34', website: 'mit.edu',           specializations: ['Computer Science & Engineering', 'Physics', 'Mechanical Engineering', 'Finance'],  subjectAreas: ['Science', 'Engineering', 'Business'],             popularPrograms: ['Computer Science & Engineering', 'Physics', 'Mechanical Engineering', 'Finance'],                                               requirements: ['TOEFL 100+ (IELTS 7.5+)', 'Exceptional SAT/ACT scores', 'Strong STEM portfolio', 'Letters of Recommendation'] },
  { id: 'UNI-004', name: 'Stanford University',            country: 'United States',  city: 'Stanford, CA',    ranking: 4,   type: 'Research',  partnerSince: '2021', status: 'Active',   isOfficialPartner: true,  established: 1885, courses: 52, students: 55,  acceptanceRate: 4,  tuitionRange: '$48k–$58k/yr',   intakes: ['September'],            contactName: 'Dr. Mark Jensen',      contactEmail: 'global@stanford.edu',           contactPhone: '+1 650 000001',   description: "Located in the heart of Silicon Valley, Stanford is one of the world's leading research universities. It is famous for its entrepreneurial spirit, academic excellence, and close ties to the tech industry.", tags: ['Official Partner', 'Silicon Valley', 'Entrepreneurial'],       logo: 'SU', logoColor: '#8c1515', website: 'stanford.edu',      specializations: ['Computer Science', 'Electrical Engineering', 'MBA', 'Human Biology'],               subjectAreas: ['Science', 'Engineering', 'Business', 'Arts', 'Medicine'], popularPrograms: ['Computer Science', 'Electrical Engineering', 'MBA', 'Human Biology'],                                                            requirements: ['TOEFL 100+', 'GPA 3.9+ (SAT/ACT recommended)', 'Extracurricular leadership profile', 'Three essays / letters of recommendation'] },
  { id: 'UNI-005', name: 'Harvard University',             country: 'United States',  city: 'Cambridge, MA',   ranking: 5,   type: 'Research',  partnerSince: '2022', status: 'Pending',  isOfficialPartner: false, established: 1636, courses: 58, students: 38,  acceptanceRate: 3,  tuitionRange: '$50k–$60k/yr',   intakes: ['September'],            contactName: 'Ms. Jennifer Cole',    contactEmail: 'intl@harvard.edu',              contactPhone: '+1 617 495 0001', description: 'The oldest institution of higher learning in the United States, Harvard is a prestigious Ivy League research university. It has produced numerous Nobel laureates, heads of state, and global leaders.', tags: ['Ivy League', 'Top Ranked', 'Prestige'],                        logo: 'HU', logoColor: '#a51c30', website: 'harvard.edu',       specializations: ['Economics', 'Government/Political Science', 'Computer Science', 'Medicine'],         subjectAreas: ['Arts', 'Science', 'Business', 'Medicine'],        popularPrograms: ['Economics', 'Government/Political Science', 'Computer Science', 'Medicine (MD)'],                                                requirements: ['TOEFL 100+ or IELTS 7.5+', 'Excellent high school record / SAT', 'Well-rounded extracurricular profile', 'Teacher evaluations & essays'] },
  { id: 'UNI-006', name: 'Imperial College London',        country: 'United Kingdom', city: 'London',           ranking: 6,   type: 'Technical', partnerSince: '2022', status: 'Inactive', isOfficialPartner: false, established: 1907, courses: 44, students: 28,  acceptanceRate: 12, tuitionRange: '£32k–£42k/yr',  intakes: ['September'],            contactName: 'Prof. David Richards', contactEmail: 'partnerships@imperial.ac.uk',   contactPhone: '+44 20 0000001',  description: 'A world-class university based in London, focusing exclusively on science, engineering, medicine, and business. Imperial is highly regarded for its research impact and global collaboration.', tags: ['STEM Focus', 'London Based', 'Research Impact'],               logo: 'IC', logoColor: '#003e74', website: 'imperial.ac.uk',    specializations: ['Computing', 'Aeronautical Engineering', 'Biochemistry', 'Medicine'],               subjectAreas: ['Science', 'Engineering', 'Medicine', 'Business'],  popularPrograms: ['Computing (Software Engineering)', 'Aeronautical Engineering', 'Biochemistry', 'Medicine'],                                     requirements: ['IELTS 7.0 or TOEFL 100', 'A*A*A at A-level / IB 39+', 'Admissions test (for some subjects)', 'Interview performance'] },
  { id: 'UNI-007', name: 'Caltech',                        country: 'United States',  city: 'Pasadena, CA',    ranking: 7,   type: 'Technical', partnerSince: '2023', status: 'Pending',  isOfficialPartner: false, established: 1891, courses: 30, students: 14,  acceptanceRate: 6,  tuitionRange: '$52k–$62k/yr',   intakes: ['September'],            contactName: 'Dr. Lisa Park',        contactEmail: 'international@caltech.edu',     contactPhone: '+1 626 000001',   description: "The California Institute of Technology is a world-renowned science and engineering institute that marshals some of the world's brightest minds to address fundamental scientific questions.", tags: ['Elite STEM', 'Small Cohort', 'Research Grants'],               logo: 'CT', logoColor: '#ff6c0c', website: 'caltech.edu',       specializations: ['Physics', 'Computer Science', 'Aerospace Engineering', 'Chemistry'],               subjectAreas: ['Science', 'Engineering'],                         popularPrograms: ['Physics', 'Computer Science', 'Aerospace Engineering', 'Chemistry'],                                                            requirements: ['TOEFL 100+ or IELTS 7.5+', 'Outstanding academic background in STEM', 'SAT/ACT tests', 'Letters of evaluation from STEM teachers'] },
  { id: 'UNI-008', name: 'University of Toronto',          country: 'Canada',         city: 'Toronto',          ranking: 21,  type: 'Research',  partnerSince: '2019', status: 'Active',   isOfficialPartner: true,  established: 1827, courses: 48, students: 98,  acceptanceRate: 35, tuitionRange: 'CA$15k–$25k/yr', intakes: ['September', 'January'], contactName: 'Ms. Patricia Wong',    contactEmail: 'intl@utoronto.ca',              contactPhone: '+1 416 000001',   description: "Canada's top-ranked public research university, located in the vibrant city of Toronto. Known for its strong academic programs, diversity, and groundbreaking scientific research, including the discovery of insulin.", tags: ['Official Partner', 'Top Canadian', 'Diverse'],                 logo: 'UT', logoColor: '#003478', website: 'utoronto.ca',       specializations: ['Computer Science', 'Engineering', 'Commerce/Finance', 'Life Sciences'],             subjectAreas: ['Arts', 'Science', 'Business', 'Engineering', 'Medicine'], popularPrograms: ['Computer Science', 'Engineering', 'Commerce/Finance', 'Life Sciences'],                                                          requirements: ['IELTS 6.5+ or TOEFL 100+', 'GPA 3.3+ (IB 36+)', 'High school transcript', 'Online supplemental application (for some programs)'] },
  { id: 'UNI-009', name: 'University of Melbourne',        country: 'Australia',      city: 'Melbourne',        ranking: 33,  type: 'Research',  partnerSince: '2020', status: 'Active',   isOfficialPartner: true,  established: 1853, courses: 40, students: 63,  acceptanceRate: 30, tuitionRange: 'AU$28k–$38k/yr', intakes: ['February', 'July'],     contactName: 'Dr. Emily Hart',       contactEmail: 'global@unimelb.edu.au',         contactPhone: '+61 3 000002',    description: "Australia's leading research university, situated in the cultural capital of Melbourne. It features the unique 'Melbourne Model' of education, offering a broad undergraduate foundation followed by professional specialization.", tags: ['Official Partner', 'Top 50 Global', 'Melbourne Model'],        logo: 'UM', logoColor: '#000054', website: 'unimelb.edu.au',    specializations: ['Business & Economics', 'Biomedicine', 'Engineering', 'Arts & Humanities'],          subjectAreas: ['Arts', 'Science', 'Business', 'Engineering', 'Medicine'], popularPrograms: ['Business & Economics', 'Biomedicine', 'Engineering', 'Arts & Humanities'],                                                       requirements: ['IELTS 6.5+ (no band less than 6.0)', 'ATAR equivalent of 90+ / GPA 3.0+', 'Academic Transcripts', 'Secondary school qualifications'] },
  { id: 'UNI-010', name: 'Technical University of Munich', country: 'Germany',        city: 'Munich',           ranking: 37,  type: 'Technical', partnerSince: '2022', status: 'Active',   isOfficialPartner: true,  established: 1868, courses: 35, students: 45,  acceptanceRate: 20, tuitionRange: '€3k–€8k/yr',     intakes: ['October'],              contactName: 'Prof. Klaus Bauer',    contactEmail: 'int@tum.de',                    contactPhone: '+49 89 000001',   description: "One of Europe's top universities, TUM is known for its focus on engineering, technology, medicine, and applied sciences. It is a key hub for research and entrepreneurship in Germany.", tags: ['Official Partner', 'Low Tuition', 'Engineering Excellence'],    logo: 'TM', logoColor: '#005293', website: 'tum.de',            specializations: ['Informatics (Computer Science)', 'Mechanical Engineering', 'Management & Technology', 'Physics'], subjectAreas: ['Science', 'Engineering', 'Business'],             popularPrograms: ['Informatics (Computer Science)', 'Mechanical Engineering', 'Management & Technology', 'Physics'],                               requirements: ['IELTS 6.5 / German proficiency (for some courses)', 'GPA 3.0+', 'Entrance assessment exam', 'CV & Motivation Letter'] },
  { id: 'UNI-011', name: 'Universiti Malaya',              country: 'Malaysia',       city: 'Kuala Lumpur',     ranking: 65,  type: 'Research',  partnerSince: '2021', status: 'Active',   isOfficialPartner: true,  established: 1949, courses: 38, students: 72,  acceptanceRate: 25, tuitionRange: '$8k–$15k/yr',    intakes: ['September', 'March'],   contactName: 'Dr. Amir Hashim',      contactEmail: 'international@um.edu.my',       contactPhone: '+60 3 000001',    description: 'The oldest and premier public research university in Malaysia, located in Kuala Lumpur. It is highly ranked internationally and offers robust programs in engineering, medicine, and social sciences.', tags: ['Official Partner', 'Affordable', 'Asia Top 100'],              logo: 'ML', logoColor: '#003087', website: 'um.edu.my',         specializations: ['Mechanical Engineering', 'Medicine', 'Business Administration', 'Information Technology'], subjectAreas: ['Arts', 'Science', 'Business', 'Engineering', 'Medicine'], popularPrograms: ['Mechanical Engineering', 'Medicine', 'Business Administration', 'Information Technology'],                                       requirements: ['IELTS 6.0 or TOEFL 80+', 'GPA 3.0+ / CGPA 3.0', 'High school graduation certificate', 'English proficiency test'] },
  { id: 'UNI-012', name: 'Universiti Kebangsaan Malaysia', country: 'Malaysia',       city: 'Selangor',         ranking: 129, type: 'Research',  partnerSince: '2023', status: 'Active',   isOfficialPartner: true,  established: 1970, courses: 32, students: 41,  acceptanceRate: 30, tuitionRange: '$7k–$12k/yr',    intakes: ['September', 'March'],   contactName: 'Dr. Nurul Hayati',     contactEmail: 'international@ukm.edu.my',      contactPhone: '+60 3 000002',    description: "Also known as the National University of Malaysia, UKM is a top public university that aims to inspire the community and shape the future through quality education and research.", tags: ['Official Partner', 'National University', 'Affordable'],        logo: 'UK', logoColor: '#003d5b', website: 'ukm.edu.my',        specializations: ['Medicine', 'Law', 'Mechanical Engineering', 'Islamic Studies'],                    subjectAreas: ['Science', 'Engineering', 'Business', 'Arts'],     popularPrograms: ['Medicine', 'Law', 'Mechanical Engineering', 'Islamic Studies'],                                                                 requirements: ['IELTS 5.5 or TOEFL 500+', 'CGPA 3.00 or equivalent', 'High school graduation certificate', 'Academic reference letter'] },
];


// ─── Config ───────────────────────────────────────────────────────────────────
const STATUS_CFG: Record<PartnerStatus, { bg: string; text: string; border: string; icon: React.ReactNode }> = {
  Active:   { bg: '#ecfdf5', text: '#065f46', border: '#a7f3d0', icon: <CheckCircle2 size={12} /> },
  Pending:  { bg: '#fffbeb', text: '#92400e', border: '#fcd34d', icon: <Clock size={12} /> },
  Inactive: { bg: '#f1f5f9', text: '#475569', border: '#cbd5e1', icon: <XCircle size={12} /> },
};

const FILTER_CFG: Record<'All' | PartnerStatus | 'Official', { bg: string; text: string; border: string; icon: React.ReactNode; label: string }> = {
  All:      { bg: '#fff',    text: '#0f172a', border: '#cbd5e1', icon: null, label: 'All Partners' },
  Active:   { bg: '#ecfdf5', text: '#065f46', border: '#a7f3d0', icon: <CheckCircle2 size={12} />, label: 'Active Partners' },
  Pending:  { bg: '#fffbeb', text: '#92400e', border: '#fcd34d', icon: <Clock size={12} />, label: 'Pending Partners' },
  Inactive: { bg: '#f1f5f9', text: '#475569', border: '#cbd5e1', icon: <XCircle size={12} />, label: 'Inactive Partners' },
  Official: { bg: '#eff6ff', text: '#1e40af', border: '#bfdbfe', icon: <BadgeCheck size={12} />, label: 'Official Partners' },
};

const COUNTRIES = ['All', 'United Kingdom', 'United States', 'Canada', 'Australia', 'Germany', 'Malaysia'];
const PAGE_SIZE_GRID = 12;
const PAGE_SIZE_LIST = 12;

// ─── Main Component ───────────────────────────────────────────────────────────
export default function UniversitiesPage() {
  const router = useRouter();
  const [activeTab, setActiveTab]         = useState('Universities');
  const [searchQuery, setSearchQuery]     = useState('');
  const [countryFilter, setCountryFilter] = useState('All');
  const [statusFilter, setStatusFilter]   = useState<'All' | PartnerStatus | 'Official'>('All');
  const [viewMode, setViewMode]           = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage]     = useState(1);
  const [selectedUni, setSelectedUni]     = useState<University | null>(null);
  const [universities, setUniversities]   = useState<University[]>(ALL_UNIVERSITIES);

  const counts = useMemo(() => ({
    All:      universities.length,
    Active:   universities.filter(u => u.status === 'Active').length,
    Pending:  universities.filter(u => u.status === 'Pending').length,
    Inactive: universities.filter(u => u.status === 'Inactive').length,
    Official: universities.filter(u => u.isOfficialPartner).length,
  }), [universities]);

  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return universities.filter(u => {
      const matchSearch  = !q || u.name.toLowerCase().includes(q) || u.country.toLowerCase().includes(q) || u.city.toLowerCase().includes(q) || u.specializations.some(s => s.toLowerCase().includes(q));
      const matchCountry = countryFilter === 'All' || u.country === countryFilter;
      const matchStatus  = statusFilter  === 'All' || (statusFilter === 'Official' ? u.isOfficialPartner : u.status === statusFilter);
      return matchSearch && matchCountry && matchStatus;
    });
  }, [universities, searchQuery, countryFilter, statusFilter]);

  const pageSize  = viewMode === 'grid' ? PAGE_SIZE_GRID : PAGE_SIZE_LIST;
  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated  = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const updateStatus = (id: string, newStatus: PartnerStatus) => {
    setUniversities(prev => prev.map(u => u.id === id ? { ...u, status: newStatus } : u));
    if (selectedUni?.id === id) setSelectedUni(prev => prev ? { ...prev, status: newStatus } : null);
  };

  const toggleOfficialPartner = (id: string) => {
    setUniversities(prev => prev.map(u => u.id === id ? { ...u, isOfficialPartner: !u.isOfficialPartner } : u));
    if (selectedUni?.id === id) {
      setSelectedUni(prev => prev ? { ...prev, isOfficialPartner: !prev.isOfficialPartner } : null);
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', width: '100vw', backgroundColor: '#f8fafc', fontFamily: 'var(--font-sans), system-ui, -apple-system, sans-serif', color: '#0f172a' }}>

      {/* Sidebar */}
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          if (tab === 'Dashboard')     router.push('/admin/dashboard');
          if (tab === 'Applications')  router.push('/admin/applications');
          if (tab === 'Consultations') router.push('/admin/consultations');
        }}
        onLogout={() => router.push('/admin')}
      />

      {/* Main */}
      <main style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', padding: '2.5rem 3rem', gap: '1.75rem' }}>

        {/* ── Header ── */}
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>Universities</h1>
            <p style={{ fontSize: '0.875rem', color: '#64748b', margin: '0.2rem 0 0 0' }}>
              Manage partner universities, programs, and liaison contacts
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '0.4rem 0.8rem', width: '240px' }}>
              <Search size={15} color="#94a3b8" style={{ marginRight: '0.5rem', flexShrink: 0 }} />
              <input
                type="text"
                placeholder="Search university, country, course…"
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
          {(['All', 'Active', 'Pending', 'Inactive', 'Official'] as const).map(s => {
            const isActive = statusFilter === s;
            const cfg = FILTER_CFG[s];
            return (
              <button
                key={s}
                onClick={() => { setStatusFilter(s); setCurrentPage(1); }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.38rem 0.9rem',
                  borderRadius: '9999px',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: '1.5px solid',
                  borderColor: isActive ? cfg.border : '#e2e8f0',
                  backgroundColor: isActive ? cfg.bg : '#fff',
                  color: isActive ? cfg.text : '#64748b',
                  transition: 'all 0.15s'
                }}
              >
                {cfg.icon && <span>{cfg.icon}</span>}
                {cfg.label}
                <span style={{ backgroundColor: isActive ? cfg.text : '#e2e8f0', color: isActive ? '#fff' : '#475569', borderRadius: '9999px', padding: '1px 6px', fontSize: '0.68rem', fontWeight: 700 }}>
                  {counts[s]}
                </span>
              </button>
            );
          })}
        </div>

        {/* ── Toolbar ── */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <SelectFilter label="Country" value={countryFilter} options={COUNTRIES} onChange={v => { setCountryFilter(v); setCurrentPage(1); }} />
            {/* View Toggle */}
            <div style={{ display: 'flex', border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden', backgroundColor: '#fff' }}>
              {(['grid', 'list'] as const).map(m => (
                <button
                  key={m}
                  onClick={() => { setViewMode(m); setCurrentPage(1); }}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0.4rem 0.7rem', border: 'none', backgroundColor: viewMode === m ? '#f1f5f9' : 'transparent', color: viewMode === m ? '#0f172a' : '#94a3b8', cursor: 'pointer', transition: 'all 0.15s' }}
                >
                  {m === 'grid' ? <LayoutGrid size={16} /> : <List size={16} />}
                </button>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.45rem 1rem', borderRadius: '8px', border: '1px solid #e2e8f0', backgroundColor: '#fff', fontSize: '0.8rem', fontWeight: 600, color: '#475569', cursor: 'pointer' }}>
              <Download size={14} /> Export
            </button>
            <button style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.45rem 1rem', borderRadius: '8px', border: 'none', backgroundColor: '#E09100', fontSize: '0.8rem', fontWeight: 600, color: '#fff', cursor: 'pointer' }}>
              <Plus size={14} /> Add University
            </button>
          </div>
        </div>

        {/* ── Results Count ── */}
        <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '-0.75rem' }}>
          Showing <strong style={{ color: '#0f172a' }}>{filtered.length}</strong> of <strong style={{ color: '#0f172a' }}>{universities.length}</strong> partner universities
        </div>

        {/* ── GRID VIEW ── */}
        {viewMode === 'grid' && (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: '1.25rem' }}>
              {paginated.length === 0 ? (
                <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '4rem', color: '#94a3b8' }}>No universities found.</div>
              ) : paginated.map(uni => {
                const cfg = STATUS_CFG[uni.status];
                return (
                  <div
                    key={uni.id}
                    style={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '16px', overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: 0, boxShadow: '0 1px 4px rgba(0,0,0,0.04)', cursor: 'pointer', transition: 'transform 0.15s, box-shadow 0.15s' }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.08)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.04)'; }}
                    onClick={() => setSelectedUni(uni)}
                  >
                    {/* Card Image with Overlaid Info */}
                    <div style={{ width: '100%', height: '170px', overflow: 'hidden', flexShrink: 0, position: 'relative' }}>
                      <img
                        src={`https://picsum.photos/seed/${uni.id}/400/170`}
                        alt={uni.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      />
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15, 23, 42, 0.85) 0%, rgba(15, 23, 42, 0.15) 100%)', zIndex: 1 }} />
                      
                      {/* Overlay Top Status Badge */}
                      <span style={{ position: 'absolute', top: '0.75rem', right: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.25rem', backgroundColor: cfg.bg, color: cfg.text, border: `1px solid ${cfg.border}`, padding: '2px 8px', borderRadius: '9999px', fontSize: '0.68rem', fontWeight: 700, zIndex: 2, boxShadow: '0 2px 6px rgba(0,0,0,0.1)' }}>
                        {cfg.icon} {uni.status}
                      </span>

                      {/* Overlay Bottom Title & Location */}
                      <div style={{ position: 'absolute', bottom: '0.75rem', left: '0.875rem', right: '0.875rem', zIndex: 2, color: '#fff' }}>
                        <div style={{ fontWeight: 800, color: '#fff', fontSize: '0.925rem', lineHeight: 1.25, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', textShadow: '0 1px 3px rgba(0,0,0,0.6)' }} title={uni.name}>
                          {uni.name}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', marginTop: '0.2rem', fontSize: '0.72rem', color: 'rgba(255,255,255,0.85)' }}>
                          <MapPin size={11} style={{ color: '#fff', opacity: 0.85 }} /> {uni.city}, {uni.country}
                        </div>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div style={{ padding: '0.85rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', flex: 1 }}>
                    {/* Ranking & Type */}
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', backgroundColor: '#fef9ec', color: '#92400e', padding: '3px 8px', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 700 }}>
                        <Award size={11} /> Rank #{uni.ranking}
                      </span>
                      <span style={{ backgroundColor: '#f1f5f9', color: '#475569', padding: '3px 8px', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 600 }}>
                        {uni.type}
                      </span>
                      <span style={{ backgroundColor: '#f1f5f9', color: '#475569', padding: '3px 8px', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 600 }}>
                        Since {uni.partnerSince}
                      </span>
                    </div>



                    {/* Tuition & Action */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.75rem', borderTop: '1px solid #f1f5f9' }}>
                      <div>
                        <div style={{ fontSize: '0.65rem', color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Tuition</div>
                        <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0f172a' }}>{uni.tuitionRange}</div>
                      </div>
                      <button
                        onClick={e => { e.stopPropagation(); setSelectedUni(uni); }}
                        style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', padding: '0.35rem 0.75rem', borderRadius: '7px', border: '1px solid #e2e8f0', backgroundColor: '#fff', fontSize: '0.75rem', fontWeight: 600, color: '#475569', cursor: 'pointer' }}
                      >
                        <Eye size={13} /> Details
                      </button>
                    </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Grid Pagination */}
            {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} filtered={filtered} pageSize={pageSize} setCurrentPage={setCurrentPage} />}
          </>
        )}

        {/* ── LIST VIEW ── */}
        {viewMode === 'list' && (
          <div style={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '16px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)', overflow: 'hidden', height: 'auto' }}>
            <div style={{ overflowX: 'auto', height: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.825rem', textAlign: 'left' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                    {['University', 'Country', 'Rank', 'Type', 'Courses', 'Students', 'Tuition', 'Intakes', 'Status', 'Actions'].map(h => (
                      <th key={h} style={{ padding: '0.9rem 1rem', fontWeight: 700, fontSize: '0.72rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {paginated.length === 0 ? (
                    <tr><td colSpan={10} style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>No universities found.</td></tr>
                  ) : paginated.map(uni => {
                    const cfg = STATUS_CFG[uni.status];
                    return (
                      <tr key={uni.id} style={{ borderBottom: '1px solid #f1f5f9', transition: 'background-color 0.1s', cursor: 'pointer' }}
                        onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#fafbfc')}
                        onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                        onClick={() => setSelectedUni(uni)}
                      >
                        {/* University */}
                        <td style={{ padding: '0.9rem 1rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                            <div style={{ width: '36px', height: '36px', borderRadius: '9px', backgroundColor: uni.logoColor, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.62rem', fontWeight: 900, flexShrink: 0 }}>{uni.logo}</div>
                            <div>
                              <div style={{ fontWeight: 700, color: '#0f172a', whiteSpace: 'nowrap', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis' }} title={uni.name}>{uni.name}</div>
                              <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{uni.city}</div>
                            </div>
                          </div>
                        </td>
                        <td style={{ padding: '0.9rem 1rem', color: '#334155', whiteSpace: 'nowrap' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Globe size={13} color="#94a3b8" />{uni.country}</div>
                        </td>
                        <td style={{ padding: '0.9rem 1rem' }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#92400e', fontWeight: 700, fontSize: '0.8rem' }}><Star size={12} color="#E09100" fill="#E09100" />#{uni.ranking}</span>
                        </td>
                        <td style={{ padding: '0.9rem 1rem' }}>
                          <span style={{ backgroundColor: '#f1f5f9', color: '#475569', padding: '2px 8px', borderRadius: '6px', fontSize: '0.73rem', fontWeight: 600 }}>{uni.type}</span>
                        </td>
                        <td style={{ padding: '0.9rem 1rem', fontWeight: 700, color: '#0f172a' }}>{uni.courses}</td>
                        <td style={{ padding: '0.9rem 1rem', fontWeight: 700, color: '#0f172a' }}>{uni.students}</td>
                        <td style={{ padding: '0.9rem 1rem', color: '#334155', whiteSpace: 'nowrap', fontSize: '0.78rem' }}>{uni.tuitionRange}</td>
                        <td style={{ padding: '0.9rem 1rem' }}>
                          <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                            {uni.intakes.map(intake => (
                              <span key={intake} style={{ backgroundColor: '#f0fdf4', color: '#166534', padding: '1px 6px', borderRadius: '4px', fontSize: '0.68rem', fontWeight: 600 }}>{intake}</span>
                            ))}
                          </div>
                        </td>
                        <td style={{ padding: '0.9rem 1rem' }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', backgroundColor: cfg.bg, color: cfg.text, border: `1px solid ${cfg.border}`, padding: '2px 8px', borderRadius: '9999px', fontSize: '0.7rem', fontWeight: 700, whiteSpace: 'nowrap' }}>
                            {cfg.icon} {uni.status}
                          </span>
                        </td>
                        <td style={{ padding: '0.9rem 1rem' }}>
                          <button
                            onClick={e => { e.stopPropagation(); setSelectedUni(uni); }}
                            style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', padding: '0.32rem 0.7rem', borderRadius: '7px', border: '1px solid #e2e8f0', backgroundColor: '#fff', fontSize: '0.77rem', fontWeight: 600, color: '#475569', cursor: 'pointer' }}
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
            {/* List Pagination */}
            {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} filtered={filtered} pageSize={pageSize} setCurrentPage={setCurrentPage} inTable />}
          </div>
        )}
      </main>

      {/* ── Detail Slide-over ── */}
      {selectedUni && (
        <div
          style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15,23,42,0.45)', backdropFilter: 'blur(4px)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}
          onClick={() => setSelectedUni(null)}
        >
          <div
            style={{ width: '520px', height: '100vh', backgroundColor: '#fff', boxShadow: '-4px 0 40px rgba(0,0,0,0.15)', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}
            onClick={e => e.stopPropagation()}
          >
            {/* Close Button on Slide-over (Fixed at top-right of popup view) */}
            <button
              onClick={() => setSelectedUni(null)}
              style={{
                position: 'fixed',
                top: '1rem',
                right: '1.5rem',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.9)',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#1e293b',
                cursor: 'pointer',
                zIndex: 20,
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                transition: 'all 0.2s'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.background = '#ffffff';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)';
              }}
            >
              <X size={16} />
            </button>

            {/* Hero Image Banner with overlaying title and details (Sticky Header) */}
            <div style={{ width: '100%', height: '200px', overflow: 'hidden', flexShrink: 0, position: 'sticky', top: '-80px', zIndex: 10 }}>
              <img
                src={`https://picsum.photos/seed/${selectedUni.id}/520/200`}
                alt={selectedUni.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15, 23, 42, 0.9) 0%, rgba(15, 23, 42, 0.25) 100%)', zIndex: 1 }} />
              
              {/* Official Partner Badge on Top-Left of Image */}
              {selectedUni.isOfficialPartner && (
                <span style={{
                  position: 'absolute',
                  top: '1rem',
                  left: '1.25rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  background: 'rgba(255, 255, 255, 0.95)',
                  color: '#1E293B',
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  padding: '0.25rem 0.55rem',
                  borderRadius: '20px',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.12)',
                  backdropFilter: 'blur(4px)',
                  border: '1px solid rgba(24, 119, 242, 0.15)',
                  zIndex: 2
                }}>
                  <BadgeCheck size={13} style={{ color: '#1877F2', fill: '#1877F2', stroke: '#fff', flexShrink: 0 }} /> Official Partner
                </span>
              )}

              {/* Title & Details overlay */}
              <div style={{
                position: 'absolute',
                bottom: '1.25rem',
                left: '1.5rem',
                right: '4.5rem',
                zIndex: 2,
                color: '#fff'
              }}>
                <h2 style={{ margin: 0, fontSize: '1.35rem', fontWeight: 800, lineHeight: 1.25, color: '#fff', textShadow: '0 1px 3px rgba(0,0,0,0.6)' }}>
                  {selectedUni.name}
                </h2>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'rgba(255, 255, 255, 0.85)', fontSize: '0.8rem', fontWeight: 600 }}>
                    <MapPin size={13} style={{ color: '#fff', opacity: 0.85 }} /> {selectedUni.city}, {selectedUni.country}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <button style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', backgroundColor: 'rgba(255, 255, 255, 0.95)', color: '#475569', border: '1px solid #e2e8f0', padding: '3px 9px', borderRadius: '9999px', fontSize: '0.7rem', fontWeight: 700, cursor: 'pointer', boxShadow: '0 2px 6px rgba(0,0,0,0.1)', transition: 'all 0.15s' }}>
                      <Pencil size={11} /> Edit
                    </button>
                    <button style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', backgroundColor: '#E09100', color: '#fff', border: 'none', padding: '3px 9px', borderRadius: '9999px', fontSize: '0.7rem', fontWeight: 700, cursor: 'pointer', boxShadow: '0 2px 6px rgba(0,0,0,0.1)', transition: 'all 0.15s' }}>
                      <ExternalLink size={11} /> View Website
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div style={{ padding: '1.5rem 1.75rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', flex: 1 }}>

              {/* Description */}
              <Section title="About the University">
                <p style={{ margin: 0, fontSize: '0.825rem', color: '#475569', lineHeight: 1.7, backgroundColor: '#f8fafc', padding: '0.875rem', borderRadius: '10px' }}>
                  {selectedUni.description}
                </p>
              </Section>

              {/* Key Stats */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}>
                {[
                  { icon: <Award size={12} />,       label: 'World Rank',     value: `#${selectedUni.ranking}`,      color: '#92400e', bg: '#fef9ec' },
                  { icon: <BookOpen size={12} />,    label: 'Courses',        value: `${selectedUni.courses}`,        color: '#1e40af', bg: '#eff6ff' },
                  { icon: <Users size={12} />,       label: 'Our Students',   value: `${selectedUni.students}`,       color: '#065f46', bg: '#ecfdf5' },
                  { icon: <TrendingUp size={12} />,  label: 'Acceptance',     value: `${selectedUni.acceptanceRate}%`, color: '#5b21b6', bg: '#f5f3ff' },
                  { icon: <GraduationCap size={12} />, label: 'Partner Since', value: selectedUni.partnerSince,       color: '#0f172a', bg: '#f8fafc' },
                  { icon: <Building2 size={12} />,   label: 'Type',           value: selectedUni.type,                color: '#0f172a', bg: '#f8fafc' },
                ].map(stat => (
                  <div key={stat.label} style={{ backgroundColor: stat.bg, borderRadius: '8px', padding: '0.35rem 0.6rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.4rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <div style={{ color: stat.color }}>{stat.icon}</div>
                      <div style={{ fontSize: '0.6rem', color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{stat.label}</div>
                    </div>
                    <div style={{ fontWeight: 800, color: stat.color, fontSize: '0.78rem', flexShrink: 0 }}>{stat.value}</div>
                  </div>
                ))}
              </div>

              {/* Subject Areas */}
              <Section title="Subject Areas Offered">
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {selectedUni.subjectAreas.map(s => (
                    <span key={s} style={{ backgroundColor: '#fef9ec', color: '#92400e', border: '1px solid #fcd34d', padding: '4px 12px', borderRadius: '9999px', fontSize: '0.78rem', fontWeight: 700 }}>{s}</span>
                  ))}
                </div>
              </Section>

              {/* Popular Programs */}
              <Section title="Popular Programs">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                  {selectedUni.popularPrograms.map(p => (
                    <div key={p} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#f8fafc', padding: '0.5rem 0.75rem', borderRadius: '8px' }}>
                      <div style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#E09100', flexShrink: 0 }} />
                      <span style={{ fontSize: '0.78rem', color: '#334155', fontWeight: 500 }}>{p}</span>
                    </div>
                  ))}
                </div>
              </Section>

              {/* Entry Requirements */}
              <Section title="Entry Requirements">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {selectedUni.requirements.map((r, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.8rem', color: '#475569' }}>
                      <div style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#ecfdf5', border: '1px solid #a7f3d0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '1px' }}>
                        <div style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#10b981' }} />
                      </div>
                      {r}
                    </div>
                  ))}
                </div>
              </Section>

              {/* Tags */}
              <Section title="Highlights">
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {selectedUni.tags.map(t => (
                    <span key={t} style={{ backgroundColor: '#fef9ec', color: '#92400e', border: '1px solid #fcd34d', padding: '4px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 600 }}>{t}</span>
                  ))}
                </div>
              </Section>

              {/* Tuition & Intakes */}
              <Section title="Fees & Intakes">
                <DetailRow icon={<Star size={14} />}    label="Tuition Range" value={selectedUni.tuitionRange} />
                <DetailRow icon={<Calendar size={14} />} label="Intakes"       value={selectedUni.intakes.join(', ')} />
                <DetailRow icon={<Globe size={14} />}   label="Website"       value={selectedUni.website} />
              </Section>

              {/* Contact */}
              <Section title="Liaison Contact">
                <div style={{ backgroundColor: '#f8fafc', borderRadius: '10px', padding: '0.875rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.875rem' }}>{selectedUni.contactName}</div>
                  <DetailRow icon={<Mail size={13} />}  label="Email" value={selectedUni.contactEmail} />
                  <DetailRow icon={<Phone size={13} />} label="Phone" value={selectedUni.contactPhone} />
                </div>
              </Section>

              {/* Partnership Details */}
              <Section title="Partnership Details">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {/* Status Pills */}
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {(['Active', 'Pending', 'Inactive'] as PartnerStatus[]).map(s => {
                      const sc = STATUS_CFG[s];
                      const isActive = selectedUni.status === s;
                      return (
                        <button key={s} onClick={() => updateStatus(selectedUni.id, s)}
                          style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', padding: '0.4rem 0.9rem', borderRadius: '9999px', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer', border: `1.5px solid ${isActive ? sc.border : '#e2e8f0'}`, backgroundColor: isActive ? sc.bg : '#fff', color: isActive ? sc.text : '#94a3b8', transition: 'all 0.15s' }}
                        >
                          {sc.icon} {s}
                        </button>
                      );
                    })}
                  </div>

                  {/* Official Partner Toggle */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 1rem', backgroundColor: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0', marginTop: '0.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <BadgeCheck size={18} style={{ color: selectedUni.isOfficialPartner ? '#E09100' : '#94a3b8', transition: 'color 0.2s' }} />
                      <div>
                        <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0f172a' }}>Official Partner Badge</div>
                        <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Show verified official partner checkmark</div>
                      </div>
                    </div>
                    {/* Switch Toggle */}
                    <button
                      onClick={() => toggleOfficialPartner(selectedUni.id)}
                      style={{
                        width: '42px',
                        height: '24px',
                        borderRadius: '9999px',
                        backgroundColor: selectedUni.isOfficialPartner ? '#E09100' : '#cbd5e1',
                        border: 'none',
                        cursor: 'pointer',
                        position: 'relative',
                        transition: 'background-color 0.2s',
                        padding: 0,
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      <span style={{
                        width: '18px',
                        height: '18px',
                        borderRadius: '50%',
                        backgroundColor: '#fff',
                        position: 'absolute',
                        left: selectedUni.isOfficialPartner ? '21px' : '3px',
                        transition: 'left 0.2s',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.15)'
                      }} />
                    </button>
                  </div>
                </div>
              </Section>

            </div>
          </div>
        </div>
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
        {options.map(o => <option key={o} value={o}>{o === 'All' ? `All Countries` : o}</option>)}
      </select>
      <ChevronDown size={13} color="#94a3b8" style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
    </div>
  );
}

function Pagination({ currentPage, totalPages, filtered, pageSize, setCurrentPage, inTable }: { currentPage: number; totalPages: number; filtered: University[]; pageSize: number; setCurrentPage: (p: number | ((p: number) => number)) => void; inTable?: boolean }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.25rem', borderTop: inTable ? '1px solid #f1f5f9' : 'none', marginTop: inTable ? 0 : '0.5rem' }}>
      <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
        Showing {(currentPage - 1) * pageSize + 1}–{Math.min(currentPage * pageSize, filtered.length)} of {filtered.length}
      </span>
      <div style={{ display: 'flex', gap: '0.4rem' }}>
        <PageBtn onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}><ChevronLeft size={14} /></PageBtn>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
          <PageBtn key={p} onClick={() => setCurrentPage(p)} active={p === currentPage}>{p}</PageBtn>
        ))}
        <PageBtn onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}><ChevronRight size={14} /></PageBtn>
      </div>
    </div>
  );
}

function PageBtn({ onClick, disabled, active, children }: { onClick: () => void; disabled?: boolean; active?: boolean; children: React.ReactNode }) {
  return (
    <button onClick={onClick} disabled={disabled}
      style={{ width: '32px', height: '32px', borderRadius: '7px', border: '1px solid', borderColor: active ? '#E09100' : '#e2e8f0', backgroundColor: active ? '#E09100' : disabled ? '#f8fafc' : '#fff', color: active ? '#fff' : disabled ? '#cbd5e1' : '#475569', fontSize: '0.78rem', fontWeight: 600, cursor: disabled ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s' }}
    >
      {children}
    </button>
  );
}
