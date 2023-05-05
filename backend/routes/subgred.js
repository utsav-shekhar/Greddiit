const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Subgred = require("../models/Subgred");
const { body, validationResult } = require("express-validator");
const joinSg = require("../middleware/subgredController")
const Sg = require("../models/Subgred");
// const Sg = require("../models/sg");

// Controller function to handle the route

//getting the stored subgreddits
router.get("/fetchallspaces", fetchuser, async (req, res) => {
  try {
    const subgreddits = await Subgred.find({ user: req.user.id });
    res.json(subgreddits);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});
//adding a new subgreddit
router.post(
  "/addspace",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 1 }),
    body("tag", "Enter the tag in lowercase").isLength({ min: 1 }),
    body("description", "Description must be atleast 5 characters").isLength({
      min: 1,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;

      // If there are errors, return Bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const subg = new Subgred({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedSubgred = await subg.save();

      res.json(savedSubgred);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);
//deleting a subgreddit
router.delete("/deletespace/:id", fetchuser, async (req, res) => {
  try {
    // Find the note to be delete and delete it
    let subgred = await Subgred.findById(req.params.id);
    if (!subgred) {
      return res.status(404).send("Not Found");
    }

    // Allow deletion only if user owns this Note
    if (subgred.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    subgred = await Subgred.findByIdAndDelete(req.params.id);
    res.json({ Success: "Subgreddit has been deleted", subgred: subgred });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});
//get all subgred data
router.get("/sg", async (req, res) => {
  try {
    const sgData = await Sg.find();
    res.json(sgData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
router.post("/getuserfromid", async (req, res) => {
    try {
        const userId = ObjectId(req.body.id);

        const user = await User.findOne({ "_id": userId });
        res.send(user);

    } catch (error) {
        res.status(500).send(error.message);
    }
})


router.post("/sg/:id/join", async (req, res) => {
  const { id } = req.params; // Get the SG ID from the request params
  const { userId } = req.body; // Get the user ID from the request body
  console.log("id and userID")
  console.log(id)
  console.log(userId)
  
  try {
    const sg = await Sg.findOneAndUpdate(
      {"_id" : id},
      { $push: { requests: userId } }, // Use $push to add the user ID to the requests array
      { new: true } // Set { new: true } to return the updated document
    );
    res.status(200).json(sg); // Send the updated SG document as the response
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});
module.exports = router;
