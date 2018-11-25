import React, { Component } from "react";
import PropTypes from "prop-types";

import axios from "axios";

import GridContainer from "components/Grid/GridContainer.jsx";

import Add from "@material-ui/icons/Add";
import Person from "@material-ui/icons/Person";
import Create from "@material-ui/icons/Create";
import Delete from "@material-ui/icons/Delete";
import Visibility from "@material-ui/icons/Visibility";

import Management, { ActionButton } from "views/Components/Management";

import CreateUserDialog from "views/Management/Users/CreateUserDialog";
import EditUserDialog from "views/Management/Users/EditUserDialog";
import DeleteUserDialog from "views/Management/Users/DeleteUserDialog";

import withStyles from "@material-ui/core/styles/withStyles";

import companyStyle from "./jss/companyStyle";

import SocialNetwork from "./SocialNetwork";

class Company extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      createUserDialogOpen: false,
      deleteUserDialogOpen: false,
      editUserDialogOpen: false,
      createUserErrors: {
        email: false,
        firstName: false,
        lastName: false,
        password: false
      },
      editUserErrors: {
        email: null,
        firstName: null,
        lastName: null,
        password: null
      },
      newUser: {
        email: "",
        firstName: "",
        lastName: "",
        password: ""
      },
      selectedUser: {
        email: "",
        firstName: "",
        lastName: "",
        password: ""
      }
    };
  }

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
    const columns = [
      {
        Header: "Nombre",
        accessor: "firstName"
      },
      {
        Header: "Apellido",
        accessor: "lastName"
      },
      {
        Header: "E-Mail",
        accessor: "email"
      },
      {
        Header: "Acciones",
        accessor: "actions",
        sortable: false,
        filterable: false
      }
    ];

    return (
      <div>
        <GridContainer>
          <SocialNetwork
            classes={this.props.classes}
            color="primary"
            icon="fa-facebook"
            onSetup={this.setupFacebook}
            onDelete={this.deleteFacebook}
          />
          <SocialNetwork
            classes={this.props.classes}
            color="warning"
            icon="fa-instagram"
            onSetup={this.setupInstagram}
            onDelete={this.deleteInstagram}
          />
        </GridContainer>

        <CreateUserDialog
          open={this.state.createUserDialogOpen}
          errors={this.state.createUserErrors}
          user={this.state.newUser}
          handleOnChange={this.handleOnChangeCreateUserDialog}
          onCancel={this.handleOnCancelCreateUserDialog}
          onAccept={this.handleOnAcceptCreateUserDialog}
        />
        <EditUserDialog
          open={this.state.editUserDialogOpen}
          errors={this.state.editUserErrors}
          user={this.state.selectedUser}
          handleOnChange={this.handleOnChangeEditUserDialog}
          onCancel={this.handleOnCancelEditUserDialog}
          onAccept={this.handleOnAcceptEditUserDialog}
        />
        <DeleteUserDialog
          open={this.state.deleteUserDialogOpen}
          onCancel={this.handleOnCancelDeleteUserDialog}
          onAccept={this.handleOnAcceptDeleteUserDialog}
        />
        <Management
          icon={<Person />}
          color="info"
          elements={this.state.users}
          noDataText="No existen Usuarios"
          columns={columns}
          addButtonText="Crear Usuario"
          addButtonIcon={<Add />}
          addButtonColor="success"
          addButtonOnClick={this.handleCreateUserButton}
        />
      </div>
    );
  }
}

Company.propTypes = {
  company_id: PropTypes.number.isRequired
};

export default withStyles(companyStyle)(Company);
