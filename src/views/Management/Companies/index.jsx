import React, { Component } from "react";

import { Link } from "react-router-dom";

import Add from "@material-ui/icons/Add";
import Business from "@material-ui/icons/Business";
import Create from "@material-ui/icons/Create";
import Delete from "@material-ui/icons/Delete";
import Visibility from "@material-ui/icons/Visibility";

import Management, { ActionButton } from "views/Components/Management";

const companies = [
  {
    identifier: "11.111.111-1",
    name: "Compañía 1"
  },
  {
    identifier: "22.222.222-2",
    name: "Compañía 2"
  }
];

class Companies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companiess: [],
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
      companies: companies.map((company, key) => {
        return {
          id: key,
          identifier: company.identifier,
          name: company.name,
          actions: (
            <div className="actions-right">
              <Link
                to={{
                  pathname: `/companies/${key}`,
                  state: { title: company.name }
                }}
              >
                <ActionButton color="info" name="view" icon={<Visibility />} />
              </Link>
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
        accessor: "identifier"
      },
      {
        Header: "Razón Social",
        accessor: "name"
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
          elements={this.state.companies}
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
