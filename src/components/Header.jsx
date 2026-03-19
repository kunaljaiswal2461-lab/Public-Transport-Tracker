export default function Header({ autoRefresh, setAutoRefresh, onRefresh, loading }) {
  return (
    <header className="flex justify-between items-center border-b border-primary/30 pb-4">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-primary/20 border border-primary text-primary flex items-center justify-center rounded glow-box">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path></svg>
        </div>
        <h1 className="text-xl font-bold tracking-wider">
          <span className="text-textMain">TRANSIT</span>
          <span className="text-primary glow-text">TRACKER</span>
        </h1>
      </div>
      
      <div className="flex items-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <span className="text-textMuted uppercase text-xs font-semibold tracking-widest">Auto</span>
          <button 
            onClick={() => setAutoRefresh(!autoRefresh)}
            className={`w-10 h-5 rounded-full flex items-center px-1 transition-colors ${autoRefresh ? 'bg-primary' : 'bg-surfaceLight border border-secondary'}`}
          >
            <div className={`w-3 h-3 rounded-full bg-black transition-transform ${autoRefresh ? 'translate-x-5' : 'bg-textMuted'}`}></div>
          </button>
          <span className={`text-xs ${autoRefresh ? 'text-primary' : 'text-textMuted'}`}>30s</span>
        </div>
        
        <button 
          onClick={onRefresh}
          disabled={loading}
          className="bg-primary hover:bg-primaryDark text-black font-bold py-1.5 px-4 rounded text-xs tracking-wider flex items-center gap-2 transition-colors disabled:opacity-50"
        >
          <svg className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
          REFRESH
        </button>

        <div className="flex items-center gap-2 border-l border-secondary pl-6">
          <span className="text-textMuted">Kunal</span>
          <svg className="w-4 h-4 text-textMuted" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
        </div>
      </div>
    </header>
  );
}
