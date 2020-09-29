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

  const { newState, submitLoginData } = useApplicationData();
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

  const handleRegisterSubmit = (e) => {
    e.preventDefault();

    const doesEmailExist = state.users.filter((user) => {
      return user.email === state.email;
    });

    const doesUsernameExist = state.users.filter((user) => {
      return user.username === state.username;
    });

    if (
      !state.firstName ||
      !state.lastName ||
      !state.email ||
      !state.username ||
      !state.password ||
      !state.passwordConfirmation
    ) {
      setState((prev) => ({
        ...prev,
        errMessage: "Please fill out all fields",
      }));
      return;
    }

    if (state.password !== state.passwordConfirmation) {
      console.log("Passwords do not match");
      setState((prev) => ({
        ...prev,
        errMessage: "Passwords do not match",
      }));
      return;
    }

    if (doesEmailExist.length > 0) {
      console.log("That email already exists");
      setState((prev) => ({
        ...prev,
        errMessage: "That email already exists",
      }));
      return;
    }

    if (doesUsernameExist.length > 0) {
      console.log("That username already exists");
      setState((prev) => ({
        ...prev,
        errMessage: "That username already exists",
      }));
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

  // const handleLoginSubmit = (e) => {
  //   e.preventDefault();
  // return axios
  //   .post("/api/login", {
  //     username: state.username,
  //     password: state.password,
  //     users: state.users,
  //   })
  //   .then((data) => {
  //     console.log("promise data: ", data);
  //     setState((prev) => ({
  //       ...prev,
  //       currentUser: data.data,
  //       errMessage: null,
  //     }));
  //     setLoginOpen(false);
  //   })
  //   .catch((err) => {
  //     setState((prev) => ({
  //       ...prev,
  //       errMessage: "The username or password you have entered is incorrect",
  //     }));
  //   });
  // };

  const handleLoginClose = () => {
    setLoginOpen(false);
    setState((prev) => ({
      ...prev,
      errMessage: null,
    }));
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
        onSubmit={handleRegisterSubmit}
        errMessage={state.errMessage}
      />
    </div>
  );
}

export default App;
