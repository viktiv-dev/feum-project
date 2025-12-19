import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AdminNavBar } from "../components/AdminNavBar";
import { EventForm } from "../components/EventForm";
import { Box, CircularProgress, Typography } from "@mui/material";
import { getEvent } from "../services/eventService";

export const AdminEditEventPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      alert("No event ID provided");
      navigate("/admin-events");
      return;
    }

    const fetchEvent = async () => {
      setLoading(true);
      const data = await getEvent(id);
      if (!data) {
        alert("Event not found");
        navigate("/admin-events");
        return;
      }
      setEvent(data);
      setLoading(false);
    };

    fetchEvent();
  }, [id, navigate]);

  const handleSave = (updatedEvent) => {
    console.log("Updated event:", updatedEvent);
  };

  const handleCancel = () => {
    navigate("/admin-events");
  };

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "primary.main",
        }}
      >
        <CircularProgress />
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
      <EventForm
        type="edit"
        initialEvent={event}
        onSubmit={handleSave}
        onCancel={handleCancel}
      />
    </Box>
  );
};

export default AdminEditEventPage;
