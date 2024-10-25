import React from "react";
import {
  Button,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  Typography,
  Checkbox,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

const ProductsServices = ({ handleQuestion, industryData }) => {
  const methods = useFormContext();
  const { control, setValue, getValues } = methods;

  const handleClick = () => {
    const { product, service } = getValues();
    if (!product?.length && !service?.length) {
      alert("Please select Products or Services.");
      return;
    }

    const value = getValues();
    console.log("Form Data", value);
    handleQuestion("next");
    // else{

    // }

  };

  const products = industryData?.companyId?.products || [];
  const services = industryData?.companyId?.services || [];

  return (
    <Grid
      container

      spacing={2}
      justifyContent={"space-between"}

    >
      <Grid item xs={12}>
        {/* <Typography variant="caption2">Target Product</Typography>
        <br /> */}
        <Typography variant="AvgHeading">
          Pick the product or service you want to create engagement around.
        </Typography>

        {/* Products */}
        <Grid display={"flex"} gap={4}>

        <FormGroup style={{ margin: "0.5rem 0rem", width: "350px" }}>
          <FormLabel component="legend" sx={{ mb: 1 }}>
            <Typography variant="smallGreyHeading">PRODUCTS</Typography>
          </FormLabel>
          {products.length > 0 ? (
            products.map((product) => (
              <FormControlLabel
                key={product._id}
                sx={{
                  width: "100%",
                  border: "1px solid #d2d2d2",
                  borderRadius: 2,
                  mb: 1,
                  ml: 0,
                }}
                control={
                  <Controller
                    name="product"
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        checked={(field.value || []).includes(product.name)}
                        onChange={(e) => {
                          const checkedValue = e.target.checked;
                          const currentValue = field.value || [];
                          const updatedValue = checkedValue
                            ? [...currentValue, product.name]
                            : currentValue.filter(
                                (name) => name != product.name
                              );
                          field.onChange(updatedValue);
                        }}
                      />
                    )}
                  />
                }
                label={
                  <span style={{ fontSize: "0.87rem" }}>{product.name}</span>
                }
              />
            ))
          ) : (
            <Typography>No products available</Typography>
          )}
        </FormGroup>

        {/* Services */}
        <FormGroup style={{ margin: "0.5rem 0rem", width: "350px" }}>
          <FormLabel component="legend" sx={{ mb: 1 }}>
            <Typography variant="smallGreyHeading">SERVICES</Typography>
          </FormLabel>
          {services.length > 0 ? (
            services.map((service) => (
              <FormControlLabel
                key={service._id}
                sx={{
                  width: "100%",
                  border: "1px solid #d2d2d2",
                  borderRadius: 2,
                  mb: 1,
                  ml: 0,
                }}
                control={
                  <Controller
                    name="service"
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        checked={(field.value || []).includes(service.name)}
                        onChange={(e) => {
                          const checkedValue = e.target.checked;
                          const currentValue = field.value || [];
                          const updatedValue = checkedValue
                            ? [...currentValue, service.name]
                            : currentValue.filter(
                                (name) => name != service.name
                              );
                          field.onChange(updatedValue);
                        }}
                      />
                    )}
                  />
                }
                label={
                  <span style={{ fontSize: "0.87rem" }}>{service.name}</span>
                }
              />
            ))
          ) : (
            <Typography>No services available</Typography>
          )}
        </FormGroup>
        </Grid>
      </Grid>

     
    </Grid>
  );
};

export default ProductsServices;
