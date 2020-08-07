import React, { useState, useEffect } from "react";

import Navbar from "./components/Navbar/Navbar";
import Header from "./components/Header/Header";
import logo from "./logo.svg";
import "./App.scss";
import ComposeTweet from "./components/Compose_Tweet/ComposeTweet";

function App() {
  const [state, setState] = useState({
    composeText: "",
    tweetCharCount: 0,
  });

  const composeTweetChange = function (e) {
    setState({
      composeText: e.target.value,
      tweetCharCount: e.target.value.length,
    });
  };

  useEffect(() => {
    if (state.tweetCharCount > 140) {
      alert("YOU OVER");
    }
  }, [state.composeText]);

  return (
    <div className="App">
      <Navbar />
      <Header username={"Visitor"} />
      <ComposeTweet onChange={composeTweetChange} />
    </div>
  );
}

export default App;
