import React, { Component } from "react";
import PropTypes from "prop-types";

import axios from "axios";

import Add from "@material-ui/icons/Add";
import Person from "@material-ui/icons/Person";
import Create from "@material-ui/icons/Create";
import Block from "@material-ui/icons/Block";
import DoneAll from "@material-ui/icons/DoneAll";

import Management, { ActionButton } from "views/Components/Management";

import CreateUserDialog from "views/Management/Users/CreateUserDialog";
import EditUserDialog from "views/Management/Users/EditUserDialog";

import withStyles from "@material-ui/core/styles/withStyles";

import companyStyle from "./jss/companyStyle";

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

  mapUser = user => {
    return {
      id: user.id,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      active: user.active,
      updated: user.updated,
      status: user.active ? "Activo": "Desactivo",
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
        `${process.env.REACT_APP_USERS_SERVICE_URL}/${id}/deactivate`,
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
      .catch(err => console.log(err));
  };

  activate = id => {
    const token = localStorage.getItem("token");
    axios
      .put(
        `${process.env.REACT_APP_USERS_SERVICE_URL}/${id}/activate`,
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
      .catch(err => console.log(err));
  };

  loadUsers = () => {
    const token = localStorage.getItem("token");
    axios
      .get(`${process.env.REACT_APP_USERS_SERVICE_URL}`, {
        headers: { Authorization: "Bearer " + token }
      })
      .then(response => {
        console.log(response.data);
        this.setState({
          users: response.data.map(user => {
            return this.mapUser(user);
          })
        });
      })
      .catch(error => {
        console.log("ERROR", error)
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
        Header: "Estado",
        accessor: "status"
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
