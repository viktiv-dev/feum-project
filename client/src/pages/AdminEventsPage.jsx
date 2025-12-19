import React, { useEffect, useState } from "react";
import { getEvents } from "../services/eventService";
import { Box, Typography, Container, Button } from "@mui/material";
import AdminEventRow from "../components/AdminEventRow";
import { AdminNavBar } from "../components/AdminNavBar";
import { useNavigate } from "react-router-dom";

export const AdminEventsPage = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getEvents();
        setEvents(data || []);
      } catch (err) {
        console.error("Failed to fetch events:", err);
        setEvents([]);
      }
    };
    fetchEvents();
  }, []);

  const handleAddEvent = () => {
    navigate("/admin-event-add");
  };

  const handleDeleted = (id) => {
    setEvents((prev) => prev.filter((ev) => ev.id !== id));
  };

  if (!events || events.length === 0) {
    return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundPosition: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
        bgcolor: "primary.main",
      }}
    >
      <AdminNavBar sx={{ position: "relative", zIndex: 3 }} />
      <Box sx={{height: "80vh", display:"flex", justifyContent:"center", flexDirection: "column", alignItems: "center", gap: "20px"}}>
        <Typography variant="h4" sx={{textAlign: "center", fontSize:"2rem"}}>No events found</Typography>
        <Button onClick={handleAddEvent} sx={{fontSize: "1rem"}} variant="contained">Create Event</Button>
      </Box>
    </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundPosition: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
        bgcolor: "primary.main",
      }}
    >
      <AdminNavBar sx={{ position: "relative", zIndex: 3 }} />
      <Container maxWidth="xl" sx={{ px: 3, mx: "1rem" }}>
        <Typography variant="h4" textAlign="center" mt="7rem">
          EVENTS
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: "1rem" }}>
          <Button onClick={handleAddEvent} variant="contained" disableRipple disableElevation
            sx={{
              borderWidth: 0,
              pb: 0.2,
              textUnderlineOffset: "4px",
              justifyContent: "flex-end",
              letterSpacing: "0.2rem",
              fontWeight: 500,
              pr: "0",
            }}
          >
            Create Event
          </Button>
        </Box>

        <Box sx={{ marginBottom: "6rem", display: "flex", flexDirection: "column", gap: 0 }}>
          {events.map((event) => (
            <Box
              key={event.id}
              sx={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                mx: 2,
                "&::before, &::after": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  width: "1px",
                  bgcolor: "white",
                },
                "&::before": { left: "-10px" },
                "&::after": { right: "-10px" },
              }}
            >
              <AdminEventRow
                event={event}
                onDeleted={handleDeleted} 
                onEdit={(id) => navigate(`/admin-event-edit/${id}`)}
              />
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default AdminEventsPage;
