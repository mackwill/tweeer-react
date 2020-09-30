import React, { useState, FC, ReactElement } from "react";
import Navbar from "./components/Navbar/Navbar";
import Header from "./components/Header/Header";
import ComposeTweet from "./components/Compose_Tweet/ComposeTweet";
import TweetList from "./components/Tweet/TweetList";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import useApplicationData from "./hooks/useApplicationData";

import "./App.scss";

const App: FC = (): ReactElement => {
  const [loginOpen, setLoginOpen] = useState<boolean>(false);
  const [registerOpen, setRegisterOpen] = useState<boolean>(false);
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

  const handleRegistrationClose = (): void => {
    setRegisterOpen(false);
    setErrorMessage(null);
  };

  const handleLoginClose = (): void => {
    setLoginOpen(false);
    setErrorMessage(null);
  };

  const handleRegisterMenuOpen = (): void => {
    setRegisterOpen(true);
  };

  const handleProfileMenuOpen = (): void => {
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
          setErrorMessage={setErrorMessage}
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
};

export default App;
