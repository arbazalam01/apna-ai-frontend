import { useState } from "react";
import DefaultReportHead from "./DefaultReportHead";
import { Divider, Grid } from "@mui/material";
import MainAboutDrawer from "@components/ReportSection/About/AboutDrawer/MainAboutDrawer";
import MainSEODrawer from "@components/ReportSection/SEO/SEODrawer/MainSEODrawer";
import MainProductDrawer from "@components/ReportSection/Products/ProductDrawer/MainProductDrawer";
import MainIndustriesDrawer from "@components/ReportSection/Industries/IndustriesDrawer/MainIndustriesDrawer";
import MainClientsDrawer from "@components/ReportSection/TopClients/ClientsDrawer/MainClientsDrawer";
import MainLeadershipDrawer from "@components/ReportSection/Leadership/LeaderShipDrawer/MainLeaderShipDrawer";
import MainBlogDrawer from "@components/ReportSection/BlogActivity/BlogDrawer/MainBlogDrawer";
import MainPositioningDrawer from "@components/ReportSection/Positioning/PositionDrawer/MainPositioningDrawer";
import MainSWOTDrawer from "@components/ReportSection/SWOT/SWOTDrawer/MainSWOTDrawer";
import { useAtom } from "jotai";
import { reportSection } from "@store/ReportStore";

const DefaultReport = () => {
  const[section,setSection] = useAtom(reportSection)
  // const [section, setSection] = useState("about");

  const handleChange = (event, newValue) => {
    setSection(newValue);
  };
  console.log("value", section);
  return (
    <>
    <Grid sx={{ maxHeight:"calc(100vh - 4rem)",overflow:"auto"}}>

      <DefaultReportHead handleChange={handleChange} section={section} />
      <Divider sx={{ my: 0 }} />
      {section === "About" && (
        <Grid item xs={12}>
          <MainAboutDrawer />
        </Grid>
      )}
      {section === "Products & Services" && (
          <Grid item xs={12}>
          <MainProductDrawer />
        </Grid>
      )}
      {
        section === "SEO" && (
          <Grid item xs={12}>
            <MainSEODrawer />
          </Grid>
        )
      }
      {
        section === "Target Audience" && (
          <Grid item xs={12}>
            <MainIndustriesDrawer />
          </Grid>
        )
      }
      {
        section === "Top Clients" && (
          <Grid item xs={12}>
            <MainClientsDrawer />
          </Grid>
        )
      }
      {
        section === "Leadership" && (
          <Grid item xs={12}>
            <MainLeadershipDrawer />
          </Grid>
        )
      }
      {
        section === "Blog Activity" && (
          <Grid item xs={12}>
            <MainBlogDrawer />
          </Grid>
        )
      }
      {
        section === "Positioning" && (
          <Grid item xs={12}>
            <MainPositioningDrawer />
          </Grid>
        )
      }
      {
        section === "SWOT" && (
          <Grid item xs={12}>
            <MainSWOTDrawer />
          </Grid>
        )
      }
    </Grid>

    </>
  );
};

export default DefaultReport;
