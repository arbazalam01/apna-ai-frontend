import React, { useEffect, useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Divider,
  Box,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import NewGenerateEmail from "../NewGenerateEmail";
import { campaignId } from "@store/ProspectStore";
import { useAtomValue } from "jotai";
import api from "@utils/api";
import { IconChevronRight } from "@tabler/icons-react";

const PreviewEmailCampaign = () => {
  const [selectedProspect, setSelectedProspect] = useState(null);
  const [prospects, setProspects] = useState([]);
  const [emailTemplates, setEmailTemplates] = useState({
    subject: "",
    body: "",
  });
  const campaign_id = useAtomValue(campaignId);
  // const campaign_id = "662fa63ac69bfad14c93a734";

  const handleListItemClick = (event, prospect) => {
    setSelectedProspect(prospect);
    setEmailTemplates({
      subject: prospect["Subject"],
      body: prospect["Body"],
    });
  };

  // Get the current email template based on the selected prospect
  // const currentEmail = emailTemplates[selectedProspect] || {
  //   subject: "",
  //   body: "",
  // };

  const fetchProspects = async () => {
    try {
      const apiUrl = `/campaign/campaignEmailJson?campaignId=${campaign_id}`;
      // const apiUrl = `/api/proxy?endpoint=${endpoint}`;
      const apiRes = await api.get(apiUrl);
      const { data } = apiRes;
      setProspects(data);
    } catch (err) {
      console.error(err);
      setProspects([]);
    }
  };

  useEffect(() => {
    fetchProspects();
  }, [campaignId]);

  return (
    <Box display="flex" sx={{ pt: 2 }}>
      <Divider />
      <Box width="20%" bgcolor="background.paper">
        <Typography
          // variant="h6"
          // p={1}
          // ml={}
          sx={{
            backgroundColor: "#F2F2F2",
            fontSize: "0.9rem",
            fontWeight: "600",
            padding: "0.8rem 1.5rem",
          }}
          color="text.secondary"
        >
          PROSPECT NAME
        </Typography>
        <Divider sx={{ height: "0px", margin: "0px", padding: "0px" }} />
        <List>
          {prospects.map((prospect, index) => (
            <>
              <Box key={prospect} pr={2}>
                <ListItem
                  p={0}
                  m={0}
                  button
                  selected={selectedProspect === prospect}
                  onClick={(event) => handleListItemClick(event, prospect)}
                >
                  <ListItemText
                    primary={prospect["Name"]}
                    secondary={`${prospect["Title"]}, ${prospect["Company"]}`}
                  />
                  <IconChevronRight fontSize={"large"} />
                </ListItem>
              </Box>
              <Divider />
            </>
          ))}
        </List>
        {/* <Button
              type="submit"
              variant="contained"
              sx={{
                m: 2,
                mt:'80%',
                backgroundColor: "#3B3BB6",
                borderRadius:1,
              
                textTransform: "none",
              }}
            >
              Export All
            </Button> */}
        <NewGenerateEmail />
      </Box>

      <Divider orientation="vertical" flexItem />
      <Box width="80%">
        <Typography
          component="div"
          p={1}
          color="text.secondary"
          sx={{
            backgroundColor: "#F2F2F2",
            fontSize: "0.9rem",
            fontWeight: "600",
            padding: "0.8rem 2rem",
          }}
        >
          EMAIL SUBJECT & BODY
        </Typography>
        <Divider />
        <Box sx={{ ml: 4 }}>
          <TextField
            fullWidth
            variant="standard"
            label="Email Subject"
            margin="normal"
            InputProps={{
              disableUnderline: true,
            }}
            value={emailTemplates.subject}
          />
          <TextField
            fullWidth
            variant="standard"
            label="Email Body"
            margin="normal"
            InputProps={{
              disableUnderline: true,
            }}
            multiline
            rows={10}
            value={emailTemplates.body}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default PreviewEmailCampaign;
