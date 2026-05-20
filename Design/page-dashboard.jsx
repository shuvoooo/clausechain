/* =============================================================
   Page 1 — Workspace Dashboard
   Per spec §"PAGE 1 — Workspace Dashboard"
   ============================================================= */
const { Icon, Sparkline, Flag, FooterBuild } = window.CC;

const KPI_DATA = [
  { label: 'Verified citations', value: '412', gradient: true,
    trend: { text: '+23 today', kind: 'up' },
    spark: [44, 48, 51, 49, 58, 63, 72] },
  { label: 'Pending review', value: '28', gradient: false,
    trend: { text: '−4 today', kind: 'flat' },
    spark: [32, 30, 36, 34, 32, 31, 28] },
  { label: 'Rejected by CVR', value: '47', gradient: false,
    trend: { text: '+6 caught', kind: 'down' },
    spark: [38, 39, 40, 42, 44, 45, 47] },
  { label: 'Avg confidence', value: '0.91', gradient: false,
    trend: { text: '+0.02', kind: 'up' },
    spark: [0.82, 0.84, 0.85, 0.87, 0.88, 0.90, 0.91] },
];

const JURISDICTIONS = [
  {
    code: 'BD', name: 'Bangladesh', instruments: 4, clauses: 162,
    p6: 78, p7: 64,
    stats: { verified: 128, pending: 14, rejected: 18, conflicts: 2 },
  },
  {
    code: 'TH', name: 'Thailand', instruments: 4, clauses: 178,
    p6: 92, p7: 88,
    stats: { verified: 156, pending: 9, rejected: 12, conflicts: 1 },
  },
  {
    code: 'SG', name: 'Singapore', instruments: 4, clauses: 147,
    p6: 100, p7: 96,
    stats: { verified: 128, pending: 5, rejected: 17, conflicts: 0 },
  },
];

const ACTIVITY = [
  { kind: 'verified', time: '2m ago', desc: <>Section <strong>26(1)</strong> of <strong>Digital Security Act 2018</strong> verified as <strong>Pillar 6.1</strong> Data Localization</>, hash: 'a3f5…b9c2' },
  { kind: 'rejected', time: '8m ago', desc: <>Section <strong>24</strong> of <strong>TH-CCA-2007</strong> rejected by <em>Gate 2 · NLI 0.15</em></>, hash: '7c2e…01ab' },
  { kind: 'ingested', time: '14m ago', desc: <>Ingested <strong>BD draft PDPA 2023</strong> · 42 pages · OCR consensus 98.4%</>, hash: '4d91…2e0f' },
  { kind: 'conflict', time: '32m ago', desc: <>Conflict on <strong>§28(2) TH-PDPA</strong> · two sources disagree on adequacy clause</>, hash: 'b108…f5da' },
  { kind: 'verified', time: '1h ago', desc: <>Section <strong>13(c)</strong> of <strong>SG-PDPA-2012</strong> verified as <strong>Pillar 7.3</strong> Onward Transfer</>, hash: '2fa9…7d44' },
  { kind: 'crawl', time: '2h ago', desc: <>Crawl completed on <strong>bdlaws.minlaw.gov.bd</strong> · 52 of 52 pages</>, hash: 'e7b0…91c3' },
];

const RUNNING_JOBS = [
  { name: 'bdlaws.minlaw.gov.bd', stage: 'Crawler · BD', pct: 65, progress: '34 / 52 pages' },
  { name: 'Bangladesh ICT Act 2006 (amendments)', stage: 'OCR · Qwen2-VL + Tesseract', pct: 42, progress: 'page 17 / 41' },
  { name: 'Thai PDPC guidelines', stage: 'Classifier · Llama 3.1 8B', pct: 88, progress: '189 / 215 clauses' },
];

const KpiCard = ({ k }) => (
  <div className="kpi-card">
    <div className="caption">{k.label}</div>
    <div className={`kpi-num ${k.gradient ? 'gradient-text' : ''}`}>{k.value}</div>
    <div className="row between">
      <span className={`kpi-trend ${k.trend.kind}`}>
        {k.trend.kind === 'up' && <Icon name="arrowUpRight" size={12}/>}
        {k.trend.text}
      </span>
      <div style={{ width: 90 }}>
        <Sparkline data={k.spark} color={k.trend.kind === 'down' ? '#EF4444' : '#0FB5A7'}/>
      </div>
    </div>
  </div>
);

