'use client'
import { useState } from 'react'
import WorkspaceShell from '@/components/clausechain/WorkspaceShell'
import PipelineStepper from '@/components/clausechain/PipelineStepper'
import { TRACE_HIGHLIGHTS, MAPPING_STREAM } from '@/lib/clausechain/data'
import { Copy, Check, Download, ChevronDown, ChevronRight } from 'lucide-react'

// ── Types ─────────────────────────────────────────────────────
interface OutputRecord {
  indicator:      string
  indicatorLabel: string
  color:          string
  citation: {
    docId:        string
    title:        string
    jurisdiction: string
    ref:          string
    page:         number
    url:          string
  }
  verbatim:      string
  confidence:    number
  matchType:     string
  status:        string
  gates:         string[]
  gateScores:    string[]
  discoveryTags: string[]
  model:         string
  processedAt:   string
  hash:          string
}

// ── Deterministic hash ────────────────────────────────────────
function makeHash(s: string): string {
  let h = 0x811c9dc5
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 0x01000193) >>> 0
  }
  return h.toString(16).toUpperCase().padStart(8, '0')
}

// ── Build records by joining TRACE_HIGHLIGHTS with MAPPING_STREAM ──
const RECORDS: OutputRecord[] = TRACE_HIGHLIGHTS.map(h => {
  const ms = MAPPING_STREAM.find(m => m.ref === h.ref)
  const mandatory = ['6.', '7.'].some(p => h.pillar.startsWith(p))
  const scores = ms?.scores ?? [h.matchType === 'fuzzy' ? 'fuzzy·2' : 'exact', h.confidence.toFixed(2), 'pass']
  const gates  = ms?.gates  ?? ['pass', 'pass', 'pass']

  return {
    indicator:      h.pillar,
    indicatorLabel: h.textLabel,
    color:          h.color,
    citation: {
      docId:        'BD-DSA-2018',
      title:        'Digital Security Act 2018',
      jurisdiction: 'BD',
      ref:          h.ref,
      page:         h.page,
      url:          'https://bdlaws.minlaw.gov.bd/act-1261.html',
    },
    verbatim:      h.extractedText,
    confidence:    h.confidence,
    matchType:     h.matchType,
    status:        h.status,
    gates,
    gateScores:    scores,
    discoveryTags: [
      'crawl:native-pdf',
      'parser:docling',
      `gate1:${scores[0]}`,
      `gate2:nli-${scores[1]}`,
      `gate3:struct-${scores[2]}`,
      'embed:bge-m3',
      `pillar:${mandatory ? 'mandatory' : 'bonus'}`,
      'lang:en',
    ],
    model:       ms?.model ?? 'llama-3.1-8b',
    processedAt: '2026-05-23T09:45:00Z',
    hash:        makeHash(h.id + h.pillar),
  }
})

// ── Serializers ───────────────────────────────────────────────
function toPayload(records: OutputRecord[]) {
  const verified = records.filter(r => r.status === 'verified').length
  const pending  = records.filter(r => r.status === 'pending').length
  const avgConf  = records.reduce((s, r) => s + r.confidence, 0) / records.length
  return {
    runId:        'run-BD-001',
    jurisdiction: 'BD',
    framework:    'RDTII',
    version:      '1.0',
    generatedAt:  '2026-05-23T09:45:00Z',
    summary: {
      total:        records.length,
      verified,
      pending,
      pillarsHit:   [...new Set(records.map(r => r.indicator))].sort(),
      avgConfidence: parseFloat(avgConf.toFixed(3)),
    },
    records: records.map(({ color, ...r }) => r),  // strip UI-only color field
  }
}

function toCSV(records: OutputRecord[]): string {
  const hdr = ['indicator','indicator_label','doc_id','ref','page','verbatim','confidence','match_type','status','gates','gate_scores','discovery_tags','model','hash']
  const rows = records.map(r => [
    r.indicator,
    r.indicatorLabel,
    r.citation.docId,
    r.citation.ref,
    r.citation.page,
    `"${r.verbatim.replace(/"/g, '""')}"`,
    r.confidence,
    r.matchType,
    r.status,
    r.gates.join('|'),
    r.gateScores.join('|'),
    `"${r.discoveryTags.join(',')}"`,
    r.model,
    r.hash,
  ])
  return [hdr.join(','), ...rows.map(r => r.join(','))].join('\n')
}

