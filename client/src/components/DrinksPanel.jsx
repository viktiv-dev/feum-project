import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import * as drinkService from "../services/drinkService"; // you need to implement this similar to productService
import * as productService from "../services/productService";
import DrinkDialog from "./DrinkDialog";

export default function DrinksPanel() {
  const [drinks, setDrinks] = useState([]);
  const [products, setProducts] = useState([]); // for dropdowns (alcohol / mixer)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editingDrink, setEditingDrink] = useState(null);

  useEffect(() => {
    fetchProducts();
    fetchDrinks();
  }, []);

  async function fetchProducts() {
    try {
      const data = await productService.getProducts();
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch products for selects", err);
      // products dropdown can be empty; we don't set top-level error for this fetch
    }
  }

  async function fetchDrinks() {
    setLoading(true);
    setError(null);
    try {
      const data = await drinkService.getDrinks();
      setDrinks(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || "Failed to fetch drinks");
    } finally {
      setLoading(false);
    }
  }

  function openCreateDialog() {
    setEditingDrink(null);
    setDialogOpen(true);
  }

  async function openEditDialog(drink) {
    try {
      setLoading(true);
      const fresh = await drinkService.getDrink(drink.id);
      setEditingDrink(fresh);
      setDialogOpen(true);
    } catch (err) {
      setError(err.message || "Failed to load drink");
    } finally {
      setLoading(false);
    }
  }

  function closeDialog() {
    setDialogOpen(false);
    setEditingDrink(null);
  }

  async function handleCreate(payload) {
    setSaving(true);
    setError(null);
    try {
      await drinkService.createDrink(payload);
      closeDialog();
      await fetchDrinks();
    } catch (err) {
      setError(err.message || "Failed to create drink");
      throw err;
    } finally {
      setSaving(false);
    }
  }

  async function handleUpdate(payload) {
    if (!payload.id) {
      setError("Missing drink id for update");
      throw new Error("Missing id");
    }
    setSaving(true);
    setError(null);
    try {
      await drinkService.updateDrink(payload.id, payload);
      closeDialog();
      await fetchDrinks();
    } catch (err) {
      setError(err.message || "Failed to update drink");
      throw err;
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(drink) {
    const confirmed = window.confirm(`Are you sure you want to delete "${drink.name}"?`);
    if (!confirmed) return;

    setLoading(true);
    setError(null);
    try {
      await drinkService.deleteDrink(drink.id);
      await fetchDrinks();
    } catch (err) {
      setError(err.message || "Failed to delete drink");
    } finally {
      setLoading(false);
    }
  }

  async function handleSave(payload) {
    try {
      if (payload.id) {
        await handleUpdate(payload);
      } else {
        await handleCreate(payload);
      }
    } catch (err) {
      console.error(err);
    }
  }

  
  function productNameById(id) {
    const p = products.find((x) => x.id === id);
    return p ? p.name : "-";
  }


  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h4" sx={{ textTransform: "capitalize" }}>drinks</Typography>
        <Button variant="contained" onClick={openCreateDialog}>Add Drink</Button>
      </Box>

      <Paper elevation={0} sx={{ p: 2, bgcolor: "transparent" }}>
        {loading && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <CircularProgress size={20} />
            <Typography>Loading drinks...</Typography>
          </Box>
        )}

        {error && (<Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>)}

        {!loading && drinks.length === 0 && !error && (<Alert severity="info">No drinks yet.</Alert>)}

        {!loading && drinks.length > 0 && (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Alcohol</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Alcohol (ml)</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Mixer</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Mixer (ml)</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }} align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {drinks.map((d) => (
                  <TableRow key={d.id} hover>
                    <TableCell>{d.name}</TableCell>
                    <TableCell>{productNameById(d.alcohol_id) || "-"}</TableCell>
                    <TableCell>{d.alcohol_ml ?? "-"}</TableCell>
                    <TableCell>{productNameById(d.mixer_id) || "-"}</TableCell>
                    <TableCell>{d.mixer_ml ?? "-"}</TableCell>
                    <TableCell align="right">
                      <IconButton size="small" onClick={() => openEditDialog(d)} aria-label={`Edit ${d.name}`}>
                        <EditIcon />
                      </IconButton>
                      <IconButton size="small" onClick={() => handleDelete(d)} aria-label={`Delete ${d.name}`}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>

      <DrinkDialog
        open={dialogOpen}
        onClose={closeDialog}
        initialData={editingDrink}
        onSave={handleSave}
        saving={saving}
        products={products} 
      />
    </>
  );
}
