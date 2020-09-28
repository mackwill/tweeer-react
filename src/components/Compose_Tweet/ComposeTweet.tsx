import React, { ReactElement, FormEvent, ChangeEvent } from "react";
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import Button from "../Button";
import { Box, TextField, Grid, Theme, createStyles } from "@material-ui/core";

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
  submitTweet: (e: FormEvent<HTMLFormElement>) => void;
  onChange: (e: ChangeEvent) => void;
  errMessage: string;
  value: string;
  count: number;
}

const ComposeTweet = (props: IProps): ReactElement => {
  const classes = useStyles(theme);

  return (
    <Grid className="grid-container" container>
      <Grid item xs={11} sm={9}>
        <Box mt={"0.5rem"} mb={"0.5rem"}>
          <form
            className={classes.root}
            noValidate
            autoComplete="off"
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

            <Box
              id="header-footer"
              component="div"
              className={classes.spaceBetween}
            >
              <div id="header-footer-left">
                <Button btnType={"submit"} message={"Tweet"} />
              </div>
              <div id="header-footer-right">
                <p>{props.count}</p>
              </div>
            </Box>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ComposeTweet;
