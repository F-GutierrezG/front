import React, { Component } from "react";
import PropTypes from "prop-types";

import axios from "axios";

import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import { ActionButton } from "views/Components/Management";
import Delete from "@material-ui/icons/Delete";
import Settings from "@material-ui/icons/Settings";

import withStyles from "@material-ui/core/styles/withStyles";

import companyStyle from "./jss/companyStyle";

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

  render() {
    const { classes } = this.props;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={6} md={6} lg={3}>
            <Card>
              <CardHeader color="success" stats icon>
                <CardIcon color="primary">
                  <i className="fab fa-facebook" />
                </CardIcon>
                <p className={classes.cardCategory}>Opciones</p>
                <h3 className={classes.cardTitle}>
                  <ActionButton
                    onClick={this.setupFacebook}
                    color="success"
                    name="setup"
                    icon={<Settings />}
                  />
                  <ActionButton
                    onClick={() => alert(1)}
                    color="danger"
                    name="delete"
                    icon={<Delete />}
                  />
                </h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>Últimas 24 horas</div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

Company.propTypes = {
  company_id: PropTypes.number.isRequired
};

export default withStyles(companyStyle)(Company);
