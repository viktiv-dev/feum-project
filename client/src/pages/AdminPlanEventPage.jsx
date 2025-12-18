import React, { useEffect, useState, useCallback } from "react";
import { NavBar } from "../components/NavBar";
import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  IconButton,
  TextField,
  Typography,
  Paper,
  Divider,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { getEvent } from "../services/eventService";

import dayjs from "dayjs";
import {
  getCrewByEvent,
  addCrew,
  deleteCrewByEvent,
} from "../services/crewService";

const INPUT_SX = {
  backgroundColor: "transparent",
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(255,255,255,0.12)",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(255,255,255,0.2)",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(255,255,255,0.6)",
  },
  "& input": {
    color: "#fff",
    padding: "8px 10px",
    fontSize: "0.85rem",
  },
};
dayjs.extend(customParseFormat);

const parseToDayjsTime = (val) => {
  if (!val) return null;
  if (dayjs.isDayjs(val)) return val;
  if (val instanceof Date) {
    return dayjs()
      .hour(val.getHours())
      .minute(val.getMinutes())
      .second(val.getSeconds());
  }

  if (typeof val === "string") {
    if (/^\d{2}:\d{2}:\d{2}$/.test(val)) {
      return dayjs(val, "HH:mm:ss");
    }
    if (/^\d{2}:\d{2}$/.test(val)) {
      return dayjs(val, "HH:mm");
    }
    if (val.includes("T")) {
      const d = dayjs(val);
      if (d.isValid()) {
        return dayjs().hour(d.hour()).minute(d.minute()).second(d.second());
      }
    }
  }
  return null;
};

const INITIAL_ROLE_PREFIX = {
  Host: 1,
  "Social Media": 2,
  "Light Technicians": 3,
  "Sound Technicians": 4,
  VJs: 5,
  "Venue Setup": 6,
  "Bar Setup": 7,
  "Door Setup": 8,
  "Backstage Setup": 9,
  Food: 10,
  Security: 11,
  Wardrobe: 12,
  "Bar Manager": 13,
  Bartender: 14,
  "Door Coordinator": 15,
  "Artist Care": 16,
  "Photographer(s)": 17,
};

function makeLocalId() {
  return `l_${Math.random().toString(36).slice(2, 9)}`;
}
const defaultLayout = [
  {
    section: "GENERAL",
    roles: [
      { role: "Host", members: [{}] },
      { role: "Social Media", members: [{}] },
    ],
  },
  {
    section: "TECHNICIANS",
    roles: [
      { role: "Light Technicians", members: [{}] },
      { role: "Sound Technicians", members: [{}] },
      { role: "VJs", members: [{}] },
    ],
  },
  {
    section: "SETUP",
    roles: [
      { role: "Venue Setup", members: [{}] },
      { role: "Bar Setup", members: [{}] },
      { role: "Door Setup", members: [{}] },
      { role: "Backstage Setup", members: [{}] },
      { role: "Food", members: [{}] },
    ],
  },
  {
    section: "NIGHT CREW",
    roles: [
      { role: "Security", members: [{}] },
      { role: "Wardrobe", members: [{}] },
      { role: "Bar Manager", members: [{}] },
      { role: "Bartender", members: [{}] },
      { role: "Door Coordinator", members: [{}] },
      { role: "Artist Care", members: [{}] },
      { role: "Photographer(s)", members: [{}] },
    ],
  },
];

