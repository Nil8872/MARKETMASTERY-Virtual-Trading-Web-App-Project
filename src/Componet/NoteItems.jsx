import React, { useContext, useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import NoteContex from "../Context/NoteContex";

import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { AiFillCloseCircle } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: "10px",
  boxShadow: 24,
  p: 3,
};

function NoteItems(props) {
  //  This is for Modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // this is for Delete Note, Edit Note
  const { deleteNote, editNote, getNote, setCount } = useContext(NoteContex);

  // This is Note Props
  const { note } = props;

  // Use for Model Form

  const [Note, setNote] = useState(note);
  const handleDeleteBtn = () => {
    deleteNote(note._id);
    toast.error("Note was Deleted SuccessFully!", {
      position: "top-center",
      theme: "colored",
      autoClose: 3000,
    });
  };
  const handleExtraButtonClick = () => {
    setOpen(false);
    setNote(Note);
    editNote(Note);
    getNote();
    setCount((c) => c + 1);
    toast.success("Note Updated SuccessFully!", {
      position: "top-center",
      theme: "colored",
      autoClose: 3000,
    });
  };
  const handleOnChange = (e) => {
    setNote({
      ...Note,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography id="modal-modal-title" variant="h4" component="h2">
              Edit Note
            </Typography>
            <IconButton
              size="32px"
              fontSize="large"
              aria-label="delete"
              onClick={handleClose}
            >
              <AiFillCloseCircle style={{ color: "red", fontSize: "40px" }} />
            </IconButton>
          </div>
          <form onSubmit={handleExtraButtonClick}>
            {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}> */}
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                onChange={handleOnChange}
                aria-describedby="emailHelp"
                value={Note.title}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <input
                type="text"
                className="form-control"
                id="description"
                onChange={handleOnChange}
                name="description"
                value={Note.description}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="tag" className="form-label">
                Tag
              </label>
              <input
                type="text"
                className="form-control"
                id="tag"
                onChange={handleOnChange}
                name="tag"
                value={Note.tag}
              />
            </div>
            {/* </Typography> */}
            <Button
              type="submit"
              color="success"
              variant="contained"
              className="extra-button mt-3"
            >
              Save Note
            </Button>
          </form>
        </Box>
      </Modal>

      <div key={note._id} className="col-md-4 col-sm-6 col-lg-3 my-3 ">
        <div className="card bg-glass-md">
          <div className="card-body">
            <h5 className="card-title">{note.title}</h5>
            <p className="card-text">{note.description}</p>
            <p>Tag : {note.tag}</p>
            <p>Date: {note.date}</p>
            <div className="iconBtn">
              <MdDelete className="icon deleteBtn" onClick={handleDeleteBtn} />
              <Button onClick={handleOpen}>
                <FaEdit className="icon mx-3 editBtn" />
              </Button>
            </div>
          </div>
        </div>
      <ToastContainer />
      </div>
    </>
  );
}

export default NoteItems;
