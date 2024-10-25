import { Alert, Snackbar } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";

const useFormArrayData = ({ name }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const {
    control,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm();

  const { fields, append, remove, reset } = useFieldArray({
    control,
    name,
  });

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
      console.log("Response", response.data);
      if (response.data.status === "success")
        setValue(name, response.data.data);
    } catch (error) {
      console.log("Error", error);
    }
  };

  const handleRemoveField = (index) => remove(index);

  const onSubmit = async (data) => {
    try {
      console.log("Submitting", data);
      const endpoint = `customer/${company_name}/adddata`;
      const apiUrl = `/api/proxy?endpoint=${endpoint}`;
      const response = await axios.post(apiUrl, {
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
    fields,
    append,
    handleRemoveField,
    remove,
    append,
    ToastBar,
  };
};

export default useFormArrayData;
