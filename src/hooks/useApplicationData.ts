import { useEffect, useReducer } from "react";
import axios from "axios";

const SET_TWEETS = "SET_TWEETS";
const SET_CURRENT_USER = "SET_CURRENT_USER";
const SET_ERROR = "SET_ERROR";

type TActionType = string;
type TActionValue = object | string | null;

interface IAction {
  type: TActionType;
  value: TActionValue;
}

const reducer = (newState: object, action: IAction): object => {
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
    default: {
      return { msg: `Invalid action type: ${action.type}` };
    }
  }
};

const useApplicationData = (): object => {
  const [newState, dispatch] = useReducer(reducer, {
    currentUser: null,
    tweets: [],
    errorMessage: "",
  });

  const getCurrentUser = (): Promise<void> => {
    return axios.get("/api/users").then((res) => {
      dispatch({
        type: SET_CURRENT_USER,
        value: res.data.data,
      });
    });
  };

  useEffect((): void => {
    getCurrentUser();
  }, []);

  const getTweets = (): Promise<void> => {
    return axios.get("/api/tweets").then((res) => {
      dispatch({
        type: SET_TWEETS,
        value: res.data,
      });
    });
  };

  useEffect((): void => {
    getTweets();
  }, []);

  const submitLoginData = (username: string, password: string) => {
    return axios
      .post("/api/login", {
        username,
        password,
      })
      .then((res) => {
        console.log("response: ", res);
        dispatch({
          type: SET_CURRENT_USER,
          value: res.data.user,
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

  interface IUser {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    email: string;
  }

  const submitRegisterData = (newUser: IUser): Promise<void> => {
    const newUserObj = {
      ...newUser,
      profilePictureUrl: "https://i.imgur.com/nlhLi3I.png",
    };

    return axios.put("/api/register", newUserObj).then((res) => {
      dispatch({
        type: SET_CURRENT_USER,
        value: res.data.user,
      });
    });
  };

  const submitTweetData = (
    tweetContent: string,
    userId: number
  ): Promise<void> => {
    return axios.put("/api/tweets", { tweetContent, userId }).then((res) => {
      dispatch({
        type: SET_TWEETS,
        value: res.data,
      });
    });
  };

  const submitLogout = () => {
    return axios.post("/api/logout").then(() => {
      dispatch({
        type: SET_CURRENT_USER,
        value: null,
      });
    });
  };

  return {
    newState,
    submitLoginData,
    submitRegisterData,
    submitTweetData,
    submitLogout,
  };
};

export default useApplicationData;
