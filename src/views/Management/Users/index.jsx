import React, { Component } from "react";

import Add from "@material-ui/icons/Add";
import Person from "@material-ui/icons/Person";
import Create from "@material-ui/icons/Create";
import Delete from "@material-ui/icons/Delete";
import Visibility from "@material-ui/icons/Visibility";

import Management, { ActionButton } from "views/Components/Management";

import CreateUserDialog from "./CreateUserDialog";
import DeleteUserDialog from "./DeleteUserDialog";

const users = [
  {
    first_name: "Usuario1",
    last_name: "Apellido1",
    email: "email1@gmail.com"
  },
  {
    first_name: "Usuario2",
    last_name: "Apellido2",
    email: "email2@gmail.com"
  },
  {
    first_name: "Usuario3",
    last_name: "Apellido3",
    email: "email3@gmail.com"
  },
  {
    first_name: "Usuario4",
    last_name: "Apellido4",
    email: "email4@gmail.com"
  },
  {
    first_name: "Usuario5",
    last_name: "Apellido5",
    email: "email5@gmail.com"
  },
  {
    first_name: "Usuario6",
    last_name: "Apellido6",
    email: "email6@gmail.com"
  },
  {
    first_name: "Usuario7",
    last_name: "Apellido7",
    email: "email7@gmail.com"
  },
  {
    first_name: "Usuario8",
    last_name: "Apellido8",
    email: "email8@gmail.com"
  },
  {
    first_name: "Usuario9",
    last_name: "Apellido9",
    email: "email9@gmail.com"
  },
  {
    first_name: "Usuario10",
    last_name: "Apellido10",
    email: "email10@gmail.com"
  },
  {
    first_name: "Usuario11",
    last_name: "Apellido11",
    email: "email11@gmail.com"
  },
  {
    first_name: "Usuario12",
    last_name: "Apellido12",
    email: "email12@gmail.com"
  },
  {
    first_name: "Usuario13",
    last_name: "Apellido13",
    email: "email13@gmail.com"
  },
  {
    first_name: "Usuario14",
    last_name: "Apellido14",
    email: "email14@gmail.com"
  },
  {
    first_name: "Usuario15",
    last_name: "Apellido15",
    email: "email15@gmail.com"
  },
  {
    first_name: "Usuario16",
    last_name: "Apellido16",
    email: "email16@gmail.com"
  },
  {
    first_name: "Usuario17",
    last_name: "Apellido17",
    email: "email17@gmail.com"
  },
  {
    first_name: "Usuario18",
    last_name: "Apellido18",
    email: "email18@gmail.com"
  },
  {
    first_name: "Usuario19",
    last_name: "Apellido19",
    email: "email19@gmail.com"
  },
  {
    first_name: "Usuario20",
    last_name: "Apellido20",
    email: "email20@gmail.com"
  },
  {
    first_name: "Usuario21",
    last_name: "Apellido21",
    email: "email21@gmail.com"
  },
  {
    first_name: "Usuario22",
    last_name: "Apellido22",
    email: "email22@gmail.com"
  },
  {
    first_name: "Usuario23",
    last_name: "Apellido1",
    email: "email1@gmail.com"
  },
  {
    first_name: "Usuario24",
    last_name: "Apellido1",
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
      createUserErrors: {
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
      selectedUser: null
    };
  }

  componentDidMount() {
    this.setState({
      users: users.map((user, key) => {
        return {
          id: key,
          first_name: user.first_name,
          last_name: user.last_name,
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
                onClick={() => alert("EDITAR")}
                color="primary"
                name="edit"
                icon={<Create />}
              />

              <ActionButton
                onClick={() => this.handleOnDeleteUserClick(key)}
                color="danger"
                name="delete"
                icon={<Delete />}
              />
            </div>
          )
        };
      })
    });
  }

  handleOnCloseCreateUserDialog = () => {
    this.setState({
      createUserDialogOpen: false
    });
  };

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

  handleOnDeleteUserClick = id => {
    this.setState({
      selectedUser: id,
      deleteUserDialogOpen: true
    });
  };

  handleOnCloseDeleteUserDialog = () => {
    this.setState({
      selectedUser: null,
      deleteUserDialogOpen: false
    });
  };

  handleOnCancelDeleteUserDialog = () => {
    this.setState({
      selectedUser: null,
      deleteUserDialogOpen: false
    });
  };

  handleOnAcceptDeleteUserDialog = () => {
    this.setState({
      selectedUser: null,
      deleteUserDialogOpen: false
    });
  };

  render() {
    const columns = [
      {
        Header: "Nombre",
        accessor: "first_name"
      },
      {
        Header: "Apellido",
        accessor: "last_name"
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
          onClose={this.handleOnCloseCreateUserDialog}
          onCancel={this.handleOnCancelCreateUserDialog}
          onAccept={this.handleOnAcceptCreateUserDialog}
        />
        <DeleteUserDialog
          open={this.state.deleteUserDialogOpen}
          user={this.state.selectedUser}
          onClose={this.handleOnCloseDeleteUserDialog}
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
