import React from "react";
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "../Button";
import Box from "@material-ui/core/Box";

import "./ComposeTweet.scss";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

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

export default function ComposeTweet(props) {
  const classes = useStyles();

  return (
    <Grid className="grid-container" container>
      <Grid item xs={11} sm={9}>
        <Box mt={"0.5rem"} mb={"0.5rem"}>
          <form
            className={classes.root}
            noValidate
            autoComplete="off"
            mt={"1rem"}
            onSubmit={props.submitTweet}
          >
            <p className="tweet_compose--error">{props.errMessage}</p>

            <TextField
              id="standard-basic"
              label="Tweet"
              placeholder="What are you humming about?"
              onChange={props.onChange}
              fullWidth={true}
              value={props.value}
            />

            <div id="header-footer" justify="space-between">
              <div id="header-footer-left">
                <Button btnType={"submit"} message={"Tweet"} />
              </div>
              <div id="header-footer-right">
                <p>{props.count}</p>
              </div>
            </div>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
}
