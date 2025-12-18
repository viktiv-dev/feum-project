import React, { useState, useMemo } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import NumberInputDecimal from "./NumberInputDecimal";

export default function ProductDialog({
  open,
  onClose,
  onSave,
  saving,
  initialData = null,
}) {
  const initialForm = useMemo(() => {
    if (!open) return { name: "", category: "", unit: "", volume_per_unit: "", for_sale: false, minimum_stock: ""};
    return {
      name: initialData?.name || "",
      category: initialData?.category || "",
      unit: initialData?.unit || "",
      volume_per_unit:
        initialData?.volume_per_unit != null
          ? String(initialData.volume_per_unit)
          : "",
      for_sale: initialData?.for_sale || false,
      minimum_stock: initialData?.minimum_stock || ""
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
      ...form,
      volume_per_unit: form.volume_per_unit
        ? parseFloat(form.volume_per_unit)
        : null,
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
      slotProps={{
        paper: { sx: { backgroundColor: "#111111" } },
      }}
    >
      <DialogTitle sx={{ mt: "1rem", fontSize: "1rem" }}>
        {isEdit ? "Edit product" : "Add product"}
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
          <TextField
            label="Category"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            fullWidth
            slotProps={{
              input: { sx: { backgroundColor: "transparent", width: "100%" } },
            }}
          />
          <TextField
            label="Unit"
            value={form.unit}
            onChange={(e) => setForm({ ...form, unit: e.target.value })}
            fullWidth
            slotProps={{
              input: { sx: { backgroundColor: "transparent", width: "100%" } },
            }}
          />
          <NumberInputDecimal
            value={form.volume_per_unit}
            onChange={(value) =>
              setForm({ ...form, volume_per_unit: value ?? "" })
            }
            label="Volume per Unit (ml)"
          />
          <NumberInputDecimal
            value={form.minimum_stock}
            onChange={(value) =>
              setForm({ ...form, minimum_stock: value ?? "" })
            }
            label="Minimum Stock"
          />
          <FormControlLabel sx={{ml: "0"}}
            control={
              <Checkbox
                checked={form.for_sale}
                onChange={(e) =>
                  setForm({ ...form, for_sale: e.target.checked })
                }
              />
            }
            label="For Sale?"
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
