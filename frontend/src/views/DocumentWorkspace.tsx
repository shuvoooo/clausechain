'use client'
import { useState, useMemo } from 'react'
import Link from 'next/link'
import { RefreshCw, Download, Check, X, AlertTriangle, ExternalLink, ShieldCheck, Shield } from 'lucide-react'
import WorkspaceShell from '@/components/clausechain/WorkspaceShell'
import { StatusChip, HashBadge, VerificationChain, ConfidenceBar } from '@/components/clausechain/ui'
import { CitationDetailDrawer, RejectModal } from '@/components/clausechain/modals'
import { DOC_DETAIL_BDDSA, JURISDICTIONS } from '@/lib/clausechain/data'
import type { ClauseStatus } from '@/lib/clausechain/data'

interface Props {
  country: string
  docId: string
}

const STATUS_DOT_COLOR: Record<string, string> = {
  verified: 'var(--cc-success)',
  pending:  'var(--cc-warning)',
  rejected: 'var(--cc-danger)',
  partial:  'var(--cc-success)',
  conflict: 'var(--cc-warning)',
  none:     'var(--cc-ink-300)',
}

function StatusDot({ status }: { status: string }) {
  const labels: Record<string, string> = { verified: 'Verified', pending: 'Pending', rejected: 'Rejected', partial: 'Partial', conflict: 'Conflict' }
  if (!status || status === 'none') return null
  return (
    <span className="inline-flex items-center gap-1 text-[11px] text-cc-ink-500">
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: STATUS_DOT_COLOR[status] ?? 'var(--cc-ink-300)' }} />
      {labels[status] ?? status}
    </span>
  )
}

