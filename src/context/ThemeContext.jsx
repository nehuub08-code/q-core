import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext({
  isDark: false,
  toggleTheme: () => {}
});

export function ThemeProvider({ children }) {
  // Read saved preference or default to false (Bright theme)
  const [isDark, setIsDark] = useState(() => {
    try {
      const saved = localStorage.getItem("qcore_theme_mode");
      if (saved === "dark") return true;
      if (saved === "light") return false;
      return false; // default to bright
    } catch (e) {
      return false;
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      root.classList.remove("light");
      try {
        localStorage.setItem("qcore_theme_mode", "dark");
      } catch (e) {}
    } else {
      root.classList.remove("dark");
      root.classList.add("light");
      try {
        localStorage.setItem("qcore_theme_mode", "light");
      } catch (e) {}
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
