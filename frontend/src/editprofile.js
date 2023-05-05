import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Logan from "./logan";
// import EditUserModal from "./components/editProfile";
import updateUser from "./components/updateUser";
import Login from "./login";

//edit modal function********************************
export default function Editprofile() {
  const [user, Setuser] = useState({
    name: "",
    username: "",
    email: "",
    age: "",
    contact: "",
    password: "",
    followers: "",
    following: "",
  });
  const authtoken = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const [name, setName] = useState(user.name);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [age, setAge] = useState(user.age);
  const [contact, setContact] = useState(user.contact);
  const [password, setPassword] = useState(user.password);
  const [followers, setFollowers] = useState(user.followers);
  const [following, setFollowing] = useState(user.following);
  const [isOpen, setIsOpen] = useState();

  //   const set
  const host = "http://localhost:8000";


  const handleUpdate = async () => {
    const userData = {
      name,
      username,
      email,
      age,
      contact,
      password,
      followers,
      following,
    };
    const updatedUser = await updateUser(user._id, userData);
    // Handle updated user data
    console.log(updatedUser);
  };

  async function onSubmit(e) {
    e.preventDefault();
    console.log(e.target.username.value);
    updateUser(localStorage.getItem("userId"), {
      username: e.target.username.value,
      name: e.target.name.value,
      contact: e.target.contact.value,
    });
    console.log()
    localStorage.setItem("username",e.target.username.value)
    localStorage.setItem("name",e.target.name.value)
    localStorage.setItem("contact",e.target.contact.value)
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="row mb-4">
        <div className="col">
          <div className="form-outline">
            <input type="text" id="username" className="form-control" />
            <label className="form-label" htmlFor="username">
              Username
            </label>
          </div>
        </div>
      </div>

      <div className="form-outline mb-4">
        <input id="name" className="form-control" />
        <label className="form-label" htmlFor="name">
          Name
        </label>
      </div>

      <div className="form-outline mb-4">
        <input type="number" id="contact" className="form-control" />
        <label className="form-label" htmlFor="contact">
          Phone
        </label>
      </div>

      <button type="submit" className="btn btn-primary btn-block mb-4">
        Update
      </button>
    </form>
  );
}
