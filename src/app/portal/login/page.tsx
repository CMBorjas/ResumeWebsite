'use client'

import { useActionState } from 'react';
import { loginAction } from '@/app/actions/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

// QR Code for Demo (generated from lib/auth logic)
// otpauth://totp/Antares%20Box:admin@antares-box.com?secret=KVKFKTCPNZQXE2LJN54E6TRQJ5KFKTCP&issuer=Antares%20Box
const DEMO_QR = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAIlSURBVHhe7dzhTcQgEABhW6lAaZSWoQU4j/1xA+cxh2c34/2ZZ5LdTvLw25sEPhHqI0J9RKiPCfUxoT4i1EeE+ohQHxHqY0J9RKiPCfUxoT4i1EeE+ohQHxHqY0J9RKiPCfUxoT4i1EeE+ohQHxHqY0J9RKiPCfUxoT4i1EeE+ohQHxHqY0J9RKiPCfUxoT4i1EeE+ohQHxHqY0J9RKiPCfUxoT4i1EeE+ohQHxHqY0J9RKiPCfUxoT4i1EeE+ohQHxHqY0J9RKiPCfUxoT4i1EeE+ohQHxHqY0J9RKiPCfUxoT4i1EeE+ohQHxHqY0J9RKiPCfUxoT4i1EeE+ohQHxHqY0J9RKiPCfUxoT4i1EeE+ohQHxHqY0J9RKiPCfUxoT4i1EeE+ohQHxHqY0J9RKiPCfUxoT4i1EeE+ohQHxHqY0J9RKiPCfUxoT4i1EeE+ohQHxHqY0J9RKiPCfUxoT4i1EeE+ohQHxHqY0J9RKiPCfUxoT4i1EeE+ohQHxHqY0J9RKiPCfUxoT4i1EeE+ohQHxHqY0J9RKiPCfUxoT4i1EeE+ohQHxHqY0J9RKiPCfUxoT4i1EeE+ohQHxHqY0J9RKiPCfUxoT4i1EeE+ohQH2eE+vj9/QO1w05M+K1u9AAAAABJRU5ErkJggg==";

export default function LoginPage() {
    const [state, formAction, isPending] = useActionState(loginAction, null);
    const router = useRouter();

    useEffect(() => {
        if (state?.success) {
            router.push('/portal/vault');
        }
    }, [state, router]);

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute inset-0 z-0 opacity-20">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-brand-pink rounded-full blur-[100px]" />
                <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-brand-cyan rounded-full blur-[100px]" />
            </div>

            <div className="max-w-md w-full bg-slate-900/80 backdrop-blur-md border border-slate-700/50 rounded-2xl p-8 z-10 shadow-2xl shadow-brand-pink/10">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-brand-pink to-brand-cyan bg-clip-text text-transparent mb-2">
                        ANTARES GATE
                    </h1>
                    <p className="text-slate-400 text-sm">Secure Access Required</p>
                </div>

                <div className="mb-6 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                    <div className="flex justify-center bg-white p-2 rounded">
                        <img src={DEMO_QR} alt="2FA QR Code" className="w-32 h-32" />
                    </div>
                    <p className="text-[10px] text-slate-500 mt-2 text-center font-mono">Secret: KVKFKTCPNZQXE2LJN54E6TRQJ5KFKTCP</p>
                    <p className="text-[10px] text-slate-500 text-center font-mono mt-1">Pass: admin123</p>
                </div>

                <form action={formAction} className="space-y-4">
                    <div>
                        <label className="block text-xs font-mono text-brand-cyan mb-1">PASSWORD</label>
                        <input
                            name="password"
                            type="password"
                            required
                            className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-slate-100 focus:border-brand-pink focus:outline-none transition-colors"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-mono text-brand-cyan mb-1">TOTP TOKEN</label>
                        <input
                            name="token"
                            type="text"
                            pattern="[0-9]*"
                            inputMode="numeric"
                            maxLength={6}
                            required
                            className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-slate-100 font-mono tracking-widest text-center focus:border-brand-pink focus:outline-none transition-colors"
                            placeholder="000000"
                        />
                    </div>

                    {state?.error && (
                        <div className="text-red-500 text-xs text-center font-bold bg-red-950/20 p-2 rounded border border-red-900/50">
                            ⚠️ {state.error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isPending}
                        className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold py-3 rounded border border-slate-600 transition-all hover:border-brand-cyan disabled:opacity-50 disabled:cursor-not-allowed group"
                    >
                        {isPending ? 'VERIFYING...' : 'AUTHENTICATE'}
                    </button>
                </form>
            </div>
        </div>
    );
}
