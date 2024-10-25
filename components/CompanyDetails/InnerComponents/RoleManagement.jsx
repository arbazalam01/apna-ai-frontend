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
        justifyContent="space-between"
        alignItems="center"
        onClick={handleRole}
      >
        <Grid item>
          <Typography variant="AvgHeading">Role Management</Typography>
        </Grid>
        <Grid item>
          <IconChevronRight />
        </Grid>
      </Grid>
    </>
  );
};

export default RoleManagement;
