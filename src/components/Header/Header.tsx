import React, { ReactElement, useState, useEffect } from "react";
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
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "15rem",
      backgroundColor: "#3f51b5",
      backgroundImage: `url("https://www.transparenttextures.com/patterns/asfalt-dark.png")`,
    },
    avatar: {
      width: "10rem",
      height: "10rem",
    },
  })
);

type TUserName = string;
interface IProps {
  username: string;
}

const Header = (props: IProps): ReactElement => {
  const classes = useStyles();

  return (
    <header className={classes.root}>
      <Avatar alt="Remy Sharp" src={avatarImg} className={classes.avatar} />
      <h1>Hello, {props.username ? props.username : "Visitor"}!</h1>
    </header>
  );
};

export default Header;
