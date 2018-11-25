import React, { Component } from "react";
import PropTypes from "prop-types";

import axios from "axios";

import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/ActionsCard/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import { ActionButton } from "views/Components/Management";
import Delete from "@material-ui/icons/Delete";
import Settings from "@material-ui/icons/Settings";

import withStyles from "@material-ui/core/styles/withStyles";

import companyStyle from "./jss/companyStyle";

import SocialNetwork from "./SocialNetwork";

class Company extends Component {
  setupFacebook = () => {
    const { company_id } = this.props.match.params;
    const token = localStorage.getItem("token");
    axios
      .get(
        `${
          process.env.REACT_APP_SOCIAL_SERVICE_URL
        }/social/facebook/oauth/${company_id}`,
        {
          headers: { Authorization: "Bearer " + token }
        }
      )
      .then(response => {
        const url = response.data.data;
        window.location = url;
      })
      .catch(error => {
        console.log(error);
      });
  };

  deleteFacebook = () => {
    alert("DELETE FACEBOOK");
  };

  setupInstagram = () => {
    alert("SETUP INSTAGRAM");
  };

  deleteInstagram = () => {
    alert("DELETE INSTAGRAM");
  };

  render() {
    return (
      <div>
        <GridContainer>
          <SocialNetwork
            classes={this.props.classes}
            color="primary"
            icon="fa-facebook"
            onSetup={this.setupFacebook}
            onDelete={this.deleteFacebook} />
          <SocialNetwork
            classes={this.props.classes}
            color="warning"
            icon="fa-instagram"
            onSetup={this.setupInstagram}
            onDelete={this.deleteInstagram} />
        </GridContainer>
      </div>
    );
  }
}

Company.propTypes = {
  company_id: PropTypes.number.isRequired
};

export default withStyles(companyStyle)(Company);
