import React, { ReactElement } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { findDaysAgo, chrono } from "../../helpers/helpers";
import "./Tweet.scss";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

interface IProps {
  id: number;
  user_id: number;
  content: string;
  tweet_date: string;
  first_name: string;
  last_name: string;
  username: string;
  profile_picture_url: string;
}

const Tweet = (props: IProps): ReactElement => {
  const classes = useStyles();

  const {
    profile_picture_url,
    first_name,
    last_name,
    username,
    content,
    tweet_date,
  } = props;

  return (
    <article className="tweet">
      <div className="tweet-header">
        <div className="tweet-header left">
          <img src={profile_picture_url} />
          <p>
            {first_name} {last_name}
          </p>
        </div>
        <div className="tweet-header right">
          <p className="username">{username}</p>
        </div>
      </div>
      <form>
        <p className="submitted-tweet">{content}</p>
        <footer>
          <div className="tweet-footer footer-left">
            <p className="date-of-tweet">{chrono(tweet_date)}</p>
          </div>
          <div className="tweet-footer footer-right">
            <a href="#">
              <i className="fas fa-flag footer-icon"></i>
            </a>
            <a href="#">
              <i className="fas fa-retweet footer-icon"></i>
            </a>
            <a href="#">
              <i className="fas fa-heart footer-icon"></i>
            </a>
          </div>
        </footer>
      </form>
    </article>
  );
};

export default Tweet;
