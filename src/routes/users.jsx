import { useQuery } from "@tanstack/react-query";
import { Layout } from "antd";

import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { Grid, Divider, Typography } from "@mui/material";
import UsersTable from "@components/Users/UsersTable/UsersTable";
import CreateUser from "@components/Users/CreateUser/CreateUser";
import { useState } from "react";
import ThreeDotMenu from "@components/Menu/Menu";
import api from "@utils/api";
import { useParams } from "react-router-dom";
import Styles from "@components/Users/UsersTable/UserTable.module.css";
const { Content } = Layout;

const UsersPage = () => {
  const { companyId } = useParams();

  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const { isPending, error, data } = useQuery({
    queryKey: ["companyId", companyId],
    queryFn: () => api.get(`/customer/getAllUsers?companyId=${companyId}`, {}),
  });

  if (isPending) return <h1>Loading...</h1>;

  if (error) return <h1>Error: {error.message}</h1>;
  const resData = data.data;
  console.log(resData);

  const tableData = resData.map((user) => {
    return {
      key: user._id,
      name: <span className={Styles.name}>{user.name}</span>,
      email: <span className={Styles.email}>{user.email}</span>,
      role:
        user.role == 1 ? (
          <span className={Styles.userTheme}>ADMIN</span>
        ) : (
          <span className={Styles.userTheme}>USER</span>
        ),
      createdOn: (
        <span className={Styles.createdOn}>
          {new Date(user.createdAt).getUTCDate() +
            " " +
            new Date(user.createdAt).toLocaleString("en-us", {
              month: "long",
            }) +
            " " +
            new Date(user.createdAt).getUTCFullYear()}
        </span>
      ),
      updatedOn: (
        <span className={Styles.createdOn}>
          {new Date(user.updatedAt).getUTCDate() +
            " " +
            new Date(user.updatedAt).toLocaleString("en-us", {
              month: "long",
            }) +
            " " +
            new Date(user.updatedAt).getUTCFullYear()}
        </span>
      ),
      settings: (
        <>
          <ThreeDotMenu id={user._id} />
        </>
      ),
    };
  });

  return (
    <>
      <Layout
        className="layout"
        style={{ background: "white", minHeight: "100vh" }}
      >
        {/* <HeaderComponent showSignOut={false} /> */}
        <Grid sx={{ height: "5rem", zIndex: 10, backgroundColor: "#fff" }}>
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
            <Grid item xs={8}>
            <Typography variant="Heading-head">User Management</Typography>
            </Grid>
            <Grid item xs={4}>


            <Button
              variant="button1"
             
              startIcon={<AddIcon />}
              onClick={handleOpenModal}
            >
              New User
            </Button>
            <CreateUser open={isModalOpen} onClose={handleCloseModal} />
          </Grid>
          </Grid>
        </Grid>

        <Grid
          pl={0.2}
          pt={1}
          pb={3}
          //  sx={{ borderBottom: "1px solid #d9d9d9" }}
        >
          <Content>
            <UsersTable data={tableData} />
          </Content>
        </Grid>
        {/* 
        <FooterComponent /> */}
      </Layout>
    </>
  );
};
export default UsersPage;
