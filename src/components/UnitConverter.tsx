'use client'

import React, { useState, useMemo } from 'react'

type Category = 'Length' | 'Weight' | 'Temperature'

interface ConversionRate {
  [key: string]: number
}

// Base is the first item in each category.
// Rates are relative to the base unit.
const LENGTH_RATES: ConversionRate = {
  'Meters': 1,
  'Kilometers': 1000,
  'Centimeters': 0.01,
  'Millimeters': 0.001,
  'Miles': 1609.344,
  'Yards': 0.9144,
  'Feet': 0.3048,
  'Inches': 0.0254
}

const WEIGHT_RATES: ConversionRate = {
  'Kilograms': 1,
  'Grams': 0.001,
  'Milligrams': 0.000001,
  'Pounds': 0.45359237,
  'Ounces': 0.02834952
}

const CATEGORIES: Category[] = ['Length', 'Weight', 'Temperature']
const TEMP_UNITS = ['Celsius', 'Fahrenheit', 'Kelvin']

export default function UnitConverter() {
  const [category, setCategory] = useState<Category>('Length')
  const [baseUnit, setBaseUnit] = useState('Meters')
  const [targetUnit, setTargetUnit] = useState('Feet')
  const [amount, setAmount] = useState<number | string>(1)

  // Handle category change
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCategory = e.target.value as Category
    setCategory(newCategory)
    
    if (newCategory === 'Length') {
      setBaseUnit('Meters')
      setTargetUnit('Feet')
    } else if (newCategory === 'Weight') {
      setBaseUnit('Kilograms')
      setTargetUnit('Pounds')
    } else if (newCategory === 'Temperature') {
      setBaseUnit('Celsius')
      setTargetUnit('Fahrenheit')
    }
  }

  // Get current units for the selected category
  const availableUnits = useMemo(() => {
    if (category === 'Length') return Object.keys(LENGTH_RATES)
    if (category === 'Weight') return Object.keys(WEIGHT_RATES)
    return TEMP_UNITS
  }, [category])

  // Conversion logic
  const convertedAmount = useMemo(() => {
    if (!amount || isNaN(Number(amount))) return 0
    const val = Number(amount)

    if (category === 'Temperature') {
      if (baseUnit === targetUnit) return val
      
      let tempC = val
      // First convert to Celsius
      if (baseUnit === 'Fahrenheit') tempC = (val - 32) * 5/9
      if (baseUnit === 'Kelvin') tempC = val - 273.15

      // Then convert to target
      if (targetUnit === 'Fahrenheit') return (tempC * 9/5) + 32
      if (targetUnit === 'Kelvin') return tempC + 273.15
      return tempC // Target is Celsius
    }

    // For Length and Weight
    const rates = category === 'Length' ? LENGTH_RATES : WEIGHT_RATES
    const baseRate = rates[baseUnit]
    const targetRate = rates[targetUnit]
    
    if (!baseRate || !targetRate) return 0
    
    // Formula: (amount * baseRate) / targetRate 
    // (Since rates are defined such that 1 Mile = 1609.344 Meters, meaning rates map Unit -> Base)
    return (val * baseRate) / targetRate
  }, [amount, baseUnit, targetUnit, category])

  const handleSwap = () => {
    setBaseUnit(targetUnit)
    setTargetUnit(baseUnit)
  }

  return (
    <div className="bg-[#0a0f18]/80 backdrop-blur-md rounded-xl p-6 border-2 border-brand-purple/50 shadow-[0_0_15px_color-mix(in_srgb,var(--color-brand-purple)_30%,transparent)] relative overflow-hidden group">
      <div className="absolute inset-0 border-2 border-brand-purple opacity-0 group-hover:opacity-20 transition-opacity pointer-events-none rounded-xl"></div>
      
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-brand-purple flex items-center gap-2 font-mono">
          <span className="w-2 h-2 rounded-full bg-brand-purple animate-pulse"></span>
          UNIT_EXCHANGE
        </h2>
        <select 
          value={category}
          onChange={handleCategoryChange}
          className="bg-slate-900 border border-brand-purple text-brand-purple text-xs font-mono font-bold rounded p-1 outline-none focus:shadow-[0_0_8px_color-mix(in_srgb,var(--color-brand-purple)_40%,transparent)] cursor-pointer"
        >
          {CATEGORIES.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
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
              className="w-full bg-slate-900/80 border border-slate-700 text-white rounded-lg p-3 outline-none focus:border-brand-purple/80 focus:shadow-[0_0_10px_color-mix(in_srgb,var(--color-brand-purple)_40%,transparent)] transition-all font-mono text-lg"
            />
          </div>
          <div className="w-32">
            <label className="block text-[10px] text-slate-400 font-mono tracking-widest mb-1">FROM</label>
            <select 
              value={baseUnit}
              onChange={(e) => setBaseUnit(e.target.value)}
              className="w-full bg-slate-900/80 border border-slate-700 text-brand-purple font-bold rounded-lg p-3 outline-none focus:border-brand-purple/80 focus:shadow-[0_0_10px_color-mix(in_srgb,var(--color-brand-purple)_40%,transparent)] transition-all cursor-pointer h-[54px]"
            >
              {availableUnits.map(u => (
                <option key={u} value={u}>{u}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Swap Button */}
        <div className="flex justify-center -my-2 relative z-10">
          <button 
            onClick={handleSwap}
            className="bg-slate-800 border border-brand-purple text-brand-purple hover:bg-brand-purple hover:text-black w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:shadow-[0_0_15px_color-mix(in_srgb,var(--color-brand-purple)_60%,transparent)] hover:rotate-180"
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
                {convertedAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })}
              </span>
            </div>
          </div>
          <div className="w-32">
            <label className="block text-[10px] text-slate-400 font-mono tracking-widest mb-1">TO</label>
            <select 
              value={targetUnit}
              onChange={(e) => setTargetUnit(e.target.value)}
              className="w-full bg-slate-900/80 border border-slate-700 text-brand-pink font-bold rounded-lg p-3 outline-none focus:border-brand-pink/80 focus:shadow-[0_0_10px_color-mix(in_srgb,var(--color-brand-pink)_40%,transparent)] transition-all cursor-pointer h-[54px]"
            >
              {availableUnits.map(u => (
                <option key={u} value={u}>{u}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}
