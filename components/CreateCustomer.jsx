import React, { useEffect } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import {
  Button,
  TextField,
  Box,
  Typography,
  Grid,
  Drawer,
  IconButton,
} from "@mui/material";
import api from "@utils/api";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { Divider } from "antd";
import { useQueryClient } from "@tanstack/react-query";
import { DevTool } from "@hookform/devtools";

const CreateCustomer = ({ open, onClose }) => {
  const { control, handleSubmit, setValue, reset } = useForm();
  const {
    fields: competitorsField,
    append: competitorsAppend,
    remove: competitorsRemove,
  } = useFieldArray({
    control,
    name: "competitors",
  });

  const queryClient = useQueryClient();

  const AddSection = () => {
    competitorsAppend({ name: "", websiteUrl: "" });
  };

  const DeleteSection = (index) => {
    competitorsRemove(index);
  };

  const onSubmit = async (data) => {
    const apiUrl = "customer/addcustomer";

    const payLoad = data;
    const apiRes = await api.post(apiUrl, payLoad);
    if (apiRes.status === 200) {
      console.log("in 200 block");
      handleCloseDrawer();
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    } else {
      console.error("Failed to create user");
    }
  };

  const handleCloseDrawer = () => {
    onClose();
    reset();
  };

  return (
    <>
      <Drawer open={open} onClose={handleCloseDrawer} anchor={"right"} style={{zIndex: 100000}} >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid
            container
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              width: "65rem",
              justifyContent: "space-between", // Align items to the start and end of the row
              mt: 4,
              paddingRight: "1rem", // Add padding to the right to separate buttons from the title
            }}
          >
            <Grid container item xs={8}>
              <Typography
                id="title"
                component="h5"
                variant="Heading-head"
                sx={{
                 
                  paddingLeft: "2rem",
                }}
              >
                Create New Customer
              </Typography>
            </Grid>
            <Grid container item xs={4} sx={{ alignItems: "center",gap:2 }} >
              <Button
                type="submit"
                variant="button1"
                
              >
                Create Customer
              </Button>
              <Button
                variant="button2"
                
                onClick={onClose}
              >
                Discard
              </Button>
            </Grid>
          </Grid>
          <Divider />

          <Box sx={{ padding: "0rem 2rem" }}>
            <Box>
              <Typography variant="MainHeading">Customer Info</Typography>
              <SectionInput name="company" control={control} />
            </Box>

            <Divider />

            <Box mt={2}>
              <Typography variant="MainHeading">Competitor Info</Typography><br/>
              {competitorsField.map((field, index) => (
                <SectionInput
                  key={field.id}
                  name={`competitors[${index}]`}
                  handleDelete={DeleteSection}
                  index={index}
                  control={control}
                  isDelete={true}
                />
              ))}
              {/* Add Section */}
              <Button
                variant="button2"
                onClick={AddSection}
                startIcon={<AddIcon />}
              >
                Add Competitor
              </Button>
            </Box>
          </Box>
        </form>
      </Drawer>
      {/* <DevTool control={control} /> */}
    </>
  );
};

export default CreateCustomer;

const SectionInput = ({
  name,
  handleDelete,
  index,
  control,
  isDelete = false,
}) => {
  return (
    <Box mt={2}>
      <Grid container columnSpacing={3}>
        <Grid item xs={4}>
          <Controller
            name={`${name}.name`}
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Company Name"
                variant="outlined"
                fullWidth
              />
            )}
          />
        </Grid>
        <Grid item xs={4}>
          <Controller
            name={`${name}.websiteUrl`}
            control={control}
            defaultValue=""
            rules={{
              pattern: {
                value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
                message: "Enter a valid Website URL",
              },
            }}
            render={({ field , fieldState }) => (
              <TextField
                {...field}
                label="Company Website URL"
                variant="outlined"
                error={!!fieldState.error}
                helperText={fieldState.error ? fieldState.error.message : null}
                fullWidth
              />
            )}
          />
          {/* Button to delete this section */}
        </Grid>

        <Grid item xs={4}>
          <Controller
            name={`${name}.linkedinUrl`}
            control={control}
            defaultValue=""
            rules={{
              pattern: {
                value: /^(https?:\/\/)?(www\.)?linkedin\.com\/.*$/,
                message: "Enter a valid LinkedIn URL",
              },
            }}
            render={({ field , fieldState }) => (
              <TextField
                {...field}
                label="Company Linkedin URL"
                variant="outlined"
                fullWidth
                error={!!fieldState.error}
                helperText={fieldState.error ? fieldState.error.message : null}
              />
            )}
          />
          {/* Button to delete this section */}
        </Grid>

        {isDelete && (
          <Grid item xs={12} md={2}>
            <IconButton aria-label="delete" onClick={() => handleDelete(index)}>
              <DeleteIcon />
            </IconButton>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};
