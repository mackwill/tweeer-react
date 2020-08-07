import React from "react";
import Tweet from "./Tweet";
import Grid from "@material-ui/core/Grid";

const tweets = [
  {
    id: 1,
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac",
    },
    "content": {
      "text":
        "If I have seen further it is by standing on the shoulders of giants",
    },
    "created_at": 1461116232227,
  },
  {
    id: 2,
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd",
    },
    "content": {
      "text": "Je pense , donc je suis",
    },
    "created_at": 1461113959088,
  },
  {
    id: 3,
    "user": {
      "name": "NicCage",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@theCage",
    },
    "content": {
      "text": "I am but a humble servant of the Cage",
    },
    "created_at": 1461895359088,
  },
  {
    id: 4,
    "user": {
      "name": "AryaStark",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@theKnife",
    },
    "content": {
      "text": "The Whitewalkers were a let down",
    },
    "created_at": 1541895806487,
  },
];

export default function TweetList() {
  return (
    <Grid container>
      <Grid item xs={11} s={10} md={9}>
        {tweets.map((tweet) => {
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
