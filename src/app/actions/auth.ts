'use server'

import { cookies } from 'next/headers';
import { authenticator } from 'otplib';

// Hardcoded for demo - in prod use env vars
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
const TOTP_SECRET = process.env.TOTP_SECRET || 'KVKFKTCPNZQXE2LJN54E6TRQJ5KFKTCP';

export async function loginAction(prevState: any, formData: FormData) {
    const password = formData.get('password') as string;
    const token = formData.get('token') as string;

    if (password !== ADMIN_PASSWORD) {
        return { error: 'Invalid Password' };
    }

    try {
        const isValid = authenticator.check(token, TOTP_SECRET);
        if (!isValid) {
            return { error: 'Invalid 2FA Token' };
        }

        // Set simple auth cookie
        const cookieStore = await cookies();
        cookieStore.set('auth_session', 'valid', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            path: '/'
        });

        return { success: true };
    } catch (err) {
        return { error: 'Verification Failed' };
    }
}

export async function logoutAction() {
    const cookieStore = await cookies();
    cookieStore.delete('auth_session');
}
