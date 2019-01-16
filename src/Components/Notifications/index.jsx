import React, { Component } from "react";

import axios from "axios";
import io from "socket.io-client";

import classNames from "classnames";
import PropTypes from "prop-types";
// import { Manager, Target, Popper } from "react-popper"

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import Grow from "@material-ui/core/Grow";
import Hidden from "@material-ui/core/Hidden";
import Popper from "@material-ui/core/Popper";

// @material-ui/icons
import NotificationsIcon from "@material-ui/icons/Notifications";

import headerLinksStyle from "assets/jss/material-dashboard-pro-react/components/headerLinksStyle";

import PublicationNotification from "./Publication";

class Notifications extends Component {
  state = {
    open: false,
    notifications: []
  };

  componentDidMount() {
    const timer = setInterval(() => {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) return;

      clearInterval(timer);

      const socket = io(`${process.env.REACT_APP_SOCKETS_SERVICE_URL}`, {
        query: {
          hash: user.hash
        }
      });

      socket.on("PUBLICATION", notification => {
        this.setState({
          notifications: [...this.state.notifications, notification]
        });
      });

      axios
        .get(`${process.env.REACT_APP_NOTIFICATIONS_SERVICE_URL}/${user.hash}`)
        .then(response => {
          this.setState({ notifications: response.data });
        });
    }, 500);
  }

  handleClick = () => {
    this.setState({ open: !this.state.open });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOnDeleteNotification = id => {
    const token = localStorage.getItem("token");
    axios
      .delete(`${process.env.REACT_APP_NOTIFICATIONS_SERVICE_URL}/${id}`, {
        headers: { Authorization: "Bearer " + token }
      })
      .then(() => {
        this.setState({
          notifications: this.state.notifications.filter(
            notification => notification.id !== id
          ),
          open: this.state.notifications.length <= 1 ? false : true
        });
      });
  };

  render() {
    const { classes } = this.props;
    const { open } = this.state;
    const dropdownItem = classNames(classes.dropdownItem, classes.primaryHover);
    const wrapper = classNames({});
    const managerClasses = classNames({
      [classes.managerClasses]: true
    });
    return (
      <div className={wrapper}>
        <div className={managerClasses}>
          <Tooltip title="Notificaciones">
            <IconButton
              aria-label="Notifications"
              aria-owns={open ? "menu-list" : null}
              aria-haspopup="true"
              onClick={this.handleClick}
              className={classes.buttonLink}
              buttonRef={node => {
                this.anchorEl = node;
              }}
            >
              <NotificationsIcon
                className={classes.headerLinksSvg + " " + classes.links}
              />
              {this.state.notifications.length > 0 && (
                <span className={classes.notifications}>
                  {this.state.notifications.length > 9
                    ? "9+"
                    : this.state.notifications.length}
                </span>
              )}
              <Hidden mdUp implementation="css">
                <span onClick={this.handleClick} className={classes.linkText}>
                  {"Notification"}
                </span>
              </Hidden>
            </IconButton>
          </Tooltip>
          <Popper
            open={open}
            anchorEl={this.anchorEl}
            transition
            disablePortal
            placement="bottom"
            className={classNames({
              [classes.popperClose]: !open,
              [classes.pooperResponsive]: true,
              [classes.pooperNav]: true
            })}
          >
            {({ TransitionProps }) => (
              <Grow
                {...TransitionProps}
                id="menu-list"
                style={{ transformOrigin: "0 0 0" }}
              >
                <Paper className={classes.dropdown}>
                  <ClickAwayListener onClickAway={this.handleClose}>
                    <MenuList role="menu">
                      {this.state.notifications.length === 0 && (
                        <MenuItem
                          onClick={this.handleClose}
                          className={dropdownItem}
                        >
                          No tienes ninguna notificación
                        </MenuItem>
                      )}
                      {this.state.notifications.map(notification => (
                        <MenuItem
                          key={notification.id}
                          className={dropdownItem}
                        >
                          <PublicationNotification
                            onDelete={this.handleOnDeleteNotification}
                            notification={notification}
                          />
                        </MenuItem>
                      ))}
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
      </div>
    );
  }
}

Notifications.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(headerLinksStyle)(Notifications);
