import React from "react";
import PropTypes from "prop-types";

import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import CloudDownloadOutlined from "@material-ui/icons/CloudDownloadOutlined";
import Add from "@material-ui/icons/Add";
import Business from "@material-ui/icons/Business";

import withErrors from "Components/withErrors";

import Management from "Components/Management";

import CreateCompanyDialog from "./CreateCompanyDialog";
import EditCompanyDialog from "./EditCompanyDialog";

const columns = [
  { Header: "Rut", accessor: "identifier" },
  { Header: "Razón Social", accessor: "name" },
  { Header: "Giro", accessor: "classificationName" },
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
      <EditCompanyDialog
        open={props.openEditCompany}
        classifications={props.classifications}
        onCancel={props.onCancelEditCompany}
        onAccept={props.onAcceptEditCompany}
        handleOnChange={props.onEditCompaniChange}
        company={props.selectedCompany}
        errors=""
      />
      <div style={{ "text-align": "right" }}>
        <Tooltip title="Descargar">
          <IconButton>
            <CloudDownloadOutlined style={{ color: "#26c6da" }} />
          </IconButton>
        </Tooltip>
      </div>
      <Management
        icon={<Business />}
        color="success"
        elements={props.companies}
        noDataText="No existen Empresas"
        columns={columns}
        addButtonText="Crear Empresas"
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
