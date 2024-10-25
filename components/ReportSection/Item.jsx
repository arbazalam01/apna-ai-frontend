import { Box, Typography, Stack } from "@mui/material";

const Item = ({ title, description, dsctext = null }) => {
  return (
    <Stack>
      <Typography variant="title">{title}</Typography>
      <Typography variant="subtitle12lite">
        {description} {dsctext && dsctext}
      </Typography>
    </Stack>
  );
};

export default Item;