function toJSONL(records: OutputRecord[]): string {
  return records
    .map(({ color, ...r }) => JSON.stringify(r))
    .join('\n')
}

// ── Simple JSON line colorizer ────────────────────────────────
function JsonLine({ line }: { line: string }) {
  // key: "foo": value
  const kv = line.match(/^(\s*)("[\w_]+")(\s*:\s*)(.*)$/)
  if (kv) {
    const [, indent, key, sep, rest] = kv
    return (
      <span>
        {indent}
        <span style={{ color: '#0FB5A7' }}>{key}</span>
        {sep}
        <JsonValue raw={rest} />
      </span>
    )
  }
  // bare string in array
  const arr = line.match(/^(\s*)(".*")([,]?)$/)
  if (arr) return <span>{arr[1]}<span style={{ color: '#F59E0B' }}>{arr[2]}</span>{arr[3]}</span>
  // bare number in array
  const num = line.match(/^(\s*)([\d.]+)([,]?)$/)
  if (num) return <span>{num[1]}<span style={{ color: '#7C3AED' }}>{num[2]}</span>{num[3]}</span>
  return <span>{line}</span>
}

function JsonValue({ raw }: { raw: string }) {
  const trim = raw.replace(/,$/, '')
  const comma = raw.endsWith(',') ? ',' : ''
  if (trim.startsWith('"'))   return <><span style={{ color: '#F59E0B' }}>{trim}</span>{comma}</>
  if (/^[\d.]+$/.test(trim))  return <><span style={{ color: '#7C3AED' }}>{trim}</span>{comma}</>
  if (trim === 'true' || trim === 'false' || trim === 'null')
                               return <><span style={{ color: '#2563EB' }}>{trim}</span>{comma}</>
  return <>{raw}</>
}

// ── Tag chip coloring ─────────────────────────────────────────
function tagColor(tag: string): { bg: string; text: string } {
  if (tag.startsWith('crawl:'))   return { bg: '#EFF6FF', text: '#1D4ED8' }
  if (tag.startsWith('parser:'))  return { bg: '#F5F3FF', text: '#6D28D9' }
  if (tag.startsWith('gate1:'))   return { bg: '#ECFDF5', text: '#047857' }
  if (tag.startsWith('gate2:'))   return { bg: '#ECFDF5', text: '#047857' }
  if (tag.startsWith('gate3:'))   return { bg: '#ECFDF5', text: '#047857' }
  if (tag.startsWith('embed:'))   return { bg: '#F0FDFA', text: '#0F766E' }
  if (tag.startsWith('pillar:mandatory')) return { bg: '#FEF3C7', text: '#92400E' }
  if (tag.startsWith('pillar:bonus'))     return { bg: '#F1F5F9', text: '#475569' }
  if (tag.startsWith('lang:'))    return { bg: '#F1F5F9', text: '#475569' }
  return { bg: '#F1F5F9', text: '#475569' }
}

// ── Gate dot ──────────────────────────────────────────────────
const gateColor: Record<string, string> = { pass: '#10B981', warn: '#F59E0B', fail: '#EF4444' }

// ── Main component ────────────────────────────────────────────
type Tab = 'records' | 'json' | 'csv' | 'jsonl'

