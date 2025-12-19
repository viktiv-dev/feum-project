import { AdminNavBar } from "../components/AdminNavBar";
import { EventForm } from "../components/EventForm";
import { Box } from "@mui/material";

export const AdminAddEventPage = () => {
  const handleSave = async (data) => {
    console.log("Event data:", data);
  };  

  return(
    <Box sx={{minHeight: "100vh",
        backgroundPosition: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
        bgcolor: "primary.main"}}>
        <AdminNavBar sx={{ position: "relative", zIndex: 3 }} /  >
        <EventForm type="create" onSubmit={handleSave}/>
    </Box>
  )

};

export default AdminAddEventPage;