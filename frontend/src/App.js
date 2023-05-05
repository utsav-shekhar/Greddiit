import "./App.css";
import Profile from "./profile";
import Logan from "./logan";
import Login from "./login";
import Posts from "./components/Posts";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import protect_routes from "./protect_routes";
import Navbar from "./components/navbar";
import NoteState from "./context/notes/NoteState";
import Signup from "./components/Signup";
import New_signup from "./components/new_signup";
import SubgredState from "./context/subgreds/SubgredState";
import Subgreddits from "./components/Subgreddits";
import SgList from "./components/allsubgreds";
import Editprofile from "./editprofile";
import SavedNotes from "./components/savednotes";

function App() {
  return (
    <SubgredState>
      <NoteState>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/Signup" element={<New_signup />} />
            {/* <Route path="/" element = {<protect_routes/>}> */}
            {/* <Route path = "/subgreddit" element = {<subgreddit/>}/> */}
            <Route path="/Profile/Home" element={<SgList />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/Profile/post" element={<Posts />} />
            <Route path="/Profile/subgreddiits" element={<Subgreddits />} />
            <Route path="/Profile/Editprofile" element={<Editprofile />} />
            <Route path="/Profile/Savedposts" element={<SavedNotes/>} />
            {/* </Route>
             */}
          </Routes>
        </BrowserRouter>
      </NoteState>
    </SubgredState>
  );
}

export default App;
