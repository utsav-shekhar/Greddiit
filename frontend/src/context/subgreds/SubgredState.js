import SubgredContext from "./subgredContext";
import { useState } from "react";

import React from "react";
//subgred and subgreds
const SubgredState = (props) => {
  const host = "http://localhost:8000";
  const subgredsInitial = [];
  // Get all Notes
  const getSubgreds = async () => {
    // API Call
    const response = await fetch(`${host}/api/subgreddit/fetchallspaces`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    // console.log(json)
    setSubgreds(json);
  };
  //add a note
  const addSubgred = async (title, description, tag) => {
    const response = await fetch(`${host}/api/subgreddit/addspace`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    console.log("the space is created");
    const subgred = 
{
        _id: "63f4b328fc877b999bddb0e7",
        user: "63e930dc5e49717681285eac",
        title: title,
        description: description,
        tag: tag,
        followers: [],
        posts: [],
        __v: 0,
      };

    setSubgreds(subgreds.concat(subgred));
  };
  // add a note


  //delete a note
  const deleteSubgred = async (id) => {
    // API Call
    const response = await fetch(`${host}/api/subgreddit/deletespace/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = response.json();
    const newSubgreds = subgreds.filter((subgred) => {
      return subgred._id !== id;
    });
    setSubgreds(newSubgreds);
  };

  const [subgreds, setSubgreds] = useState(subgredsInitial);
  return (
    <SubgredContext.Provider
      value={{ subgreds, addSubgred, deleteSubgred, getSubgreds }}
    >
      {props.children}
    </SubgredContext.Provider>
  );
};

export default SubgredState;
