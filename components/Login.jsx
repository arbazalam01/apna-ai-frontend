import React, { useState, useRef } from "react";
import {
  Button,
  CssBaseline,
  TextField,
  Box,
  Typography,
  Container,
  Snackbar,
  Grid,
  Link,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import api from "@utils/api";
import { useNavigate } from "react-router-dom";
import { addTokenToAxios } from "../utils/api";
import { useAtom, useSetAtom } from "jotai";
import { isAuthenticatedAtom, tokenAtom } from "../store/AuthStore";
import { stepNumber, Email } from "../store/AuthStore";
const defaultTheme = createTheme();

const Login = () => {
  const [step, setStep] = useAtom(stepNumber);
  const [email, setEmail] = useAtom(Email);
  const [otpDigits, setOtpDigits] = useState(["", "", "", "", "", ""]); // Assuming a 6-digit OTP
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("error");
  const setToken = useSetAtom(tokenAtom);

  const navigate = useNavigate();
  const otpInputsRef = useRef([]);

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleSendOtp = async (event) => {
    event.preventDefault();
    try {
      const response = await api.post(
        "/api/sendotp",
        { email },
        { withCredentials: true }
      );

      if (response.status === 200) {
        setSnackbarSeverity("success");
        setSnackbarMessage("OTP sent successfully");
        setStep(2); // Move to step 2 (OTP input)
      } else {
        setSnackbarSeverity("error");
        setSnackbarMessage("Failed to send OTP. Try again.");
      }
    } catch (error) {
      setSnackbarMessage("Failed to send OTP. Try again.");
      setSnackbarSeverity("error");
    }
    setSnackbarOpen(true);
  };

  const handleOtpChange = (index, event) => {
    const value = event.target.value;
    if (/^\d*$/.test(value)) {
      const newOtpDigits = [...otpDigits];
      newOtpDigits[index] = value;
      setOtpDigits(newOtpDigits);

      // Move focus to next input
      if (value && index < otpDigits.length - 1) {
        otpInputsRef.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && !otpDigits[index] && index > 0) {
      otpInputsRef.current[index - 1].focus();
    }
  };

  const handleOtpLogin = async (event) => {
    event.preventDefault();
    const otp = otpDigits.join("");
    try {
      const response = await api.post(
        "/api/signin",
        { email, otp },
        { withCredentials: true }
      );

      if (response.status === 200) {
        // Login success: save token and navigate
        const authToken = response.data.token;
        document.cookie = `token=${authToken}; path=/;`; // Set path to /
        setToken(authToken); // Update token atom
        addTokenToAxios(authToken); // Add token to axios headers

        // Navigate based on user role and first-time login
        if (response.data.user.role === 1) {
          setStep(1);
          navigate("/admindashboard");
        } else if (response.data.user.firstTimeLogin) {
          navigate("/addcompany");
        } else {
          navigate(`/${response.data.user.companyId}/overview`);
        }
      } else {
        setSnackbarMessage("Invalid OTP. Try again.");
        setSnackbarSeverity("error");
      }
    } catch (error) {
      setSnackbarMessage("Login failed. Please check your OTP and try again.");
      setSnackbarSeverity("error");
    }
    setSnackbarOpen(true);
  };

  return (
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
            mt: 20,
            backgroundColor: "white",
            borderRadius: 2,
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          {step === 1 ? (
            <Typography id="title" component="h6" variant="h6" sx={{ mt: 4 }}>
              Log into your account
            </Typography>
          ) : (
            ""
          )}
          {step === 1 ? (
            <Box
              component="form"
              onSubmit={handleSendOtp}
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
                Request OTP
              </Button>
            </Box>
          ) : (
            <Box
              component="form"
              onSubmit={handleOtpLogin}
              noValidate
              sx={{ mt: 1 }}
            >
              <Typography variant="body1" sx={{ m: 2, align: "center" }}>
                Enter the 6-digit OTP sent to your email
              </Typography>
              <Grid container spacing={1} sx={{
                justifyContent: "center"
              }}>
                {otpDigits.map((digit, index) => (
                  <Grid key={index} size={2}>
                    <TextField
                      inputRef={(el) => (otpInputsRef.current[index] = el)}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      autoFocus={index === 0}
                      slotProps={{
                        htmlInput: {
                          maxLength: 1,
                          style: { textAlign: "center", fontSize: "1.5rem" },
                        }
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
              <Button
                type="submit"
                fullWidth
                sx={{
                  color: "#fff",
                  mt: 3,
                  mb: 2,
                  backgroundColor: "#3B3BB6",
                  "&:hover": { backgroundColor: "#252f3e" },
                }}
              >
                Log In
              </Button>
              <Grid sx={{ marginTop: "0.5rem" }}>
                <Link
                  component="button"
                  variant="body2"
                  style={{ color: "#3B3BB6", textDecoration: "none" }}
                  onClick={handleSendOtp}
                >
                  Resend OTP
                </Link>
              </Grid>
            </Box>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
