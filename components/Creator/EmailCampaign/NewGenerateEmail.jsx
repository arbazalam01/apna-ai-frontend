import { Box, Button, Stack } from "@mui/material";
import React from "react";
import api from "@utils/api";
import { useAtomValue } from "jotai";
import { campaignId } from "@store/ProspectStore";

const NewGenerateEmail = () => {
  const campaign_id = useAtomValue(campaignId);
  const downloadEmails = async () => {
    // const endpoint = `campaign/downloadEmails?campaignId=${campaign_id}`;
    const apiUrl = `campaign/downloadEmails?campaignId=${campaign_id}`;
    const apiRes = await api.get(apiUrl);
    const blob = new Blob([apiRes.data], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const elem = document.createElement("a");
    elem.href = url;
    elem.download = "emails.csv";
    elem.click();
  };

  // Function to convert CSV row to payload format
  const convertRowToPayload = (row) => {
    const [name, title, company, email, subject, body] = row.split(",");
    return {
      email: email,
      properties: [
        { property: "firstname", value: name.split(" ")[0] },
        { property: "lastname", value: name.split(" ")[1] },
        // { property: 'jobtitle', value: title },
        { property: "company", value: company },
        // { property: 'subject', value: subject },
        // { property: 'body', value: body },
      ],
    };
  };

  const exportToHubspot = async () => {
    const apiUrl = `campaign/downloadEmails?campaignId=${`6607abe24ef90b46c1c803a2`}`;
    // const apiUrl = `/api/proxy?endpoint=${endpoint}`;
    const apiRes = await api.get(apiUrl);

    const rows = apiRes.data.split("\n").slice(1);

    const payload = rows
      .filter((row) => row.trim().length)
      .map((row) => convertRowToPayload(row));

    const endpoint1 = `customer/createcontactlist`;
    const apiUrl1 = `/api/proxy?endpoint=${endpoint1}`;
    const apiRes1 = await axios.post(apiUrl1, {
      payload: payload,
    });
    console.log(apiRes1.data);
  };

  return (
    <Box pt={2}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Button
          variant="button1"
          onClick={downloadEmails}
        >
          Download
        </Button>
        {/* <Button
          color="primary"
          variant="contained"
          sx={{ backgroundColor: "#3B3BB6" }}
          onClick={exportToHubspot}
        >
          Export
        </Button> */}
      </div>
    </Box>
  );
};

export default NewGenerateEmail;
