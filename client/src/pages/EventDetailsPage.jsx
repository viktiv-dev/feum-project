import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { getEvent } from "../services/eventService";
import { NavBar } from "../components/NavBar";

const EventDetailsPage = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    getEvent(id).then(setEvent);
  }, [id]);

  if (!event) {
    return (
      <Box sx={{ color: "#fff", textAlign: "center", mt: "10rem" }}>
        Loading event...
      </Box>
    );
  }
  const eventDate = new Date(event.event_date);

  const formattedDate = eventDate
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
    .toUpperCase();

  const formattedTime = eventDate.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        bgcolor: "primary.main",
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
          mx: "15rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            mt: 4,
            gap: 2,
          }}
        >
          <Box
            sx={{
              flex: 1.4,
              display: "flex",
              alignItems: "flex-start",
              flexDirection: "column",
              pr: 4,
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: 2,
                mb: "3rem",
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontSize: 28,
                  fontWeight: "400",
                  letterSpacing: "0.40em",
                  width: "100%",
                }}
              >
                {event.name}
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  fontSize: 18,
                  letterSpacing: "0.10em",
                  width: "100%",
                }}
              >
                DATE: {formattedDate}
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  fontSize: 18,
                  letterSpacing: "0.10em",
                  width: "100%",
                }}
              >
                TIME: {formattedTime} - END
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  fontSize: 18,
                  letterSpacing: "0.10em",
                  width: "100%",
                }}
              >
                LOCATION: {event.location}
              </Typography>
            </Box>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: 2,
                mb: "3rem",
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontSize: 18,
                  fontWeight: "400",
                  letterSpacing: "0.40em",
                  width: "100%",
                }}
              >
                LINEUP:
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  fontSize: 20,
                  fontWeight: "600",
                  letterSpacing: "0.50em",
                  width: "100%",
                }}
              >
                {event.lineup}
              </Typography>
            </Box>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontSize: 18,
                  fontWeight: "400",
                  letterSpacing: "0.40em",
                  width: "100%",
                }}
              >
                GENRES:
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  fontSize: 18,
                  fontWeight: "300",
                  letterSpacing: "0.10em",
                  width: "100%",
                }}
              >
                {event.genre}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              flex: 0.6,
              display: "flex",
              alignItems: "flex-end",
              flexDirection: "column",
              pl: 4,
            }}
          >
            <Box
              sx={{
                width: "653px",
                bgcolor: "white",
                height: "341px",
                backgroundImage: `url(http://localhost:5000${event.picture_path})`,
                backgroundSize: "cover",
              }}
            ></Box>
          </Box>
        </Box>
        <Typography variant="body2" sx={{fontSize: 14, width: "100%", whiteSpace: "pre-line"}}>
          {event.description}
        </Typography>
      </Box>
    </Box>
  );
};

export default EventDetailsPage;
