import * as React from "react";
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
import { useState } from "react";
import { useLocation } from "react-router-dom";

const defaultTheme = createTheme();

const ResetPassword = () => {
  const useQuery = () => new URLSearchParams(useLocation().search);
  let query = useQuery();
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleCloseSnackbar = () => {
    // Close the snackbar
    setSnackbarOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    try {
      const payload = {
        token: query.get("token"),
        newPassword: data.get("password"),
      };

      console.log("payload", payload);

      const apiUrl = "api/reset-password/confirm";

      const response = await api.post(apiUrl, payload);

      console.log("res", response.data);

      if (response.status === 200) {
        window.open("/report", "_self");
      } else {
        setSnackbarOpen(true);
      }
    } catch (error) {
      setSnackbarOpen(true);
    }
  };

  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              p: 4,
              my: 10,
              backgroundColor: "white",
              borderRadius: 2,
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            <img
              style={{ paddingTop: "10px" }}
              width={80}
            />
            <Typography id="title" component="h7" variant="h7" sx={{ mt: 4 }}>
              Create your New Password
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
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="confirmpassword"
                label="Confirm Password"
                name="confirmpassword"
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor: "#3B3BB6" }}
              >
                Reset Password
              </Button>
            </Box>
            <Snackbar
              open={snackbarOpen}
              autoHideDuration={6000} // Adjust as needed
              onClose={handleCloseSnackbar}
            >
              <MuiAlert
                elevation={6}
                variant="filled"
                onClose={handleCloseSnackbar}
                severity="error"
              >
                Password could not be reset successfully
              </MuiAlert>
            </Snackbar>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default ResetPassword;
