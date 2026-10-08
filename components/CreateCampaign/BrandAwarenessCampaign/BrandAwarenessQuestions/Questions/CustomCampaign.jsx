import { useState } from "react";
import { Grid, OutlinedInput, Radio, Select, Typography } from "@mui/material";

import { Controller, useFieldArray, useFormContext } from "react-hook-form";

const CustomCampaign = ({ handleQuestion }) => {
  const methods = useFormContext();
  const [checked, setChecked] = useState(false);
  const { control, handleSubmit, setValue, getValues } = methods;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "content_format",
  });

  return (
    <Grid container spacing={2} sx={{
      justifyContent: "space-between"
    }}>
      {/* CUSTOM CAMPAIGN FROM SCRATCH */}
      <Grid
        sx={{
          mb: 2.5
        }}
        size={12}>
        {/* <Typography variant="caption2">Content Formats</Typography>
        <br /> */}
        <Typography variant="AvgHeading">
Let's Build Custom Campaign        </Typography>
        <br />
        <Typography variant="caption">
          In the following sections, you'll select the strengths, positioning and key differentiators you'd like us to highlight in this campaign. Your choices will guide our theme development and the final content creation.
        </Typography>

        {/* Contents Type */}
      </Grid>
    </Grid>
  );
};

export default CustomCampaign;
