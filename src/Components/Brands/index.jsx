import React from "react";
import PropTypes from "prop-types";

import Add from "@material-ui/icons/Add";
import Category from "@material-ui/icons/Category";

import Management from "Components/Management";
import DownloadToolbar from "Components/DownloadToolbar";

import withErrors from "Components/withErrors";

import CreateBrandDialog from "./CreateBrandDialog";
import EditBrandDialog from "./EditBrandDialog";

const columns = [
  { Header: "Nombre", accessor: "name" },
  { Header: "Estado", accessor: "status" },
  {
    Header: "Acciones",
    accessor: "actions",
    sortable: false,
    filterable: false
  }
];

const Brands = props => {
  const userData = JSON.parse(localStorage.getItem("user"));
  return (
    <div>
      <CreateBrandDialog
        open={props.openCreateBrand}
        errors={props.createBrandErrors}
        brand={props.brandCreated}
        handleOnChange={props.onCreateBrandChange}
        onCancel={props.onCancelCreateBrand}
        onAccept={props.onAcceptCreateBrand}
      />
    <EditBrandDialog
        open={props.openEditBrand}
        errors={props.editBrandErrors}
        brand={props.brandEdited}
        handleOnChange={props.onEditBrandChange}
        onCancel={props.onCancelEditBrand}
        onAccept={props.onAcceptEditBrand}
      />
    {userData &&
        userData.admin && <DownloadToolbar onClick={props.onClickDownload} />}
      <Management
        icon={<Category />}
        color="info"
        elements={props.brands}
        noDataText="No existen Marcas"
        columns={columns}
        addButtonText="Crear Marca"
        addButtonIcon={<Add />}
        addButtonColor="success"
        addButtonOnClick={props.onAddBrandClick}
      />
    </div>
  );
};

Brands.propTypes = {
  openCreateBrand: PropTypes.bool.isRequired,
  createBrandErrors: PropTypes.object.isRequired,
  editPasswordErrors: PropTypes.object.isRequired,
  brandCreated: PropTypes.object.isRequired,
  onCreateBrandChange: PropTypes.func.isRequired,
  onCancelCreateBrand: PropTypes.func.isRequired,
  onAcceptCreateBrand: PropTypes.func.isRequired,
  openEditBrand: PropTypes.bool.isRequired,
  editBrandErrors: PropTypes.object.isRequired,
  brandEdited: PropTypes.object.isRequired,
  onEditBrandChange: PropTypes.func.isRequired,
  onCancelEditBrand: PropTypes.func.isRequired,
  onAcceptEditBrand: PropTypes.func.isRequired,
  brands: PropTypes.array.isRequired,
  onAddBrandClick: PropTypes.func.isRequired,
  onClickDownload: PropTypes.func.isRequired
};

export default withErrors(Brands);
