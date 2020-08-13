import React, { useState, useEffect } from "react";

import Navbar from "./components/Navbar/Navbar";
import Header from "./components/Header/Header";
import logo from "./logo.svg";
import "./App.scss";
import ComposeTweet from "./components/Compose_Tweet/ComposeTweet";
import TweetList from "./components/Tweet/TweetList";
import axios from "axios";

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
  username: "nicolasCage",
  firstName: "Nicolas",
  lastName: "Cage",
  email: "nicolasCage@gmail.com",
  password: "password",
  avatar: "https://i.imgur.com/nlhLi3I.png",
  dateJoined: 1596832658,
};
function App() {
  const [state, setState] = useState({
    tweets: [],
    users: [],
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
      first_name: user.firstName,
      last_name: user.lastName,
      profile_picture_url: user.avatar,
      user_id: user.id,
      username: user.username,
      content: state.composeText,
      created_at: new Date(),
    };
    const newTweets = [newTweet, ...state.tweets];

    return axios.put("/api/tweets", newTweet).then((res) => {
      setState((prev) => ({
        ...prev,
        composeText: "",
        tweets: newTweets,
      }));
    });
  };

  useEffect(() => {
    if (state.tweetCharCount <= 0) {
      alert("YOU OVER");
    }
  }, [state.composeText]);

  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get("/api/tweets")),
      Promise.resolve(axios.get("/api/users")),
    ]).then((all) => {
      console.log("all[1]", all[0].data);
      console.log("all[2]", all[1].data);
      setState((prev) => ({
        ...prev,
        tweets: all[0].data,
        users: all[1].data,
      }));
    });
  }, []);

  return (
    <div className="App">
      <Navbar />
      <Header username={user.firstName} />
      <ComposeTweet
        onChange={composeTweetChange}
        count={state.tweetCharCount}
        submitTweet={submitTweet}
        value={state.composeText}
      />
      <TweetList tweets={state.tweets} />
    </div>
  );
}

export default App;
