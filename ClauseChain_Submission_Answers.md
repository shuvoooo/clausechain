# ClauseChain — Final Submission Answers

Drafted from `ClauseChain_PRD_Application.md`. Word counts noted under each
answer. Copy-paste the **answer text only** into the submission form.

---

## Project Title

**ClauseChain — Measured Legal Evidence for Digital Trade**

---

## Short Proposal Summary (≤ 200 words)

ClauseChain is an open-source AI pipeline that maps digital trade regulation to
the United Nations RDTII framework, with a focus on Pillar 6 (Cross-Border Data
Policies), Pillar 7 (Domestic Data Protection), and Pillar 8 (Internet
Intermediary Liability and Content Access).

Its distinguishing feature is not citation alone. ClauseChain verifies the full
evidence chain — exact span, source authority, current-law status, legal
structure, predicate meaning, and counter-evidence — before any output ships.
The model is never allowed to free-form classify: it fills a structured legal
predicate tuple (actor, action, object, modality, condition, exception), and
rubric-as-code maps that tuple to RDTII indicators only after eight
verification gates pass.

The demo covers Singapore (clean HTML baseline), Thailand (bilingual
rule-and-exception), and Bangladesh (scanned OCR plus source-status conflict),
across English, Thai, and Bengali; HTML, native PDF, scanned PDF, regulator
guidelines, drafts, and unofficial translations.

ClauseChain ships with a reproducible benchmark pack — labeled clauses,
negative cases, OCR stress examples, evaluation scripts, per-stage metrics
with bootstrap confidence intervals — plus a working audit UI prototype at
`/pipeline/{crawl,harvest,extract,map,trace,export}`. The codebase is Apache
2.0, self-hostable, and provider-agnostic: local-first on vLLM, with optional
per-task routing to OpenAI or Anthropic.

*(~195 words)*

---

## Problem Understanding & Objectives (≤ 200 words)

Regulatory mapping for digital trade is still largely manual. Analysts must
locate statutes, amendments, gazettes, regulator guidance, and translations;
decide which sources are binding and current; identify relevant clauses;
interpret rule-and-exception structures; and map results to a framework such
as RDTII. This is slow, expensive, hard to reproduce, and especially difficult
in jurisdictions where key documents are scanned, multilingual, frequently
amended, or scattered across portals.

Generic AI is not enough. A retrieval-augmented system can quote the right
words from the wrong source, quote a repealed provision, miss an exception,
misread a guideline as binding law, or classify a domestic retention rule as a
cross-border transfer restriction. In legal and policy work, these errors are
not acceptable.

**Objectives.**

1. Automate evidence compilation for RDTII Pillars 6, 7, and 8 from official
   sources.
2. Preserve reviewability: every output binds to a verifiable citation,
   source status, and predicate tuple.
3. Block hallucination: eight verification gates plus abstention prevent
   unsupported, outdated, or guideline-as-law outputs.
4. Measure accuracy per stage with bootstrap confidence intervals.
5. Stay public-good: Apache 2.0, self-hostable, reproducible benchmark, open
   contributor workflow for new jurisdictions.

*(~200 words)*

---

## Policy Area

**Selected for this submission:**

- **Pillar 6 — Cross-Border Data Policies** *(mandatory)*
- **Pillar 7 — Domestic Data Protection and Privacy** *(mandatory)*
- **Pillar 8 — Internet Intermediary Liability and Content Access** *(bonus)*

ClauseChain treats RDTII as a rubric-as-code config (`configs/rdtii/pillar_*.yaml`),
so the system is pillar-extensible: new policy areas can be added through
rubric definitions, source packs, labeled examples, and benchmark cases while
reusing the same discovery, extraction, authority-resolution, predicate,
verification, audit, and export pipeline.

For Pillar 8, ClauseChain targets evidence on platform and ISP liability,
safe-harbour rules, content takedown or blocking orders, user-identity
requirements, and monitoring obligations. Demo sources include Singapore
online safety and intermediary-liability materials, Thailand Computer Crime
Act materials, and Bangladesh digital/cyber security and telecom-content
materials. Guidelines or regulator notices are used only as context unless a
binding legal source supports the claim.

---

## Q1.1 — Linguistic Conflict Between the Two Phrases (≤ 150 words)

