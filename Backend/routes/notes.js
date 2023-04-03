const express = require("express");
const router = express.Router();
const { fetchUser } = require("../middleware/userFetch");
const Note = require("../models/notes");
const { body, validationResult } = require("express-validator");

// Route : 1 endpoint is /api/notes/getAllNotes and this is GET request... login required
router.get("/getAllNotes", fetchUser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });

    res.send(notes);
  } catch (error) {
    res.status(500).send("Internal server Error");
  }
});

// Route : 2 endpoint is /api/notes/addNote and this is POST request... login required

router.post(
  "/addNote",
  fetchUser,
  [
    body("title", "Title should be atleast 3 character").isLength({ min: 3 }),
    body("description", "name should be atleast 5 character").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { title, description, tag } = req.body;

      const note = new Note({
        user: req.user.id,
        title,
        description,
        tag,
      });

      const result = await note.save();
      res.send(result);
    } catch (error) {
      res.status(500).send("Internal server Error");
    }
  }
);

// Route : 3 endpoint is /api/notes/updateNote:id and this is PUT request... login required

router.put(
  "/updateNote/:id",
  fetchUser,
  [
    body("title", "Title should be atleast 3 character").isLength({ min: 3 }),
    body("description", "name should be atleast 5 character").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { title, description, tag } = req.body;
      let updateNote = await Note.findById(req.params.id);

      if (title) {
        updateNote.title = title;
      }
      if (description) {
        updateNote.description = description;
      }
      if (tag) {
        updateNote.tag = tag;
      }

      if (!updateNote) {
        return res.status(404).send("Not Found");
      }

      if (updateNote.user.toString() !== req.user.id) {
        return res.status(400).send("Not Allowed");
      }
      // const id = req.params.id;
      const result = await Note.findByIdAndUpdate(
        req.params.id,
        { $set: updateNote },
        { new: true }
      );
      res.send(result);
    } catch (error) {
      res.status(500).send("Internal server Error");
    }
  }
);

// Route : 4 endpoint is /api/notes/deleteNote:id and this is DELETE request... login required

router.delete(
  "/deleteNote/:id",
  fetchUser,

  async (req, res) => {
    try {
      let deleteNote = await Note.findById(req.params.id);

      if (!deleteNote) {
        return res.status(404).send("Not Found");
      }

      if (deleteNote.user.toString() !== req.user.id) {
        return res.status(400).send("Not Allowed");
      }

      const result = await Note.findByIdAndDelete(req.params.id);
      res.send(result);
    } catch (error) {
      res.status(500).send("Internal server Error");
    }
  }
);

module.exports = router;
