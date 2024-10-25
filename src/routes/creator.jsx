import { Layout } from "antd";
import Typography from "@mui/material/Typography";
import { Grid, Divider, Box } from "@mui/material";

import EmailCampaign from "@components/Creator/EmailCampaign/EmailCampaign";

const { Content } = Layout;

const CreatorsPage = () => {
  return (
    <Layout
      className="layout"
    >
    

      <Content>
        <Grid container>
          <Grid item xs={12} sx={{ backgroundColor: "#FFFFFF" }}>
            <EmailCampaign />
          </Grid>
        </Grid>
      </Content>
    </Layout>
  );
};
export default CreatorsPage;
