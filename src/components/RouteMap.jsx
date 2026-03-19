export default function RouteMap({ route, loading }) {
  if (loading || !route) {
    return (
      <div className="h-64 border border-secondary bg-surfaceLight rounded-lg animate-pulse"></div>
    );
  }

  // Show up to 7 stops on the map line
  const displayStops = route.stops.slice(0, 7);
  const nextStop = route.stops.find(s => s.eta > 0) || displayStops[0];

  return (
    <div className="relative h-72 border border-secondary bg-surface rounded-lg overflow-hidden bg-grid flex flex-col justify-between p-6 shadow-lg">
      <div className="flex justify-between items-start z-10">
        <div>
          <h2 className="text-2xl font-bold tracking-wide uppercase">{route.name}</h2>
          <p className="text-textMuted text-xs font-mono uppercase tracking-widest mt-1">
            ROUTE {route.id} // {route.type}
          </p>
        </div>
        <div className="text-right">
          <p className="text-textMuted text-xs font-mono uppercase tracking-widest">NEXT IN</p>
          <p className="text-3xl font-bold text-primary glow-text">
            {nextStop ? `${nextStop.eta}min` : '--'}
          </p>
        </div>
      </div>

      {/* 3D Map Visualization */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none perspective-1000">
        <div className="w-32 h-20 border border-primary/50 relative glow-box shadow-[inset_0_0_20px_rgba(0,255,136,0.2)] transform -rotate-y-12 rotate-x-12">
           <svg className="w-8 h-8 text-primary absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path></svg>
           {/* Decorative side panels */}
           <div className="absolute -left-12 top-2 bottom-2 w-8 border border-primary/30 transform skew-y-12"></div>
           <div className="absolute -right-12 top-2 bottom-2 w-8 border border-primary/30 transform -skew-y-12"></div>
        </div>
      </div>

      {/* Timeline Base */}
      <div className="relative z-10 mt-auto pt-8">
        <div className="h-0.5 bg-secondary w-full absolute bottom-7 object-center"></div>
        <div className="flex justify-between items-end gap-2">
          {displayStops.map((stop) => {
            const isNext = stop.id === nextStop?.id;
            return (
              <div key={stop.id} className="flex flex-col items-center relative z-10">
                <div className={`w-3 h-3 rounded-full border-2 mb-2 ${
                  isNext 
                    ? 'bg-primary border-primary glow-box' 
                    : stop.eta < 0 
                      ? 'bg-primary/50 border-primary/50' 
                      : 'bg-surface border-primary/50'
                }`}></div>
                <div className="text-[10px] text-textMuted font-mono w-12 text-center overflow-hidden text-ellipsis whitespace-nowrap">
                  {stop.time}
                </div>
              </div>
            );
          })}
          {route.stops.length > 7 && (
            <div className="text-[10px] text-textMuted font-mono pl-4 mb-2">
              +{route.stops.length - 7} more
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
