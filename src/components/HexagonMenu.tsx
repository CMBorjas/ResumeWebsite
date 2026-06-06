'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function HexagonMenu() {
    const [isHovered, setIsHovered] = useState(false)
    const [isLocked, setIsLocked] = useState(false)
    const [hoveredHex, setHoveredHex] = useState<number | null>(null)

    const isOpen = isHovered || isLocked

    const getTransform = (index: number) => {
        if (!isOpen) return `translateX(0px) scale(1.5)`;
        let x = (index - 1) * 66;
        if (isLocked) {
            if (index > 2) x += 80;
            if (index > 3) x += 115;
            if (index > 4) x += 100;
        } else if (hoveredHex !== null && hoveredHex !== 1) {
            if (index > hoveredHex) {
                // Sibling to the right is pushed to create a dynamic gap based on the word length
                let gap = 80;
                if (hoveredHex === 4) gap = 100; // RESUME
                if (hoveredHex === 3) gap = 115; // PROJECTS
                
                x += gap;
            }
        }
        return `translateX(${x}px) scale(1.5)`;
    }

    return (
        <div className="relative w-full flex items-center justify-start">
            <style>{`
                @keyframes popBounce {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.25); }
                    100% { transform: scale(1); }
                }
                .hover-pop-once:hover {
                    animation: popBounce 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards;
                }
            `}</style>

            {/* Full-screen black rectangle ribbon behind the menu */}
            <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-[100vw] h-16 bg-[#0a0a0a] border-y border-[#00ffe1]/20 shadow-[0_0_15px_rgba(0,0,0,0.8)] pointer-events-none z-0"></div>

            <div
                className="relative flex items-center justify-start h-12 w-[700px] z-10 ml-8"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Hexagon 5 (Contact) */}
                <div
                    className={`absolute left-0 transition-all duration-[600ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] ${hoveredHex === 5 ? 'z-20' : 'z-10'}`}
                    style={{ transform: getTransform(5) }}
                >
                    <Link href="/contact" className={`block relative group hover-pop-once cursor-pointer`} onMouseEnter={() => setHoveredHex(5)} onMouseLeave={() => setHoveredHex(null)}>
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="rgba(0,255,225,0.2)" stroke="rgba(0,255,225,0.5)" strokeWidth="2" className="drop-shadow-[0_0_10px_rgba(0,255,225,0.4)] group-hover:fill-brand-cyan/40 group-hover:drop-shadow-[0_0_15px_rgba(0,255,225,0.8)] transition-all relative z-10">
                            <polygon points="12 2 22 8.5 22 15.5 12 22 2 22 2 2"></polygon>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute inset-0 m-auto text-[#00ffe1] group-hover:text-white transition-colors duration-300 drop-shadow-[0_0_5px_rgba(0,255,225,0.8)] z-20 pointer-events-none">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                            <polyline points="22,6 12,13 2,6"></polyline>
                        </svg>
                        <span className={`absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 transition-all duration-300 text-[10px] font-bold text-[#00ffe1] group-hover:text-white tracking-widest drop-shadow-[0_2px_4px_rgba(0,0,0,1)] z-20 whitespace-nowrap ${isLocked ? 'opacity-100 translate-x-[calc(-50%_+_55px)]' : 'opacity-0 group-hover:translate-x-[calc(-50%_+_55px)] group-hover:opacity-100'}`}>
                            CONTACT
                        </span>
                    </Link>
                </div>

                {/* Hexagon 4 (Resume) */}
                <div
                    className={`absolute left-0 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${hoveredHex === 4 ? 'z-20' : 'z-10'}`}
                    style={{ transform: getTransform(4) }}
                >
                    <Link href="/resume" className={`block relative group hover-pop-once cursor-pointer`} onMouseEnter={() => setHoveredHex(4)} onMouseLeave={() => setHoveredHex(null)}>
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="rgba(0,255,225,0.2)" stroke="rgba(0,255,225,0.5)" strokeWidth="2" className="drop-shadow-[0_0_10px_rgba(0,255,225,0.4)] group-hover:fill-brand-cyan/40 group-hover:drop-shadow-[0_0_15px_rgba(0,255,225,0.8)] transition-all relative z-10">
                            <polygon points="12 2 22 8.5 22 15.5 12 22 2 22 2 2"></polygon>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute inset-0 m-auto text-[#00ffe1] group-hover:text-white transition-colors duration-300 drop-shadow-[0_0_5px_rgba(0,255,225,0.8)] z-20 pointer-events-none">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                            <polyline points="14 2 14 8 20 8"></polyline>
                            <line x1="16" y1="13" x2="8" y2="13"></line>
                            <line x1="16" y1="17" x2="8" y2="17"></line>
                            <polyline points="10 9 9 9 8 9"></polyline>
                        </svg>
                        <span className={`absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 transition-all duration-300 text-[10px] font-bold text-[#00ffe1] group-hover:text-white tracking-widest drop-shadow-[0_2px_4px_rgba(0,0,0,1)] z-20 whitespace-nowrap ${isLocked ? 'opacity-100 translate-x-[calc(-50%_+_55px)]' : 'opacity-0 group-hover:translate-x-[calc(-50%_+_55px)] group-hover:opacity-100'}`}>
                            RESUME
                        </span>
                    </Link>
                </div>

                {/* Hexagon 3 (Projects) */}
                <div
                    className={`absolute left-0 transition-all duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${hoveredHex === 3 ? 'z-20' : 'z-10'}`}
                    style={{ transform: getTransform(3) }}
                >
                    <Link href="/projects" className={`block relative group hover-pop-once cursor-pointer`} onMouseEnter={() => setHoveredHex(3)} onMouseLeave={() => setHoveredHex(null)}>
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="rgba(0,255,225,0.2)" stroke="rgba(0,255,225,0.5)" strokeWidth="2" className="drop-shadow-[0_0_10px_rgba(0,255,225,0.4)] group-hover:fill-brand-cyan/40 group-hover:drop-shadow-[0_0_15px_rgba(0,255,225,0.8)] transition-all relative z-10">
                            <polygon points="12 2 22 8.5 22 15.5 12 22 2 22 2 2"></polygon>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute inset-0 m-auto text-[#00ffe1] group-hover:text-white transition-colors duration-300 drop-shadow-[0_0_5px_rgba(0,255,225,0.8)] z-20 pointer-events-none">
                            <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                            <polyline points="2 12 12 17 22 12"></polyline>
                            <polyline points="2 17 12 22 22 17"></polyline>
                        </svg>
                        <span className={`absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 transition-all duration-300 text-[10px] font-bold text-[#00ffe1] group-hover:text-white tracking-widest drop-shadow-[0_2px_4px_rgba(0,0,0,1)] z-20 whitespace-nowrap ${isLocked ? 'opacity-100 translate-x-[calc(-50%_+_55px)]' : 'opacity-0 group-hover:translate-x-[calc(-50%_+_55px)] group-hover:opacity-100'}`}>
                            PROJECTS
                        </span>
                    </Link>
                </div>

                {/* Hexagon 2 (Home) */}
                <div
                    className={`absolute left-0 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${hoveredHex === 2 ? 'z-20' : 'z-10'}`}
                    style={{ transform: getTransform(2) }}
                >
                    <Link href="/" className={`block relative group hover-pop-once cursor-pointer`} onMouseEnter={() => setHoveredHex(2)} onMouseLeave={() => setHoveredHex(null)}>
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="rgba(0,255,225,0.2)" stroke="rgba(0,255,225,0.5)" strokeWidth="2" className="drop-shadow-[0_0_10px_rgba(0,255,225,0.4)] group-hover:fill-brand-cyan/40 group-hover:drop-shadow-[0_0_15px_rgba(0,255,225,0.8)] transition-all relative z-10">
                            <polygon points="12 2 22 8.5 22 15.5 12 22 2 22 2 2"></polygon>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute inset-0 m-auto text-[#00ffe1] group-hover:text-white transition-colors duration-300 drop-shadow-[0_0_5px_rgba(0,255,225,0.8)] z-20 pointer-events-none">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                            <polyline points="9 22 9 12 15 12 15 22"></polyline>
                        </svg>
                        <span className={`absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 transition-all duration-300 text-[10px] font-bold text-[#00ffe1] group-hover:text-white tracking-widest drop-shadow-[0_2px_4px_rgba(0,0,0,1)] z-20 whitespace-nowrap ${isLocked ? 'opacity-100 translate-x-[calc(-50%_+_45px)]' : 'opacity-0 group-hover:translate-x-[calc(-50%_+_45px)] group-hover:opacity-100'}`}>
                            HOME
                        </span>
                    </Link>
                </div>

                {/* Hexagon 1 (Main Menu Toggle) */}
                <div
                    className="absolute left-0 z-20 origin-center transition-all duration-300"
                    style={{ transform: `scale(1.5)` }}
                >
                    <div
                        className={`block relative group hover-pop-once cursor-pointer ${hoveredHex === 1 ? 'z-20' : ''}`}
                        onClick={() => setIsLocked(!isLocked)}
                        onMouseEnter={() => setHoveredHex(1)}
                        onMouseLeave={() => setHoveredHex(null)}
                    >
                        <svg className={`transition-all duration-300 overflow-visible ${isLocked
                            ? 'drop-shadow-[0_0_15px_rgba(74,222,128,0.8)] fill-green-400/30 stroke-green-400'
                            : (isOpen
                                ? 'drop-shadow-[0_0_15px_rgba(253,224,71,0.8)] fill-yellow-400/30 stroke-yellow-400'
                                : 'drop-shadow-[0_0_10px_rgba(0,255,225,0.4)] group-hover:drop-shadow-[0_0_15px_rgba(0,255,225,0.8)] fill-[#00ffe1]/20 group-hover:fill-[#00ffe1]/40 stroke-[#00ffe1]/50'
                            )
                            }`} width="48" height="48" viewBox="0 0 24 24" strokeWidth="2">
                            <polygon points="12 2 22 8.5 22 15.5 12 22 -2000 22 -2000 2" className="fill-[#0a0a0a] stroke-none"></polygon>
                            <polygon points="12 2 22 8.5 22 15.5 12 22 -2000 22 -2000 2"></polygon>

                            {/* Hamburger Menu Icon / Arrow Morph */}
                            <g className={`transition-all duration-300 origin-[10px_12px] ${isLocked ? 'opacity-0 scale-60 rotate-90' : 'opacity-100 scale-100 rotate-0'}`}>
                                <line className={`origin-[14px_9px] transition-all duration-300 stroke-white ${isOpen ? 'translate-y-[3px] rotate-45' : ''}`} x1="6" y1="9" x2="14" y2="9" strokeWidth="1.5" strokeLinecap="round" />
                                <line className={`transition-all duration-300 stroke-white`} x1="6" y1="12" x2="14" y2="12" strokeWidth="1.5" strokeLinecap="round" />
                                <line className={`origin-[14px_15px] transition-all duration-300 stroke-white ${isOpen ? '-translate-y-[3px] -rotate-45' : ''}`} x1="6" y1="15" x2="14" y2="15" strokeWidth="1.5" strokeLinecap="round" />
                            </g>

                            {/* Lock Icon */}
                            <g className={`transition-all duration-300 origin-[10px_12px] ${isLocked ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-150 -rotate-90'}`}>
                                <rect x="6" y="11" width="8" height="6" rx="1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                                <path d="M 8 11 V 8.5 A 2 2 0 0 1 12 8.5 V 11" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                            </g>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    )
}
