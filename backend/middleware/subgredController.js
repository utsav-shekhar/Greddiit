const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Subgred = require("../models/Subgred");
const { body, validationResult } = require("express-validator");

const Sg = require("../models/Subgred");
const joinSg = async (req, res) => {
    const { id } = req.params; // Get the SG ID from the request params
    const { userId } = req.body; // Get the user ID from the request body
    console.log("id and userID")
    console.log(id)
    console.log(userId)
    try {
      const sg = await Sg.findByIdAndUpdate(
        id,
        { $push: { requests: userId } }, // Use $push to add the user ID to the requests array
        { new: true } // Set { new: true } to return the updated document
      );
      res.status(200).json(sg); // Send the updated SG document as the response
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  };
  
  module.exports = { joinSg };
  