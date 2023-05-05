import React, { useState, useEffect } from "react";
import updateUser from "./updateUser";

const EditUserModal = () => {
  const [user, Setuser] = useState();
  const authtoken = localStorage.getItem("token");
  const userId = localStorage.getItem("userId")
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

  useEffect(() => {
    const fetchUser = async (userId) => {
      try {
        const response = await fetch(`${host}/api/auth/getuser`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authtoken: authtoken,
          },
        });
        const data = await response.json();
        Setuser(data);
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchUser(userId)
  });

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

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Edit User</button>
      {isOpen && (
        <div className="modal">
          <div className="modal-content">
            <form>
              <label>
                Name:
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </label>
              <label>
                Username:
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
              <label>
                Age:
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </label>
              <label>
                Contact:
                <input
                  type="number"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                />
              </label>
              <label>
                Password:
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
              <label>
                Followers:
                <input
                  type="text"
                  value={followers}
                  onChange={(e) => setFollowers(e.target.value.split(","))}
                />
              </label>
              <label>
                Following:
                <input
                  type="text"
                  value={following}
                  onChange={(e) => setFollowing(e.target.value.split(","))}
                />
              </label>
              <button type="submit" onClick={handleUpdate}>
                Update User
              </button>
            </form>
            <button onClick={() => setIsOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditUserModal;
