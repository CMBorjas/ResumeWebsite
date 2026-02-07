import '../styles/globals.css'
import { ReactNode } from 'react'

export const metadata = {
    title: 'Christian Mandujano Borjas | Cyberpunk Portfolio',
    description: 'Full Stack Engineer & Cold Storage Architect',
}

export default function RootLayout({
    children,
}: {
    children: ReactNode
}) {
    return (
        <html lang="en">
            <body className="bg-cp-black text-cp-yellow min-h-screen selection:bg-cp-cyan selection:text-black">
                <div className="relative z-10">
                    {children}
                </div>
            </body>
        </html>
    )
}