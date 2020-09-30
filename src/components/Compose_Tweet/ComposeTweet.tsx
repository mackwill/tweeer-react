import React, { ReactElement, FormEvent, ChangeEvent, useState } from "react";
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import Button from "../Button";
import { Box, TextField, Grid, Theme, createStyles } from "@material-ui/core";
import CustomAlert from "../CustomAlert";

import "./ComposeTweet.scss";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "#3f51b5",
      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },
  },
});

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& > *": {
        margin: theme.spacing(1),
      },
    },
    spaceBetween: {
      justifyContent: "space-between",
    },
  })
);

interface IProps {
  submitTweetData: (tweetContent: string, userId: number) => Promise<void>;
  errMessage: string;
  userId: number;
  setErrorMessage: (msg: string | null) => void;
}

const ComposeTweet = (props: IProps): ReactElement => {
  const classes = useStyles(theme);
  const [tweetContent, setTweetContent] = useState("");
  const MAX_TWEET_LENGTH = 140;

  const { setErrorMessage, errMessage } = props;
  const handleSubmitTweet = (e: FormEvent): void => {
    e.preventDefault();
    if (tweetContent.length === 0) {
      setErrorMessage("You need to enter something in the tweet");
      return;
    } else if (tweetContent.length > 140) {
      setErrorMessage("Your tweet is longer than 140 characters");
      return;
    }
    setTweetContent("");
    setErrorMessage(null);
    props.submitTweetData(tweetContent, props.userId);
  };

  return (
    <Grid className="grid-container" container>
      <Grid item xs={11} sm={9}>
        <Box mt={"0.5rem"} mb={"0.5rem"}>
          <form
            className={classes.root}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmitTweet}
          >
            <Box mx={"auto"}>
              {errMessage && <CustomAlert errMessage={errMessage} />}
            </Box>

            <TextField
              id="standard-basic"
              label="Tweet"
              placeholder="What are you humming about?"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setTweetContent(e.target.value)
              }
              value={tweetContent}
              fullWidth={true}
            />

            <Box
              id="header-footer"
              component="div"
              className={classes.spaceBetween}
            >
              <div id="header-footer-left">
                <Button btnType={"submit"} message={"Tweet"} />
              </div>
              <div id="header-footer-right">
                <p>{MAX_TWEET_LENGTH - tweetContent.length}</p>
              </div>
            </Box>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ComposeTweet;