export default function DocumentWorkspace({ country, docId }: Props) {
  const doc = DOC_DETAIL_BDDSA
  const j = JURISDICTIONS.find((x) => x.code === country.toUpperCase()) ?? JURISDICTIONS[0]

  const [activeId, setActiveId] = useState(doc.classification.clauseId)
  const [outlineSearch, setOutlineSearch] = useState('')
  const [citationOpen, setCitationOpen] = useState(false)
  const [rejectOpen, setRejectOpen] = useState(false)

  const flatClauses = useMemo(() => {
    const out: Array<typeof doc.outline[0]['children'][0] & { partTitle: string; partNumber: string }> = []
    doc.outline.forEach((part) => {
      part.children.forEach((c) => out.push({ ...c, partTitle: part.title, partNumber: part.number }))
    })
    return out
  }, [])

  const filteredOutline = useMemo(() => {
    if (!outlineSearch.trim()) return doc.outline
    const q = outlineSearch.toLowerCase()
    return doc.outline
      .map((p) => ({
        ...p,
        children: p.children.filter(
          (c) =>
            c.number.toLowerCase().includes(q) ||
            c.title.toLowerCase().includes(q) ||
            (c.pillar && c.pillar.toLowerCase().includes(q))
        ),
      }))
      .filter((p) => p.children.length > 0)
  }, [outlineSearch])

  const activeClause = flatClauses.find((c) => c.id === activeId) ?? flatClauses[0]
  const cls = doc.classification
  const rej = doc.rejected
  const showingHero = activeId === cls.clauseId
  const showingRejected = activeId === rej.clauseId

  return (
    <WorkspaceShell
      breadcrumbs={[
        { label: 'Jurisdictions', href: '/jurisdictions' },
        { label: j.name, href: `/jurisdictions/${j.code.toLowerCase()}` },
        { label: doc.title },
      ]}
    >
      {/* Three-pane layout fills the remaining viewport height */}
      <div
        className="grid gap-4 p-4"
        style={{
          gridTemplateColumns: '280px 1fr 460px',
          height: 'calc(100vh - 56px)',
          overflow: 'hidden',
        }}
      >
        {/* ─── Outline pane ─── */}
        <div className="bg-white border border-cc-ink-200 rounded-2xl flex flex-col overflow-hidden">
          <div className="px-4 pt-4 pb-3 shrink-0">
            <p className="text-[11px] font-medium tracking-[0.06em] uppercase text-cc-ink-500 mb-2">
              Document outline
            </p>
            <input
              placeholder="Filter sections…"
              value={outlineSearch}
              onChange={(e) => setOutlineSearch(e.target.value)}
              className="w-full h-8 px-2.5 text-[13px] border border-cc-ink-300 rounded-[10px] focus:outline-none focus:border-cc-teal-500 focus:ring-2 focus:ring-cc-teal-50 bg-white text-cc-ink-900"
            />
          </div>
          <div className="flex-1 overflow-y-auto px-2 pb-4">
            {filteredOutline.map((part) => (
              <div key={part.number} className="mb-3">
                <p className="px-3 py-2 text-[11px] font-semibold tracking-[0.06em] uppercase text-cc-ink-500">
                  Part {part.number} · {part.title}
                </p>
                {part.children.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setActiveId(c.id)}
                    className={`cc-outline-node w-full text-left ${activeId === c.id ? 'active' : ''}`}
                  >
                    <span className="font-mono text-[11px] text-cc-ink-500 min-w-[28px]">§{c.number}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="truncate text-[13px]">{c.title}</span>
                        {c.conflict && <AlertTriangle size={12} className="text-cc-warning shrink-0" />}
                      </div>
                      <div className="flex items-center gap-1.5 mt-1">
                        {c.pillar && (
                          <span className="font-mono text-[11px] bg-cc-ink-100 text-cc-ink-900 px-1.5 py-0.5 rounded">
                            P{c.pillar}
                          </span>
                        )}
                        <StatusDot status={c.status} />
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* ─── Source / paper pane ─── */}
        <div className="flex flex-col gap-3 min-w-0 overflow-hidden">
          {/* Doc header card */}
          <div className="bg-white border border-cc-ink-200 rounded-2xl px-5 py-4 shrink-0">
            <div className="flex items-start gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-2">
                  <span className="font-mono text-[11px] bg-cc-ink-100 text-cc-ink-900 px-2 py-0.5 rounded">{doc.id}</span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-cc-info-bg text-cc-info">
                    <span className="w-1.5 h-1.5 rounded-full bg-current" /> Primary legislation
                  </span>
                  <span className="text-sm text-cc-ink-500">{doc.language}</span>
                </div>
                <h2 className="font-semibold text-xl tracking-tight text-cc-ink-950">{doc.title}</h2>
                <div className="flex items-center gap-3 mt-1.5 text-sm text-cc-ink-500 flex-wrap">
                  <span>{doc.jurisdiction} · {doc.pages} pages</span>
                  <span>·</span>
                  <span>Processed {doc.lastProcessedRel}</span>
                  <span>·</span>
                  <HashBadge hash={doc.sourceHash} />
                  <a
                    href={doc.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-cc-ink-600 hover:text-cc-ink-900 font-mono text-xs"
                  >
                    <ExternalLink size={11} /> {doc.sourceUrl}
                  </a>
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <button className="inline-flex items-center gap-1.5 h-8 px-3 rounded-[10px] text-xs font-medium bg-white border border-cc-ink-300 text-cc-ink-900 hover:bg-cc-ink-50 transition-colors">
                  <RefreshCw size={13} /> Re-process
                </button>
                <button className="inline-flex items-center gap-1.5 h-8 px-3 rounded-[10px] text-xs font-medium bg-white border border-cc-ink-300 text-cc-ink-900 hover:bg-cc-ink-50 transition-colors">
                  <Download size={13} /> Export
                </button>
                <button className="inline-flex items-center gap-1.5 h-8 px-3 rounded-[10px] text-xs font-medium bg-cc-teal-600 text-white hover:bg-[#0E9F92] transition-colors">
                  <Check size={13} /> Approve all verified
                </button>
              </div>
            </div>
          </div>

          {/* Conflict banner */}
          {activeClause.conflict && (
            <div className="flex items-center gap-3 px-4 py-3 bg-[#FFFBEB] border border-[#FCD34D] rounded-[10px] shrink-0">
              <span className="w-7 h-7 rounded-lg bg-cc-warning grid place-items-center text-white shrink-0">
                <AlertTriangle size={14} />
              </span>
              <div className="flex-1">
                <p className="text-sm font-semibold text-cc-ink-900">Conflict on §{activeClause.number}</p>
                <p className="text-[13px] text-cc-ink-700">Two authoritative sources disagree. Resolution required before final classification.</p>
              </div>
              <button className="inline-flex items-center gap-1.5 h-8 px-3 rounded-[10px] text-xs font-medium bg-white border border-cc-ink-300 text-cc-ink-900 hover:bg-cc-ink-50 transition-colors shrink-0">
                Resolve conflict
              </button>
            </div>
          )}

          {/* Paper view */}
          <div className="flex-1 overflow-y-auto">
            <div className="cc-paper">
              {/* Document title block */}
              <div className="text-center mb-6">
                <p className="text-[12px] tracking-[0.12em] text-cc-ink-500 uppercase">The People's Republic of Bangladesh</p>
                <h2 className="text-[22px] font-bold mt-2" style={{ fontFamily: 'serif' }}>The Digital Security Act, 2018</h2>
                <p className="text-[13px] text-cc-ink-500 mt-1">Act No. 46 of 2018 · Published in Bangladesh Gazette · 8 October 2018</p>
              </div>

              <div className="border-t border-cc-ink-200 pt-5">
                <p className="text-[13px] font-bold tracking-[0.06em] uppercase mb-3 text-cc-ink-700">Chapter V — Crimes and Punishments</p>

                {/* §26 — the hero verified clause */}
                <PaperClause
                  num="26"
                  title="Punishment for publishing identity-related information"
                  active={activeClause.number === '26'}
                  status={activeClause.status}
                  highlight={activeClause.number === '26' ? cls.verbatimSpan : undefined}
                  isRejected={false}
                  body={[
                    "(1) Any person who, intentionally or knowingly without lawful authority, collects, sells, takes possession of, supplies or uses any person's identity-related information, shall not save such data, including biometric information, photographs, financial records or registry information, outside the geographic boundaries of Bangladesh.",
                    "(2) Storage of such data within the territory of Bangladesh shall be subject to the regulations issued by the Digital Security Agency from time to time.",
                    "(3) The provisions of this section shall apply notwithstanding anything contrary contained in any other law for the time being in force, save with the express written consent of the data subject for a specified purpose.",
                  ]}
                />

                <PaperClause
                  num="27"
                  title="Cyber-terrorism"
                  active={activeClause.number === '27'}
                  status={activeClause.status}
                  body={['(1) If a person, with an intention to threaten national integrity, security or sovereignty, commits or attempts to commit a cyber-related offence…']}
                />

                {/* §28 — the rejected clause */}
                <PaperClause
                  num="28"
                  title="Hurting religious values"
                  active={activeClause.number === '28'}
                  status={activeClause.status}
                  highlight={activeClause.number === '28' ? rej.verbatimSpan : undefined}
                  isRejected={activeClause.number === '28'}
                  body={['(1) Whoever publishes or broadcasts any propaganda or campaign against any religion through any website or any electronic form which hurts the religious value or sentiment, shall be punished with imprisonment for a term not exceeding ten (10) years…']}
                />
              </div>

              <div className="absolute bottom-5 right-8 font-mono text-[11px] text-cc-ink-500">Page 14 of 42</div>
            </div>
          </div>
        </div>

        {/* ─── Classification pane ─── */}
        <div className="flex flex-col gap-3 min-w-0 overflow-y-auto">
          {showingHero && (
            <div className="bg-white border border-cc-ink-200 rounded-2xl overflow-hidden">
              {/* Header */}
              <div className="px-6 pt-5 pb-4 border-b border-cc-ink-100">
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#ECFDF5] text-[#047857]">
                    <ShieldCheck size={12} /> Verified
                  </span>
                  <span className="font-mono text-[11px] bg-cc-ink-100 text-cc-ink-900 px-2 py-0.5 rounded">§{cls.sectionNumber}</span>
                  <div className="flex-1" />
                  <HashBadge hash={cls.hash} />
                </div>
                <h3 className="font-bold text-[20px] tracking-tight text-cc-ink-950" style={{ fontFamily: 'var(--cc-font-display)' }}>
                  {cls.pillarLabel}
                </h3>
                <p className="text-sm text-cc-ink-500 mt-1.5">{cls.title}</p>
              </div>

              <div className="px-6 py-5 flex flex-col gap-5">
                {/* Confidence */}
                <div>
                  <p className="text-[11px] font-medium tracking-[0.06em] uppercase text-cc-ink-500 mb-2">Classification confidence</p>
                  <ConfidenceBar value={cls.confidence} />
                </div>

                {/* CVR chain */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[11px] font-medium tracking-[0.06em] uppercase text-cc-ink-500">CVR verification chain</p>
                    <span className="text-sm text-cc-success flex items-center gap-1">
                      <Check size={12} /> All gates passed
                    </span>
                  </div>
                  <VerificationChain gates={cls.gates} />
                </div>

                {/* Verbatim */}
                <div>
                  <p className="text-[11px] font-medium tracking-[0.06em] uppercase text-cc-ink-500 mb-2">Verbatim span</p>
                  <div className="cc-verbatim">{cls.verbatimSpan}</div>
                </div>

                {/* Principal rule */}
                <div>
                  <p className="text-[11px] font-medium tracking-[0.06em] uppercase text-cc-ink-500 mb-2">Principal rule</p>
                  <p className="text-sm text-cc-ink-900">{cls.principalRule}</p>
                </div>

                {/* Exceptions */}
                {cls.exceptions.length > 0 && (
                  <div>
                    <p className="text-[11px] font-medium tracking-[0.06em] uppercase text-cc-ink-500 mb-2">Exceptions</p>
                    <ul className="list-disc pl-4 flex flex-col gap-1">
                      {cls.exceptions.map((x, i) => (
                        <li key={i} className="text-sm text-cc-ink-700">{x}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Provenance */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[11px] font-medium tracking-[0.06em] uppercase text-cc-ink-500">Source provenance</p>
                    <button
                      onClick={() => setCitationOpen(true)}
                      className="text-xs text-cc-teal-600 hover:underline"
                    >
                      View full chain →
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-3 p-3.5 bg-cc-ink-50 border border-cc-ink-200 rounded-[10px] font-mono text-xs">
                    {[
                      ['Section', cls.provenance.section],
                      ['Page', String(cls.provenance.page)],
                      ['Char offset', cls.provenance.charOffset],
                      ['Retrieved', cls.provenance.retrievedAt],
                    ].map(([k, v]) => (
                      <div key={k}>
                        <dt className="text-cc-ink-500 font-medium">{k}</dt>
                        <dd className="text-cc-ink-900 mt-0.5 break-all">{v}</dd>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action row */}
              <div className="grid grid-cols-3 gap-2 px-4 py-3 bg-cc-ink-50 border-t border-cc-ink-200">
                <button className="flex items-center justify-center gap-1.5 h-10 rounded-[10px] text-sm font-medium bg-cc-teal-600 text-white hover:bg-[#0E9F92] transition-colors">
                  <Check size={14} /> Approve
                </button>
                <button className="flex items-center justify-center gap-1.5 h-10 rounded-[10px] text-sm font-medium bg-white border border-cc-ink-300 text-cc-ink-900 hover:bg-cc-ink-50 transition-colors">
                  Edit
                </button>
                <button
                  onClick={() => setRejectOpen(true)}
                  className="flex items-center justify-center gap-1.5 h-10 rounded-[10px] text-sm font-medium bg-transparent border border-cc-danger text-cc-danger hover:bg-cc-danger-bg transition-colors"
                >
                  <X size={14} /> Reject
                </button>
              </div>
            </div>
          )}

          {showingRejected && (
            <div className="bg-white border border-[#FECACA] rounded-2xl overflow-hidden">
              <div
                className="px-6 pt-5 pb-4 border-b border-[#FECACA]"
                style={{ background: 'linear-gradient(180deg, #FEF2F2 0%, #FFFFFF 100%)' }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#FEF2F2] text-[#B91C1C]">
                    <X size={12} /> Rejected by CVR loop
                  </span>
                  <span className="font-mono text-[11px] bg-cc-ink-100 text-cc-ink-900 px-2 py-0.5 rounded">§{rej.sectionNumber}</span>
                </div>
                <h3 className="font-bold text-[20px] tracking-tight text-cc-ink-950" style={{ fontFamily: 'var(--cc-font-display)' }}>
                  Proposed: {rej.proposedPillarLabel}
                </h3>
                <p className="text-sm text-cc-ink-500 mt-1.5">{rej.title}</p>

                <div className="flex items-center gap-2.5 mt-3.5 px-3 py-2.5 bg-white border border-[#FECACA] rounded-[10px]">
                  <span className="w-7 h-7 rounded-lg bg-cc-danger grid place-items-center text-white shrink-0">
                    <Shield size={13} />
                  </span>
                  <div className="flex-1">
                    <p className="text-[13px] font-semibold text-cc-ink-900">Caught by {rej.failedGate}</p>
                    <p className="text-xs text-cc-ink-600 mt-0.5">This output never reached the export pipeline — the system caught its own mistake.</p>
                  </div>
                </div>
              </div>

              <div className="px-6 py-5 flex flex-col gap-5">
                <div>
                  <p className="text-[11px] font-medium tracking-[0.06em] uppercase text-cc-ink-500 mb-2">CVR verification chain</p>
                  <VerificationChain gates={rej.gates} />
                </div>
                <div>
                  <p className="text-[11px] font-medium tracking-[0.06em] uppercase text-cc-ink-500 mb-2">What the model proposed</p>
                  <div className="cc-verbatim">{rej.verbatimSpan}</div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 border border-cc-ink-200 rounded-[10px] bg-cc-ink-50">
                    <p className="text-[11px] font-medium tracking-[0.06em] uppercase text-cc-ink-500 mb-1">NLI score</p>
                    <p className="font-mono text-lg font-semibold text-cc-danger">0.15 / 0.70</p>
                    <p className="text-xs text-cc-ink-500 mt-1">span ⊨ claim entailment</p>
                  </div>
                  <div className="p-3 border border-cc-ink-200 rounded-[10px] bg-cc-ink-50">
                    <p className="text-[11px] font-medium tracking-[0.06em] uppercase text-cc-ink-500 mb-1">Predicates found</p>
                    <p className="font-mono text-lg font-semibold text-cc-danger">0 / 2</p>
                    <p className="text-xs text-cc-ink-500 mt-1">for Pillar 12.1</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 px-4 py-3 bg-cc-ink-50 border-t border-cc-ink-200">
                <button className="flex items-center justify-center gap-1.5 h-10 rounded-[10px] text-sm font-medium bg-white border border-cc-ink-300 text-cc-ink-900 hover:bg-cc-ink-50 transition-colors">
                  <RefreshCw size={13} /> Re-classify
                </button>
                <button className="flex items-center justify-center gap-1.5 h-10 rounded-[10px] text-sm font-medium bg-white border border-cc-ink-300 text-cc-ink-900 hover:bg-cc-ink-50 transition-colors">
                  Mark as N/A
                </button>
              </div>
            </div>
          )}

          {!showingHero && !showingRejected && (
            <div className="bg-white border border-cc-ink-200 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-3">
                <StatusChip status={activeClause.status as ClauseStatus} />
                <span className="font-mono text-[11px] bg-cc-ink-100 text-cc-ink-900 px-2 py-0.5 rounded">§{activeClause.number}</span>
                {activeClause.pillar && (
                  <span className="font-mono text-[11px] bg-cc-ink-100 text-cc-ink-900 px-2 py-0.5 rounded">P{activeClause.pillar}</span>
                )}
              </div>
              <h3 className="font-semibold text-[17px] text-cc-ink-950">{activeClause.title}</h3>
              <p className="text-sm text-cc-ink-500 mt-2">
                {activeClause.status === 'pending'
                  ? 'This clause is in the human review queue. The CVR loop flagged it for confirmation before publication.'
                  : 'No classification has been produced for this clause yet.'}
              </p>
              <div className="flex gap-2 mt-4">
                <button className="inline-flex items-center gap-1.5 h-9 px-4 rounded-[10px] text-sm font-medium bg-cc-teal-600 text-white hover:bg-[#0E9F92] transition-colors">
                  Open in review queue
                </button>
                <button className="inline-flex items-center gap-1.5 h-9 px-4 rounded-[10px] text-sm font-medium bg-white border border-cc-ink-300 text-cc-ink-900 hover:bg-cc-ink-50 transition-colors">
                  Run classifier
                </button>
              </div>
            </div>
          )}

          {/* Related clauses */}
          <div className="bg-white border border-cc-ink-200 rounded-2xl p-5">
            <p className="text-[11px] font-medium tracking-[0.06em] uppercase text-cc-ink-500 mb-3">Related clauses · same instrument</p>
            <div className="flex flex-col gap-1">
              {flatClauses
                .filter((c) => c.id !== activeId && c.status !== 'none')
                .slice(0, 5)
                .map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setActiveId(c.id)}
                    className="flex items-center gap-2.5 px-2.5 py-2 rounded-[10px] hover:bg-cc-ink-50 transition-colors w-full text-left"
                  >
                    <span className="font-mono text-[12px] text-cc-ink-500 min-w-[36px]">§{c.number}</span>
                    <span className="flex-1 text-[13.5px] text-cc-ink-900">{c.title}</span>
                    {c.pillar && (
                      <span className="font-mono text-[11px] bg-cc-ink-100 text-cc-ink-900 px-1.5 py-0.5 rounded shrink-0">
                        P{c.pillar}
                      </span>
                    )}
                    <StatusDot status={c.status} />
                  </button>
                ))}
            </div>
          </div>
        </div>
      </div>

      <CitationDetailDrawer
        open={citationOpen}
        onClose={() => setCitationOpen(false)}
        classification={cls}
      />
      <RejectModal
        open={rejectOpen}
        onClose={() => setRejectOpen(false)}
        clauseId={cls.clauseId}
      />
    </WorkspaceShell>
  )
}

// ─── Paper clause component ───────────────────────────────────
function PaperClause({
  num,
  title,
  body,
  active,
  status,
  highlight,
  isRejected,
}: {
  num: string
  title: string
  body: string[]
  active: boolean
  status: string
  highlight?: string
  isRejected?: boolean
}) {
  const renderBody = (text: string, key: number) => {
    if (highlight && text.includes(highlight)) {
      const i = text.indexOf(highlight)
      return (
        <span key={key}>
          {text.slice(0, i)}
          <span className={`cc-clause-highlight ${isRejected ? 'rejected' : ''}`}>{highlight}</span>
          {text.slice(i + highlight.length)}
        </span>
      )
    }
    return <span key={key}>{text}</span>
  }

  return (
    <div
      className="mb-4"
      style={active ? { background: 'rgba(15,181,167,0.04)', padding: '6px 10px', borderRadius: 4, marginLeft: -10, marginRight: -10 } : undefined}
    >
      <p className="font-bold mb-1" style={{ fontSize: 14.5 }}>
        <span className="font-bold mr-1.5">{num}.</span>
        {title}
      </p>
      {body.map((b, i) => (
        <p key={i} className="my-2 text-justify" style={{ fontSize: 14.5 }}>
          {renderBody(b, i)}
        </p>
      ))}
    </div>
  )
}
