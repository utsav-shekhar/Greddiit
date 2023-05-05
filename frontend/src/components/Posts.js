import React from "react";
import { useContext } from "react";
import noteContext from "../context/notes/noteContext";
import AddNote from "./AddNote";
import Noteitem from "./Noteitem";
import Notes from "./Notes";
function Posts() {
  const context = useContext(noteContext);
  const { notes, setNotes } = context;
  return (
    <div>
   {/* <AddNote/> */}
      <Notes/>
       
      </div>
      
    // </div>
   
  );
}

export default Posts;
