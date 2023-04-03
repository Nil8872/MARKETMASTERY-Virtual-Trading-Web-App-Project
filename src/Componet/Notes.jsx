import React, { useContext } from "react";
import NoteItems from "./NoteItems";
import NoteContex from "../Context/NoteContex";

function Notes() {
    const { notes } = useContext(NoteContex);
  console.log(notes)
  return (
    <div className="row">
      <h1 className="my-3" id='forLoginFormTitleColor'>Your Notes</h1>
    {notes.length == 0 ? <h3 style={{color:"green"}}>Empty: no notes to show</h3>
    :notes.map((note) => {
      return <NoteItems key={note._id} note={note}/> 
    })}
    
      
    </div>
  );
}

export default Notes;
