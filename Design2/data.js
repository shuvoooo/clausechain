// ===========================================================
// ClauseChain — Mock Data
// Demo workspace: Bangladesh, Thailand, Singapore
// ===========================================================

const RDTII_PILLARS = {
  "6": {
    name: "Cross-Border Data Policies",
    mandatory: true,
    sub: {
      "6.1": "Data localization requirement",
      "6.2": "Conditional cross-border transfer",
      "6.3": "Adequacy / whitelist mechanism",
      "6.4": "Data subject consent for transfer",
    },
  },
  "7": {
    name: "Personal Data Protection",
    mandatory: true,
    sub: {
      "7.1": "Lawful basis for processing",
      "7.2": "Purpose limitation",
      "7.3": "Data subject rights",
      "7.4": "Breach notification",
      "7.5": "DPO / accountability",
    },
  },
  "8": {
    name: "Cybersecurity Obligations",
    mandatory: false,
    sub: {
      "8.1": "Critical infrastructure designation",
      "8.2": "Incident reporting",
    },
  },
  "9": {
    name: "Digital Identity",
    mandatory: false,
    sub: {
      "9.1": "National e-ID framework",
      "9.2": "Authentication standards",
    },
  },
  "12": {
    name: "Online Content Governance",
    mandatory: false,
    sub: {
      "12.1": "Content removal regime",
      "12.2": "Intermediary liability",
    },
  },
};

const JURISDICTIONS = [
  {
    code: "BD",
    name: "Bangladesh",
    flag: "🇧🇩",
    flagFallback: "BD",
    languages: ["English", "Bengali"],
    instruments: 4,
    clauses: 287,
    verified: 198,
    pending: 41,
    rejected: 36,
    conflicts: 3,
    lastSync: "2026-05-20T08:42:00Z",
    lastSyncRel: "12m ago",
    coverage: {
      "6": { verified: 18, pending: 4, rejected: 3, total: 28 },
      "7": { verified: 22, pending: 6, rejected: 5, total: 36 },
      "8": { verified: 4, pending: 1, rejected: 0, total: 8 },
    },
  },
  {
    code: "TH",
    name: "Thailand",
    flag: "🇹🇭",
    flagFallback: "TH",
    languages: ["Thai", "English"],
    instruments: 3,
    clauses: 312,
    verified: 241,
    pending: 38,
    rejected: 28,
    conflicts: 1,
    lastSync: "2026-05-20T06:18:00Z",
    lastSyncRel: "2h ago",
    coverage: {
      "6": { verified: 22, pending: 3, rejected: 2, total: 28 },
      "7": { verified: 30, pending: 4, rejected: 2, total: 36 },
      "8": { verified: 6, pending: 1, rejected: 0, total: 8 },
    },
  },
  {
    code: "SG",
    name: "Singapore",
    flag: "🇸🇬",
    flagFallback: "SG",
    languages: ["English"],
    instruments: 5,
    clauses: 418,
    verified: 387,
    pending: 18,
    rejected: 13,
    conflicts: 0,
    lastSync: "2026-05-19T22:05:00Z",
    lastSyncRel: "11h ago",
    coverage: {
      "6": { verified: 26, pending: 1, rejected: 1, total: 28 },
      "7": { verified: 34, pending: 1, rejected: 1, total: 36 },
      "8": { verified: 7, pending: 1, rejected: 0, total: 8 },
      "9": { verified: 3, pending: 0, rejected: 0, total: 5 },
    },
  },
];

