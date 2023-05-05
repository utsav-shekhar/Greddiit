import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Logan from "./logan";
// import EditUserModal from "./components/editProfile";
import updateUser from "./components/updateUser";
import Login from "./login";

export default function About() {
  const [listItems, setListItems] = useState(["item 1", "item 2", "item 3"]);

  const handleRemove = (indexToRemove) => {
    setListItems((prevListItems) =>
      prevListItems.filter((_, index) => index !== indexToRemove)
    );
  };
  const navigate = useNavigate();
  const [name, setname] = useState("");
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  // const [editmode, seteditmode] = useState(false);

  const [followers, setFollowers] = useState(false);

  const onFollowersClick = () => {
    setFollowers(!followers);
  };

  let location = useLocation();

  console.log(location.state);

  useEffect(() => {
    if (window.localStorage.getItem("perm") == null) {
      navigate("/");
    }
  });

  const func = () => {
    window.localStorage.removeItem("perm");
    window.localStorage.removeItem("name");
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("userId");
    window.localStorage.removeItem("email");
    window.localStorage.removeItem("username");
    window.localStorage.removeItem("contact");

    console.log("Logout HUA");
    navigate("/");
  };

  return (
    <>
      {/* {editmode && <EditUserModal />} */}
      <section className="vh-70" style={{ backgroundColor: "#eee" }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-12 col-xl-4">
              <div className="card" style={{ borderRadius: "100px;" }}>
                <div className="card-body text-center">
                  <div className="mt-3 mb-4">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
                      className="rounded-circle img-fluid"
                      style={{ width: "100px;" }}
                    />
                  </div>
                  <h3 className="mb-2"> {localStorage.getItem("username")}</h3>
                  <h4 className="mb-2">
                    name : {localStorage.getItem("name")}
                  </h4>
                  <h4 className="mb-2">age : {localStorage.getItem("age")}</h4>
                  <h4 className="mb-2">
                    email = {localStorage.getItem("email")}
                  </h4>
                  {/* <h4 className="mb-2">contact {localStorage.getItem("contact")}</h4> */}
                  <p className="text-muted mb-4">
                    @Programmer <span className="mx-2">|</span>{" "}
                    <a href="#!">mdbootstrap.com</a>
                  </p>
                  <div className="mb-4 pb-2">
                    <button
                      type="button"
                      className="btn btn-outline-primary btn-floating"
                    >
                      <i className="fab fa-facebook-f fa-lg"></i>
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-primary btn-floating"
                    >
                      <i className="fab fa-twitter fa-lg"></i>
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-primary btn-floating"
                    >
                      <i className="fab fa-skype fa-lg"></i>
                    </button>
                  </div>
                  <button
                    type="button"
                    className="btn btn-primary btn-rounded btn-lg"
                  >
                    Message now
                  </button>
                  <div className="d-flex justify-content-between text-center mt-5 mb-2">
                    <button
                      type="button"
                      className="btn btn-sm btn-primary mb-4"
                      onClick={func}
                    >
                      Logout
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-primary  mb-4"
                      onClick={onFollowersClick}
                    >
                      Followers
                    </button>

                    <button
                      type="button"
                      className="btn btn-sm btn-primary  mb-4"
                      onClick={onFollowersClick}
                    >
                      Following
                    </button>

                    <br></br>

                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => navigate("/Profile/Editprofile")}
                    >
                      Edit
                    </button>
                    {/* <EditUserModal/> */}

                    {followers && (
                      <ul>
                        {listItems.map((item, index) => (
                          <li key={index}>
                            {item}
                            <button onClick={() => handleRemove(index)}>
                              Remove
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
