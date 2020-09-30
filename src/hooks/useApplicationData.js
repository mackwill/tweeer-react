import { useEffect, useReducer } from "react";
import axios from "axios";

const SET_TWEETS = "SET_TWEETS";
const SET_CURRENT_USER = "SET_CURRENT_USER";
const SET_ERROR = "SET_ERROR";

const reducer = (newState, action) => {
  switch (action.type) {
    case SET_TWEETS: {
      return { ...newState, tweets: action.value };
    }
    case SET_CURRENT_USER: {
      return { ...newState, currentUser: action.value };
    }
    case SET_ERROR: {
      return { ...newState, errorMessage: action.value };
    }
  }
};

const useApplicationData = () => {
  const [newState, dispatch] = useReducer(reducer, {
    currentUser: null,
    tweets: [],
    errorMessage: "",
  });

  useEffect(() => {
    return axios.get("/api/users").then((res) => {
      dispatch({
        type: SET_CURRENT_USER,
        value: res.data.data,
      });
    });
  }, []);

  useEffect(() => {
    return axios.get("/api/tweets").then((res) => {
      dispatch({
        type: SET_TWEETS,
        value: res.data,
      });
    });
  }, []);

  const submitLoginData = (username, password) => {
    return axios
      .post("/api/login", {
        username,
        password,
      })
      .then((res) => {
        console.log("response: ", res);
        dispatch({
          type: SET_CURRENT_USER,
          value: res.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: SET_ERROR,
          value: "Invalid login data",
        });
        throw new Error();
      });
  };

  const submitRegisterData = (newUser) => {
    const newUserObj = {
      ...newUser,
      profilePictureUrl: "https://i.imgur.com/nlhLi3I.png",
    };

    return axios.put("/api/register", newUser).then((data) => {
      dispatch({
        type: SET_CURRENT_USER,
        value: newUserObj,
      });
    });
  };

  const submitTweetData = (tweetContent, userId) => {
    return axios.put("/api/tweets", { tweetContent, userId }).then((res) => {
      dispatch({
        type: SET_TWEETS,
        value: res.data,
      });
    });
  };

  return { newState, submitLoginData, submitRegisterData, submitTweetData };
};

export default useApplicationData;
