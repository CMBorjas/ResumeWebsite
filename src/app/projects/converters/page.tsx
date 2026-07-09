import React from 'react'
import CurrencyConverter from '../../../components/CurrencyConverter'

async function getExchangeRates() {
  try {
    const res = await fetch('https://open.er-api.com/v6/latest/USD', {
      next: { revalidate: 86400 } // Revalidate once a day (24 hours) since ER-API updates daily
    })
    
    if (!res.ok) {
      throw new Error('Failed to fetch exchange rates')
    }
    
    const data = await res.json()
    return data
  } catch (error) {
    console.error(error)
    return {
      rates: { USD: 1, EUR: 0.85, GBP: 0.73 }, // Fallback mock rates
      time_last_update_utc: new Date().toUTCString()
    }
  }
}

export default async function ConvertersPage() {
  const exchangeData = await getExchangeRates()

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <div className="mb-12 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4 flex items-center justify-center md:justify-start gap-4">
          <span className="text-brand-cyan">&lt;</span>
          Utility Converters
          <span className="text-brand-cyan">/&gt;</span>
        </h1>
        <p className="text-slate-400 max-w-2xl text-sm md:text-base leading-relaxed mx-auto md:mx-0">
          A suite of modular conversion tools powered by real-time data APIs and client-side computational logic. Built with React and designed to seamlessly integrate into the glassmorphic terminal UI.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Currency Converter */}
        <section>
          <CurrencyConverter 
            rates={exchangeData.rates} 
            lastUpdated={exchangeData.time_last_update_utc} 
          />
        </section>

        {/* Unit Converter Placeholder */}
        <section>
          <div className="bg-slate-900/30 backdrop-blur-md rounded-xl p-6 border-2 border-slate-800 border-dashed h-full min-h-[300px] flex flex-col items-center justify-center text-center relative overflow-hidden group">
            <svg className="w-12 h-12 text-slate-600 mb-4 group-hover:text-brand-cyan transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
            <h3 className="text-lg font-bold text-slate-400 font-mono mb-2 group-hover:text-brand-cyan transition-colors">UNIT_CONVERTER</h3>
            <p className="text-xs text-slate-500 font-mono tracking-widest uppercase animate-pulse">
              Awaiting Deployment
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
