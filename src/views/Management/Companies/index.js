import React, { Component } from "react";

import Add from "@material-ui/icons/Add";
import Business from "@material-ui/icons/Business";
import Create from "@material-ui/icons/Create";
import Delete from "@material-ui/icons/Delete";
import Visibility from "@material-ui/icons/Visibility";

import Management, { ActionButton } from "views/Components/Management";

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

class Companies extends Component {
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
    this.setState({
      users: users.map((user, key) => {
        return {
          id: key,
          firstName: user.firstName,
          lastName: user.lastName,
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
                onClick={() => this.handleOnEditUserClick(key)}
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
        Header: "Rut",
        accessor: "firstName"
      },
      {
        Header: "Razón Social",
        accessor: "lastName",
        sortable: false
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
        <Management
          icon={<Business />}
          color="success"
          elements={[]}
          noDataText="No existen Compañías"
          columns={columns}
          addButtonText="Crear Compañía"
          addButtonIcon={<Add />}
          addButtonColor="success"
          addButtonOnClick={this.handleCreateUserButton}
        />
      </div>
    );
  }
}

export default Companies;
