import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import CyberCard from '@/components/CyberCard';
import CyberButton from '@/components/CyberButton';

interface AppService {
    name: string;
    icon: string;
    url: string; // The real internal/external URL
    description: string;
    status: 'online' | 'offline' | 'maintenance';
}

// Mock Data for the Vault
const SERVICES: AppService[] = [
    {
        name: "Plex Media Server",
        icon: "🎬",
        url: "https://plex.antares-box.com",
        description: "Personal Media Streaming",
        status: "online"
    },
    {
        name: "Sonarr",
        icon: "📺",
        url: "https://sonarr.antares-box.com",
        description: "TV Series Management",
        status: "online"
    },
    {
        name: "Radarr",
        icon: "🎥",
        url: "https://radarr.antares-box.com",
        description: "Movie Collection Manager",
        status: "online"
    },
    {
        name: "Home Assistant",
        icon: "🏠",
        url: "https://hass.antares-box.com",
        description: "Home Automation Hub",
        status: "online"
    },
    {
        name: "Portainer",
        icon: "🐳",
        url: "https://portainer.antares-box.com",
        description: "Docker Container Management",
        status: "maintenance"
    },
    {
        name: "Grafana",
        icon: "📊",
        url: "https://grafana.antares-box.com",
        description: "System Monitoring",
        status: "online"
    }
];

export default async function VaultPage() {
    const cookieStore = await cookies();
    const session = cookieStore.get('auth_session');

    if (session?.value !== 'valid') {
        redirect('/portal/login');
    }

    return (
        <div className="min-h-screen bg-cp-black text-cp-yellow p-4 md:p-8">
            <header className="flex flex-col md:flex-row justify-between items-center mb-12 border-b border-cp-gray pb-4 gap-4">
                <div>
                    <h1 className="text-4xl font-black cyber-glitch-effect text-cp-yellow">
                        VAULT_ACCESS
                    </h1>
                    <p className="text-cp-cyan font-mono text-sm tracking-widest">/// ANTARES-BOX NETWORK</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 px-3 py-1 bg-green-950/30 border border-green-900 clip-corner-br">
                        <div className="w-2 h-2 bg-green-500 animate-pulse" />
                        <span className="text-xs font-mono text-green-400">SYS_OPTIMAL</span>
                    </div>
                    <Link href="/">
                        <CyberButton variant="outline" className="px-4 py-2 text-xs">LOGOUT</CyberButton>
                    </Link>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                {SERVICES.map((service) => (
                    <a
                        key={service.name}
                        href={service.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block"
                    >
                        <CyberCard borderColor={service.status === 'maintenance' ? 'yellow' : 'cyan'} className="h-full hover:bg-cp-dark/100 transition-colors duration-300">
                            <div className="absolute top-4 right-4 flex items-center gap-2">
                                <span className={`w-2 h-2 ${service.status === 'online' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' :
                                        service.status === 'maintenance' ? 'bg-cp-yellow' : 'bg-cp-red'
                                    }`} />
                            </div>

                            <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300 transform-origin-left text-cp-yellow group-hover:text-cp-cyan">
                                {service.icon}
                            </div>

                            <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-cp-yellow transition-colors font-mono">
                                {service.name}
                            </h2>

                            <p className="text-sm text-gray-400 mb-6 h-10 line-clamp-2 font-mono">
                                {service.description}
                            </p>

                            <div className="flex items-center text-xs font-mono text-cp-cyan group-hover:text-cp-pink transition-colors mt-auto border-t border-gray-800 pt-4">
                                <span>/// ACCESS_TERMINAL</span>
                                <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </div>
                        </CyberCard>
                    </a>
                ))}
            </div>
        </div>
    );
}
