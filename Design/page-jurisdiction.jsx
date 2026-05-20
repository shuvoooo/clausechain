/* =============================================================
   Page 2 — Jurisdiction Detail (Bangladesh)
   Per spec §"PAGE 2 — Jurisdiction Detail"
   ============================================================= */
const { Icon: JIcon, Flag: JFlag, FooterBuild: JFooter } = window.CC;

const DOCUMENTS = [
  {
    id: 'BD-DSA-2018',
    title: 'Digital Security Act 2018',
    type: 'act', typeLabel: 'Act',
    langs: ['EN'],
    pages: 87, clauses: 64,
    verified: 52, total: 64,
    conflicts: 1,
    updated: '2h ago',
    status: 'active',
  },
  {
    id: 'BD-PDPA-2023',
    title: 'Draft Personal Data Protection Act 2023',
    type: 'act', typeLabel: 'Draft act',
    langs: ['EN', 'BD'],
    pages: 42, clauses: 38,
    verified: 21, total: 38,
    conflicts: 0,
    updated: '14m ago',
    status: 'processing',
    badge: 'Processing',
  },
  {
    id: 'BD-ICT-2006',
    title: 'Information & Communication Technology Act 2006',
    type: 'act', typeLabel: 'Act',
    langs: ['EN'],
    pages: 56, clauses: 41,
    verified: 38, total: 41,
    conflicts: 0,
    updated: '1d ago',
    status: 'active',
  },
  {
    id: 'BD-ICT-AMD-2013',
    title: 'ICT (Amendment) Act 2013',
    type: 'amendment', typeLabel: 'Amendment',
    langs: ['EN', 'BD'],
    pages: 12, clauses: 9,
    verified: 8, total: 9,
    conflicts: 1,
    updated: '1d ago',
    status: 'active',
  },
  {
    id: 'BD-BTRA-2001',
    title: 'Bangladesh Telecommunication Regulatory Act 2001',
    type: 'act', typeLabel: 'Act',
    langs: ['EN'],
    pages: 64, clauses: 27,
    verified: 9, total: 27,
    conflicts: 0,
    updated: '3d ago',
    status: 'active',
  },
  {
    id: 'BTRC-OTT-2021',
    title: 'BTRC OTT Regulation Guidelines 2021',
    type: 'guideline', typeLabel: 'Guideline',
    langs: ['EN'],
    pages: 18, clauses: 14,
    verified: 0, total: 14,
    conflicts: 0,
    updated: '5d ago',
    status: 'non-binding',
    badge: 'Non-binding',
  },
];

const PILLARS = [
  { id: '6', name: 'Cross-border data', pct: 78, mandatory: true },
  { id: '7', name: 'Onward transfer',   pct: 64, mandatory: true },
  { id: '8', name: 'Data subject rights', pct: 32, mandatory: false },
  { id: '9', name: 'Enforcement',      pct: 18, mandatory: false },
  { id: '10', name: 'Sectoral rules',  pct: 0,  mandatory: false },
  { id: '11', name: 'Source code',     pct: 0,  mandatory: false },
  { id: '12', name: 'Cybersecurity',   pct: 12, mandatory: false },
  { id: '13', name: 'Interoperability', pct: 0, mandatory: false },
];

