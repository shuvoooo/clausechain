/* =============================================================
   ClauseChain — Icons (Lucide-style inline SVGs)
   1.5px stroke per spec
   ============================================================= */
const Icon = ({ name, size = 16, className = '', style = {} }) => {
  const base = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.5,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    className,
    style,
  };
  const paths = {
    home: <><path d="M3 12l9-9 9 9"/><path d="M5 10v10h14V10"/></>,
    globe: <><circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></>,
    grid: <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>,
    scroll: <><path d="M4 4h12a2 2 0 0 1 2 2v12a2 2 0 0 0 2 2H8a2 2 0 0 1-2-2V6a2 2 0 0 0-2-2z"/><path d="M9 8h7M9 12h7M9 16h4"/></>,
    settings: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3h0a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5h0a1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8v0a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></>,
    search: <><circle cx="11" cy="11" r="7"/><path d="m20 20-3-3"/></>,
    bell: <><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 21a2 2 0 0 0 4 0"/></>,
    plus: <><path d="M12 5v14M5 12h14"/></>,
    arrowRight: <><path d="M5 12h14M13 5l7 7-7 7"/></>,
    arrowUpRight: <><path d="M7 17 17 7M7 7h10v10"/></>,
    check: <><path d="m5 12 5 5L20 7"/></>,
    checkCircle: <><circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/></>,
    x: <><path d="M6 6l12 12M18 6 6 18"/></>,
    xCircle: <><circle cx="12" cy="12" r="9"/><path d="M9 9l6 6M15 9l-6 6"/></>,
    warn: <><path d="M12 3 2 21h20L12 3z"/><path d="M12 10v5M12 18v.5"/></>,
    info: <><circle cx="12" cy="12" r="9"/><path d="M12 8h.01M11 12h1v5h1"/></>,
    file: <><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/></>,
    filePlus: <><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/><path d="M12 12v6M9 15h6"/></>,
    upload: <><path d="M12 3v12M7 8l5-5 5 5"/><path d="M5 17v2a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-2"/></>,
    download: <><path d="M12 3v12M7 10l5 5 5-5"/><path d="M5 17v2a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-2"/></>,
    refresh: <><path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/><path d="M3 21v-5h5"/></>,
    list: <><path d="M4 6h16M4 12h16M4 18h16"/></>,
    layoutGrid: <><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></>,
    moreH: <><circle cx="5" cy="12" r="1.2"/><circle cx="12" cy="12" r="1.2"/><circle cx="19" cy="12" r="1.2"/></>,
    chevronDown: <><path d="m6 9 6 6 6-6"/></>,
    chevronRight: <><path d="m9 6 6 6-6 6"/></>,
    chevronLeft: <><path d="m15 6-6 6 6 6"/></>,
    activity: <><path d="M3 12h4l3-9 4 18 3-9h4"/></>,
    crawl: <><circle cx="12" cy="12" r="3"/><path d="M3 12h4M17 12h4M12 3v4M12 17v4M5 5l3 3M16 16l3 3M19 5l-3 3M8 16l-3 3"/></>,
    pin: <><path d="M12 2 8 8h2v6l-3 3v1h10v-1l-3-3V8h2z"/></>,
    edit: <><path d="M11 4H5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h13a2 2 0 0 0 2-2v-6"/><path d="m18 2 4 4-9 9H9v-4z"/></>,
    eye: <><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></>,
    copy: <><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></>,
    zoomIn:  <><path d="M5 12h14"/></>,
    zoomOut: <><path d="M5 12h14"/></>,
    panel: <><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18"/></>,
    sparkles: <><path d="M12 3 13.5 8 18 9.5 13.5 11 12 16 10.5 11 6 9.5 10.5 8z"/><path d="M19 14l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z"/></>,
  };
  return <svg {...base}>{paths[name] || null}</svg>;
};

/* =============================================================
   Sparkline (tiny inline SVG)
   ============================================================= */
