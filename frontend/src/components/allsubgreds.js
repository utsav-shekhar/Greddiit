import React, { useState, useEffect } from "react";
import Fuse from "fuse.js";
import { useNavigate } from "react-router-dom";
const host = "http://localhost:8000";

const userId = localStorage.getItem("userId");

function Subgreddit() {
  const navigate = useNavigate();
  useEffect(() => {
    if (window.localStorage.getItem("perm") == null) {
      navigate("/");
    }
  });
  
  const [sgData, setSgData] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    fetch(`${host}/api/subgreddit/sg`)
      .then((response) => response.json())
      .then((data) => setSgData(data))
      .catch((error) => console.error(error));
  }, []);

  const fuse = new Fuse(sgData, {
    keys: ['title'],
    threshold: 0.4,
    includeScore: true
  });

  const filteredSgData = searchInput ? fuse.search(searchInput).map(result => result.item) : sgData;

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleJoin = (sgId) => {
    fetch(`${host}/api/subgreddit/sg/${sgId}/join`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  };

  const sortedSgData = filteredSgData.sort((a, b) => a.title.localeCompare(b.title));

  console.log(sortedSgData);
  
  return (
    <div>
      <input
        type="text"
        placeholder="Search subreddits"
        value={searchInput}
        onChange={handleSearchInputChange}
      />
      {sortedSgData.map((sg) => (
        <div key={sg._id}>
          <h2>title : {sg.title}</h2>
          <p>User_ID: {sg.user}</p>
          <p>Description: {sg.description}</p>
          <p>Tag : {sg.tag}</p>
          <p>Followers :{sg.followers.length} followers</p>
          <p>{sg.users.length} users</p>
          <p>Follow requests : {sg.requests.length} requests</p>
          <p>Number of Posts: {sg.posts.length} posts</p>
          <button onClick={() => handleJoin(sg._id)}>Join</button>
        </div>
      ))}
    </div>
  );
}

export default Subgreddit;
