import React from "react";
import { matchPath } from "react-router";
import PropTypes from "prop-types";
import cx from "classnames";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Hidden from "@material-ui/core/Hidden";

// material-ui icons
import Menu from "@material-ui/icons/Menu";
import MoreVert from "@material-ui/icons/MoreVert";
import ViewList from "@material-ui/icons/ViewList";

// core components
import HeaderLinks from "./HeaderLinks";
import Button from "Components/CustomButtons/Button.jsx";

import headerStyle from "assets/jss/material-dashboard-pro-react/components/headerStyle.jsx";

function Header({ ...props }) {
  function arePathEqual(path1, path2) {
    const match = matchPath(path2, {
      path: path1,
      exact: true,
      strict: false
    });
    if (!match) return false;
    return match.isExact;
  }

  function makeBrand() {
    if (props.location && props.location.state && props.location.state.title) {
      return props.location.state.title;
    }
    var name;
    props.routes.map(prop => {
      if (prop.collapse) {
        prop.views.map(prop => {
          if (arePathEqual(prop.path, props.location.pathname)) {
            name = prop.name;
          }
          return null;
        });
      }
      if (arePathEqual(prop.path, props.location.pathname)) {
        name = prop.name;
      }
      return null;
    });
    if (name) {
      return name;
    } else {
      return "Default Brand Name";
    }
  }
  const { classes, color } = props;
  const appBarClasses = cx({
    [" " + classes[color]]: color
  });
  const sidebarMinimize = classes.sidebarMinimize;
  return (
    <AppBar className={classes.appBar + appBarClasses}>
      <Toolbar className={classes.container}>
        <Hidden smDown implementation="css">
          <div className={sidebarMinimize}>
            {props.miniActive ? (
              <Button
                justIcon
                round
                color="white"
                onClick={props.sidebarMinimize}
              >
                <ViewList className={classes.sidebarMiniIcon} />
              </Button>
            ) : (
              <Button
                justIcon
                round
                color="white"
                onClick={props.sidebarMinimize}
              >
                <MoreVert className={classes.sidebarMiniIcon} />
              </Button>
            )}
          </div>
        </Hidden>
        <div className={classes.flex}>
          {/* Here we create navbar brand, based on route name */}
          <Button href="#" className={classes.title} color="transparent">
            {makeBrand()}
          </Button>
        </div>
        <Hidden smDown implementation="css">
          <HeaderLinks />
        </Hidden>

        <Hidden mdUp implementation="css">
          <Button
            className={classes.appResponsive}
            color="transparent"
            justIcon
            aria-label="open drawer"
            onClick={props.handleDrawerToggle}
          >
            <Menu />
          </Button>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"]),
  miniActive: PropTypes.bool,
  location: PropTypes.object,
  handleDrawerToggle: PropTypes.func,
  sidebarMinimize: PropTypes.func,
  routes: PropTypes.array.isRequired
};

export default withStyles(headerStyle)(Header);
