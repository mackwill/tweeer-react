import React, { Fragment, ReactElement, useEffect } from "react";
import ComposeTweet from "../Compose_Tweet/ComposeTweet";
import TweetList from "../Tweet/TweetList";

type TCurrentUser = {
  id: number;
};

type TTweet = {
  id: number;
  userId: number;
  content: string;
  tweetDate: string;
  firstName: string;
  lastName: string;
  username: string;
  profilePictureUrl: string;
  tweetFavourites: number;
};

interface IProps {
  errorMessage: string;
  tweets: TTweet[];
  submitTweetData: (tweetContent: string, userId: number) => Promise<void>;
  handleLoginOpen: () => void;
  submitFavouriteTweet: (userId: number, tweetId: number) => Promise<number>;
  currentUser: TCurrentUser;
  setErrorMessage: (msg: string | null) => void;
  getTweets: () => Promise<void>;
}
const Home = (props: IProps): ReactElement => {
  useEffect((): void => {
    props.getTweets();
  }, []);

  return (
    // <div className="App">
    <Fragment>
      {props.currentUser && (
        <ComposeTweet
          submitTweetData={props.submitTweetData}
          errMessage={props.errorMessage}
          setErrorMessage={props.setErrorMessage}
          userId={props.currentUser.id}
        />
      )}
      <TweetList
        tweets={props.tweets}
        currentUser={props.currentUser}
        submitFavouriteTweet={props.submitFavouriteTweet}
        handleLoginOpen={props.handleLoginOpen}
      />
    </Fragment>
    // </div>
  );
};

export default Home;
