'use client';

import React, { useState, ChangeEvent } from 'react';

interface RestrictedTextareaProps {
  id?: string;
  name?: string;
  placeholder?: string;
  maxLength?: number;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
  label?: string;
  required?: boolean;
}

export default function RestrictedTextarea({
  id = 'restricted-textarea',
  name = 'message',
  placeholder = 'Enter your message...',
  maxLength = 500,
  value,
  onChange,
  rows = 5,
  label,
  required = false
}: RestrictedTextareaProps) {
  const [internalValue, setInternalValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  
  const currentValue = value !== undefined ? value : internalValue;
  
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    if (newValue.length <= maxLength) {
      if (value === undefined) {
        setInternalValue(newValue);
      }
      if (onChange) {
        onChange(e);
      }
    }
  };

  const percentage = (currentValue.length / maxLength) * 100;
  
  // Cyberpunk styling details
  const getCounterColor = () => {
    if (percentage >= 100) return 'text-brand-pink'; // Limit reached
    if (percentage > 85) return 'text-yellow-400'; // Warning
    return 'text-brand-cyan'; // Normal
  };

  const getBorderColor = () => {
    if (isFocused) {
      if (percentage >= 100) return 'border-brand-pink shadow-[0_0_10px_color-mix(in_srgb,var(--color-brand-pink)_40%,transparent)]';
      return 'border-brand-cyan shadow-[0_0_10px_color-mix(in_srgb,var(--color-brand-cyan)_40%,transparent)]';
    }
    return 'border-brand-cyan/30';
  };

  return (
    <div className="flex flex-col w-full relative">
      {label && (
        <label htmlFor={id} className="text-xs font-bold text-slate-300 tracking-widest uppercase mb-2 flex justify-between items-end">
          <span>{label} {required && <span className="text-brand-pink ml-1">*</span>}</span>
        </label>
      )}
      
      <div className="relative group">
        {/* Background glow effect on focus */}
        {isFocused && (
          <div className="absolute inset-0 bg-brand-cyan/5 blur-md rounded-lg pointer-events-none transition-all duration-300"></div>
        )}
        
        <textarea
          id={id}
          name={name}
          rows={rows}
          value={currentValue}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          maxLength={maxLength}
          required={required}
          className={`w-full bg-[#0d1117]/80 text-slate-200 placeholder:text-slate-600 p-4 rounded-lg border-2 ${getBorderColor()} outline-none transition-all duration-300 resize-y min-h-[120px] font-mono text-sm z-10 relative`}
        />
        
        {/* Corner decorative elements typical of cyberpunk style */}
        <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-brand-cyan/50 rounded-tl-md pointer-events-none z-20 transition-colors duration-300"></div>
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-brand-cyan/50 rounded-br-md pointer-events-none z-20 transition-colors duration-300"></div>
      </div>
      
      <div className="flex justify-between items-center mt-2 px-1">
        <div className="flex items-center gap-2">
          {/* Visual progress bar */}
          <div className="w-24 h-1.5 bg-slate-800 rounded-full overflow-hidden flex">
            <div 
              className={`h-full transition-all duration-300 ${percentage >= 100 ? 'bg-brand-pink shadow-[0_0_5px_var(--color-brand-pink)]' : percentage > 85 ? 'bg-yellow-400 shadow-[0_0_5px_theme(colors.yellow.400)]' : 'bg-brand-cyan shadow-[0_0_5px_var(--color-brand-cyan)]'}`}
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
        </div>
        
        {/* Character count */}
        <div className={`text-xs font-mono font-bold transition-colors duration-300 ${getCounterColor()}`}>
          {currentValue.length} <span className="text-slate-500 font-normal">/ {maxLength}</span>
        </div>
      </div>
    </div>
  );
}
