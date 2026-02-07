import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';

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
        <div className="min-h-screen bg-slate-950 text-slate-200 p-8">
            <header className="flex justify-between items-center mb-12 border-b border-slate-800 pb-4">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-brand-pink to-brand-cyan bg-clip-text text-transparent">
                        THE VAULT
                    </h1>
                    <p className="text-slate-500 font-mono text-sm">ANTARES-BOX NETWORK // SECURE ZONE</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 px-3 py-1 bg-green-950/30 border border-green-900 rounded-full">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-xs font-mono text-green-400">SYSTEM OPTIMAL</span>
                    </div>
                    {/* Logout is handled via server action in a client component usually, 
                but for simplicity we'll just link home or have a form button */}
                    <Link
                        href="/"
                        className="text-sm text-slate-400 hover:text-white transition-colors"
                    >
                        EXIT
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
                        className="block group relative bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-brand-cyan/50 transition-all duration-300 hover:bg-slate-900 hover:shadow-lg hover:shadow-brand-cyan/10"
                    >
                        <div className="absolute top-4 right-4 flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full ${service.status === 'online' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' :
                                    service.status === 'maintenance' ? 'bg-yellow-500' : 'bg-red-500'
                                }`} />
                        </div>

                        <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300 transform-origin-left">
                            {service.icon}
                        </div>

                        <h2 className="text-xl font-bold text-slate-100 mb-2 group-hover:text-brand-cyan transition-colors">
                            {service.name}
                        </h2>

                        <p className="text-sm text-slate-400 mb-4 h-10 line-clamp-2">
                            {service.description}
                        </p>

                        <div className="flex items-center text-xs font-mono text-slate-600 group-hover:text-brand-pink transition-colors mt-auto">
                            <span>ACCESS TERMINAL</span>
                            <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
}
