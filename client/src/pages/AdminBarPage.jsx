import React, { useState } from "react";
import { Box } from "@mui/material";
import Sidebar from "../components/SideBar";
import ProductsPanel from "../components/ProductsPanel";
import DrinksPanel from "../components/DrinksPanel";
import InventoryPanel from "../components/InventoryPanel";
import { AdminNavBar } from "../components/AdminNavBar";

const SIDEBAR_WIDTH = 260;

export default function AdminBarPage() {
  const [activeTab, setActiveTab] = useState("products");

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
      <AdminNavBar sx={{ position: "relative", zIndex: 3 }} />
      <Box sx={{ display: "flex" }}>
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          sidebarWidth={SIDEBAR_WIDTH}
        />

        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3, mx: "5%" }}
        >
          {activeTab === "products" && <ProductsPanel />}
          {activeTab === "drinks" && <DrinksPanel />}
          {activeTab === "inventories" && <InventoryPanel />}
        </Box>
      </Box>
    </Box>
  );
}
