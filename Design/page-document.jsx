/* =============================================================
   Page 3 — Document Workspace (Audit View)
   Per spec §"PAGE 3 — Document Workspace (The Audit View)"
   The most important page in the product.
   ============================================================= */
const { Icon: DIcon } = window.CC;

/* Outline data */
const OUTLINE = [
  { lvl: 1, label: 'Part I — Preliminary', children: [
    { lvl: 2, label: 'Chapter 1 — Definitions & application', children: [
      { lvl: 3, label: '§1  Short title, extent and commencement', status: 'verified', pillar: '—' },
      { lvl: 3, label: '§2  Definitions',                          status: 'verified', pillar: '—' },
      { lvl: 3, label: '§3  Application',                          status: 'verified', pillar: '—' },
    ]},
  ]},
  { lvl: 1, label: 'Part II — Digital Security Agency', children: [
    { lvl: 3, label: '§5  Establishment of the Agency', status: 'verified', pillar: '9.1' },
    { lvl: 3, label: '§7  Powers and duties',           status: 'verified', pillar: '9.2' },
  ]},
  { lvl: 1, label: 'Part III — Offences and penalties', children: [
    { lvl: 3, label: '§17  Illegal entrance to critical information infrastructure', status: 'verified', pillar: '12.1' },
    { lvl: 3, label: '§19  Damage to computer or computer system',                   status: 'verified', pillar: '12.2' },
    { lvl: 3, label: '§24  Publication of offensive information',                   status: 'rejected', pillar: '—'    },
    { lvl: 3, label: '§25  Publication of attacking or intimidating information',   status: 'pending',  pillar: '—'    },
    { lvl: 3, label: '§26  Publication of false data — including data localization', status: 'active',  pillar: '6.1', subs: [
      { lvl: 4, label: '§26(1)  Storage prohibition outside Bangladesh', status: 'verified', pillar: '6.1', active: true },
      { lvl: 4, label: '§26(2)  Penalty provisions',                     status: 'verified', pillar: '6.1' },
      { lvl: 4, label: '§26(3)  Exemptions for consented transfer',      status: 'pending',  pillar: '7.2' },
    ]},
    { lvl: 3, label: '§27  Cyber-terrorism', status: 'verified', pillar: '12.3' },
    { lvl: 3, label: '§28  Religious sentiments', status: 'pending',  pillar: '—' },
  ]},
  { lvl: 1, label: 'Part IV — Investigation & trial', children: [
    { lvl: 3, label: '§40  Search, seizure, arrest', status: 'verified', pillar: '9.4' },
    { lvl: 3, label: '§43  Tribunal',                status: 'verified', pillar: '9.5' },
  ]},
];

const OutlineNode = ({ n, onSelect }) => (
  <React.Fragment>
    <div
      className={`outline-node lvl-${n.lvl} ${n.active ? 'active' : ''}`}
      onClick={() => n.lvl >= 3 && onSelect && onSelect(n)}
    >
      {n.status && <span className={`status-dot ${n.status === 'active' ? 'verified' : n.status}`}></span>}
      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{n.label}</span>
      {n.pillar && n.pillar !== '—' && <span className="pillar-tag">{n.pillar}</span>}
    </div>
    {n.children && n.children.map((c, i) => <OutlineNode key={i} n={c} onSelect={onSelect}/>)}
    {n.subs    && n.subs.map((c, i)    => <OutlineNode key={i} n={c} onSelect={onSelect}/>)}
  </React.Fragment>
);

/* PDF page mock — Digital Security Act 2018, page 14 */
const PdfPage = () => (
  <div className="pdf-page">
    <div className="pg-header">
      <span>Digital Security Act, 2018  ·  bdlaws.minlaw.gov.bd</span>
      <span>14</span>
    </div>

    <h2 className="sect">25. Publication of attacking or intimidating information</h2>
    <p>(1) If any person, through any website or any electronic format, intentionally or knowingly publishes or transmits or causes to publish or transmit any information which is intimidating or threatening, he shall be punished with imprisonment for a term not exceeding three years…</p>

    <h2 className="sect">26. Punishment for publishing false data, etc.</h2>

    <div className="sub">
      <span className="num-tag">(1)</span>
      <span className="pdf-bbox">
        <span className="pin" title="Open citation a3f5…b9c2">📌</span>
        Any person whose duty is to keep, secure or process or use any data-information or
        data-information sub-system shall not save such data-information outside the territory of
        Bangladesh, and any data-information of a critical information infrastructure shall not
        be transferred outside the territory of the People's Republic of Bangladesh except in
        accordance with the directions issued by the Government from time to time.
      </span>
    </div>

    <div className="sub">
      <span className="num-tag">(2)</span>
      If any person, in contravention of sub-section (1), saves or transfers any
      data-information outside the territory of Bangladesh, he shall be punished with
      imprisonment for a term not exceeding 5 (five) years, or with fine not exceeding
      Taka 10 (ten) lakh, or with both.
    </div>

    <div className="sub">
      <span className="num-tag">(3)</span>
      <span className="pdf-bbox warn">
        <span className="pin">📌</span>
        Notwithstanding anything contained in sub-section (1), data-information may be transferred
        outside Bangladesh with the express written consent of the data subject and prior approval
        of the Director-General, subject to such terms and conditions as may be prescribed.
      </span>
    </div>

    <h2 className="sect">27. Cyber-terrorism</h2>
    <p>(1) If any person commits any of the following acts with intent to threaten the integrity, security or sovereignty of the State, or to create fear or panic among the people or any section of the people, namely…</p>

    <div className="pg-footer">Section 26 begins on page 14 · char offset 12453–12527 · SHA-256 a3f5…b9c2</div>
  </div>
);

