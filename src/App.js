import React, { useState, useEffect } from "react";

import Navbar from "./components/Navbar/Navbar";
import Header from "./components/Header/Header";
import "./App.scss";
import ComposeTweet from "./components/Compose_Tweet/ComposeTweet";
import TweetList from "./components/Tweet/TweetList";
import axios from "axios";

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
  const maxTweetChars = 140;
  const [state, setState] = useState({
    tweets: [],
    users: [],
    composeText: "",
    tweetCharCount: maxTweetChars,
    errMessage: "",
  });

  const composeTweetChange = function (e) {
    const newText = e.target.value;

    setState((prev) => ({
      ...prev,
      composeText: newText,
      tweetCharCount: maxTweetChars - newText.length,
    }));
  };

  const submitTweet = (e) => {
    e.preventDefault();

    if (state.tweetCharCount === maxTweetChars) {
      setState((prev) => ({
        ...prev,
        errMessage: "Your tweet is empty!",
      }));
      return;
    } else if (state.tweetCharCount <= 0) {
      setState((prev) => ({
        ...prev,
        errMessage: "Your tweet is too long!",
      }));
      return;
    }

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
        errMessage: "",
        tweetCharCount: maxTweetChars,
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
        errMessage={state.errMessage}
      />
      <TweetList tweets={state.tweets} />
    </div>
  );
}

export default App;
