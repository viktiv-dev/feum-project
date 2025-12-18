import React, { useState, useMemo } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
} from "@mui/material";
import NumberInputDecimal from "./NumberInputDecimal";

export default function DrinkDialog({
  open,
  onClose,
  onSave,
  saving,
  initialData = null,
  products = [], // list of products for dropdown (each item: { id, name, ... })
}) {
  // initial form derived only when dialog is opened
  const initialForm = useMemo(() => {
    if (!open)
      return {
        name: "",
        alcohol_product_id: "",
        alcohol_ml: "",
        mixer_product_id: "",
        mixer_ml: "",
      };
    return {
      name: initialData?.name || "",
      alcohol_product_id: initialData?.alcohol_product_id || "",
      alcohol_ml:
        initialData?.alcohol_ml != null ? String(initialData.alcohol_ml) : "",
      mixer_product_id: initialData?.mixer_product_id || "",
      mixer_ml:
        initialData?.mixer_ml != null ? String(initialData.mixer_ml) : "",
    };
  }, [open, initialData]);

  const [form, setForm] = useState(initialForm);

  React.useEffect(() => {
    if (open) setForm(initialForm);
  }, [open, initialForm]);

  const isEdit = Boolean(initialData?.id);

  function handleSubmit(e) {
    e.preventDefault();
    const payload = {
      name: form.name,
      alcohol_id: form.alcohol_product_id || null,
      alcohol_ml: form.alcohol_ml ? parseFloat(form.alcohol_ml) : null,
      mixer_id: form.mixer_product_id || null,
      mixer_ml: form.mixer_ml ? parseFloat(form.mixer_ml) : null,
    };

    if (isEdit) payload.id = initialData.id;
    onSave(payload);
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      slotProps={{ paper: { sx: { backgroundColor: "#111111" } } }}
    >
      <DialogTitle sx={{ mt: "1rem", fontSize: "1rem" }}>
        {isEdit ? "Edit drink" : "Add drink"}
      </DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent sx={{ display: "grid", gap: 2 }}>
          <TextField
            label="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            fullWidth
            slotProps={{
              input: { sx: { backgroundColor: "transparent", width: "100%" } },
            }}
          />

          <FormControl fullWidth>
            <InputLabel id="alcohol-select-label">Alcohol (product)</InputLabel>
            <Select
              labelId="alcohol-select-label"
              label="Alcohol (product)"
              value={form.alcohol_product_id}
              onChange={(e) =>
                setForm({ ...form, alcohol_product_id: e.target.value })
              }
              sx={{ backgroundColor: "transparent" }}
            >
              <MenuItem value="">— None —</MenuItem>
              {products.map((p) => (
                <MenuItem key={p.id} value={p.id}>
                  {p.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <NumberInputDecimal
            value={form.alcohol_ml}
            onChange={(v) => setForm({ ...form, alcohol_ml: v ?? "" })}
            label="Alcohol (ml)"
          />

          <FormControl fullWidth>
            <InputLabel id="mixer-select-label">Mixer (product)</InputLabel>
            <Select
              labelId="mixer-select-label"
              label="Mixer (product)"
              value={form.mixer_product_id}
              onChange={(e) =>
                setForm({ ...form, mixer_product_id: e.target.value })
              }
              sx={{ backgroundColor: "transparent" }}
            >
              <MenuItem value="">— None —</MenuItem>
              {products.map((p) => (
                <MenuItem key={p.id} value={p.id}>
                  {p.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <NumberInputDecimal
            value={form.mixer_ml}
            onChange={(v) => setForm({ ...form, mixer_ml: v ?? "" })}
            label="Mixer (ml)"
          />
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={onClose} disabled={saving}>
            Cancel
          </Button>
          <Button type="submit" disabled={saving} variant="contained">
            {saving ? "Saving..." : isEdit ? "Save changes" : "Save"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
