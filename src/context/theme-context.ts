import { createContext } from "react";

export type Theme = "dark" | "light" | "system";

export type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

// Estado inicial do contexto
export const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
};

// Criando o contexto
export const ThemeProviderContext =
  createContext<ThemeProviderState>(initialState);