const DOCUMENTS = {
  BD: [
    {
      id: "BD-DSA-2018",
      title: "Digital Security Act 2018",
      type: "Act",
      languages: ["English", "Bengali"],
      pages: 42,
      clauses: 96,
      verified: 78,
      pending: 12,
      rejected: 6,
      conflicts: 1,
      updated: "2026-05-20T08:42:00Z",
      updatedRel: "12m ago",
      sourceUrl: "https://bdlaws.minlaw.gov.bd/act-1261.html",
      sourceHash: "a3f57c2eb19d44e9b1c2f8a47b9e2c0d6f4d3a8e7c5b9a1f3e2d8c4b6a5f9c2",
      authority: "Primary",
    },
    {
      id: "BD-PDPA-2023D",
      title: "Personal Data Protection Act 2023 (Draft)",
      type: "Amendment",
      languages: ["Bengali", "English"],
      pages: 28,
      clauses: 74,
      verified: 51,
      pending: 16,
      rejected: 7,
      conflicts: 2,
      updated: "2026-05-19T14:22:00Z",
      updatedRel: "1d ago",
      sourceUrl: "https://dpdt.portal.gov.bd/draft-pdpa-2023.pdf",
      sourceHash: "b8e91f24c3da55fa7d8e9c1b3a6f5d2e0c4b7a8f1d3e5c7b9a2f4d6e8c0a3b5",
      authority: "Primary",
    },
    {
      id: "BD-ICTA-2006",
      title: "Information & Communication Technology Act 2006",
      type: "Act",
      languages: ["English", "Bengali"],
      pages: 58,
      clauses: 84,
      verified: 56,
      pending: 8,
      rejected: 20,
      conflicts: 0,
      updated: "2026-05-18T11:00:00Z",
      updatedRel: "2d ago",
      sourceUrl: "https://bdlaws.minlaw.gov.bd/act-950.html",
      sourceHash: "c2d8e5f1b7a3946c0e2f5a8b1d4c7e9f2a5b8d1c4e7f0a3b6c9d2e5f8a1b4c7",
      authority: "Primary",
    },
    {
      id: "BD-BTRA-GL-2024",
      title: "BTRC Guidelines on Data Storage (2024)",
      type: "Guideline",
      languages: ["English"],
      pages: 12,
      clauses: 33,
      verified: 13,
      pending: 5,
      rejected: 3,
      conflicts: 0,
      updated: "2026-05-15T09:32:00Z",
      updatedRel: "5d ago",
      sourceUrl: "https://btrc.gov.bd/guidelines/data-storage-2024.pdf",
      sourceHash: "d9e0a1b2c3d4e5f60718293a4b5c6d7e8f9012a3b4c5d6e7f80192a3b4c5d6",
      authority: "Subordinate",
      binding: false,
    },
  ],
  TH: [
    {
      id: "TH-PDPA-2019",
      title: "Personal Data Protection Act B.E. 2562 (2019)",
      type: "Act",
      languages: ["Thai", "English"],
      pages: 64,
      clauses: 112,
      verified: 96,
      pending: 11,
      rejected: 5,
      conflicts: 0,
      updated: "2026-05-20T06:18:00Z",
      updatedRel: "2h ago",
      sourceUrl: "https://pdpc.or.th/pdpa-2019-en.pdf",
      sourceHash: "e1f2a3b4c5d6e7f8091a2b3c4d5e6f70819a2b3c4d5e6f7081920a3b4c5d6e7",
      authority: "Primary",
    },
    {
      id: "TH-CCA-2017",
      title: "Computer Crime Act B.E. 2550 (2007, amended 2017)",
      type: "Amendment",
      languages: ["Thai"],
      pages: 38,
      clauses: 102,
      verified: 78,
      pending: 16,
      rejected: 8,
      conflicts: 1,
      updated: "2026-05-19T16:00:00Z",
      updatedRel: "1d ago",
      sourceUrl: "https://ratchakitcha.soc.go.th/cca-2017.pdf",
      sourceHash: "f2a3b4c5d6e7f8091a2b3c4d5e6f70819a2b3c4d5e6f7081920a3b4c5d6e7f8",
      authority: "Amending",
    },
    {
      id: "TH-ETDA-2020",
      title: "ETDA Royal Decrees on Electronic Transactions",
      type: "Regulation",
      languages: ["Thai", "English"],
      pages: 21,
      clauses: 98,
      verified: 67,
      pending: 11,
      rejected: 15,
      conflicts: 0,
      updated: "2026-05-18T20:00:00Z",
      updatedRel: "2d ago",
      sourceUrl: "https://etda.or.th/royal-decrees-2020.pdf",
      sourceHash: "a4b5c6d7e8f9012a3b4c5d6e7f8091a2b3c4d5e6f70819a2b3c4d5e6f7081920",
      authority: "Subordinate",
    },
  ],
  SG: [
    {
      id: "SG-PDPA-2012",
      title: "Personal Data Protection Act 2012 (as amended)",
      type: "Act",
      languages: ["English"],
      pages: 88,
      clauses: 134,
      verified: 128,
      pending: 4,
      rejected: 2,
      conflicts: 0,
      updated: "2026-05-19T22:05:00Z",
      updatedRel: "11h ago",
      sourceUrl: "https://sso.agc.gov.sg/Act/PDPA2012",
      sourceHash: "b5c6d7e8f9012a3b4c5d6e7f8091a2b3c4d5e6f70819a2b3c4d5e6f70819a2b3",
      authority: "Primary",
    },
    {
      id: "SG-CSA-2018",
      title: "Cybersecurity Act 2018",
      type: "Act",
      languages: ["English"],
      pages: 62,
      clauses: 88,
      verified: 81,
      pending: 4,
      rejected: 3,
      conflicts: 0,
      updated: "2026-05-19T18:30:00Z",
      updatedRel: "14h ago",
      sourceUrl: "https://sso.agc.gov.sg/Act/CSA2018",
      sourceHash: "c6d7e8f9012a3b4c5d6e7f8091a2b3c4d5e6f70819a2b3c4d5e6f70819a2b3c4",
      authority: "Primary",
    },
    {
      id: "SG-MAS-2020",
      title: "MAS Notice on Cross-Border Data Transfers",
      type: "Regulation",
      languages: ["English"],
      pages: 18,
      clauses: 64,
      verified: 60,
      pending: 3,
      rejected: 1,
      conflicts: 0,
      updated: "2026-05-15T10:12:00Z",
      updatedRel: "5d ago",
      sourceUrl: "https://mas.gov.sg/notice-data-transfer-2020.pdf",
      sourceHash: "d7e8f9012a3b4c5d6e7f8091a2b3c4d5e6f70819a2b3c4d5e6f70819a2b3c4d5",
      authority: "Subordinate",
    },
  ],
};

