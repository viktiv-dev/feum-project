import React from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";

export default function Sidebar({
  activeTab,
  setActiveTab,
  sidebarWidth = 260,
}) {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: sidebarWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: sidebarWidth,
          boxSizing: "border-box",
          bgcolor: "#0a0a0aff",
          p: 2,
        },
      }}
    >
      <Typography variant="h6" sx={{mt: "2rem", ml:"1rem", fontSize: "2rem"}} gutterBottom>
        Bar
      </Typography>
      <List sx={{mt: "1rem", display: "flex", flexDirection: "column", gap: "1rem"}}>
        <ListItemButton
          selected={activeTab === "products"}
          onClick={() => setActiveTab("products")}
        >
          <ListItemText primary="Products" />
        </ListItemButton>
        <ListItemButton
          selected={activeTab === "drinks"}
          onClick={() => setActiveTab("drinks")}
        >
          <ListItemText primary="Drinks" />
        </ListItemButton>
        <ListItemButton
          selected={activeTab === "inventories"}
          onClick={() => setActiveTab("inventories")}
        >
          <ListItemText primary="Inventory" />
        </ListItemButton>
        <ListItemButton
          selected={activeTab === "sales"}
          onClick={() => setActiveTab("sales")}
        >
          <ListItemText primary="Sales" />
        </ListItemButton>
      </List>
    </Drawer>
  );
}
