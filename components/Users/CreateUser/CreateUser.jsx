import React from "react";
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
import {useQueryClient} from "@tanstack/react-query";
import { Divider } from "antd";
import { useParams } from "react-router-dom";

const roles = [
  { key: 0, value: "User" }
];



const CreateUser = ({ open, onClose }) => {
  const { handleSubmit, control , reset} = useForm();
  const { companyId } =  useParams();

  const queryClient= useQueryClient();

  const onSubmit = async (data) => {
    try {
      const payload = {
        email: data.email,
        name: data.name,
        password: data.password,
        role: data.role,
        companyId: companyId,
      };

      const apiUrl = "api/signup";
      const response = await api.post(apiUrl, payload);

      if (response.status === 200) {
        console.log("in 200 block")
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
            <Grid container size={8}>
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
                Create New User
              </Typography>
            </Grid>

            <Grid container size={4}>
              <Button
                type="submit"
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
                  mr: 2,
                }}
              >
                Create User
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
                Discard
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
            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  label="Password"
                  name="password"
                  {...field}
                  sx={{ backgroundColor: "#F2F2F2" }}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  type="password"
                />
              )}
            />
          </Box>
        </form>
      </Drawer>
    </>
  );
};

export default CreateUser;
