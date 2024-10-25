import { Layout } from "antd";
import Typography from "@mui/material/Typography";
import { Grid, Divider, Box } from "@mui/material";
const { Content } = Layout;
import Overview from "@components/Overview/Overview";

export default function OverviewPage() {
  return (
    <>
      <Layout
        className="layout"
        style={{ background: "white" }}
      >
        {/* <HeaderComponent showSignOut={false} /> */}

        {/* <Grid sx={{ height: "5rem", zIndex: 10, backgroundColor: "#fff" }}>
          <Grid
            container
            sx={{
              position: "fixed",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingX: 2,
              // paddingY: 3.3,
              border: "1px solid #D2D2D2",
              height: "5rem",
            }}
          >
            <Typography variant="Heading-head"> Overview</Typography>
          </Grid>
        </Grid> */}

        {/* <Divider /> */}

        {/* <Content> */}
          <Grid container>
            <Overview />
          </Grid>
        {/* </Content> */}
        {/* 
        <FooterComponent /> */}
      </Layout>
    </>
  );
}
