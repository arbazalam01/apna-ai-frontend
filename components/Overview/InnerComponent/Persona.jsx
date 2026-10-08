import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Divider, IconButton } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import api from "@utils/api";

import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../Loader";
import { Empty } from "antd";

const personaStyle = {
  color: "#FFBA4D",
  display: "flex",
  alignItems: "center",
};

const Persona = () => {
  let { companyId } = useParams();

  const [resData, setResData] = useState([]);
  let navigate = useNavigate();

  const { isPending, error, data } = useQuery({
    queryKey: ["companyId", companyId],
    queryFn: () => api.get(`/personas/getAllPersonas?companyId=${companyId}`),
  });

  useEffect(() => {
    if (data) {
      const Data = data.data;
      setResData(Data);
    }
  }, [data]);

  if (isPending) return <Loader />;

  if (error) return <h1>Error: {error.message}</h1>;

  const items = resData.map((persona) => ({
    id: persona._id,
    avatar:
      persona.gender === "Male"
        ? `\\Icons\\Male_Avatar\\${persona.avatar}`
        : `\\Icons\\Female_Avatar\\${persona.avatar}`,
    name: `${persona.designation} in ${persona.businessSize || ""} ${
      persona.organisation
    }`,
  }));

  return (
    <Grid
      container
      sx={{
        pt: 2,
        maxHeight: "90vh"
      }}>
      <Grid
        sx={{ position: "sticky", top: 0, backgroundColor: "white", zIndex: 1 }}
        size={12}>
        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: 2
          }}>
          <Typography variant="MainHeading">Target Personas</Typography>
          <span style={personaStyle}>
            <Typography variant="MainHeading" style={{ color: "#FFBA4D" }}>
              {resData?.length}
            </Typography>
            <AccountCircleIcon
              sx={{ fontSize: "2rem", marginLeft: "0.3rem" }}
            />
          </span>
        </Grid>
        <Grid
          sx={{
            px: 2,
            mb: 1
          }}
          size={12}>
          <Typography sx={{ fontSize: "0.9rem" }}>
            Create Personas to help our AI visualize your target customer, so
            you can build campaigns tailored for their preferences.<br/> You have
            created {resData?.length} persona{resData?.length > 1 ? "s" : ""} so
            far.
          </Typography>
        </Grid>
      </Grid>
      <Grid sx={{ maxHeight: "calc(90vh - 160px)", overflowY: "auto" }} size={12}>
        {items.length > 0 ? (
          items.map((item, index) => (
            <Grid
              container
              key={item.id}
              sx={{
                py: 1,
                px: 2,
                borderBottom: "1px solid #E5E5E5"
              }}>
              <Grid
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5
                }}
                size={10.7}>
                <img
                  src={item?.avatar}
                  height={35}
                  width={35}
                  style={{ borderRadius: "50%", objectFit: "cover" }}
                  alt="avatar"
                />
                <Typography variant="body1" sx={{
                  fontSize: "0.9rem"
                }}>
                  {item?.name}
                </Typography>
              </Grid>
              <Grid
                sx={{
                  textAlign: "right",
                  alignContent: "center"
                }}
                size={1}>
                <IconButton
                  edge="end"
                  aria-label="go"
                  onClick={() => navigate(`/${companyId}/personas`)}
                >
                  <ArrowForwardIosIcon
                    color="#000"
                    style={{ fontSize: "1.1rem" }}
                  />
                </IconButton>
              </Grid>
              <Divider sx={{ my: 0.6 }} />
            </Grid>
          ))
        ) : (
          <Grid
            container
            sx={{
              justifyContent: "center",
              pt: 5
            }}>
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default Persona;
