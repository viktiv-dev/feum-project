import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/system";
import background from "../assets/images/background.gif";
import { loginUser } from "../services/userService";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/admin");
    }
  }, [navigate]);

  const handleLogin = async () => {
    console.log({ email, password });
    try {
      setError(false);
      setHelperText("");
      const user = await loginUser(email, password);
      console.log("Logged in user:", user);
      navigate("/admin");
    } catch (error) {
      console.error("Login failed:", error.message);
      setError(true);
      setHelperText("Email or password is wrong");
    }
  };
  return (
    <Box
      sx={{
        height: "100vh",
        bgcolor: "primary.main",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          height: "100vh",
          margin: 0,
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          mixBlendMode: "screen",
        }}
      ></Box>
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          my: "20vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "61px",
        }}
      >
        <Typography marginBottom="100px" color="secondary.main" variant="h4">
          FEUM ADMIN{" "}
        </Typography>
        <TextField
          label="Email"
          error={error}
          helperText={error ? helperText : ""}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></TextField>
        <TextField
          label="Password"
          error={error}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></TextField>
        <Button
          variant="outlined"
          disableElevation
          onClick={handleLogin}
          sx={{
            width: "200px",
          }}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default LoginPage;
