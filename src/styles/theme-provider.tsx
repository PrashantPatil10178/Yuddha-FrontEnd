import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light" | "system";
type ColorScheme = "blue" | "green" | "purple";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  defaultColorScheme?: ColorScheme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  colorScheme: ColorScheme;
  setTheme: (theme: Theme) => void;
  setColorScheme: (colorScheme: ColorScheme) => void;
};

const initialState: ThemeProviderState = {
  theme: "system",
  colorScheme: "blue",
  setTheme: () => null,
  setColorScheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  defaultColorScheme = "blue",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(`${storageKey}-mode`) as Theme) || defaultTheme
  );
  const [colorScheme, setColorScheme] = useState<ColorScheme>(
    () =>
      (localStorage.getItem(`${storageKey}-color`) as ColorScheme) ||
      defaultColorScheme
  );

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }

    root.classList.remove("blue-scheme", "green-scheme", "purple-scheme");
    root.classList.add(`${colorScheme}-scheme`);
  }, [theme, colorScheme]);

  const value = {
    theme,
    colorScheme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(`${storageKey}-mode`, theme);
      setTheme(theme);
    },
    setColorScheme: (colorScheme: ColorScheme) => {
      localStorage.setItem(`${storageKey}-color`, colorScheme);
      setColorScheme(colorScheme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
