import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const Navigate = useNavigate();
  useEffect(() => {
    if (window.localStorage.getItem("perm") == "true") {
      console.log("chal rha hai")
      Navigate("/Profile");
    }
  });
  
  //   navigate("/home");
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  //   let history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      // Save the auth token and redirect
      localStorage.setItem("token", json.authtoken);
      localStorage.setItem("perm", true);
      Navigate("/Profile");
    } else {
      alert("Invalid credentials");
    }
    if (json.success) {
      console.log("my time will come")
      const response = await fetch("http://localhost:8000/api/auth/getuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "auth-token": json.authtoken,
        },
      });

      const user = await response.json();

      localStorage.setItem("userLoggedIn", JSON.stringify(json));
      // localStorage.setItem('userDetails', JSON.stringify(user.user));
      localStorage.setItem("name", (user.name));
      localStorage.setItem("email", (user.email));
      localStorage.setItem("age",(user.age))
      localStorage.setItem("userId", (user._id));
      localStorage.setItem("username", (user.username));
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
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

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
