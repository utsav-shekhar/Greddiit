import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import subgredContext from "../context/subgreds/subgredContext";
// const func = () => {
//   navigate("/Profile/post");
// };
const Subgreditem = (props) => {

  const navigate = useNavigate();
  const context = useContext(subgredContext);
  const { deleteSubgred } = context;
  const { subgred } = props;
  const func = () =>{
    localStorage.setItem("subgreddit-id",subgred._id);
    navigate("/Profile/post")
  }
  return (
    <div>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{subgred.title}</h5>
          <p className="card-text">{subgred.description}</p>
          <p className="card-text">banned keywords : {localStorage.getItem("banned")}</p>
          <i
            class="fa-solid fa-trash"
            onClick={() => {
              deleteSubgred(subgred._id);
            }}
          ></i>
          <br></br>
          <i class="fa-regular fa-pen-to-square"></i>
          <div className="btn btn-primary" onClick={func} >
            Enter Space
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subgreditem;
