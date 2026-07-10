'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer
} from 'recharts'
import { Activity, Server, Cpu, HardDrive, Network, Terminal } from 'lucide-react'

type TelemetryPoint = {
  time: string
  cpu: number
  ram: number
}

const generateInitialData = (): TelemetryPoint[] => {
  return Array.from({ length: 20 }, (_, i) => ({
    time: `-${20 - i}s`,
    cpu: Math.floor(Math.random() * 30) + 20, // 20-50%
    ram: Math.floor(Math.random() * 8) + 12,  // 12-20 GB
  }))
}

export default function ServerStats() {
  const [data, setData] = useState<TelemetryPoint[]>([])
  const [uptime, setUptime] = useState(0)
  const [rx, setRx] = useState(0)
  const [tx, setTx] = useState(0)
  const [status, setStatus] = useState<'OPTIMAL' | 'WARNING'>('OPTIMAL')

  useEffect(() => {
    setData(generateInitialData())

    const interval = setInterval(() => {
      setData((prev) => {
        const newCpu = Math.max(5, Math.min(95, prev[prev.length - 1].cpu + (Math.random() * 20 - 10)))
        const newRam = Math.max(4, Math.min(31, prev[prev.length - 1].ram + (Math.random() * 4 - 2)))
        
        // Randomly trigger a warning if CPU spikes above 85%
        if (newCpu > 85) {
          setStatus('WARNING')
        } else if (newCpu < 60) {
          setStatus('OPTIMAL')
        }

        setRx(Math.floor(Math.random() * 500) + 100)
        setTx(Math.floor(Math.random() * 300) + 50)

        const newData = [...prev.slice(1), {
          time: 'Now',
          cpu: Math.round(newCpu),
          ram: Number(newRam.toFixed(1))
        }]
        return newData
      })
      setUptime((prev) => prev + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const currentCpu = data.length > 0 ? data[data.length - 1].cpu : 0
  const currentRam = data.length > 0 ? data[data.length - 1].ram : 0

  const formatUptime = (seconds: number) => {
    const d = Math.floor(seconds / (3600 * 24)) + 142 // Fake base uptime
    const h = Math.floor((seconds % (3600 * 24)) / 3600) + 5
    const m = Math.floor((seconds % 3600) / 60) + 34
    const s = seconds % 60
    return `${d}d ${h.toString().padStart(2, '0')}h ${m.toString().padStart(2, '0')}m ${s.toString().padStart(2, '0')}s`
  }

  return (
    <div className="w-full h-full min-h-[600px] bg-black/40 backdrop-blur-xl border border-[var(--color-primary)] rounded-xl p-4 md:p-8 flex flex-col gap-6 relative overflow-hidden font-mono">
      {/* Scanline Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] z-10 opacity-30 mix-blend-overlay"></div>

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 z-20">
        <div className="flex items-center gap-3">
          <Server className="w-8 h-8 text-[var(--color-primary)] drop-shadow-[0_0_8px_var(--color-primary)]" />
          <div>
            <h2 className="text-2xl font-bold text-white tracking-widest uppercase">Nexus_Core<span className="animate-pulse text-[var(--color-primary)]">_</span></h2>
            <p className="text-sm text-gray-400">Node ID: 0x7F8B4A2</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end">
            <span className="text-xs text-gray-400 uppercase">System Status</span>
            <AnimatePresence mode="wait">
              <motion.span
                key={status}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className={`text-sm font-bold tracking-widest ${status === 'OPTIMAL' ? 'text-green-400 drop-shadow-[0_0_5px_rgba(74,222,128,0.8)]' : 'text-red-500 drop-shadow-[0_0_5px_rgba(239,68,68,0.8)] animate-pulse'}`}
              >
                {status}
              </motion.span>
            </AnimatePresence>
          </div>
          <Activity className={`w-6 h-6 ${status === 'OPTIMAL' ? 'text-green-400' : 'text-red-500'}`} />
        </div>
      </div>

      {/* Top Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 z-20">
        {/* CPU Card */}
        <div className="bg-black/60 border border-[var(--color-secondary)]/50 rounded-lg p-4 relative overflow-hidden group hover:border-[var(--color-secondary)] transition-colors">
          <div className="absolute top-0 right-0 p-2 opacity-20 group-hover:opacity-100 transition-opacity">
            <Cpu className="w-12 h-12 text-[var(--color-secondary)]" />
          </div>
          <p className="text-xs text-gray-400 uppercase mb-1">CPU Load</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-white">{currentCpu}</span>
            <span className="text-[var(--color-secondary)]">%</span>
          </div>
          <div className="w-full bg-gray-800 h-1 mt-3 rounded overflow-hidden">
            <motion.div 
              className="h-full bg-[var(--color-secondary)] drop-shadow-[0_0_5px_var(--color-secondary)]"
              initial={{ width: 0 }}
              animate={{ width: `${currentCpu}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* RAM Card */}
        <div className="bg-black/60 border border-[var(--color-accent)]/50 rounded-lg p-4 relative overflow-hidden group hover:border-[var(--color-accent)] transition-colors">
          <div className="absolute top-0 right-0 p-2 opacity-20 group-hover:opacity-100 transition-opacity">
            <HardDrive className="w-12 h-12 text-[var(--color-accent)]" />
          </div>
          <p className="text-xs text-gray-400 uppercase mb-1">Memory (RAM)</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-white">{currentRam}</span>
            <span className="text-[var(--color-accent)]">GB / 32 GB</span>
          </div>
          <div className="w-full bg-gray-800 h-1 mt-3 rounded overflow-hidden">
            <motion.div 
              className="h-full bg-[var(--color-accent)] drop-shadow-[0_0_5px_var(--color-accent)]"
              initial={{ width: 0 }}
              animate={{ width: `${(currentRam / 32) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Network Card */}
        <div className="bg-black/60 border border-blue-500/50 rounded-lg p-4 relative overflow-hidden group hover:border-blue-500 transition-colors">
          <div className="absolute top-0 right-0 p-2 opacity-20 group-hover:opacity-100 transition-opacity">
            <Network className="w-12 h-12 text-blue-500" />
          </div>
          <p className="text-xs text-gray-400 uppercase mb-1">Network I/O</p>
          <div className="flex flex-col gap-1 mt-1">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Rx:</span>
              <span className="text-blue-400">{rx} KB/s</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Tx:</span>
              <span className="text-blue-400">{tx} KB/s</span>
            </div>
          </div>
        </div>

        {/* Uptime Card */}
        <div className="bg-black/60 border border-purple-500/50 rounded-lg p-4 relative overflow-hidden group hover:border-purple-500 transition-colors">
          <div className="absolute top-0 right-0 p-2 opacity-20 group-hover:opacity-100 transition-opacity">
            <Terminal className="w-12 h-12 text-purple-500" />
          </div>
          <p className="text-xs text-gray-400 uppercase mb-1">System Uptime</p>
          <div className="mt-2">
            <span className="text-sm font-bold text-white font-mono">{formatUptime(uptime)}</span>
          </div>
          <div className="mt-2 text-xs text-gray-500">
            Last boot: 142 days ago
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[300px] z-20">
        {/* CPU Chart */}
        <div className="bg-black/60 border border-gray-800 rounded-lg p-4 flex flex-col">
          <h3 className="text-xs text-gray-400 uppercase mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--color-secondary)] animate-pulse"></span>
            CPU Utilization History
          </h3>
          <div className="flex-grow">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-secondary)" stopOpacity={0.5}/>
                    <stop offset="95%" stopColor="var(--color-secondary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" hide />
                <YAxis domain={[0, 100]} stroke="#374151" fontSize={10} tickFormatter={(val) => `${val}%`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid var(--color-secondary)', borderRadius: '4px' }}
                  itemStyle={{ color: 'var(--color-secondary)' }}
                  labelStyle={{ display: 'none' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="cpu" 
                  stroke="var(--color-secondary)" 
                  fillOpacity={1} 
                  fill="url(#colorCpu)" 
                  isAnimationActive={false} // Disable recharts animation to prevent jarring redraws on ticks
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* RAM Chart */}
        <div className="bg-black/60 border border-gray-800 rounded-lg p-4 flex flex-col">
          <h3 className="text-xs text-gray-400 uppercase mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-pulse"></span>
            Memory Allocation History
          </h3>
          <div className="flex-grow">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRam" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-accent)" stopOpacity={0.5}/>
                    <stop offset="95%" stopColor="var(--color-accent)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" hide />
                <YAxis domain={[0, 32]} stroke="#374151" fontSize={10} tickFormatter={(val) => `${val}G`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid var(--color-accent)', borderRadius: '4px' }}
                  itemStyle={{ color: 'var(--color-accent)' }}
                  labelStyle={{ display: 'none' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="ram" 
                  stroke="var(--color-accent)" 
                  fillOpacity={1} 
                  fill="url(#colorRam)" 
                  isAnimationActive={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
    </div>
  )
}
