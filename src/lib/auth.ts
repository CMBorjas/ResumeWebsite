import { authenticator } from 'otplib';
import QRCode from 'qrcode';

// In a real app, these would be in a database
// For this demo/portfolio, we use environment variables or hardcoded fallbacks
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
// Fixed secret for demo purposes so it persists across server restarts
// In production, this is generated per user and stored in DB
const TOTP_SECRET = process.env.TOTP_SECRET || 'KVKFKTCPNZQXE2LJN54E6TRQJ5KFKTCP';

export interface AuthState {
    isAuthenticated: boolean;
    is2FASetup: boolean;
    qrCodeUrl?: string; // Data URL for QR code
}

export async function generate2FA() {
    const user = 'admin@antares-box.com';
    const service = 'Antares Box';
    const otpauth = authenticator.keyuri(user, service, TOTP_SECRET);
    const imageUrl = await QRCode.toDataURL(otpauth);

    return {
        secret: TOTP_SECRET,
        imageUrl
    };
}

export async function verifyLogin(password: string, token: string): Promise<boolean> {
    const isPasswordValid = password === ADMIN_PASSWORD;

    if (!isPasswordValid) return false;

    // Verify TOTP
    try {
        return authenticator.check(token, TOTP_SECRET);
    } catch (err) {
        console.error('TOTP Verification failed:', err);
        return false;
    }
}

export function isAuthenticated(cookieStore: any): boolean {
    // This is a simplified check. In a real app we'd verify a signed JWT/Session
    return cookieStore.get('auth_session')?.value === 'valid';
}
