import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";

const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getNotes } = context;
  useEffect(() => {
    getNotes();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <AddNote />
      <div className="container my-3">
        <h2>Posts</h2>
        {notes.map((note) => {
          return <Noteitem note={note} />;
        })}
      </div>
    </>
  );
};

export default Notes;