At the surface, the phrases look contradictory. Phrase 1 says an organisation
"shall not transfer" personal data outside Country A — a flat prohibition.
Phrase 2 says transfer may occur "except in accordance with requirements" that
ensure comparable protection — an explicit allowance. A token-level
contradiction detector reads phrase 1 as a total ban and phrase 2 as a
permission, and treats them as mutually exclusive.

Legally, they are not in conflict. They form one composite rule: phrase 1
states the default prohibition, phrase 2 supplies the conditional pathway
that qualifies it. The legal effect is "transfer is prohibited unless
comparable-protection requirements are satisfied."

The trap is structural: an AI that chunks the two phrases apart can emit two
contradictory outputs — a Pillar 6 transfer ban from phrase 1 and a permissive
cross-border allowance from phrase 2. The conflict is framing, not substance.

*(~150 words)*

---

## Q1.2 — Which Phrase Takes Precedence, and the Policy Rationale (≤ 150 words)

Neither phrase alone is the primary regulatory standard. The standard is the
**composite conditional transfer regime**: transfer is prohibited by default
unless statutory comparable-protection requirements are met. Phrase 1 sets the
baseline; phrase 2 supplies the legally permitted pathway. Read together, they
are one operative rule.

The policy rationale is **data protection by default with controlled
cross-border flow**. The legislature protects data subjects by requiring that
comparable safeguards travel with the data, while keeping trade-enabling
transfers lawful under defined conditions. Classifying the rule as a total
localization ban would misstate the law and overstate the trade barrier.
Classifying it as an open permission would understate the protection.

ClauseChain therefore maps the rule to a **conditional cross-border transfer**
indicator under Pillar 6, with modality `prohibited_by_default` and a
condition of `comparable_protection_required` — not localization, not open
permission.

*(~150 words)*

---

## Q1.3 — How ClauseChain Programs This Decision (≤ 150 words)

The decision is mechanical, not freeform. Five deterministic steps:

1. **Structural parse.** The legal parser identifies the principal prohibition
   and the exception connector ("except", "unless", "provided that") inside
   the same legal node.
2. **Rule-unit binding.** The Rule Unit Builder binds principal rule,
   exception, and condition into a single rule unit. Chunking and retrieval
   operate on rule units, so the exception is never separated from the rule.
3. **Predicate extraction.** The model fills a constrained tuple:
   `modality = prohibited_by_default`, `condition = comparable_protection`,
   `exception = statutory_requirements_satisfied` — each field tied to span
   IDs.
4. **Rubric-as-code mapping.** RDTII Pillar 6 indicators are evaluated against
   the tuple, deterministically, before any LLM call.
5. **Verification gates.** Gate G5 (Structure) rejects if the exception is
   missing; Gate G7 (RDTII) rejects if required predicates are absent or an
   exclusion triggers. Any failure routes to human review.

*(~150 words)*

---

## Q2 — End-to-End Approach: Collect → Extract → Classify → Explain → Cite → Export (≤ 250 words)

ClauseChain is a ten-stage typed pipeline. Each stage emits an artifact and a
measurable quality signal.

**Collect.** Discovery seeds from per-jurisdiction packs (official statute
databases, gazettes, regulator portals). Scrapy + Playwright + Crawl4AI crawl
politely with robots awareness and rate limiting. Candidates are tagged law,
regulation, amendment, guideline, draft, or translation.

**Acquire.** Raw bytes are saved with SHA-256, retrieval timestamp, HTTP
headers, MIME type, and redirect chain. PDFs are rendered to page images for
audit.

**Resolve authority and currentness.** Each source is classified
binding / non-binding / draft / repealed / consolidated / amendment /
translation, and an amendment graph is built.

**Extract.** HTML through Trafilatura; native PDF through Docling; scanned PDF
through PaddleOCR-VL with VLM repair on low-confidence regions only. Output is
text + bbox + per-token OCR confidence.

**Structure.** The legal parser builds a section tree
(act / part / chapter / section / subsection / paragraph / proviso /
schedule); the Rule Unit Builder binds principal rules with exceptions,
conditions, definitions, and cross-references.

**Classify.** Hybrid retrieval (BM25 + multilingual dense BGE-M3 or
Qwen3-Embedding) with cross-encoder reranking. The model extracts a
constrained legal predicate tuple. Rubric-as-code maps the tuple to RDTII
indicators for Pillars 6, 7, and 8.

**Explain and cite.** Every claim binds to span IDs, section, page, bbox, char
offsets, source URL, source SHA-256, and model identity.

