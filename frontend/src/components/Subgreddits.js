import React from "react";
import { useContext, useEffect} from "react";
import subgredContext from "../context/subgreds/subgredContext";
import AddSubgred from "./AddSubgred";
import Subgreditem from "./Subgreditem";
import { useNavigate, useLocation } from "react-router-dom";
import Subgreds from "./Subgreds";
function Subgreddits() {
  const navigate = useNavigate();
  const context = useContext(subgredContext);
  const { subgreds, setSubgreds } = context;
  useEffect(() => {
    if (window.localStorage.getItem("perm") == null) {
      navigate("/");
    }
  });
  return (
    <div>
   {/* <AddNote/> */}
      <Subgreds/>
       
      </div>
      
    // </div>
   
  );
}

export default Subgreddits;
