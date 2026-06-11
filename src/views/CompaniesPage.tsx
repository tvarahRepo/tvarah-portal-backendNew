// @ts-nocheck
'use client'
import { useState, useRef } from 'react'
import './CompaniesPage.css'

// ── Config ────────────────────────────────────────────────────────────────────

const STATUS_CFG = {
  'Active':       { dot: '#22C55E', bg: '#F0FDF4', text: '#15803D' },
  'Inactive':     { dot: '#94A3B8', bg: '#F1F5F9', text: '#475569' },
  'Under Review': { dot: '#F59E0B', bg: '#FFFBEB', text: '#B45309' },
}

const INDUSTRY_CFG = {
  'Technology':   { bg: '#EEF2FF', text: '#4F46E5' },
  'IT Services':  { bg: '#F0FDFA', text: '#0D9488' },
  'E-Commerce':   { bg: '#FFF7ED', text: '#C2410C' },
  'Banking':      { bg: '#EFF6FF', text: '#1D4ED8' },
  'Food Tech':    { bg: '#FFF1F2', text: '#BE123C' },
  'Healthcare':   { bg: '#F0FDF4', text: '#15803D' },
  'Finance':      { bg: '#F5F3FF', text: '#6D28D9' },
  'EdTech':       { bg: '#FFFBEB', text: '#B45309' },
  'Mobility':     { bg: '#F0F9FF', text: '#0284C7' },
  'Consulting':   { bg: '#FEFCE8', text: '#A16207' },
  'Manufacturing':{ bg: '#FDF4FF', text: '#A21CAF' },
  'Logistics':    { bg: '#FFF7F0', text: '#C05621' },
}

const STATUS_OPTIONS   = ['Active', 'Inactive', 'Under Review']
const INDUSTRY_OPTIONS = Object.keys(INDUSTRY_CFG)
const SECTOR_OPTIONS   = [
  'Cloud & AI', 'SaaS', 'Enterprise Software', 'IT Outsourcing', 'Consulting',
  'Digital Transformation', 'Engineering Services', 'Retail Tech', 'Quick Commerce',
  'Food Delivery', 'Retail Banking', 'Investment Banking', 'Fintech', 'Payments',
  'Online Learning', 'EdTech', 'Diagnostics', 'MedTech', 'Ride-Hailing',
  'Management Consulting', 'Logistics & Supply Chain', 'Semiconductors',
]
const TYPE_OPTIONS = ['Private', 'Public', 'MNC', 'Startup', 'LLP', 'Partnership', 'Government', 'NGO', 'Other']
const DOMAIN_SOURCE_OPTIONS = ['Manual', 'Clearbit', 'LinkedIn', 'MCA Registry', 'Company Website', 'Other']

// ── Seed data ─────────────────────────────────────────────────────────────────

