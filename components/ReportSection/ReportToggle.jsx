import { useState } from "react";
import ViewListIcon from "@mui/icons-material/ViewList";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ViewQuiltIcon from "@mui/icons-material/ViewQuilt";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useAtom, useSetAtom } from "jotai";
import { summaryReportUI } from "@store/ReportStore";

export default function ReportToggle() {
  const [ReportUI, setReportUI] = useAtom(summaryReportUI);
  console.log("summaryReportUI", ReportUI);
  const [view, setView] = useState("default");
  console.log("VIEW", view);
  const handleChange = (event, nextView) => {
    setReportUI(nextView);
    setView(nextView);
  };

  return (
    <ToggleButtonGroup
      sx={{ height: "32px" }}
      //   orientation="vertical"
      value={view}
      exclusive

      onChange={handleChange}
    >
      <ToggleButton value="default" aria-label="default">
        <ViewListIcon fontSize="small" />
      </ToggleButton>

      <ToggleButton value="summary" aria-label="summary">
        <ViewQuiltIcon fontSize="small" />
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
