import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CssBaseline, Container, Paper, ThemeProvider, createTheme } from "@mui/material";

import Header from "./components/Header";
import EMICalculator from "./components/EMICalculator";
import AmortizationTable from "./components/AmortizationTable";
import CurrencyTable from "./components/CurrencyTable";
import ErrorPage from "./pages/ErrorPage";
import NotFound from "./pages/NotFound";

import { CurrencyProvider } from "./context/CurrencyContext";
import { EMIDataProvider } from "./context/EMIDataContext";
import { useThemeContext, ThemeContextProvider } from "./context/ThemeContext";

const AppContent = () => {
  const { darkMode } = useThemeContext();

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: "#1976d2",
      },
      secondary: {
        main: "#dc004e",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Header />
        <Container maxWidth="md" sx={{ my: 4 }}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
            <Routes>
              <Route path="/" element={<EMICalculator />} />
              <Route path="/amortization" element={<AmortizationTable />} />
              <Route path="/currency" element={<CurrencyTable />} />
              <Route path="/error" element={<ErrorPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Paper>
        </Container>
      </Router>
    </ThemeProvider>
  );
};

export default function App() {
  return (
    <ThemeContextProvider>
      <CurrencyProvider>
        <EMIDataProvider>
          <AppContent />
        </EMIDataProvider>
      </CurrencyProvider>
    </ThemeContextProvider>
  );
}
