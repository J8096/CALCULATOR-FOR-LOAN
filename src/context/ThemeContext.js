import React, { createContext, useContext, useState, useMemo } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const ThemeContext = createContext();

export const ThemeProviderWrapper = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
          primary: {
            main: "#1976d2",
          },
          secondary: {
            main: "#dc004e",
          },
        },
      }),
    [darkMode]
  );

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

export const ThemeContextProvider = ThemeProviderWrapper;
export const useThemeContext = () => useContext(ThemeContext);
