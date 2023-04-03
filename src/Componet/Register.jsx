import React,{useState} from "react";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import { Navigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RadiusShape from "./RadiusShape";


const baseUrl = "http://localhost:5000";

const registerSchema = Yup.object({
  firstName: Yup.string().min(2).max(25).required("Please Enter First Name"),
  lastName: Yup.string().min(2).max(25).required("Please Enter last Name"),
  email: Yup.string().email().required("Please enter email."),
  password: Yup.string().min(6).required("please enter password"),
  confirm_password: Yup.string()
    .min(6)
    .oneOf([Yup.ref("password"), null], "password must match"),
});

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirm_password: "",
};

function Register() {
  const [isRegister, setIsRegister] = useState(false);
  const { values, handleSubmit,handleReset, handleBlur, handleChange, touched, errors } =
    useFormik({
      initialValues,
      onSubmit: async(value, action) => {
        const {firstName, email, password} = value;
         
        // save in DataBase using api call
        const option = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            },
          body: JSON.stringify({name:firstName ,email, password}),
        };
    
        const response = await fetch(`${baseUrl}/api/auth/createUser`, option);
        const result = await response.json()
        setIsRegister(true)
        
        if(result.error){
          toast.error(result.error, {
            position: "top-center",
            autoClose: 3000,
            theme: "colored",
          })
        }
        else{
          toast("SuccessFully Registred!");
        }
        action.resetForm();



      },
      onReset:()=>{
        toast.info("Successfully Reseted!", {
          position: "top-center",
          autoClose: 3000,
          theme: "colored",
        })
      },
      validationSchema: registerSchema,
    });
    if (isRegister) {
      return <Navigate to="/login" replace={true}/>;
    }


  return (
    <div>
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
              <h1
                id="forLoginFormTitleColor"
                className="my-5 display-5 fw-bold ls-tight"
              >
                {/* style="color: hsl(218, 81%, 95%) */}
                The best offer <br />
                {/* <span style={{color: hsl(218, 81%, 75%)}}>for your business</span> */}
              </h1>
              {/* style=color: hsl(218, 81%, 85%)" */}
              <p id="forLoginFormTextColor" className="mb-4 opacity-70">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Temporibus, expedita iusto veniam atque, magni tempora mollitia
                dolorum consequatur nulla, neque debitis eos reprehenderit quasi
                ab ipsum nisi dolorem modi. Quos?
              </p>
            </div>

            <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
              <RadiusShape/>

              <div className="card bg-glass">
                <div className="card-body px-4 py-5 px-md-5">
                  {/* <!-- Email input --> */}

                  <form action="" onSubmit={handleSubmit}>
                     
                      
                      <div className="info-text">
                        <p >
                          Please enter the following Information to create your
                          account.
                        </p>
                      </div>
                      <div className="box">
                        <div className="firstName">
                          <TextField
                          className="mt-4"
                            required
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
                            required
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
                          required
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
                            required
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
                            required
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
                          {errors.confirm_password &&
                          touched.confirm_password ? (
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
                  </form>
                </div>
              </div>
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
