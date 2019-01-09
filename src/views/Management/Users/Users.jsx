import React from "react";
import PropTypes from "prop-types";

import Add from "@material-ui/icons/Add";
import Person from "@material-ui/icons/Person";

import Management from "views/Components/Management";

import withErrors from "components/withErrors";

import CreateUserDialog from "./CreateUserDialog";
import EditUserDialog from "./EditUserDialog";

const columns = [
  { Header: "Nombre", accessor: "firstName" },
  { Header: "Apellido", accessor: "lastName" },
  { Header: "E-Mail", accessor: "email" },
  {
    Header: "Acciones",
    accessor: "actions",
    sortable: false,
    filterable: false
  }
];

const Users = props => {
  return (
    <div>
      <CreateUserDialog
        open={props.openCreateUser}
        errors={props.createUserErrors}
        user={props.userCreated}
        handleOnChange={props.onCreateUserChange}
        onCancel={props.onCancelCreateUser}
        onAccept={props.onAcceptCreateUser}
      />
      <EditUserDialog
        open={props.openEditUser}
        errors={props.editUserErrors}
        user={props.userEdited}
        handleOnChange={props.onEditUserChange}
        onCancel={props.onCancelEditUser}
        onAccept={props.onAcceptEditUser}
      />
      <Management
        icon={<Person />}
        color="info"
        elements={props.users}
        noDataText="No existen Usuarios"
        columns={columns}
        addButtonText="Crear Usuario"
        addButtonIcon={<Add />}
        addButtonColor="success"
        addButtonOnClick={props.onAddUserClick}
      />
    </div>
  );
};

Users.propTypes = {
  openCreateUser: PropTypes.bool.isRequired,
  createUserErrors: PropTypes.object.isRequired,
  userCreated: PropTypes.object.isRequired,
  onCreateUserChange: PropTypes.func.isRequired,
  onCancelCreateUser: PropTypes.func.isRequired,
  onAcceptCreateUser: PropTypes.func.isRequired,
  openEditUser: PropTypes.bool.isRequired,
  editUserErrors: PropTypes.object.isRequired,
  userEdited: PropTypes.object.isRequired,
  onEditUserChange: PropTypes.func.isRequired,
  onCancelEditUser: PropTypes.func.isRequired,
  onAcceptEditUser: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired,
  onAddUserClick: PropTypes.func.isRequired
};

export default withErrors(Users);
