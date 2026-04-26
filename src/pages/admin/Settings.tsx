import { useState } from 'react';
import { Save, AlertTriangle, Eye, Bell } from 'lucide-react';
import { toast } from '@/components/ui/Toast';

const STORAGE_KEY = 'nw_admin_settings';

interface AdminSettings {
  compactMode: boolean;
  lowStockThreshold: number;
  showLowStockWarning: boolean;
  defaultOrdersPerPage: number;
}

function loadSettings(): AdminSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...defaultSettings(), ...JSON.parse(raw) };
  } catch { /* ignore */ }
  return defaultSettings();
}

function defaultSettings(): AdminSettings {
  return {
    compactMode: false,
    lowStockThreshold: 5,
    showLowStockWarning: true,
    defaultOrdersPerPage: 20,
  };
}

export default function Settings() {
  const [settings, setSettings] = useState<AdminSettings>(loadSettings);
  const [saved, setSaved] = useState(false);

  const update = <K extends keyof AdminSettings>(key: K, value: AdminSettings[K]) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  const handleSave = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    setSaved(true);
    toast.success('Settings saved');
  };

  const handleClearData = () => {
    if (!confirm('Clear all admin settings? This cannot be undone.')) return;
    localStorage.removeItem(STORAGE_KEY);
    setSettings(defaultSettings());
    toast.success('Settings cleared');
  };

  return (
    <div className="p-6 max-w-2xl space-y-8">
      <h1 className="font-display font-light text-[#1A1714] uppercase text-3xl tracking-[0.15em] border-l-2 border-[#8B7355] pl-4">
        SETTINGS
      </h1>

      {/* Display */}
      <section className="bg-white border border-[#E8E2D9] rounded-xl">
        <div className="px-6 py-4 border-b border-[#E8E2D9] flex items-center gap-2">
          <Eye size={14} className="text-[#8B7355]" />
          <h2 className="font-display font-bold text-[#1A1714] uppercase tracking-[0.15em] text-sm">Display</h2>
        </div>
        <div className="p-6 space-y-5">
          <label className="flex items-center justify-between cursor-pointer">
            <div>
              <p className="font-sans text-sm text-[#1A1714]">Compact Mode</p>
              <p className="font-sans text-xs text-[#6B6459] mt-0.5">Reduce padding and table row heights</p>
            </div>
            <button
              role="switch"
              aria-checked={settings.compactMode}
              onClick={() => update('compactMode', !settings.compactMode)}
              className={`w-10 h-5 rounded-full transition-colors relative ${settings.compactMode ? 'bg-[#1A1714]' : 'bg-[#333]'}`}
            >
              <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform ${settings.compactMode ? 'translate-x-5' : 'translate-x-0.5'}`} />
            </button>
          </label>
          <div>
            <label className="font-sans text-xs text-[#6B6459] uppercase tracking-[0.15em] block mb-2">
              Default Orders Per Page
            </label>
            <select
              value={settings.defaultOrdersPerPage}
              onChange={(e) => update('defaultOrdersPerPage', Number(e.target.value))}
              className="bg-white border border-[#E8E2D9] px-3 py-2 font-sans text-sm text-[#1A1714] focus:border-[#8B7355] focus:outline-none"
            >
              {[10, 20, 50, 100].map((n) => (
                <option key={n} value={n}>{n} per page</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Alerts */}
      <section className="bg-white border border-[#E8E2D9] rounded-xl">
        <div className="px-6 py-4 border-b border-[#E8E2D9] flex items-center gap-2">
          <Bell size={14} className="text-[#8B7355]" />
          <h2 className="font-display font-bold text-[#1A1714] uppercase tracking-[0.15em] text-sm">Alerts</h2>
        </div>
        <div className="p-6 space-y-5">
          <label className="flex items-center justify-between cursor-pointer">
            <div>
              <p className="font-sans text-sm text-[#1A1714]">Low Stock Warnings</p>
              <p className="font-sans text-xs text-[#6B6459] mt-0.5">Show warning badge when stock is below threshold</p>
            </div>
            <button
              role="switch"
              aria-checked={settings.showLowStockWarning}
              onClick={() => update('showLowStockWarning', !settings.showLowStockWarning)}
              className={`w-10 h-5 rounded-full transition-colors relative ${settings.showLowStockWarning ? 'bg-[#1A1714]' : 'bg-[#333]'}`}
            >
              <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform ${settings.showLowStockWarning ? 'translate-x-5' : 'translate-x-0.5'}`} />
            </button>
          </label>
          <div>
            <label className="font-sans text-xs text-[#6B6459] uppercase tracking-[0.15em] block mb-2">
              Low Stock Threshold
            </label>
            <input
              type="number"
              min={1}
              max={100}
              value={settings.lowStockThreshold}
              onChange={(e) => update('lowStockThreshold', Number(e.target.value))}
              className="bg-white border border-[#E8E2D9] px-3 py-2 font-sans text-sm text-[#1A1714] focus:border-[#8B7355] focus:outline-none w-24"
            />
          </div>
        </div>
      </section>

      {/* Save */}
      <div className="flex gap-3">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 font-sans text-xs text-white bg-[#1A1714] px-6 py-2.5 hover:bg-[#2D2926] transition-colors"
        >
          <Save size={12} />
          {saved ? 'SAVED ✓' : 'SAVE SETTINGS'}
        </button>
      </div>

      {/* Danger Zone */}
      <section className="bg-white border border-[#8B7355]/30">
        <div className="px-6 py-4 border-b border-[#8B7355]/30 flex items-center gap-2">
          <AlertTriangle size={14} className="text-[#8B7355]" />
          <h2 className="font-display font-bold text-[#8B7355] uppercase tracking-[0.15em] text-sm">Danger Zone</h2>
        </div>
        <div className="p-6">
          <p className="font-sans text-xs text-[#6B6459] mb-4">
            Reset all admin settings to defaults. Your data in the database will not be affected.
          </p>
          <button
            onClick={handleClearData}
            className="font-sans text-xs text-[#8B7355] border border-[#8B7355]/50 px-4 py-2 hover:bg-[#1A1714] hover:text-black transition-colors"
          >
            CLEAR SETTINGS
          </button>
        </div>
      </section>
    </div>
  );
}

