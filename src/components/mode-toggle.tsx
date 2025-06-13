import { MoonIcon, SunIcon } from "@heroicons/react/16/solid";
import * as React from "react";

import { useEffect } from "react";

export function ModeToggle() {
  const [theme, setThemeState] = React.useState<
    "theme-light" | "dark" | "system"
  >("theme-light");

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark");
    setThemeState(isDarkMode ? "dark" : "theme-light");
  }, []);

  useEffect(() => {
    const isDark =
      theme === "dark" ||
      (theme === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.classList[isDark ? "add" : "remove"]("dark");
  }, [theme]);

  return (
    <button
      className="relative size-4 text-foreground *:absolute *:left-0 *:top-0 *:size-4"
      onClick={() => {
        console.log(theme);

        setThemeState(theme === "dark" ? "theme-light" : "dark");
      }}
    >
      <SunIcon className="dark:hidden" />
      <MoonIcon className="hidden dark:block" />
    </button>
  );
}
