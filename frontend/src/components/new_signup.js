import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const New_signup = (props) => {
  const Navigate = useNavigate();
  useEffect(() => {
    if (window.localStorage.getItem("perm") == "true") {
      console.log("hue")
      Navigate("/Profile");
    }
  });
  // const Navigate = useNavigate();
  
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    contact: "",
    username: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        username: credentials.username,
        email: credentials.email,
        age: credentials.age,
        contact: credentials.contact,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);

    // Save the auth token and redirect
    localStorage.setItem("token", json.authtoken);
    localStorage.setItem("perm", true);
    localStorage.setItem("username", credentials.username);
    localStorage.setItem("name", credentials.name);
    localStorage.setItem("email", credentials.email);
    localStorage.setItem("contact", credentials.contact);
    
    Navigate("/Profile");
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            value={credentials.name}
            onChange={onChange}
            name="name"
            id="name"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            value={credentials.username}
            onChange={onChange}
            name="username"
            id="username"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            value={credentials.email}
            onChange={onChange}
            id="email"
            name="email"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="age" className="form-label">
            Age
          </label>
          <input
            type="number"
            className="form-control"
            value={credentials.age}
            onChange={onChange}
            name="age"
            id="age"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="contact" className="form-label">
            Contact
          </label>
          <input
            type="number"
            className="form-control"
            value={credentials.contact}
            onChange={onChange}
            name="contact"
            id="contact"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            value={credentials.password}
            onChange={onChange}
            name="password"
            id="password"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            value={credentials.cpassword}
            onChange={onChange}
            name="cpassword"
            id="cpassword"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default New_signup;
