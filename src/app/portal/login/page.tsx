'use client'

import { useActionState, useState, useEffect } from 'react';
import { loginAction } from '@/app/actions/auth';
import { useRouter } from 'next/navigation';
import CyberButton from '@/components/CyberButton';
import CyberCard from '@/components/CyberCard';
import QRCode from 'qrcode';

export default function LoginPage() {
    const [state, formAction, isPending] = useActionState(loginAction, null);
    const router = useRouter();
    const [qrCodeUrl, setQrCodeUrl] = useState<string>('');

    useEffect(() => {
        if (state?.success) {
            router.push('/portal/vault');
        }
    }, [state, router]);

    useEffect(() => {
        const generateQR = async () => {
            try {
                const secret = 'KVKFKTCPNZQXE2LJN54E6TRQJ5KFKTCP';
                const otpAuthUrl = `otpauth://totp/Antares%20Box:admin@antares-box.com?secret=${secret}&issuer=Antares%20Box`;
                const url = await QRCode.toDataURL(otpAuthUrl);
                setQrCodeUrl(url);
            } catch (err) {
                console.error('Failed to generate QR code', err);
            }
        };
        generateQR();
    }, []);

    return (
        <div className="min-h-screen bg-cp-black flex flex-col items-center justify-center p-4 relative overflow-hidden text-cp-yellow">
            {/* Background Decor */}
            <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cp-yellow rounded-full blur-[150px]" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cp-cyan rounded-full blur-[150px]" />
            </div>

            <CyberCard borderColor="yellow" className="max-w-md w-full z-10" title="ARASAKA_AUTH_PROTOCOL">

                <div className="mb-6 p-4 bg-black/50 border border-cp-yellow/20">
                    <div className="flex justify-center bg-white p-2 mb-4 min-h-[148px]">
                        {qrCodeUrl ? (
                            <img src={qrCodeUrl} alt="2FA QR Code" className="w-32 h-32" />
                        ) : (
                            <div className="w-32 h-32 flex items-center justify-center text-black font-mono text-xs animate-pulse">
                                GENERATING_KEY...
                            </div>
                        )}
                    </div>
                    <p className="text-[10px] text-cp-cyan mt-2 text-center font-mono">/// SECRET: KVKFKTCPNZQXE2LJN54E6TRQJ5KFKTCP</p>
                    <p className="text-[10px] text-cp-cyan text-center font-mono mt-1">/// CREDENTIAL: admin123</p>
                </div>

                <form action={formAction} className="space-y-6">
                    <div className="group">
                        <label className="block text-xs font-mono text-cp-cyan mb-1 group-focus-within:text-cp-yellow transition-colors">PASSWORD</label>
                        <input
                            name="password"
                            type="password"
                            required
                            className="w-full bg-cp-dark border-b-2 border-cp-gray focus:border-cp-yellow focus:outline-none p-3 text-white font-mono transition-colors"
                        />
                    </div>

                    <div className="group">
                        <label className="block text-xs font-mono text-cp-cyan mb-1 group-focus-within:text-cp-yellow transition-colors">TOTP TOKEN</label>
                        <input
                            name="token"
                            type="text"
                            pattern="[0-9]*"
                            inputMode="numeric"
                            maxLength={6}
                            required
                            className="w-full bg-cp-dark border-b-2 border-cp-gray focus:border-cp-yellow focus:outline-none p-3 text-white font-mono tracking-[0.5em] text-center text-xl transition-colors placeholder:text-gray-700"
                            placeholder="000000"
                        />
                    </div>

                    {state?.error && (
                        <div className="text-cp-red text-xs text-center font-bold bg-cp-red/10 p-2 border-l-4 border-cp-red animate-pulse">
                            ⚠️ ACCESS DENIED: {state.error}
                        </div>
                    )}

                    <CyberButton
                        type="submit"
                        disabled={isPending}
                        variant="glitch"
                        className="w-full"
                    >
                        {isPending ? 'NEGOTIATING...' : 'JACK IN'}
                    </CyberButton>
                </form>
            </CyberCard>
        </div>
    );
}
