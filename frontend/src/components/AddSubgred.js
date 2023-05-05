import React, { useContext, useEffect, useRef, useState } from "react";
import subgredContext from "../context/subgreds/subgredContext";

const AddSubgred = () => {
  const context = useContext(subgredContext);
  const { addSubgred } = context;

  const [subgred, setSubgred] = useState({ title: "", description: "", tag: "default" });
  const [ban, setBan] = useState("none")
  const handleClick = (e) => {
    localStorage.setItem("banned",ban)
    e.preventDefault();
    addSubgred(subgred.title, subgred.description, subgred.tag);
    setSubgred({ title: "", description: "", tag: "" });
  };

  const onChange = (e) => {
    
    setSubgred({ ...subgred, [e.target.name]: e.target.value });
  };
  const onChanged = (e) => {
    setBan(e.target.value)
   };
  return (
    <div className="container my-3">
      <h2>Add a subgred</h2>
      <form className="my-3">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            aria-describedby="emailHelp"
            value={subgred.title}
            onChange={onChange}
            minLength={1}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            value={subgred.description}
            onChange={onChange}
            minLength={1}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            value={subgred.tag}
            onChange={onChange}
            minLength={1}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="bannerkeyword" className="form-label">
            Banned keywords
          </label>
          <input
            type="text"
            className="form-control"
            id="Banned keywords"
            name="Banned keywords"
            value = {ban}
            onChange={onChanged}
            required
          />
        </div>
        

        <button
          disabled={subgred.title.length < 1 || subgred.description.length < 1}
          type="submit"
          className="btn btn-primary"
          onClick={handleClick}
        >
          Create Space
        </button>
      </form>
    </div>
  );
};

export default AddSubgred;
