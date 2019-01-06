import React, { Component } from "react";

import axios from "axios";

import { Link } from "react-router-dom";

import Add from "@material-ui/icons/Add";
import Business from "@material-ui/icons/Business";
import People from "@material-ui/icons/People";
import Block from "@material-ui/icons/Block";
import DoneAll from "@material-ui/icons/DoneAll";

import Management, { ActionButton } from "views/Components/Management";

class Companies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companies: [],
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

  mapCompany = company => {
    return {
      id: company.id,
      identifier: company.identifier,
      name: company.name,
      active: company.active,
      actions: (
        <div className="actions-right">
          <Link
            to={{
              pathname: `/companies/${company.id}`,
              state: { title: company.name }
            }}
          >
            <ActionButton color="info" name="view" icon={<People />} />
          </Link>
          {
            company.active
            ? <ActionButton color="danger" icon={<Block />} onClick={ event => this.deactivate(company.id) } />
            : <ActionButton color="success" icon={<DoneAll />} onClick={ event => this.activate(company.id) } />
          }
        </div>
      )
    };
  }

  deactivate = id => {
    const token = localStorage.getItem("token");
    axios
      .put(`${process.env.REACT_APP_COMPANIES_SERVICE_URL}/${id}/deactivate`, {}, {
        headers: { Authorization: "Bearer " + token }
      })
      .then(response => {
        const updatedCompany = { ...this.state.companies.find(company => company.id === id)};
        updatedCompany.active = false;

        const companies = this.state.companies.map(company => {
          if(company.id === id) {
            return updatedCompany
          } else {
            return company
          }
        });

        this.setState({
          companies: companies.map(company => this.mapCompany(company))
        });
      });
  };

  activate = id => {
    const token = localStorage.getItem("token");
    axios
      .put(`${process.env.REACT_APP_COMPANIES_SERVICE_URL}/${id}/activate`, {}, {
        headers: { Authorization: "Bearer " + token }
      })
      .then(response => {
        const updatedCompany = { ...this.state.companies.find(company => company.id === id)};
        updatedCompany.active = true;

        const companies = this.state.companies.map(company => {
          if(company.id === id) {
            return updatedCompany
          } else {
            return company
          }
        });

        this.setState({
          companies: companies.map(company => this.mapCompany(company))
        });
      });
  };

  componentDidMount() {
    const token = localStorage.getItem("token");
    axios
      .get(`${process.env.REACT_APP_COMPANIES_SERVICE_URL}`, {
        headers: { Authorization: "Bearer " + token }
      })
      .then(response => {
        console.log(response.data);
        this.setState({
          companies: response.data.map(company => this.mapCompany(company))
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
