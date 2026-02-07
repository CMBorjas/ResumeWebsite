import { statfs } from 'node:fs/promises';
import SecretTrigger from './SecretTrigger';

interface StorageData {
  total: number;
  used: number;
  free: number;
  path: string;
  isAvailable: boolean;
}

async function getStorageStats(path: string): Promise<StorageData> {
  try {
    const stats = await statfs(path);
    const total = stats.bsize * stats.blocks;
    const free = stats.bsize * stats.bfree;
    const used = total - free;

    return {
      total,
      used,
      free,
      path,
      isAvailable: true
    };
  } catch (error) {
    console.error(`Failed to read storage stats for ${path}:`, error);
    return {
      total: 0,
      used: 0,
      free: 0,
      path,
      isAvailable: false
    };
  }
}

function formatBytes(bytes: number, decimals = 2) {
  if (!+bytes) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export default async function StorageStats() {
  const STORAGE_PATH = process.env.STORAGE_PATH || '/media_data';
  const stats = await getStorageStats(STORAGE_PATH);

  if (!stats.isAvailable) {
    return null; // Or render a placeholder if you prefer
  }

  const usedPercentage = Math.round((stats.used / stats.total) * 100);

  return (
    <div className="mt-8 bg-slate-900/50 rounded-xl p-6 border border-slate-700/50 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-brand-pink flex items-center gap-2">
          <SecretTrigger>
            <span className="text-2xl">💾</span> Argon EON Storage
          </SecretTrigger>
        </h3>
        <span className="text-xs font-mono text-slate-400 bg-slate-800 px-2 py-1 rounded">
          Mounted: {STORAGE_PATH}
        </span>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-1 text-slate-300">
            <span>Used Space</span>
            <span className="font-mono">{usedPercentage}%</span>
          </div>
          <div className="h-4 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-brand-pink to-purple-600 transition-all duration-1000 ease-out"
              style={{ width: `${usedPercentage}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="p-3 bg-slate-800/50 rounded-lg">
            <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">Total</div>
            <div className="font-mono text-lg font-bold text-slate-200">{formatBytes(stats.total)}</div>
          </div>
          <div className="p-3 bg-slate-800/50 rounded-lg">
            <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">Used</div>
            <div className="font-mono text-lg font-bold text-purple-400">{formatBytes(stats.used)}</div>
          </div>
          <div className="p-3 bg-slate-800/50 rounded-lg">
            <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">Free</div>
            <div className="font-mono text-lg font-bold text-green-400">{formatBytes(stats.free)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
