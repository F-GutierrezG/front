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

const users = [
  {
    firstName: "Usuario1",
    lastName: "Apellido1",
    email: "email1@gmail.com"
  },
  {
    firstName: "Usuario2",
    lastName: "Apellido2",
    email: "email2@gmail.com"
  },
  {
    firstName: "Usuario3",
    lastName: "Apellido3",
    email: "email3@gmail.com"
  },
  {
    firstName: "Usuario4",
    lastName: "Apellido4",
    email: "email4@gmail.com"
  },
  {
    firstName: "Usuario5",
    lastName: "Apellido5",
    email: "email5@gmail.com"
  },
  {
    firstName: "Usuario6",
    lastName: "Apellido6",
    email: "email6@gmail.com"
  },
  {
    firstName: "Usuario7",
    lastName: "Apellido7",
    email: "email7@gmail.com"
  },
  {
    firstName: "Usuario8",
    lastName: "Apellido8",
    email: "email8@gmail.com"
  },
  {
    firstName: "Usuario9",
    lastName: "Apellido9",
    email: "email9@gmail.com"
  },
  {
    firstName: "Usuario10",
    lastName: "Apellido10",
    email: "email10@gmail.com"
  },
  {
    firstName: "Usuario11",
    lastName: "Apellido11",
    email: "email11@gmail.com"
  },
  {
    firstName: "Usuario12",
    lastName: "Apellido12",
    email: "email12@gmail.com"
  },
  {
    firstName: "Usuario13",
    lastName: "Apellido13",
    email: "email13@gmail.com"
  },
  {
    firstName: "Usuario14",
    lastName: "Apellido14",
    email: "email14@gmail.com"
  },
  {
    firstName: "Usuario15",
    lastName: "Apellido15",
    email: "email15@gmail.com"
  },
  {
    firstName: "Usuario16",
    lastName: "Apellido16",
    email: "email16@gmail.com"
  },
  {
    firstName: "Usuario17",
    lastName: "Apellido17",
    email: "email17@gmail.com"
  },
  {
    firstName: "Usuario18",
    lastName: "Apellido18",
    email: "email18@gmail.com"
  },
  {
    firstName: "Usuario19",
    lastName: "Apellido19",
    email: "email19@gmail.com"
  },
  {
    firstName: "Usuario20",
    lastName: "Apellido20",
    email: "email20@gmail.com"
  },
  {
    firstName: "Usuario21",
    lastName: "Apellido21",
    email: "email21@gmail.com"
  },
  {
    firstName: "Usuario22",
    lastName: "Apellido22",
    email: "email22@gmail.com"
  },
  {
    firstName: "Usuario23",
    lastName: "Apellido1",
    email: "email1@gmail.com"
  },
  {
    firstName: "Usuario24",
    lastName: "Apellido1",
    email: "email1@gmail.com"
  }
];

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      createUserDialogOpen: false,
      deleteUserDialogOpen: false,
      editUserDialogOpen: false,
      createUserErrors: {
        email: null,
        firstName: null,
        lastName: null,
        password: null
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

  componentDidMount() {
    const token = localStorage.getItem("token");
    axios
      .get(`${process.env.REACT_APP_USERS_SERVICE_URL}/users`, {
        headers: { Authorization: "Bearer " + token }
      })
      .then(response => {
        this.setState({
          users: response.data.map(user => {
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
      createUserDialogOpen: false
    });
  };

  handleOnAcceptCreateUserDialog = () => {
    this.setState({
      createUserDialogOpen: false
    });
  };

  handleOnChangeCreateUserDialog = (field, evt) => {
    const newUser = {};
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
