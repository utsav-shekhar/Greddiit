import React, { useContext, useEffect, useRef, useState } from "react";
import subgredContext from "../context/subgreds/subgredContext";
import Subgreditem from "./Subgreditem";
import AddSubgred from "./AddSubgred";

const Subgreds = () => {
  const context = useContext(subgredContext);
  const {subgreds, getSubgreds } = context;
  useEffect(() => {
    getSubgreds();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <AddSubgred />
      <div className="container my-3">
        <h2>Saved Space</h2>
        {subgreds.map((subgred) => {
          return <Subgreditem subgred={subgred} />;
        })}
      </div>
    </>
  );
};

export default Subgreds;
