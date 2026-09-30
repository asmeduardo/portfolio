"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ModeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label="Alternar tema claro e escuro"
    >
      <Sun aria-hidden="true" className="sun-icon" size={18} />
      <Moon aria-hidden="true" className="moon-icon" size={18} />
    </button>
  );
}
