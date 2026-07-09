'use client'

import React, { useState, useEffect, useMemo } from 'react'

interface CurrencyConverterProps {
  rates: Record<string, number>
  lastUpdated: string
}

const COMMON_CURRENCIES = [
  'USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY', 'MXN', 'INR', 'BRL'
]

export default function CurrencyConverter({ rates, lastUpdated }: CurrencyConverterProps) {
  const [baseCurrency, setBaseCurrency] = useState('USD')
  const [targetCurrency, setTargetCurrency] = useState('EUR')
  const [amount, setAmount] = useState<number | string>(1)
  
  // Create a filtered list of currencies, ensuring base_code (USD) is always 1 in rates
  const availableCurrencies = useMemo(() => {
    return Object.keys(rates).filter(c => COMMON_CURRENCIES.includes(c)).sort()
  }, [rates])

  const convertedAmount = useMemo(() => {
    if (!amount || isNaN(Number(amount))) return 0
    
    // Convert to USD (base) first, then to target
    const baseRate = rates[baseCurrency]
    const targetRate = rates[targetCurrency]
    
    if (!baseRate || !targetRate) return 0
    
    // Formula: (amount / baseRate) * targetRate
    return (Number(amount) / baseRate) * targetRate
  }, [amount, baseCurrency, targetCurrency, rates])

  const handleSwap = () => {
    setBaseCurrency(targetCurrency)
    setTargetCurrency(baseCurrency)
  }

  return (
    <div className="bg-[#0a0f18]/80 backdrop-blur-md rounded-xl p-6 border-2 border-brand-cyan/50 shadow-[0_0_15px_color-mix(in_srgb,var(--color-brand-cyan)_30%,transparent)] relative overflow-hidden group">
      <div className="absolute inset-0 border-2 border-brand-cyan opacity-0 group-hover:opacity-20 transition-opacity pointer-events-none rounded-xl"></div>
      
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-brand-cyan flex items-center gap-2 font-mono">
          <span className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse"></span>
          CURRENCY_EXCHANGE
        </h2>
        <span className="text-[9px] text-slate-500 uppercase tracking-widest font-mono hidden md:block">
          Last sync: {new Date(lastUpdated).toLocaleDateString()}
        </span>
      </div>

      <div className="flex flex-col gap-4">
        {/* Base Input */}
        <div className="flex gap-2">
          <div className="flex-1">
            <label className="block text-[10px] text-slate-400 font-mono tracking-widest mb-1">AMOUNT</label>
            <input 
              type="number" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-slate-900/80 border border-slate-700 text-white rounded-lg p-3 outline-none focus:border-brand-cyan/80 focus:shadow-[0_0_10px_color-mix(in_srgb,var(--color-brand-cyan)_40%,transparent)] transition-all font-mono text-lg"
            />
          </div>
          <div className="w-32">
            <label className="block text-[10px] text-slate-400 font-mono tracking-widest mb-1">FROM</label>
            <select 
              value={baseCurrency}
              onChange={(e) => setBaseCurrency(e.target.value)}
              className="w-full bg-slate-900/80 border border-slate-700 text-brand-cyan font-bold rounded-lg p-3 outline-none focus:border-brand-cyan/80 focus:shadow-[0_0_10px_color-mix(in_srgb,var(--color-brand-cyan)_40%,transparent)] transition-all cursor-pointer h-[54px]"
            >
              {availableCurrencies.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Swap Button */}
        <div className="flex justify-center -my-2 relative z-10">
          <button 
            onClick={handleSwap}
            className="bg-slate-800 border border-brand-cyan text-brand-cyan hover:bg-brand-cyan hover:text-black w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:shadow-[0_0_15px_color-mix(in_srgb,var(--color-brand-cyan)_60%,transparent)] hover:rotate-180"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="16 3 21 3 21 8"></polyline>
              <line x1="4" y1="14" x2="21" y2="3"></line>
              <polyline points="8 21 3 21 3 16"></polyline>
              <line x1="20" y1="10" x2="3" y2="21"></line>
            </svg>
          </button>
        </div>

        {/* Target Output */}
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <label className="block text-[10px] text-slate-400 font-mono tracking-widest mb-1">CONVERTED</label>
            <div className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-lg p-3 font-mono text-lg flex items-center overflow-hidden">
              <span className="truncate text-brand-pink font-bold">
                {convertedAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>
          <div className="w-32">
            <label className="block text-[10px] text-slate-400 font-mono tracking-widest mb-1">TO</label>
            <select 
              value={targetCurrency}
              onChange={(e) => setTargetCurrency(e.target.value)}
              className="w-full bg-slate-900/80 border border-slate-700 text-brand-pink font-bold rounded-lg p-3 outline-none focus:border-brand-pink/80 focus:shadow-[0_0_10px_color-mix(in_srgb,var(--color-brand-pink)_40%,transparent)] transition-all cursor-pointer h-[54px]"
            >
              {availableCurrencies.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Rate Display */}
        <div className="mt-2 text-center text-xs text-slate-400 font-mono">
          1 {baseCurrency} = {((1 / rates[baseCurrency]) * rates[targetCurrency]).toLocaleString(undefined, { minimumFractionDigits: 4, maximumFractionDigits: 4 })} {targetCurrency}
        </div>
      </div>
    </div>
  )
}
