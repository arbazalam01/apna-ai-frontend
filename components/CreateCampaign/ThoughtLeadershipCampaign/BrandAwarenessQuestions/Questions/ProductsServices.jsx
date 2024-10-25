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
      minHeight={"75vh"}
      spacing={2}
      justifyContent={"space-between"}
      mb={10}
    >
      <Grid item xs={12}>
        <Typography variant="caption2">Target Product</Typography>
        <br />
        <Typography variant="AvgHeading">
         Which are the most relevant products or services for the theme.
        </Typography>

        {/* Products */}
        <FormGroup style={{ margin: "0.5rem 0rem" }}>
          <FormLabel component="legend" sx={{ mb: 1 }}>
            <Typography variant="smallGreyHeading">PRODUCTS</Typography>
          </FormLabel>
          {products.length > 0 ? (
            products.map((product) => (
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
        <FormGroup style={{ margin: "0.5rem 0rem" }}>
          <FormLabel component="legend" sx={{ mb: 1 }}>
            <Typography variant="smallGreyHeading">SERVICES</Typography>
          </FormLabel>
          {services.length > 0 ? (
            services.map((service) => (
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
        <Button variant="button2" onClick={handleClick}>
          Proceed
        </Button>
      </Grid>
    </Grid>
  );
};

export default ProductsServices;
