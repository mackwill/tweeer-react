import React, { useState, useEffect } from "react";

import Navbar from "./components/Navbar/Navbar";
import Header from "./components/Header/Header";
import logo from "./logo.svg";
import "./App.scss";
import ComposeTweet from "./components/Compose_Tweet/ComposeTweet";
import TweetList from "./components/Tweet/TweetList";

const tweetList = [
  {
    id: 1,
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac",
    },
    "content": {
      "text":
        "If I have seen further it is by standing on the shoulders of giants",
    },
    "created_at": 1461116232227,
  },
  {
    id: 2,
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd",
    },
    "content": {
      "text": "Je pense , donc je suis",
    },
    "created_at": 1461113959088,
  },
  {
    id: 3,
    "user": {
      "name": "NicCage",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@theCage",
    },
    "content": {
      "text": "I am but a humble servant of the Cage",
    },
    "created_at": 1461895359088,
  },
  {
    id: 4,
    "user": {
      "name": "AryaStark",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@theKnife",
    },
    "content": {
      "text": "The Whitewalkers were a let down",
    },
    "created_at": 1541895806487,
  },
];
const user = {
  id: 1,
  username: "TheCage",
  firstName: "Nicolas",
  lastName: "Cage",
  email: "nicolas.cage@thecage.com",
  password: "password",
  avatar: "https://i.imgur.com/nlhLi3I.png",
  dateJoined: 1596832658,
};
function App() {
  const [state, setState] = useState({
    tweets: [...tweetList],
    composeText: "",
    tweetCharCount: 140,
  });

  const composeTweetChange = function (e) {
    const newText = e.target.value;

    setState((prev) => ({
      ...prev,
      composeText: newText,
      tweetCharCount: 140 - newText.length,
    }));
  };

  const submitTweet = (e) => {
    e.preventDefault();
    const newTweet = {
      id: state.tweets.length + 1,
      user: {
        name: user.firstName + " " + user.lastName,
        avatars: user.avatar,
        handle: user.username,
      },
      content: {
        text: state.composeText,
      },
      created_at: new Date(),
    };

    const newTweets = [newTweet, ...state.tweets];

    setState((prev) => ({
      ...prev,
      tweets: newTweets,
    }));
  };

  useEffect(() => {
    if (state.tweetCharCount <= 0) {
      alert("YOU OVER");
    }
  }, [state.composeText]);

  return (
    <div className="App">
      <Navbar />
      <Header username={user.firstName} />
      <ComposeTweet
        onChange={composeTweetChange}
        count={state.tweetCharCount}
        submitTweet={submitTweet}
      />
      <TweetList tweets={state.tweets} />
    </div>
  );
}

export default App;
