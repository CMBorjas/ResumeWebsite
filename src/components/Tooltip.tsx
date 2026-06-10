import { ReactNode } from 'react';

interface TooltipProps {
  children: ReactNode;
  text: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  align?: 'center' | 'left' | 'right';
  className?: string;
}

export default function Tooltip({ children, text, position = 'top', align = 'center', className = '' }: TooltipProps) {
  // Determine positioning classes
  const positionClasses = {
    top: `bottom-full mb-3 ${align === 'center' ? 'left-1/2 -translate-x-1/2' : align === 'left' ? 'left-0' : 'right-0'}`,
    bottom: `top-full mt-3 ${align === 'center' ? 'left-1/2 -translate-x-1/2' : align === 'left' ? 'left-0' : 'right-0'}`,
    left: `right-full mr-3 ${align === 'center' ? 'top-1/2 -translate-y-1/2' : align === 'left' ? 'top-0' : 'bottom-0'}`,
    right: `left-full ml-3 ${align === 'center' ? 'top-1/2 -translate-y-1/2' : align === 'left' ? 'top-0' : 'bottom-0'}`,
  };

  // Determine caret (triangle) classes based on position and align
  const caretClasses = {
    top: `bottom-[-4px] border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[5px] border-t-brand-cyan/50 ${align === 'center' ? 'left-1/2 -translate-x-1/2' : align === 'left' ? 'left-3' : 'right-3'}`,
    bottom: `top-[-4px] border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-b-[5px] border-b-brand-cyan/50 ${align === 'center' ? 'left-1/2 -translate-x-1/2' : align === 'left' ? 'left-3' : 'right-3'}`,
    left: `right-[-4px] border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[5px] border-l-brand-cyan/50 ${align === 'center' ? 'top-1/2 -translate-y-1/2' : align === 'left' ? 'top-3' : 'bottom-3'}`,
    right: `left-[-4px] border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-r-[5px] border-r-brand-cyan/50 ${align === 'center' ? 'top-1/2 -translate-y-1/2' : align === 'left' ? 'top-3' : 'bottom-3'}`,
  };
  
  // Additional caret styling for the inner background to match the tooltip body
  const innerCaretClasses = {
    top: `bottom-[-3px] border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] border-t-slate-900 ${align === 'center' ? 'left-1/2 -translate-x-1/2' : align === 'left' ? 'left-[13px]' : 'right-[13px]'}`,
    bottom: `top-[-3px] border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[4px] border-b-slate-900 ${align === 'center' ? 'left-1/2 -translate-x-1/2' : align === 'left' ? 'left-[13px]' : 'right-[13px]'}`,
    left: `right-[-3px] border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-l-[4px] border-l-slate-900 ${align === 'center' ? 'top-1/2 -translate-y-1/2' : align === 'left' ? 'top-[13px]' : 'bottom-[13px]'}`,
    right: `left-[-3px] border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-r-[4px] border-r-slate-900 ${align === 'center' ? 'top-1/2 -translate-y-1/2' : align === 'left' ? 'top-[13px]' : 'bottom-[13px]'}`,
  };

  // Slide animation origins based on position
  const translateClasses = {
    top: 'translate-y-1 group-hover:-translate-y-1',
    bottom: '-translate-y-1 group-hover:translate-y-1',
    left: 'translate-x-1 group-hover:-translate-x-1',
    right: '-translate-x-1 group-hover:translate-x-1',
  };

  return (
    <div className={`relative group flex items-center justify-center ${className}`}>
      {children}
      <div className={`absolute ${positionClasses[position]} z-50 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out ${translateClasses[position]}`}>
        {/* Cyberpunk styled tooltip container */}
        <div className="relative px-3 py-1.5 bg-slate-900/90 backdrop-blur-md border border-brand-cyan/50 shadow-[0_0_10px_color-mix(in_srgb,var(--color-brand-cyan)_40%,transparent)] rounded text-[10px] font-bold text-brand-cyan whitespace-nowrap uppercase tracking-wider">
          {text}
          {/* Outer caret for border */}
          <div className={`absolute w-0 h-0 ${caretClasses[position]}`}></div>
          {/* Inner caret for background fill */}
          <div className={`absolute w-0 h-0 z-10 ${innerCaretClasses[position]}`}></div>
        </div>
      </div>
    </div>
  );
}
