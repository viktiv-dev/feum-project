import React from "react";
import { AppBar, Toolbar, Stack, Button, Box } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";

export const NavBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const navLinks = [
    { name: "Home", path: "/admin" },
    { name: "Events", path: "/admin-events" },
    { name: "Bar", path: "/admin-bar" },
    { name: "Gear", path: "/admin-gear" },
    { name: "LQ", path: "/admin-lq" },
    { name: "My Profile", path: "/admin-profile" },
  ];

  return (
    <AppBar
      position="static"
      elevation={0} 
      sx={{ px: 2, pt: 1, bgcolor: "#111111" }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleLogout}
          sx={{
            borderColor: "#555",
            color: "#fff",
            "&:hover": {
              borderColor: "#888",
              backgroundColor: "#1a1a1a",
            },
          }}
        >
          Logout
        </Button>
        <Stack direction="row" spacing={4}>
          {navLinks.map((link) => {
            const isActive =
              link.path === "/admin-events"
                ? location.pathname === "/admin-events" || location.pathname === "/admin-event-add"
                : location.pathname.startsWith(link.path);

            return (
              <NavLink key={link.path} to={link.path} style={{ textDecoration: "none" }}>
                <Box
                  sx={{
                    color: "#fff",
                    fontWeight: 400,
                    position: "relative",
                    pb: "4px",
                    mx: 2,
                    cursor: "pointer",
                    fontFamily: `"Helvetica Neue LT Std", Helvetica, Arial, sans-serif`,
                    letterSpacing: "0.30em",
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      left: 0,
                      bottom: 0,
                      width: isActive ? "100%" : 0,
                      height: "2px",
                      bgcolor: "#fff",
                      transition: "width 0.3s ease",
                    },
                    "&:hover::after": {
                      width: "100%",
                    },
                  }}
                >
                  {link.name}
                </Box>
              </NavLink>
            );
          })}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
