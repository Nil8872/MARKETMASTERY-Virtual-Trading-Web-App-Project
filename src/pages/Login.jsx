import React, { useState, useContext } from "react";

import Button from "@mui/material/Button";
import { useFormik } from "formik";
import * as Yup from "yup"; 
import { Navigate } from "react-router-dom"; 
import UserContext from "../Context/UserContex";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RadiusShape from "../Componet/RadiusShape";

const baseUrl = "http://localhost:5000";
function Login() { 
  const { setUserCount } = useContext(UserContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Enter Valid Email")
      .required("Please enter email"),
    password: Yup.string().required("Please enter password"),
  });

  const { errors, values, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues,
      onSubmit: async (values, action) => {
        const { email, password } = values;
        const option = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        };

        const response = await fetch(`${baseUrl}/api/auth/login`, option);
        const result = await response.json(); 

        if (result.success) {
          localStorage.setItem("token", result.userToken);
          console.log("ssucess");
          setIsLoggedIn(true); 
          setUserCount((c)=>c+1);
          toast("Login SuccessFully!");
        } else {
          toast.error(result.error, {
            position: "top-center",
            autoClose: 3000,
            theme: "colored",
          });
        }

        action.resetForm();
      },
      validationSchema,
    });

  
  if (isLoggedIn) {
    return <Navigate to="/" replace={true} />;
  }
  return (
    <>
      <div className="" style={{height:"92vh"}}>
        {/* <!-- Section: Design Block --> */}

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
                  The best offer
                </h1>

                <p id="forLoginFormTextColor" className="mb-4 opacity-70">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Temporibus, expedita iusto veniam atque, magni tempora
                  mollitia dolorum consequatur nulla, neque debitis eos
                  reprehenderit quasi ab ipsum nisi dolorem modi. Quos?
                </p>
              </div>

              <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
                <RadiusShape />
                <div className="card bg-glass">
                  <div className="card-body px-4 py-5 px-md-5">
                    <form onSubmit={handleSubmit}>
                      {/* <!-- Email input --> */}
                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="form3Example3">
                          Email address
                        </label>
                        <input
                          type="email"
                          id="form3Example3"
                          name="email"
                          className="form-control"
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.email && touched.email ? (
                          <div style={{ color: "red" }} className="error">
                            {errors.email}
                          </div>
                        ) : null}
                      </div>

                      {/* <!-- Password input --> */}
                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="form3Example4">
                          Password
                        </label>
                        <input
                          type="password"
                          autoComplete="off"
                          id="form3Example4"
                          className="form-control"
                          name="password"
                          value={values.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.password && touched.password ? (
                          <div style={{ color: "red" }} className="error">
                            {errors.password}
                          </div>
                        ) : null}
                      </div>

                      {/* <!-- Submit button --> */}
                      <Button
                        type="submit"
                        className="btn btn-primary btn-block mb-4"
                        color="primary"
                        variant="contained"
                      >
                        Login
                      </Button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <ToastContainer />
        {/* <!-- Section: Design Block --> */}
      </div>
    </>
  );
}

export default Login;
