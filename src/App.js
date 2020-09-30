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
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const saltRounds = 10;

  const {
    state,
    submitLoginData,
    submitRegisterData,
    submitTweetData,
    submitLogout,
    setErrorMessage,
  } = useApplicationData();
  const { currentUser, tweets, errorMessage } = state;

  const handleRegistrationClose = (e) => {
    setRegisterOpen(false);
    setErrorMessage(null);
  };

  const handleLoginClose = () => {
    setLoginOpen(false);
    setErrorMessage(null);
  };

  const handleRegisterMenuOpen = () => {
    setRegisterOpen(true);
  };

  const handleProfileMenuOpen = function (e) {
    setLoginOpen(true);
  };

  return (
    <div className="App">
      <Navbar
        handleProfileMenuOpen={handleProfileMenuOpen}
        currentUser={currentUser}
        submitLogout={submitLogout}
        handleRegisterMenuOpen={handleRegisterMenuOpen}
      />
      <Header username={currentUser ? currentUser.firstName : null} />
      {currentUser && (
        <ComposeTweet
          submitTweetData={submitTweetData}
          errMessage={errorMessage}
          userId={currentUser.id}
        />
      )}
      <TweetList tweets={tweets} />
      <Login
        open={loginOpen}
        handleClose={handleLoginClose}
        submitLoginData={submitLoginData}
        errMessage={errorMessage}
      />
      <Register
        open={registerOpen}
        handleClose={handleRegistrationClose}
        submitRegisterData={submitRegisterData}
        errMessage={errorMessage}
      />
    </div>
  );
}

export default App;
