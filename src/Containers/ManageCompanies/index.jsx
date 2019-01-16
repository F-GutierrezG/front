import React, { Component } from "react";

import axios from "axios";

import { Link } from "react-router-dom";

import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Create from "@material-ui/icons/Create";
import People from "@material-ui/icons/People";
import Block from "@material-ui/icons/Block";
import DoneAll from "@material-ui/icons/DoneAll";

import CompaniesWithError from "Components/Companies";

class Companies extends Component {
  state = {
    hasError: false,
    error: "",
    companies: [],
    classifications: [],
    createCompanyDialogOpen: false,
    editCompanyDialogOpen: false,
    createCompanyErrors: {
      identifier: false,
      name: false,
      classification: false
    },
    editCompanyErrors: {
      identifier: false,
      name: false,
      classification: false
    },
    newCompany: {
      identifier: "",
      name: "",
      classification: ""
    },
    selectedCompany: {
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
      classificationId: company.classification.id,
      classificationName: company.classification.name,
      status: company.active ? "Activo" : "Desactivo",
      actions: (
        <div className="actions-right">
          <Tooltip title="Administrar usuarios">
            <Link
              to={{
                pathname: `/company/${company.id}`,
                state: { title: company.name }
              }}
            >
              <IconButton>
                <People style={{ color: "#26c6da" }} />
              </IconButton>
            </Link>
          </Tooltip>

          <Tooltip title="Editar">
            <IconButton
              onClick={() => this.handleOnEditCompanyClick(company.id)}
            >
              <Create style={{ color: "#9c27b0" }} />
            </IconButton>
          </Tooltip>

          {company.active ? (
            <Tooltip title="Desactivar">
              <IconButton onClick={() => this.deactivate(company.id)}>
                <Block style={{ color: "#f44336" }} />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Activar">
              <IconButton onClick={() => this.activate(company.id)}>
                <DoneAll style={{ color: "#4caf50" }} />
              </IconButton>
            </Tooltip>
          )}
        </div>
      )
    };
  };

  closeError = () => {
    this.setState({
      hasError: false
    });
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
      .then(response => {
        const updatedCompany = this.mapCompany(response.data);

        const companies = this.state.companies.map(company => {
          if (company.id === id) {
            return updatedCompany;
          } else {
            return company;
          }
        });

        this.setState({ companies });
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
        `${process.env.REACT_APP_COMPANIES_SERVICE_URL}/${id}/activate`,
        {},
        {
          headers: { Authorization: "Bearer " + token }
        }
      )
      .then(response => {
        const updatedCompany = this.mapCompany(response.data);
        updatedCompany.active = true;

        const companies = this.state.companies.map(company => {
          if (company.id === id) {
            return updatedCompany;
          } else {
            return company;
          }
        });

        this.setState({ companies });
      })
      .catch(err => {
        this.setState({
          hasError: true,
          error: err
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
          error: err
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
          error: err
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

  handleOnChangeEditCompanyDialog = (field, evt) => {
    const selectedCompany = { ...this.state.selectedCompany };
    selectedCompany[field] = evt.target.value;
    this.setState({ selectedCompany });
  };

  handleOnEditCompanyClick = id => {
    const company = this.state.companies.find(company => company.id === id);
    this.setState({
      selectedCompany: company,
      editCompanyDialogOpen: true
    });
  };

  handleOnCancelEditCompanyDialog = () => {
    this.setState({
      editCompanyDialogOpen: false
    });
  };

  handleOnAcceptEditCompanyDialog = () => {
    const id = this.state.selectedCompany.id;
    const token = localStorage.getItem("token");
    axios
      .put(
        `${process.env.REACT_APP_COMPANIES_SERVICE_URL}/${id}`,
        {
          identifier: this.state.selectedCompany.identifier,
          name: this.state.selectedCompany.name,
          classification_id: this.state.selectedCompany.classificationId
        },
        {
          headers: { Authorization: "Bearer " + token }
        }
      )
      .then(response => {
        const companies = [
          ...this.state.companies.map(company => {
            if (company.id === id) {
              return this.mapCompany(response.data);
            } else {
              return company;
            }
          })
        ];

        this.setState({
          companies: companies,
          editCompanyDialogOpen: false
        });
      })
      .catch(err => {
        this.setState({
          hasError: true,
          error: err
        });
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
            error: err
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

  handleOnClickDownload = () => {
    const token = localStorage.getItem("token");

    axios({
      url: `${process.env.REACT_APP_EXPORTER_SERVICE_URL}/companies`,
      method: "GET",
      responseType: "blob",
      headers: { Authorization: "Bearer " + token }
    })
      .then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "file.csv");
        document.body.appendChild(link);
        link.click();
      })
      .catch(err => {
        this.setState({
          hasError: true,
          error: err
        });
      });
  };

  render() {
    return (
      <CompaniesWithError
        hasError={this.state.hasError}
        error={this.state.error}
        closeError={this.closeError}
        openCreateCompany={this.state.createCompanyDialogOpen}
        classifications={this.state.classifications}
        onCancelCreateCompany={this.handleOnCancelCreateCompanyDialog}
        onAcceptCreateCompany={this.handleOnAcceptCreateCompanyDialog}
        onChangeCreateCompany={this.handleOnChangeCreateCompanyDialog}
        companyCreated={this.state.newCompany}
        createCompanyErrors={this.state.createCompanyErrors}
        companies={this.state.companies}
        onCreateCompanyButton={this.handleCreateCompanyButton}
        openEditCompany={this.state.editCompanyDialogOpen}
        onCancelEditCompany={this.handleOnCancelEditCompanyDialog}
        selectedCompany={this.state.selectedCompany}
        onEditCompaniChange={this.handleOnChangeEditCompanyDialog}
        onAcceptEditCompany={this.handleOnAcceptEditCompanyDialog}
        onClickDownload={this.handleOnClickDownload}
        editCompanyErrors={this.state.editCompanyErrors}
      />
    );
  }
}

export default Companies;
