import React, { useState } from "react";
import { Typography, Grid, Drawer, Button, Box, Divider } from "@mui/material";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutlined";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  campaignDialogStore,
  campaignGuidlineStore,
  campaignId,
  campaignStore,
  prospectStore,
} from "@store/ProspectStore";
import api from "@utils/api";
import { useParams } from "react-router-dom";

// const campaigns = [
//   {
//     date: "11 March, 2024",
//     prospects: 182,
//     theme:
//       "Introducing the Electronic Health Records (EHR) product to Private Hospitals",
//     product: "Electronic Health Records",
//     industry: "Private Hospitals",
//   },
//   {
//     date: "4 March, 2024",
//     prospects: 63,
//     theme: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
//     product: "Electronic Health Records",
//     industry: "Private Hospitals",
//   },
//   {
//     date: "27 February, 2024",
//     prospects: 12,
//     theme:
//       "Curabitur eros ipsum, iaculis et condimentum faucibus, gravida sed dolor, fusce ante justo",
//     product: "Electronic Health Records",
//     industry: "Private Hospitals",
//   },
// ];

const cellStyle = {
  border: 1,
  borderColor: "divider",
  borderRadius: 1,
  boxShadow: "0 0 0 8px white", // adjust the white space around the cell
};

export default function CSVProspectPrevUpload() {
  let { companyId } = useParams();
  const [selectedRows, setSelectedRows] = useState([]);
  const [open, setOpen] = useAtom(campaignDialogStore);
  const campaigns = useAtomValue(campaignStore);
  const setCampaignDialog = useSetAtom(campaignDialogStore);
  const setCampaignId = useSetAtom(campaignId);
  const setPrsopectList = useSetAtom(prospectStore);
  const guidelines = useAtomValue(campaignGuidlineStore);

  const onClose = () => setOpen(false);

  const handleRowClick = (campaign) => {
    const isExist = selectedRows.find(
      (row) => row.campaignId === campaign.campaignId
    );
    if (isExist) {
      setSelectedRows(
        selectedRows.filter((row) => row.campaignId !== campaign.campaignId)
      );
    } else {
      setSelectedRows([...selectedRows, campaign]);
    }
  };

  const handleImport = async () => {
    const selectedCampaignIds = selectedRows.map((row) => row.campaignId);

    const apiUrl = `/campaign/campaignProspects`;
    // const apiUrl = `/api/proxy?endpoint=${endpoint}`;
    const apiRes = await api.post(apiUrl, {
      campaignIds: selectedCampaignIds,
      companyId,
      ...guidelines,
    });
    const { data } = apiRes;
    const updatedProspectList = data.prospects.map((prospect, index) => {
      return {
        key: prospect._id,
        prospectname: prospect.name,
        email: prospect.email,
        // role: prospect.title,
        // company: prospect.companyName,
        // designation: prospect.title,
        prospectId: prospect._id,
        // industry: prospect.industry,
      };
    });
    setPrsopectList(updatedProspectList);
    setCampaignId(data.campaignId);
    setCampaignDialog(false);

    onClose();
  };

  return (
    <Drawer
      open={open}
      onClose={onClose}
      anchor={"right"}
      sx={{
        zIndex: 10000000000000,

        width: "auto", // Adjust to your preference
        "& .MuiDrawer-paper": {
          width: "900px", // Adjust to your preference
          maxWidth: "60%", // Ensure it doesn't exceed the screen width
          boxSizing: "border-box",
          height: "100%",
        },
      }}
    >
      <Box
        sx={{
          maxWidth: "900px",
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
            // width: "60rem",
            justifyContent: "space-between", // Align items to the start and end of the row
            mt: 4,
            paddingRight: "1rem", // Add padding to the right to separate buttons from the title
          }}
        >
          <Grid container size={9}>
            <Typography
              
              variant="MainHeading"
              sx={{
                alignItems: "left",
                textAlign: "left",
                paddingLeft: "2rem",
              }}
            >
              Import Prospects from Previous Campaigns
            </Typography>
          </Grid>
          <Grid
            container
            sx={{
              gap: 2,
              alignItems: "end"
            }}
            size={3}>
            <Button
              onClick={handleImport}
              variant="button1"
              
            >
              Import
            </Button>
            <Button
              variant="button2"
             
              onClick={onClose}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
        <Divider sx={{ mt: 2 }} />
        <Box
          sx={{
            display: "flex",
            alignItems: "center", // This centers vertically
            justifyContent: "left", // This centers horizontally
            height: "10%",
            textAlign: "center",
            marginLeft: "2rem",
          }}
        >
          <Typography component="h7" variant="h7">
            MOST-RECENT FIRST
          </Typography>
        </Box>

        <Divider />
        <TableContainer
          component={Paper}
          elevation={2}
          sx={{ mt: 2, marginInline: 3, borderRadius: 4 }}
        >
          <Table aria-label="campaigns table">
            <TableBody>
              {campaigns.map((campaign, index) => (
                <TableRow
                  key={index}
                  sx={{
                    "&:not(:last-child)": { marginBottom: 20 },
                    cursor: "pointer",
                  }}
                  onClick={() => handleRowClick(campaign)}
                >
                  <TableCell>
                    <Typography
                      component="h6"
                      variant="h6"
                      sx={{
                        color: "text.secondary"
                      }}
                    >
                      {campaign.date}
                    </Typography>
                    {selectedRows.find(
                      (row) => row.campaignId === campaign.campaignId
                    ) && <CheckCircleOutlineIcon color="success" />}
                  </TableCell>

                  <TableCell align="left" sx={cellStyle}>
                    <Typography
                      component="h7"
                      variant="h6"
                      sx={{
                        color: "text.primary"
                      }}
                    >
                      {campaign.prospects}
                    </Typography>
                    <Typography sx={{
                      color: "text.secondary"
                    }}>Prospects</Typography>
                  </TableCell>
                  <TableCell
                    sx={{ ...cellStyle, "&:last-child": { boxShadow: "none" } }}
                  >
                    <Grid container>
                      <Grid container size={2}>
                        <Typography sx={{
                          color: "text.secondary"
                        }}>THEME</Typography>
                      </Grid>

                      <Grid container size={10}>
                        <Typography sx={{
                          color: "text.primary"
                        }}>
                          {campaign.theme}
                        </Typography>
                      </Grid>
                    </Grid>

                    <Grid container>
                      <Grid container size={2}>
                        <Typography sx={{
                          color: "text.secondary"
                        }}>PRODUCT</Typography>
                      </Grid>

                      <Grid container size={10}>
                        <Typography sx={{
                          color: "text.primary"
                        }}>
                          {campaign.product}
                        </Typography>
                      </Grid>
                    </Grid>

                    <Grid container>
                      <Grid container size={2}>
                        <Typography sx={{
                          color: "text.secondary"
                        }}>INDUSTRY</Typography>
                      </Grid>

                      <Grid container size={10}>
                        <Typography sx={{
                          color: "text.primary"
                        }}>
                          {campaign.industry}
                        </Typography>
                      </Grid>
                    </Grid>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Drawer>
  );
}
