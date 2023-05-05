import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
const noteId = localStorage.getItem("userId")
const Noteitem = (props) => {
  const saveNoteForLater = async (noteId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/notes/${noteId}/save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ saved: true }),
      });
      const data = await response.json();
      console.log(data); // optional: log the response data
      return data; // optional: return the response data
    } catch (error) {
      console.error(error);
    }
  };
  const func = async () => {
    alert("the note is saved for later view");
    const savedNote = await saveNoteForLater(note._id);
    console.log(savedNote); // optional: log the saved note data
  };
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note } = props;

  // Define state variables for upvotes and downvotes
  const [upvotes, setUpvotes] = useState(0);
  const [downvotes, setDownvotes] = useState(0);

  // Define functions to toggle upvotes and downvotes
  const toggleUpvotes = () => {
    setUpvotes(upvotes === 0 ? 1 : 0);
  };

  const toggleDownvotes = () => {
    setDownvotes(downvotes === 0 ? 1 : 0);
  };

  return (
    <div>
      <div className="card">
        <div className="card-body ">
          <p className="card-text">Posted by : {localStorage.getItem("username")}</p>
          <p className="card-text">Posted in : {localStorage.getItem("subgreddit-id")}</p>
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          <i
            className="fa-solid fa-trash"
            onClick={() => {
              deleteNote(note._id);
            }}
          ></i>
          <br></br>
          <i className="fa-regular fa-pen-to-square"></i>
          <button className="btn btn-primary" onClick={() => saveNoteForLater(note._id)}>
  Save for later
</button>
          <button className="btn btn-success" onClick={toggleUpvotes}>
            Upvotes : {upvotes}
          </button>
          <button className="btn btn-danger" onClick={toggleDownvotes}>
            Downvotes : {downvotes}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