**Verify and export.** Eight gates (G1–G8) gate every output. Verified claims
ship as JSONL, CSV matrix, Markdown report, and a provenance bundle that lets
a second analyst re-verify every claim from raw bytes.

*(~250 words)*

---

## Q3 — Data Sources & Scope for the Demo (≤ 250 words)

**Target jurisdictions.** Three demo jurisdictions, each chosen to exercise a
different part of the pipeline.

- **Singapore** — clean-HTML baseline. Anchor instruments: PDPA 2012
  (rev. 2021) ss. 13, 17, 26(1); Copyright Act 2021 network-service-provider
  provisions; Online Safety / Broadcasting Act directions; PDPC guidance.
  Domains: `sso.agc.gov.sg`, `pdpc.gov.sg`, `imda.gov.sg`.
- **Thailand** — bilingual rule-and-exception. Anchor instruments: PDPA
  B.E. 2562 (2019) ss. 26, 27–29, 41; PDPC notifications 2022–2024; Computer
  Crime Act materials for intermediary/content controls. Domains:
  `ratchakitcha.soc.go.th` and `pdpc.or.th`.
- **Bangladesh** — OCR and source-status stress. Anchor instruments: Digital
  Security Act 2018 s. 26 as domestic identity-information protection; draft
  data-protection texts as non-current examples; ICT Act / cyber and telecom
  materials for Pillar 8 content and intermediary-liability signals. Domains:
  `bdlaws.minlaw.gov.bd` (HTML and PDF) and `mopa.gov.bd` (gazette scans in
  Bengali and English).

**Document types covered.** Official HTML statute pages, native PDFs, scanned
gazette PDFs, regulator guidelines, advisory notes, draft bills, consultation
texts, and unofficial translations. Guidelines and translations are reviewer
aids; they never override binding original-language law.

**Languages.** English, Thai, Bengali. Retrieval uses multilingual embeddings
(BGE-M3 / Qwen3-Embedding) so a Thai-language clause is retrievable from an
English RDTII query.

**Coverage scope.** RDTII Pillar 6 (cross-border data policies), Pillar 7
(domestic data protection and privacy), and Pillar 8 (internet intermediary
liability and content access). The architecture remains pillar-extensible:
future pillars can be added by supplying source packs, rubric definitions,
gold labels, and regression cases without changing the core pipeline.

*(~250 words)*

---

## Q4 — Evidence & Citation Method (Anti-Hallucination) (≤ 250 words)

Every claim binds to a machine-verifiable citation object carrying: source
URL, raw-source SHA-256, retrieval timestamp, source status, authority rank,
instrument title, section, page, char offsets, bbox where available, verbatim
quote, span SHA-256, OCR confidence (if applicable), and the eight gate
results.

**Traceability enforcement.** The quote must appear exactly in the extracted
text. Section, page, and bbox must resolve in the audit UI. The source URL
must be live-retrievable or preserved in the provenance bundle. OCR fuzzy
matching is allowed only inside OCR-tagged regions, must log edit distance
(≤ 3), and must attach the original page image.

**The eight verification gates.** Before any output ships:

- G1 Span — exact byte/char match (or OCR-fuzzy ≤ 3 in OCR regions only).
- G2 Location — bbox IoU ≥ 0.85 or section-path match.
- G3 Authority — source rank ≤ 5; guidelines never support binding claims.
- G4 Currentness — `binding_current`; repealed, draft, or superseded sources
  cannot support a binding-law claim.
- G5 Structure — cited node is the correct legal unit; exceptions present.
- G6 Tuple — multilingual NLI entailment ≥ 0.70 on populated fields.
- G7 RDTII — required rubric predicates present, no exclusion triggered.
- G8 Counter-evidence — corpus search for repeal, amendment, conflict, or
  definition shift.

**Provenance bundle.** Raw sources, hashes, extracted text, predicate tuples,
gate results, and model identity ship as one bundle. A second analyst on a
different machine can re-verify every claim from the bundle alone.

*(~225 words)*

---

## Q5 — Three-Source Scenario: HTML Regulation, Scanned Amendment, Ministry Guideline (≤ 250 words)

Given (1) an official HTML regulation, (2) a scanned older amendment, and
(3) a paraphrasing ministry guideline, ClauseChain processes them as follows.

**1. Authority resolution.** The HTML on the official statute domain is
tagged `binding_current`, rank ≤ 5. The scanned amendment is `binding` but
`superseded` if the HTML is its consolidated version; otherwise it remains
binding for amendment history. The guideline is tagged `non_binding_context`,
rank 6. Gate G3 refuses a binding-law claim sourced solely from it.

