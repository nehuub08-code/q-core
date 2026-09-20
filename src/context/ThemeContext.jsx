import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext({
  theme: "bright",
  isDark: false,
  setTheme: () => {},
  cycleTheme: () => {},
  toggleTheme: () => {}
});

export function ThemeProvider({ children }) {
  // 3 themes: 'bright' | 'light' | 'dark'
  const [theme, setThemeState] = useState(() => {
    try {
      const saved = localStorage.getItem("qcore_theme_mode");
      if (saved === "dark" || saved === "light" || saved === "bright") {
        return saved;
      }
      return "bright"; // default to bright
    } catch (e) {
      return "bright";
    }
  });

  const applyThemeClasses = (targetTheme) => {
    const root = document.documentElement;
    root.classList.remove("dark", "light", "theme-bright", "theme-light", "theme-dark");

    if (targetTheme === "dark") {
      root.classList.add("dark", "theme-dark");
    } else if (targetTheme === "light") {
      root.classList.add("light", "theme-light");
    } else {
      // bright
      root.classList.add("light", "theme-bright");
    }
  };

  useEffect(() => {
    applyThemeClasses(theme);
    try {
      localStorage.setItem("qcore_theme_mode", theme);
    } catch (e) {}
  }, [theme]);

  const setTheme = (nextTheme) => {
    if (nextTheme === "bright" || nextTheme === "light" || nextTheme === "dark") {
      setThemeState(nextTheme);
    }
  };

  const cycleTheme = () => {
    setThemeState((current) => {
      if (current === "bright") return "light";
      if (current === "light") return "dark";
      return "bright";
    });
  };

  const isDark = theme === "dark";

  return (
    <ThemeContext.Provider value={{ theme, isDark, setTheme, cycleTheme, toggleTheme: cycleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