const JurCard = ({ j, onClick }) => (
  <div className="jur-card" onClick={onClick}>
    <div className="head">
      <Flag code={j.code} size={22}/>
      <h3 className="h3">{j.name}</h3>
      <span className="chip chip-neutral" style={{ marginLeft: 'auto' }}>
        <span className="dot"></span>{j.instruments} instruments
      </span>
    </div>
    <div className="meta" style={{ marginTop: -6 }}>{j.clauses} clauses analyzed</div>
    <div className="coverage-bars">
      <div className="cov-row">
        <span className="label">Pillar 6</span>
        <span className="bar"><span style={{ width: `${j.p6}%` }}></span></span>
        <span className="pct">{j.p6}%</span>
      </div>
      <div className="cov-row">
        <span className="label">Pillar 7</span>
        <span className="bar"><span style={{ width: `${j.p7}%` }}></span></span>
        <span className="pct">{j.p7}%</span>
      </div>
    </div>
    <div className="jur-stats">
      <div className="jur-stat success">
        <div className="label">Verified</div>
        <div className="val">{j.stats.verified}</div>
      </div>
      <div className="jur-stat warn">
        <div className="label">Pending</div>
        <div className="val">{j.stats.pending}</div>
      </div>
      <div className="jur-stat danger">
        <div className="label">Rejected</div>
        <div className="val">{j.stats.rejected}</div>
      </div>
      <div className="jur-stat">
        <div className="label">Conflicts</div>
        <div className="val">{j.stats.conflicts}</div>
      </div>
    </div>
  </div>
);

const ActivityRow = ({ a, onClick }) => (
  <div className="act-row" onClick={onClick}>
    <div className={`act-icon ${a.kind}`}>
      {a.kind === 'verified' && <Icon name="check" size={14}/>}
      {a.kind === 'rejected' && <Icon name="x" size={14}/>}
      {a.kind === 'ingested' && <Icon name="filePlus" size={14}/>}
      {a.kind === 'conflict' && <Icon name="warn" size={14}/>}
      {a.kind === 'crawl'    && <Icon name="crawl" size={14}/>}
    </div>
    <div className="act-time">{a.time}</div>
    <div className="act-desc">{a.desc}</div>
    <div className="hash-badge mono-sm">{a.hash}</div>
    <Icon name="chevronRight" size={14} style={{ color: 'var(--ink-400)' }}/>
  </div>
);

/* Donut chart — CVR gate outcomes */
const Donut = ({ data, size = 110, thickness = 14 }) => {
  const total = data.reduce((s, d) => s + d.value, 0);
  const r = (size - thickness) / 2;
  const c = 2 * Math.PI * r;
  let acc = 0;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#F4F4F5" strokeWidth={thickness}/>
      {data.map((d, i) => {
        const len = (d.value / total) * c;
        const dash = `${len} ${c - len}`;
        const offset = c * 0.25 - acc;
        acc += len;
        return (
          <circle key={i}
            cx={size/2} cy={size/2} r={r}
            fill="none"
            stroke={d.color}
            strokeWidth={thickness}
            strokeDasharray={dash}
            strokeDashoffset={offset}
            strokeLinecap="butt"
          />
        );
      })}
      <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle"
            fontFamily="var(--font-display)" fontWeight="600" fontSize="18" fill="#0A0A0B">
        {total}
      </text>
      <text x="50%" y="65%" textAnchor="middle" dominantBaseline="middle"
            fontFamily="var(--font-text)" fontSize="9" fill="#71717A" letterSpacing="0.5">
        OUTCOMES
      </text>
    </svg>
  );
};

