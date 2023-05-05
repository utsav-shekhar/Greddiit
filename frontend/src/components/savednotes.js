import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
const host = "http://localhost:8000";

function NotesList() {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [savedNotes, setSavedNotes] = useState([]);
  useEffect(() => {
    if (window.localStorage.getItem("perm") == null) {
      navigate("/");
    }
  });
  useEffect(() => {
    fetch(`${host}/api/notes/savednotes`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Network response was not ok');
        }
      })
      .then(notes => {
        setNotes(notes);
        setSavedNotes(notes.filter(item => item.saved && item.user === userId));
      })
      .catch(error => {
        console.error('There was a problem fetching the notes:', error);
      });
  }, []);

  const userId = localStorage.getItem("userId");

  return (
    <div>
      <h1>Saved posts List</h1>
      <ul>
        {notes.map(note => (
          <li key={note._id}>
            <h2>{note.title}</h2>
            <p>{note.description}</p>
            
            <p>Tag: {note.tag}</p>
            <p>Date: {note.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}


export default NotesList;