const Sparkline = ({ data, color = '#0FB5A7', height = 28 }) => {
  const w = 100, h = height;
  const max = Math.max(...data), min = Math.min(...data);
  const norm = v => (max === min ? h / 2 : h - ((v - min) / (max - min)) * (h - 4) - 2);
  const step = w / (data.length - 1);
  const points = data.map((v, i) => `${i * step},${norm(v)}`).join(' ');
  const area = `0,${h} ${points} ${w},${h}`;
  return (
    <svg className="spark" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
      <defs>
        <linearGradient id={`sg-${color}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.22"/>
          <stop offset="100%" stopColor={color} stopOpacity="0"/>
        </linearGradient>
      </defs>
      <polygon points={area} fill={`url(#sg-${color})`} />
      <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};

/* =============================================================
   Flag SVGs (simplified, just the three demo jurisdictions)
   ============================================================= */
const Flag = ({ code, size = 20 }) => {
  const w = size * 1.4, h = size;
  if (code === 'BD') return (
    <svg className="jur-flag" style={{ width: w, height: h }} viewBox="0 0 14 10">
      <rect width="14" height="10" fill="#006A4E"/>
      <circle cx="6" cy="5" r="2.8" fill="#F42A41"/>
    </svg>
  );
  if (code === 'TH') return (
    <svg className="jur-flag" style={{ width: w, height: h }} viewBox="0 0 14 10">
      <rect width="14" height="10" fill="#EF4444"/>
      <rect y="1.6" width="14" height="6.8" fill="#FFFFFF"/>
      <rect y="3.4" width="14" height="3.2" fill="#1E3A8A"/>
    </svg>
  );
  if (code === 'SG') return (
    <svg className="jur-flag" style={{ width: w, height: h }} viewBox="0 0 14 10">
      <rect width="14" height="5" fill="#EF4444"/>
      <rect y="5" width="14" height="5" fill="#FFFFFF"/>
      <circle cx="3.6" cy="2.5" r="1.6" fill="#FFFFFF"/>
      <circle cx="4.1" cy="2.5" r="1.4" fill="#EF4444"/>
    </svg>
  );
  if (code === 'EN') return (
    <svg className="jur-flag" style={{ width: w, height: h }} viewBox="0 0 14 10">
      <rect width="14" height="10" fill="#012169"/>
      <path d="M0,0 L14,10 M14,0 L0,10" stroke="#FFFFFF" strokeWidth="1.4"/>
      <path d="M7,0 v10 M0,5 h14" stroke="#FFFFFF" strokeWidth="2.4"/>
      <path d="M7,0 v10 M0,5 h14" stroke="#C8102E" strokeWidth="1.4"/>
    </svg>
  );
  return null;
};

/* =============================================================
   Shell (sidebar + topbar)
   ============================================================= */
const Sidebar = ({ current, onNav }) => (
  <aside className="sidebar">
    <div className="sidebar-logo">
      <div className="mark">⌘</div>
      <div className="name">ClauseChain</div>
    </div>
    <div className="sidebar-section-label">Workspace</div>
    <nav className="nav">
      <button className={`nav-item ${current === 'dashboard' ? 'active' : ''}`} onClick={() => onNav('dashboard')}>
        <Icon name="home"/> Dashboard
      </button>
      <button className={`nav-item ${current === 'jurisdiction' ? 'active' : ''}`} onClick={() => onNav('jurisdiction')}>
        <Icon name="globe"/> Jurisdictions <span className="nav-badge">3</span>
      </button>
      <button className={`nav-item`}>
        <Icon name="grid"/> RDTII Matrix
      </button>
      <button className={`nav-item`}>
        <Icon name="scroll"/> Pipeline &amp; Ledger
      </button>
      <button className={`nav-item`}>
        <Icon name="settings"/> Settings
      </button>
    </nav>
    <div className="sidebar-user">
      <div className="avatar">NA</div>
      <div className="user-meta">
        <div className="name">Nafew Ahmed</div>
        <div className="role">Regulatory analyst</div>
      </div>
    </div>
  </aside>
);

const TopBar = ({ onSearch }) => (
  <div className="topbar">
    <div className="topbar-search" onClick={onSearch}>
      <Icon name="search" size={14}/>
      <span>Search jurisdictions, documents, citations…</span>
      <span className="kbd">⌘K</span>
    </div>
    <div className="topbar-right">
      <button className="icon-btn" title="Notifications">
        <Icon name="bell" size={18}/>
        <span className="dot"></span>
      </button>
      <div className="avatar" style={{ width: 30, height: 30, fontSize: 12 }}>NA</div>
    </div>
  </div>
);

const FooterBuild = () => (
  <div className="footer-build">
    Build: clausechain v0.4.2 · Apache 2.0 · github.com/clausechain · last verified hash a3f5…b9c2
  </div>
);

const Toast = ({ msg, onDismiss }) => {
  React.useEffect(() => {
    if (!msg) return;
    const t = setTimeout(onDismiss, 3000);
    return () => clearTimeout(t);
  }, [msg]);
  if (!msg) return null;
  return (
    <div className="toast">
      <Icon name="checkCircle" size={16}/>
      <span>{msg}</span>
    </div>
  );
};

window.CC = window.CC || {};
Object.assign(window.CC, { Icon, Sparkline, Flag, Sidebar, TopBar, FooterBuild, Toast });
