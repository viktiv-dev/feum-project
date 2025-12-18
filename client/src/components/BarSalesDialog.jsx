// BarSalesDialog.jsx
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  CircularProgress,
  Alert,
  Box,
  Typography,
} from "@mui/material";
import NumberField from "../components/NumberInput";
import * as productService from "../services/productService";
import * as drinkService from "../services/drinkService";
import * as barSaleService from "../services/barSaleService";

export default function BarSalesDialog({ open, eventId, eventName, onClose }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (open) fetchItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, eventId]);

  // normalize backend response to array
  function normalizeToArray(resp) {
    if (!resp) return [];
    if (Array.isArray(resp)) return resp;
    if (resp.data && Array.isArray(resp.data)) return resp.data;
    if (resp.rows && Array.isArray(resp.rows)) return resp.rows;
    if (resp.result && Array.isArray(resp.result)) return resp.result;
    if (resp.body && Array.isArray(resp.body)) return resp.body;
    const firstArrayProp = Object.keys(resp).find((k) => Array.isArray(resp[k]));
    if (firstArrayProp) return resp[firstArrayProp];
    return [];
  }

  async function fetchItems() {
    if (!open) return;
    setLoading(true);
    setError(null);

    try {
      const [productsResp, drinksResp, existingResp] = await Promise.all([
        productService.getProducts(),
        drinkService.getDrinks(),
        eventId ? barSaleService.getBarSalesByEvent(eventId) : [],
      ]);

      const products = normalizeToArray(productsResp).filter((p) => p?.for_sale);
      const drinks = normalizeToArray(drinksResp);
      const existingSales = normalizeToArray(existingResp);

      const combinedMap = new Map();

      drinks.forEach((d) => {
        if (!d?.id) return;
        combinedMap.set(`drink:${d.id}`, {
          id: d.id,
          type: "drink",
          name: d.name || d.drink_name || `Drink ${d.id}`,
        });
      });

      products.forEach((p) => {
        if (!p?.id) return;
        combinedMap.set(`product:${p.id}`, {
          id: p.id,
          type: "product",
          name: p.name || p.product_name || `Product ${p.id}`,
        });
      });

      // add existing sales referencing missing items
      existingSales.forEach((s) => {
        if (!s) return;
        if (s.product_id && !combinedMap.has(`product:${s.product_id}`)) {
          combinedMap.set(`product:${s.product_id}`, {
            id: s.product_id,
            type: "product",
            name: s.product_name || `Product ${s.product_id}`,
          });
        }
        if (s.drink_id && !combinedMap.has(`drink:${s.drink_id}`)) {
          combinedMap.set(`drink:${s.drink_id}`, {
            id: s.drink_id,
            type: "drink",
            name: s.drink_name || `Drink ${s.drink_id}`,
          });
        }
      });

      const combined = Array.from(combinedMap.values());

      const mapped = combined.map((it) => {
        const sale = existingSales.find(
          (s) =>
            (it.type === "product" && s.product_id === it.id) ||
            (it.type === "drink" && s.drink_id === it.id)
        );
        return {
          id: it.id,
          type: it.type,
          name: it.name,
          amount: sale ? Number(sale.quantity) : 0,
          existingSaleId: sale ? sale.id : null,
        };
      });

      mapped.sort((a, b) => {
        if (a.type === b.type) return (a.name || "").localeCompare(b.name || "");
        return a.type === "drink" ? -1 : 1;
      });

      setItems(mapped);
    } catch (err) {
      console.error("BarSalesDialog.fetchItems error:", err);
      setError("Failed to load bar sales items");
      setItems([]);
    } finally {
      setLoading(false);
    }
  }

  function handleChange(index, value) {
    const parsed = value === "" || isNaN(value) ? 0 : Number(value);
    setItems((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], amount: parsed };
      return copy;
    });
  }

  async function handleSave() {
    if (!eventId) {
      setError("Please select an event before saving bar sales.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const existingResp = await barSaleService.getBarSalesByEvent(eventId);
      const existingSales = normalizeToArray(existingResp);

      for (const it of items) {
        const existing = existingSales.find(
          (s) =>
            (it.type === "product" && s.product_id === it.id) ||
            (it.type === "drink" && s.drink_id === it.id)
        );

        if (existing) {
          if (it.amount > 0) {
            if (Number(existing.quantity) !== Number(it.amount)) {
              await barSaleService.updateBarSale(existing.id, { quantity: it.amount });
            }
          } else {
            await barSaleService.deleteBarSale(existing.id);
          }
        } else if (it.amount > 0) {
          await barSaleService.createBarSale({
            product_id: it.type === "product" ? it.id : null,
            drink_id: it.type === "drink" ? it.id : null,
            event_id: eventId,
            quantity: it.amount,
          });
        }
      }

      onClose();
    } catch (err) {
      console.error("BarSalesDialog.handleSave error:", err);
      setError(err?.message || "Failed to save bar sales");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog
      slotProps={{ paper: { sx: { backgroundColor: "#111111" } } }}
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography>Bar Sales — {eventName || eventId || "(no event selected)"}</Typography>
        </Box>
      </DialogTitle>

      <DialogContent dividers>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : !items.length ? (
          <Alert severity="info">No drinks or for-sale products found.</Alert>
        ) : (
          <TableContainer elevation={0} sx={{ bgcolor: "transparent" }} component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Type</TableCell>
                  <TableCell sx={{ fontWeight: "bold", width: 160, textAlign: "right" }}>Quantity Sold</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map((item, idx) => (
                  <TableRow key={`${item.type}-${item.id}`}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.type}</TableCell>
                    <TableCell>
                      <Box sx={{ width: 160 }}>
                        <NumberField
                          value={item.amount}
                          min={0}
                          onChange={(e) => handleChange(idx, e.target.value)}
                          size="small"
                        />
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} disabled={loading}>Close</Button>
        <Button onClick={handleSave} disabled={loading || !eventId} variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
