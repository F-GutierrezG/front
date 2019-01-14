import React, { Component } from "react";
import PropTypes from "prop-types";

import axios from "axios";

import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Create from "@material-ui/icons/Create";
import Block from "@material-ui/icons/Block";
import DoneAll from "@material-ui/icons/DoneAll";
import VpnKey from "@material-ui/icons/VpnKey";

import UsersWithError from "Components/Users";

class Users extends Component {
  state = {
    hasError: false,
    error: "",
    users: [],
    createUserDialogOpen: false,
    deleteUserDialogOpen: false,
    editUserDialogOpen: false,
    editUserDialogOpenPassword: false,
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
    },
    selectedUserPassword: {
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
          <Tooltip title="Cambiar Contraseña">
            <IconButton
              onClick={() => this.handleOnEditPaswordUserClick(user.id)}
            >
              <VpnKey style={{ color: "#9c27b0" }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Editar">
            <IconButton onClick={() => this.handleOnEditUserClick(user.id)}>
              <Create style={{ color: "#9c27b0" }} />
            </IconButton>
          </Tooltip>
          {user.active ? (
            <Tooltip title="Desactivar">
              <IconButton onClick={() => this.deactivate(user.id)}>
                <Block style={{ color: "#f44336" }} />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Activar">
              <IconButton onClick={() => this.activate(user.id)}>
                <DoneAll style={{ color: "#4caf50" }} />
              </IconButton>
            </Tooltip>
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

  handleOnChangeEditUserDialogPassword = (field, evt) => {
    const selectedUserPassword = { ...this.state.selectedUserPassword };
    selectedUserPassword[field] = evt.target.value;
    this.setState({ selectedUserPassword });
  };

  handleOnEditUserClick = id => {
    const user = this.state.users.find(user => user.id === id);
    this.setState({
      selectedUser: user,
      editUserDialogOpen: true
    });
  };

  handleOnEditPaswordUserClick = id => {
    const user = this.state.users.find(user => user.id === id);
    this.setState({
      selectedUserPassword: user,
      editUserDialogOpenPassword: true
    });
  };

  handleOnCancelEditUserDialog = () => {
    this.setState({
      editUserDialogOpen: false
    });
  };

  handleOnCancelEditUserDialogPassword = () => {
    this.setState({
      editUserDialogOpenPassword: false
    });
  };

  handleOnAcceptEditUserDialog = () => {
    const id = this.state.selectedUser.id;
    const token = localStorage.getItem("token");
    axios
      .put(
        `${process.env.REACT_APP_USERS_SERVICE_URL}/${id}`,
        {
          email: this.state.selectedUser.email,
          first_name: this.state.selectedUser.firstName,
          last_name: this.state.selectedUser.lastName
        },
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
          users: users,
          editUserDialogOpen: false
        });
      })
      .catch(err => {
        this.setState({
          hasError: true,
          error: err
        });
      });
  };

  handleOnAcceptEditPaswordUserDialog = () => {
    const id = this.state.selectedUserPassword.id;
    const token = localStorage.getItem("token");
    axios
      .put(
        `${process.env.REACT_APP_USERS_SERVICE_URL}/${id}/password`,
        {
          password: this.state.selectedUserPassword.password
        },
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
          users: users,
          editUserDialogOpenPassword: false
        });
      })
      .catch(err => {
        this.setState({
          hasError: true,
          error: err
        });
      });
  };

  handleOnAcceptCreateUserDialog = () => {
    const user = this.state.newUser;

    if (this.validateCreateUser(user)) {
      const token = localStorage.getItem("token");
      axios
        .post(
          this.props.createUserURL,
          {
            email: user.email,
            first_name: user.firstName,
            last_name: user.lastName,
            password: user.password
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
            createUserErrors: {
              email: null,
              firstName: null,
              lastName: null,
              password: null
            },
            newUser: {
              mail: "",
              firstName: "",
              lastName: "",
              password: ""
            },
            createUserDialogOpen: false
          });
        })
        .catch(err => {
          this.setState({
            hasError: true,
            error: err
          });
        });
    }
  };

  validateCreateUser = user => {
    let emailError = false;
    let firstNameError = false;
    let lastNameError = false;
    let passwordError = false;

    if (user.email.trim() === "") emailError = true;
    if (user.firstName.trim() === "") firstNameError = true;
    if (user.lastName.trim() === "") lastNameError = true;
    if (user.password.trim() === "") passwordError = true;

    this.setState({
      createUserErrors: {
        email: emailError,
        firstName: firstNameError,
        lastName: lastNameError,
        password: passwordError
      }
    });

    return !(emailError || firstNameError || lastNameError);
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
        openEditUserPassword={this.state.editUserDialogOpenPassword}
        editUserErrors={this.state.editUserErrors}
        userEdited={this.state.selectedUser}
        userEditedPassword={this.state.selectedUserPassword}
        onEditUserChange={this.handleOnChangeEditUserDialog}
        onEditUserChangePassword={this.handleOnChangeEditUserDialogPassword}
        onCancelEditUser={this.handleOnCancelEditUserDialog}
        onCancelEditUserPassword={this.handleOnCancelEditUserDialogPassword}
        onAcceptEditUser={this.handleOnAcceptEditUserDialog}
        onAcceptEditUserPassword={this.handleOnAcceptEditPaswordUserDialog}
        users={this.state.users}
        onAddUserClick={this.handleCreateUserButton}
      />
    );
  }
}

Users.propTypes = {
  listUsersURL: PropTypes.string.isRequired,
  deactivateUserURL: PropTypes.string.isRequired,
  activateUserURL: PropTypes.string.isRequired,
  createUserURL: PropTypes.string.isRerequired
};

export default Users;
