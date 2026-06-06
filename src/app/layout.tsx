import '../styles/globals.css'
import Link from 'next/link'
import styles from './footer.module.css'
import HexagonMenu from '../components/HexagonMenu'

export const metadata = {
    title: 'Christian Mandujano Borjas — Portfolio',
    description: 'Portfolio and resume site',
}
export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                {/* Google font - Inter */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&display=swap" rel="stylesheet" />
                {/* Devicon – language / tool SVG icons */}
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" />
            </head>
            <body className="body-bg bg-slate-900 text-slate-100 antialiased min-h-screen flex flex-col">
                <header className="header-bg text-white py-8">
                    <div className="container mx-auto flex flex-col items-center justify-center gap-2">
                        <div className="text-center">
                            <h1 className="text-3xl font-extrabold site-name">Christian Mandujano Borjas</h1>
                            <p className="text-sm text-brand-cyan mt-1">
                                <a
                                    href="mailto:C.mandujano.borjas@gmail.com"
                                    className="text-brand-cyan hover:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-brand-cyan"
                                >
                                    C.mandujano.borjas@gmail.com
                                </a>
                            </p>
                        </div>
                    </div>
                </header>
                
                <HexagonMenu />

                <main className="flex-1 w-full px-4 py-8">
                    {children}
                </main>

                <footer className="border-t border-[#00ffe1]/20 bg-[#0d1117] py-8 relative z-10 mt-auto shadow-[0_-5px_15px_rgba(0,0,0,0.5)]">
                    <div className="container mx-auto flex flex-col items-center">
                        <nav>
                            <ul className="flex justify-center gap-10 mb-6">
                                <li>
                                    <Link href="/" className="relative flex items-center justify-center w-20 h-8 group">
                                        <svg className="absolute w-6 h-6 text-[#00ffe1] transition-all duration-300 transform group-hover:-translate-y-4 group-hover:opacity-0 drop-shadow-[0_0_5px_rgba(0,255,225,0.5)]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                            <polyline points="9 22 9 12 15 12 15 22"></polyline>
                                        </svg>
                                        <span className="absolute text-[10px] tracking-widest font-bold uppercase text-white opacity-0 transform translate-y-4 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]">Home</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/projects" className="relative flex items-center justify-center w-20 h-8 group">
                                        <svg className="absolute w-6 h-6 text-[#00ffe1] transition-all duration-300 transform group-hover:-translate-y-4 group-hover:opacity-0 drop-shadow-[0_0_5px_rgba(0,255,225,0.5)]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                                            <polyline points="2 12 12 17 22 12"></polyline>
                                            <polyline points="2 17 12 22 22 17"></polyline>
                                        </svg>
                                        <span className="absolute text-[10px] tracking-widest font-bold uppercase text-white opacity-0 transform translate-y-4 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]">Projects</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/resume" className="relative flex items-center justify-center w-20 h-8 group">
                                        <svg className="absolute w-6 h-6 text-[#00ffe1] transition-all duration-300 transform group-hover:-translate-y-4 group-hover:opacity-0 drop-shadow-[0_0_5px_rgba(0,255,225,0.5)]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                            <polyline points="14 2 14 8 20 8"></polyline>
                                            <line x1="16" y1="13" x2="8" y2="13"></line>
                                            <line x1="16" y1="17" x2="8" y2="17"></line>
                                            <polyline points="10 9 9 9 8 9"></polyline>
                                        </svg>
                                        <span className="absolute text-[10px] tracking-widest font-bold uppercase text-white opacity-0 transform translate-y-4 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]">Resume</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/contact" className="relative flex items-center justify-center w-20 h-8 group">
                                        <svg className="absolute w-6 h-6 text-[#00ffe1] transition-all duration-300 transform group-hover:-translate-y-4 group-hover:opacity-0 drop-shadow-[0_0_5px_rgba(0,255,225,0.5)]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                            <polyline points="22,6 12,13 2,6"></polyline>
                                        </svg>
                                        <span className="absolute text-[10px] tracking-widest font-bold uppercase text-white opacity-0 transform translate-y-4 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]">Contact</span>
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                        
                        {/* Glowing Separator */}
                        <div className="w-48 h-[1px] bg-gradient-to-r from-transparent via-[#00ffe1]/40 to-transparent mt-4 mb-4"></div>

                        <p className="text-xs text-slate-500 tracking-wider">© {new Date().getFullYear()} Christian Mandujano Borjas</p>
                    </div>
                </footer>
            </body>
        </html>
    )
}