/* Right pane: classification card */
const ClassificationPane = ({ onToast }) => (
  <div className="class-pane">
    {/* Pillar header */}
    <div className="pillar-bar">
      <div className="pillar-id">Pillar 6.1 · Cross-border data</div>
      <div className="pillar-name">Data localization requirement</div>
    </div>

    {/* Verification + hash */}
    <div className="verif-row">
      <span className="chip chip-verified"><span className="dot"></span>Verified · all gates passed</span>
      <span className="hash-badge mono-sm" onClick={() => onToast('Hash copied: a3f5b91c2d0e8e7c1f0b2c4d5a6f7b8c…')}>
        <DIcon name="copy" size={10}/>a3f5…b9c2
      </span>
      <span className="meta mono" style={{ marginLeft: 'auto' }}>§26(1)</span>
    </div>

    {/* Confidence */}
    <div className="confidence-block">
      <div className="row1">
        <span className="label">Confidence</span>
        <span className="val">0.94</span>
      </div>
      <div className="confbar"><span style={{ width: '94%' }}></span></div>
      <div className="meta" style={{ marginTop: 6 }}>
        Above 0.7 threshold · top-1 of 3 candidate pillars
      </div>
    </div>

    {/* Verbatim span */}
    <div>
      <div className="pane-section-label">Verbatim supporting span</div>
      <div className="verbatim">
        Any person…shall not save such data-information outside the territory of Bangladesh,
        and any data-information of a critical information infrastructure shall not be
        transferred outside the territory of the People's Republic of Bangladesh except in
        accordance with the directions issued by the Government from time to time.
      </div>
    </div>

    {/* Principal rule */}
    <div className="kv-section">
      <div className="kv-label">Principal rule</div>
      <div className="kv-value">
        Personal data and data of critical information infrastructure must be stored within
        the territory of Bangladesh; cross-border transfer is prohibited by default.
      </div>
    </div>

    {/* Exceptions */}
    <div className="kv-section">
      <div className="collapsible-header">
        <div className="kv-label" style={{ marginBottom: 0 }}>Exceptions</div>
        <span className="count">1 ·  §26(3)</span>
      </div>
      <ul style={{ marginTop: 8 }}>
        <li>Transfer permitted with express written consent of the data subject and prior approval of the Director-General.</li>
      </ul>
    </div>

    {/* Conditions */}
    <div className="kv-section">
      <div className="collapsible-header">
        <div className="kv-label" style={{ marginBottom: 0 }}>Conditions</div>
        <span className="count">1</span>
      </div>
      <ul style={{ marginTop: 8 }}>
        <li>Subject to such terms and conditions as may be prescribed by the Government.</li>
      </ul>
    </div>

    {/* Verification chain */}
    <div>
      <div className="pane-section-label">Verification chain</div>
      <div className="chain">
        <div className="chain-step">
          <div className="step-icon"><DIcon name="check" size={12}/></div>
          <div className="step-name">Gate 1<br/>Span match</div>
          <div className="step-meta">exact</div>
        </div>
        <span className="chain-arrow">→</span>
        <div className="chain-step">
          <div className="step-icon"><DIcon name="check" size={12}/></div>
          <div className="step-name">Gate 2<br/>NLI entailment</div>
          <div className="step-meta">0.94</div>
        </div>
        <span className="chain-arrow">→</span>
        <div className="chain-step">
          <div className="step-icon"><DIcon name="check" size={12}/></div>
          <div className="step-name">Gate 3<br/>Structural</div>
          <div className="step-meta">3/3 predicates</div>
        </div>
      </div>
    </div>

    {/* Source ribbon */}
    <div className="source-ribbon">
      Section 26(1)<span className="sep">·</span>
      Page 14<span className="sep">·</span>
      char 12453–12527<span className="sep">·</span>
      SHA-256 a3f5…b9c2<br/>
      <span style={{ color: 'var(--ink-500)' }}>Retrieved 2026-05-17 08:14:22 UTC+06 · Llama 3.1 8B · BGE-M3</span>
    </div>

    {/* Actions */}
    <div className="action-row">
      <button className="btn btn-primary" onClick={() => onToast('Approval recorded · ledger entry #3848')}>
        <DIcon name="check"/> Approve
      </button>
      <button className="btn btn-secondary" onClick={() => onToast('Edit modal would open')}>
        <DIcon name="edit"/> Edit
      </button>
      <button className="btn btn-ghost-danger" onClick={() => onToast('Reject reason modal would open')}>
        <DIcon name="xCircle"/> Reject
      </button>
    </div>

    {/* Related */}
    <div>
      <div className="pane-section-label">Related clauses in this instrument</div>
      <div className="related-list">
        <div className="related-row">
          <span className="sect">§26(2)</span>
          <span className="summary">Penalty: 5 years' imprisonment or Tk 10 lakh fine</span>
          <span className="chip chip-verified" style={{ height: 18 }}><span className="dot"></span>6.1</span>
        </div>
        <div className="related-row">
          <span className="sect">§26(3)</span>
          <span className="summary">Cross-border transfer permitted with consent</span>
          <span className="chip chip-pending" style={{ height: 18 }}><span className="dot"></span>7.2</span>
        </div>
        <div className="related-row">
          <span className="sect">§28</span>
          <span className="summary">Religious sentiments — adjacent provision</span>
          <span className="chip chip-pending" style={{ height: 18 }}><span className="dot"></span>—</span>
        </div>
      </div>
    </div>

    <div className="meta" style={{ textAlign: 'center', padding: '8px 0 24px' }}>
      End of classification · <span className="mono" style={{ color: 'var(--ink-500)' }}>entry #3847</span>
    </div>
  </div>
);

