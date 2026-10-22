'use client';

import { useEffect, useRef } from 'react';
import { sendVisitorTelemetry } from '../lib/telemetry';

/**
 * useVisitorTelemetry hook
 * 
 * Silently dispatches a visitor notification webhook when the user mounts the landing page.
 * Utilizes sessionStorage deduplication under the hood so multiple route changes
 * within the same tab do not trigger repetitive notifications.
 */
export function useVisitorTelemetry() {
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    if (hasTriggeredRef.current) return;
    hasTriggeredRef.current = true;

    // Small delay to allow initial DOM hydration and layout stabilization
    const timer = setTimeout(() => {
      sendVisitorTelemetry(false).catch((err) => {
        if (process.env.NODE_ENV === 'development') {
          console.debug('[useVisitorTelemetry] Dispatch caught error:', err);
        }
      });
    }, 1200);

    return () => clearTimeout(timer);
  }, []);
}
