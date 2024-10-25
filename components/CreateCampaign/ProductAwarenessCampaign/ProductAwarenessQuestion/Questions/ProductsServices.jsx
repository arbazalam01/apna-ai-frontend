import React from "react";
import {
  Button,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  Typography,
  Radio,
} from "@mui/material";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";

const ProductsServices = ({ handleQuestion, industryData }) => {
  const methods = useFormContext();
  const { control, setValue, getValues } = methods;

  const handleClick = () => {
    const { product } = getValues();
    if (!product ) {
      alert("Please select Products.");
      return;
    }
    handleQuestion("next");
  };

  const products = industryData?.companyId?.products;
  const services = industryData?.companyId?.services;

  return (
    <Grid
      container
      minHeight={"75vh"}
      spacing={2}
      justifyContent={"space-between"}
      mb={10}
    >
      <Grid item xs={12}>
        <Typography variant="caption2">Target Product</Typography>
        <br />
        <Typography variant="AvgHeading">
          Pick the product or service you want to create awareness around.
        </Typography>

        {/* Products */}
        <FormGroup style={{ margin: "0.5rem 0rem" }}>
        <FormLabel component="legend" sx={{mb:1}}> 
        <Typography variant="smallGreyHeading">PRODUCTS</Typography>
          </FormLabel>
          {products && products.length > 0 ? (
            products.map((product, index) => (
              <FormControlLabel
                key={product._id}
                sx={{
                  width: "70%",
                  border: "1px solid #d2d2d2",
                  borderRadius: 2,
                  mb: 1,
                }}
                control={
                  <Controller
                    name="product"
                    control={control}
                    render={({ field }) => (
                      <Radio
                        checked={field.value === product.name}
                        onChange={() => {
                          setValue("product", product.name);
                        }}
                      />
                    )}
                  />
                }
                label={<span style={{ fontSize: "0.87rem" }}>{product.name}</span>}
              />
            ))
          ) : (
            <Typography>No products available</Typography>
          )}
        </FormGroup>

        {/* Services */}
        <FormGroup style={{ margin: "0.5rem 0rem" }}>
        <FormLabel component="legend" sx={{mb:1}}> 
            <Typography variant="smallGreyHeading">SERVICES</Typography>
          </FormLabel>
          {services && services.length > 0 ? (
            services.map((service, index) => (
              <FormControlLabel
                key={service._id}
                sx={{
                  width: "70%",
                  border: "1px solid #d2d2d2",
                  borderRadius: 2,
                  mb: 1,
                }}
                control={
                  <Controller
                    name="service"
                    control={control}
                    render={({ field }) => (
                      <Radio
                        checked={field.value === service.name}
                        onChange={() => {
                          setValue("service", service.name);
                        }}
                      />
                    )}
                  />
                }
                label={<span style={{ fontSize: "0.87rem" }}>{service.name}</span>}
              />
            ))
          ) : (
            <Typography>No services available</Typography>
          )}
        </FormGroup>
      </Grid>

      {/* Buttons */}
      <Grid
        item
        xs={12}
        display={"flex"}
        justifyContent={"start"}
        alignItems={"end"}
      >
        <Button variant="button2" onClick={() => handleQuestion("back")}>
          Go Back
        </Button>
        <Button variant="button2" onClick={() => {
          handleClick();
         
        }}>
          Proceed
        </Button>
      </Grid>
    </Grid>
  );
};

export default ProductsServices;