const DocumentPage = ({ onBack, onBackToDashboard, onToast }) => {
  const [selectedLabel, setSelectedLabel] = React.useState('§26(1)');
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 56px)' }}>
      {/* Doc top bar with breadcrumb + actions */}
      <div className="doc-topbar">
        <div>
          <div className="breadcrumb" style={{ marginBottom: 4 }}>
            <span className="crumb" onClick={onBackToDashboard}>Dashboard</span>
            <span className="sep">/</span>
            <span className="crumb" onClick={onBack}>Bangladesh</span>
            <span className="sep">/</span>
            <span className="current">Digital Security Act 2018</span>
          </div>
          <div className="title">
            Digital Security Act 2018
            <span className="hash-badge mono-sm" style={{ marginLeft: 12, transform: 'translateY(-3px)' }} onClick={() => onToast('Hash copied')}>
              <DIcon name="copy" size={10}/>BD-DSA-2018 · a3f5…b9c2
            </span>
          </div>
        </div>
        <div className="actions">
          <button className="btn btn-ghost-ink" onClick={() => onToast('Re-process started')}>
            <DIcon name="refresh"/> Re-process
          </button>
          <button className="btn btn-secondary" onClick={() => onToast('Export started')}>
            <DIcon name="download"/> Export document
          </button>
          <button className="btn btn-primary" onClick={() => onToast('Approved all 52 verified citations')}>
            <DIcon name="check"/> Approve all verified (52)
          </button>
        </div>
      </div>

      {/* 3-pane shell */}
      <div className="doc-shell">
        {/* LEFT pane: outline */}
        <div className="doc-pane pane-left">
          <div className="pane-header">
            <DIcon name="list" size={14}/>
            <span style={{ fontWeight: 600, color: 'var(--ink-900)' }}>Outline</span>
            <span className="meta" style={{ marginLeft: 'auto' }}>64 clauses</span>
          </div>
          <div className="outline-search">
            <DIcon name="search" size={13}/>
            <input placeholder="Filter outline…"/>
          </div>
          <div className="pane-body">
            <div className="outline-list">
              {OUTLINE.map((n, i) => <OutlineNode key={i} n={n} onSelect={x => setSelectedLabel(x.label)}/>)}
            </div>
          </div>
        </div>

        {/* CENTER pane: PDF */}
        <div className="doc-pane pane-center">
          <div className="pdf-toolbar">
            <div className="pdf-pages">
              <button className="icon-btn" style={{ width: 28, height: 28 }}><DIcon name="chevronLeft" size={14}/></button>
              <span className="mono" style={{ fontSize: 12 }}>
                Page <input className="page-input" defaultValue="14"/> of 87
              </span>
              <button className="icon-btn" style={{ width: 28, height: 28 }}><DIcon name="chevronRight" size={14}/></button>
            </div>
            <div className="row gap-sm">
              <span className="chip chip-verified"><span className="dot"></span>Verified citation on this page</span>
              <button className="btn btn-ghost btn-sm">
                <DIcon name="arrowUpRight" size={12}/> View original source
              </button>
            </div>
          </div>
          <div className="pdf-scroll" style={{ position: 'relative' }}>
            <PdfPage/>
            <div className="zoom-fab">
              <button>−</button>
              <span className="val">100%</span>
              <button>+</button>
            </div>
          </div>
        </div>

        {/* RIGHT pane: classification */}
        <div className="doc-pane pane-right">
          <div className="pane-header">
            <span className="status-dot verified"></span>
            <span style={{ fontWeight: 600, color: 'var(--ink-900)' }}>{selectedLabel}</span>
            <span className="meta" style={{ marginLeft: 'auto' }}>Classification</span>
            <button className="icon-btn" style={{ width: 28, height: 28 }} title="Open in drawer"><DIcon name="panel" size={14}/></button>
          </div>
          <div className="pane-body">
            <ClassificationPane onToast={onToast}/>
          </div>
        </div>
      </div>
    </div>
  );
};

window.CC.DocumentPage = DocumentPage;
