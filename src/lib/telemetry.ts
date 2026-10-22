/**
 * telemetry.ts — Client-side visitor telemetry and webhook notification engine.
 * 
 * Designed for static exports (GitHub Pages). Extracts visitor device, screen,
 * location, and referrer metadata, dispatching formatted webhooks (Discord embed or generic POST)
 * without requiring an active Node.js server.
 */

export interface VisitorMetadata {
  timestamp: string;
  localTime: string;
  path: string;
  referrer: string;
  deviceType: 'Mobile' | 'Tablet' | 'Desktop';
  os: string;
  browser: string;
  screenResolution: string;
  viewportSize: string;
  language: string;
  timeZone: string;
  ip?: string;
  city?: string;
  region?: string;
  country?: string;
  org?: string;
}

const SESSION_STORAGE_KEY = 'telemetry_visitor_notified';
export const LOCAL_STORAGE_WEBHOOK_KEY = 'visitor_webhook_url';
export const LOCAL_STORAGE_TELEMETRY_ENABLED_KEY = 'visitor_telemetry_enabled';

/**
 * Parses user agent string into human-readable Browser and OS info.
 */
function parseUserAgent(): { browser: string; os: string; deviceType: 'Mobile' | 'Tablet' | 'Desktop' } {
  if (typeof window === 'undefined' || !navigator) {
    return { browser: 'Unknown', os: 'Unknown', deviceType: 'Desktop' };
  }

  const ua = navigator.userAgent;
  let os = 'Unknown OS';
  let browser = 'Unknown Browser';
  let deviceType: 'Mobile' | 'Tablet' | 'Desktop' = 'Desktop';

  // Device type
  if (/iPad|Tablet/i.test(ua) || (navigator.maxTouchPoints > 1 && /Macintosh/i.test(ua))) {
    deviceType = 'Tablet';
  } else if (/Mobi|Android|iPhone|iPod/i.test(ua)) {
    deviceType = 'Mobile';
  }

  // OS detection
  if (/Windows NT 10.0/i.test(ua)) os = 'Windows 10/11';
  else if (/Windows NT/i.test(ua)) os = 'Windows';
  else if (/Mac OS X/i.test(ua)) os = 'macOS';
  else if (/Android/i.test(ua)) os = 'Android';
  else if (/iPhone|iPad|iPod/i.test(ua)) os = 'iOS';
  else if (/Linux/i.test(ua)) os = 'Linux';

  // Browser detection
  if (/Edg\//i.test(ua)) browser = 'Microsoft Edge';
  else if (/Chrome\//i.test(ua) && !/Chromium|Edg/i.test(ua)) browser = 'Google Chrome';
  else if (/Firefox\//i.test(ua)) browser = 'Mozilla Firefox';
  else if (/Safari\//i.test(ua) && !/Chrome/i.test(ua)) browser = 'Apple Safari';
  else if (/Opera|OPR\//i.test(ua)) browser = 'Opera';

  return { browser, os, deviceType };
}

/**
 * Attempts to retrieve approximate geo and IP information via lightweight client lookup.
 * Fails gracefully within 2.5s if blocked by adblockers, DNS filters, or offline state.
 */
async function fetchGeoLocation(): Promise<{ ip?: string; city?: string; region?: string; country?: string; org?: string }> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2500);

    const res = await fetch('https://ipapi.co/json/', {
      signal: controller.signal,
      headers: { Accept: 'application/json' },
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      return {
        ip: data.ip,
        city: data.city,
        region: data.region,
        country: data.country_name || data.country,
        org: data.org,
      };
    }
  } catch {
    // Graceful fallback: ad-blocker or rate limit encountered
  }

  return {};
}

/**
 * Collects comprehensive client-side visitor metadata.
 */
export async function collectVisitorMetadata(): Promise<VisitorMetadata> {
  const { browser, os, deviceType } = parseUserAgent();
  const geo = await fetchGeoLocation();

  const now = new Date();
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';

  return {
    timestamp: now.toISOString(),
    localTime: now.toLocaleString(),
    path: typeof window !== 'undefined' ? window.location.pathname : '/',
    referrer: typeof document !== 'undefined' && document.referrer ? document.referrer : 'Direct / Bookmark',
    deviceType,
    os,
    browser,
    screenResolution: typeof window !== 'undefined' ? `${window.screen.width}x${window.screen.height}` : 'Unknown',
    viewportSize: typeof window !== 'undefined' ? `${window.innerWidth}x${window.innerHeight}` : 'Unknown',
    language: typeof navigator !== 'undefined' ? navigator.language : 'Unknown',
    timeZone,
    ...geo,
  };
}

/**
 * Formats visitor metadata into a cyberpunk Discord webhook embed payload.
 */
function createDiscordPayload(meta: VisitorMetadata, isTest = false) {
  const locationString = meta.city && meta.country 
    ? `${meta.city}, ${meta.region ? meta.region + ', ' : ''}${meta.country} (${meta.ip || 'Masked'})`
    : meta.ip 
    ? `${meta.ip}` 
    : 'Unknown (Ad-Blocker / Shielded)';

  return {
    username: 'Nexus Telemetry Daemon',
    avatar_url: 'https://cmborjas.github.io/ResumeWebsite/favicon.ico',
    embeds: [
      {
        title: isTest ? '🧪 [TEST] Telemetry Daemon Handshake' : '🚨 [ALERT] Incoming Visitor Detected',
        description: isTest
          ? 'Manual telemetry ping triggered from the `/settings` diagnostics console.'
          : `A new session was initiated on the Cyberpunk Portfolio landing page.`,
        color: isTest ? 0xff007f : 0x00ffe1, // Brand Pink for test, Brand Cyan for live
        fields: [
          {
            name: '🌐 Location & Network',
            value: `\`${locationString}\`\n*ISP / Org:* ${meta.org || 'Unavailable'}`,
            inline: false,
          },
          {
            name: '🖥️ System & Client',
            value: `**OS:** ${meta.os}\n**Browser:** ${meta.browser}\n**Device:** ${meta.deviceType}`,
            inline: true,
          },
          {
            name: '📐 Display Specs',
            value: `**Screen:** \`${meta.screenResolution}\`\n**Viewport:** \`${meta.viewportSize}\``,
            inline: true,
          },
          {
            name: '🔗 Origin & Route',
            value: `**Path:** \`${meta.path}\`\n**Referrer:** ${meta.referrer}`,
            inline: false,
          },
          {
            name: '⏰ Temporal Coordinates',
            value: `**Visitor Time:** ${meta.localTime}\n**Timezone:** \`${meta.timeZone}\`\n**Language:** \`${meta.language}\``,
            inline: false,
          },
        ],
        footer: {
          text: 'Cyberpunk Portfolio — Static Telemetry Subsystem',
        },
        timestamp: meta.timestamp,
      },
    ],
  };
}

/**
 * Retrieves the currently active webhook URL from localStorage or environment variables.
 */
export function getActiveWebhookUrl(): string | null {
  if (typeof window !== 'undefined') {
    const localUrl = localStorage.getItem(LOCAL_STORAGE_WEBHOOK_KEY);
    if (localUrl && localUrl.trim().length > 0) return localUrl.trim();
  }

  if (process.env.NEXT_PUBLIC_VISITOR_WEBHOOK_URL) {
    return process.env.NEXT_PUBLIC_VISITOR_WEBHOOK_URL.trim();
  }

  return null;
}

/**
 * Dispatches visitor telemetry to the configured webhook endpoint.
 * Deduplicates per browser session unless `force` is set to true.
 */
export async function sendVisitorTelemetry(force = false): Promise<{ success: boolean; message: string }> {
  if (typeof window === 'undefined') {
    return { success: false, message: 'SSR environment - skipping' };
  }

  // Check if telemetry is explicitly disabled by the user
  const isEnabled = localStorage.getItem(LOCAL_STORAGE_TELEMETRY_ENABLED_KEY);
  if (isEnabled === 'false' && !force) {
    return { success: false, message: 'Telemetry is disabled in settings' };
  }

  // Check session deduplication
  if (!force && sessionStorage.getItem(SESSION_STORAGE_KEY)) {
    return { success: true, message: 'Already notified in this session' };
  }

  const webhookUrl = getActiveWebhookUrl();
  const metadata = await collectVisitorMetadata();

  // If no webhook URL is configured, output to console for developers
  if (!webhookUrl) {
    if (process.env.NODE_ENV === 'development') {
      console.info('[Telemetry] No webhook configured. Collected visitor metadata:', metadata);
    }
    return { success: false, message: 'No webhook URL configured' };
  }

  try {
    const isDiscord = webhookUrl.includes('discord.com/api/webhooks');
    const payload = isDiscord ? createDiscordPayload(metadata, force) : metadata;

    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      keepalive: true,
    });

    if (res.ok) {
      if (!force) {
        sessionStorage.setItem(SESSION_STORAGE_KEY, 'true');
      }
      return { success: true, message: 'Telemetry dispatched successfully' };
    } else {
      const errText = await res.text().catch(() => '');
      console.warn('[Telemetry] Webhook dispatch returned status:', res.status, errText);
      return { success: false, message: `Webhook error: HTTP ${res.status}` };
    }
  } catch (error) {
    console.error('[Telemetry] Failed to dispatch webhook:', error);
    return { success: false, message: error instanceof Error ? error.message : 'Unknown network failure' };
  }
}