const SEED_COMPANIES = [
  {
    id: 'CMP-001', name: 'Google India', nameAlias: 'Google', type: 'MNC',
    industry: 'Technology', sector: 'Cloud & AI',
    headquarterCity: 'Bengaluru', headquarterState: 'Karnataka', headquarterCountry: 'India',
    foundedYear: 2004, noOfEmployees: 10000,
    status: 'Active', avgRating: 4.8, reviewCount: 234, mcaVerified: true,
    companyDomain: 'google.com', candidatePersonalDomain: '', domainSource: 'Clearbit',
  },
  {
    id: 'CMP-002', name: 'Tata Consultancy Services', nameAlias: 'TCS', type: 'Public',
    industry: 'IT Services', sector: 'IT Outsourcing',
    headquarterCity: 'Mumbai', headquarterState: 'Maharashtra', headquarterCountry: 'India',
    foundedYear: 1968, noOfEmployees: 600000,
    status: 'Active', avgRating: 4.2, reviewCount: 891, mcaVerified: true,
    companyDomain: 'tcs.com', candidatePersonalDomain: '', domainSource: 'MCA Registry',
  },
  {
    id: 'CMP-003', name: 'Infosys', nameAlias: '', type: 'Public',
    industry: 'IT Services', sector: 'Consulting',
    headquarterCity: 'Bengaluru', headquarterState: 'Karnataka', headquarterCountry: 'India',
    foundedYear: 1981, noOfEmployees: 340000,
    status: 'Active', avgRating: 4.1, reviewCount: 726, mcaVerified: true,
    companyDomain: 'infosys.com', candidatePersonalDomain: '', domainSource: 'MCA Registry',
  },
  {
    id: 'CMP-004', name: 'Amazon India', nameAlias: 'Amazon', type: 'MNC',
    industry: 'E-Commerce', sector: 'Retail Tech',
    headquarterCity: 'Bengaluru', headquarterState: 'Karnataka', headquarterCountry: 'India',
    foundedYear: 2012, noOfEmployees: 75000,
    status: 'Active', avgRating: 4.5, reviewCount: 512, mcaVerified: true,
    companyDomain: 'amazon.com', candidatePersonalDomain: '', domainSource: 'Clearbit',
  },
  {
    id: 'CMP-005', name: 'Wipro', nameAlias: '', type: 'Public',
    industry: 'IT Services', sector: 'Digital Transformation',
    headquarterCity: 'Bengaluru', headquarterState: 'Karnataka', headquarterCountry: 'India',
    foundedYear: 1945, noOfEmployees: 250000,
    status: 'Active', avgRating: 3.9, reviewCount: 643, mcaVerified: true,
    companyDomain: 'wipro.com', candidatePersonalDomain: '', domainSource: 'MCA Registry',
  },
  {
    id: 'CMP-006', name: 'HCL Technologies', nameAlias: 'HCLTech', type: 'Public',
    industry: 'IT Services', sector: 'Engineering Services',
    headquarterCity: 'Noida', headquarterState: 'Uttar Pradesh', headquarterCountry: 'India',
    foundedYear: 1976, noOfEmployees: 220000,
    status: 'Active', avgRating: 4.0, reviewCount: 389, mcaVerified: true,
    companyDomain: 'hcltech.com', candidatePersonalDomain: '', domainSource: 'MCA Registry',
  },
  {
    id: 'CMP-007', name: 'Zomato', nameAlias: '', type: 'Public',
    industry: 'Food Tech', sector: 'Quick Commerce',
    headquarterCity: 'Gurugram', headquarterState: 'Haryana', headquarterCountry: 'India',
    foundedYear: 2010, noOfEmployees: 5000,
    status: 'Active', avgRating: 3.8, reviewCount: 178, mcaVerified: true,
    companyDomain: 'zomato.com', candidatePersonalDomain: '', domainSource: 'LinkedIn',
  },
  {
    id: 'CMP-008', name: 'HDFC Bank', nameAlias: '', type: 'Public',
    industry: 'Banking', sector: 'Retail Banking',
    headquarterCity: 'Mumbai', headquarterState: 'Maharashtra', headquarterCountry: 'India',
    foundedYear: 1994, noOfEmployees: 170000,
    status: 'Active', avgRating: 4.3, reviewCount: 302, mcaVerified: true,
    companyDomain: 'hdfcbank.com', candidatePersonalDomain: '', domainSource: 'MCA Registry',
  },
  {
    id: 'CMP-009', name: 'Swiggy', nameAlias: '', type: 'Private',
    industry: 'Food Tech', sector: 'Food Delivery',
    headquarterCity: 'Bengaluru', headquarterState: 'Karnataka', headquarterCountry: 'India',
    foundedYear: 2014, noOfEmployees: 5000,
    status: 'Under Review', avgRating: 3.7, reviewCount: 156, mcaVerified: false,
    companyDomain: 'swiggy.com', candidatePersonalDomain: '', domainSource: 'LinkedIn',
  },
  {
    id: 'CMP-010', name: "Byju's", nameAlias: 'BYJU\'S', type: 'Private',
    industry: 'EdTech', sector: 'Online Learning',
    headquarterCity: 'Bengaluru', headquarterState: 'Karnataka', headquarterCountry: 'India',
    foundedYear: 2011, noOfEmployees: 10000,
    status: 'Inactive', avgRating: 2.9, reviewCount: 445, mcaVerified: true,
    companyDomain: 'byjus.com', candidatePersonalDomain: '', domainSource: 'MCA Registry',
  },
  {
    id: 'CMP-011', name: 'Ola', nameAlias: 'Ola Cabs', type: 'Private',
    industry: 'Mobility', sector: 'Ride-Hailing',
    headquarterCity: 'Bengaluru', headquarterState: 'Karnataka', headquarterCountry: 'India',
    foundedYear: 2010, noOfEmployees: 8000,
    status: 'Under Review', avgRating: 3.5, reviewCount: 267, mcaVerified: false,
    companyDomain: 'olacabs.com', candidatePersonalDomain: '', domainSource: 'LinkedIn',
  },
  {
    id: 'CMP-012', name: 'Razorpay', nameAlias: '', type: 'Private',
    industry: 'Finance', sector: 'Payments',
    headquarterCity: 'Bengaluru', headquarterState: 'Karnataka', headquarterCountry: 'India',
    foundedYear: 2014, noOfEmployees: 2800,
    status: 'Active', avgRating: 4.6, reviewCount: 134, mcaVerified: true,
    companyDomain: 'razorpay.com', candidatePersonalDomain: '', domainSource: 'Clearbit',
  },
  {
    id: 'CMP-013', name: 'Flipkart', nameAlias: '', type: 'Private',
    industry: 'E-Commerce', sector: 'Retail Tech',
    headquarterCity: 'Bengaluru', headquarterState: 'Karnataka', headquarterCountry: 'India',
    foundedYear: 2007, noOfEmployees: 30000,
    status: 'Active', avgRating: 4.0, reviewCount: 487, mcaVerified: true,
    companyDomain: 'flipkart.com', candidatePersonalDomain: '', domainSource: 'MCA Registry',
  },
  {
    id: 'CMP-014', name: 'Accenture India', nameAlias: 'Accenture', type: 'MNC',
    industry: 'Consulting', sector: 'Management Consulting',
    headquarterCity: 'Mumbai', headquarterState: 'Maharashtra', headquarterCountry: 'India',
    foundedYear: 1987, noOfEmployees: 300000,
    status: 'Active', avgRating: 4.2, reviewCount: 559, mcaVerified: true,
    companyDomain: 'accenture.com', candidatePersonalDomain: '', domainSource: 'Clearbit',
  },
]

