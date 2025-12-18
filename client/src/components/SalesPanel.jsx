import React from "react";
import { Box, Typography, Paper } from "@mui/material";

export default function SalesPanel() {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 3,
        }}
      >
        <Typography variant="h4" sx={{ textTransform: "capitalize" }}>
          sales
        </Typography>
      </Box>
      <Paper sx={{ p: 2 }}>
        <Typography>Sales list will go here.</Typography>
      </Paper>
    </>
  );
}
