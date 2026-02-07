'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SecretTrigger({ children }: { children: React.ReactNode }) {
    const [clicks, setClicks] = useState(0);
    const router = useRouter();

    const handleClick = () => {
        const newClicks = clicks + 1;
        setClicks(newClicks);

        if (newClicks >= 5) {
            router.push('/portal/login');
            setClicks(0);
        }
    };

    return (
        <div onClick={handleClick} className="cursor-pointer select-none">
            {children}
        </div>
    );
}
