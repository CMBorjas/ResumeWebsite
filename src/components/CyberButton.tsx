import React from 'react';

interface CyberButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'glitch' | 'outline' | 'danger';
    children: React.ReactNode;
}

export default function CyberButton({
    variant = 'primary',
    children,
    className = '',
    ...props
}: CyberButtonProps) {

    const distinctStyles = {
        primary: "bg-cp-yellow text-cp-black border-transparent hover:bg-white hover:text-black",
        glitch: "bg-cp-cyan text-cp-black border-transparent hover:shadow-[0_0_15px_rgba(0,240,255,0.7)] hover:text-white hover:bg-black",
        outline: "bg-transparent text-cp-yellow border-cp-yellow hover:bg-cp-yellow hover:text-black",
        danger: "bg-cp-red text-white border-transparent hover:bg-red-600 hover:shadow-[0_0_15px_rgba(255,0,60,0.7)]"
    };

    const baseStyles = "relative font-bold uppercase tracking-wider px-8 py-3 transition-all duration-200 clip-corner-br border-2 group";

    return (
        <button
            className={`${baseStyles} ${distinctStyles[variant]} ${className}`}
            {...props}
        >
            <span className="relative z-10 flex items-center justify-center gap-2">
                {children}
            </span>

            {/* Glitch Effect Element (Hidden by default, visible on hover for glitch variant) */}
            {variant === 'glitch' && (
                <span className="absolute inset-0 bg-cp-red opacity-0 group-hover:opacity-20 translate-x-1 translate-y-0 transition-opacity duration-75" />
            )}

            {/* R-Shape Decoration */}
            <span className="absolute bottom-0 right-0 w-4 h-4 bg-current opacity-50 clip-corner-br" />
        </button>
    );
}
