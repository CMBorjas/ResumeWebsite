import './styles/globals.css'
import Link from 'next/link'

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
        <body className="body-bg bg-slate-900 text-slate-100 antialiased">
        <header className="bg-slate-900 text-white">
                <div className="container flex flex-col md:flex-row items-center justify-between gap-2">
                    <div>
                    <h1 className="text-3xl font-extrabold text-brand-pink">Christian Mandujano Borjas</h1>
                    <p className="text-sm text-brand-cyan">720-314-8517 • <a className="underline" href="mailto:Christian.MandujanoBorjas@ucdenver.edu">Christian.MandujanoBorjas@ucdenver.edu</a></p>
                    </div>

                    <nav>
                    <ul className="flex gap-4">
                        <li><Link href="/">Home</Link></li>
                        <li><Link href="/about">About</Link></li>
                        <li><Link href="/projects">Projects</Link></li>
                        <li><Link href="/resume">Resume</Link></li>
                        <li><Link href="/contact">Contact</Link></li>
                    </ul>
                    </nav>
                </div>
                </header>



        <main className="max-w-4xl mx-auto px-4 py-8">{children}</main>

                <footer className="bg-slate-900 text-slate-300 mt-12">
                <div className="container py-6 text-center">
                    © {new Date().getFullYear()} Christian Mandujano Borjas — Built with Next.js
                </div>
                </footer>
            </body>
        </html>
    )
}