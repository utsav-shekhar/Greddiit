import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const Navigate = useNavigate();
  //   navigate("/home");
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const handleSubmit = async (e) => {
    console.log("prev  ppp huehuehue");
    const { name, email, password } = credentials;
    e.preventDefault();
    
    const response = await fetch("http://localhost:8000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });
    console.log("prev  huehuehue");
    const json = await response.json();
    console.log("huehuehue");
    console.log(json);
    // Save the auth token and redirect
    
    localStorage.setItem("token", json.authtoken);
    localStorage.setItem("perm", true);
    Navigate("/Profile");
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="text-center mb-3">
          <p>Sign up with:</p>
          <button type="button" className="btn btn-link btn-floating mx-1">
            <i className="fab fa-facebook-f"></i>
          </button>

          <button type="button" className="btn btn-link btn-floating mx-1">
            <i className="fab fa-google"></i>
          </button>

          <button type="button" className="btn btn-link btn-floating mx-1">
            <i className="fab fa-twitter"></i>
          </button>

          <button type="button" className="btn btn-link btn-floating mx-1">
            <i className="fab fa-github"></i>
          </button>
        </div>

        <p className="text-center">or:</p>
        <div className="form-outline mb-4">
          <input
            type="text"
            id="registername"
            className="form-control"
            value={credentials.name}
            //   onChange={handlename}
            name="name"
            onChange={onChange}
          />
          <label className="form-label" htmlFor="registername">
            name
          </label>
        </div>

        {/* <!-- Email input --> */}
        <div className="form-outline mb-4">
          <input
            type="email"
            id="registerEmail"
            className="form-control"
            value={credentials.email}
            //   onChange={handleemail}
            name="email"
            onChange={onChange}
          />
          <label className="form-label" htmlFor="registerEmail" id="email">
            Email
          </label>
        </div>

        {/* <!-- Password input --> */}
        <div className="form-outline mb-4">
          <input
            type="password"
            id="password"
            className="form-control"
            value={credentials.password}
            //   onChange={handlepassword}

            name="password"
            onChange={onChange}
          />
          <label className="form-label" htmlFor="registerPassword">
            Password
          </label>
        </div>

        {/* <!-- Repeat Password input --> */}
        <div className="form-outline mb-4">
          <input
            type="password"
            id="cpassword"
            className="form-control"
            name="cpassword"
            value={credentials.password}
            onChange={onChange}
          />
          <label className="form-label" htmlFor="registerRepeatPassword">
            Repeat password
          </label>
        </div>

        {/* <!-- Checkbox --> */}

        <button
          type="button"
          className="btn btn-primary btn-block mb-3 "
          // onClick={signup}
        >
          Sign in
        </button>
      </form>
    </div>
  );
};

export default Signup;
