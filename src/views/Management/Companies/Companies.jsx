import React from "react";
import PropTypes from "prop-types";

import Add from "@material-ui/icons/Add";
import Business from "@material-ui/icons/Business";

import withErrors from "components/withErrors";

import Management from "views/Components/Management";

import CreateCompanyDialog from "./CreateCompanyDialog";

const columns = [
  { Header: "Rut", accessor: "identifier" },
  { Header: "Razón Social", accessor: "name" },
  { Header: "Estado", accessor: "status" },
  {
    Header: "Acciones",
    accessor: "actions",
    sortable: false,
    filterable: false
  }
];

const Companies = props => {
  return (
    <div>
      <CreateCompanyDialog
        open={props.openCreateCompany}
        classifications={props.classifications}
        onCancel={props.onCancelCreateCompany}
        onAccept={props.onAcceptCreateCompany}
        handleOnChange={props.onChangeCreateCompany}
        company={props.companyCreated}
        errors={props.createCompanyErrors}
      />
      <Management
        icon={<Business />}
        color="success"
        elements={props.companies}
        noDataText="No existen Compañías"
        columns={columns}
        addButtonText="Crear Compañía"
        addButtonIcon={<Add />}
        addButtonColor="success"
        addButtonOnClick={props.onCreateCompanyButton}
      />
    </div>
  );
};

Companies.propTypes = {
  openCreateCompany: PropTypes.bool.isRequired,
  classifications: PropTypes.array.isRequired,
  onCancelCreateCompany: PropTypes.func.isRequired,
  onAcceptCreateCompany: PropTypes.func.isRequired,
  onChangeCreateCompany: PropTypes.func.isRequired,
  companyCreated: PropTypes.object.isRequired,
  createCompanyErrors: PropTypes.object.isRequired,
  onCreateCompanyButton: PropTypes.func.isRequired,
  companies: PropTypes.array.isRequired
};

export default withErrors(Companies);
