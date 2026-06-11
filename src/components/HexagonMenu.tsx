'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function HexagonMenu() {
    const [isHovered, setIsHovered] = useState(false)
    const [isLocked, setIsLocked] = useState(false)
    const [hoveredHex, setHoveredHex] = useState<number | null>(null)
    // Default to right as requested by user
    const [navPosition, setNavPosition] = useState<'left' | 'right'>('right')
    const pathname = usePathname()

    // Restore saved position on mount
    useEffect(() => {
        const savedPos = localStorage.getItem('navPosition') as 'left' | 'right'
        if (savedPos === 'left' || savedPos === 'right') {
            setNavPosition(savedPos)
        }
    }, [])

    const toggleNavPosition = () => {
        setNavPosition(prev => {
            const next = prev === 'left' ? 'right' : 'left'
            localStorage.setItem('navPosition', next)
            return next
        })
    }

    const isOpen = isHovered || isLocked

    const isActive = (path: string) => {
        const normalizedPath = pathname.replace('/ResumeWebsite', '') || '/';
        return normalizedPath === path;
    }

    const isRight = navPosition === 'right';
    
    // The centroid of the asymmetric hexagon is offset from the bounding box center.
    // Increased to 6px to push them slightly more towards the flat edge.
    const iconOffsetClass = navPosition === 'left' ? '-translate-x-[6px]' : 'translate-x-[6px]';
    
    // If on the right edge, point left. If on the left edge, point right.
    const hexPoints = isRight 
        ? "12 2 2 8.5 2 15.5 12 22 22 22 22 2"
        : "12 2 22 8.5 22 15.5 12 22 2 22 2 2";

    const toggleCoverPoints = isRight
        ? "12 2 2 8.5 2 15.5 12 22 2000 22 2000 2"
        : "12 2 22 8.5 22 15.5 12 22 -2000 22 -2000 2";

    const getTransformY = (index: number, active: boolean) => {
        if (!isOpen) {
            // When closed, stack them all behind the toggle, except the active page indicator
            // 66px ensures it perfectly touches the bottom of the main toggle (lock bar)
            if (active) return 66;
            return 0;
        }
        
        // Tabs should be edge-touching in the y axis. 
        // Hexagon height is 60px visually, plus 3px stroke on top/bottom = 66px total height.
        return (index - 1) * 66; 
    }

    const getTransformX = (index: number, active: boolean) => {
        if (!isOpen) return 0;
        
        const isHoveredItem = hoveredHex === index;
        
        if (isLocked) {
            // When locked, they form a perfect vertical column at x=0.
            const slideAmount = (isHoveredItem && index > 1) ? 80 : 0;
            return navPosition === 'left' ? slideAmount : -slideAmount;
        } else if (isOpen && index > 1) {
            // Yellow arrow mode (Unlocked, but Menu is Hovered)
            
            // The active page should not have its title taken away, it remains in the column
            if (active && !isHoveredItem) {
                return 0;
            }
            
            // Non-hovered items push themselves to the edge of the screen so their horizontal text is hidden outside the viewport.
            // Hovered items slide into view, pulling their text mechanically from behind the screen edge.
            const hideOffScreenX = 36;
            const slideIntoViewX = 80;
            
            if (isHoveredItem) {
                return navPosition === 'left' ? slideIntoViewX : -slideIntoViewX;
            } else {
                return navPosition === 'left' ? -hideOffScreenX : hideOffScreenX;
            }
        }
        
        return 0;
    }

    const getTextClasses = (path: string, index: number) => {
        const isHoveredItem = hoveredHex === index;
        const isActiveItem = isActive(path);
        const isYellowArrowMode = !isLocked && isOpen;
        
        // Text is rotated if it's in the locked column, OR if it's the active page indicator, AND it's not currently being hovered.
        const isRotated = (isLocked || isActiveItem) && !isHoveredItem;
        
        // When horizontal, left/right is 45.3px to achieve a 2px visual gap.
        // When rotated 90deg, the center shifts. A 48x12 box needs 18px of compensation. 45.3 - 18 = 27.3px.
        const positionClass = navPosition === 'left' 
            ? (isRotated ? 'right-[27.3px]' : 'right-[45.3px]')
            : (isRotated ? 'left-[27.3px]' : 'left-[45.3px]');
            
        // h-[12px] is restored to ensure the mathematical center of rotation is exact, maintaining the perfect 2px gap.
        // A symmetrical gradient mask is applied when titles are scrolling back and forth.
        const maskClass = isRotated 
            ? '[mask-image:linear-gradient(to_right,transparent_0%,black_15%,black_85%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_right,transparent_0%,black_15%,black_85%,transparent_100%)]'
            : '';
            
        const justifyClass = navPosition === 'left' ? 'justify-end' : 'justify-start';
            
        const rotationClass = `w-[48px] h-[12px] flex items-center ${justifyClass} ${isRotated ? 'rotate-90' : 'rotate-0'} ${maskClass}`;
        
        // Text is visible if locked, hovered, active item, OR if we are in yellow arrow mode (so it can mechanically slide in fully opaque)
        const isVisible = isLocked || isHoveredItem || isActiveItem || (isYellowArrowMode && index > 1);
        const visibilityClass = isVisible 
            ? 'opacity-100 translate-x-0' 
            : 'opacity-0 translate-x-4';
            
        return `absolute top-1/2 -translate-y-1/2 transition-all duration-300 text-[10px] font-bold text-brand-cyan group-hover:text-white tracking-widest drop-shadow-[0_2px_4px_rgba(0,0,0,1)] z-20 whitespace-nowrap overflow-visible ${positionClass} ${visibilityClass} ${rotationClass}`;
    }

    const getInnerMarqueeClasses = (path: string, index: number) => {
        const isHoveredItem = hoveredHex === index;
        const isActiveItem = isActive(path);
        const isRotated = (isLocked || isActiveItem) && !isHoveredItem;
        
        if (isRotated) {
            return 'animate-marquee-left flex w-max';
        }
        return 'flex w-max';
    }

    const menuItems = [
        {
            index: 2,
            path: '/',
            label: 'HOME',
            innerSvg: (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`absolute inset-0 m-auto text-brand-cyan group-hover:text-white transition-all duration-300 drop-shadow-[0_0_5px_color-mix(in srgb, var(--color-brand-cyan) 80%, transparent)] z-20 pointer-events-none ${iconOffsetClass}`}>
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
            )
        },
        {
            index: 3,
            path: '/projects',
            label: 'PROJECTS',
            innerSvg: (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`absolute inset-0 m-auto text-brand-cyan group-hover:text-white transition-all duration-300 drop-shadow-[0_0_5px_color-mix(in srgb, var(--color-brand-cyan) 80%, transparent)] z-20 pointer-events-none ${iconOffsetClass}`}>
                    <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                    <polyline points="2 12 12 17 22 12"></polyline>
                    <polyline points="2 17 12 22 22 17"></polyline>
                </svg>
            )
        },
        {
            index: 4,
            path: '/resume',
            label: 'RESUME',
            innerSvg: (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`absolute inset-0 m-auto text-brand-cyan group-hover:text-white transition-all duration-300 drop-shadow-[0_0_5px_color-mix(in srgb, var(--color-brand-cyan) 80%, transparent)] z-20 pointer-events-none ${iconOffsetClass}`}>
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
            )
        },
        {
            index: 5,
            path: '/contact',
            label: 'CONTACT',
            innerSvg: (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`absolute inset-0 m-auto text-brand-cyan group-hover:text-white transition-all duration-300 drop-shadow-[0_0_5px_color-mix(in srgb, var(--color-brand-cyan) 80%, transparent)] z-20 pointer-events-none ${iconOffsetClass}`}>
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
            )
        },
        {
            index: 6,
            path: '/settings',
            label: 'SETTINGS',
            innerSvg: (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`absolute inset-0 m-auto text-brand-cyan group-hover:text-white transition-all duration-300 drop-shadow-[0_0_5px_color-mix(in srgb, var(--color-brand-cyan) 80%, transparent)] z-20 pointer-events-none ${iconOffsetClass}`}>
                    <circle cx="12" cy="12" r="3"></circle>
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                </svg>
            )
        },
        {
            index: 7,
            path: '',
            label: '',
            onClick: toggleNavPosition,
            innerSvg: (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`absolute inset-0 m-auto text-brand-cyan group-hover:text-white transition-all duration-300 drop-shadow-[0_0_5px_color-mix(in srgb, var(--color-brand-cyan) 80%, transparent)] z-20 pointer-events-none ${iconOffsetClass}`}>
                    {navPosition === 'left' ? (
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                    ) : (
                        <path d="M19 12H5M12 5l-7 7 7 7"/>
                    )}
                </svg>
            )
        }
    ];

    return (
        <>
            <style>{`
                @keyframes popBounce {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.25); }
                    100% { transform: scale(1); }
                }
                .hover-pop-once:hover {
                    animation: popBounce 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards;
                }
                @keyframes marquee-left {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee-left {
                    animation: marquee-left 4s linear infinite;
                }
            `}</style>

            {/* Unified Menu Container (acts as the expanded hitbox) */}
            <div 
                className={`fixed top-0 bottom-0 w-[200px] z-40 transition-all duration-700 ${navPosition === 'left' ? 'left-0' : 'right-0'}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
            >
                {/* Vertical ribbon effect */}
                <div className={`absolute inset-y-0 w-[120px] bg-gradient-to-b from-[#0a0a0a]/80 via-[#0a0a0a]/40 to-transparent transition-all duration-700 ${navPosition === 'left' ? 'left-0 border-r border-brand-cyan/10' : 'right-0 border-l border-brand-cyan/10'} ${isOpen ? 'translate-x-0 opacity-100' : (navPosition === 'left' ? '-translate-x-full opacity-0' : 'translate-x-full opacity-0')}`}></div>

                <div className={`absolute top-6 w-[120px] z-50 flex flex-col items-center ${navPosition === 'left' ? 'left-0' : 'right-0'}`}>
                    {/* Hexagon 1 (Main Menu Toggle) */}
                    <div
                        className="absolute z-40 origin-center transition-all duration-300 pointer-events-auto"
                        style={{ transform: `scale(1.5)`, top: 0 }}
                    >
                    <div
                        className={`block relative group hover-pop-once cursor-pointer`}
                        onClick={() => setIsLocked(!isLocked)}
                        onMouseEnter={() => setHoveredHex(1)}
                        onMouseLeave={() => setHoveredHex(null)}
                    >
                        <svg className={`transition-all duration-300 overflow-visible ${isLocked
                            ? 'drop-shadow-[0_0_15px_rgba(74,222,128,0.8)] fill-green-400/30 stroke-green-400'
                            : (isOpen
                                ? 'drop-shadow-[0_0_15px_rgba(253,224,71,0.8)] fill-yellow-400/30 stroke-yellow-400'
                                : 'drop-shadow-[0_0_10px_color-mix(in srgb, var(--color-brand-cyan) 40%, transparent)] group-hover:drop-shadow-[0_0_15px_color-mix(in srgb, var(--color-brand-cyan) 80%, transparent)] fill-brand-cyan/20 group-hover:fill-brand-cyan/40 stroke-brand-cyan/50'
                            )
                            }`} width="48" height="48" viewBox="0 0 24 24" strokeWidth="2">
                            <polygon points={toggleCoverPoints} className="fill-[#0a0a0a] stroke-none"></polygon>
                            <polygon points={toggleCoverPoints}></polygon>

                            <g transform={`translate(${navPosition === 'left' ? -3 : 3}, 0)`}>
                                {/* Hamburger Menu Icon / Arrow Morph */}
                                <g className={`transition-all duration-300 origin-center ${isLocked ? 'opacity-0 scale-60 rotate-180' : (isOpen ? 'opacity-100 scale-100 rotate-90' : 'opacity-100 scale-100 rotate-0')}`}>
                                    <line className={`origin-[16px_9px] transition-all duration-300 stroke-white ${isOpen ? 'translate-y-[3px] rotate-45' : ''}`} x1="8" y1="9" x2="16" y2="9" strokeWidth="1.5" strokeLinecap="round" />
                                    <line className={`transition-all duration-300 stroke-white`} x1="8" y1="12" x2="16" y2="12" strokeWidth="1.5" strokeLinecap="round" />
                                    <line className={`origin-[16px_15px] transition-all duration-300 stroke-white ${isOpen ? '-translate-y-[3px] -rotate-45' : ''}`} x1="8" y1="15" x2="16" y2="15" strokeWidth="1.5" strokeLinecap="round" />
                                </g>

                                {/* Lock Icon */}
                                <g className={`transition-all duration-300 origin-center ${isLocked ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-150 -rotate-90'}`}>
                                    <rect x="8" y="11" width="8" height="6" rx="1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                                    <path d="M 10 11 V 8.5 A 2 2 0 0 1 14 8.5 V 11" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                                </g>
                            </g>
                        </svg>
                    </div>
                </div>

                {/* Sub-menu Hexagons */}
                {menuItems.map((item) => {
                    const isLink = item.index !== 7;
                    const ContentWrapper = isLink ? Link : 'div';
                    const wrapperProps = isLink ? { href: item.path } : { onClick: item.onClick };
                    const active = isActive(item.path);
                    const isVisibleTab = isOpen || active;
                    
                    return (
                        <div
                            key={item.index}
                            className={`absolute ease-[cubic-bezier(0.34,1.56,0.64,1)] ${hoveredHex === item.index ? 'z-30' : (active ? 'z-20' : 'z-10')} ${isVisibleTab ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                            style={{ 
                                transitionProperty: 'all',
                                transitionDuration: `${300 + (item.index - 2) * 100}ms`,
                                transform: `translate(0px, ${getTransformY(item.index, active)}px)`,
                                width: '200px', 
                                height: '72px', 
                                left: '50%',
                                marginLeft: '-100px',
                                top: '-12px'
                            }}
                        >
                            <ContentWrapper 
                                {...wrapperProps as any}
                                className={`block w-full h-full group cursor-pointer`} 
                                onMouseEnter={() => setHoveredHex(item.index)} 
                                onMouseLeave={() => setHoveredHex(null)}
                            >
                                <div 
                                    className={`absolute ease-[cubic-bezier(0.34,1.56,0.64,1)]`}
                                    style={{ 
                                        transitionProperty: 'all',
                                        transitionDuration: '300ms',
                                        top: '12px', 
                                        left: '100px', 
                                        marginLeft: '-24px', 
                                        transform: `translate(${getTransformX(item.index, active)}px, 0px) scale(1.5)` 
                                    }}
                                >
                                    <div className="hover-pop-once relative w-[48px] h-[48px]">
                                        <svg width="48" height="48" viewBox="0 0 24 24" fill="color-mix(in srgb, var(--color-brand-cyan) 20%, transparent)" stroke="color-mix(in srgb, var(--color-brand-cyan) 50%, transparent)" strokeWidth="2" className="absolute inset-0 drop-shadow-[0_0_10px_color-mix(in srgb, var(--color-brand-cyan) 40%, transparent)] group-hover:fill-brand-cyan/40 group-hover:drop-shadow-[0_0_15px_color-mix(in srgb, var(--color-brand-cyan) 80%, transparent)] transition-all z-10">
                                            <polygon points={hexPoints}></polygon>
                                        </svg>
                                        {item.innerSvg}
                                        {item.index !== 7 ? (
                                            <span className={getTextClasses(item.path, item.index)}>
                                                <span className={getInnerMarqueeClasses(item.path, item.index)}>
                                                    <span className={((isLocked || active) && hoveredHex !== item.index) ? "pr-8" : ""}>{item.label}</span>
                                                    {((isLocked || active) && hoveredHex !== item.index) && (
                                                        <span className="pr-8" aria-hidden="true">{item.label}</span>
                                                    )}
                                                </span>
                                            </span>
                                        ) : (
                                            <span className={`absolute top-1/2 -translate-y-1/2 transition-all duration-300 text-[10px] font-bold text-brand-cyan group-hover:text-white tracking-widest drop-shadow-[0_2px_4px_rgba(0,0,0,1)] z-20 whitespace-nowrap pointer-events-none ${navPosition === 'left' ? 'left-full ml-4' : 'right-full mr-4'} opacity-0 group-hover:opacity-100 ${navPosition === 'left' ? '-translate-x-4 group-hover:translate-x-0' : 'translate-x-4 group-hover:translate-x-0'}`}>
                                                {navPosition === 'left' ? 'MOVE RIGHT' : 'MOVE LEFT'}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </ContentWrapper>
                        </div>
                    );
                })}
                </div>
            </div>
        </>
    )
}
