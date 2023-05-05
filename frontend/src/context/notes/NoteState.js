import NoteContext from "./noteContext";
import { useState } from "react";

import React from "react";

const NoteState = (props) => {
  const host = "http://localhost:8000";
  const notesInitial = [];
  // Get all Notes
  const getNotes = async () => {
    // API Call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
        localStorage.getItem('token'),
      },
    });
    const json = await response.json();
    // console.log(json)
    setNotes(json);
  };
  //add a note
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    console.log("the note is added");
    // const note = {
    //   _id: "63ed36b09a12c155c4fdbad4",
    //   user: "63e930dc5e49717681285eac",
    //   title: title,
    //   description: description,
    //   tag: tag,
    //   date: "2023-02-15T19:46:56.852Z",
    //   __v: 0,
    // };
    const note = await response.json();
    setNotes(notes.concat(note));
  };
  // add a note

  //edit a note
  const editNote = async (id, title, description, tag) => {
    // API Call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();

    let newNotes = JSON.parse(JSON.stringify(notes));
    // Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };
  //delete a note
  const deleteNote = async (id) => {
    // API Call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = response.json(); 
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }

  const [notes, setNotes] = useState(notesInitial);
  return (
    <NoteContext.Provider value={{ notes, addNote, editNote, deleteNote, getNotes}}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
