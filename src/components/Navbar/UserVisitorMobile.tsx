import React, { Fragment, ReactElement, MouseEvent } from "react";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import IconButton from "@material-ui/core/IconButton";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import LockOpenIcon from "@material-ui/icons/LockOpen";

interface IProps {
  currentUser: object;
  handleLoginOpen: (e: MouseEvent<HTMLElement>) => void;
  handleLogout: (e: MouseEvent) => void;
  handleRegisterMenuOpen: () => void;
}

const UserVisitorMobile = (props: IProps): ReactElement => {
  const mobileMenuId = "primary-search-account-menu-mobile";

  if (props.currentUser) {
    return (
      <Fragment>
        <MenuItem>
          <IconButton aria-label="show 4 new mails" color="inherit">
            <Badge badgeContent={4} color="secondary">
              <MailIcon />
            </Badge>
          </IconButton>
          <p>Messages</p>
        </MenuItem>
        <MenuItem>
          <IconButton aria-label="show 11 new notifications" color="inherit">
            <Badge badgeContent={11} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <p>Notifications</p>
        </MenuItem>
        <MenuItem onClick={props.handleLoginOpen}>
          <IconButton
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
        <MenuItem onClick={props.handleLogout}>
          <IconButton
            aria-label="logout of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <ExitToAppIcon />
          </IconButton>
          <p>Logout</p>
        </MenuItem>
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        <MenuItem onClick={props.handleRegisterMenuOpen}>
          <IconButton
            aria-label="register new user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <PersonAddIcon />
          </IconButton>
          <p>Sign Up</p>
        </MenuItem>
        <MenuItem onClick={props.handleLoginOpen}>
          <IconButton
            aria-label="log in"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <LockOpenIcon />
          </IconButton>
          <p>Login</p>
        </MenuItem>
      </Fragment>
    );
  }
};

export default UserVisitorMobile;
