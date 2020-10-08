import React, { ReactElement, useEffect } from "react";
import UserInformation from "./UserInformation";
import { Grid } from "@material-ui/core";
import TweetList from "../Tweet/TweetList";

interface ITweet {
  id: number;
  userId: number;
  content: string;
  tweetDate: string;
  firstName: string;
  lastName: string;
  username: string;
  profilePictureUrl: string;
  tweetFavourites: number;
}

interface ICurrentUser {
  id: number;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
}

type TProps = {
  currentUser: ICurrentUser;
  getTweetsForUser: (userId: number) => Promise<void>;
  tweets: ITweet[];
};

const ProfilePage = (props: TProps): ReactElement => {
  useEffect(() => {
    props.getTweetsForUser(props.currentUser.id);
  }, []);

  return (
    <div>
      <Grid container>
        <Grid item xs={11} md={9}>
          <UserInformation {...props.currentUser} />
        </Grid>
        <Grid item xs={11} md={9}>
          <TweetList {...props} tweets={props.tweets} />
        </Grid>
      </Grid>
    </div>
  );
};

export default ProfilePage;
