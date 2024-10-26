import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useFormContext } from "react-hook-form";
import {
  Grid,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Checkbox,
  Button,
  Paper,
  Typography,
} from "@mui/material";
import api from "@utils/api";
import AutoModeIcon from "@mui/icons-material/AutoMode";
import { Skeleton } from "antd";

function not(a, b) {
  return a.filter((value) => !b.includes(value));
}

function intersection(a, b) {
  return a.filter((value) => b.includes(value));
}

export default function ContentThemes() {
  const { companyId } = useParams();
  const methods = useFormContext();
  const { register, setValue, getValues } = methods;
  const [checked, setChecked] = useState([]);
  const [left, setLeft] = useState([]); // Available themes from the API
  const [right, setRight] = useState([]); // Selected themes

  const Segment = getValues("selectsegments");

  // Fetch themes from API
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["AiThemes",Segment],
    queryFn: () =>
      api.post("/calendar/getThemes", {
        segment: Segment, // The selected industries
        companyId,
      }),
    enabled: !!Segment, // Ensure industryData is available before fetching
    
  });

  console.log("left", left);

  useEffect(() => {
    if (data) {
      setLeft(data?.data?.themes);
    }
  }, [data]);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const regenerateApiResponse = () => {
    refetch(); // Trigger refetch to regenerate themes
  };

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleCheckedRight = () => {
    const newRight = right.concat(leftChecked);
    setRight(newRight);
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
    setValue("selectedThemes", newRight); // Store right-side items in form state
  };

  const handleCheckedLeft = () => {
    const newLeft = left.concat(rightChecked);
    setLeft(newLeft);
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
    setValue("selectedThemes", not(right, rightChecked)); // Update right-side items in form state
  };

  const customList = (items, side) => (
    <Paper sx={{ width: 320, height: 320, overflow: "auto",border: "1px solid #D9D9D9",boxShadow: "none", borderRadius: "15px",display:"flex", alignItems: "center", justifyContent: "center" }}  >
      <List dense  role="list">
        {items.map((value) => {
          const labelId = `transfer-list-item-${value}-label`;
          return (
            <ListItemButton
              key={value}
              role="listitem"
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    "aria-labelledby": labelId,
                  }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`${value}`} />
            </ListItemButton>
          );
        })}
      </List>
    </Paper>
  );

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid item container xs={12}>
        <Grid>
          <Typography variant="AvgHeading">
            Choose up to 3 segments to build your campaign around.
          </Typography>
        </Grid>
        <Grid ml={6.5} alignContent={"center"}>
          <AutoModeIcon
            onClick={regenerateApiResponse} // Trigger refetch on click
            style={{
              fontSize: "1.5rem",
              cursor: "pointer",
              color: "#868686",
            }}
          />
        </Grid>
      </Grid>
      {isLoading ? (
        <Skeleton active style={{ width: "80%" }} />
      ) : (
        <>
          {/* Left List (Available Themes from API) */}
          <Grid item>{customList(left, "left")}</Grid>

          <Grid item>
            <Grid container direction="column" alignItems="center">
              <Button
                sx={{ my: 0.5 }}
                variant="button4"
                size="small"
                onClick={handleCheckedRight}
                disabled={leftChecked.length === 0}
                aria-label="move selected right"
              >
                &gt;
              </Button>
              <Button
                sx={{ my: 0.5 }}
                variant="button4"
                size="small"
                onClick={handleCheckedLeft}
                disabled={rightChecked.length === 0}
                aria-label="move selected left"
              >
                &lt;
              </Button>
            </Grid>
          </Grid>

          {/* Right List (Selected Themes) */}
          <Grid item>{customList(right, "right")}</Grid>
        </>
      )}
      {/* Hidden input to register selected themes with react-hook-form */}
      <input type="hidden" {...register("selectedThemes")} />
    </Grid>
  );
}
