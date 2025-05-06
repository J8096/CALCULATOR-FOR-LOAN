import React, { useState } from "react";
import {
  AppBar, Toolbar, Typography, IconButton,
  Drawer, List, ListItem, ListItemText, Box, useMediaQuery
} from "@mui/material";
import { Menu as MenuIcon, Settings as SettingsIcon } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const navLinks = [
    { text: "EMI Calculator", path: "/" },
    { text: "Amortization", path: "/amortization" },
    { text: "Currency Rates", path: "/currency" }
  ];

  const drawer = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {navLinks.map((item) => (
          <ListItem button key={item.text} component={Link} to={item.path}>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          {isMobile && (
            <IconButton edge="start" color="inherit" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
          )}

          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              Loan Calculator
            </Link>
          </Typography>

          {!isMobile && (
            <Box sx={{ display: "flex", gap: 2 }}>
              {navLinks.map((item) => (
                <Typography
                  key={item.text}
                  component={Link}
                  to={item.path}
                  sx={{ color: "inherit", textDecoration: "none" }}
                >
                  {item.text}
                </Typography>
              ))}
            </Box>
          )}

          <ThemeToggle />
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        {drawer}
      </Drawer>
    </>
  );
};

export default Header;
