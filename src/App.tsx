import React, { useState, FC, ReactElement } from "react";

import Navbar from "./components/Navbar/Navbar";
import Header from "./components/Header/Header";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import ProfilePage from "./components/ProfilePage/ProfilePage";

import useApplicationData from "./hooks/useApplicationData";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

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
    submitFavouriteTweet,
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
      <Header username={currentUser ? currentUser.username : null} />
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
      <Router>
        <Switch>
          {currentUser && (
            <Route path={`/user/${currentUser.id}`}>
              <ProfilePage />
            </Route>
          )}

          <Route path="/">
            <Home
              errorMessage={errorMessage}
              tweets={tweets}
              submitTweetData={submitTweetData}
              handleProfileMenuOpen={handleProfileMenuOpen}
              submitFavouriteTweet={submitFavouriteTweet}
              currentUser={currentUser}
              setErrorMessage={setErrorMessage}
            />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
