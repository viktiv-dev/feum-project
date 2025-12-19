import React, { useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import { useNavigate } from "react-router-dom";

const EventCard = ({ event }) => {
  const navigate = useNavigate();

  let formattedDate = "No date";
  if (event.event_date) {
    const parsedDate = new Date(event.event_date);
    if (!isNaN(parsedDate)) {
      formattedDate = parsedDate.toLocaleString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
    }
  }

  return (
    <Box
      onClick={() => navigate(`/events/${event.id}`)}
      sx={{
        minWidth: 307,
        backgroundColor: "transparent",
        borderRadius: 2,
        p: 2,
        mr: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        color: "#fff",
        cursor: "pointer",

        "&:hover": {
          transform: "translateY(-4px)",
          transition: "0.2s ease",
        },
      }}
    >
      <Box
        sx={{
          height: 136,
          width: 261,
          backgroundImage: `url(http://localhost:5000${event.picture_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          mb: 1,
        }}
      />
      <Typography sx={{ letterSpacing: "0.30em", fontSize: 11 }}>
        {event.name}
      </Typography>
      <Typography sx={{ letterSpacing: "0.30em", fontSize: 13 }}>
        {formattedDate}
      </Typography>
    </Box>
  );
};


export const EventCarousel = ({ events }) => {
  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 4;

  const handlePrev = () =>
    setStartIndex((prev) => Math.max(prev - visibleCount, 0));
  const handleNext = () =>
    setStartIndex((prev) =>
      Math.min(prev + visibleCount, events.length - visibleCount)
    );

  const visibleEvents = events.slice(startIndex, startIndex + visibleCount);

  const showArrows = events.length > visibleCount; // only show arrows if more than visibleCount

  return (
    <Box
      sx={{
        position: "relative",
        p: 0,
        backgroundColor: "#111",
        width: "100%",
      }}
    >
      {showArrows && (
        <IconButton
          onClick={handlePrev}
          disabled={startIndex === 0}
          sx={{
            position: "absolute",
            left: 0,
            top: "40%",
            color: "#fff",
            "&.Mui-disabled": { color: "rgba(255,255,255,0.3)" },
            zIndex: 10,
          }}
        >
          <ArrowBackIosIcon />
        </IconButton>
      )}

      {showArrows && (
        <IconButton
          onClick={handleNext}
          disabled={startIndex + visibleCount >= events.length}
          sx={{
            position: "absolute",
            right: 0,

            top: "40%",
            color: "#fff",
            "&.Mui-disabled": { color: "rgba(255,255,255,0.3)" },
            zIndex: 10,
          }}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      )}

      <Box sx={{ display: "flex", overflow: "hidden", padding: "0 40px" }}>
        {visibleEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </Box>
    </Box>
  );
};
