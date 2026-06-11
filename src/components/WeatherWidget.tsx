"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface City {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  country?: string;
  admin1?: string;
}

interface WeatherData {
  temperature: number;
  weathercode: number;
  windspeed: number;
}

export default function WeatherWidget({ isMaximized = false }: { isMaximized?: boolean }) {
  const [cities, setCities] = useState<City[]>([
    { id: "denver", name: "Denver", latitude: 39.7392, longitude: -104.9847, country: "United States", admin1: "Colorado" }
  ]);
  const [weatherMap, setWeatherMap] = useState<Record<string, WeatherData>>({});
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Cycle through cities when minimized
  useEffect(() => {
    if (isMaximized || cities.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % cities.length);
    }, 6000); // cycle every 6 seconds
    
    return () => clearInterval(interval);
  }, [cities.length, isMaximized]);

  // Ensure valid index
  useEffect(() => {
    if (currentIndex >= cities.length) {
      setCurrentIndex(0);
    }
  }, [cities.length, currentIndex]);

  // Load cities from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("weather_cities");
    if (saved) {
      try {
        setCities(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved cities", e);
      }
    }
  }, []);

  // Save cities to localStorage when they change
  useEffect(() => {
    localStorage.setItem("weather_cities", JSON.stringify(cities));
  }, [cities]);

  // Fetch weather for all cities
  useEffect(() => {
    async function fetchAllWeather() {
      if (cities.length === 0) return;
      
      setLoading(Object.keys(weatherMap).length === 0);
      try {
        const newMap: Record<string, WeatherData> = {};
        
        // We can fetch individually or batch if the API supports it, 
        // open-meteo supports multiple lats/lons by comma separation but let's just Promise.all
        await Promise.all(cities.map(async (city) => {
          const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph`);
          if (res.ok) {
            const data = await res.json();
            newMap[city.id] = data.current_weather;
          }
        }));
        
        setWeatherMap(prev => ({ ...prev, ...newMap }));
      } catch (error) {
        console.error("Error fetching weather:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchAllWeather();
    const interval = setInterval(fetchAllWeather, 600000); // 10 mins
    return () => clearInterval(interval);
  }, [cities]);

  const searchCity = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    try {
      const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(searchQuery)}&count=1&language=en&format=json`);
      const data = await res.json();
      
      if (data.results && data.results.length > 0) {
        const result = data.results[0];
        const newCity: City = {
          id: `${result.id || Date.now()}`,
          name: result.name,
          latitude: result.latitude,
          longitude: result.longitude,
          country: result.country,
          admin1: result.admin1
        };
        
        // Prevent duplicates
        if (!cities.some(c => c.name === newCity.name && c.country === newCity.country)) {
          setCities(prev => [...prev, newCity]);
        }
        setSearchQuery("");
      } else {
        alert("City not found");
      }
    } catch (error) {
      console.error("Geocoding error", error);
    } finally {
      setIsSearching(false);
    }
  };

  const removeCity = (id: string) => {
    if (cities.length <= 1) {
      alert("You must have at least one city!");
      return;
    }
    setCities(prev => prev.filter(c => c.id !== id));
    // clean up map
    setWeatherMap(prev => {
      const newMap = { ...prev };
      delete newMap[id];
      return newMap;
    });
  };

  const getWeatherIcon = (code: number) => {
    if (code === 0) return { icon: "☀️", text: "Clear Sky", color: "text-yellow-400" };
    if (code === 1 || code === 2) return { icon: "⛅", text: "Partly Cloudy", color: "text-slate-300" };
    if (code === 3) return { icon: "☁️", text: "Overcast", color: "text-slate-400" };
    if (code >= 45 && code <= 48) return { icon: "🌫️", text: "Fog", color: "text-slate-400" };
    if (code >= 51 && code <= 67) return { icon: "🌧️", text: "Rain", color: "text-brand-cyan" };
    if (code >= 71 && code <= 77) return { icon: "❄️", text: "Snow", color: "text-white" };
    if (code >= 80 && code <= 82) return { icon: "🌦️", text: "Rain Showers", color: "text-brand-cyan" };
    if (code >= 95) return { icon: "⛈️", text: "Thunderstorm", color: "text-brand-pink" };
    return { icon: "🌡️", text: "Unknown", color: "text-brand-cyan" };
  };

  if (loading && Object.keys(weatherMap).length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-brand-cyan/50 p-6">
        <div className="w-6 h-6 border-2 border-brand-cyan border-t-transparent rounded-full animate-spin mb-3"></div>
        <p className="text-[10px] font-mono tracking-widest uppercase">Syncing Satellites...</p>
      </div>
    );
  }

  // MINIMIZED VIEW
  if (!isMaximized) {
    const primaryCity = cities[currentIndex] || cities[0];
    const weather = weatherMap[primaryCity.id];
    
    if (!weather) return null;
    
    const { icon, text, color } = getWeatherIcon(weather.weathercode);

    return (
      <div className="p-6 flex flex-col items-center justify-center text-center h-full relative overflow-hidden group">
        <div className="absolute inset-0 bg-brand-cyan/5 group-hover:bg-brand-cyan/10 transition-colors duration-500 pointer-events-none"></div>
        
        {cities.length > 1 && (
          <div className="absolute top-2 right-2 flex gap-1 z-20">
            {cities.map((_, i) => (
              <div key={i} className={`h-1 rounded-full transition-all duration-300 ${i === currentIndex ? 'w-3 bg-brand-cyan shadow-[0_0_5px_currentColor]' : 'w-1 bg-brand-cyan/30'}`} />
            ))}
          </div>
        )}

        <AnimatePresence mode="wait">
          <motion.div 
            key={primaryCity.id}
            initial={{ scale: 0.9, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: -10 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="flex flex-col items-center relative z-10 w-full h-full justify-center"
          >
            <div className="w-16 h-16 rounded-full bg-black/50 border border-brand-cyan/30 flex items-center justify-center mb-3 group-hover:scale-110 group-hover:-translate-y-1 transition-transform duration-500 shadow-[0_0_15px_color-mix(in_srgb,var(--color-brand-cyan)_20%,transparent)] shrink-0">
              <span className="text-3xl drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">{icon}</span>
            </div>
            
            <h3 className="font-extrabold text-white tracking-widest uppercase text-xs mb-1 group-hover:text-brand-cyan transition-colors truncate max-w-full px-2">{primaryCity.name}</h3>
            <p className={`font-bold text-3xl tracking-tighter ${color} drop-shadow-[0_0_10px_currentColor] mb-2 font-mono`}>
              {Math.round(weather.temperature)}°
            </p>
            
            <div className="flex flex-col items-center gap-1.5 w-full">
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-300 bg-black/40 px-2 py-0.5 rounded border border-brand-cyan/20 truncate max-w-full">
                {text}
              </span>
              <span className="text-[10px] font-mono text-brand-cyan/60 flex items-center mt-0.5 font-bold">
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                </svg>
                Wind: {weather.windspeed} mph
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }

  // MAXIMIZED VIEW (Shows all cities and add form)
  return (
    <div className="p-8 flex flex-col h-full bg-[#0a0f18] relative overflow-y-auto custom-scrollbar">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b border-brand-cyan/20 pb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-brand-cyan animate-pulse shadow-[0_0_10px_color-mix(in_srgb,var(--color-brand-cyan)_80%,transparent)]"></span>
            GLOBAL TELEMETRY
          </h2>
          <p className="text-brand-cyan/60 font-mono text-xs mt-1 tracking-widest uppercase">Live weather data network</p>
        </div>
        
        <form onSubmit={searchCity} className="flex w-full md:w-auto relative group">
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Add new city..."
            className="bg-black/50 border border-brand-cyan/30 text-white px-4 py-2 rounded-l-lg outline-none focus:border-brand-cyan transition-colors font-mono text-sm w-full md:w-64 placeholder:text-slate-600"
          />
          <button 
            type="submit" 
            disabled={isSearching || !searchQuery.trim()}
            className="bg-brand-cyan/20 border border-brand-cyan/30 border-l-0 hover:bg-brand-cyan/40 text-brand-cyan px-4 py-2 rounded-r-lg transition-colors font-bold uppercase tracking-widest text-xs disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSearching ? "..." : "Add"}
          </button>
          
          <div className="absolute inset-0 border border-brand-cyan/0 rounded-lg pointer-events-none group-focus-within:shadow-[0_0_15px_color-mix(in_srgb,var(--color-brand-cyan)_20%,transparent)] transition-shadow"></div>
        </form>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-6">
        <AnimatePresence>
          {cities.map((city, index) => {
            const weather = weatherMap[city.id];
            const { icon, text, color } = weather ? getWeatherIcon(weather.weathercode) : { icon: "⏳", text: "Loading...", color: "text-slate-500" };
            
            return (
              <motion.div
                key={city.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-black/40 border border-white/5 hover:border-brand-cyan/30 rounded-2xl p-6 relative group transition-colors shadow-lg"
              >
                <button 
                  onClick={() => removeCity(city.id)}
                  className="absolute top-3 right-3 text-slate-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity p-1"
                  title="Remove Node"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>

                <div className="flex justify-between items-start mb-4">
                  <div className="flex flex-col">
                    <h3 className="font-extrabold text-white text-lg truncate max-w-[150px]" title={city.name}>{city.name}</h3>
                    <p className="text-[10px] uppercase tracking-widest text-brand-cyan/60 font-mono truncate max-w-[150px]" title={city.admin1 || city.country}>{city.admin1 || city.country}</p>
                  </div>
                  <div className="text-4xl drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">{icon}</div>
                </div>

                {weather ? (
                  <div className="flex items-end justify-between mt-6">
                    <p className={`font-bold text-4xl tracking-tighter ${color} drop-shadow-[0_0_10px_currentColor] font-mono leading-none`}>
                      {Math.round(weather.temperature)}°
                    </p>
                    <div className="flex flex-col items-end">
                      <span className="text-xs font-mono uppercase tracking-widest text-slate-300">
                        {text}
                      </span>
                      <span className="text-[10px] font-mono text-slate-500 mt-1">
                        Wind: {weather.windspeed} mph
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="mt-6 flex justify-between items-end">
                    <div className="h-8 w-16 bg-white/5 rounded animate-pulse"></div>
                    <div className="h-4 w-24 bg-white/5 rounded animate-pulse"></div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
