import React, { Component } from "react";

import axios from "axios";

import Create from "@material-ui/icons/Create";

import { ActionButton } from "views/Components/Management";

import RequireAuth from "components/RequireAuth";

import UsersWithError from "./Users";

class Users extends Component {
  state = {
    hasError: false,
    errorMessage: "",
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

  mapUser = user => {
    return {
      id: user.id,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      actions: (
        <div className="actions-right">
          <ActionButton
            onClick={() => this.handleOnEditUserClick(user.id)}
            color="primary"
            name="edit"
            icon={<Create />}
          />
        </div>
      )
    };
  };

  componentDidMount() {
    const token = localStorage.getItem("token");
    axios
      .get(`${process.env.REACT_APP_USERS_SERVICE_URL}`, {
        headers: { Authorization: "Bearer " + token }
      })
      .then(response => {
        this.setState({
          users: response.data.map(user => {
            return this.mapUser(user);
          })
        });
      })
      .catch(err => {
        this.setState({
          hasError: true,
          errorMessage: err.response.statusText
        });
      });
  }

  handleCreateUserButton = () => {
    this.setState({
      createUserDialogOpen: true
    });
  };

  handleOnCancelCreateUserDialog = () => {
    this.setState({
      createUserDialogOpen: false,
      createUserErrors: {
        firstName: false,
        lastName: false,
        email: false,
        password: false
      },
      newUser: {
        email: "",
        firstName: "",
        lastName: "",
        password: ""
      }
    });
  };

  handleOnAcceptCreateUserDialog = () => {
    const user = this.state.newUser;

    if (this.validateCreateUser(user)) {
      const token = localStorage.getItem("token");
      axios
        .post(
          `${process.env.REACT_APP_USERS_SERVICE_URL}`,
          {
            first_name: user.firstName,
            last_name: user.lastName,
            email: user.email,
            password: user.password,
            admin: true
          },
          {
            headers: { Authorization: "Bearer " + token }
          }
        )
        .then(response => {
          const users = [...this.state.users];
          users.push(this.mapUser(response.data));
          this.setState({
            users,
            newUser: {
              email: "",
              firstName: "",
              lastName: "",
              password: ""
            }
          });
        })
        .catch(err => {
          this.setState({
            hasError: true,
            errorMessage: err.response.statusText
          });
        });
      this.setState({
        createUserDialogOpen: false
      });
    }
  };

  validateCreateUser = user => {
    let firstNameError = false;
    let lastNameError = false;
    let emailError = false;
    let passwordError = false;

    if (user.firstName.trim() === "") firstNameError = true;
    if (user.lastName.trim() === "") lastNameError = true;
    if (user.email.trim() === "") emailError = true;
    if (user.password.trim() === "") passwordError = true;

    this.setState({
      createUserErrors: {
        firstName: firstNameError,
        lastName: lastNameError,
        email: emailError,
        password: passwordError
      }
    });

    return !(firstNameError || lastNameError || emailError || passwordError);
  };

  handleOnChangeCreateUserDialog = (field, evt) => {
    const newUser = { ...this.state.newUser };
    newUser[field] = evt.target.value;
    this.setState({ newUser });
  };

  handleOnChangeEditUserDialog = (field, evt) => {
    const selectedUser = { ...this.state.selectedUser };
    selectedUser[field] = evt.target.value;
    this.setState({ selectedUser });
  };

  handleOnEditUserClick = id => {
    const user = this.state.users.find(user => user.id === id);
    this.setState({
      selectedUser: user,
      editUserDialogOpen: true
    });
  };

  handleOnCancelEditUserDialog = () => {
    this.setState({
      editUserDialogOpen: false
    });
  };

  handleOnAcceptEditUserDialog = () => {
    this.setState({
      editUserDialogOpen: false
    });
  };

  render() {
    return (
      <UsersWithError
        openCreateUser={this.state.createUserDialogOpen}
        createUserErrors={this.state.createUserErrors}
        userCreated={this.state.newUser}
        onCreateUserChange={this.handleOnChangeCreateUserDialog}
        onCancelCreateUser={this.handleOnCancelCreateUserDialog}
        onAcceptCreateUser={this.handleOnAcceptCreateUserDialog}
        openEditUser={this.state.editUserDialogOpen}
        editUserErrors={this.state.editUserErrors}
        userEdited={this.state.selectedUser}
        onEditUserChange={this.handleOnChangeEditUserDialog}
        onCancelEditUser={this.handleOnCancelEditUserDialog}
        onAcceptEditUser={this.handleOnAcceptEditUserDialog}
        users={this.state.users}
        onAddUserClick={this.handleCreateUserButton}
      />
    );
  }
}

export default RequireAuth(Users);
