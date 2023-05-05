const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');

// ROUTE 1: Get All the Notes using: GET "/api/notes/getuser". Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
router.put('/notes/:id/savedforlater', async (req, res) => {
    try {
      const note = await Note.findByIdAndUpdate(req.params.id, { saved: true }, { new: true });
      res.json(note);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  });
router.put('/notes/:id', async (req, res) => {
    const { postedby, postedin } = req.body;
    const noteId = req.params.id;
  
    try {
      // Find the note by ID
      const note = await Note.findById(noteId);
  
      if (!note) {
        return res.status(404).json({ message: 'Note not found' });
      }
  
      // Update the note's postedby and postedin values
      note.postedby = postedby;
      note.postedin = postedin;
  
      // Save the updated note
      const updatedNote = await note.save();
  
      res.json(updatedNote);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  module.exports = router;

// ROUTE 2: Add a new Note using: POST "/api/notes/addnote". Login required
// router.post('/addnote', fetchuser, [
//     body('title', 'Enter a valid title').isLength({ min: 1 }),
//     body('description', 'Description must be atleast 5 characters').isLength({ min: 1 }),], async (req, res) => {
//         try {
//             const { title, description, tag, postedin,postedby, subgredditID} = req.body;

//             // If there are errors, return Bad request and the errors
//             const errors = validationResult(req);
//             if (!errors.isEmpty()) {
//                 return res.status(400).json({ errors: errors.array() });
//             }
//             const note = new Note({
//                 title, description, tag,postedin, postedby, subgredditID, user: req.user.id
//             })
//             const savedNote = await note.save()

//             res.json(savedNote)

//         } catch (error) {
//             console.error(error.message);
//             res.status(500).send("Internal Server Error");
//         }
//     })
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 1 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 1 })
], async (req, res) => {
    try {
        const { title, description, tag, subgredditID } = req.body;
        let { postedin, postedby } = req.body;

        // If there are errors, return Bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Update postedby and postedin if stored in local storage
        // if (localStorage.getItem('postedby')) {
        //     postedby = localStorage.getItem('postedby');
        // }
        // if (localStorage.getItem('postedin')) {
        //     postedin = localStorage.getItem('postedin');
        // }

        const note = new Note({
            title,
            description,
            tag,
            postedin,
            postedby,
            subgredditID,
            user: req.user.id
        });

        const savedNote = await note.save();
        res.json(savedNote);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});


// ROUTE 3: Update an existing Note using: PUT "/api/notes/updatenote". Login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        // Create a newNote object
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        // Find the note to be updated and update it
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 4: Delete an existing Note using: DELETE "/api/notes/deletenote". Login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        // Find the note to be delete and delete it
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }

        // Allow deletion only if user owns this Note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been deleted", note: note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
  router.get('/savednotes', async (req, res) => {
    try {
      const notes = await Note.find();
      res.json(notes);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  });
  
module.exports = router