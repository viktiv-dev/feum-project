import React from "react";
import { Box, Container } from "@mui/material"; 
import background from "../assets/images/background.gif";
import { AdminNavBar } from "../components/AdminNavBar";
import { Typography } from "@mui/material";
import { NavBar } from "../components/NavBar";

const HomePage = () => {
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
        <Typography variant="h2" sx={{fontSize: "6rem", letterSpacing: "3rem"}} color="secondary.main">
          FEUM
        </Typography>
        <Typography variant="h5" sx={{fontSize: "1.7rem", fontWeight:"350", width: "75%"}} color="secondary.main">
          FORENINGEN FOR ELEKTRONISK UNDERGRUNDSMUSIK
        </Typography>
      </Box>
    </Box>
  );
};

export default HomePage;
