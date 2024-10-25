import { Box } from "@mui/material";
import { Typography } from "antd";

const { Title } = Typography;

function formatDate(date) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const day = date.getDate();
  let suffix = "th";

  if (day === 1 || day === 21 || day === 31) {
    suffix = "st";
  } else if (day === 2 || day === 22) {
    suffix = "nd";
  } else if (day === 3 || day === 23) {
    suffix = "rd";
  }

  return `${months[date.getMonth()]} ${day}${suffix}, ${date.getFullYear()}`;
}

const Index = ({ companyData, ceo }) => {
  const { name } = companyData;
  const date = new Date();
  const formattedDate = formatDate(date);
  return (
    <Box bgcolor="#252840">
      <Box textAlign="center" pt={4}>
        <div className="demo-logo">
        </div>
        <Box mt={4}>
          <Title level={3} style={{ margin: 0, color: "white" }}>
            Report Created For: {ceo}, {name}
          </Title>
          <Title level={4} style={{ margin: 0, color: "white" }}>
            Report Created on: {formattedDate}
          </Title>
        </Box>
      </Box>
    </Box>
  );
};

export default Index;
