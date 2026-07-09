'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts'
import { motion, AnimatePresence } from 'framer-motion'
import { Activity, TrendingUp, TrendingDown, RefreshCcw, DollarSign, BarChart2 } from 'lucide-react'

type StockDataPoint = {
  date: string
  open: number
  high: number
  low: number
  close: number
  volume: number
}

const STOCK_TICKERS = ['AAPL', 'MSFT', 'NVDA', 'GOOGL', 'TSLA']
const CRYPTO_TICKERS = ['BTC', 'ETH', 'SOL', 'ADA', 'DOGE']

export default function MarketAnalysis() {
  const [mode, setMode] = useState<'STOCKS' | 'CRYPTO'>('STOCKS')
  const tickers = mode === 'STOCKS' ? STOCK_TICKERS : CRYPTO_TICKERS
  
  const [activeTicker, setActiveTicker] = useState(tickers[0])
  const [data, setData] = useState<StockDataPoint[]>([])
  const [loading, setLoading] = useState(true)
  const [source, setSource] = useState<'API' | 'MOCK'>('MOCK')

  useEffect(() => {
    let isMounted = true
    setLoading(true)

    const fetchStockData = async () => {
      try {
        const res = await fetch(`/api/markets/${activeTicker}`)
        if (!res.ok) throw new Error('Failed to fetch data')
        
        const json = await res.json()
        if (isMounted) {
          setData(json.data)
          setSource(json.source)
          setLoading(false)
        }
      } catch (error) {
        console.error(error)
        if (isMounted) setLoading(false)
      }
    }

    fetchStockData()

    return () => {
      isMounted = false
    }
  }, [activeTicker])

  // Auto-switch ticker when mode changes
  useEffect(() => {
    setActiveTicker(mode === 'STOCKS' ? STOCK_TICKERS[0] : CRYPTO_TICKERS[0])
  }, [mode])

  // Analytics Calculations
  const metrics = useMemo(() => {
    if (!data || data.length === 0) return null

    const currentPrice = data[data.length - 1].close
    const previousPrice = data[0].close
    const highestPrice = Math.max(...data.map(d => d.high))
    const lowestPrice = Math.min(...data.map(d => d.low))
    
    const absoluteChange = currentPrice - previousPrice
    const percentChange = (absoluteChange / previousPrice) * 100
    const isPositive = absoluteChange >= 0

    return {
      currentPrice,
      highestPrice,
      lowestPrice,
      absoluteChange,
      percentChange,
      isPositive
    }
  }, [data])

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-6">
      
      {/* Top Control Panel */}
      <div className="bg-[#0a0f18]/80 backdrop-blur-md rounded-2xl border border-brand-purple/30 p-4 md:p-6 shadow-[0_0_20px_rgba(139,92,246,0.1)]">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Activity className="w-6 h-6 text-brand-purple" />
              Terminal_Markets
            </h2>
            <div className="flex items-center gap-2 mt-2">
              <button 
                onClick={() => setMode('STOCKS')}
                className={`text-xs font-mono font-bold px-3 py-1 rounded-l-md transition-colors ${mode === 'STOCKS' ? 'bg-brand-purple text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
              >
                STOCKS
              </button>
              <button 
                onClick={() => setMode('CRYPTO')}
                className={`text-xs font-mono font-bold px-3 py-1 rounded-r-md transition-colors ${mode === 'CRYPTO' ? 'bg-brand-cyan text-slate-900' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
              >
                CRYPTO
              </button>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs font-mono text-slate-400">DATA SOURCE:</span>
              <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded-full ${source === 'API' ? 'bg-green-500/20 text-green-400 border border-green-500/50' : 'bg-amber-500/20 text-amber-400 border border-amber-500/50'}`}>
                {source} {source === 'MOCK' && '(PoC)'}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {tickers.map(ticker => (
              <button
                key={ticker}
                onClick={() => setActiveTicker(ticker)}
                className={`px-4 py-2 rounded-lg font-mono text-sm font-bold transition-all border ${
                  activeTicker === ticker 
                    ? mode === 'STOCKS' ? 'bg-brand-purple/20 border-brand-purple text-brand-purple shadow-[0_0_10px_rgba(139,92,246,0.3)]' : 'bg-brand-cyan/20 border-brand-cyan text-brand-cyan shadow-[0_0_10px_rgba(34,211,238,0.3)]'
                    : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:border-slate-600 hover:text-white'
                }`}
              >
                {ticker}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* Main Analysis Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Left Side: Metrics Column */}
        <div className="lg:col-span-1 flex flex-col gap-4">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 flex items-center justify-center min-h-[300px]">
                <RefreshCcw className="w-8 h-8 text-brand-purple animate-spin" />
              </motion.div>
            ) : metrics ? (
              <motion.div 
                key="metrics" 
                initial={{ opacity: 0, x: -20 }} 
                animate={{ opacity: 1, x: 0 }} 
                exit={{ opacity: 0 }}
                className="flex flex-col gap-4"
              >
                {/* Current Price */}
                <div className="bg-[#0a0f18]/80 backdrop-blur-md rounded-xl border border-slate-800 p-5 flex flex-col gap-2">
                  <div className="text-slate-400 font-mono text-xs uppercase tracking-wider flex items-center gap-2">
                    <DollarSign className="w-4 h-4" /> Current (30D Close)
                  </div>
                  <div className="text-3xl font-bold text-white font-mono">${metrics.currentPrice.toFixed(2)}</div>
                  <div className={`flex items-center gap-1 font-mono text-sm font-bold ${metrics.isPositive ? 'text-green-400' : 'text-red-400'}`}>
                    {metrics.isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                    {metrics.isPositive ? '+' : ''}{metrics.absoluteChange.toFixed(2)} ({metrics.percentChange.toFixed(2)}%)
                  </div>
                </div>

                {/* 30D High */}
                <div className="bg-[#0a0f18]/80 backdrop-blur-md rounded-xl border border-slate-800 p-5 flex flex-col gap-2">
                  <div className="text-slate-400 font-mono text-xs uppercase tracking-wider flex items-center gap-2">
                    <BarChart2 className="w-4 h-4" /> 30-Day High
                  </div>
                  <div className="text-xl font-bold text-brand-cyan font-mono">${metrics.highestPrice.toFixed(2)}</div>
                </div>

                {/* 30D Low */}
                <div className="bg-[#0a0f18]/80 backdrop-blur-md rounded-xl border border-slate-800 p-5 flex flex-col gap-2">
                  <div className="text-slate-400 font-mono text-xs uppercase tracking-wider flex items-center gap-2">
                    <BarChart2 className="w-4 h-4" /> 30-Day Low
                  </div>
                  <div className="text-xl font-bold text-brand-pink font-mono">${metrics.lowestPrice.toFixed(2)}</div>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

        {/* Right Side: Recharts Graph */}
        <div className="lg:col-span-3 bg-[#0a0f18]/80 backdrop-blur-md rounded-2xl border border-brand-purple/20 p-4 md:p-6 min-h-[400px] flex flex-col relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/5 to-transparent pointer-events-none" />
          
          <h3 className="text-lg font-bold text-white font-mono mb-6">{activeTicker} Historical Price (30 Days)</h3>
          
          <div className="flex-1 w-full relative">
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div key="chart-loading" className="absolute inset-0 flex items-center justify-center bg-[#0a0f18]/50 z-10 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div className="flex items-center gap-3 text-brand-purple font-mono">
                    <RefreshCcw className="w-5 h-5 animate-spin" />
                    ACQUIRING TELEMETRY...
                  </div>
                </motion.div>
              ) : (
                <motion.div key="chart-data" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorClose" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={metrics?.isPositive ? '#10b981' : '#f43f5e'} stopOpacity={0.3}/>
                          <stop offset="95%" stopColor={metrics?.isPositive ? '#10b981' : '#f43f5e'} stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                      <XAxis 
                        dataKey="date" 
                        stroke="#64748b" 
                        tick={{ fill: '#64748b', fontSize: 12, fontFamily: 'monospace' }} 
                        tickFormatter={(str) => {
                          const date = new Date(str)
                          return `${date.getMonth() + 1}/${date.getDate()}`
                        }}
                        tickLine={false}
                      />
                      <YAxis 
                        domain={['auto', 'auto']} 
                        stroke="#64748b" 
                        tick={{ fill: '#64748b', fontSize: 12, fontFamily: 'monospace' }}
                        tickFormatter={(val) => `$${val}`}
                        tickLine={false}
                        axisLine={false}
                      />
                      <RechartsTooltip 
                        contentStyle={{ 
                          backgroundColor: '#0a0f18', 
                          borderColor: '#334155',
                          borderRadius: '8px',
                          color: '#f8fafc',
                          fontFamily: 'monospace',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.5)'
                        }}
                        itemStyle={{ color: '#8b5cf6' }}
                        formatter={(value: any) => [`$${Number(value).toFixed(2)}`, 'Close Price']}
                        labelFormatter={(label) => `Date: ${label}`}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="close" 
                        stroke={metrics?.isPositive ? '#10b981' : '#f43f5e'} 
                        strokeWidth={3}
                        fillOpacity={1} 
                        fill="url(#colorClose)" 
                        animationDuration={1500}
                        animationEasing="ease-in-out"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
