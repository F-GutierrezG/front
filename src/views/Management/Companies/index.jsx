import React, { Component } from "react";

import axios from "axios";

import { Link } from "react-router-dom";

import Create from "@material-ui/icons/Create";
import People from "@material-ui/icons/People";
import Block from "@material-ui/icons/Block";
import DoneAll from "@material-ui/icons/DoneAll";

import RequireAuth from "components/RequireAuth";

import { ActionButton } from "views/Components/Management";

import CompaniesWithError from "./Companies";

class Companies extends Component {
  state = {
    hasError: false,
    errorMessage: "",
    companies: [],
    classifications: [],
    createCompanyDialogOpen: false,
    createCompanyErrors: {
      identifier: null,
      name: null,
      classification: null
    },
    newCompany: {
      identifier: "",
      name: "",
      classification: ""
    }
  };

  mapCompany = company => {
    return {
      id: company.id,
      identifier: company.identifier,
      name: company.name,
      active: company.active,
      classification: company.classification,
      status: company.active ? "Activo" : "Desactivo",
      actions: (
        <div className="actions-right">
          <Link
            to={{
              pathname: `/company/${company.id}`,
              state: { title: company.name }
            }}
          >
            <ActionButton color="info" name="view" icon={<People />} />
          </Link>
          <ActionButton color="primary" name="edit" icon={<Create />} />
          {company.active ? (
            <ActionButton
              color="danger"
              icon={<Block />}
              onClick={() => this.deactivate(company.id)}
            />
          ) : (
            <ActionButton
              color="success"
              icon={<DoneAll />}
              onClick={() => this.activate(company.id)}
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
        `${process.env.REACT_APP_COMPANIES_SERVICE_URL}/${id}/deactivate`,
        {},
        {
          headers: { Authorization: "Bearer " + token }
        }
      )
      .then(() => {
        const updatedCompany = {
          ...this.state.companies.find(company => company.id === id)
        };
        updatedCompany.active = false;

        const companies = this.state.companies.map(company => {
          if (company.id === id) {
            return updatedCompany;
          } else {
            return company;
          }
        });

        this.setState({
          companies: companies.map(company => this.mapCompany(company))
        });
      })
      .catch(err => {
        this.setState({
          hasError: true,
          errorMessage: err.response.statusText
        });
      });
  };

  activate = id => {
    const token = localStorage.getItem("token");
    axios
      .put(
        `${process.env.REACT_APP_COMPANIES_SERVICE_URL}/${id}/activate`,
        {},
        {
          headers: { Authorization: "Bearer " + token }
        }
      )
      .then(() => {
        const updatedCompany = {
          ...this.state.companies.find(company => company.id === id)
        };
        updatedCompany.active = true;

        const companies = this.state.companies.map(company => {
          if (company.id === id) {
            return updatedCompany;
          } else {
            return company;
          }
        });

        this.setState({
          companies: companies.map(company => this.mapCompany(company))
        });
      })
      .catch(err => {
        this.setState({
          hasError: true,
          errorMessage: err.response.statusText
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
        this.setState({
          companies: response.data.map(company => this.mapCompany(company))
        });
      })
      .catch(err => {
        this.setState({
          hasError: true,
          errorMessage: err.response.statusText
        });
      });

    axios
      .get(`${process.env.REACT_APP_COMPANIES_SERVICE_URL}/classifications`, {
        headers: { Authorization: "Bearer " + token }
      })
      .then(response => {
        this.setState({
          classifications: response.data.map(classification => ({
            id: classification.id,
            name: classification.name
          }))
        });
      })
      .catch(err => {
        this.setState({
          hasError: true,
          errorMessage: err.response.statusText
        });
      });
  }

  handleCreateCompanyButton = () => {
    this.setState({
      createCompanyDialogOpen: true
    });
  };

  handleOnChangeCreateCompanyDialog = (field, evt) => {
    const newCompany = { ...this.state.newCompany };
    newCompany[field] = evt.target.value;
    this.setState({ newCompany });
  };
  handleOnCancelCreateCompanyDialog = () => {
    this.setState({
      createCompanyDialogOpen: false,
      createCompanyErrors: {
        identifier: null,
        name: null,
        classification: null
      },
      newCompany: {
        identifier: "",
        name: "",
        classification: ""
      }
    });
  };

  handleOnAcceptCreateCompanyDialog = () => {
    const company = this.state.newCompany;

    if (this.validateCreateCompany(company)) {
      const token = localStorage.getItem("token");
      axios
        .post(
          `${process.env.REACT_APP_COMPANIES_SERVICE_URL}`,
          {
            identifier: company.identifier,
            name: company.name,
            classification_id: company.classification
          },
          {
            headers: { Authorization: "Bearer " + token }
          }
        )
        .then(response => {
          const companies = [...this.state.companies];
          companies.push(this.mapCompany(response.data));
          this.setState({
            companies,
            createCompanyErrors: {
              identifier: null,
              name: null,
              classification: null
            },
            newCompany: {
              identifier: "",
              name: "",
              classification: ""
            },
            createCompanyDialogOpen: false
          });
        })
        .catch(err => {
          this.setState({
            hasError: true,
            errorMessage: err.response.statusText
          });
        });
    }
  };

  validateCreateCompany = company => {
    let identifierError = false;
    let nameError = false;
    let classificationError = false;

    if (company.identifier.trim() === "") identifierError = true;
    if (company.name.trim() === "") nameError = true;
    if (!company.classification) classificationError = true;

    this.setState({
      createCompanyErrors: {
        identifier: identifierError,
        name: nameError,
        classification: classificationError
      }
    });

    return !(identifierError || nameError || classificationError);
  };

  render() {
    return (
      <CompaniesWithError
        openCreateCompany={this.state.createCompanyDialogOpen}
        classifications={this.state.classifications}
        onCancelCreateCompany={this.handleOnCancelCreateCompanyDialog}
        onAcceptCreateCompany={this.handleOnAcceptCreateCompanyDialog}
        onChangeCreateCompany={this.handleOnChangeCreateCompanyDialog}
        companyCreated={this.state.newCompany}
        createCompanyErrors={this.state.createCompanyErrors}
        companies={this.state.companies}
        onCreateCompanyButton={this.handleCreateCompanyButton}
      />
    );
  }
}

export default RequireAuth(Companies);