const MemberRow = React.memo(
  ({ groupId, member, updateField, remove, isFirst }) => {
    return (
      <Box
        sx={{ display: "flex", gap: 1, alignItems: "center", flexWrap: "wrap" }}
      >
        <TextField
          label="Name/s..."
          value={member.names}
          variant="outlined"
          onChange={(e) =>
            updateField(groupId, member.id, "names", e.target.value)
          }
          size="small"
          sx={{
            ...INPUT_SX,
            minWidth: 260,
            flex: "1 1 260px",
            "& .MuiOutlinedInput-root": {
              backgroundColor: "transparent",
              height: "42px"
            },
          }}
        />

        <TimePicker
          label="Start"
          value={member.start}
          onChange={(val) => updateField(groupId, member.id, "start", val)}
          slotProps={{
            textField: {
              sx: {
                "& .MuiInputBase-input": { color: "#fff" },
                backgroundColor: "transparent",
              },
            },
          }}
        />

        <Typography sx={{ color: "rgba(255,255,255,0.6)" }}>—</Typography>

        <TimePicker
          label="End"
          value={member.end}
          onChange={(val) => updateField(groupId, member.id, "end", val)}
          slotProps={{
            textField: {
              sx: {
                "& .MuiInputBase-input": { color: "#fff" },
                backgroundColor: "transparent",
              },
            },
          }}
        />

        <IconButton
          size="small"
          onClick={() => remove(groupId, member.id)}
          disabled={isFirst}
          sx={{
            "&.Mui-disabled": {
              opacity: 1,
              color: "rgba(124, 124, 124, 0.51)",
            },
            ml: 1,
            color: isFirst ? "rgba(255,255,255,0.25)" : "rgba(255, 255, 255, 1)",
            cursor: isFirst ? "not-allowed" : "pointer",
          }}
        >
          <DeleteIcon />
        </IconButton>
      </Box>
    );
  }
);

