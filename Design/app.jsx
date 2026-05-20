const { Sidebar, TopBar, Toast, DashboardPage, JurisdictionPage, DocumentPage } = window.CC;

const App = () => {
  const [page, setPage] = React.useState('dashboard');     // 'dashboard' | 'jurisdiction' | 'document'
  const [toast, setToast] = React.useState(null);

  const openJurisdiction = (code) => setPage('jurisdiction');
  const openDocument     = (id)   => setPage('document');
  const navTo = (p) => setPage(p === 'jurisdiction' ? 'jurisdiction' : 'dashboard');
  const fireToast = (m) => setToast(m);

  // Map sidebar key for active state
  const sidebarKey =
    page === 'jurisdiction' || page === 'document' ? 'jurisdiction' : 'dashboard';

  return (
    <div className="app" data-screen-label={`page ${page}`}>
      <Sidebar current={sidebarKey} onNav={navTo}/>
      <div className="main">
        <TopBar onSearch={() => fireToast('⌘K command palette would open')}/>
        {page === 'dashboard' && (
          <div data-screen-label="01 Dashboard">
            <DashboardPage onOpenJurisdiction={openJurisdiction} onToast={fireToast}/>
          </div>
        )}
        {page === 'jurisdiction' && (
          <div data-screen-label="02 Jurisdiction · Bangladesh">
            <JurisdictionPage
              onBack={() => setPage('dashboard')}
              onOpenDocument={openDocument}
              onToast={fireToast}
            />
          </div>
        )}
        {page === 'document' && (
          <div data-screen-label="03 Document Workspace · DSA 2018">
            <DocumentPage
              onBack={() => setPage('jurisdiction')}
              onBackToDashboard={() => setPage('dashboard')}
              onToast={fireToast}
            />
          </div>
        )}
      </div>
      <Toast msg={toast} onDismiss={() => setToast(null)}/>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
