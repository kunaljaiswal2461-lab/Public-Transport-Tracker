export default function MetricsBar({ lastUpdated, routesCount, routes }) {
  if (!routes || routes.length === 0) return null;

  // Calculate metrics based on first stops to simplify or just dummy aggregate
  const allStops = routes.flatMap(r => r.stops);
  const onTime = allStops.filter(s => s.status === 'On Time').length;
  const delayed = allStops.filter(s => s.status === 'Delayed').length;

  return (
    <div className="flex gap-6 items-center border border-secondary bg-surfaceLight/50 p-2 px-4 rounded-md text-xs font-mono">
      <div className="flex items-center gap-2 text-textMuted">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        UPDATED <span className="text-textMain">{lastUpdated || '--:--:--'}</span>
      </div>
      
      <div className="w-px h-4 bg-secondary"></div>
      
      <div className="flex items-center gap-2 text-textMuted">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
        ROUTES <span className="bg-primary/20 text-primary px-1.5 py-0.5 rounded border border-primary/30">{routesCount}</span>
      </div>

      <div className="w-px h-4 bg-secondary"></div>

      <div className="flex items-center gap-2 text-textMuted">
        <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        ON TIME <span className="bg-primary/20 text-primary px-1.5 py-0.5 rounded border border-primary/30">{onTime}</span>
      </div>

      <div className="flex items-center gap-2 text-textMuted">
        <svg className="w-4 h-4 text-danger" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        DELAYED <span className="bg-danger/20 text-danger px-1.5 py-0.5 rounded border border-danger/30">{delayed}</span>
      </div>
    </div>
  );
}
