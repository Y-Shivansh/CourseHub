import { useContext } from "react";
import { ThemeContext } from "../context/themeContext";

// Custom hook for easier access
// useTheme() – The hook to use context anywhere
export const useTheme = () => {
  return useContext(ThemeContext);
};

/*
You already created ThemeContext with createContext()
ThemeProvider is just the component that wraps your app
But inside useContext(...), you always pass the actual ThemeContext — not the provider!
*/