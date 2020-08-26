import React, { useState, useEffect } from "react";

import Navbar from "./components/Navbar/Navbar";
import Header from "./components/Header/Header";
import "./App.scss";
import ComposeTweet from "./components/Compose_Tweet/ComposeTweet";
import TweetList from "./components/Tweet/TweetList";
import axios from "axios";
import LoginModal from "./components/Login/LoginModal";
import Register from "./components/Register/Register";

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
    currentUser: undefined,
    firstName: "",
    lastName: "",
    passwordConfirmation: "",
  });
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const saltRounds = 10;

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

  const handleRegisterSubmit = (e) => {
    e.preventDefault();

    const doesEmailExist = state.users.filter((user) => {
      return user.email === state.email;
    });

    const doesUsernameExist = state.users.filter((user) => {
      return user.username === state.username;
    });

    if (state.password !== state.passwordConfirmation) {
      console.log("Passwords do not match!");
      return;
    }

    if (doesEmailExist.length > 0) {
      console.log("That email already exists");
      return;
    }

    if (doesUsernameExist.length > 0) {
      console.log("That username already exists");
      return;
    }

    const newUser = {
      username: state.username,
      first_name: state.firstName,
      last_name: state.lastName,
      email: state.email,
      password: state.password,
      profile_picture_url: "https://i.imgur.com/nlhLi3I.png",
    };

    return axios.put("/api/register", newUser).then((data) => {
      console.log("register data: ", data.data);
      const newUsers = [...state.users, newUser];

      setState((prev) => ({
        ...prev,
        users: newUsers,
        currentUser: newUser,
      }));
      setRegisterOpen(false);
    });
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

  const handleRegisterMenuOpen = (e) => {
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

    if (!state.currentUser) {
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
      first_name: state.currentUser.first_name,
      last_name: state.currentUser.last_name,
      profile_picture_url: state.currentUser.profile_picture_url,
      user_id: state.currentUser.id,
      username: state.currentUser.username,
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
        users: all[1].data.users,
        currentUser: all[1].data.currentUser,
      }));
    });
  }, []);

  return (
    <div className="App">
      <Navbar
        handleProfileMenuOpen={handleProfileMenuOpen}
        currentUser={state.currentUser}
        handleLogout={handleLogout}
        handleRegisterMenuOpen={handleRegisterMenuOpen}
      />
      <Header currentUser={state.currentUser} />
      <ComposeTweet
        onChange={composeTweetChange}
        count={state.tweetCharCount}
        submitTweet={submitTweet}
        value={state.composeText}
        errMessage={state.errMessage}
        currentUser={state.currentUser}
      />
      <TweetList tweets={state.tweets} />
      <LoginModal
        open={loginOpen}
        handleClose={() => setLoginOpen(false)}
        onChange={handleLoginChange}
        onSubmit={handleLoginSubmit}
      />
      <Register
        open={registerOpen}
        handleClose={() => setRegisterOpen(false)}
        onChange={handleRegisterChange}
        onSubmit={handleRegisterSubmit}
      />
    </div>
  );
}

export default App;
