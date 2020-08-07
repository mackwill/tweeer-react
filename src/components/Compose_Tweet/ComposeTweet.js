import React from "react";
import { makeStyles } from "@material-ui/core/styles";
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
            onChange={props.onChange}
          >
            <TextField
              id="standard-basic"
              label="Tweet"
              placeholder="What are you humming about?"
              fullWidth={true}
            />
          </form>
        </Box>

        <div id="header-footer" justify="space-between">
          <div id="header-footer-left">
            <Button message={"Tweet"} />
          </div>
          <div id="header-footer-right">
            <p>140</p>
          </div>
        </div>
      </Grid>
    </Grid>
  );
}
