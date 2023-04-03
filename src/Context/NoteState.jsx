import React, { useState,useEffect } from "react";
import NoteContex from "./NoteContex";
const baseUrl = "http://localhost:5000"



function NoteState(props) {
  const initialNotes = []
    
  const [notes, setNotes] = useState(initialNotes);
  const [count, setCount] = useState(0);
  useEffect(()=>{
    getNote();
  },[count])

  const token = localStorage.getItem('token');
  const getNote = async()=>{
  
    const option = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token
           }
    };

    const response = await fetch(`${baseUrl}/api/notes/getAllNotes`, option);
    const result =await response.json()
    console.log("I am GetNote Function...")
   setNotes(result);

  }
  
  // Add note function is here
  const addNote = async({ title, description, tag }) => {

    // using API End Point and store data in backend
    const option = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          token,
      },
      body: JSON.stringify({title, description, tag}),
    };

    const response = await fetch(`${baseUrl}/api/notes/addNote`, option);
    const result = await response.json()
    console.log(result);

    // client Side Add note

    const note = {
      title,
      description,
      tag,
    };

    setNotes(notes.concat(note));
  };

  // Delete Note fuction is here
  const deleteNote = async(id) => {

    // Delete note in Backend using api end point
    const option = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          token,
      }
    };

    const response = await fetch(`${baseUrl}/api/notes/deleteNote/${id}`, option);
    const result = await response.json()
    console.log(result);


    // Delete Note in Client side
    const afterDeleteNotes = notes.filter((note) => {
      return id !== note._id;
    });
    setNotes(afterDeleteNotes);
  };

  
  
  // Edit Note function is here
  
  const editNote = async ({ _id, title, description, tag }) => {
    // using api editNote  in Backed.
    const option = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":token,
      },
      body: JSON.stringify({title, description, tag}),
    };

    const response = await fetch(`${baseUrl}/api/notes/updateNote/${_id}`, option);
    const result = await response.json()
    console.log(result);
  };
  return (
    <NoteContex.Provider value={{ notes, addNote, deleteNote, editNote, getNote, setCount }}>
      {props.children}
    </NoteContex.Provider>
  );
}

export default NoteState;
