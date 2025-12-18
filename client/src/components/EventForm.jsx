import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { Box, Typography, TextField, Button } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import EditIcon from "@mui/icons-material/Edit";
import {
  createEvent as apiCreateEvent,
  updateEvent as apiUpdateEvent,
} from "../services/eventService";
import { useNavigate } from "react-router-dom";
import PriceInput from "./PriceInput";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

dayjs.extend(customParseFormat);
const parseToDayjs = (val) => {
  if (!val) return null;
  if (dayjs.isDayjs && dayjs.isDayjs(val)) return val;
  if (val instanceof Date) return dayjs(val);
  if (typeof val === "string") {
    if (/\d{4}-\d{2}-\d{2}T/.test(val)) return dayjs(val); 
    if (/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/.test(val)) {
      return dayjs(val, "YYYY-MM-DD HH:mm:ss"); 
    }
    return dayjs(val); 
  }
  return null;
};

export const EventForm = ({
  type = "create",
  initialEvent = null,
  onSubmit,
  onCancel,
}) => {
  const [eventData, setEventData] = useState({
    name: "",
    lineup: "",
    genres: "",
    description: "",
    price: "",
    location: "",
    is_public: false,
    dateTime: null,
    image: null, 
    picture_path: null, 
  });

  const [imagePreview, setImagePreview] = useState(null); 
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const previousPriceRef = useRef(0);

  const normalizePriceValue = (raw) => {
    let v = raw;
    if (v && typeof v === "object") {
      if ("target" in v && v.target && "value" in v.target) v = v.target.value;
      else if ("value" in v) v = v.value;
    }
    if (v === "" || v === null || v === undefined) return "";
    const n = Number(v);
    if (Number.isNaN(n)) return String(v);
    return n.toFixed(2);
  };

  useEffect(() => {
    if (type === "edit" && initialEvent) {
      const rawDate =
        initialEvent.dateTime ??
        initialEvent.event_date ??
        initialEvent.eventDate ??
        initialEvent.eventDateTime ??
        initialEvent.event_date_iso ??
        null;

      const parsedDate = parseToDayjs(rawDate);

      const serverPath =
        initialEvent.picture_path ?? initialEvent.image ?? null;
      let previewUrl = null;
      if (serverPath) {
        previewUrl =
          typeof serverPath === "string" && serverPath.startsWith("http")
            ? serverPath
            : `http://localhost:5000${serverPath}`;
      }

      setEventData({
        name: initialEvent.name ?? "",
        lineup: initialEvent.lineup ?? "",
        genres: initialEvent.genre ?? initialEvent.genres ?? "",
        description: initialEvent.description ?? "",
        price:
          initialEvent.price !== undefined &&
          initialEvent.price !== null &&
          !Number.isNaN(Number(initialEvent.price))
            ? Number(initialEvent.price).toFixed(2)
            : initialEvent.price ?? "",
        location: initialEvent.location ?? "",
        is_public: initialEvent.is_public ?? false,
        dateTime: parsedDate,
        image: null, 
        picture_path: serverPath, 
      });

      setImagePreview(previewUrl);
      previousPriceRef.current =
        initialEvent.price != null && !Number.isNaN(Number(initialEvent.price))
          ? Number(initialEvent.price)
          : 0;
    }
  }, [type, initialEvent]);
  useEffect(() => {
    return () => {
      if (
        imagePreview &&
        typeof imagePreview === "string" &&
        imagePreview.startsWith("blob:")
      ) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleChange = (field, value) => {
    setEventData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e) => {
    const file = e?.target?.files?.[0] ?? null;
    if (!file) return;

    if (!file.type || !file.type.startsWith("image/")) {
      alert("Please select an image file (png, jpg, jpeg, webp, etc.)");
      return;
    }

    if (
      imagePreview &&
      typeof imagePreview === "string" &&
      imagePreview.startsWith("blob:")
    ) {
      URL.revokeObjectURL(imagePreview);
    }

    setEventData((prev) => ({ ...prev, image: file, picture_path: null }));
    const url = URL.createObjectURL(file);
    setImagePreview(url);
  };

  const handleCancel = async () => {
    setEventData({
      name: "",
      lineup: "",
      genres: "",
      description: "",
      price: "",
      location: "",
      is_public: false,
      dateTime: null,
      image: null,
      picture_path: null,
    });
    previousPriceRef.current = 0;

    if (
      imagePreview &&
      typeof imagePreview === "string" &&
      imagePreview.startsWith("blob:")
    ) {
      URL.revokeObjectURL(imagePreview);
    }
    setImagePreview(null);

    if (typeof onCancel === "function") {
      onCancel();
    } else {
      navigate("/admin-events");
    }
  };

  const formatDateTimeForAPI = (dt) => {
    if (!dt) return null;
    if (dt.toDate && typeof dt.toDate === "function")
      return dt.toDate().toISOString();
    if (dt instanceof Date) return dt.toISOString();
    if (typeof dt === "string") return dt;
    return null;
  };

  const handleSubmit = async (e) => {
    if (e && typeof e.preventDefault === "function") e.preventDefault();
    setSubmitting(true);

    try {
      const normalizedPriceString = normalizePriceValue(eventData.price);

      const payload = {
        name: eventData.name,
        lineup: eventData.lineup,
        genres: eventData.genres,
        description: eventData.description,
        price: normalizedPriceString,
        is_public: eventData.is_public ? 1 : 0,
        location: eventData.location,
        dateTime: formatDateTimeForAPI(eventData.dateTime),
        image: eventData.image,
        picture_path: eventData.picture_path ?? undefined,
      };

      let result;
      if (type === "edit") {
        if (!initialEvent || !initialEvent.id) {
          throw new Error("Cannot update event: missing initialEvent.id");
        }
        result = await apiUpdateEvent(initialEvent.id, payload);
        alert("Event updated successfully");
      } else {
        result = await apiCreateEvent(payload);
        alert("Event created successfully");
      }

      setSubmitting(false);

      onSubmit && onSubmit(result);

      setEventData({
        name: "",
        lineup: "",
        genres: "",
        description: "",
        price: "",
        location: "",
        is_public: false,
        dateTime: null,
        image: null,
        picture_path: null,
      });
      previousPriceRef.current = 0;
      if (
        imagePreview &&
        typeof imagePreview === "string" &&
        imagePreview.startsWith("blob:")
      ) {
        URL.revokeObjectURL(imagePreview);
      }
      setImagePreview(null);

      navigate("/admin-events");
    } catch (err) {
      setSubmitting(false);
      console.error("Failed to create/update event:", err);
      alert((err && err.message) || "Failed to save event");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault(); 
        }
      }}
      sx={{
        width: "84%",
        maxWidth: "1400px",
        mx: "auto",
        mt: 8,
        px: 3,
        py: 4,
        boxSizing: "border-box",
        backgroundColor: "transparent",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 3,
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", md: "45%" },
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          <Typography variant="h4" fontSize={"1.5rem"} mb={"30px"}>
            {type === "edit" ? "Edit Event" : "Create Event"}
          </Typography>

          <TextField
            label="Event Name"
            value={eventData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            fullWidth
            slotProps={{
              input: { sx: { backgroundColor: "transparent", width: "100%" } },
            }}
          />

          <TextField
            label="Lineup"
            value={eventData.lineup}
            onChange={(e) => handleChange("lineup", e.target.value)}
            fullWidth
            slotProps={{
              input: { sx: { backgroundColor: "transparent", width: "100%" } },
            }}
          />

          <TextField
            label="Genres"
            value={eventData.genres}
            onChange={(e) => handleChange("genres", e.target.value)}
            fullWidth
            slotProps={{
              input: { sx: { backgroundColor: "transparent", width: "100%" } },
            }}
          />

          <PriceInput
            value={eventData.price ?? ""}
            onChange={(val) => {
              const normalized = normalizePriceValue(val);
              handleChange("price", normalized);
              if (!Number.isNaN(Number(normalized)))
                previousPriceRef.current = Number(normalized);
            }}
            label="Price"
          />

          <TextField
            label="Location"
            value={eventData.location}
            onChange={(e) => handleChange("location", e.target.value)}
            fullWidth
            slotProps={{
              input: { sx: { backgroundColor: "transparent", width: "100%" } },
            }}
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              label="Event Date & Time"
              value={eventData.dateTime}
              onChange={(value) => handleChange("dateTime", value)}
              slotProps={{
                textField: {
                  fullWidth: true,
                  sx: {
                    "& .MuiInputBase-input": { color: "#ffffff" },
                    backgroundColor: "transparent",
                  },
                },
                componentsProps: {
                  switchViewButton: {
                    sx: {
                      "& .MuiSvgIcon-root": {
                        color: "black", 
                      },
                    },
                  },
                },
                popper: {
                  sx: {
                    "& .MuiPickersArrowSwitcher-root .MuiSvgIcon-root": {
                      color: "black", 
                    },
                  },
                },
              }}
            />
          </LocalizationProvider>

          <FormControl variant="outlined" fullWidth>
            <InputLabel id="add-event-visibility-label">Visibility</InputLabel>

            <Select
              labelId="add-event-visibility-label"
              label="Visibility"
              onChange={(e) => handleChange("is_public", e.target.value)}
              value={eventData.is_public}
              sx={{
                width: "100%",
                color: "#fff",
                backgroundColor: "transparent",
              }}
            >
              <MenuItem value={false}>Private</MenuItem>
              <MenuItem value={true}>Public</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Description"
            multiline
            value={eventData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            fullWidth
            slotProps={{
              input: { sx: { backgroundColor: "transparent", width: "100%" } },
            }}
          />
        </Box>

        <Box
          sx={{
            width: { xs: "100%", md: "45%" },
            display: "flex",
            flexDirection: "column",
            gap: 3,
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              height: "50px",
              width: "100%",
              display: "flex",
              position: "relative",
              justifyContent: "right",
              gap: "20px",
            }}
          >
            <Button
              variant="outlined"
              disableElevation
              onClick={handleCancel}
              sx={{ width: "150px" }}
              disabled={submitting}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              variant="outlined"
              disableElevation
              sx={{ width: "150px" }}
              disabled={submitting}
            >
              {submitting ? "Saving..." : "Save"}
            </Button>
          </Box>

          <Box
            sx={{
              width: "100%",
              minHeight: 220,
              border: "2px dashed rgba(255,255,255,0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "transparent",
              color: "white",
              textAlign: "center",
              p: 2,
              position: "relative",
              overflow: "hidden",
            }}
          >
            {imagePreview ? (
              <>
                <img
                  src={imagePreview}
                  alt="Event"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />

                <Button
                  component="label"
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    minWidth: "0",
                    padding: "6px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(0,0,0,0.5)",
                    "&:hover": { backgroundColor: "rgba(0,0,0,0.7)" },
                  }}
                >
                  <EditIcon sx={{ color: "white", fontSize: 20 }} />
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </Button>
              </>
            ) : (
              <Button
                variant="outlined"
                component="label"
                sx={{
                  color: "white",
                  borderColor: "white",
                  textTransform: "none",
                  backgroundColor: "transparent",
                }}
              >
                Browse Image
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

EventForm.propTypes = {
  type: PropTypes.oneOf(["create", "edit"]),
  initialEvent: PropTypes.object,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
};

export default EventForm;
