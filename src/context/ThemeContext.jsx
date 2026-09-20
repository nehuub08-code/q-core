import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext({
  isDark: false,
  toggleTheme: () => {}
});

export function ThemeProvider({ children }) {
  // Always default to false (Clean Bright theme)
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Purge any legacy dark keys
    try {
      localStorage.removeItem("qcore_theme");
      localStorage.removeItem("qcore_theme_mode");
      localStorage.removeItem("qcore_theme_v2");
    } catch(e) {}
    
    // Explicitly enforce light mode on mount
    const root = document.documentElement;
    root.classList.remove("dark");
    root.classList.add("light");
  }, []);

  const toggleTheme = () => {
    // Keep in Bright Mode as requested
    const root = document.documentElement;
    root.classList.remove("dark");
    root.classList.add("light");
    setIsDark(false);
  };

  return (
    <ThemeContext.Provider value={{ isDark: false, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