// Document outline + classifications for BD-DSA-2018 (the hero document)
const DOC_DETAIL_BDDSA = {
  id: "BD-DSA-2018",
  title: "Digital Security Act 2018",
  jurisdiction: "Bangladesh",
  jurisdictionCode: "BD",
  language: "English (with Bengali parallel text)",
  sourceUrl: "https://bdlaws.minlaw.gov.bd/act-1261.html",
  sourceHash: "a3f57c2eb19d44e9b1c2f8a47b9e2c0d6f4d3a8e7c5b9a1f3e2d8c4b6a5f9c2",
  lastProcessed: "2026-05-20T08:42:00Z",
  lastProcessedRel: "12m ago",
  pages: 42,
  outline: [
    {
      type: "part", number: "I", title: "Preliminary",
      children: [
        { id: "s1",  type: "section", number: "1",  title: "Short title and commencement", status: "verified", pillar: null },
        { id: "s2",  type: "section", number: "2",  title: "Definitions", status: "verified", pillar: null },
      ],
    },
    {
      type: "part", number: "II", title: "Digital Security Agency",
      children: [
        { id: "s5",  type: "section", number: "5",  title: "Establishment of Agency", status: "verified", pillar: "8.1" },
        { id: "s8",  type: "section", number: "8",  title: "Powers of the Director General", status: "verified", pillar: "8.1" },
      ],
    },
    {
      type: "part", number: "V", title: "Crimes and Punishments",
      children: [
        { id: "s24", type: "section", number: "24", title: "Identity fraud", status: "verified", pillar: "7.1" },
        { id: "s25", type: "section", number: "25", title: "Publishing offensive information", status: "pending", pillar: "12.1" },
        { id: "s26", type: "section", number: "26", title: "Punishment for publishing identity-related information",
          active: true, status: "verified", pillar: "6.1" },
        { id: "s27", type: "section", number: "27", title: "Cyber-terrorism", status: "verified", pillar: "8.2" },
        { id: "s28", type: "section", number: "28", title: "Hurting religious values", status: "rejected", pillar: null,
          rejectionGate: "Gate 2 (NLI Entailment)" },
        { id: "s29", type: "section", number: "29", title: "Defamation", status: "pending", pillar: "12.1" },
        { id: "s30", type: "section", number: "30", title: "Identity-related crimes with computer", status: "verified", pillar: "7.1" },
        { id: "s31", type: "section", number: "31", title: "Disturbing law and order", status: "verified", pillar: null },
        { id: "s32", type: "section", number: "32", title: "Breach of secrecy", status: "verified", pillar: "7.2" },
        { id: "s33", type: "section", number: "33", title: "Hacking offences", status: "verified", pillar: "8.2", conflict: true },
        { id: "s34", type: "section", number: "34", title: "Illegal entry into critical infrastructure", status: "verified", pillar: "8.1" },
      ],
    },
    {
      type: "part", number: "VI", title: "Investigation, Trial and Appeal",
      children: [
        { id: "s40", type: "section", number: "40", title: "Investigation procedure", status: "pending", pillar: null },
        { id: "s43", type: "section", number: "43", title: "Search, seizure and arrest", status: "rejected", pillar: null,
          rejectionGate: "Gate 3 (Structural Plausibility)" },
      ],
    },
  ],
  // Active classification — Section 26(1), the hero example
  classification: {
    clauseId: "s26",
    sectionNumber: "26(1)",
    title: "Punishment for publishing identity-related information",
    pillar: "6.1",
    pillarLabel: "Pillar 6.1 — Data Localization Requirement",
    status: "verified",
    confidence: 0.94,
    hash: "a3f57c2eb19d44e9b1c2f8a47b9e2c0d6f4d3a8e7c5b9a1f3e2d8c4b6a5f9c2",
    verbatimSpan:
      "Any person who, intentionally or knowingly without lawful authority, collects, sells, takes possession of, supplies or uses any person's identity-related information, shall not save such data, including biometric information, photographs, financial records or registry information, outside the geographic boundaries of Bangladesh.",
    principalRule:
      "Identity-related personal data — including biometric, photographic, financial and registry data — must be stored within the geographic boundaries of Bangladesh.",
    exceptions: [
      "Lawful authority of a competent court or tribunal",
      "Express written consent of the data subject for a specified purpose",
    ],
    conditions: [
      "Storage facility must be physically located in Bangladesh",
      "Cross-border processing requires prior approval from the Digital Security Agency",
    ],
    gates: [
      { name: "Span Match",            kind: "lexical", status: "pass", value: "exact", detail: "0 edits · source matched character-for-character" },
      { name: "NLI Entailment",        kind: "semantic", status: "pass", value: "0.94",   detail: "DeBERTa-v3 entailment score, threshold 0.70" },
      { name: "Structural Plausibility", kind: "structural", status: "pass", value: "passed", detail: "§26(1) exists in instrument · predicates present" },
    ],
    provenance: {
      instrument: "BD-DSA-2018",
      section: "§26(1)",
      page: 14,
      charOffset: "[12453, 12527]",
      bbox: "[72, 248, 540, 286]",
      retrievedAt: "2026-05-20T08:42:11Z",
      sourceUrl: "https://bdlaws.minlaw.gov.bd/act-1261/section-46556.html",
      sha256: "a3f57c2eb19d44e9b1c2f8a47b9e2c0d6f4d3a8e7c5b9a1f3e2d8c4b6a5f9c2",
    },
  },
  rejected: {
    clauseId: "s28",
    sectionNumber: "28",
    title: "Hurting religious values",
    proposedPillar: "12.1",
    proposedPillarLabel: "Pillar 12.1 — Content removal regime",
    status: "rejected",
    failedGate: "Gate 2 (NLI Entailment)",
    verbatimSpan:
      "Whoever publishes or broadcasts any propaganda or campaign against any religion through any website or any electronic form which hurts the religious value or sentiment, shall be punished with imprisonment for a term not exceeding ten (10) years…",
    gates: [
      { name: "Span Match", status: "pass", value: "exact", detail: "0 edits · source matched" },
      { name: "NLI Entailment", status: "fail", value: "0.15", detail: "Below 0.70 threshold · span does not entail claim" },
      { name: "Structural Plausibility", status: "fail", value: "0 predicates", detail: "No content-removal operative predicates found" },
    ],
  },
};

