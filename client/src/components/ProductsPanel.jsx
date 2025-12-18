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
import DeleteIcon from '@mui/icons-material/Delete';
import * as productService from "../services/productService";
import ProductDialog from "./ProductDialog";

export default function ProductsPanel() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    setLoading(true);
    setError(null);
    try {
      const data = await productService.getProducts();
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(product) {
    const confirmed = window.confirm(`Are you sure you want to delete "${product.name}"?`);
    if (!confirmed) return;

    setLoading(true);
    setError(null);
    try {
      await productService.deleteProduct(product.id);
      await fetchProducts();
    } catch (error) {
      setError(error.message || "Failed to delete product");
    } finally {
      setLoading(false);
    }
  }

  function openCreateDialog() {
    setEditingProduct(null);
    setDialogOpen(true);
  }

  async function openEditDialog(product) {
    try {
      setLoading(true);
      const fresh = await productService.getProduct(product.id); 
      setEditingProduct(fresh);
      setDialogOpen(true);
    } catch (err) {
      setError(err.message || "Failed to load product");
    } finally {
      setLoading(false);
    }
  }

  function closeDialog() {
    setDialogOpen(false);
    setEditingProduct(null);
  }

  async function handleCreate(payload) {
    setSaving(true);
    setError(null);
    try {
      const created = await productService.createProduct(payload);
      closeDialog();
      await fetchProducts();
      return created;
    } catch (err) {
      setError(err.message || "Failed to create product");
      throw err;
    } finally {
      setSaving(false);
    }
  }

  async function handleUpdate(payload) {
    if (!payload.id) {
      setError("Missing product id for update");
      throw new Error("Missing id");
    }
    setSaving(true);
    setError(null);
    try {
      const updated = await productService.updateProduct(payload.id, payload);
      closeDialog();
      await fetchProducts();
      return updated;
    } catch (err) {
      setError(err.message || "Failed to update product");
      throw err;
    } finally {
      setSaving(false);
    }
  }

  async function handleSave(payload) {
    try {
      if (payload.id) {
        await handleUpdate(payload);
      } else {
        await handleCreate(payload);
      }
    } catch (error) {
      console.log(error);
    }
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
        <Typography variant="h4" sx={{ textTransform: "capitalize" }}>
          products
        </Typography>
        <Button variant="contained" onClick={openCreateDialog}>
          Add Product
        </Button>
      </Box>

      <Paper elevation={0} sx={{ p: 2, bgcolor:"transparent" }}>
        {loading && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <CircularProgress size={20} />
            <Typography>Loading products...</Typography>
          </Box>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {!loading && products.length === 0 && !error && (
          <Alert severity="info">No products yet.</Alert>
        )}

        {!loading && products.length > 0 && (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Category</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Unit</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Volume (ml)</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Minimum in Stock</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>For Sale?</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }} align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((p) => (
                  <TableRow key={p.id} hover>
                    <TableCell>{p.name}</TableCell>
                    <TableCell>{p.category || "-"}</TableCell>
                    <TableCell>{p.unit || "-"}</TableCell>
                    <TableCell>{p.volume_per_unit ?? "-"}</TableCell>
                    <TableCell>{p.minimum_stock ?? "-"}</TableCell>
                    <TableCell>{p.for_sale ? "Yes" : "No"}</TableCell>
                    <TableCell align="right">
                      <IconButton
                        size="small"
                        onClick={() => openEditDialog(p)}
                        aria-label={`Edit ${p.name}`}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleDelete(p)}
                        aria-label={`Delete ${p.name}`}
                      >
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

      <ProductDialog
        open={dialogOpen}
        onClose={closeDialog}
        initialData={editingProduct}
        onSave={handleSave}
        saving={saving}
      />
    </>
  );
}
