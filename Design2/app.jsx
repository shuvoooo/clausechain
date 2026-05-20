// ===========================================================
// ClauseChain — App router
// ===========================================================
/* global React, ReactDOM, JURISDICTIONS, DOCUMENTS,
   Sidebar, TopBar, ToastHost, CommandPalette,
   DashboardPage, JurisdictionPage, DocumentWorkspacePage, MatrixPage, LedgerPage,
   AddJurisdictionModal, AddDocumentModal, CrawlStatusDrawer,
   CitationDetailDrawer, ConflictModal, EditClassificationModal, RejectModal,
   CellDrilldownModal, ExportModal, LedgerEntryModal, ReverifyModal */

const { useState: useAppState, useEffect: useAppEffect } = React;

function App() {
  const [route, setRoute] = useAppState({ page: "dashboard" });
  const [cmdOpen, setCmdOpen] = useAppState(false);

  // Modal state
  const [showAddJ, setShowAddJ] = useAppState(false);
  const [showAddD, setShowAddD] = useAppState(false);
  const [showCrawl, setShowCrawl] = useAppState(false);
  const [showCitation, setShowCitation] = useAppState(false);
  const [showConflict, setShowConflict] = useAppState(false);
  const [showEdit, setShowEdit] = useAppState(false);
  const [showReject, setShowReject] = useAppState(false);
  const [showExport, setShowExport] = useAppState(false);
  const [showReverify, setShowReverify] = useAppState(false);
  const [drilldown, setDrilldown] = useAppState(null);
  const [ledgerEntry, setLedgerEntry] = useAppState(null);

  // Make some openers globally available for the command palette
  useAppEffect(() => {
    window.openAddJurisdiction = () => setShowAddJ(true);
    window.openExport = () => setShowExport(true);
  }, []);

  // ⌘K
  useAppEffect(() => {
    const h = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCmdOpen(true);
      }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);

  const navigate = (r) => setRoute(r);

  // Build breadcrumbs
  const crumbs = (() => {
    const c = [{ label: "Dashboard", nav: { page: "dashboard" } }];
    if (route.page === "matrix") c.push({ label: "RDTII Matrix" });
    else if (route.page === "ledger") c.push({ label: "Pipeline & Ledger" });
    else if (route.page === "jurisdiction") {
      const j = JURISDICTIONS.find(x => x.code === route.country);
      c.push({ label: j ? j.name : route.country });
    } else if (route.page === "doc") {
      const j = JURISDICTIONS.find(x => x.code === route.country);
      const d = (DOCUMENTS[route.country] || []).find(x => x.id === route.doc);
      c.push({ label: j ? j.name : route.country, nav: { page: "jurisdiction", country: route.country } });
      c.push({ label: d ? d.title : route.doc });
      // For BD-DSA-2018 active clause, add §26(1)
      if (route.doc === "BD-DSA-2018") c.push({ label: "§26(1)" });
    }
    return c;
  })();

  return (
    <div className="app-shell">
      <Sidebar current={route} onNavigate={navigate} jurisdictions={JURISDICTIONS} />
      <div className="main">
        <TopBar crumbs={crumbs} onNavigate={navigate} onOpenSearch={() => setCmdOpen(true)} />

        {route.page === "dashboard" && (
          <DashboardPage onNavigate={navigate} onOpenAddJurisdiction={() => setShowAddJ(true)} />
        )}
        {route.page === "jurisdiction" && (
          <JurisdictionPage country={route.country} onNavigate={navigate}
                            onOpenAddDocument={() => setShowAddD(true)}
                            onOpenCrawlDrawer={() => setShowCrawl(true)} />
        )}
        {route.page === "doc" && (
          <DocumentWorkspacePage onNavigate={navigate}
                                 onOpenCitationDetail={() => setShowCitation(true)}
                                 onOpenConflict={() => setShowConflict(true)}
                                 onOpenEdit={() => setShowEdit(true)}
                                 onOpenReject={() => setShowReject(true)} />
        )}
        {route.page === "matrix" && (
          <MatrixPage onNavigate={navigate} onOpenExport={() => setShowExport(true)}
                      onOpenCellDrilldown={(d) => setDrilldown(d)} />
        )}
        {route.page === "ledger" && (
          <LedgerPage initialTab={route.tab}
                      onOpenLedgerEntry={(e) => setLedgerEntry(e)}
                      onOpenReverify={() => setShowReverify(true)} />
        )}
      </div>

      {/* Global overlays */}
      <ToastHost />
      <CommandPalette open={cmdOpen} onClose={() => setCmdOpen(false)} onNavigate={navigate} />

      <AddJurisdictionModal open={showAddJ} onClose={() => setShowAddJ(false)} />
      <AddDocumentModal open={showAddD} onClose={() => setShowAddD(false)} country={route.country} />
      <CrawlStatusDrawer open={showCrawl} onClose={() => setShowCrawl(false)} />
      <CitationDetailDrawer open={showCitation} onClose={() => setShowCitation(false)} />
      <ConflictModal open={showConflict} onClose={() => setShowConflict(false)} />
      <EditClassificationModal open={showEdit} onClose={() => setShowEdit(false)} />
      <RejectModal open={showReject} onClose={() => setShowReject(false)} />
      <ExportModal open={showExport} onClose={() => setShowExport(false)} />
      <CellDrilldownModal open={!!drilldown} onClose={() => setDrilldown(null)} data={drilldown} onNavigate={navigate} />
      <LedgerEntryModal open={!!ledgerEntry} onClose={() => setLedgerEntry(null)} entry={ledgerEntry} onNavigate={navigate} />
      <ReverifyModal open={showReverify} onClose={() => setShowReverify(false)} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
