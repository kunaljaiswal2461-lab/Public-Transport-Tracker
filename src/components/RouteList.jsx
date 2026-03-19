export default function RouteList({ routes, selectedRoute, setSelectedRoute }) {
  const handleSelectChange = (e) => {
    const route = routes.find(r => r.id === parseInt(e.target.value));
    if (route) setSelectedRoute(route);
  };

  const nextStop = selectedRoute ? selectedRoute.stops.find(s => s.eta > 0) : null;

  return (
    <div className="flex flex-col h-full gap-4">
      <div className="border border-secondary bg-surfaceLight rounded-md p-4">
        <label className="text-xs text-textMuted flex items-center gap-2 mb-4 tracking-widest uppercase font-mono">
          <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
          SELECT ROUTE
        </label>
        
        <select 
          className="w-full bg-surface border border-secondary text-textMain text-sm p-3 rounded mb-4 outline-none focus:border-primary/50 font-mono"
          value={selectedRoute ? selectedRoute.id : ''}
          onChange={handleSelectChange}
        >
          {routes.map(route => (
             <option key={route.id} value={route.id}>{route.id}. {route.name} ({route.stops.length} stops)</option>
          ))}
        </select>

        <div className="flex flex-col gap-1 max-h-[220px] overflow-y-auto pr-2">
          {routes.map((route) => (
            <button
              key={route.id}
              onClick={() => setSelectedRoute(route)}
              className={`text-left p-3 rounded transition-all text-sm font-mono flex items-center gap-3 border-l-2 ${
                selectedRoute?.id === route.id
                  ? 'bg-primary/10 border-primary text-textMain font-semibold shadow-[inset_0_0_10px_rgba(0,255,136,0.1)]'
                  : 'border-transparent text-textMuted hover:bg-surface hover:text-textMain'
              }`}
            >
              <svg className={`w-4 h-4 ${selectedRoute?.id === route.id ? 'text-primary glow-text border border-primary/20 bg-primary/20' : 'text-textMuted'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path></svg>
              {route.name}
            </button>
          ))}
          {routes.length === 0 && (
            <div className="text-center text-textMuted text-xs font-mono p-4">No routes found</div>
          )}
        </div>
      </div>

      {selectedRoute && (
        <div className="border border-primary/30 glow-border bg-gradient-to-b from-surface to-surfaceLight rounded-md p-5 mt-auto shadow-[0_0_20px_rgba(0,255,136,0.1)]">
          <div className="flex items-center gap-2 text-textMuted text-xs font-mono mb-6 uppercase tracking-widest">
             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
             NEXT ARRIVAL
          </div>
          
          <div className="flex justify-between items-end">
            <div>
              <p className="text-5xl font-bold text-primary glow-text flex items-baseline gap-1">
                {nextStop ? nextStop.eta : '--'}
                <span className="text-textMain text-lg glow-none font-mono">min</span>
              </p>
              <p className="text-textMuted text-xs font-mono mt-2 tracking-widest">
                {nextStop ? nextStop.time : '--:--'}
              </p>
            </div>
            
            <div className="text-right">
              <div className="flex items-center justify-end gap-2 text-textMuted mb-2 text-xs font-mono uppercase tracking-widest">
                <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path></svg>
                {selectedRoute.type}
              </div>
              <p className="text-textMain text-xs font-mono truncate max-w-[120px]" title={nextStop ? nextStop.name : ''}>
                {nextStop ? nextStop.name : ''}
              </p>
              
              {nextStop && (
                <div className={`text-xs mt-2 font-mono flex items-center justify-end gap-1.5 ${nextStop.status === 'On Time' ? 'text-primary' : nextStop.status === 'Delayed' ? 'text-danger' : 'text-danger/50'}`}>
                  <div className={`w-1.5 h-1.5 rounded-full ${nextStop.status === 'On Time' ? 'bg-primary glow-box' : 'bg-danger'}`}></div>
                  {nextStop.status}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
