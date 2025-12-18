import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  CircularProgress,
  Alert,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import * as productService from "../services/productService";
import * as inventoryService from "../services/inventoryService";
import * as eventService from "../services/eventService";
import NumberField from "../components/NumberInput";
import BarSalesDialog from "./BarSalesDialog";

export default function InventoryFormPanel({
  mode = "create",
  eventId = null,
  eventName = null,
  onBack,
}) {
  const [inventoryRecords, setInventoryRecords] = useState([]);
  const [barSalesItems, setBarSalesItems] = useState([]);
  const [events, setEvents] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState(eventId);
  const [barSalesDialogOpen, setBarSalesDialogOpen] = useState(false);

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const isReadOnly = mode === "view";

  useEffect(() => {
    console.debug("InventoryFormPanel mounted/props changed:", {
      mode,
      eventId,
      eventName,
    });
    setSelectedEventId(eventId ?? null);

    if (mode === "create") {
      fetchProducts();
      loadEventsWithFilter();
    } else {
      fetchInventoryByEvent(eventId);
    }
  }, [mode, eventId]);

  async function fetchProducts() {
    setLoading(true);
    setError(null);
    try {
      const data = await productService.getProducts();
      const products = Array.isArray(data) ? data : [];

      setInventoryRecords(
        products.map((p) => ({
          product_id: p.id,
          name: p.name,
          volume_per_unit: p.volume_per_unit,
          stock_before_event: 0,
          minimum_stock: p.minimum_stock ?? 0,
          need_to_order: 0,
          ordered_actual: 0,
          storage_actual: 0,
          stock_after_event: 0,
          status_after_event: "",
        }))
      );
    } catch (err) {
      setError("Failed to fetch products");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function loadEventsWithFilter() {
    try {
      const invData = await inventoryService.getInventories();
      const usedEventIds = Array.isArray(invData)
        ? invData.map((i) => i.event_id)
        : [];

      const eventsData = await eventService.getEvents();
      const available = (Array.isArray(eventsData) ? eventsData : []).filter(
        (ev) => !usedEventIds.includes(ev.id)
      );

      setEvents(available);
    } catch (err) {
      console.error("Failed to load events or inventories", err);
    }
  }

  async function fetchInventoryByEvent(evId) {
    if (!evId) {
      console.debug(
        "fetchInventoryByEvent called with no evId -> clear records"
      );
      setInventoryRecords([]);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      console.debug("fetchInventoryByEvent calling service for id:", evId);
      const data = await inventoryService.getInventoryByEvent(evId);
      console.debug("fetchInventoryByEvent response:", data);

      const rows = Array.isArray(data) ? data : [];
      setInventoryRecords(
        rows.map((inv) => ({
          product_id: inv.product_id,
          name: inv.product_name,
          volume_per_unit: inv.volume_per_unit,
          stock_before_event: inv.current_stock,
          minimum_stock: inv.minimum_stock,
          need_to_order: inv.need_to_order,
          ordered_actual: inv.ordered_actual,
          storage_actual: inv.storage_actual,
          stock_after_event: inv.storage_after_event,
          status_after_event: inv.status_after_event || "",
        }))
      );
    } catch (err) {
      setError("Failed to load inventory");
      console.error(err);
      setInventoryRecords([]);
    } finally {
      setLoading(false);
    }
  }

  const handleChange = (index, field, value) => {
    if (isReadOnly) return;

    setInventoryRecords((prev) => {
      const rows = [...prev];
      const num = isNaN(value) || value === "" ? 0 : Number(value);

      rows[index][field] = num;

      const stock = rows[index].stock_before_event || 0;
      const ordered = rows[index].ordered_actual || 0;
      const minimum = rows[index].minimum_stock || 0;

      rows[index].need_to_order = Math.max(minimum - stock, 0);
      rows[index].storage_actual = stock + ordered;

      return rows;
    });
  };

  const handleSave = async () => {
    const targetEventId = selectedEventId;
    if (!targetEventId) {
      setError("Please select an event");
      return;
    }

    setSaving(true);
    setError(null);

    try {
      // prepare inventory payload
      const inventoryRows = inventoryRecords.map((rec) => ({
        product_id: rec.product_id,
        event_id: targetEventId,
        current_stock: rec.stock_before_event,
        minimum_stock: rec.minimum_stock,
        need_to_order: rec.need_to_order,
        ordered_actual: rec.ordered_actual,
        storage_actual: rec.storage_actual,
        storage_after_event: rec.stock_after_event,
        status_after_event: rec.status_after_event,
      }));

      // prepare bar sales payload
      const barSales = barSalesItems.map((it) => ({
        existingId: it.existingSaleId,
        type: it.type,
        product_id: it.type === "product" ? it.id : null,
        drink_id: it.type === "drink" ? it.id : null,
        quantity: it.amount,
      }));

      // send bulk save request
      await inventoryService.bulkSaveInventoryWithBarSales(
        targetEventId,
        inventoryRows,
        barSales
      );

      onBack();
    } catch (err) {
      console.error(err);
      setError(err?.message || "Failed to save inventory and bar sales");
    } finally {
      setSaving(false);
    }
  };

  function resolvedEventName() {
    if (mode !== "create") return eventName || "";
    const ev = events.find((e) => e.id === selectedEventId);
    return ev ? ev.name : "";
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 3,
        }}
      >
        <Typography variant="h4">
          {mode === "create" && "New Inventory"}
          {mode === "edit" && `Edit Inventory: ${eventName}`}
          {mode === "view" && `View Inventory: ${eventName}`}
        </Typography>

        <Box sx={{ display: "flex", gap: 1 }}>
          <Button onClick={onBack}>Back</Button>
          <Button
            variant="outlined"
            onClick={() => setBarSalesDialogOpen(true)}
            disabled={!selectedEventId}
            sx={{
              width: "180px",
            }}
          >
            Bar Sales
          </Button>
        </Box>
      </Box>

      <Paper elevation={0} sx={{ bgcolor: "transparent", p: 2 }}>
        {loading && <CircularProgress />}
        {error && <Alert severity="error">{error}</Alert>}

        {!loading && (
          <>
            {mode === "create" && (
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel id="inventory-select-event">
                  {events.length ? "Select Event" : "No events available"}
                </InputLabel>
                <Select
                  labelId="inventory-select-event"
                  label={events.length ? "Select Event" : "No events available"}
                  value={selectedEventId || ""}
                  disabled={events.length === 0}
                  onChange={(e) => {
                    setSelectedEventId(e.target.value);
                    console.debug(
                      "InventoryFormPanel selectedEventId set:",
                      e.target.value
                    );
                  }}
                >
                  {events.map((ev) => (
                    <MenuItem key={ev.id} value={ev.id}>
                      {ev.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Volume</TableCell>
                    <TableCell>Stock Before</TableCell>
                    <TableCell>Minimum</TableCell>
                    <TableCell>Need</TableCell>
                    <TableCell>Ordered</TableCell>
                    <TableCell>Storage</TableCell>
                    <TableCell>After</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {inventoryRecords.map((rec, idx) => (
                    <TableRow key={rec.product_id}>
                      <TableCell>{rec.name}</TableCell>
                      <TableCell>{rec.volume_per_unit}</TableCell>
                      <TableCell>
                        <NumberField
                          value={rec.stock_before_event}
                          disabled={isReadOnly}
                          onChange={(e) =>
                            handleChange(
                              idx,
                              "stock_before_event",
                              e.target.value
                            )
                          }
                        />
                      </TableCell>
                      <TableCell>{rec.minimum_stock}</TableCell>
                      <TableCell>{rec.need_to_order}</TableCell>
                      <TableCell>
                        <NumberField
                          value={rec.ordered_actual}
                          disabled={isReadOnly}
                          onChange={(e) =>
                            handleChange(idx, "ordered_actual", e.target.value)
                          }
                        />
                      </TableCell>
                      <TableCell>{rec.storage_actual}</TableCell>
                      <TableCell>
                        <NumberField
                          value={rec.stock_after_event}
                          disabled={isReadOnly}
                          onChange={(e) =>
                            handleChange(
                              idx,
                              "stock_after_event",
                              e.target.value
                            )
                          }
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {mode !== "view" && (
              <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
                <Button
                  variant="contained"
                  onClick={handleSave}
                  disabled={saving}
                >
                  {saving ? "Saving..." : "Save"}
                </Button>
              </Box>
            )}
          </>
        )}
      </Paper>

      <BarSalesDialog
        open={barSalesDialogOpen}
        eventId={selectedEventId}
        eventName={resolvedEventName()}
        items={barSalesItems}
        onChange={(items) => setBarSalesItems(items)}
        onClose={() => setBarSalesDialogOpen(false)}
      />
    </>
  );
}