const JurisdictionPage = ({ onOpenDocument, onBack, onToast }) => {
  const [filterType, setFilterType] = React.useState('All');
  const [filterStatus, setFilterStatus] = React.useState('All');

  const totalClauses = DOCUMENTS.reduce((s, d) => s + d.clauses, 0);
  const totalVerified = DOCUMENTS.reduce((s, d) => s + d.verified, 0);

  return (
    <div className="page">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <span className="crumb" onClick={onBack}>Dashboard</span>
        <span className="sep">/</span>
        <span className="current">Bangladesh</span>
      </div>

      {/* Header */}
      <header className="page-header">
        <div className="row gap-md">
          <JFlag code="BD" size={36}/>
          <div>
            <h1 className="h1">Bangladesh</h1>
            <div className="subtitle">
              {DOCUMENTS.length} instruments · {totalClauses} clauses · last sync 2h ago · <span className="mono" style={{ color: 'var(--ink-700)' }}>BD · region South Asia</span>
            </div>
          </div>
        </div>
        <div className="row gap-sm">
          <button className="btn btn-secondary" onClick={() => onToast('Re-crawl drawer would open')}>
            <JIcon name="refresh"/> Trigger re-crawl
          </button>
          <button className="btn btn-primary" onClick={() => onToast('Add Document modal would open')}>
            <JIcon name="plus"/> Add document
          </button>
        </div>
      </header>

      {/* Coverage strip */}
      <div className="coverage-strip">
        {PILLARS.map(p => (
          <div key={p.id} className={`cov-pill ${p.mandatory ? 'mandatory' : 'bonus'}`} title={`Pillar ${p.id} · ${p.name}`}>
            <div className="pill-label">Pillar {p.id}{p.mandatory && ' ·  required'}</div>
            <div className="pill-name">{p.name}</div>
            <div className="pill-bar"><span style={{ width: Math.max(p.pct, 2) + '%' }}></span></div>
            <div className="pill-pct">{p.pct}%</div>
          </div>
        ))}
      </div>

      {/* Filter bar */}
      <div className="filter-bar">
        <div className="filter-search">
          <JIcon name="search" size={14}/>
          <input placeholder="Search within Bangladesh…"/>
        </div>
        <div className="chip-group">
          {['All', 'Acts', 'Amendments', 'Regulations', 'Guidelines'].map(t => (
            <button key={t} className={`fchip ${filterType === t ? 'active' : ''}`} onClick={() => setFilterType(t)}>{t}</button>
          ))}
        </div>
        <span style={{ width: 1, height: 22, background: 'var(--ink-200)' }}></span>
        <div className="chip-group">
          {['All', 'Verified', 'Pending', 'Conflicts'].map(t => (
            <button key={t} className={`fchip ${filterStatus === t ? 'active' : ''}`} onClick={() => setFilterStatus(t)}>{t}</button>
          ))}
        </div>
        <div className="view-toggle">
          <button className="active" title="List view"><JIcon name="list" size={14}/></button>
          <button title="Grid view"><JIcon name="layoutGrid" size={14}/></button>
        </div>
      </div>

      {/* Document table */}
      <div className="doc-table">
        <table>
          <thead>
            <tr>
              <th style={{ width: 36 }}>
                <input type="checkbox" style={{ accentColor: '#0FB5A7' }}/>
              </th>
              <th>Instrument</th>
              <th>Type</th>
              <th>Lang</th>
              <th style={{ textAlign: 'right' }}>Pages</th>
              <th style={{ textAlign: 'right' }}>Clauses</th>
              <th style={{ textAlign: 'right' }}>Verified</th>
              <th style={{ textAlign: 'right' }}>Conflicts</th>
              <th>Updated</th>
              <th style={{ width: 40 }}></th>
            </tr>
          </thead>
          <tbody>
            {DOCUMENTS.map(d => (
              <tr key={d.id} onClick={() => onOpenDocument(d.id)}>
                <td onClick={e => e.stopPropagation()}>
                  <input type="checkbox" style={{ accentColor: '#0FB5A7' }}/>
                </td>
                <td>
                  <div className="doc-title">{d.title}</div>
                  <div className="doc-id">{d.id}</div>
                </td>
                <td>
                  <span className={`type-pill ${d.type}`}>{d.typeLabel}</span>
                  {d.badge && <span className="chip chip-info" style={{ marginLeft: 6 }}><span className="dot"></span>{d.badge}</span>}
                </td>
                <td>
                  <span className="lang-flag-row">
                    {d.langs.map(l => <JFlag key={l} code={l === 'BD' ? 'BD' : 'EN'} size={14}/>)}
                  </span>
                </td>
                <td className="num" style={{ textAlign: 'right' }}>{d.pages}</td>
                <td className="num" style={{ textAlign: 'right' }}>{d.clauses}</td>
                <td style={{ textAlign: 'right' }}>
                  <span className={`num ${d.verified === d.total ? 'success' : d.verified > 0 ? 'success' : 'zero'}`}>
                    {d.verified}<span className="total"> / {d.total}</span>
                  </span>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <span className={`num ${d.conflicts > 0 ? 'danger' : 'zero'}`}>{d.conflicts}</span>
                </td>
                <td className="meta">{d.updated}</td>
                <td onClick={e => e.stopPropagation()}>
                  <button className="icon-btn" style={{ width: 28, height: 28 }}><JIcon name="moreH" size={14}/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Source health */}
      <div className="source-health">
        <span className="dot"></span>
        <div style={{ flex: 1 }}>
          <strong>All 4 seed URLs reachable.</strong> Last verified 2h ago · bdlaws.minlaw.gov.bd, dpdt.portal.gov.bd, btrc.gov.bd, bcc.gov.bd
        </div>
        <button className="btn btn-ghost btn-sm">Re-verify sources</button>
      </div>

      <JFooter/>
    </div>
  );
};

window.CC.JurisdictionPage = JurisdictionPage;
