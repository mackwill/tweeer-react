import React, { Fragment, MouseEvent } from "react";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import IconButton from "@material-ui/core/IconButton";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Button, createStyles, makeStyles, Theme } from "@material-ui/core";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.scss";

type TCurrentUser = {
  id: number;
};
interface IProps {
  currentUser: TCurrentUser;
  handleRegisterMenuOpen: (e: MouseEvent) => void;
  handleLoginOpen: (e: MouseEvent) => void;
  handleLogout: (e: MouseEvent) => void;
}

const useStyles = makeStyles(() =>
  createStyles({
    button: {
      marginLeft: "0.4rem",
      marginRight: "0.4rem",
      color: "#ffffff",
      border: "2px solid white",
      fontWeight: "bold",
    },
  })
);

export default function UserVisitor(props: IProps) {
  const classes = useStyles();
  const location = useLocation();

  const handlProfileOpen = (): void => {};

  return props.currentUser ? (
    <Fragment>
      <IconButton aria-label="show 4 new mails" color="inherit">
        <Badge badgeContent={4} color="secondary">
          <MailIcon />
        </Badge>
      </IconButton>
      <IconButton aria-label="show 17 new notifications" color="inherit">
        <Badge badgeContent={17} color="secondary">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      {location.pathname !== `/user/${props.currentUser.id}` && (
        <Link to={`/user/${props.currentUser.id}`}>
          <Button className={classes.button} variant="outlined">
            Profile
          </Button>
        </Link>
      )}
      {location.pathname !== "/" && (
        <Link to="/">
          <Button className={classes.button} variant="outlined">
            Home
          </Button>
        </Link>
      )}
      <Button
        className={classes.button}
        variant="outlined"
        onClick={props.handleLogout}
      >
        Logout
      </Button>
    </Fragment>
  ) : (
    <Fragment>
      <Button
        className={classes.button}
        variant="outlined"
        onClick={props.handleRegisterMenuOpen}
      >
        Register
      </Button>
      <Button
        variant="outlined"
        onClick={props.handleLoginOpen}
        className={classes.button}
      >
        Login
      </Button>
    </Fragment>
  );
}
