import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar/Navbar.tsx";
import Header from "./components/Header/Header.tsx";
import "./App.scss";
import ComposeTweet from "./components/Compose_Tweet/ComposeTweet";
import TweetList from "./components/Tweet/TweetList.tsx";
import axios from "axios";
import Register from "./components/Register/Register.tsx";
import Login from "./components/Login/Login";
import useApplicationData from "./hooks/useApplicationData.ts";

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
    submitTweetData,
  } = useApplicationData();
  const { currentUser, tweets } = newState;

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

  return (
    <div className="App">
      <Navbar
        handleProfileMenuOpen={handleProfileMenuOpen}
        currentUser={currentUser}
        handleLogout={handleLogout}
        handleRegisterMenuOpen={handleRegisterMenuOpen}
      />
      <Header username={currentUser ? currentUser.firstName : null} />
      {currentUser && (
        <ComposeTweet
          submitTweetData={submitTweetData}
          errMessage={state.errMessage}
          userId={currentUser.id}
        />
      )}
      <TweetList tweets={tweets} />
      <Login
        open={loginOpen}
        handleClose={handleLoginClose}
        submitLoginData={submitLoginData}
        errMessage={state.errMessage}
      />
      <Register
        open={registerOpen}
        handleClose={handleRegistrationClose}
        submitRegisterData={submitRegisterData}
        errMessage={state.errMessage}
      />
    </div>
  );
}

export default App;
