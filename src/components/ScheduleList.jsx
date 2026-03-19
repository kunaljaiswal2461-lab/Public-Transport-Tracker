export default function ScheduleList({ route, loading }) {
  if (loading) {
    return (
      <div className="p-8 text-center text-textMuted animate-pulse flex flex-col items-center justify-center h-full">
        <svg className="w-8 h-8 text-primary mb-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
        <span className="font-mono text-sm tracking-widest">LOADING SCHEDULE...</span>
      </div>
    );
  }

  if (!route) {
    return <div className="p-8 text-center text-textMuted font-mono">Select a route to view schedule.</div>;
  }

  const nextStop = route.stops.find(s => s.eta > 0);

  return (
    <div className="flex flex-col h-full bg-surfaceLight/30 w-full overflow-hidden min-h-[400px]">
      <div className="p-4 border-b border-secondary flex justify-between items-center bg-surface sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <div className="text-textMuted flex items-center gap-2 text-xs font-mono uppercase tracking-widest">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            SCHEDULE
          </div>
          <div className="bg-primary/10 border border-primary/20 text-primary px-3 py-1 rounded text-xs font-mono tracking-widest">
            {route.name}
          </div>
        </div>
        <div className="text-textMuted text-xs font-mono flex items-center gap-2 tracking-widest">
          <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path></svg>
          {route.type}
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4 p-4 border-b border-secondary/80 text-[11px] font-mono text-textMuted uppercase tracking-widest bg-surfaceLight">
        <div className="col-span-6 pl-4">STOP</div>
        <div className="col-span-2 text-center">TIME</div>
        <div className="col-span-2 text-center">ETA</div>
        <div className="col-span-2 text-right pr-4">STATUS</div>
      </div>

      <div className="overflow-y-auto flex-1">
        {route.stops.map((stop) => {
          const isNext = stop.id === nextStop?.id;
          return (
            <div 
              key={stop.id} 
              className={`grid grid-cols-12 gap-4 p-4 border-b border-secondary/30 text-sm font-mono items-center transition-colors hover:bg-surfaceLight/50 ${
                isNext ? 'bg-primary/5 min-h-[60px] border-l-[3px] border-l-primary relative' : 'border-l-[3px] border-l-transparent'
              }`}
            >
              {isNext && (
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-primary/30 to-transparent"></div>
              )}
              
              <div className={`col-span-6 flex items-center gap-4 pl-3 ${isNext ? 'pl-2' : ''}`}>
                <div className={`w-2 h-2 rounded-full ${isNext ? 'bg-primary shadow-[0_0_8px_rgba(0,255,136,0.8)]' : 'bg-secondary'}`}></div>
                <span className={`${isNext ? 'text-textMain font-medium' : 'text-textMuted'} truncate`} title={stop.name}>
                  {stop.name}
                </span>
                {isNext && (
                  <span className="bg-primary text-black text-[9px] font-bold px-1.5 py-0.5 rounded ml-2">
                    NEXT
                  </span>
                )}
              </div>
              
              <div className={`col-span-2 text-center flex items-center justify-center gap-1.5 ${isNext ? 'text-primary' : 'text-textMuted'}`}>
                <svg className="w-3.5 h-3.5 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                {stop.time}
              </div>
              
              <div className={`col-span-2 text-center px-2 py-0.5 rounded w-fit mx-auto ${isNext ? 'text-primary font-bold' : 'text-textMuted'}`}>
                {stop.eta > 0 ? `${stop.eta}m` : stop.eta === 0 ? 'Now' : '-'}
              </div>
              
              <div className={`col-span-2 text-right flex items-center justify-end gap-2 pr-3 text-xs`}>
                <div className={`w-1.5 h-1.5 rounded-full ${
                  stop.status === 'On Time' ? 'bg-primary glow-box' : 
                  stop.status === 'Delayed' ? 'bg-danger shadow-[0_0_8px_rgba(255,68,68,0.6)]' : 'bg-danger/50'
                }`}></div>
                <span className={`${
                  stop.status === 'On Time' ? 'text-primary' : 
                  stop.status === 'Delayed' ? 'text-danger' : 'text-danger/70'
                }`}>{stop.status}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
