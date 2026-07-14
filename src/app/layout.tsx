import '../styles/globals.css'
import Link from 'next/link'
import styles from './footer.module.css'
import HexagonMenu from '../components/HexagonMenu'
import InteractiveCanvas from '../components/InteractiveCanvas'
import PageTransition from '../components/PageTransition'
import { ThemeProvider } from '../components/ThemeProvider'
import CookieConsent from '../components/CookieConsent'

export const metadata = {
    title: 'Christian Mandujano Borjas — Portfolio',
    description: 'Portfolio and resume site',
}
const basePath = process.env.NODE_ENV === 'production' ? '/ResumeWebsite' : '';

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
            <body className="body-bg bg-slate-900 text-slate-100 antialiased min-h-screen flex flex-col relative">
                <ThemeProvider>
                    <InteractiveCanvas />

                <HexagonMenu />

                <main className="flex-1 w-full px-4 md:px-28 py-8">
                    <PageTransition>
                        {children}
                    </PageTransition>
                </main>

                <footer className="border-t border-brand-cyan/20 bg-[#0d1117] py-8 relative z-10 mt-auto shadow-[0_-5px_15px_rgba(0,0,0,0.5)]">
                    <div className="container mx-auto flex flex-col items-center">
                        <nav>
                            <ul className="flex justify-center gap-10 mb-6">
                                <li>
                                    <Link href="/" className="relative flex items-center justify-center w-20 h-8 group">
                                        <svg className="absolute w-6 h-6 text-brand-cyan transition-all duration-300 transform group-hover:-translate-y-4 group-hover:opacity-0 drop-shadow-[0_0_5px_color-mix(in srgb, var(--color-brand-cyan) 50%, transparent)]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                            <polyline points="9 22 9 12 15 12 15 22"></polyline>
                                        </svg>
                                        <span className="absolute text-[10px] tracking-widest font-bold uppercase text-white opacity-0 transform translate-y-4 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]">Home</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/projects" className="relative flex items-center justify-center w-20 h-8 group">
                                        <svg className="absolute w-6 h-6 text-brand-cyan transition-all duration-300 transform group-hover:-translate-y-4 group-hover:opacity-0 drop-shadow-[0_0_5px_color-mix(in srgb, var(--color-brand-cyan) 50%, transparent)]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                                            <polyline points="2 12 12 17 22 12"></polyline>
                                            <polyline points="2 17 12 22 22 17"></polyline>
                                        </svg>
                                        <span className="absolute text-[10px] tracking-widest font-bold uppercase text-white opacity-0 transform translate-y-4 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]">Projects</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/resume" className="relative flex items-center justify-center w-20 h-8 group">
                                        <svg className="absolute w-6 h-6 text-brand-cyan transition-all duration-300 transform group-hover:-translate-y-4 group-hover:opacity-0 drop-shadow-[0_0_5px_color-mix(in srgb, var(--color-brand-cyan) 50%, transparent)]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                                        <svg className="absolute w-6 h-6 text-brand-cyan transition-all duration-300 transform group-hover:-translate-y-4 group-hover:opacity-0 drop-shadow-[0_0_5px_color-mix(in srgb, var(--color-brand-cyan) 50%, transparent)]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                            <polyline points="22,6 12,13 2,6"></polyline>
                                        </svg>
                                        <span className="absolute text-[10px] tracking-widest font-bold uppercase text-white opacity-0 transform translate-y-4 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]">Contact</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/live-projects" className="relative flex items-center justify-center w-20 h-8 group">
                                        <svg className="absolute w-6 h-6 text-brand-cyan transition-all duration-300 transform group-hover:-translate-y-4 group-hover:opacity-0 drop-shadow-[0_0_5px_color-mix(in srgb, var(--color-brand-cyan) 50%, transparent)]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                                        </svg>
                                        <span className="absolute text-[10px] tracking-widest font-bold uppercase text-white opacity-0 transform translate-y-4 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]">Live</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/blog" className="relative flex items-center justify-center w-20 h-8 group">
                                        <svg className="absolute w-6 h-6 text-brand-cyan transition-all duration-300 transform group-hover:-translate-y-4 group-hover:opacity-0 drop-shadow-[0_0_5px_color-mix(in srgb, var(--color-brand-cyan) 50%, transparent)]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
                                        </svg>
                                        <span className="absolute text-[10px] tracking-widest font-bold uppercase text-white opacity-0 transform translate-y-4 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]">Blog</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/settings" className="relative flex items-center justify-center w-20 h-8 group">
                                        <svg className="absolute w-6 h-6 text-brand-cyan transition-all duration-300 transform group-hover:-translate-y-4 group-hover:opacity-0 drop-shadow-[0_0_5px_color-mix(in srgb, var(--color-brand-cyan) 50%, transparent)]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <circle cx="12" cy="12" r="3"></circle>
                                            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                                        </svg>
                                        <span className="absolute text-[10px] tracking-widest font-bold uppercase text-white opacity-0 transform translate-y-4 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]">Settings</span>
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                        
                        {/* Glowing Separator */}
                        <div className="w-48 h-[1px] bg-gradient-to-r from-transparent via-brand-cyan/40 to-transparent mt-4 mb-4"></div>

                        <p className="text-xs text-slate-500 tracking-wider">© {new Date().getFullYear()} <span translate="no" className="notranslate">Christian Mandujano Borjas</span></p>
                    </div>
                </footer>
                <CookieConsent />
                </ThemeProvider>
            </body>
        </html>
    )
}