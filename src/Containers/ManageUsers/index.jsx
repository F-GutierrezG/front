import React, { Component } from "react";
import PropTypes from "prop-types";

import axios from "axios";

import Create from "@material-ui/icons/Create";
import Block from "@material-ui/icons/Block";
import DoneAll from "@material-ui/icons/DoneAll";

import { ActionButton } from "Components/Management";
import UsersWithError from "Components/Users";

class Users extends Component {
  state = {
    hasError: false,
    error: "",
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

  closeError = () => {
    this.setState({
      hasError: false
    });
  };

  mapUser = user => {
    return {
      id: user.id,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      active: user.active,
      updated: user.updated,
      status: user.active ? "Activo" : "Desactivo",
      actions: (
        <div className="actions-right">
          <ActionButton
            onClick={() => this.handleOnEditUserClick(user.id)}
            color="primary"
            name="edit"
            icon={<Create />}
          />

          {user.active ? (
            <ActionButton
              color="danger"
              icon={<Block />}
              onClick={() => this.deactivate(user.id)}
            />
          ) : (
            <ActionButton
              color="success"
              icon={<DoneAll />}
              onClick={() => this.activate(user.id)}
            />
          )}
        </div>
      )
    };
  };

  deactivate = id => {
    const token = localStorage.getItem("token");
    axios
      .put(
        `${this.props.deactivateUserURL}/${id}/deactivate`,
        {},
        {
          headers: { Authorization: "Bearer " + token }
        }
      )
      .then(response => {
        const users = [
          ...this.state.users.map(user => {
            if (user.id === id) {
              return this.mapUser(response.data);
            } else {
              return user;
            }
          })
        ];

        this.setState({
          users: users
        });
      })
      .catch(err => {
        this.setState({
          hasError: true,
          error: err
        });
      });
  };

  activate = id => {
    const token = localStorage.getItem("token");
    axios
      .put(
        `${this.props.activateUserURL}/${id}/activate`,
        {},
        {
          headers: { Authorization: "Bearer " + token }
        }
      )
      .then(response => {
        const users = this.state.users.map(user => {
          if (user.id === id) {
            return this.mapUser(response.data);
          } else {
            return user;
          }
        });

        this.setState({
          users: users
        });
      })
      .catch(err => {
        this.setState({
          hasError: true,
          error: err
        });
      });
  };

  loadUsers = () => {
    const token = localStorage.getItem("token");
    axios
      .get(this.props.listUsersURL, {
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
          error: err
        });
      });
  };

  componentDidMount() {
    this.loadUsers();
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
        hasError={this.state.hasError}
        error={this.state.error}
        closeError={this.closeError}
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

Users.propTypes = {
  listUsersURL: PropTypes.string.isRequired,
  deactivateUserURL: PropTypes.string.isRequired,
  activateUserURL: PropTypes.string.isRequired
};

export default Users;