// Activity feed
const ACTIVITY = [
  { id: "a1",  type: "verified", desc: "Section 26(1) of BD-DSA-2018 verified for Pillar 6.1",  hash: "a3f5…b9c2", ts: "2m ago",  href: { page: "doc", country: "BD", doc: "BD-DSA-2018" } },
  { id: "a2",  type: "rejected", desc: "Section 28 of BD-DSA-2018 rejected — NLI gate 0.15",   hash: "7e91…44fa", ts: "4m ago",  href: { page: "doc", country: "BD", doc: "BD-DSA-2018" } },
  { id: "a3",  type: "ingested", desc: "Crawled MAS Notice 626 (Singapore) · 18 pages",        hash: "d7e8…c4d5", ts: "12m ago", href: { page: "jurisdiction", country: "SG" } },
  { id: "a4",  type: "conflict", desc: "Conflict detected: BD-DSA §33 vs. BD-ICTA §54",         hash: "9bca…2c1f", ts: "28m ago", href: { page: "doc", country: "BD", doc: "BD-DSA-2018" } },
  { id: "a5",  type: "verified", desc: "Thai PDPA §28 verified for Pillar 6.2",                 hash: "e1f2…d6e7", ts: "41m ago", href: { page: "doc", country: "TH", doc: "TH-PDPA-2019" } },
  { id: "a6",  type: "rejected", desc: "BD-ICTA §57 rejected — Gate 1 Span Match (fuzzy 4 edits)", hash: "c2d8…b4c7", ts: "1h ago",  href: { page: "doc", country: "BD", doc: "BD-ICTA-2006" } },
  { id: "a7",  type: "ingested", desc: "OCR pass complete: TH-CCA-2017 (38 pages, Thai)",        hash: "f2a3…81f8", ts: "2h ago",  href: { page: "doc", country: "TH", doc: "TH-CCA-2017" } },
  { id: "a8",  type: "verified", desc: "SG-PDPA §26 verified for Pillar 6.2 (Adequacy)",         hash: "b5c6…2b3", ts: "3h ago",   href: { page: "doc", country: "SG", doc: "SG-PDPA-2012" } },
  { id: "a9",  type: "crawl",    desc: "Re-crawl started: bdlaws.minlaw.gov.bd (4 documents)",   hash: "—",          ts: "5h ago",   href: { page: "jurisdiction", country: "BD" } },
];

