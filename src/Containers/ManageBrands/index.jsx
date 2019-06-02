import React, { Component } from "react";
import PropTypes from "prop-types";

import axios from "axios";

import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Create from "@material-ui/icons/Create";
import Block from "@material-ui/icons/Block";
import DoneAll from "@material-ui/icons/DoneAll";

import BrandsWithError from "Components/Brands";

class Brands extends Component {
  state = {
    hasError: false,
    error: "",
    brands: [],
    groups: [],
    createBrandDialogOpen: false,
    deleteBrandDialogOpen: false,
    editBrandDialogOpen: false,
    editBrandDialogOpenPassword: false,
    createBrandErrors: {
      email: false,
      firstName: false,
      lastName: false,
      password: false,
      groupId: false
    },
    editBrandErrors: {
      email: null,
      firstName: null,
      lastName: null,
      password: null
    },
    newBrand: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      groupId: ""
    },
    selectedBrand: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      groupId: ""
    },
  };

  closeError = () => {
    this.setState({
      hasError: false
    });
  };

  mapBrand = brand => {
    return {
      id: brand.id,
      name: brand.name,
      active: brand.active,
      status: brand.active ? "Activo" : "Desactivo",
      actions: (
        <div className="actions-right">
          <Tooltip title="Editar">
            <IconButton onClick={() => this.handleOnEditBrandClick(brand.id)}>
              <Create style={{ color: "#9c27b0" }} />
            </IconButton>
          </Tooltip>
          {brand.active ? (
            <Tooltip title="Desactivar">
              <IconButton onClick={() => this.deactivate(brand.id)}>
                <Block style={{ color: "#f44336" }} />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Activar">
              <IconButton onClick={() => this.activate(brand.id)}>
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
        `${this.props.deactivateBrandURL}/${id}/deactivate`,
        {},
        {
          headers: { Authorization: "Bearer " + token }
        }
      )
      .then(response => {
        const brands = [
          ...this.state.brands.map(brand => {
            if (brand.id === id) {
              return this.mapBrand(response.data);
            } else {
              return brand;
            }
          })
        ];

        this.setState({
          brands: brands
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
        `${this.props.activateBrandURL}/${id}/activate`,
        {},
        {
          headers: { Authorization: "Bearer " + token }
        }
      )
      .then(response => {
        const brands = this.state.brands.map(brand => {
          if (brand.id === id) {
            return this.mapBrand(response.data);
          } else {
            return brand;
          }
        });

        this.setState({
          brands: brands
        });
      })
      .catch(err => {
        this.setState({
          hasError: true,
          error: err
        });
      });
  };

  loadBrands = () => {
    const token = localStorage.getItem("token");
    axios
      .get(this.props.listBrandsURL, {
        headers: { Authorization: "Bearer " + token }
      })
      .then(response => {
        this.setState({
          brands: response.data.map(brand => {
            return this.mapBrand(brand);
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
    this.loadBrands();
  }

  handleCreateBrandButton = () => {
    this.setState({
      createBrandDialogOpen: true
    });
  };

  handleOnCancelCreateBrandDialog = () => {
    this.setState({
      createBrandDialogOpen: false,
      createBrandErrors: {
        firstName: false,
        lastName: false,
        email: false,
        password: false,
        groupId: false
      },
      newBrand: {
        email: "",
        firstName: "",
        lastName: "",
        password: "",
        groupId: ""
      }
    });
  };

  handleOnChangeCreateBrandDialog = (field, evt) => {
    const newBrand = { ...this.state.newBrand };
    newBrand[field] = evt.target.value;
    this.setState({ newBrand });
  };

  handleOnChangeEditBrandDialog = (field, evt) => {
    const selectedBrand = { ...this.state.selectedBrand };
    selectedBrand[field] = evt.target.value;
    this.setState({ selectedBrand });
  };

  handleOnEditBrandClick = id => {
    const brand = this.state.brands.find(brand => brand.id === id);
    this.setState({
      selectedBrand: brand,
      editBrandDialogOpen: true
    });
  };

  handleOnCancelEditBrandDialog = () => {
    this.setState({
      editBrandDialogOpen: false
    });
  };

  handleOnAcceptEditBrandDialog = () => {
    const id = this.state.selectedBrand.id;
    const token = localStorage.getItem("token");
    axios
      .put(
        `${process.env.REACT_APP_COMPANIES_SERVICE_URL}/brands/${id}`,
        {
          name: this.state.selectedBrand.name,
        },
        {
          headers: { Authorization: "Bearer " + token }
        }
      )
      .then(response => {
        const brands = [
          ...this.state.brands.map(brand => {
            if (brand.id === id) {
              return this.mapBrand(response.data);
            } else {
              return brand;
            }
          })
        ];

        this.setState({
          brands: brands,
          editBrandDialogOpen: false
        });
      })
      .catch(err => {
        this.setState({
          hasError: true,
          error: err
        });
      });
  };

  handleOnAcceptCreateBrandDialog = () => {
    const brand = this.state.newBrand;
    if (this.validateCreateBrand(brand)) {
      const token = localStorage.getItem("token");
      axios
        .post(
          this.props.createBrandURL,
          {
            name: brand.name
          },
          {
            headers: { Authorization: "Bearer " + token }
          }
        )
        .then(response => {
          const brands = [...this.state.brands];
          brands.push(this.mapBrand(response.data));
          this.setState({
            brands,
            createBrandErrors: {
              name: false,
            },
            newBrand: {
              name: ""
            },
            createBrandDialogOpen: false
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

  validateCreateBrand = brand => {
    let nameError = false;

    if (brand.name === undefined || brand.name.trim() === "") nameError = true;

    this.setState({
      createBrandErrors: {
        name: nameError,
      }
    });

    return !(nameError);
  };

  handleOnClickDownload = () => {
    const token = localStorage.getItem("token");

    axios({
      url: this.props.downloadURL,
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
      <BrandsWithError
        hasError={this.state.hasError}
        error={this.state.error}
        closeError={this.closeError}
        openCreateBrand={this.state.createBrandDialogOpen}
        createBrandErrors={this.state.createBrandErrors}
        brandCreated={this.state.newBrand}
        onCreateBrandChange={this.handleOnChangeCreateBrandDialog}
        onCancelCreateBrand={this.handleOnCancelCreateBrandDialog}
        onAcceptCreateBrand={this.handleOnAcceptCreateBrandDialog}
        openEditBrand={this.state.editBrandDialogOpen}
        editBrandErrors={this.state.editBrandErrors}
        brandEdited={this.state.selectedBrand}
        onEditBrandChange={this.handleOnChangeEditBrandDialog}
        onCancelEditBrand={this.handleOnCancelEditBrandDialog}
        onAcceptEditBrand={this.handleOnAcceptEditBrandDialog}
        brands={this.state.brands}
        onAddBrandClick={this.handleCreateBrandButton}
        onClickDownload={this.handleOnClickDownload}
      />
    );
  }
}

Brands.propTypes = {
  listBrandsURL: PropTypes.string.isRequired,
  deactivateBrandURL: PropTypes.string.isRequired,
  activateBrandURL: PropTypes.string.isRequired,
  createBrandURL: PropTypes.string.isRequired,
  downloadURL: PropTypes.string.isRequired
};

export default Brands;
