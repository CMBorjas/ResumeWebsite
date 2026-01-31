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
            </head>
            <body className="body-bg bg-slate-900 text-slate-100 antialiased min-h-screen flex flex-col">
                <header className="header-bg text-white">
                    <div className="container flex flex-col md:flex-row items-center justify-between gap-2">
                        <div>
                            <h1 className="text-3xl font-extrabold site-name">Christian Mandujano Borjas</h1>
                            <p className="text-sm text-brand-cyan text-center">
                                <a
                                    href="mailto:Christian.MandujanoBorjas@ucdenver.edu"
                                    className="text-slate-900 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400"
                                >
                                    Christian.MandujanoBorjas@ucdenver.edu
                                </a>
                            </p>
                        </div>
                    </div>
                </header>

                <main className="flex-1 w-full px-4 py-8">{children}</main>

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