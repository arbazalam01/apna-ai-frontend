import * as React from "react";
import {
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  IconButton,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import api from "@utils/api";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useState } from "react";

const defaultTheme = createTheme();

const ForgotPassword = () => {
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
        email: data.get("email"),
      };

      const apiUrl = "api/reset-password/request";

      const response = await api.post(apiUrl, payload);

      if (response.status === 200) {
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
            <Grid container>
              <Grid item xs component="h4" variant="h4">
                <IconButton
                  type="submit"
                  sx={{ alignSelf: "flex-end" }}
                  href="/"
                >
                  <ArrowBackIosIcon />
                </IconButton>
                Back to Login
              </Grid>
              <img
                style={{ paddingTop: "10px" }}
                width={80}
              />
            </Grid>

            <Typography
              id="title"
              component="h7"
              variant="h7"
              sx={{ mt: 4, mx: 2, alignItems: "center", textAlign: "center" }}
            >
              Enter the Email Address associated with your account.
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
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor: "#3B3BB6" }}
              >
                Send Verification Email
              </Button>
              <Grid
                container
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography
                  id="title"
                  component="h7"
                  variant="h7"
                  sx={{ mt: 4, mx: 2, alignItems: "center" }}
                >
                  {"Don’t have access to your email anymore?"}
                </Typography>
                <Link href="#" sx={{ textColor: "primary", mt: 2 }}>
                  {"Contact our Team"}
                </Link>
              </Grid>
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
                Email is not available in our records
              </MuiAlert>
            </Snackbar>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default ForgotPassword;
