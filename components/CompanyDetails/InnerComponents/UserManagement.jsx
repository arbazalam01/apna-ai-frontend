import { Grid, Typography } from "@mui/material";
import { IconChevronRight } from "@tabler/icons-react";
import { useNavigate, useParams } from "react-router-dom";

const UserManagement = () => {
  const { companyId } = useParams();
  const navigate = useNavigate();
  const handleUser = () => {
    navigate(`/${companyId}/users`);
  };
  return (
    <>
<Grid container justifyContent="space-between" alignItems="center" onClick={handleUser}>
        <Grid item >
          <Typography variant="AvgHeading">User Management</Typography>
        </Grid>
        <Grid item >
          <IconChevronRight />
        </Grid>
      </Grid>
    </>
  );
};

export default UserManagement;
