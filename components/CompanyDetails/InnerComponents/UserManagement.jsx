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
      <Grid
        container
        onClick={handleUser}
        sx={{
          justifyContent: "space-between",
          alignItems: "center"
        }}>
              <Grid>
                <Typography variant="AvgHeading">User Management</Typography>
              </Grid>
              <Grid>
                <IconChevronRight />
              </Grid>
            </Grid>
    </>
  );
};

export default UserManagement;
