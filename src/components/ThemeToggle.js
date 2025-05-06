import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { useThemeContext } from "../context/ThemeContext";

const ThemeToggle = () => {
  const { darkMode, toggleDarkMode } = useThemeContext();

  return (
    <Tooltip title="Toggle light/dark theme">
      <IconButton color="inherit" onClick={toggleDarkMode}>
        {darkMode ? <Brightness7 /> : <Brightness4 />}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggle;