const EMPTY_COMPANY = {
  name: '', nameAlias: '', type: 'Private',
  industry: 'Technology', sector: 'Cloud & AI',
  headquarterCity: '', headquarterState: '', headquarterCountry: 'India',
  foundedYear: new Date().getFullYear(), noOfEmployees: null,
  status: 'Active', avgRating: null, reviewCount: 0, mcaVerified: false,
  companyDomain: '', candidatePersonalDomain: '', domainSource: 'Manual',
}

const AVATAR_COLORS = [
  '#4F46E5','#0D9488','#C2410C','#1D4ED8','#BE123C',
  '#15803D','#6D28D9','#B45309','#0284C7','#7C3AED',
]

let _nextId = SEED_COMPANIES.length + 1
function newId() { return `CMP-${String(_nextId++).padStart(3, '0')}` }

// ── Sub-components ────────────────────────────────────────────────────────────

function CompanyAvatar({ name, logoUrl = null, size = 36 }) {
  if (logoUrl) {
    return (
      <img
        src={logoUrl}
        alt={name}
        className="cmp-avatar cmp-avatar-img"
        style={{ width: size, height: size }}
      />
    )
  }
  const initials = name.trim().split(/\s+/).slice(0, 2).map(w => w[0]).join('').toUpperCase() || '?'
  const color = AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length]
  return (
    <span className="cmp-avatar" style={{ background: color, width: size, height: size, fontSize: size * 0.33 }}>
      {initials}
    </span>
  )
}

function StatusBadge({ status }) {
  const c = STATUS_CFG[status] || STATUS_CFG['Inactive']
  return (
    <span className="cmp-status-badge" style={{ background: c.bg, color: c.text }}>
      <span className="cmp-status-dot" style={{ background: c.dot }} />
      {status}
    </span>
  )
}

function IndustryTag({ industry }) {
  const c = INDUSTRY_CFG[industry] || { bg: '#F1F5F9', text: '#475569' }
  return <span className="cmp-industry-tag" style={{ background: c.bg, color: c.text }}>{industry}</span>
}

function SectorTag({ sector }) {
  return <span className="cmp-sector-tag">{sector}</span>
}

function StarRating({ rating }) {
  return (
    <div className="cmp-rating">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="#F59E0B">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
      <span className="cmp-rating-val">{rating.toFixed(1)}</span>
    </div>
  )
}

