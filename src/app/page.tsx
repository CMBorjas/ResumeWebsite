import Image from 'next/image'
import Link from 'next/link'
import CyberButton from '@/components/CyberButton'
import CyberCard from '@/components/CyberCard'

export default function Home() {
  return (
    <main className="flex flex-col items-center min-h-screen p-4 md:p-24 relative overflow-hidden pt-32 md:pt-40 gap-12">

      {/* Glitch Overlay Effect */}
      {/* Background Decor */}

      <div className="z-10 max-w-5xl w-full items-center justify-between text-sm lg:flex">
        <div className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-800 bg-black/50 pb-6 pt-8 backdrop-blur-2xl lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-900/40 lg:p-4">
          <code className="font-mono font-bold text-cp-cyan">/// SYSTEM_READY</code>
        </div>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-black via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <span className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0 font-mono text-cp-red animate-pulse">
            NET_STATUS: ONLINE
          </span>
        </div>
      </div>

      <div className="relative flex flex-col place-items-center z-10">
        <h1 className="text-6xl md:text-8xl font-black text-center tracking-tighter relative cyber-glitch-effect mb-4">
          CHRISTIAN<br />
          <span className="text-cp-cyan">MANDUJANO</span>
        </h1>
        <p className="text-xl md:text-2xl text-cp-red font-mono tracking-[0.2em] mb-8">
          FULL_STACK_NETRUNNER
        </p>

        <div className="flex gap-6 mt-8">
          <Link href="/about">
            <CyberButton variant="primary">Initialize</CyberButton>
          </Link>
          <Link href="/projects">
            <CyberButton variant="outline">View Ops</CyberButton>
          </Link>
        </div>
      </div>

      <div className="mb-32 grid text-center lg:mb-0 grid-cols-4 gap-4 w-full max-w-5xl text-left">
        <CyberCard title="BIO_DATA" borderColor="yellow" className="h-full">
          <p className="text-sm opacity-80">
            Data verification and history logs.
            <br /><br />
            <Link href="/about" className="text-cp-cyan hover:underline">/// READ_LOGS</Link>
          </p>
        </CyberCard>

        <CyberCard title="SKILL_SET" borderColor="cyan" className="h-full">
          <p className="text-sm opacity-80">
            Available daemons and subroutines.
            <br /><br />
            <Link href="/skills" className="text-cp-yellow hover:underline">/// SCAN_WETWARE</Link>
          </p>
        </CyberCard>

        <CyberCard title="OPERATIONS" borderColor="red" className="h-full">
          <p className="text-sm opacity-80">
            Past mission reports and deployed code.
            <br /><br />
            <Link href="/projects" className="text-cp-red hover:underline">/// VIEW_OPS</Link>
          </p>
        </CyberCard>

        <CyberCard title="COMMS" borderColor="cyan" className="h-full">
          <p className="text-sm opacity-80">
            Secure frequency for contract offers.
            <br /><br />
            <Link href="/contact" className="text-white hover:underline">/// OPEN_CHANNEL</Link>
          </p>
        </CyberCard>
      </div>
    </main>
  )
}
