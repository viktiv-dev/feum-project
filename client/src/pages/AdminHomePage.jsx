import React from "react";
import { Box, Container } from "@mui/material"; 
import background from "../assets/images/background.gif";
import { NavBar } from "../components/NavBar";
import { Typography } from "@mui/material";

const AdminHomePage = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const username = user.username || "Admin";

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
        bgcolor: "primary.main",
      }}
    >
      <NavBar sx={{ position: "relative", zIndex: 3 }} />
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          mixBlendMode: "screen",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />
      <Box
        sx={{
          flex: 1,
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          pl: "10vw",
          pb: 4,
          gap: 2,
          marginBottom: "20vh"
        }}
      >
        <Typography variant="h2" color="secondary.main">
          Welcome, {username}
        </Typography>
        <Typography variant="h5" color="secondary.main">
          FEUM ADMIN
        </Typography>
      </Box>
    </Box>
  );
};

export default AdminHomePage;
