import React, { useState } from "react";
import {
  Button,
  CssBaseline,
  TextField,
  Box,
  Typography,
  Container,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import api from "@utils/api";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useSetAtom, useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import { tokenAtom, stepNumber,Email } from "../store/AuthStore";

const defaultTheme = createTheme();

const Signup = () => {
  const [step, setStep] = useAtom(stepNumber);
  const [emailofUser , setemail]=useAtom(Email);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastName] = useState("");
  const setToken = useSetAtom(tokenAtom);

  const navigate = useNavigate();

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    try {
      const payload = {
        email: data.get("email"),
        name: data.get("name"),
        lastname: data.get("lastname"),
        firstTimeLogin: true,
        role: 0,
      };

      const apiUrl = "api/signup";
      const response = await api.post(apiUrl, payload);

      if (response.status === 200) {
        setSnackbarMessage("Account created successfully");
        setStep(2);
        setemail(payload.email);
        setSnackbarOpen(true);
        setTimeout(() => {
          navigate("/login");
        }, [2000]);
      }
    } catch (error) {
      console.log(error)
      if (error.response && error.response.status === 402) {
        setSnackbarMessage("Account already exists. Please sign in.");
        setSnackbarSeverity("error");
      } else {
        setSnackbarMessage("Something went wrong. Please try again.");
        setSnackbarSeverity("error");
      }
      setSnackbarOpen(true);
    }
  };

  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={4000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <MuiAlert
              elevation={6}
              variant="filled"
              onClose={handleCloseSnackbar}
              severity={snackbarSeverity}
            >
              {snackbarMessage}
            </MuiAlert>
          </Snackbar>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              p: 4,
              mt: 10,
              backgroundColor: "white",
              borderRadius: 2,
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Typography id="title" component="h6" variant="h6" sx={{ mt: 4 }}>
              Create your account
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="First Name"
                name="name"
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                margin="normal"
                fullWidth
                id="lastname"
                label="Last Name"
                name="lastname"
                value={lastname}
                onChange={(e) => setLastName(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  backgroundColor: "#3B3BB6",
                  "&:hover": { backgroundColor: "#252f3e" },
                }}
              >
                Sign Up
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default Signup;
