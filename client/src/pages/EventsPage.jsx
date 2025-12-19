import React, { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { NavBar } from "../components/NavBar";
import { EventCarousel } from "../components/EventCarousel";
import { getSortedFuturePublicEvents, getSortedPastPublicEvents } from "../services/eventService";
import { useNavigate } from "react-router-dom"; // import useNavigate

const EventsPage = () => {
  const [futureEvents, setFutureEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const navigate = useNavigate(); // initialize navigate

  useEffect(() => {
    getSortedFuturePublicEvents().then(data => {
      console.log("Future events fetched:", data);
      setFutureEvents(data);
    });

    getSortedPastPublicEvents().then(data => {
      console.log("Past events fetched:", data);
      setPastEvents(data);
    });
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        bgcolor: "primary.main",
        overflow: "hidden"
      }}
    >
      <NavBar sx={{ position: "relative", zIndex: 3 }} />
      <Box
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          mt: "6rem",
          mb: "7rem",
          gap: 2,
          mx: "10rem",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            width: "100%",
            textAlign: "left",
            letterSpacing: "0.30em",
            fontSize: 24,
            pl: 11,
          }}
        >
          Upcoming Events
        </Typography>
        <EventCarousel events={futureEvents} />

        <Typography
          variant="h4"
          sx={{
            width: "100%",
            textAlign: "left",
            fontSize: 24,
            pl: 11,
            letterSpacing: "0.30em",
            mt: "2rem",
          }}
        >
          Past Events
        </Typography>
        <EventCarousel events={pastEvents} />

        <Typography sx={{ mt: "2rem", mb: "1rem" }} variant="body2">
          Before attending our events, please take the time to read our guidelines and house rules.
        </Typography>

        <Button onClick={() => navigate("/about")}>
          HOUSE RULES & GUIDELINES
        </Button>
      </Box>
    </Box>
  );
};

export default EventsPage;
