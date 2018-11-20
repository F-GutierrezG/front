import React, { Component } from "react";

import axios from "axios";

import Add from "@material-ui/icons/Add";
import Person from "@material-ui/icons/Person";
import Create from "@material-ui/icons/Create";
import Delete from "@material-ui/icons/Delete";
import Visibility from "@material-ui/icons/Visibility";

import Management, { ActionButton } from "views/Components/Management";

import CreateUserDialog from "./CreateUserDialog";
import EditUserDialog from "./EditUserDialog";
import DeleteUserDialog from "./DeleteUserDialog";

class Users extends Component {
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

  mapUser = user => {
    return {
      id: user.id,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      actions: (
        <div className="actions-right">
          <ActionButton
            onClick={() => alert("VER")}
            color="info"
            name="view"
            icon={<Visibility />}
          />
          <ActionButton
            onClick={() => this.handleOnEditUserClick(user.id)}
            color="primary"
            name="edit"
            icon={<Create />}
          />

          <ActionButton
            onClick={() => this.handleOnDeleteUserClick(user.id)}
            color="danger"
            name="delete"
            icon={<Delete />}
          />
        </div>
      )
    };
  };

  componentDidMount() {
    const token = localStorage.getItem("token");
    axios
      .get(`${process.env.REACT_APP_USERS_SERVICE_URL}/users`, {
        headers: { Authorization: "Bearer " + token }
      })
      .then(response => {
        this.setState({
          users: response.data.map(user => {
            return this.mapUser(user);
          })
        });
      })
      .catch(error => {
        console.log("ERROR", error)
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
          `${process.env.REACT_APP_USERS_SERVICE_URL}/users`,
          {
            first_name: user.firstName,
            last_name: user.lastName,
            email: user.email,
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
            newUser: {
              email: "",
              firstName: "",
              lastName: "",
              password: ""
            }
          });
        })
        .catch(error => {
          console.log("ERROR", error);
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
    const newUser = {};
    newUser[field] = evt.target.value;
    this.setState({ newUser });
  };

  handleOnDeleteUserClick = id => {
    const user = this.state.users.find(user => user.id === id);
    this.setState({
      selectedUser: user,
      deleteUserDialogOpen: true
    });
  };

  handleOnCancelDeleteUserDialog = () => {
    this.setState({
      selectedUser: {
        email: "",
        firstName: "",
        lastName: "",
        password: ""
      },
      deleteUserDialogOpen: false
    });
  };

  handleOnAcceptDeleteUserDialog = () => {
    const id = this.state.selectedUser.id;
    const token = localStorage.getItem("token");

    axios
      .delete(`${process.env.REACT_APP_USERS_SERVICE_URL}/users/${id}`, {
        headers: { Authorization: "Bearer " + token }
      })
      .then(() => {
        const users = this.state.users.filter(user => user.id !== id);

        this.setState({
          users: users,
          selectedUser: {
            email: "",
            firstName: "",
            lastName: "",
            password: ""
          },
          deleteUserDialogOpen: false
        });
      });
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

export default Users;
