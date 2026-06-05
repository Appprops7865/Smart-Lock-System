export type LockLocation = "windows" | "front-door" | "back-door" | "house-gate";

interface SmartLockHomeProps {
  username: string;
  lockStates: Record<LockLocation, boolean>;
  onSelectOption: (location: LockLocation) => void;
  onLockAll: (isLocked: boolean) => void;
  onLockChange: (location: LockLocation, isLocked: boolean) => void;
}

export function SmartLockHome({ username, lockStates, onSelectOption, onLockAll, onLockChange }: SmartLockHomeProps) {
  const options: { id: LockLocation; label: string; icon: string }[] = [
    { id: "front-door", label: "Front Door", icon: "🚪" },
    { id: "back-door", label: "Back Door", icon: "🚪" },
    { id: "windows", label: "All Windows", icon: "🪟" },
    { id: "house-gate", label: "Main Gate", icon: "栅" },
  ];

  const allLocked = Object.values(lockStates).every(Boolean);

  return (
    <div className="min-h-screen bg-slate-50 p-6 dark:bg-slate-900 transition-colors text-slate-800 dark:text-slate-100">
      <div className="max-w-xl mx-auto space-y-6">
        <header className="flex justify-between items-center py-4">
          <div>
            <h1 className="text-2xl font-bold">Hello, {username}!</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">Welcome back to your smart home</p>
          </div>
        </header>

        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white shadow-xl">
          <h2 className="text-lg font-semibold mb-1">Master Lock Control</h2>
          <p className="text-xs text-blue-100 mb-4">Secure or unlock your entire house with one single tap</p>
          <button
            onClick={() => onLockAll(!allLocked)}
            className={`w-full py-3 font-semibold rounded-xl text-sm transition-all ${
              allLocked 
                ? "bg-emerald-500 hover:bg-emerald-600 text-white" 
                : "bg-white hover:bg-slate-100 text-blue-600"
            }`}
          >
            {allLocked ? "🔓 Unlock Entire House" : "🔒 Lock Entire House"}
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {options.map((item) => {
            const isLocked = lockStates[item.id];
            return (
              <div 
                key={item.id} 
                className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-100 dark:border-slate-700/60 shadow-sm flex flex-col justify-between h-40"
              >
                <div className="flex justify-between items-start">
                  <span className="text-2xl">{item.icon}</span>
                  <button 
                    onClick={() => onLockChange(item.id, !isLocked)}
                    className={`text-xs px-2.5 py-1 rounded-full font-semibold border ${
                      isLocked 
                        ? "bg-red-50 text-red-600 border-red-200 dark:bg-red-950/20 dark:text-red-400 dark:border-red-900/50" 
                        : "bg-green-50 text-green-600 border-green-200 dark:bg-green-950/20 dark:text-green-400 dark:border-green-900/50"
                    }`}
                  >
                    {isLocked ? "Locked" : "Open"}
                  </button>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 dark:text-slate-200 text-sm">{item.label}</h3>
                  <button 
                    onClick={() => onSelectOption(item.id)}
                    className="text-xs text-blue-600 dark:text-blue-400 font-medium mt-1 flex items-center hover:underline"
                  >
                    Manage Settings →
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
