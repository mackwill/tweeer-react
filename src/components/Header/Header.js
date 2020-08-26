import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import avatarImg from "../../images/img-avatar-blank.jpg";
import "./Header.scss";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

export default function Header(props) {
  const classes = useStyles();

  let userFirstName = "Visitor";

  if (props.currentUser !== undefined) {
    userFirstName = props.currentUser.first_name;
  }

  return (
    <header className={classes.root}>
      <Avatar alt="Remy Sharp" src={avatarImg} className={classes.large} />
      <h1>Hello, {userFirstName}!</h1>
    </header>
  );
}
