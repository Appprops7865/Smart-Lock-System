import { LockLocation } from "./SmartLockHome";

interface LockControlProps {
  location: LockLocation;
  isLocked: boolean;
  onLockChange: (isLocked: boolean) => void;
  onBack: () => void;
}

export function LockControl({ location, isLocked, onLockChange, onBack }: LockControlProps) {
  const cleanName = location.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-6 flex flex-col justify-between transition-colors text-slate-800 dark:text-slate-100">
      <div className="max-w-md w-full mx-auto flex-1 flex flex-col justify-between py-4">
        <header className="flex items-center space-x-4">
          <button onClick={onBack} className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm text-sm">
            ← Back
          </button>
          <h1 className="text-xl font-bold">{cleanName} Status</h1>
        </header>

        <div className="flex flex-col items-center justify-center my-auto space-y-6">
          <div className={`w-40 h-40 rounded-full flex items-center justify-center text-5xl shadow-2xl transition-all border-4 ${
            isLocked 
              ? "bg-red-500 border-red-400 text-white shadow-red-500/20" 
              : "bg-emerald-500 border-emerald-400 text-white shadow-emerald-500/20"
          }`}>
            {isLocked ? "🔒" : "🔓"}
          </div>
          
          <div className="text-center">
            <h2 className="text-2xl font-bold">{isLocked ? "Securely Locked" : "Currently Unlocked"}</h2>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Last activity tracked live via cloud server</p>
          </div>
        </div>

        <button
          onClick={() => onLockChange(!isLocked)}
          className={`w-full py-4 rounded-2xl font-bold text-white shadow-lg transition-all ${
            isLocked 
              ? "bg-emerald-600 shadow-emerald-500/10 hover:bg-emerald-700" 
              : "bg-red-600 shadow-red-500/10 hover:bg-red-700"
          }`}
        >
          {isLocked ? "Tap to Open Security Lock" : "Tap to Secure Security Lock"}
        </button>
      </div>
    </div>
  );
}
