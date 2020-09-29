import React, { ReactElement } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Avatar, createStyles, Theme } from "@material-ui/core";
import avatarImg from "../../images/img-avatar-blank.jpg";
import "./Header.scss";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
  })
);

interface IProps {
  username: string;
}

const Header = (props: IProps): ReactElement => {
  const classes = useStyles();

  console.log("username: ", props.username);
  let userOrVisitor: string = "Visitor";

  if (props.username !== "") {
    userOrVisitor = props.username;
  }

  return (
    <header className={classes.root}>
      <Avatar alt="Remy Sharp" src={avatarImg} className={classes.large} />
      <h1>Hello, {userOrVisitor}!</h1>
    </header>
  );
};

export default Header;
