import React, { useState } from "react";
import { Box, Typography, IconButton, Button, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom"; 
import { deleteEvent } from "../services/eventService";

export const AdminEventRow = ({ event, onEdit, onDeleted }) => {
  const [deleting, setDeleting] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [confirmText, setConfirmText] = useState("");

  const navigate = useNavigate(); 

  const formattedDate = event.event_date
    ? new Date(event.event_date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "No date";

  const handleDelete = async () => {
    if (confirmText.toLowerCase() !== "delete") {
      alert('Please type "delete" to confirm.');
      return;
    }

    try {
      setDeleting(true);
      await deleteEvent(event.id);
      setDeleting(false);
      setConfirming(false);
      setConfirmText("");
      if (onDeleted) onDeleted(event.id);
    } catch (err) {
      setDeleting(false);
      console.error("Failed to delete event:", err);
      alert(err?.message || "Failed to delete event");
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 1,
        bgcolor: "transparent",
        pt: 0.6,
        pb: 0.2,
        px: 1,
        borderTop: "1px solid #383838",
        borderBottom: "1px solid #383838",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6" sx={{ color: "#fff" }}>
          {event.name} | {formattedDate}
        </Typography>
        <Box sx={{ display: "flex", gap: 0 }}>
          <IconButton
            sx={{ color: "#fff" }}
            onClick={() => onEdit && onEdit(event.id)}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            sx={{ color: "#fff" }}
            onClick={() => navigate(`/admin-event-plan/${event.id}`)}
          >
            <CalendarTodayIcon />
          </IconButton>
          <IconButton
            sx={{ color: "#fff" }}
            onClick={() => setConfirming(true)}
            disabled={deleting}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      </Box>

      {confirming && (
        <Box
          sx={{
            mt: 1,
            p: 2,
            bgcolor: "rgba(255,0,0,0.1)",
            border: "1px solid red",
            borderRadius: "4px",
            display: "flex",
            alignItems: "center",
            gap: 1,
            flexWrap: "wrap",
          }}
        >
          <Typography sx={{ color: "red" }}>
            Type "delete" to confirm deletion:
          </Typography>
          <TextField
            size="small"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            sx={{ minWidth: "120px", bgcolor: "#fff", borderRadius: 1 }}
          />
          <Button
            variant="contained"
            color="error"
            onClick={handleDelete}
            disabled={deleting}
          >
            {deleting ? "Deleting..." : "Confirm"}
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              setConfirming(false);
              setConfirmText("");
            }}
          >
            Cancel
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default AdminEventRow;
