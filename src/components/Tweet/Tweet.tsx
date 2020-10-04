// import React, { ReactElement } from "react";
// import { makeStyles } from "@material-ui/core/styles";
// import { findDaysAgo, chrono } from "../../helpers/helpers";
// import FavoriteIcon from "@material-ui/icons/Favorite";
// import "./Tweet.scss";
// import { IconButton } from "@material-ui/core";

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
//   icon: {
//     color: "black",
//   },
// });

// interface IProps {
//   id: number;
//   user_id: number;
//   content: string;
//   tweet_date: string;
//   first_name: string;
//   last_name: string;
//   username: string;
//   profile_picture_url: string;
// }

// const Tweet = (props: IProps): ReactElement => {
//   const classes = useStyles();

//   const {
//     profile_picture_url,
//     first_name,
//     last_name,
//     username,
//     content,
//     tweet_date,
//   } = props;

//   return (
//     <article className="tweet">
//       <div className="tweet-header">
//         <div className="tweet-header left">
//           <img src={profile_picture_url} />
//           <p>
//             {first_name} {last_name}
//           </p>
//         </div>
//         <div className="tweet-header right">
//           <p className="username">{username}</p>
//         </div>
//       </div>
//       <form>
//         <p className="submitted-tweet">{content}</p>
//         <footer>
//           <div className="tweet-footer footer-left">
//             <p className="date-of-tweet">{chrono(tweet_date)}</p>
//           </div>
//           <div className={classes.icon}>
//             <FavoriteIcon />
//           </div>
//         </footer>
//       </form>
//     </article>
//   );
// };

// export default Tweet;

import React, { ReactElement, useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import RepeatIcon from "@material-ui/icons/Repeat";

import Box from "@material-ui/core/Box";
import { chrono } from "../../helpers/helpers";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      // maxWidth: 345,
      height: "12rem",
      margin: "1rem 0 1rem 0",
      border: "2px solid grey",
    },
    media: {
      height: 0,
      paddingTop: "56.25%", // 16:9
    },
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: "rotate(180deg)",
    },
    avatar: {
      backgroundColor: red[500],
    },
    header: {
      textAlign: "left",
    },
    cardActions: {
      display: "flex",
      justifyContent: "space-between",
    },
    cardContent: {
      textAlign: "left",
    },
    cardFooterRight: {
      paddingRight: "0.5rem",
      fontSize: "0.75rem",
      color: "black",
    },
  })
);

interface IProps {
  id: number;
  userId: number;
  content: string;
  tweetDate: string;
  firstName: string;
  lastName: string;
  username: string;
  profilePictureUrl: string;
  tweetFavourites: number;
  currentUserId: number;
  submitFavouriteTweet: (userId: number, tweetId: number) => Promise<number>;
  handleProfileMenuOpen: () => void;
}

const Tweet = (props: IProps): ReactElement => {
  const classes = useStyles();
  const [tweetFavouriteCount, setTweetFavouriteCount] = useState(
    props.tweetFavourites
  );

  const cardHeader = (
    <Typography variant="h5" className={classes.header}>
      {props.firstName} {props.lastName}
    </Typography>
  );

  const favouriteTweet = (tweetId: number) => {
    if (props.currentUserId) {
      return props
        .submitFavouriteTweet(props.currentUserId, tweetId)
        .then((res: number) => setTweetFavouriteCount(res));
    }
    props.handleProfileMenuOpen();
  };

  return (
    <Card className={classes.root} raised>
      <CardHeader
        disableTypography
        avatar={<Avatar src={`${props.profilePictureUrl}`} />}
        title={cardHeader}
      />
      <CardContent className={classes.cardContent}>
        <Typography variant="body2" color="textSecondary" component="p">
          {props.content}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions} disableSpacing>
        <Box>
          <IconButton
            aria-label="add to favorites"
            onClick={() => favouriteTweet(props.id)}
            disabled={props.currentUserId === props.userId ? true : false}
          >
            <Typography>{tweetFavouriteCount}</Typography>
            <FavoriteIcon />
          </IconButton>

          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
          <IconButton aria-label="retweet">
            <RepeatIcon />
          </IconButton>
        </Box>
        <Box>
          <Typography className={classes.cardFooterRight} component="p">
            {chrono(props.tweetDate)}
          </Typography>
        </Box>
      </CardActions>
    </Card>
  );
};

export default Tweet;
