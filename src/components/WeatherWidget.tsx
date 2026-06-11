"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface WeatherData {
  temperature: number;
  weathercode: number;
  windspeed: number;
  time: string;
}

export default function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWeather() {
      try {
        const res = await fetch("https://api.open-meteo.com/v1/forecast?latitude=39.7392&longitude=-104.9847&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph");
        if (!res.ok) throw new Error("Failed to fetch weather");
        const data = await res.json();
        setWeather(data.current_weather);
      } catch (error) {
        console.error("Error fetching weather:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchWeather();
    
    // Refresh weather every 10 minutes
    const interval = setInterval(fetchWeather, 600000);
    return () => clearInterval(interval);
  }, []);

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

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-brand-cyan/50 p-6">
        <div className="w-6 h-6 border-2 border-brand-cyan border-t-transparent rounded-full animate-spin mb-3"></div>
        <p className="text-[10px] font-mono tracking-widest uppercase">Syncing Satellites...</p>
      </div>
    );
  }

  if (!weather) {
    return (
      <div className="flex items-center justify-center h-full text-slate-500 font-mono text-xs p-6 text-center">
        Weather telemetry unavailable.
      </div>
    );
  }

  const { icon, text, color } = getWeatherIcon(weather.weathercode);

  return (
    <div className="p-6 flex flex-col items-center justify-center text-center h-full relative overflow-hidden group">
      <div className="absolute inset-0 bg-brand-cyan/5 group-hover:bg-brand-cyan/10 transition-colors duration-500 pointer-events-none"></div>
      
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="flex flex-col items-center relative z-10 w-full"
      >
        <div className="w-16 h-16 rounded-full bg-black/50 border border-brand-cyan/30 flex items-center justify-center mb-3 group-hover:scale-110 group-hover:-translate-y-1 transition-transform duration-500 shadow-[0_0_15px_color-mix(in_srgb,var(--color-brand-cyan)_20%,transparent)]">
          <span className="text-3xl drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">{icon}</span>
        </div>
        
        <h3 className="font-extrabold text-white tracking-widest uppercase text-xs mb-1 group-hover:text-brand-cyan transition-colors">Denver, CO</h3>
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
    </div>
  );
}