export default function AdminEventPlan() {
  const { id: eventId } = useParams();
  const [groups, setGroups] = useState([]);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const rebuildGroupsFromApi = (data) => {
    const grouped = {};
    for (const row of data || []) {
      const role = row.role || "Unknown";
      if (!grouped[role]) grouped[role] = [];
      grouped[role].push({
        id: makeLocalId(),
        names: row.names || "",
        start: parseToDayjsTime(row.start_time),
        end: parseToDayjsTime(row.end_time),
        persistedId: row.id,
      });
    }
    const groupArray = Object.entries(grouped).map(([role, members]) => ({
      id: makeLocalId(),
      section: "CUSTOM",
      role,
      members,
    }));
    const rolePrefix = { ...INITIAL_ROLE_PREFIX };
    return groupArray.sort((a, b) => {
      const pa = rolePrefix[a.role] ?? 999;
      const pb = rolePrefix[b.role] ?? 999;
      if (pa !== pb) return pa - pb;
      return a.role.localeCompare(b.role);
    });
  };
  const [event, setEvent] = useState(null);
  useEffect(() => {
    let mounted = true;
    async function fetchEvent() {
      try {
        const ev = await getEvent(eventId);
        if (!mounted) return;
        setEvent(ev);
      } catch (err) {
        console.error("Failed to fetch event", err);
        setEvent(null);
      }
    }

    async function load() {
      setLoading(true);
      try {
        const data = await getCrewByEvent(eventId);
        if (!mounted) return;

        if (!data || data.length === 0) {
          const built = defaultLayout.flatMap((sectionBlock) =>
            sectionBlock.roles.map((r) => ({
              id: makeLocalId(),
              section: sectionBlock.section,
              role: r.role,
              members: r.members.map(() => ({
                id: makeLocalId(),
                names: "",
                start: dayjs().hour(0).minute(0).second(0),
                end: dayjs().hour(0).minute(0).second(0),
                persistedId: null,
              })),
            }))
          );
          setGroups(built);
        } else {
          setGroups(rebuildGroupsFromApi(data));
        }
      } catch (err) {
        console.error("Failed to load crew", err);
        const built = defaultLayout.flatMap((sectionBlock) =>
          sectionBlock.roles.map((r) => ({
            id: makeLocalId(),
            section: sectionBlock.section,
            role: r.role,
            members: r.members.map(() => ({
              id: makeLocalId(),
              names: "",
              start: null,
              end: null,
              persistedId: null,
            })),
          }))
        );
        setGroups(built);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    if (eventId) fetchEvent();

    return () => {
      mounted = false;
    };
  }, [eventId]);

  const addMemberToGroup = useCallback((groupId) => {
    setGroups((g) =>
      g.map((gr) =>
        gr.id === groupId
          ? {
              ...gr,
              members: [
                ...gr.members,
                {
                  id: makeLocalId(),
                  names: "",
                  start: dayjs().hour(0).minute(0).second(0),
                  end: dayjs().hour(0).minute(0).second(0),
                },
              ],
            }
          : gr
      )
    );
  }, []);

  const removeMember = useCallback((groupId, memberId) => {
    setGroups((g) =>
      g.map((gr) =>
        gr.id === groupId
          ? { ...gr, members: gr.members.filter((m) => m.id !== memberId) }
          : gr
      )
    );
  }, []);

  const updateMemberField = useCallback((groupId, memberId, field, value) => {
    setGroups((g) =>
      g.map((gr) =>
        gr.id === groupId
          ? {
              ...gr,
              members: gr.members.map((m) =>
                m.id === memberId ? { ...m, [field]: value } : m
              ),
            }
          : gr
      )
    );
  }, []);

  const addNewRoleGroup = useCallback(
    (roleLabel = "New Role", section = "CUSTOM") => {
      setGroups((g) => [
        ...g,
        {
          id: makeLocalId(),
          section,
          role: roleLabel,
          members: [{ id: makeLocalId(), names: "", start: null, end: null }],
        },
      ]);
    },
    []
  );

  const handleSave = useCallback(async () => {
    setSaving(true);
    try {
      const rolePrefix = { ...INITIAL_ROLE_PREFIX };
      let maxPrefix = Math.max(...Object.values(rolePrefix), 0);
      const counters = {};
      const payload = [];
      for (const gr of groups) {
        const role = gr.role || "Unknown";

        if (rolePrefix[role] === undefined) {
          maxPrefix += 1;
          rolePrefix[role] = maxPrefix;
        }
        if (!counters[role]) counters[role] = 0;
        for (const m of gr.members) {
          counters[role] += 1;
          const dec = String(counters[role]).padStart(2, "0");
          const prefix = rolePrefix[role];
          const groupNumberNumeric = Number(`${prefix}.${dec}`);

          payload.push({
            names: m.names != null ? String(m.names) : "",
            role: role,
            start_time:
              m.start && m.start.format ? m.start.format("HH:mm:ss") : null,
            end_time: m.end && m.end.format ? m.end.format("HH:mm:ss") : null,
            group_number: groupNumberNumeric,
          });
        }
      }

      await deleteCrewByEvent(eventId);
      if (payload.length > 0) {
        await addCrew(eventId, payload);
      }

      const fresh = await getCrewByEvent(eventId);
      setGroups(rebuildGroupsFromApi(fresh));

      alert("Plan saved");
    } catch (err) {
      console.error("Save failed", err);
      alert("Failed to save: " + (err.message || ""));
    } finally {
      setSaving(false);
    }
  }, [groups, eventId]);

  const SectionHeader = ({ text }) => (
    <Typography
      sx={{
        fontSize: 12,
        letterSpacing: 4,
        color: "rgba(255,255,255,0.75)",
        mb: 1,
        mt: 2,
      }}
    >
      {text}
    </Typography>
  );

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
      <NavBar sx={{ position: "relative", zIndex: 3 }} />
      <Box sx={{ my: "4rem", minWidth: "85%", px: { xs: 2, md: 6 }, py: 0 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Box
            sx={{
              gap: "0.7rem",
              display: "flex",
              flexDirection: "column",
              mb: "1rem",
            }}
          >
            <Typography variant="h2" sx={{ fontSize: 20, letterSpacing: 2 }}>
              Plan Event
            </Typography>
            <Typography
              variant="h6"
              sx={{ fontSize: 18, color: "rgba(255,255,255,0.6)", mt: 1 }}
            >
              {event
                ? `${event.name} | ${
                    event.event_date
                      ? new Date(event.event_date).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })
                      : "No date"
                  }`
                : "Loading..."}
            </Typography>
          </Box>

          <Button
            variant="outlined"
            onClick={handleSave}
            startIcon={<SaveIcon />}
            sx={{
              textTransform: "none",
              color: "#fff",
              borderColor: "rgba(255,255,255,0.2)",
              backgroundColor: "transparent",
              "&:hover": { backgroundColor: "rgba(255,255,255,0.03)" },
            }}
            disabled={saving}
          >
            Save
          </Button>
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: 3,
            alignItems: "flex-start",
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          {/* LEFT column */}
          <Paper
            elevation={0}
            sx={{
              flex: 1.3,
              p: 3,
              backgroundColor: "transparent",
              minWidth: 420,
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              {loading ? (
                <Typography>Loading...</Typography>
              ) : (
                <>
                  {groups.length === 0 && (
                    <Typography color="rgba(255,255,255,0.6)">
                      No roles
                    </Typography>
                  )}
                  {groups.map((gr) => (
                    <Box key={gr.id} sx={{ mb: 2 }}>
                      <Box
                        sx={{
                          display: "flex",
                          gap: 1,
                          alignItems: "center",
                          mb: 2,
                        }}
                      >
                        <Typography variant="h6">{gr.role}</Typography>
                        <Box sx={{ ml: "auto", display: "flex", gap: 1 }}>
                          <Button
                            size="small"
                            onClick={() => addMemberToGroup(gr.id)}
                            sx={{
                              fontSize: "0.8rem",
                              height: "32px",
                              textTransform: "none",
                              color: "#fff",
                            }}
                          >
                            + add
                          </Button>
                        </Box>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 3,
                        }}
                      >
                        {gr.members.map((m, idx) => (
                          <MemberRow
                            key={m.id}
                            groupId={gr.id}
                            member={m}
                            updateField={updateMemberField}
                            remove={removeMember}
                            isFirst={idx === 0}
                          />
                        ))}
                      </Box>
                      <Divider
                        sx={{ mt: 2, borderColor: "rgba(255, 255, 255, 0.15)" }}
                      />
                    </Box>
                  ))}
                </>
              )}
            </LocalizationProvider>

            <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
              <Button
                onClick={() => addNewRoleGroup("New Role")}
                startIcon={<AddIcon />}
                sx={{
                  textTransform: "none",
                  color: "#fff",
                  borderColor: "rgba(255,255,255,0.12)",
                }}
                variant="outlined"
              >
                Add Role
              </Button>

              <Button
                onClick={() => {
                  const built = defaultLayout.flatMap((sectionBlock) =>
                    sectionBlock.roles.map((r) => ({
                      id: makeLocalId(),
                      section: sectionBlock.section,
                      role: r.role,
                      members: r.members.map(() => ({
                        id: makeLocalId(),
                        names: "",
                        start: null,
                        end: null,
                      })),
                    }))
                  );
                  setGroups(built);
                }}
                sx={{ textTransform: "none", color: "#fff" }}
                variant="text"
              >
                Reset
              </Button>
            </Box>
          </Paper>

          {/* RIGHT column */}
          <Paper
            elevation={0}
            sx={{
              flex: 0.7,
              p: 2,
              minHeight: 1080,
              backgroundColor: "transparent",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography
              sx={{
                fontSize: 12,
                letterSpacing: 4,
                color: "rgba(255,255,255,0.75)",
                mb: 1,
              }}
            >
              Event Notes
            </Typography>
            <TextField
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              multiline
              minRows={50}
              fullWidth
              placeholder="Event notes..."
              sx={{
                flex: 1.2,
                width: "50px",
                backgroundColor: "transparent",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(255,255,255,0.08)",
                },
                "& .MuiInputBase-input": {
                  color: "#fff",
                  fontSize: 13,
                  padding: 2,
                },
              }}
            />
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}
