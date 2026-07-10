import ServerStats from '../../../components/ServerStats'
import { Server } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'Nexus Core | Server Telemetry',
  description: 'Cyberpunk server performance statistics dashboard.',
}

export default function ServerStatsPage() {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 md:px-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <Link 
          href="/projects" 
          className="text-[var(--color-primary)] hover:text-[var(--color-secondary)] transition-colors text-sm font-mono flex items-center gap-2 w-fit mb-4"
        >
          &lt; RETURN_TO_PROJECTS
        </Link>
        <h1 className="text-4xl md:text-5xl font-bold text-white uppercase tracking-widest flex items-center gap-4">
          <Server className="w-10 h-10 text-[var(--color-primary)] drop-shadow-[0_0_10px_var(--color-primary)]" />
          Nexus_Core
        </h1>
        <p className="text-gray-400 mt-2 font-mono max-w-2xl">
          Real-time server telemetry and hardware performance metrics. Active monitoring of processing load, memory allocation, and network I/O.
        </p>
      </div>

      <div className="w-full">
        <ServerStats />
      </div>
    </div>
  )
}