// Pipeline jobs (live)
const PIPELINE_JOBS = [
  { id: "j1", stage: "Crawler",    name: "etda.or.th — royal decrees", progress: 64, status: "running" },
  { id: "j2", stage: "OCR",        name: "TH-CCA-2017 — page 27/38",   progress: 71, status: "running" },
  { id: "j3", stage: "Classifier", name: "BD-PDPA-2023D · batch 4/9",  progress: 44, status: "running" },
  { id: "j4", stage: "Verifier",   name: "CVR loop · 18 pending",      progress: 22, status: "running" },
];

const LIVE_LOG = [
  { ts: "08:42:11", lvl: "ok",   text: "Gate 3 passed · §26(1) · predicates {stored within, not transferred} matched" },
  { ts: "08:42:09", lvl: "info", text: "NLI entailment(§26(1) ⊨ 6.1) = 0.94 · DeBERTa-v3" },
  { ts: "08:42:07", lvl: "info", text: "Span Match exact · char_offset [12453, 12527]" },
  { ts: "08:42:04", lvl: "info", text: "Classifier emitted JSON · pillar=6.1 · confidence=0.94" },
  { ts: "08:41:58", lvl: "err",  text: "REJECT §28 · NLI=0.15 · routed to human review" },
  { ts: "08:41:52", lvl: "info", text: "BGE-M3 retrieval · k=12 · query=‘cross-border data transfer’" },
  { ts: "08:41:47", lvl: "warn", text: "OCR consensus: Tesseract/Qwen disagreement on 4 tokens, page 14" },
  { ts: "08:41:33", lvl: "info", text: "Loaded BD-DSA-2018 · 42 pages · 96 clauses · lang=en+bn" },
];