export default function ExportOutput() {
  const [tab,      setTab]      = useState<Tab>('records')
  const [copied,   setCopied]   = useState(false)
  const [expanded, setExpanded] = useState<Set<string>>(new Set())

  const payload  = toPayload(RECORDS)
  const jsonStr  = JSON.stringify(payload, null, 2)
  const csvStr   = toCSV(RECORDS)
  const jsonlStr = toJSONL(RECORDS)

  const codeContent = tab === 'json' ? jsonStr : tab === 'csv' ? csvStr : tab === 'jsonl' ? jsonlStr : ''

  const handleCopy = () => {
    navigator.clipboard.writeText(codeContent)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = (fmt: string, content: string) => {
    const blob = new Blob([content], { type: 'text/plain' })
    const url  = URL.createObjectURL(blob)
    const a    = document.createElement('a')
    a.href = url; a.download = `run-BD-001.${fmt}`; a.click()
    URL.revokeObjectURL(url)
  }

  const toggleExpand = (hash: string) =>
    setExpanded(prev => { const n = new Set(prev); n.has(hash) ? n.delete(hash) : n.add(hash); return n })

  const verified = RECORDS.filter(r => r.status === 'verified').length
  const pending  = RECORDS.filter(r => r.status === 'pending').length
  const pillars  = new Set(RECORDS.map(r => r.indicator)).size
  const avgConf  = (RECORDS.reduce((s, r) => s + r.confidence, 0) / RECORDS.length).toFixed(2)

  return (
    <WorkspaceShell breadcrumbs={[{ label: 'Pipeline' }, { label: 'Export Output' }]}>
      <PipelineStepper activeId="export" />

      <div style={{ padding: '20px 32px 60px' }}>

        {/* ── Header ── */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 24, marginBottom: 16 }}>
          <div>
            <h1 style={{ fontFamily: 'var(--cc-font-display)', fontWeight: 700, fontSize: 22, color: 'var(--cc-ink-950)', margin: 0 }}>
              Export Output
            </h1>
            <div style={{ fontSize: 13, color: 'var(--cc-ink-500)', marginTop: 4 }}>
              <span style={{ fontFamily: 'var(--cc-font-mono)', fontSize: 12 }}>run-BD-001</span>
              {' '}· BD-DSA-2018 · RDTII Framework · Generated 2026-05-23
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {[
              { label: 'JSON',  fmt: 'json',  content: jsonStr  },
              { label: 'CSV',   fmt: 'csv',   content: csvStr   },
              { label: 'JSONL', fmt: 'jsonl', content: jsonlStr },
            ].map(({ label, fmt, content }) => (
              <button
                key={fmt}
                onClick={() => handleDownload(fmt, content)}
                style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '5px 14px', height: 36, borderRadius: 10, fontSize: 13, fontWeight: 500, border: '1px solid var(--cc-ink-300)', background: 'white', color: 'var(--cc-ink-800)', cursor: 'pointer' }}
              >
                <Download size={13} /> {label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Pipeline-complete banner ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 18px', background: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: 10, marginBottom: 20 }}>
          <span style={{ width: 20, height: 20, borderRadius: '50%', background: '#10B981', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
            <Check size={12} color="white" strokeWidth={3} />
          </span>
          <div style={{ fontSize: 13, color: '#065F46' }}>
            <strong>Pipeline complete</strong> — 8 clauses processed through CVR loop ·{' '}
            {verified} verified · {pending} pending review · {pillars} RDTII indicators covered · Ready for export
          </div>
        </div>

        {/* ── Stat cards ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 24 }}>
          {[
            { label: 'Total records',    value: RECORDS.length, accent: 'var(--cc-ink-900)', bg: 'white',   border: 'var(--cc-ink-200)' },
            { label: 'Verified',         value: verified,        accent: '#047857',            bg: '#ECFDF5', border: '#10B98140'          },
            { label: 'Pillars covered',  value: pillars,         accent: '#0F766E',            bg: '#F0FDFA', border: '#0FB5A740'          },
            { label: 'Avg confidence',   value: avgConf,         accent: '#1D4ED8',            bg: '#EFF6FF', border: '#3B82F640'          },
          ].map(c => (
            <div key={c.label} style={{ background: c.bg, border: `1px solid ${c.border}`, borderRadius: 12, padding: '16px 20px' }}>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--cc-ink-500)', marginBottom: 6 }}>{c.label}</div>
              <div style={{ fontSize: 28, fontWeight: 700, color: c.accent, fontFamily: 'var(--cc-font-display)', fontVariantNumeric: 'tabular-nums' }}>{c.value}</div>
            </div>
          ))}
        </div>

        {/* ── Tab bar ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 0, borderBottom: '1px solid var(--cc-ink-200)', marginBottom: 0 }}>
          {(['records', 'json', 'csv', 'jsonl'] as Tab[]).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                padding:       '10px 18px',
                fontSize:      13,
                fontWeight:    tab === t ? 600 : 400,
                color:         tab === t ? 'var(--cc-teal-600)' : 'var(--cc-ink-500)',
                background:    'none',
                border:        'none',
                borderBottom:  tab === t ? '2px solid var(--cc-teal-600)' : '2px solid transparent',
                cursor:        'pointer',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                transition:    'color 150ms',
              }}
            >
              {t === 'records' ? 'Records' : t.toUpperCase()}
            </button>
          ))}
          {tab !== 'records' && (
            <button
              onClick={handleCopy}
              style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6, padding: '5px 12px', height: 32, borderRadius: 8, fontSize: 12, fontWeight: 500, border: '1px solid var(--cc-ink-200)', background: 'white', color: 'var(--cc-ink-700)', cursor: 'pointer' }}
            >
              {copied ? <><Check size={12} color="#10B981" /> Copied</> : <><Copy size={12} /> Copy</>}
            </button>
          )}
        </div>

        {/* ── Records table ── */}
        {tab === 'records' && (
          <div style={{ border: '1px solid var(--cc-ink-200)', borderTop: 'none', borderRadius: '0 0 14px 14px', overflow: 'hidden', background: 'white' }}>
            {/* Table header */}
            <div style={{ display: 'grid', gridTemplateColumns: '120px 160px 1fr 70px 80px 80px 70px auto', gap: 0, padding: '10px 20px', background: 'var(--cc-ink-50)', borderBottom: '1px solid var(--cc-ink-200)', fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--cc-ink-500)' }}>
              <span>Indicator</span>
              <span>Citation</span>
              <span>Verbatim</span>
              <span>Conf</span>
              <span>Match</span>
              <span>Status</span>
              <span>Gates</span>
              <span>Discovery tags</span>
            </div>

            {/* Rows */}
            {RECORDS.map((r, i) => {
              const isExpanded = expanded.has(r.hash)
              return (
                <div
                  key={r.hash}
                  style={{ borderBottom: i < RECORDS.length - 1 ? '1px solid var(--cc-ink-100)' : 'none' }}
                >
                  <div style={{ display: 'grid', gridTemplateColumns: '120px 160px 1fr 70px 80px 80px 70px auto', gap: 0, padding: '14px 20px', alignItems: 'start' }}>

                    {/* Indicator */}
                    <div>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '2px 8px', borderRadius: 999, background: r.color + '18', color: r.color, fontSize: 12, fontWeight: 700, fontFamily: 'var(--cc-font-mono)' }}>
                        {r.indicator}
                      </span>
                      <div style={{ fontSize: 10, color: 'var(--cc-ink-500)', marginTop: 4, lineHeight: 1.3 }}>{r.indicatorLabel}</div>
                    </div>

                    {/* Citation */}
                    <div style={{ fontSize: 12 }}>
                      <div style={{ fontFamily: 'var(--cc-font-mono)', fontWeight: 700, color: 'var(--cc-ink-900)' }}>{r.citation.ref}</div>
                      <div style={{ color: 'var(--cc-ink-500)', marginTop: 2, lineHeight: 1.3 }}>{r.citation.docId}</div>
                      <div style={{ color: 'var(--cc-ink-400)', marginTop: 1 }}>p.{r.citation.page}</div>
                    </div>

                    {/* Verbatim */}
                    <div style={{ fontSize: 13, color: 'var(--cc-ink-800)', lineHeight: 1.55 }}>
                      {isExpanded ? r.verbatim : r.verbatim.slice(0, 120) + (r.verbatim.length > 120 ? '…' : '')}
                      {r.verbatim.length > 120 && (
                        <button
                          onClick={() => toggleExpand(r.hash)}
                          style={{ display: 'flex', alignItems: 'center', gap: 3, marginTop: 4, padding: 0, border: 'none', background: 'none', fontSize: 11, color: 'var(--cc-teal-600)', cursor: 'pointer', fontWeight: 500 }}
                        >
                          {isExpanded ? <><ChevronDown size={11} /> Show less</> : <><ChevronRight size={11} /> Show full</>}
                        </button>
                      )}
                    </div>

                    {/* Confidence */}
                    <div style={{ fontSize: 13, fontFamily: 'var(--cc-font-mono)', fontWeight: 700, color: r.confidence >= 0.8 ? '#047857' : '#B45309' }}>
                      {r.confidence}
                    </div>

                    {/* Match type */}
                    <div>
                      <span style={{ fontSize: 11, fontFamily: 'var(--cc-font-mono)', padding: '2px 6px', borderRadius: 4, background: r.matchType === 'exact' ? '#ECFDF5' : r.matchType === 'fuzzy' ? '#FFFBEB' : '#F1F5F9', color: r.matchType === 'exact' ? '#047857' : r.matchType === 'fuzzy' ? '#B45309' : 'var(--cc-ink-600)' }}>
                        {r.matchType}
                      </span>
                    </div>

                    {/* Status */}
                    <div>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 11, fontWeight: 600, padding: '2px 7px', borderRadius: 999, background: r.status === 'verified' ? '#ECFDF5' : '#FFFBEB', color: r.status === 'verified' ? '#047857' : '#B45309' }}>
                        <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'currentColor' }} />
                        {r.status}
                      </span>
                    </div>

                    {/* Gates */}
                    <div style={{ display: 'flex', gap: 4, paddingTop: 2 }}>
                      {r.gates.map((g, gi) => (
                        <span
                          key={gi}
                          title={`Gate ${gi + 1}: ${g} (${r.gateScores[gi]})`}
                          style={{ width: 10, height: 10, borderRadius: '50%', background: gateColor[g] ?? '#9CA3AF', display: 'inline-block' }}
                        />
                      ))}
                    </div>

                    {/* Discovery tags */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, maxWidth: 280 }}>
                      {r.discoveryTags.slice(0, 5).map(tag => {
                        const { bg, text } = tagColor(tag)
                        return (
                          <span key={tag} style={{ fontSize: 10, padding: '1px 6px', borderRadius: 4, background: bg, color: text, fontFamily: 'var(--cc-font-mono)', whiteSpace: 'nowrap' }}>
                            {tag}
                          </span>
                        )
                      })}
                      {r.discoveryTags.length > 5 && (
                        <span style={{ fontSize: 10, color: 'var(--cc-ink-400)', padding: '1px 4px' }}>+{r.discoveryTags.length - 5}</span>
                      )}
                    </div>

                  </div>

                  {/* Expanded: full discovery tags + hash + model + URL */}
                  {isExpanded && (
                    <div style={{ padding: '0 20px 14px 300px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
                      <div>
                        <div style={{ fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--cc-ink-400)', marginBottom: 6 }}>Discovery tags</div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                          {r.discoveryTags.map(tag => {
                            const { bg, text } = tagColor(tag)
                            return (
                              <span key={tag} style={{ fontSize: 10, padding: '2px 6px', borderRadius: 4, background: bg, color: text, fontFamily: 'var(--cc-font-mono)' }}>
                                {tag}
                              </span>
                            )
                          })}
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--cc-ink-400)', marginBottom: 6 }}>Source URL</div>
                        <a href={r.citation.url} target="_blank" rel="noreferrer" style={{ fontSize: 11, color: 'var(--cc-teal-600)', fontFamily: 'var(--cc-font-mono)', wordBreak: 'break-all' }}>
                          {r.citation.url}
                        </a>
                      </div>
                      <div>
                        <div style={{ fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--cc-ink-400)', marginBottom: 6 }}>Metadata</div>
                        <div style={{ fontSize: 11, fontFamily: 'var(--cc-font-mono)', color: 'var(--cc-ink-600)', lineHeight: 1.7 }}>
                          <div>model: {r.model}</div>
                          <div>hash: {r.hash}</div>
                          <div>processed: {r.processedAt}</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}

            {/* Footer summary */}
            <div style={{ padding: '12px 20px', background: 'var(--cc-ink-50)', borderTop: '1px solid var(--cc-ink-200)', display: 'flex', alignItems: 'center', gap: 16, fontSize: 12, color: 'var(--cc-ink-500)' }}>
              <span>{RECORDS.length} records · {verified} verified · {pending} pending</span>
              <span>·</span>
              <span>{pillars} RDTII indicators · avg confidence {avgConf}</span>
              <div style={{ flex: 1 }} />
              <span style={{ fontFamily: 'var(--cc-font-mono)', fontSize: 11 }}>run-BD-001 · 2026-05-23T09:45:00Z</span>
            </div>
          </div>
        )}

        {/* ── Code views ── */}
        {tab !== 'records' && (
          <div style={{ border: '1px solid var(--cc-ink-200)', borderTop: 'none', borderRadius: '0 0 14px 14px', overflow: 'hidden', background: '#0F1117' }}>
            {/* Code toolbar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 16px', background: '#1A1D27', borderBottom: '1px solid #2D3148' }}>
              <span style={{ fontSize: 11, fontFamily: 'var(--cc-font-mono)', color: '#9CA3AF' }}>
                run-BD-001.{tab}
              </span>
              <span style={{ fontSize: 11, fontFamily: 'var(--cc-font-mono)', color: '#4B5563' }}>
                {tab === 'json' ? `${jsonStr.split('\n').length} lines` : tab === 'jsonl' ? `${RECORDS.length} records` : `${csvStr.split('\n').length} rows`}
              </span>
              <div style={{ flex: 1 }} />
              <button
                onClick={handleCopy}
                style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '4px 10px', borderRadius: 6, border: '1px solid #374151', background: 'transparent', color: copied ? '#10B981' : '#9CA3AF', fontSize: 11, cursor: 'pointer', fontFamily: 'var(--cc-font-mono)' }}
              >
                {copied ? <><Check size={11} /> copied</> : <><Copy size={11} /> copy</>}
              </button>
            </div>

            {/* Code content */}
            <pre style={{ margin: 0, padding: '20px 24px', overflowX: 'auto', maxHeight: 600, overflowY: 'auto', fontSize: 12, lineHeight: 1.7, fontFamily: 'var(--cc-font-mono)', color: '#E2E8F0' }}>
              {tab === 'json' && jsonStr.split('\n').map((line, i) => (
                <div key={i}>
                  <JsonLine line={line} />
                </div>
              ))}
              {tab === 'csv' && (
                <span style={{ color: '#E2E8F0' }}>{csvStr}</span>
              )}
              {tab === 'jsonl' && jsonlStr.split('\n').map((line, i) => (
                <div key={i}>
                  <span style={{ color: '#6B7280', marginRight: 12, userSelect: 'none' }}>{i + 1}</span>
                  <JsonLine line={line} />
                </div>
              ))}
            </pre>
          </div>
        )}

        {/* ── Schema reference ── */}
        <details style={{ marginTop: 20 }}>
          <summary style={{ fontSize: 13, fontWeight: 600, color: 'var(--cc-ink-700)', cursor: 'pointer', padding: '10px 0', listStyle: 'none', display: 'flex', alignItems: 'center', gap: 6 }}>
            <ChevronRight size={14} style={{ transition: 'transform 150ms' }} />
            Field schema reference
          </summary>
          <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {[
              { field: 'indicator',       type: 'string',   desc: 'RDTII pillar code (e.g. "6.1")' },
              { field: 'indicator_label', type: 'string',   desc: 'Human-readable pillar name' },
              { field: 'citation.docId',  type: 'string',   desc: 'Internal document identifier' },
              { field: 'citation.ref',    type: 'string',   desc: 'Section/clause reference (e.g. §26(1))' },
              { field: 'citation.page',   type: 'number',   desc: 'Page number in source document' },
              { field: 'citation.url',    type: 'string',   desc: 'Canonical source URL' },
              { field: 'verbatim',        type: 'string',   desc: 'Exact quoted text from source' },
              { field: 'confidence',      type: 'number',   desc: 'NLI Gate 2 score [0.0–1.0] (threshold 0.70)' },
              { field: 'matchType',       type: 'enum',     desc: '"exact" | "approximate" | "fuzzy"' },
              { field: 'status',          type: 'enum',     desc: '"verified" | "pending"' },
              { field: 'gates',           type: 'string[]', desc: 'CVR gate results [span, nli, struct]' },
              { field: 'gateScores',      type: 'string[]', desc: 'Raw gate outputs [match·type, score, result]' },
              { field: 'discoveryTags',   type: 'string[]', desc: 'Provenance metadata tags (k:v format)' },
              { field: 'model',           type: 'string',   desc: 'LLM used for classification' },
              { field: 'hash',            type: 'string',   desc: 'FNV-1a record fingerprint (8-hex)' },
              { field: 'processedAt',     type: 'ISO 8601', desc: 'Pipeline completion timestamp' },
            ].map(s => (
              <div key={s.field} style={{ display: 'flex', gap: 12, padding: '8px 0', borderBottom: '1px solid var(--cc-ink-100)' }}>
                <span style={{ fontFamily: 'var(--cc-font-mono)', fontSize: 12, color: '#0FB5A7', minWidth: 150 }}>{s.field}</span>
                <span style={{ fontFamily: 'var(--cc-font-mono)', fontSize: 11, color: '#7C3AED', minWidth: 80 }}>{s.type}</span>
                <span style={{ fontSize: 12, color: 'var(--cc-ink-600)' }}>{s.desc}</span>
              </div>
            ))}
          </div>
        </details>

      </div>
    </WorkspaceShell>
  )
}
