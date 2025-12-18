import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  Alert,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import * as inventoryService from "../services/inventoryService";

export default function InventoryListPanel({ onAdd, onEdit, onView }) {
  const [inventories, setInventories] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    eventId: null,
    eventName: "",
  });

  useEffect(() => {
    fetchInventories();
  }, []);

  async function fetchInventories() {
    setLoading(true);
    setError(null);
    try {
      const data = await inventoryService.getInventories();
      const grouped = (Array.isArray(data) ? data : []).reduce((acc, inv) => {
        if (!acc[inv.event_name]) acc[inv.event_name] = [];
        acc[inv.event_name].push(inv);
        return acc;
      }, {});
      setInventories(grouped);
    } catch (err) {
      setError(err.message || "Failed to fetch inventories");
    } finally {
      setLoading(false);
    }
  }

  const handleDelete = async () => {
    try {
      await inventoryService.deleteInventoryByEvent(deleteDialog.eventId);
      setDeleteDialog({ open: false, eventId: null, eventName: "" });
      fetchInventories();
    } catch (err) {
      alert(err.message || "Failed to delete inventory");
    }
  };

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h4" sx={{ textTransform: "capitalize" }}>
          Inventories
        </Typography>
        <Button variant="contained" onClick={onAdd}>Add Inventory</Button>
      </Box>

      <Paper elevation={0} sx={{ p: 2, bgcolor: "transparent" }}>
        {loading && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <CircularProgress size={20} />
            <Typography>Loading inventories...</Typography>
          </Box>
        )}

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        {!loading && Object.keys(inventories).length === 0 && !error && (
          <Alert severity="info">No inventories yet.</Alert>
        )}

        {!loading && Object.keys(inventories).length > 0 && (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>Event Name</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }} align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.keys(inventories).map((eventName) => {
                  const evId = inventories[eventName][0].event_id;
                  return (
                    <TableRow key={eventName} hover>
                      <TableCell>{eventName}</TableCell>
                      <TableCell align="right">
                        <IconButton
                          onClick={() => {
                            console.debug("InventoryListPanel.view ->", { eventId: evId, eventName });
                            onView({ eventId: evId, eventName });
                          }}
                        >
                          <VisibilityIcon />
                        </IconButton>

                        <IconButton
                          onClick={() => {
                            console.debug("InventoryListPanel.edit ->", { eventId: evId, eventName });
                            onEdit({ eventId: evId, eventName });
                          }}
                        >
                          <EditIcon />
                        </IconButton>

                        <IconButton
                          onClick={() =>
                            setDeleteDialog({ open: true, eventId: evId, eventName })
                          }
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>

      <Dialog open={deleteDialog.open} onClose={() => setDeleteDialog({ open: false, eventId: null, eventName: "" })}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete the inventory for "{deleteDialog.eventName}"? This action cannot be undone.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog({ open: false, eventId: null, eventName: "" })}>Cancel</Button>
          <Button color="error" onClick={handleDelete}>Delete</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