// Ledger
const LEDGER_ENTRIES = [
  { entryNo: 18429, type: "VERIFIED",     desc: "§26(1) of BD-DSA-2018 verified for Pillar 6.1", ownHash: "a3f57c2e…b9c2", prevHash: "9bca31d7…2c1f", ts: "2026-05-20T08:42:11Z", actor: "system" },
  { entryNo: 18428, type: "REJECTED",     desc: "§28 of BD-DSA-2018 rejected · Gate 2 NLI=0.15", ownHash: "7e91a8d2…44fa", prevHash: "5dc41e93…7eaa", ts: "2026-05-20T08:41:58Z", actor: "system" },
  { entryNo: 18427, type: "INGESTED",     desc: "MAS Notice 626 (SG) ingested · 18 pages",        ownHash: "d7e8f901…c4d5", prevHash: "c2d8e5f1…b4c7", ts: "2026-05-20T08:30:14Z", actor: "system" },
  { entryNo: 18426, type: "CONFLICT",     desc: "Conflict logged: BD-DSA §33 vs. BD-ICTA §54",   ownHash: "9bca31d7…2c1f", prevHash: "8aa72c4e…d109", ts: "2026-05-20T08:14:08Z", actor: "system" },
  { entryNo: 18425, type: "HUMAN_EDIT",   desc: "Reviewer edited verbatim_span on TH-PDPA §28",   ownHash: "5dc41e93…7eaa", prevHash: "4cb30d82…6e99", ts: "2026-05-20T08:00:22Z", actor: "n.tan@un-pdpa" },
  { entryNo: 18424, type: "VERIFIED",     desc: "TH-PDPA §28 verified for Pillar 6.2",            ownHash: "e1f2a3b4…d6e7", prevHash: "3ba20c71…5d88", ts: "2026-05-20T07:55:01Z", actor: "system" },
  { entryNo: 18423, type: "REJECTED",     desc: "BD-ICTA §57 rejected · Gate 1 Span Match",       ownHash: "8aa72c4e…d109", prevHash: "2a91fb60…4c77", ts: "2026-05-20T06:18:33Z", actor: "system" },
  { entryNo: 18422, type: "INGESTED",     desc: "TH-CCA-2017 OCR complete · 38 pages (Thai)",    ownHash: "f2a3b4c5…81f8", prevHash: "1f80ea59…3b66", ts: "2026-05-20T05:55:00Z", actor: "system" },
  { entryNo: 18421, type: "CRAWL",        desc: "Re-crawl scheduled: bdlaws.minlaw.gov.bd",       ownHash: "4cb30d82…6e99", prevHash: "0e7fd948…2a55", ts: "2026-05-20T03:00:00Z", actor: "system" },
  { entryNo: 18420, type: "VERIFIED",     desc: "SG-PDPA §26 verified for Pillar 6.2",            ownHash: "b5c6d7e8…2b3", prevHash: "0e7fd948…2a55", ts: "2026-05-20T01:14:11Z", actor: "system" },
];

// CVR rejection breakdown
const REJECTIONS = {
  total: 77,
  byGate: [
    { gate: "Gate 1 — Span Match",            count: 18, pct: 23, color: "var(--info)" },
    { gate: "Gate 2 — NLI Entailment",        count: 41, pct: 53, color: "var(--warning)" },
    { gate: "Gate 3 — Structural Plausibility", count: 18, pct: 24, color: "var(--danger)" },
  ],
};

