import React, { useState, useEffect } from "react";

import Navbar from "./components/Navbar/Navbar";
import Header from "./components/Header/Header.tsx";
import "./App.scss";
// import ComposeTweet from "./components/Compose_Tweet/ComposeTweet";
import ComposeTweet from "./components/Compose_Tweet/ComposeTweet.tsx";
import TweetList from "./components/Tweet/TweetList";
import axios from "axios";
import LoginModal from "./components/Login/LoginModal";

function App() {
  const maxTweetChars = 140;
  const [state, setState] = useState({
    tweets: [],
    users: [],
    composeText: "",
    tweetCharCount: maxTweetChars,
    errMessage: "",
    username: "",
    password: "",
  });
  const [currentUser, setCurrentUser] = useState(null);
  const [loginOpen, setLoginOpen] = useState(false);
  const saltRounds = 10;

  const handleLoginChange = (e) => {
    e.persist();
    setState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value.trim(),
    }));
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    return axios
      .post("/api/login", {
        username: state.username,
        password: state.password,
        users: state.users,
      })
      .then((data) => {
        console.log("promise data: ", data);
        setState((prev) => ({
          ...prev,
          currentUser: data.data,
        }));
        setLoginOpen(false);
      });
  };

  const handleProfileMenuOpen = function (e) {
    setLoginOpen(true);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    return axios
      .post("/api/logout")
      .then((data) =>
        setState((prev) => ({
          ...prev,
          currentUser: undefined,
        }))
      )
      .catch((err) => console.log("Err: ", err));
  };

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

    if (!currentUser) {
      setLoginOpen(true);
      return;
    }

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
      first_name: currentUser.first_name,
      last_name: currentUser.last_name,
      profile_picture_url: currentUser.profile_picture_url,
      user_id: currentUser.id,
      username: currentUser.username,
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
      setCurrentUser(all[1].data.data);
      setState((prev) => ({
        ...prev,
        tweets: all[0].data,
      }));
    });
  }, []);

  return (
    <div className="App">
      <Navbar
        handleProfileMenuOpen={handleProfileMenuOpen}
        currentUser={currentUser}
        handleLogout={handleLogout}
      />
      <Header username={currentUser ? currentUser.firstName : null} />
      <ComposeTweet
        onChange={composeTweetChange}
        count={state.tweetCharCount}
        submitTweet={submitTweet}
        value={state.composeText}
        errMessage={state.errMessage}
        currentUser={currentUser}
      />
      <TweetList tweets={state.tweets} />
      <LoginModal
        open={loginOpen}
        handleClose={() => setLoginOpen(false)}
        onChange={handleLoginChange}
        onSubmit={handleLoginSubmit}
      />
    </div>
  );
}

export default App;
