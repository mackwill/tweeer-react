import React, { useState, useEffect } from "react";

import Navbar from "./components/Navbar/Navbar";
import Header from "./components/Header/Header";
import logo from "./logo.svg";
import "./App.scss";
import ComposeTweet from "./components/Compose_Tweet/ComposeTweet";
import TweetList from "./components/Tweet/TweetList";

function App() {
  const [state, setState] = useState({
    composeText: "",
    tweetCharCount: 140,
  });

  const composeTweetChange = function (e) {
    setState({
      composeText: e.target.value,
      tweetCharCount: 140 - e.target.value.length,
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
      <ComposeTweet
        onChange={composeTweetChange}
        count={state.tweetCharCount}
      />
      <TweetList />
    </div>
  );
}

export default App;
