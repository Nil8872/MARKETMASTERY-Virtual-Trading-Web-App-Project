import React, { useState } from "react";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import { Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RadiusShape from "../Componet/RadiusShape"; 

const baseUrl = "http://localhost:5000";

const toastyStyle = {
  position: "top-right",
  autoClose: 3000,
  theme: "colored",
  draggable: true,
};

const registerSchema = Yup.object({
  firstName: Yup.string().min(2).max(25).required("Please Enter First Name"),
  lastName: Yup.string().min(2).max(25).required("Please Enter last Name"),
  email: Yup.string().email().required("Please enter email."),
  password: Yup.string().min(6).required("please enter password"),
  confirm_password: Yup.string()
    .min(6)
    .oneOf([Yup.ref("password"), null], "password must match"),
  startAmount: Yup.number()
    .required("Please Enter Amount")
    .min(10000, "Amount must be at least 10000")
    .max(100000, "Amount cannot exceed 100000"),
});

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirm_password: "",
  startAmount: 0,
};

function Register() {
  const [isRegister, setIsRegister] = useState(false);
  const {
    values,
    handleSubmit,
    handleReset,
    handleBlur,
    handleChange,
    touched,
    errors,
  } = useFormik({
    initialValues,
    onSubmit: async (values, action) => {
      const { firstName, email, password, startAmount } = values;

      // save in DataBase using api call
      console.log(firstName + " " + email + " " + password);
      const option = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: firstName,
          email,
          password,
          startAmount,
          availMargin: startAmount,
        }),
      };

      try{
        const response = await fetch(`${baseUrl}/api/auth/createUser`, option);
        const result = await response.json(); 
        console.log(result);
        if(result.success){
          setIsRegister(true);
          toast.success(result.message, toastyStyle);
          action.resetForm();
  
        }
        else{
          toast.error(result.errors[0].msg, toastyStyle) 
        }
      }catch(err){
        console.log(err);
        console.log("Error:");
      }


    },
    onReset: () => {
      toast.info("Successfully Reseted!", {
        position: "top-center",
        autoClose: 3000,
        theme: "colored",
      });
    },
    validationSchema: registerSchema,
  });
  if (isRegister) {
    return <Navigate to="/login" replace={true} />;
  }

  return (
    <div>
            <ToastContainer />
      <section
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        className="background-radial-gradient overflow-hidden"
      >
        <div className="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
          <div className="row gx-lg-5 align-items-center mb-5">
            <div className="col-lg-6 mb-5 mb-lg-0">
              <div className="card bg-glass">
                <div className="card-body px-4 py-5 px-md-5">
                  <div className="info-text">
                    <p>
                      How much money do you want to start trading with? (10K to
                      10L)
                    </p>
                  </div>
                  <div className="firstName">
                    <TextField
                      className="mt-4"
                      sx={{ width: "100%" }}
                      id="startAmount"
                      label="Amount"
                      placeholder="Enter Amount"
                      type="number"
                      name="startAmount"
                      onChange={handleChange}
                      value={values.startAmount}
                      onBlur={handleBlur}
                    />
                    {errors.startAmount && touched.startAmount ? (
                      <p className="error">{errors.startAmount}</p>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
              <RadiusShape />

              <form action="" onSubmit={handleSubmit}>
                <div className="card bg-glass">
                  <div className="card-body px-4 py-5 px-md-5">
                    {/* <!-- Email input --> */}
                    <div className="info-text">
                      <p>
                        Please enter the following Information to create your
                        account.
                      </p>
                    </div>
                    <div className="box">
                      <div className="firstName">
                        <TextField
                          className="mt-4"
                          sx={{ width: "100%" }}
                          id="firstName"
                          label="First Name"
                          placeholder="Enter Your First Name"
                          type="text"
                          name="firstName"
                          onChange={handleChange}
                          value={values.firstName}
                          onBlur={handleBlur}
                        />
                        {errors.firstName && touched.firstName ? (
                          <p className="error">{errors.firstName}</p>
                        ) : null}
                      </div>
                      <div className="lastName">
                        <TextField
                          className="mt-4"
                          sx={{ width: "100%" }}
                          id="lastName"
                          label="Last Name"
                          placeholder="Enter Your Last Name"
                          name="lastName"
                          onChange={handleChange}
                          type="text"
                          value={values.lastName}
                          onBlur={handleBlur}
                        />
                        {errors.lastName && touched.lastName ? (
                          <p className="error">{errors.lastName}</p>
                        ) : null}
                      </div>
                    </div>
                    <div className="email">
                      <TextField
                        className="mt-4"
                        type="email"
                        sx={{ width: "100%" }}
                        id="email"
                        label="Eamil"
                        onChange={handleChange}
                        name="email"
                        placeholder="Enter Your Email"
                        value={values.email}
                        onBlur={handleBlur}
                      />
                      {errors.email && touched.email ? (
                        <p className="error">{errors.email}</p>
                      ) : null}{" "}
                    </div>
                    <div className="box">
                      <div className="firstName ">
                        <TextField
                          className="mt-4"
                          sx={{ width: "100%" }}
                          id="password"
                          label="Password"
                          placeholder="Enter Password"
                          onChange={handleChange}
                          type="password"
                          name="password"
                          autoComplete="off"
                          value={values.password}
                          onBlur={handleBlur}
                        />
                        {errors.password && touched.password ? (
                          <p className="error">{errors.password}</p>
                        ) : null}{" "}
                      </div>
                      <div className="lastName ">
                        <TextField
                          className="mt-4"
                          sx={{ width: "100%" }}
                          id="comfirm_password"
                          label="Confirm Password"
                          placeholder="Enter Confirm Password"
                          name="confirm_password"
                          type="password"
                          autoComplete="off"
                          onChange={handleChange}
                          value={values.confirm_password}
                          onBlur={handleBlur}
                        />
                        {errors.confirm_password && touched.confirm_password ? (
                          <p className="error">{errors.confirm_password}</p>
                        ) : null}{" "}
                      </div>
                    </div>

                    {/* <!-- Submit button --> */}
                    <Stack className="mt-4" direction="row" spacing={2}>
                      <Button
                        type="submit"
                        className="btn btn-primary btn-block mb-4"
                        color="primary"
                        variant="contained"
                      >
                        Register
                      </Button>
                      <Button
                        type="reset"
                        className="btn btn-primary btn-block mb-4"
                        color="primary"
                        variant="contained"
                        onClick={handleReset}
                      >
                        Reset
                      </Button>
                    </Stack>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- Section: Design Block --> */}.
      <ToastContainer />
    </div>
  );
}

export default Register;
