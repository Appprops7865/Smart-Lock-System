import { useState, useEffect } from "react";
// @ts-ignore
import { supabase } from "./supabaseClient.js"; // 💡 Linked to your database settings
import { SmartLockHome } from "./components/SmartLockHome";
import { LockControl } from "./components/LockControl";
import { Onboarding } from "./components/Onboarding";

export type LockLocation = "windows" | "front-door" | "back-door" | "house-gate";
export type LockStates = Record<LockLocation, boolean>;

interface UserData {
  username: string;
  theme: "light" | "dark";
}

export default function App() {
  const [user, setUser] = useState<UserData | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<LockLocation | null>(null);
  const [lockStates, setLockStates] = useState<LockStates>({
    windows: true,
    "front-door": true,
    "back-door": true,
    "house-gate": true,
  });

  useEffect(() => {
    const savedUser = localStorage.getItem("smartlock_user");
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      document.documentElement.classList.toggle("dark", userData.theme === "dark");
    }

    // Pull live lock data from your online Supabase database
    const fetchCloudLocks = async () => {
      const { data, error } = await supabase
        .from("lock_states")
        .select("windows, front_door, back_door, house_gate")
        .eq("id", 1)
        .single();

      if (data && !error) {
        setLockStates({
          windows: data.windows,
          "front-door": data.front_door,
          "back-door": data.back_door,
          "house-gate": data.house_gate,
        });
      }
    };

    fetchCloudLocks();
  }, []);

  const handleOnboardingComplete = (username: string, theme: "light" | "dark") => {
    const userData = { username, theme };
    setUser(userData);
    localStorage.setItem("smartlock_user", JSON.stringify(userData));
    document.documentElement.classList.toggle("dark", theme === "dark");
  };

  const handleLockChange = async (location: LockLocation, isLocked: boolean) => {
    setLockStates((prev) => ({ ...prev, [location]: isLocked }));
    const dbColumn = location.replace("-", "_");

    // Tell Supabase online to update this lock
    await supabase
      .from("lock_states")
      .update({ [dbColumn]: isLocked })
      .eq("id", 1);
  };

  const handleLockAll = async (isLocked: boolean) => {
    setLockStates({
      windows: isLocked,
      "front-door": isLocked,
      "back-door": isLocked,
      "house-gate": isLocked,
    });

    // Tell Supabase online to update all locks
    await supabase
      .from("lock_states")
      .update({
        windows: isLocked,
        front_door: isLocked,
        back_door: isLocked,
        house_gate: isLocked,
      })
      .eq("id", 1);
  };

  if (!user) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  return (
    <div className="size-full bg-slate-50 dark:bg-slate-900 transition-colors duration-200">
      {selectedLocation ? (
        <LockControl
          location={selectedLocation}
          isLocked={lockStates[selectedLocation]}
          onLockChange={(isLocked) => handleLockChange(selectedLocation, isLocked)}
          onBack={() => setSelectedLocation(null)}
        />
      ) : (
        <SmartLockHome
          username={user.username}
          onSelectOption={setSelectedLocation}
          lockStates={lockStates}
          onLockAll={handleLockAll}
          onLockChange={handleLockChange}
        />
      )}
    </div>
  );
}
