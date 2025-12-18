import React from "react";
import PropTypes from "prop-types";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";

function NumberInputDecimal({
  value: controlledValue,
  onChange,
  id,
  label = "Price",
  error = false,
  size = "medium",
  ...other
}) {
  const [inputValue, setInputValue] = React.useState(() =>
    controlledValue != null && String(controlledValue).trim() !== ""
      ? String(controlledValue)
      : "0.00"
  );
  const [isFocused, setIsFocused] = React.useState(false);

  React.useEffect(() => {
    if (controlledValue == null) return;
    if (!isFocused) {
      setInputValue(String(controlledValue));
    }
  }, [controlledValue, isFocused]);

  const normalize = (v) => String(v ?? "").trim().replace(/,/g, ".");
  const isPartialNumeric = (v) => /^[0-9]*\.?[0-9]*$/.test(v);
  const formatTwo = (v) => {
    const raw = normalize(v);
    if (raw === "" || raw === ".") return "0.00";
    const num = Number(raw);
    if (!Number.isFinite(num)) return "0.00";
    return num.toFixed(2);
  };

  const handleRawChange = (event) => {
    const raw = event.target.value.replace(/,/g, ".");
    if (raw === "" || isPartialNumeric(raw)) {
      setInputValue(raw);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "e" || e.key === "E" || e.key === "+") {
      e.preventDefault();
    }
    if (e.key === "Enter") {
      const formatted = formatTwo(inputValue);
      setInputValue(formatted);
      onChange?.(formatted);
      e.currentTarget.blur?.();
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    const formatted = formatTwo(inputValue);
    setInputValue(formatted);
    onChange?.(formatted);
  };

  const handleFocus = () => setIsFocused(true);

  return (
    <FormControl variant="outlined" fullWidth size={size} error={error} {...other}>
      <InputLabel htmlFor={id}>{label}</InputLabel>

      <OutlinedInput
        id={id}
        label={label}
        value={inputValue}
        onChange={handleRawChange}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        onFocus={handleFocus}
        inputProps={{
          inputMode: "decimal",
          type: "text",
          pattern: "[0-9]*[.,]?[0-9]*",
        }}
       
        sx={{
          width: "100%",
          backgroundColor: "transparent",
          "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
            WebkitAppearance: "none",
            margin: 0,
          },
          "& input": {
            MozAppearance: "textfield",
            color: "#fff", 
          },
        }}
      />
    </FormControl>
  );
}

NumberInputDecimal.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  id: PropTypes.string,
  label: PropTypes.node,
  error: PropTypes.bool,
  size: PropTypes.oneOf(["small", "medium"]),
  currency: PropTypes.string,
};

export default NumberInputDecimal;
