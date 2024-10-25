import { Alert, Snackbar } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";

const useExtractData = ({ name, item1, item2, item3, item4 }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const {
    control,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm();
  const { company_name } = router.query;

  const {
    fields: itemField1,
    append: appendItem1,
    remove: removeItem1,
    replace: replace1,
  } = useFieldArray({
    control,
    name: `${name}.${item1}`,
  });
  const {
    fields: itemField2,
    append: appendItem2,
    remove: removeItem2,
    replace: replace2,
  } = useFieldArray({
    control,
    name: `${name}.${item2}`,
  });
  const {
    fields: itemField3,
    append: appendItem3,
    remove: removeItem3,
    replace: replace3,
  } = useFieldArray({
    control,
    name: `${name}.${item3}`,
  });
  const {
    fields: itemField4,
    append: appendItem4,
    remove: removeItem4,
    replace: replace4,
  } = useFieldArray({
    control,
    name: `${name}.${item4}`,
  });

  const fetchData = async () => {
    try {
      const endpoint = `customer/${company_name}/${name}/getdata`;
      const apiUrl = `/api/proxy?endpoint=${endpoint}`;
      const response = await axios.get(apiUrl);

      console.log("Response", response.data);
      if (response.data.status === "success") {
        const resData = response.data.data;
        replace1(resData[item1]);
        replace2(resData[item2]);
        replace3(resData[item3]);
        replace4(resData[item4]);
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    if (company_name) {
      fetchData();
    }
  }, [company_name]);

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
    itemField1,
    itemField2,
    itemField3,
    itemField4,
    appendItem1,
    appendItem2,
    appendItem3,
    appendItem4,

    removeItem1,
    removeItem2,
    removeItem3,
    removeItem4,
    ToastBar,
  };
};

export default useExtractData;
