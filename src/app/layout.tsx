import '../styles/globals.css'
import Link from 'next/link'
import styles from './footer.module.css'

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
                <header className="header-bg text-white">
                    <div className="container flex flex-col md:flex-row items-center justify-between gap-2">
                        <div>
                            <h1 className="text-3xl font-extrabold site-name">Christian Mandujano Borjas</h1>
                            <p className="text-sm text-brand-cyan text-left mt-1">
                                <a
                                    href="mailto:Christian.MandujanoBorjas@ucdenver.edu"
                                    className="text-brand-cyan hover:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-brand-cyan"
                                >
                                    Christian.MandujanoBorjas@ucdenver.edu
                                </a>
                            </p>
                        </div>
                    </div>
                </header>

                <main className="flex-1 w-full px-4 py-8">
                    <div className="flex mb-6 items-center justify-start">
                        {[1, 2, 3].map((i) => (
                            <svg key={i} width="48" height="48" viewBox="0 0 24 24" fill="#FDE047" stroke="#EAB308" strokeWidth="2" className="drop-shadow-[0_0_5px_rgba(253,224,71,0.8)] -ml-2 first:ml-0">
                                <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"></polygon>
                            </svg>
                        ))}
                    </div>
                    {children}
                </main>

                <footer className={styles.footer}>
                    <div className="container py-6">
                        <nav>
                            <ul className="flex justify-center gap-6 mb-4">
                                <li><Link href="/" className={styles.footerLink}>Home</Link></li>
                                <li><Link href="/about" className={styles.footerLink}>About</Link></li>
                                <li><Link href="/projects" className={styles.footerLink}>Projects</Link></li>
                                <li><Link href="/resume" className={styles.footerLink}>Resume</Link></li>
                                <li><Link href="/contact" className={styles.footerLink}>Contact</Link></li>
                            </ul>
                        </nav>
                        <p className={styles.footerText}>© {new Date().getFullYear()} Christian Mandujano Borjas</p>
                    </div>
                </footer>
            </body>
        </html>
    )
}