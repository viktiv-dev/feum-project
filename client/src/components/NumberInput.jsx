import React from "react";
import PropTypes from "prop-types";
import { NumberField as BaseNumberField } from "@base-ui-components/react/number-field";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormHelperText,
} from "@mui/material";

export default function NumberField({
  id: idProp,
  label,
  error,
  size = "medium",
  ...other
}) {
  const generatedId = React.useId();
  const id = idProp || generatedId;

  return (
    <BaseNumberField.Root {...other}>
      <FormControl size={size} variant="outlined" error={error} fullWidth>
        <InputLabel htmlFor={id}>{label}</InputLabel>
        <BaseNumberField.Input
          id={id}
          render={(props, state) => (
            <OutlinedInput
              label={label}
              value={state.inputValue}
              onChange={props.onChange}
              inputRef={props.ref}
              disabled={other.disabled} // still control disabled
              inputProps={{
                inputMode: "decimal",
                type: "text",
                pattern: "[0-9]*[.,]?[0-9]*",
              }}
              sx={{
                width: "100%",
                backgroundColor: "transparent",
                color: "#fff", // always white text
                "& input": {
                  color: "#fff", // ensure input text stays white
                  MozAppearance: "textfield",
                },
                "& input:disabled": {
                  WebkitTextFillColor: "#fff", // forces white text on Chrome/Safari
                  color: "#fff", // ensures Firefox respects white
                  opacity: 1, // remove default opacity
                },
                "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                  {
                    WebkitAppearance: "none",
                    margin: 0,
                  },
              }}
            />
          )}
        />
      </FormControl>
    </BaseNumberField.Root>
  );
}

NumberField.propTypes = {
  error: PropTypes.bool,
  id: PropTypes.string,
  label: PropTypes.node,
  size: PropTypes.oneOf(["medium", "small"]),
};
