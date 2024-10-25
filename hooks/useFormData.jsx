import { Alert, Snackbar } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { set, useFieldArray, useForm } from "react-hook-form";

const useFormData = ({ name, schema }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { isSubmitting },
  } = useForm();
  const { company_name } = router.query;

  useEffect(() => {
    if (company_name) {
      fetchData();
    }
  }, [company_name]);
  const fetchData = async () => {
    try {
      const endpoint = `customer/${company_name}/${name}/getdata`;
      const apiUrl = `/api/proxy?endpoint=${endpoint}`;
      const response = await axios.get(apiUrl);

      if (response.data.status === "success") {
        reset({ [name]: response.data.data });
      } else {
        reset();
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  const onSubmit = async (data) => {
    try {
      console.log("Submitting", data);

      const endpoint = `customer/${company_name}/adddata`;
      const apiUrl = `/api/proxy?endpoint=${endpoint}`;

      await axios.post(apiUrl, {
        type: name,
        data: data[name],
      });
      setOpen(true);
    } catch (error) {
      console.log("Error", error);
    }
  };

  const ToastClose = () => {
    setOpen(false);
  };

  const ToastBar = () => {
    return (
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={ToastClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={ToastClose} severity="success" sx={{ width: "100%" }}>
          Data Saved Successfully!
        </Alert>
      </Snackbar>
    );
  };
  return {
    onSubmit,
    control,
    isSubmitting,
    handleSubmit,
    setValue,
    watch,
    ToastBar,
  };
};

export default useFormData;
