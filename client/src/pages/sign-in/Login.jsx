import React, { useState } from "react";
import { Box, Button, TextField, Typography, Link } from "@mui/material";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/userContext";
import authService from "../../services/auth.service";

const Login = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const { login } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Sign-in function to handle login API call
  const signInUser = async () => {
    try {
      if (!email || !password) {
        enqueueSnackbar("Please fill in all fields", { variant: "error" });
        return;
      }

      const result = await authService.loginUser({
        email,
        password,
      });

      if (result.data.success) {
        const { data } = result.data;
        console.log(data);
        login(data.user, data.token);
        navigate("/");
        enqueueSnackbar("Login successful!", { variant: "success" });
      } else {
        enqueueSnackbar(result.message || "Something went wrong", {
          variant: "error",
        });
      }

    } catch (error) {
      console.log(error, "error");
      enqueueSnackbar(error.message || "Something went wrong", {
        variant: "error",
      });
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 4,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "300px",
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Login
        </Typography>

        <TextField
          label="Email"
          variant="outlined"
          margin="normal"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          label="Password"
          type="password"
          variant="outlined"
          margin="normal"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={signInUser}
        >
          Login
        </Button>

        <Link href="/signup" underline="none" sx={{ mt: 2 }}>
          Don't have an account? Signup
        </Link>

        <Button variant="outlined" color="primary" fullWidth sx={{ mt: 2 }}>
          Login with Google
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
