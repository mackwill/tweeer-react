import React, { ReactElement } from "react";
import Tweet from "./Tweet";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
  })
);

interface ITweet {
  id: number;
  userId: number;
  content: string;
  tweetDate: string;
  firstName: string;
  lastName: string;
  username: string;
  profilePictureUrl: string;
}

interface IProps {
  tweets: ITweet[];
}

const TweetList = (props: IProps): ReactElement => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={11} md={9}>
          {props.tweets.map((tweet) => {
            return <Tweet key={tweet.id} {...tweet} />;
          })}
        </Grid>
      </Grid>
    </div>
  );
};

export default TweetList;