**2. Extraction.** HTML is parsed by Trafilatura with section anchors
preserved. The scanned PDF runs through PaddleOCR-VL with per-token
confidence; disagreements against Tesseract are logged with edit distance,
bbox, and the original page image. A VLM repair pass (Qwen2-VL local or
cloud Claude per config) runs only on low-confidence regions. OCR fuzzy
matches must carry the original image and edit distance ≤ 3 to pass G1.

**3. Structure parsing.** Each binding source is parsed into a legal node
tree (act → section → subsection → proviso). The Rule Unit Builder binds
principal rule with exception and condition before chunking, so retrieval
never separates them.

**4. Conflict resolution.** If HTML and amendment disagree, G4 prefers the
consolidated current text; the amendment is cited only when amendment
history is the question. The guideline is supplementary context, never
controlling.

**5. Citation output.** The system returns the §12.3 citation object tied to
the binding source: URL, SHA-256, section, page, bbox, verbatim quote, OCR
confidence, and the eight gate results — re-verifiable from the provenance
bundle.

*(~230 words)*

---

## Q6 — Anti-Hallucination Technical Design (≤ 250 words)

**Allowed.** The model may extract candidate spans from retrieved context
only; fill constrained JSON schemas (Pydantic + Outlines); identify predicate
tuple fields (actor, action, object, modality, condition, exception); suggest
RDTII indicators from a fixed enumeration; assign calibrated confidence;
output `not_applicable` or `insufficient_evidence`; and explain a decision
after verification passes.

**Not allowed.** The model may not cite outside the retrieved set; invent
sections, URLs, pages, or quotations; treat a guideline as binding law unless
source metadata supports it; use training-memory legal knowledge as evidence;
collapse rule and exception into one conclusion; override authority or
currentness gates; or emit `verified` without all required gate results.

**Linking claims to exact evidence.** Each predicate field links to evidence
spans by `span_id`. Each span carries char offsets, source SHA-256, section
path, page, bbox where available, and OCR confidence. The minimum citation
object (PRD §12.3) is machine-verifiable: the quote must appear exactly in
the extracted text — or, inside OCR-tagged regions, fuzzy-match with edit
distance ≤ 3 and the original page image attached. The provenance bundle
preserves raw bytes so a second analyst on a different machine can reproduce
every claim.

**Concrete failure case caught.** A naive RAG retrieves a ministry guideline
paraphrasing a cross-border rule and a repealed act with the original
wording, then cites the cleaner guideline as binding law. ClauseChain blocks
this: G3 tags the guideline `non_binding_context`; G4 detects the act's
`repealed` status; G8 surfaces the current consolidated text. The system
cites the current binding section — or abstains if none is found.

*(~225 words)*

---

## Relevant Skills and Experience (free-text, optional)

Full-stack engineering (Next.js 16 / React 19 / TypeScript / Tailwind on the
audit UI; FastAPI / Django / Celery on the backend); applied NLP and retrieval
(BM25 + multilingual dense embeddings, cross-encoder reranking, constrained
LLM decoding with Outlines / Instructor); document-AI pipelines (Docling,
PaddleOCR-VL, Trafilatura, Qwen-VL); model serving on vLLM and routing across
local + OpenAI + Anthropic; reproducible benchmarking with bootstrap
confidence intervals.

Working artifacts already in-repo: 1,683-line PRD (`ClauseChain_PRD_Application.md`),
720-word concept video script (`VIDEO_SCRIPT.md`), and a live UI prototype at
`/pipeline/{crawl,harvest,extract,map,trace,export}`.

---

## Submission Checklist

- [ ] Project Title pasted
- [ ] Short Proposal Summary pasted (≤ 200 words)
- [ ] Problem Understanding & Objectives pasted (≤ 200 words)
- [ ] Policy area selected: Pillar 6 + Pillar 7
- [ ] Q1.1, Q1.2, Q1.3 pasted (each ≤ 150 words)
- [ ] Q2 pasted (≤ 250 words)
- [ ] Q3 pasted (≤ 250 words)
- [ ] Q4 pasted (≤ 250 words)
- [ ] Q5 pasted (≤ 250 words)
- [ ] Q6 pasted (≤ 250 words)
- [ ] Team-member profiles uploaded (PDF)
- [ ] Relevant skills section filled
