import React, { useContext, useState } from "react";
import NoteContex from "../Context/NoteContex";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useFormik} from 'formik';
import * as Yup from 'yup';
 
 
const initialValues = {
  title: "",
  description: "",
  tag: "",
}


 const validationSchema = Yup.object({
  title: Yup.string().min(5).max(50).required("Please Enter Title"),
  description: Yup.string().min(5).max(150).required("Please Enter Description"),
  tag: Yup.string(),
 })

  

function AddNote() {
   
  const {values, errors, handleBlur,touched, handleChange, handleSubmit, handleReset} = useFormik({
    initialValues,
    onSubmit: (values, action)=>{
      addNote(values);
      toast.success("SuccesFully Added!",{
        position: "top-center",
        theme: "colored",
        autoClose: 3000,
      });
      
      setCount((c)=>c+1)
      action.resetForm(); 
    },
    onReset:()=>{
      toast.success("SuccesFully Reseted!",{
        position: "top-center",
        theme: "colored",
        autoClose: 3000,
      });
    },
    validationSchema,
  })
  const { addNote, setCount } = useContext(NoteContex);
  
 
 

  return (
    <>

     
      <h1 className="mt-5" id='forLoginFormTitleColor'>Add Notes</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label id="forLoginFormTextColor" htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control bg-glass"
            id="title"
            name="title"
            onChange={handleChange}
            aria-describedby="emailHelp"
            value={values.title}
            onBlur={handleBlur}
          />
          {errors.title && touched.title ? <p id="forLoginFormTextColor" className="error">{errors.title}</p>:null}
        </div>
        <div className="mb-3">
          <label id="forLoginFormTextColor" htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control bg-glass"
            id="description"
            onChange={handleChange}
            onBlur={handleBlur}
            name="description"
            value={values.description}
          />
          {errors.description && touched.description ? <p id="forLoginFormTextColor" className="error">{errors.description}</p>:null}
        </div>
        <div className="mb-3">
          <label id="forLoginFormTextColor" htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control bg-glass"
            id="tag"
            onChange={handleChange}
            onBlur={handleBlur}
            name="tag"
            value={values.tag}
          />
        </div>

        <button type="submit" className="btn btn-primary ">
          Add Note
        </button>
        <button type="reset" onClick={handleReset} className="btn btn-primary mx-3">
          Reset Note
        </button>
        <ToastContainer />
      </form>
    </>
  );
}

export default AddNote;