// Cells for the matrix — rows = jurisdictions × pillars/sub-criteria
function makeMatrixData() {
  // jurisdiction code → sub_criterion_id → { status, count, conflict? }
  return {
    BD: {
      "6.1": { status: "verified", count: 7,  conflict: false },
      "6.2": { status: "partial",  count: 4,  conflict: false },
      "6.3": { status: "rejected", count: 2,  conflict: false },
      "6.4": { status: "verified", count: 5,  conflict: false },
      "7.1": { status: "verified", count: 6,  conflict: false },
      "7.2": { status: "verified", count: 4,  conflict: false },
      "7.3": { status: "pending",  count: 3,  conflict: false },
      "7.4": { status: "partial",  count: 3,  conflict: false },
      "7.5": { status: "rejected", count: 1,  conflict: false },
      "8.1": { status: "verified", count: 3,  conflict: false },
      "8.2": { status: "conflict", count: 4,  conflict: true  },
    },
    TH: {
      "6.1": { status: "verified", count: 5,  conflict: false },
      "6.2": { status: "verified", count: 7,  conflict: false },
      "6.3": { status: "verified", count: 3,  conflict: false },
      "6.4": { status: "verified", count: 6,  conflict: false },
      "7.1": { status: "verified", count: 8,  conflict: false },
      "7.2": { status: "verified", count: 6,  conflict: false },
      "7.3": { status: "verified", count: 5,  conflict: false },
      "7.4": { status: "verified", count: 4,  conflict: false },
      "7.5": { status: "partial",  count: 3,  conflict: false },
      "8.1": { status: "verified", count: 4,  conflict: false },
      "8.2": { status: "conflict", count: 5,  conflict: true  },
    },
    SG: {
      "6.1": { status: "verified", count: 8,  conflict: false },
      "6.2": { status: "verified", count: 9,  conflict: false },
      "6.3": { status: "verified", count: 6,  conflict: false },
      "6.4": { status: "verified", count: 7,  conflict: false },
      "7.1": { status: "verified", count: 9,  conflict: false },
      "7.2": { status: "verified", count: 7,  conflict: false },
      "7.3": { status: "verified", count: 8,  conflict: false },
      "7.4": { status: "verified", count: 6,  conflict: false },
      "7.5": { status: "verified", count: 5,  conflict: false },
      "8.1": { status: "verified", count: 5,  conflict: false },
      "8.2": { status: "verified", count: 6,  conflict: false },
      "9.1": { status: "verified", count: 3,  conflict: false },
      "9.2": { status: "pending",  count: 1,  conflict: false },
    },
  };
}

// Seed registry URLs (for Add Jurisdiction modal)
const SEED_REGISTRY = {
  BD: [
    { url: "https://bdlaws.minlaw.gov.bd", status: "ok" },
    { url: "https://dpdt.portal.gov.bd",   status: "ok" },
    { url: "https://btrc.gov.bd",          status: "warn" },
    { url: "https://bcc.gov.bd",           status: "ok" },
  ],
  TH: [
    { url: "https://ratchakitcha.soc.go.th", status: "ok" },
    { url: "https://pdpc.or.th",             status: "ok" },
    { url: "https://etda.or.th",             status: "ok" },
  ],
  SG: [
    { url: "https://sso.agc.gov.sg", status: "ok" },
    { url: "https://pdpc.gov.sg",    status: "ok" },
    { url: "https://mci.gov.sg",     status: "ok" },
  ],
};

// Cross-source-conflict example for the Conflict Resolution modal
const SAMPLE_CONFLICT = {
  clause: "Cross-border transfer of biometric data",
  sources: [
    {
      label: "A",
      instrument: "BD-DSA-2018",
      title: "Digital Security Act 2018",
      authority: "Primary",
      date: "2018-10-08",
      verbatim: "Any person…shall not save such data…outside the geographic boundaries of Bangladesh.",
      classification: "Pillar 6.1 — Data Localization Requirement",
      hash: "a3f57c2e…b9c2",
    },
    {
      label: "B",
      instrument: "BD-PDPA-2023D",
      title: "Personal Data Protection Act 2023 (Draft)",
      authority: "Amending",
      date: "2023-08-14",
      verbatim: "A data controller may transfer personal data outside Bangladesh provided the recipient jurisdiction offers an adequate level of protection…",
      classification: "Pillar 6.2 — Conditional Cross-Border Transfer",
      hash: "b8e91f24…a3b5",
    },
  ],
  recommendation: {
    winner: "B",
    rationale: "Amending instrument with a later effective date (2023-08-14 > 2018-10-08) supersedes the original prohibition for affected provisions.",
  },
};

// Make accessible globally
Object.assign(window, {
  RDTII_PILLARS, JURISDICTIONS, DOCUMENTS, DOC_DETAIL_BDDSA,
  ACTIVITY, PIPELINE_JOBS, LIVE_LOG, LEDGER_ENTRIES, REJECTIONS,
  SEED_REGISTRY, SAMPLE_CONFLICT, makeMatrixData,
});
