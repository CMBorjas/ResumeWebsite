import React from 'react';

interface CyberCardProps {
    children: React.ReactNode;
    title?: string;
    className?: string;
    borderColor?: 'cyan' | 'yellow' | 'red';
}

export default function CyberCard({
    children,
    title,
    className = '',
    borderColor = 'cyan'
}: CyberCardProps) {

    const borderColors = {
        cyan: 'border-cp-cyan',
        yellow: 'border-cp-yellow',
        red: 'border-cp-red'
    };

    const textColors = {
        cyan: 'text-cp-cyan',
        yellow: 'text-cp-yellow',
        red: 'text-cp-red'
    };

    return (
        <div className={`relative bg-cp-dark/80 backdrop-blur-sm border ${borderColors[borderColor]} p-1 ${className}`}>
            {/* Corner Decorations */}
            <div className={`absolute top-0 left-0 w-2 h-2 ${textColors[borderColor]} bg-current`} />
            <div className={`absolute top-0 right-0 w-2 h-2 ${textColors[borderColor]} bg-current`} />
            <div className={`absolute bottom-0 left-0 w-2 h-2 ${textColors[borderColor]} bg-current`} />
            <div className={`absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 ${borderColors[borderColor]} clip-corner-br`} />

            <div className="bg-black/40 p-6 h-full relative z-10">
                {title && (
                    <div className="mb-4 flex justify-between items-end border-b border-gray-800 pb-2">
                        <h3 className={`text-xl font-bold uppercase tracking-widest ${textColors[borderColor]}`}>
                            {title}
                        </h3>
                        <span className="text-xs font-mono text-gray-500">/// SYNCED</span>
                    </div>
                )}
                {children}
            </div>
        </div>
    );
}
