import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "#111111",
    },
    secondary: {
      main: "#ffffff",
    },
  },
  components: {
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          color: "white"
        }
      }
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: "#ffffff",
          "&.Mui-checked": {
            color: "#ffffff", 
          },
          "&:hover": {
            backgroundColor: "rgba(255,255,255,0.08)", 
          },
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          color: "#ffffff", 
          fontFamily: '"Helvetica Neue LT Std", Helvetica, Arial, sans-serif',
          fontSize: "14px",
          "& .MuiCheckbox-root": {
            padding: "4px",
          },
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          fontFamily: '"Helvetica Neue LT Std", Helvetica, Arial, sans-serif',
          fontSize: "16px",
          letterSpacing: "0.44em",
          fontWeight: 400,
          height: "40px",
          textTransform: "none",
          borderRadius: "0px",
          padding: "10px 20px",
          "&.Mui-selected": {
            backgroundColor: "#333",
            "&:hover": {
              backgroundColor: "#444",
            },
          },
          "&:hover": {
            backgroundColor: "#1a1a1a",
          },
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          color: "#ffffff",
          fontFamily: '"Helvetica Neue LT Std", Helvetica, Arial, sans-serif',
          fontSize: "16px",
          letterSpacing: "0.44em",
        },
      },
    },
    MuiPickersOutlinedInput: {
      styleOverrides: {
        root: {
          color: "#ffffff",
          backgroundColor: "#0e0e0eff",
          borderRadius: 0,
          fontSize: "14px",
          "& .MuiPickersOutlinedInput-notchedOutline": {
            borderColor: "#555",
            borderWidth: "2px",
          },
          "&:hover .MuiPickersOutlinedInput-notchedOutline": {
            borderColor: "#888",
            borderWidth: "2px",
          },
          "&.Mui-focused .MuiPickersOutlinedInput-notchedOutline": {
            borderColor: "#c7c7c7ff !important",
            borderWidth: "2px !important",
          },
          "& .MuiPickersInputBase-input": {
            color: "#ffffff",
          },
        },
        notchedOutline: {
          borderColor: "#555",
          borderWidth: "2px",
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: "#ffffff",
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          width: "356px",
          color: "#ffffff",
          fontSize: "14px",
          borderRadius: 0,
          backgroundColor: "#0e0e0eff",

          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#555",
            borderWidth: "2px",
          },

          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#888",
            borderWidth: "2px",
          },

          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#c7c7c7ff",
            borderWidth: "2px",
          },

          "& .MuiSelect-icon": {
            color: "#ffffff",
          },

          "& .MuiSelect-select": {
            color: "#ffffff",
            padding: "16.5px 14px",
            backgroundColor: "transparent",
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          width: "356px",
          color: "#ffffff",
          fontSize: "14px",
          borderRadius: 0,
          backgroundColor: "#0e0e0eff",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#555",
            borderWidth: "2px",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#888",
            borderWidth: "2px",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#c7c7c7ff",
            borderWidth: "2px",
          },
          "& .MuiIconButton-root": {
            color: "#ffffff",
          },
          "& .MuiInputBase-input": {
            color: "#ffffff",
          },
          "& input::placeholder": {
            color: "#ffffff",
            opacity: 1,
          },
          "& .MuiInputAdornment-root svg": {
            color: "#ffffff",
          },
          "& input:-webkit-autofill": {
            WebkitBoxShadow: "0 0 0px 1000px #0e0e0eff inset",
            WebkitTextFillColor: "#ffffff",
            caretColor: "#ffffff",
          },
        },
        notchedOutline: {
          borderColor: "#555",
          borderWidth: "2px",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#9a9a9a",
          fontSize: "14px",

          "&.Mui-focused": {
            color: "#c7c7c7ff",
          },

          "&.MuiInputLabel-shrink": {
            color: "#c7c7c7ff",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: '"Helvetica Neue LT Std", Helvetica, Arial, sans-serif',
          fontSize: "16px",
          letterSpacing: "0.44em",
          fontWeight: 400,
          height: "40px",
          textTransform: "none",
          borderRadius: "0px",
          padding: "10px 20px",
          borderWidth: "2px !important",
        },
        outlined: {
          color: "#ffffff",
          backgroundColor: "#0f0f0fff",
          borderColor: "#555",
          "&:hover": {
            backgroundColor: "#1a1a1a",
            borderColor: "#888",
          },
          "&.Mui-focused": {
            borderColor: "#c7c7c7ff",
          },
          "&.Mui-disabled": {
            color: "#666",
            borderColor: "#333",
            backgroundColor: "#313131ff",
          },
        },
        contained: {
          color: "#ffffff",
          backgroundColor: "transparent",
          boxShadow: "none",
          "&:hover": {
            backgroundColor: "transparent",
            boxShadow: "none",
            textDecoration: "underline",
          },
          "&.Mui-focused": {
            backgroundColor: "transparent",
          },
          "&.Mui-disabled": {
            backgroundColor: "transparent",
          },
          "&:active": {
            boxShadow: "none",
            backgroundColor: "transparent",
            textDecoration: "none",
          },
        },
      },
      defaultProps: {
        variant: "outlined",
      },
    },
    MuiPickersSectionList: {
      styleOverrides: {
        section: {
          color: "#ffffff",
          "&.Mui-selected": {
            backgroundColor: "#333",
            color: "#ffffff",
            borderRadius: "0px",
          },
        },
      },
    },
    MuiPickersInputBase: {
      styleOverrides: {
        root: {
          color: "#ffffff",
        },
        input: {
          color: "#ffffff",
          "&::placeholder": {
            color: "#ffffff",
          },
        },
      },
    },
  },
  typography: {
    fontFamily: '"Helvetica Neue LT Std", Helvetica, Arial, sans-serif',
    body2: {
      color: "#fff",
      letterSpacing: "0.18em"
    },
    h6: {
      fontSize: "0.875rem",
      fontWeight: 400,
      letterSpacing: "0.45em",
      lineHeight: "normal",
      color: "white",
    },
    h5: {
      fontSize: "1.9rem",
      fontWeight: 350,
      letterSpacing: "0.89em",
      lineHeight: "normal",
      color: "white",
    },
    h4: {
      fontSize: "3.25rem",
      fontWeight: 700,
      letterSpacing: "0.44em",
      lineHeight: "normal",
      color: "white",
    },
    h2: {
      fontSize: "3.75em",
      fontWeight: 900,
      letterSpacing: "0.41em",
      lineHeight: "normal",
      color: "white",
    },
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </StrictMode>
);
