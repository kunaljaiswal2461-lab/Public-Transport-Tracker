import { useState, useEffect } from 'react';
import Header from './components/Header';
import MetricsBar from './components/MetricsBar';
import RouteMap from './components/RouteMap';
import RouteList from './components/RouteList';
import ScheduleList from './components/ScheduleList';

const ROUTE_NAMES = [
  "Downtown Express", "Airport Shuttle", "Metro Line A", 
  "Riverside Route", "Metro Line B", "Crosstown Bus",
  "Night Owl Service", "University Link", "Suburban Commuter", "Central Loop"
];

function App() {
  const [routes, setRoutes] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [loading, setLoading] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const handleRefresh = () => setRefreshTrigger(prev => prev + 1);

  useEffect(() => {
    let intervalId;
    if (autoRefresh) {
      intervalId = setInterval(() => {
        handleRefresh();
      }, 30000); // 30 seconds
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [autoRefresh]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos');
        const data = await response.json();

        // Group the 200 dummy todos into 10 routes (by userId 1 to 10)
        let routesData = {};
        const now = new Date();
        
        data.forEach(todo => {
          const userId = todo.userId;
          if (!routesData[userId]) {
            routesData[userId] = {
              id: userId,
              name: ROUTE_NAMES[userId - 1] || `Route ${userId}`,
              type: userId % 2 === 0 ? 'TRAIN' : 'BUS',
              stops: []
            };
          }
          
          if (routesData[userId].stops.length < 15) { // limit stops to 15 per route
            const baseMinutes = now.getMinutes() + routesData[userId].stops.length * 3;
            const etaMinutes = baseMinutes - now.getMinutes();
            // Assign dummy status
            let status = 'On Time';
            if (todo.id % 7 === 0) status = 'Delayed';
            else if (todo.id % 13 === 0) status = 'Late';

            // Add leading zero
            const displayHours = String((now.getHours() + Math.floor(baseMinutes / 60)) % 24).padStart(2, '0');
            const displayMinutes = String(baseMinutes % 60).padStart(2, '0');

            routesData[userId].stops.push({
              id: todo.id,
              name: todo.title.split(' ').slice(0, 4).join(' ') + ' Station', // Take first 4 words
              time: `${displayHours}:${displayMinutes}`,
              eta: etaMinutes,
              status: status,
              passed: todo.completed // Map "completed" to "passed stop"
            });
          }
        });

        const routesArray = Object.values(routesData);
        setRoutes(routesArray);
        if (!selectedRoute) {
          setSelectedRoute(routesArray[0]);
        } else {
          // Keep current selection fresh
          const updatedSelected = routesArray.find(r => r.id === selectedRoute.id);
          setSelectedRoute(updatedSelected);
        }
        
        setLastUpdated(now.toLocaleTimeString('en-US', { hour12: false }));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [refreshTrigger]); // re-fetch when refreshTrigger changes

  const filteredRoutes = routes.filter(route => 
    route.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    route.id.toString().includes(searchQuery)
  );

  return (
    <div className="min-h-screen flex flex-col pt-4 px-6 pb-6 selection:bg-primary/30">
      <Header 
        autoRefresh={autoRefresh} 
        setAutoRefresh={setAutoRefresh} 
        onRefresh={handleRefresh} 
        loading={loading}
      />
      
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <RouteMap route={selectedRoute} loading={loading} />
          <MetricsBar 
            lastUpdated={lastUpdated} 
            routesCount={routes.length}
            routes={routes}
          />
          {/* Search Bar matching screenshot */}
          <div className="bg-surfaceLight border border-secondary rounded-md p-4 flex items-center gap-3">
            <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            <input 
              type="text" 
              placeholder="Search routes by name or number..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none text-textMain outline-none w-full placeholder-textMuted font-mono text-sm"
            />
          </div>
        </div>
        
        <div className="lg:col-span-1 flex flex-col gap-6">
          <RouteList 
            routes={filteredRoutes} 
            selectedRoute={selectedRoute} 
            setSelectedRoute={setSelectedRoute} 
          />
        </div>
      </div>

      <div className="mt-6 flex-1 bg-surface border border-secondary rounded-lg overflow-hidden flex flex-col shadow-lg shadow-black/50">
         <ScheduleList route={selectedRoute} loading={loading} />
      </div>
    </div>
  );
}

export default App;