function McaBadge({ verified }) {
  return verified ? (
    <span className="cmp-mca cmp-mca-yes">
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
      Verified
    </span>
  ) : (
    <span className="cmp-mca cmp-mca-no">
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
      </svg>
      Not Verified
    </span>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export default function CompaniesPage() {
  const [companies, setCompanies] = useState(SEED_COMPANIES)
  const [searchQ, setSearchQ]     = useState('')
  const [filterStatus, setFilter] = useState('All')
  const [modalOpen, setModalOpen] = useState(false)
  const [isAdding, setIsAdding]   = useState(false)
  const [editId, setEditId]       = useState(null)
  const [form, setForm]           = useState(EMPTY_COMPANY)
  const [deleteId, setDeleteId]   = useState(null)
  const [logoFile, setLogoFile]   = useState(null)
  const [logoPreview, setLogoPreview] = useState(null)
  const logoInputRef = useRef(null)

  // ── Derived ──────────────────────────────────────────────────────────────────
  const totalActive  = companies.filter(c => c.status === 'Active').length
  const totalMca     = companies.filter(c => c.mcaVerified).length
  const totalReviews = companies.reduce((s, c) => s + c.reviewCount, 0)
  const avgRating    = companies.length
    ? (companies.reduce((s, c) => s + c.avgRating, 0) / companies.length).toFixed(1)
    : '—'

  const filtered = companies.filter(c => {
    const okStatus = filterStatus === 'All' || c.status === filterStatus
    const q = searchQ.toLowerCase()
    const okSearch = !q || [c.name, c.nameAlias, c.industry, c.sector, c.headquarterCity, c.headquarterState]
      .filter(Boolean).some(s => s.toLowerCase().includes(q))
    return okStatus && okSearch
  })

  const statCards = [
    {
      label: 'Total Companies', value: companies.length, color: '#7C3AED', bg: '#F5F3FF',
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/></svg>,
    },
    {
      label: 'Active Companies', value: totalActive, color: '#15803D', bg: '#F0FDF4',
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" fill="currentColor" stroke="none"/></svg>,
    },
    {
      label: 'MCA Verified', value: totalMca, color: '#1D4ED8', bg: '#EFF6FF',
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="9 12 11 14 15 10"/></svg>,
    },
    {
      label: 'Avg Rating', value: avgRating, color: '#B45309', bg: '#FFFBEB',
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="#F59E0B"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>,
    },
    {
      label: 'Total Reviews', value: totalReviews.toLocaleString(), color: '#0D9488', bg: '#F0FDFA',
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/></svg>,
    },
  ]

  // ── CRUD ─────────────────────────────────────────────────────────────────────
  function openAdd() {
    setForm({ ...EMPTY_COMPANY })
    setIsAdding(true)
    setEditId(null)
    setLogoFile(null)
    setLogoPreview(null)
    setModalOpen(true)
  }

  function openEdit(c) {
    setForm({ ...c })
    setEditId(c.id)
    setIsAdding(false)
    setLogoFile(null)
    setLogoPreview(c.logoUrl || null)
    setModalOpen(true)
  }

  function handleLogoChange(e) {
    const file = e.target.files?.[0]
    if (!file) return
    setLogoFile(file)
    setLogoPreview(URL.createObjectURL(file))
  }

  function saveForm() {
    if (!form.name.trim()) return
    const logoUrl = logoFile ? logoPreview : (form.logoUrl || null)
    if (isAdding) {
      setCompanies(cs => [...cs, { ...form, id: newId(), logoUrl }])
    } else {
      setCompanies(cs => cs.map(c => c.id === editId ? { ...form, id: editId, logoUrl } : c))
    }
    setModalOpen(false)
  }

  function doDelete() {
    setCompanies(cs => cs.filter(c => c.id !== deleteId))
    setDeleteId(null)
  }

  function setF(field) {
    return e => setForm(prev => ({ ...prev, [field]: e.target.value }))
  }

  // ── Render ───────────────────────────────────────────────────────────────────
  return (
    <div className="cmp-root">

      {/* ── Page Header ── */}
      <div className="cmp-page-header">
        <div>
          <div className="cmp-page-header-title">Companies</div>
          <p className="cmp-page-header-meta">
            {companies.length} total · <span className="cmp-meta-active">{totalActive} active</span>
          </p>
        </div>
        <button className="cmp-add-btn" onClick={openAdd}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Add Company
        </button>
      </div>

      {/* ── Stat Cards ── */}
      <div className="cmp-stats">
        {statCards.map(s => (
          <div key={s.label} className="cmp-stat-card">
            <div className="cmp-stat-icon" style={{ background: s.bg, color: s.color }}>{s.icon}</div>
            <div>
              <div className="cmp-stat-value" style={{ color: s.color }}>{s.value}</div>
              <div className="cmp-stat-label">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Toolbar ── */}
      <div className="cmp-toolbar">
        <div className="cmp-toolbar-l">
          <div className="cmp-search-wrap">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              className="cmp-search"
              placeholder="Search company, industry, sector, location..."
              value={searchQ}
              onChange={e => setSearchQ(e.target.value)}
            />
            {searchQ && (
              <button className="cmp-search-clear" onClick={() => setSearchQ('')}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            )}
          </div>
          <div className="cmp-filter-tabs">
            {['All', ...STATUS_OPTIONS].map(s => (
              <button
                key={s}
                className={`cmp-ftab${filterStatus === s ? ' active' : ''}`}
                onClick={() => setFilter(s)}
              >
                {s}
                {s !== 'All' && (
                  <span className="cmp-ftab-count">
                    {companies.filter(c => c.status === s).length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
        <span className="cmp-count-label">
          {filtered.length} compan{filtered.length !== 1 ? 'ies' : 'y'}
        </span>
      </div>

      {/* ── Table ── */}
      <div className="cmp-table-wrap">
        <table className="cmp-table">
          <thead>
            <tr>
              <th>COMPANY</th>
              <th>INDUSTRY</th>
              <th>SECTOR</th>
              <th>STATUS</th>
              <th>AVG RATING</th>
              <th>REVIEWS</th>
              <th>MCA VERIFIED</th>
              <th className="cmp-th-actions">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={8} className="cmp-empty-row">
                  <div className="cmp-empty">
                    <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                      <path d="M12 7V3H2v18h20V7H12z"/>
                    </svg>
                    <p>No companies found</p>
                    <button className="cmp-add-btn" onClick={openAdd}>+ Add Company</button>
                  </div>
                </td>
              </tr>
            )}
            {filtered.map(c => (
              <tr key={c.id} className="cmp-tr">
                <td>
                  <div className="cmp-company-cell">
                    <CompanyAvatar name={c.name} logoUrl={c.logoUrl} size={36} />
                    <div>
                      <div className="cmp-company-name">{c.name}</div>
                      <div className="cmp-company-loc">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" opacity=".4">
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                        </svg>
                        {[c.headquarterCity, c.headquarterState].filter(Boolean).join(', ')}
                      </div>
                    </div>
                  </div>
                </td>
                <td><IndustryTag industry={c.industry} /></td>
                <td><SectorTag sector={c.sector} /></td>
                <td><StatusBadge status={c.status} /></td>
                <td><StarRating rating={c.avgRating} /></td>
                <td><span className="cmp-review-count">{c.reviewCount.toLocaleString()}</span></td>
                <td><McaBadge verified={c.mcaVerified} /></td>
                <td>
                  <div className="cmp-row-actions">
                    <button className="cmp-icon-btn cmp-edit-btn" title="Edit" onClick={() => openEdit(c)}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                      </svg>
                    </button>
                    <button className="cmp-icon-btn cmp-del-btn" title="Delete" onClick={() => setDeleteId(c.id)}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <polyline points="3 6 5 6 21 6"/>
                        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                        <path d="M10 11v6M14 11v6M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Delete Confirm Modal ── */}
      {deleteId && (() => {
        const c = companies.find(x => x.id === deleteId)
        return (
          <>
            <div className="cmp-overlay cmp-overlay-dark" onClick={() => setDeleteId(null)} />
            <div className="cmp-confirm-modal">
              <div className="cmp-confirm-icon">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round">
                  <polyline points="3 6 5 6 21 6"/>
                  <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                  <path d="M10 11v6M14 11v6M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                </svg>
              </div>
              <div className="cmp-confirm-title">Remove Company?</div>
              <div className="cmp-confirm-sub">
                You are about to remove <strong>{c?.name}</strong> from the platform. This action cannot be undone.
              </div>
              <div className="cmp-confirm-actions">
                <button className="cmp-confirm-cancel" onClick={() => setDeleteId(null)}>Cancel</button>
                <button className="cmp-confirm-delete" onClick={doDelete}>Yes, Remove</button>
              </div>
            </div>
          </>
        )
      })()}

      {/* ── Add / Edit Modal ── */}
      {modalOpen && (
        <>
          <div className="cmp-overlay cmp-overlay-dark" onClick={() => setModalOpen(false)} />
          <div className="cmp-modal">
            <div className="cmp-modal-hd">
              <div>
                <div className="cmp-modal-title">{isAdding ? 'Add New Company' : 'Edit Company'}</div>
                <div className="cmp-modal-sub">
                  {isAdding ? 'Register a new company on the platform.' : `Editing details for ${form.name || 'company'}.`}
                </div>
              </div>
              <button className="cmp-modal-close" onClick={() => setModalOpen(false)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            <div className="cmp-modal-body">

              {/* ── Logo ── */}
              <div className="cmp-logo-upload-wrap">
                <div
                  className="cmp-logo-upload-circle"
                  onClick={() => logoInputRef.current?.click()}
                  title="Upload logo"
                >
                  {logoPreview ? (
                    <img src={logoPreview} alt="Logo preview" className="cmp-logo-preview-img" />
                  ) : (
                    <span className="cmp-logo-placeholder">
                      {form.name ? form.name.trim().split(/\s+/).slice(0, 2).map(w => w[0]).join('').toUpperCase() : (
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="3" width="18" height="18" rx="2"/>
                          <circle cx="8.5" cy="8.5" r="1.5"/>
                          <polyline points="21 15 16 10 5 21"/>
                        </svg>
                      )}
                    </span>
                  )}
                  <div className="cmp-logo-camera-overlay">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                      <circle cx="12" cy="13" r="4"/>
                    </svg>
                  </div>
                </div>
                <div className="cmp-logo-upload-hint">
                  <span className="cmp-logo-upload-label">Company Logo</span>
                  <span className="cmp-logo-upload-sub">Click to upload · PNG, JPG, SVG</span>
                </div>
                <input
                  ref={logoInputRef}
                  type="file"
                  accept="image/*"
                  className="cmp-file-input"
                  onChange={handleLogoChange}
                />
              </div>

              {/* ── Basic Info ── */}
              <div className="cmp-mf-section-label">Basic Info</div>
              <div className="cmp-mf-row">
                <div className="cmp-mf-group cmp-mf-half">
                  <label className="cmp-mf-label">Company Name <span className="cmp-req">*</span></label>
                  <input className="cmp-mf-input" placeholder="e.g. Accenture India" value={form.name} onChange={setF('name')} />
                </div>
                <div className="cmp-mf-group cmp-mf-half">
                  <label className="cmp-mf-label">Name Alias</label>
                  <input className="cmp-mf-input" placeholder="e.g. TCS, HCLTech" value={form.nameAlias} onChange={setF('nameAlias')} />
                </div>
              </div>

              <div className="cmp-mf-row">
                <div className="cmp-mf-group cmp-mf-third">
                  <label className="cmp-mf-label">Type</label>
                  <select className="cmp-mf-input" value={form.type} onChange={setF('type')}>
                    {TYPE_OPTIONS.map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
                <div className="cmp-mf-group cmp-mf-third">
                  <label className="cmp-mf-label">Industry</label>
                  <select className="cmp-mf-input" value={form.industry} onChange={setF('industry')}>
                    {INDUSTRY_OPTIONS.map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
                <div className="cmp-mf-group cmp-mf-third">
                  <label className="cmp-mf-label">Sector</label>
                  <select className="cmp-mf-input" value={form.sector} onChange={setF('sector')}>
                    {SECTOR_OPTIONS.map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
              </div>

              {/* ── Headquarters ── */}
              <div className="cmp-mf-section-label">Headquarters</div>
              <div className="cmp-mf-row">
                <div className="cmp-mf-group cmp-mf-third">
                  <label className="cmp-mf-label">City</label>
                  <input className="cmp-mf-input" placeholder="e.g. Bengaluru" value={form.headquarterCity} onChange={setF('headquarterCity')} />
                </div>
                <div className="cmp-mf-group cmp-mf-third">
                  <label className="cmp-mf-label">State</label>
                  <input className="cmp-mf-input" placeholder="e.g. Karnataka" value={form.headquarterState} onChange={setF('headquarterState')} />
                </div>
                <div className="cmp-mf-group cmp-mf-third">
                  <label className="cmp-mf-label">Country</label>
                  <input className="cmp-mf-input" placeholder="e.g. India" value={form.headquarterCountry} onChange={setF('headquarterCountry')} />
                </div>
              </div>

              {/* ── Size & Status ── */}
              <div className="cmp-mf-section-label">Size & Status</div>
              <div className="cmp-mf-row">
                <div className="cmp-mf-group cmp-mf-third">
                  <label className="cmp-mf-label">Founded Year</label>
                  <input className="cmp-mf-input" type="number" min="1800" max={new Date().getFullYear()} placeholder="e.g. 2010" value={form.foundedYear ?? ''} onChange={e => setForm(p => ({ ...p, foundedYear: e.target.value ? parseInt(e.target.value) : null }))} />
                </div>
                <div className="cmp-mf-group cmp-mf-third">
                  <label className="cmp-mf-label">No. of Employees</label>
                  <input className="cmp-mf-input" type="number" min="0" placeholder="e.g. 5000" value={form.noOfEmployees ?? ''} onChange={e => setForm(p => ({ ...p, noOfEmployees: e.target.value ? parseInt(e.target.value) : null }))} />
                </div>
                <div className="cmp-mf-group cmp-mf-third">
                  <label className="cmp-mf-label">Status</label>
                  <select className="cmp-mf-input" value={form.status} onChange={setF('status')}>
                    {STATUS_OPTIONS.map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
              </div>

              {/* ── Ratings & Verification ── */}
              <div className="cmp-mf-section-label">Ratings & Verification</div>
              <div className="cmp-mf-row">
                <div className="cmp-mf-group cmp-mf-third">
                  <label className="cmp-mf-label">Avg Rating</label>
                  <input className="cmp-mf-input" type="number" min="0" max="5" step="0.1" placeholder="e.g. 4.2" value={form.avgRating ?? ''} onChange={e => setForm(p => ({ ...p, avgRating: e.target.value ? parseFloat(e.target.value) : null }))} />
                </div>
                <div className="cmp-mf-group cmp-mf-third">
                  <label className="cmp-mf-label">Review Count</label>
                  <input className="cmp-mf-input" type="number" min="0" placeholder="e.g. 120" value={form.reviewCount ?? ''} onChange={e => setForm(p => ({ ...p, reviewCount: e.target.value ? parseInt(e.target.value) : 0 }))} />
                </div>
                <div className="cmp-mf-group cmp-mf-third">
                  <label className="cmp-mf-label">MCA Verified</label>
                  <button
                    type="button"
                    className={`cmp-toggle-btn${form.mcaVerified ? ' on' : ''}`}
                    onClick={() => setForm(p => ({ ...p, mcaVerified: !p.mcaVerified }))}
                  >
                    {form.mcaVerified ? 'Verified' : 'Not Verified'}
                  </button>
                </div>
              </div>

              {/* ── Domain ── */}
              <div className="cmp-mf-section-label">Domain</div>
              <div className="cmp-mf-row">
                <div className="cmp-mf-group cmp-mf-third">
                  <label className="cmp-mf-label">Company Domain</label>
                  <input className="cmp-mf-input" placeholder="e.g. google.com" value={form.companyDomain} onChange={setF('companyDomain')} />
                </div>
                <div className="cmp-mf-group cmp-mf-third">
                  <label className="cmp-mf-label">Candidate Personal Domain</label>
                  <input className="cmp-mf-input" placeholder="e.g. gmail.com" value={form.candidatePersonalDomain} onChange={setF('candidatePersonalDomain')} />
                </div>
                <div className="cmp-mf-group cmp-mf-third">
                  <label className="cmp-mf-label">Domain Source</label>
                  <select className="cmp-mf-input" value={form.domainSource} onChange={setF('domainSource')}>
                    {DOMAIN_SOURCE_OPTIONS.map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
              </div>

            </div>

            <div className="cmp-modal-ft">
              <button className="cmp-modal-cancel" onClick={() => setModalOpen(false)}>Cancel</button>
              <button className="cmp-modal-save" onClick={saveForm}>
                {isAdding ? 'Add Company' : 'Save Changes'}
              </button>
            </div>
          </div>
        </>
      )}

    </div>
  )
}
