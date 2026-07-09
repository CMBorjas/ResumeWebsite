import React from 'react'
import CurrencyConverter from '../../../components/CurrencyConverter'
import UnitConverter from '../../../components/UnitConverter'

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

        {/* Unit Converter */}
        <section>
          <UnitConverter />
        </section>
      </div>
    </div>
  )
}