const DashboardPage = ({ onOpenJurisdiction, onToast }) => {
  const donutData = [
    { label: 'Passed',  value: 412, color: '#10B981' },
    { label: 'Flagged', value: 28,  color: '#F59E0B' },
    { label: 'Rejected',value: 47,  color: '#EF4444' },
  ];

  return (
    <div className="page">
      {/* Header */}
      <header className="page-header">
        <div>
          <h1 className="h1"><span className="gradient-text" style={{ fontSize: 'inherit' }}>Welcome back, Nafew</span></h1>
          <div className="subtitle">
            3 jurisdictions · 12 instruments · 487 clauses analyzed · last sync <span className="mono" style={{ color: 'var(--ink-700)' }}>2026-05-19 08:14:22 UTC+06</span>
          </div>
        </div>
        <div className="row gap-sm">
          <button className="btn btn-secondary">
            <Icon name="download"/> Export ledger
          </button>
          <button className="btn btn-primary" onClick={() => onToast('Add Jurisdiction modal would open')}>
            <Icon name="plus"/> Add jurisdiction
          </button>
        </div>
      </header>

      {/* KPI strip */}
      <div className="kpi-strip">
        {KPI_DATA.map((k, i) => <KpiCard key={i} k={k}/>)}
      </div>

      {/* Jurisdictions */}
      <div className="section-head">
        <h2 className="h2">Your jurisdictions</h2>
        <button className="btn btn-ghost btn-sm">View all <Icon name="arrowRight" size={12}/></button>
      </div>
      <div className="jur-grid">
        {JURISDICTIONS.map(j => (
          <JurCard key={j.code} j={j} onClick={() => onOpenJurisdiction(j.code)}/>
        ))}
        <div className="jur-card add" onClick={() => onToast('Add Jurisdiction modal would open')}>
          <div style={{ width: 36, height: 36, borderRadius: 999, background: 'var(--ink-100)', display: 'grid', placeItems: 'center' }}>
            <Icon name="plus" size={18}/>
          </div>
          <div style={{ fontSize: 14, fontWeight: 500 }}>Add jurisdiction</div>
          <div className="meta" style={{ textAlign: 'center', maxWidth: 180 }}>
            Seed it with official sources and begin discovery
          </div>
        </div>
      </div>

      {/* Recent activity */}
      <div className="section-head">
        <h2 className="h2">Recent activity</h2>
        <div className="row gap-sm">
          <button className="fchip active">All</button>
          <button className="fchip">Verified</button>
          <button className="fchip">Rejected</button>
          <button className="fchip">Conflicts</button>
        </div>
      </div>
      <div className="activity-list">
        {ACTIVITY.map((a, i) => (
          <ActivityRow key={i} a={a} onClick={() => onToast('Open citation ' + a.hash)}/>
        ))}
      </div>

      {/* Pipeline health */}
      <div className="section-head">
        <h2 className="h2">Pipeline health</h2>
        <button className="btn btn-ghost btn-sm">Open ledger <Icon name="arrowRight" size={12}/></button>
      </div>
      <div className="split-2">
        <div className="card" style={{ padding: 20 }}>
          <div className="caption" style={{ marginBottom: 14 }}>CVR gate outcomes · last 24h</div>
          <div className="donut-wrap">
            <Donut data={donutData}/>
            <div className="donut-legend" style={{ flex: 1 }}>
              {donutData.map((d, i) => (
                <div key={i} className="lg-row">
                  <span className="sw" style={{ background: d.color }}></span>
                  <span>{d.label}</span>
                  <span className="v">{d.value}</span>
                </div>
              ))}
              <div style={{ marginTop: 10, fontSize: 12, color: 'var(--ink-500)' }}>
                CVR caught <strong style={{ color: 'var(--ink-900)' }}>15.4%</strong> of model outputs before display.
              </div>
            </div>
          </div>
        </div>
        <div className="card" style={{ padding: 20 }}>
          <div className="row between" style={{ marginBottom: 8 }}>
            <div className="caption">Currently running</div>
            <span className="chip chip-teal"><span className="dot"></span>3 active</span>
          </div>
          {RUNNING_JOBS.map((j, i) => (
            <div key={i} className="pipeline-job">
              <div className="label">{j.name}</div>
              <div className="progress">{j.progress}</div>
              <div className="stage">{j.stage}</div>
              <div></div>
              <div className="bar"><span style={{ width: j.pct + '%' }}></span></div>
            </div>
          ))}
        </div>
      </div>

      <FooterBuild/>
    </div>
  );
};

window.CC.DashboardPage = DashboardPage;
