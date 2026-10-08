import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { Typography, Grid, Drawer, Button, Box, Divider } from "@mui/material";
import UploadProspects from "../UploadProspects";
import { useAtom } from "jotai";
import { prospectUploadDialogStore } from "@store/ProspectStore";
import Styles from "./CSVProspect.module.css";
import { CSVLink } from "react-csv";
import data from "../../../../public/RapidClaimsProspects";

export default function CSVProspectUpload() {
  const [open, setOpen] = useAtom(prospectUploadDialogStore);
  const onClose = () => setOpen(false);

  return (
    <Drawer
      open={open}
      onClose={onClose}
      anchor={"right"}
      sx={{
        zIndex: 999900000,
        width: "auto", // Adjust to your preference
        "& .MuiDrawer-paper": {
          width: "auto", // Adjust to your preference
          maxWidth: "58rem", // Ensure it doesn't exceed the screen width
          boxSizing: "border-box",
          height: "100%",
        },
      }}
    >
      <Box
        sx={{
          maxWidth: "100%",
          height: "100%",
          overflowY: "auto",
        }}
      >
        <Grid
          container
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            width: "58rem",
            justifyContent: "space-between", // Align items to the start and end of the row
            mt: 3,
            mb: 1,
          }}
        >
          <Grid
            container
            sx={{
              pb: 3,
              borderBottom: "1px solid #0000001f"
            }}
            size={12}>
            <Grid container size={9}>
              <Typography
                variant="MainHeading"
                sx={{
                  alignItems: "left",
                  textAlign: "left",
                  marginLeft: "2rem",
                  fontWeight: "600",
                }}
              >
                Import Prospects from CSV File
              </Typography>
            </Grid>
            <Grid
              container
              sx={{
                justifyItems: "end",
                gap: 2,
                alignItems: "end"
              }}
              size={3}>
              <Button type="submit" variant="button1">
                Import
              </Button>
              <Button variant="button2" s onClick={onClose}>
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Grid>

        <Grid
          container
          spacing={3}
          sx={{ padding: "1.2rem", textTransform: "none" }}
        >
          <Grid
            size={{
              xs: 12,
              md: 6
            }}>
            <Box
              sx={{
                border: "1px solid", // Adjust border color and width as necessary
                borderColor: "divider",
                borderRadius: "8px", // Adjust border radius as necessary
                padding: "1rem",
                height: "100%",
              }}
            >
              <Typography variant="h6" gutterBottom>
                How to use our blank CSV Template
              </Typography>
              <Typography sx={{ marginTop: 3 }}>
                <span className={Styles.step_number}>STEP 1</span>
                <br />
                Download our Blank CSV template file.
              </Typography>
              <CSVLink
                data={data}
                filename={"my-file.csv"}
                className="btn btn-primary"
                target="_blank"
              >
                <Button
                  variant="contained"
                  sx={{
                    mt: 3,
                    mb: 2,
                    backgroundColor: "#ecfbfc",
                    boxShadow: "none",
                    color: "#525252", // Set text color to grey
                    "&:hover": {
                      backgroundColor: "#3B3BB6", // Change background color on hover
                      color: "#FFFFFF", // Change text color on hover
                    },
                    textTransform: "none",
                  }}
                  startIcon={<AddIcon />}
                >
                  Download Blank CSV
                </Button>
              </CSVLink>
              <Typography>
                <span className={Styles.step_number}>STEP 2</span>
                <br />
                Fill in your prospects' details in the respective columns.
              </Typography>
              <Typography>
                <span className={Styles.step_number}>STEP 3</span>
                <br />
                Save and upload your CSV below.
              </Typography>
            </Box>
          </Grid>

          <Grid
            size={{
              xs: 12,
              md: 6
            }}>
            <Box
              sx={{
                border: "1px solid", // Adjust border color and width as necessary
                borderColor: "divider",
                borderRadius: "8px", // Adjust border radius as necessary
                padding: "1rem",
                height: "100%",
              }}
            >
              <Typography variant="h6">
                How to import your existing CSV files
              </Typography>
              <Typography sx={{ marginTop: 3 }}>
                <span className={Styles.step_number}>STEP 1</span>
                <br />
                Open your existing CSV file with details of your prospects.
              </Typography>
              <Typography>
                <span className={Styles.step_number}>STEP 2</span>
                <br />
                To ensure compatibility with our system, make sure all columns
                in your CSV are titled exactly as follows:
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap", // allows items to wrap onto multiple lines if needed
                  alignItems: "center",
                  gap: "5px", // adjust the space between items as needed
                  margin: "0.5rem 0rem",
                  fontSize: "0.65rem",
                  fontWeight: "800",
                  color: "#757575",
                  fontFamily: "Figtree", // Set text color to grey
                  // space below the list
                }}
              >
                <Box>FULL NAME</Box>
                <Box component="li">EMAIL</Box>
                <Box component="li">INDUSTRY</Box>
                <Box component="li">COMPANY</Box>
                <Box component="li">DESIGNATION</Box>
              </Box>

              <Typography>
                <span className={Styles.step_number}>STEP 3</span>
                <br />
                Save and upload your CSV below.
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {/* File upload section */}
        {/* <Box
          sx={{
            textAlign: "center",
            marginTop: "4rem",
            border: "1px solid", // Adjust border color and width as necessary
            borderColor: "divider",
            borderRadius: "8px", // Adjust border radius as necessary
            marginInline: "2rem",
            height: "40%",
            width: "100%",
          }}
        >
          <input
            accept=".csv"
            id="contained-button-file"
            multiple
            type="file"
            style={{ display: "none" }} // Hide the default file input
          />
          <label htmlFor="contained-button-file">
            <Button
              variant="contained"
              component="span"
              sx={{
                mt: 10,
                mb: 2,
                backgroundColor: "#F2F2F2",
                color: "#757575", // Set text color to grey
                "&:hover": {
                  backgroundColor: "#3B3BB6", // Change background color on hover
                  color: "#FFFFFF", // Change text color on hover
                },
                textTransform: "none",
              }}
            >
              Browse File
            </Button>
          </label>
        </Box> */}

        <UploadProspects />
      </Box>
    </Drawer>
  );
}
