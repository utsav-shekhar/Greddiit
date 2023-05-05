import React, { useEffect } from "react";
import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Profile from "./profile";
import { Outlet, Navigate } from "react-router-dom";
import navbar from "./components/navbar";

function Logan(props) {
  const [credentials, setCredentials] = useState({ email: "", pwd: "" });
  // let history = useHistory();
  var foo = false;
  var [btndis, setBtndis] = useState(false);

  // const [text, setText] = useState("");
  // const [pwd, setPwd] = useState("");
  const navigate = useNavigate();
  //these are assigned for the signup page
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //assigned for the signup page ends here
  const handleSubmit = () => {
    const handleSubmit = async (e) => {
      e.preventDefault();
      const response = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          pwd: credentials.password,
        }),
      });
      const json = await response.json();
      console.log(json);
      if (json.success) {
        // Save the auth token and redirect
        localStorage.setItem("token", json.authtoken);
        Navigate("/Profile");
      } else {
        alert("Invalid credentials");
      }
    };
  };
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const disableButton = () => {
    if (credentials.email != "" && credentials.password != "") {
      btndis = true;
    } else {
      btndis = false;
    }
  };
  const tempfunc = () => {
    alert("wrong credentials");
  };

  //These functions are for the signup page they have no relation to above functions

  const handleusername = (event) => {
    setUsername(event.target.value);
    console.log("username: ", username);
    localStorage.setItem("username", true);
  };

  const handleemail = (event) => {
    setEmail(event.target.value);
    console.log("email: ", email);
    localStorage.setItem("email", true);
  };

  const handlepassword = (event) => {
    setPassword(event.target.value);
    console.log("password: ", password);
    localStorage.setItem("password", true);
  };

  return (
    <>
      <navbar />
      <center>
        <ul
          className="nav nav-pills nav-justified mb-3"
          id="ex1"
          role="tablist"
        >
          <li className="nav-item" role="presentation">
            <a
              className="nav-link active"
              id="tab-login"
              data-mdb-toggle="pill"
              href="#pills-login"
              role="tab"
              aria-controls="pills-login"
              aria-selected="true"
            >
              Login
            </a>
          </li>
          <li className="nav-item" role="presentation">
            <a
              className="nav-link"
              id="tab-register"
              data-mdb-toggle="pill"
              href="#pills-register"
              role="tab"
              aria-controls="pills-register"
              aria-selected="false"
            >
              Register
            </a>
          </li>
        </ul>

        {/* <!-- Pills content --> */}
        <div className="tab-content">
          <div
            className="tab-pane fade show active"
            id="pills-login"
            role="tabpanel"
            aria-labelledby="tab-login"
          >
            <form>
              <div className="text-center mb-3">
                <p>Sign in with:</p>
                <button
                  type="button"
                  className="btn btn-link btn-floating mx-1"
                >
                  <i className="fab fa-facebook-f"></i>
                </button>
                <button
                  type="button"
                  className="btn btn-link btn-floating mx-1"
                >
                  <i className="fab fa-google"></i>
                </button>

                <button
                  type="button"
                  className="btn btn-link btn-floating mx-1"
                >
                  <i className="fab fa-twitter"></i>
                </button>

                <button
                  type="button"
                  className="btn btn-link btn-floating mx-1"
                >
                  <i className="fab fa-github"></i>
                </button>
              </div>

              <p className="text-center">or:</p>

              {/* <!-- Email input --> */}
              <div className="form-outline mb-4">
                <input
                  type="text"
                  id="loginName"
                  className="form-control"
                  value={credentials.email}
                  onChange={onChange}
                />
                <label className="form-label" htmlFor="loginName">
                  Fill Username
                </label>
              </div>
              <div className="form-outline mb-4">
                <input
                  type="password"
                  id="loginPassword"
                  className="form-control"
                  value={credentials.password}
                  onChange={onChange}
                />
                <label className="form-label" htmlFor="loginPassword">
                  Fill Password
                </label>
              </div>

              <div className="row mb-4">
                <div className="col-md-6 d-flex justify-content-center">
                  <div className="form-check mb-3 mb-md-0">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="loginCheck"
                      checked
                    />
                    <label className="form-check-label" htmlFor="loginCheck">
                      {" "}
                      Remember me{" "}
                    </label>
                  </div>
                </div>

                <div className="col-md-6 d-flex justify-content-center">
                  <a href="#!">Forgot password?</a>
                </div>
              </div>
              <button
                type="button"
                className={`btn btn-primary btn-block mb-4 ${
                  !btndis ? "disabled" : ""
                }`}
                onClick={handleSubmit}
              >
                Log in
              </button>
              <div className="text-center">
                <p>Not a member? Click on Register</p>
              </div>
            </form>
          </div>
          <div
            className="tab-pane fade"
            id="pills-register"
            role="tabpanel"
            aria-labelledby="tab-register"
          >
            {/* this set of code is for the register page, login page ends above */}
            <form>
              <div className="text-center mb-3">
                <p>Sign up with:</p>
                <button
                  type="button"
                  className="btn btn-link btn-floating mx-1"
                >
                  <i className="fab fa-facebook-f"></i>
                </button>

                <button
                  type="button"
                  className="btn btn-link btn-floating mx-1"
                >
                  <i className="fab fa-google"></i>
                </button>

                <button
                  type="button"
                  className="btn btn-link btn-floating mx-1"
                >
                  <i className="fab fa-twitter"></i>
                </button>

                <button
                  type="button"
                  className="btn btn-link btn-floating mx-1"
                >
                  <i className="fab fa-github"></i>
                </button>
              </div>

              <p className="text-center">or:</p>
              <div className="form-outline mb-4">
                <input
                  type="text"
                  id="registerUsername"
                  className="form-control"
                  value={username}
                  onChange={handleusername}
                />
                <label className="form-label" htmlFor="registerUsername">
                  Username
                </label>
              </div>

              {/* <!-- Email input --> */}
              <div className="form-outline mb-4">
                <input
                  type="email"
                  id="registerEmail"
                  className="form-control"
                  value={email}
                  onChange={handleemail}
                />
                <label className="form-label" htmlFor="registerEmail">
                  Email
                </label>
              </div>

              {/* <!-- Password input --> */}
              <div className="form-outline mb-4">
                <input
                  type="password"
                  id="registerPassword"
                  className="form-control"
                  value={password}
                  onChange={handlepassword}
                />
                <label className="form-label" htmlFor="registerPassword">
                  Password
                </label>
              </div>

              {/* <!-- Repeat Password input --> */}
              <div className="form-outline mb-4">
                <input
                  type="password"
                  id="registerRepeatPassword"
                  className="form-control"
                  value={password}
                />
                <label className="form-label" htmlFor="registerRepeatPassword">
                  Repeat password
                </label>
              </div>

              {/* <!-- Checkbox --> */}
              <div className="form-check d-flex justify-content-center mb-4">
                <input
                  className="form-check-input me-2"
                  type="checkbox"
                  value=""
                  id="registerCheck"
                  checked
                  aria-describedby="registerCheckHelpText"
                />
                <label className="form-check-label" htmlFor="registerCheck">
                  I have read and agree to the terms
                </label>
              </div>
              <button
                type="button"
                className="btn btn-primary btn-block mb-3 "
                // onClick={signup}
              >
                Sign in
              </button>
              {/* </a> */}
            </form>
          </div>
        </div>
      </center>
      {/* {/* <!-- Pills content --> */}
    </>
  );
}

export default Logan;
