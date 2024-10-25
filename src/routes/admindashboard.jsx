import { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Layout, Skeleton, Tooltip } from "antd";
import { Typography, Button, Grid, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import api from "@utils/api";
import CustomersTable from "@components/CustomersTable";
import { Link } from "react-router-dom";
import { DownloadOutlined } from "@ant-design/icons";
import { ClockCircleFilled } from "@ant-design/icons";
import MainCreateCompany from "@components/CreateCompany/MainCreateCompany";
// import { useAxios } from "../../utils/api";
import loader from "/Icons/spinner.gif";

const { Content } = Layout;

export default function AdminDashboard() {
  const [isModalOpen, setModalOpen] = useState(false);

  // const api = useAxios();

  const queryClient = useQueryClient();

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const { isPending, error, data } = useQuery({
    queryKey: ["customers"],
    queryFn: () => api.get("/customer/getallcustomers"),
    refetchInterval: 20 * 1000,
  });

  if (isPending)
    return (
      <Grid p={8} container alignContent={"center"}>
        <Skeleton active />
        <Skeleton active />
        <Skeleton active />
      </Grid>
    );

  if (error) return <h1>Error: {error.message}</h1>;
  const resData = data.data;

  const handleViewReport = (companyId) => {
    router.push(`/report/${companyId}/about`);
  };

  const handleViewDashboard = (companyId) => {
    router.push(`/${companyId}/users`);
  };

  const handleScraping = async (companyId) => {
    try {
      const apiUrl = "customer/scrapdata";

      const payLoad = {
        companyId: companyId,
      };
      const apiRes = await api.post(apiUrl, payLoad);

      queryClient.invalidateQueries({ queryKey: ["customers"] });
    } catch (error) {
      console.log("Error", error);
    }
  };

  const tableData = resData?.map((customer) => {
    const scrapingStatus =
      customer.reportStatus === 2 ? (
        <Tooltip title="Report Generated" zIndex={10000}>
          <CheckCircleIcon style={{ fontSize: "1.4rem", color: "#90CE53" }} />{" "}
        </Tooltip>
      ) : customer.reportStatus === 1 ? (
        <Tooltip title="Report In Progress" zIndex={10000}>
          <img src={loader} alt="Loader" height={28} width={28} style={{marginLeft: "-0.2rem"}} />
        </Tooltip>
      ) : (
        <Tooltip title="Report not Generated" zIndex={10000}>
          <CheckCircleIcon style={{ fontSize: "1.4rem", color: "#d2d2d2" }} />{" "}
        </Tooltip>
      );

    return {
      key: customer.companyId,
      name: customer.companyName,
      names: (
        <Grid
          display={"flex"}
          alignContent={"center"}
          alignItems={"center"}
          gap={1.5}
        >
          {scrapingStatus} {customer.companyName}
        </Grid>
      ),
      // dataScraping:
      //   customer.reportStatus === 2 ? (
      //     <CheckCircleIcon style={{ fontSize: "1.3rem", color: "#90CE53" }} />
      //   ) : customer.reportStatus === 1 ? (
      //     "In Progress"
      //   ) : (
      //     "Not Started"
      //   ),
      actions:
        customer.reportStatus === 2 ? (
          <Link
            to={`/generatepdf/${customer.companyId}/newpdf`}
          >
            <Tooltip title="Download Report">
              <DownloadOutlined
                style={{ color: "#727272", fontSize: "1.1rem" }}
              />{" "}
            </Tooltip>
          </Link>
        ) : customer.reportStatus === 1 ? (
          <Link>
            {" "}
            <Tooltip title="Report In Progress">
            <img src={loader} alt="Loader" height={28} width={28} style={{marginLeft: "-0.2rem"}} />

            </Tooltip>
          </Link>
        ) : (
          <Link onClick={() => handleScraping(customer.companyId)}>
            {"Regenerate"}
          </Link>
        ),
      createdOn: new Date(customer.createdAt).toLocaleDateString("en-us", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      updatedOn: new Date(customer.updatedAt).toLocaleDateString("en-us", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      goto:
        customer.reportStatus &&
          <Link to={`/${customer.companyId}/overview`}>
            <Tooltip title="Go to Dashboard">
              <IconButton edge="end" aria-label="go">
                <ArrowForwardIosIcon
                  color="#000"
                  style={{ fontSize: "1.1rem" }}
                />
              </IconButton>
            </Tooltip>
          </Link>
        ,
    };
  });

  return (
    <>
      <Layout className="layout" style={{ backgroundColor: "#fff" }}>
        
          <Content>
            <CustomersTable data={tableData} />
          </Content>
       
      </Layout>
    </>
  );
}
