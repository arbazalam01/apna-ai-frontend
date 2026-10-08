import React, { useEffect, useState } from "react";
import { Grid, Typography, IconButton } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { reportCompanyIdStore } from "@store/ReportStore";
import { useSetAtom } from "jotai";
import api from "@utils/api";
import { ClockCircleFilled } from "@ant-design/icons";
import loader from "/Icons/spinner.gif";
import Loader from "../../Loader";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const Report = () => {
  // const [allCompanies, setAllCompanies] = useState([]);
  // const [isScraped, setIsScraped] = useState(false);
  const { companyId } = useParams();
  const setCompanyId = useSetAtom(reportCompanyIdStore);
  const navigate = useNavigate();

  const { isPending, error, data } = useQuery({
    queryKey: ["competitors"],
    queryFn: () => api.get(`/customer/${companyId}/getcompetitors`),
    refetchInterval: 5 * 1000,
  });

  const allCompanies = data?.data?.data[0];
  const isScraped = allCompanies?.isReportDone;

  if (!allCompanies || Object.keys(allCompanies).length === 0) {
    return <Loader />;
  }

  const items = [
    {
      id: allCompanies.companyId._id,
      name: allCompanies.companyId.name,
    },
    ...allCompanies.competitorsId.map((company) => ({
      id: company._id,
      name: company.name,
      secondary: `COMPETITOR`,
    })),
    {
      id: "4",
      name: "Summarized Report",
    },
  ].filter(Boolean);

  const handleNavigation = (id) => {
    setCompanyId(id);
    if (id === "4") {
      navigate(`/${companyId}/combinedreports`);
    } else {
      setCompanyId(id);
      navigate(`/${companyId}/reports`);
    }
  };

  return (
    <Grid container sx={{
      pt: 2
    }}>
      <Grid
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 2
        }}
        size={12}>
        <Typography variant="MainHeading">Report</Typography>
        <span>
          <Typography variant="MainHeading" style={{ color: "#90CE53" }}>
            100 %
          </Typography>
        </span>
      </Grid>
      <Grid
        sx={{
          px: 2,
          mb: 1
        }}
        size={12}>
        <Typography sx={{ fontSize: "0.9rem" }}>
          We have put together a detailed analysis of your company and your
          competitors, based on information collected from online sources and
          your uploaded brand assets.
        </Typography>
      </Grid>

      {items.length > 0 ? (
        <>
          {items.map((item) => (
            <React.Fragment key={item.id}>
              <Grid
                container
                sx={{
                  alignItems: "center",
                  borderBottom: "1px solid #E5E5E5",
                  py: 0.7,
                  px: 2
                }}>
                <Grid
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5
                  }}
                  size={10}>
                  {" "}
                  {item.name === "Summarized Report" ? (
                    isScraped == 2 ? (
                      <CheckCircleIcon style={{ color: "#3B3BB6" }} />
                    ) : (
                      <img
                        src={loader}
                        alt="Loader"
                        height={29}
                        width={29}
                        style={{ marginLeft: "-0.2rem" }}
                      />
                    )
                  ) : isScraped == 2 ? (
                    <CheckCircleIcon style={{ color: "#90CE53" }} />
                  ) : (
                    <img
                      src={loader}
                      alt="Loader"
                      height={29}
                      width={29}
                      style={{ marginLeft: "-0.2rem" }}
                    />
                  )}
                  <Typography variant="body1">{item?.name}</Typography>
                </Grid>

                <Grid
                  sx={{
                    textAlign: "right"
                  }}
                  size={1.7}>
                  <IconButton
                    edge="end"
                    aria-label="go"
                    disabled={isScraped == 2 ? false : true}
                    onClick={() => handleNavigation(item.id)}
                  >
                    <ArrowForwardIosIcon
                      color="#000"
                      style={{ fontSize: "1.1rem" }}
                    />
                  </IconButton>
                </Grid>
              </Grid>
            </React.Fragment>
          ))}
        </>
      ) : (
        <Grid
          container
          sx={{
            justifyContent: "center",
            justifyContent: "center",
            color: "#d2d2d2",
            fontWeight: "400",
            fontSize: "1.5rem",
            mt: 10
          }}>
          No Personas created
        </Grid>
      )}
    </Grid>
  );
};

export default Report;
