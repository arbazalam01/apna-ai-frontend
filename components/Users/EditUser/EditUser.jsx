import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Button,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Box,
  Typography,
  Grid,
  Drawer,
} from "@mui/material";
import api from "@utils/api";
import { Divider } from "antd";
import {useQueryClient} from "@tanstack/react-query";
import { useParams } from "react-router-dom";


const roles = [
  { key: 1, value: "Admin" },
  { key: 0, value: "User" },
];

const EditUser = ({ open, onClose, id }) => {
  const { handleSubmit, control, reset } = useForm();

  const { companyId } =  useParams();
  const queryClient= useQueryClient();

  const onSubmit = async (data) => {
    try {
      const payload = {
        email: data.email,
        name: data.name,
        role: data.role,
      };

      const apiUrl = `customer/${id}/editUser`;
      const response = await api.put(apiUrl, payload);

      if (response.status === 200) {
        onClose();
        reset();
        queryClient.invalidateQueries({queryKey:["companyId",companyId]})
      } else {
        console.error("Failed to create user");
      }
    } catch (error) {
      console.error("Error occurred while creating user:", error);
    }
  };

  // Function to fetch user data
  const fetchUserData = async () => {
    try {
      console.log("userId",id);
      const apiUrl = `customer/${id}/getUser`;

      const response = await api.get(apiUrl);

      if (response.status === 200) {
        reset({
          ...response.data[0],
        });
      } else {
        console.error("Failed to fetch user data");
      }
    } catch (error) {
      console.error("Error occurred while fetching user data:", error);
    }
  };

  useEffect(() => {
    if (id) fetchUserData();
  }, [id]);

  return (
    <>
      <Drawer open={open} onClose={onClose} anchor={"right"}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid
            container
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between", // Align items to the start and end of the row
              mt: 4,
            }}
          >
            <Grid container item xs={4}>
              <Typography
                id="title"
                component="h5"
                variant="h5"
                sx={{
                  alignItems: "left",
                  textAlign: "left",
                  marginLeft: "3rem",
                }}
              >
                Edit User
              </Typography>
            </Grid>

            <Grid container item xs={8}>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  mb: 2,
                  backgroundColor: "#3B3BB6",
                  textEmphasisColor: "whiteSpace",
                  borderRadius: 2,
                  mr: 2,
                }}
              >
                Save Changes
              </Button>
              <Button
                variant="contained"
                sx={{
                  mb: 2,
                  backgroundColor: "#F2F2F2",
                  color: "#757575", // Set text color to grey
                  "&:hover": {
                    backgroundColor: "#3B3BB6", // Change background color on hover
                    color: "#FFFFFF", // Change text color on hover
                  },
                  borderRadius: 2,
                }}
                onClick={onClose}
              >
                Discard Changes
              </Button>
            </Grid>
          </Grid>
          <Divider />
          <Box sx={{ width: "40%", marginInline: "3rem" }}>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  label="Name"
                  name="name"
                  {...field}
                  sx={{ backgroundColor: "#F2F2F2" }}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
              )}
            />

            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  label="Email"
                  name="email"
                  {...field}
                  sx={{ backgroundColor: "#F2F2F2" }}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  type="email"
                />
              )}
            />

            <FormControl
              fullWidth
              variant="outlined"
              margin="normal"
              sx={{ backgroundColor: "#F2F2F2" }}
            >
              <InputLabel htmlFor="role">Role</InputLabel>
              <Controller
                name="role"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Select label="Role" {...field}>
                    {roles.map((role) => (
                      <MenuItem key={role.key} value={role.key}>
                        {role.value}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </FormControl>
          </Box>
        </form>
      </Drawer>
    </>
  );
};

export default EditUser;
