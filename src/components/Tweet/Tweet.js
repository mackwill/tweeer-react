import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { findDaysAgo, chrono } from "../../helpers/helpers";
import "./Tweet.scss";

// const useStyles = makeStyles({
//   root: {
//     minWidth: 275,
//   },
//   bullet: {
//     display: "inline-block",
//     margin: "0 2px",
//     transform: "scale(0.8)",
//   },
//   title: {
//     fontSize: 14,
//   },
//   pos: {
//     marginBottom: 12,
//   },
// });

export default function Tweet(props) {
  // const classes = useStyles();
  // const bull = <span className={classes.bullet}>•</span>;

  const {
    profile_picture_url,
    first_name,
    last_name,
    username,
    content,
    tweet_date,
  } = props;

  return (
    // <Card classame={classes.root}>
    //   <CardHeader
    //     avatar={
    //       <Avatar
    //         alt="Remy Sharp"
    //         src={tweets[0].user.avatars}
    //         className={classes.large}
    //       />
    //     }
    //   />
    //   stuff
    // </Card>

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

    // <Card className={classes.root}>
    //   <CardContent>
    //     <Typography
    //       className={classes.title}
    //       color="textSecondary"
    //       gutterBottom
    //     >
    //       Word of the Day
    //     </Typography>
    //     <Typography variant="h5" component="h2">
    //       be{bull}nev{bull}o{bull}lent
    //     </Typography>
    //     <Typography className={classes.pos} color="textSecondary">
    //       adjective
    //     </Typography>
    //     <Typography variant="body2" component="p">
    //       well meaning and kindly.
    //       <br />
    //       {'"a benevolent smile"'}
    //     </Typography>
    //   </CardContent>
    //   <CardActions>
    //     <Button size="small">Learn More</Button>
    //   </CardActions>
    // </Card>
  );
}
