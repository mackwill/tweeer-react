import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar/Navbar.tsx";
import Header from "./components/Header/Header.tsx";
import "./App.scss";
import ComposeTweet from "./components/Compose_Tweet/ComposeTweet";
import TweetList from "./components/Tweet/TweetList.tsx";
import axios from "axios";
import Register from "./components/Register/Register.tsx";
import Login from "./components/Login/Login";
import useApplicationData from "./hooks/useApplicationData";

function App() {
  const maxTweetChars = 140;
  const [state, setState] = useState({
    composeText: "",
    tweetCharCount: maxTweetChars,
    errMessage: null,
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    passwordConfirmation: "",
    errTweet: null,
  });
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const saltRounds = 10;

  const {
    newState,
    submitLoginData,
    submitRegisterData,
  } = useApplicationData();
  const { currentUser, tweets } = newState;

  const handleLoginChange = (e) => {
    e.persist();
    setState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value.trim(),
    }));
  };

  const handleRegisterChange = (e) => {
    e.persist();
    setState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value.trim(),
    }));
  };

  const handleRegistrationClose = (e) => {
    setState((prev) => ({
      ...prev,
      errMessage: null,
    }));

    setRegisterOpen(false);
  };

  const handleLoginClose = () => {
    setLoginOpen(false);
    setState((prev) => ({
      ...prev,
      errMessage: null,
    }));
  };

  const handleRegisterMenuOpen = () => {
    setRegisterOpen(true);
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
        errTweet: "Your tweet is empty!",
      }));
      return;
    } else if (state.tweetCharCount <= 0) {
      setState((prev) => ({
        ...prev,
        errTweet: "Your tweet is too long!",
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
    // const newTweets = [newTweet, ...state.tweets];
    const newTweets = [newTweet, ...tweets];

    return axios.put("/api/tweets", newTweet).then((res) => {
      setState((prev) => ({
        ...prev,
        composeText: "",
        // tweets: newTweets,
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

  return (
    <div className="App">
      <Navbar
        handleProfileMenuOpen={handleProfileMenuOpen}
        currentUser={currentUser}
        handleLogout={handleLogout}
        handleRegisterMenuOpen={handleRegisterMenuOpen}
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
      {/* <TweetList tweets={state.tweets} /> */}
      <TweetList tweets={tweets} />

      <Login
        open={loginOpen}
        handleClose={handleLoginClose}
        onChange={handleLoginChange}
        submitLoginData={submitLoginData}
        errMessage={state.errMessage}
      />
      <Register
        open={registerOpen}
        handleClose={handleRegistrationClose}
        onChange={handleRegisterChange}
        submitRegisterData={submitRegisterData}
        errMessage={state.errMessage}
      />
    </div>
  );
}

export default App;
