import React from "react";
import Tweet from "./Tweet";
import Grid from "@material-ui/core/Grid";

export default function TweetList(props) {
  return (
    <Grid container>
      <Grid item xs={11} s={10} md={9}>
        {props.tweets.map((tweet) => {
          return (
            <Tweet
              key={tweet.id}
              user={tweet.user}
              content={tweet.content}
              created_at={tweet.created_at}
            />
          );
        })}
      </Grid>
    </Grid>
  );
}
