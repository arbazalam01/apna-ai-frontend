import { Grid, Typography } from "@mui/material";
import { IconChevronRight } from "@tabler/icons-react";
import { useNavigate, useParams } from "react-router-dom";

const RoleManagement = () => {
  const { companyId } = useParams();
  const navigate = useNavigate();
  const handleRole = () => {
    navigate(`/${companyId}/roles`);
  };
  return (
    <>
      <Grid
        container
        onClick={handleRole}
        sx={{
          justifyContent: "space-between",
          alignItems: "center"
        }}>
        <Grid>
          <Typography variant="AvgHeading">Role Management</Typography>
        </Grid>
        <Grid>
          <IconChevronRight />
        </Grid>
      </Grid>
    </>
  );
};

export default RoleManagement;
