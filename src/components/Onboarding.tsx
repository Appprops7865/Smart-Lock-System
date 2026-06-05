import { useState } from "react";

interface OnboardingProps {
  onComplete: (username: string, theme: "light" | "dark") => void;
}

export function Onboarding({ onComplete }: OnboardingProps) {
  const [username, setUsername] = useState("");
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;
    onComplete(username.trim(), theme);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4 dark:bg-slate-900 transition-colors">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
        <h1 className="mb-2 text-2xl font-bold text-slate-800 dark:text-white text-center"> Welcome to SmartLock</h1>
        <p className="mb-6 text-sm text-slate-500 dark:text-slate-400 text-center">Set up your smart home dashboard profile</p>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Your Name</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. John Doe"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:focus:border-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Preferred Theme</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setTheme("light")}
                className={`rounded-xl py-3 text-sm font-medium border transition-all ${
                  theme === "light"
                    ? "border-blue-500 bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400"
                    : "border-slate-200 bg-white text-slate-600 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-300"
                }`}
              >
                ☀️ Light Mode
              </button>
              <button
                type="button"
                onClick={() => setTheme("dark")}
                className={`rounded-xl py-3 text-sm font-medium border transition-all ${
                  theme === "dark"
                    ? "border-blue-500 bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400"
                    : "border-slate-200 bg-white text-slate-600 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-300"
                }`}
              >
                🌙 Dark Mode
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white shadow-lg shadow-blue-500/20 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors"
          >
            Get Started
          </button>
        </form>
      </div>
    </div>
  );
}
