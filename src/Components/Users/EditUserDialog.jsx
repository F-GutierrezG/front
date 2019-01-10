import React from "react";
import PropTypes from "prop-types";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

import Button from "Components/CustomButtons/Button.jsx";

import CustomInput from "Components/CustomInput/CustomInput.jsx";

const EditUserDialog = props => (
  <Dialog open={props.open} onClose={props.onClose}>
    <DialogTitle>Editar Usuario</DialogTitle>
    <DialogContent>
      <CustomInput
        labelText="E-Mail"
        formControlProps={{
          fullWidth: true,
          margin: "dense"
        }}
        error={props.errors.email}
        inputProps={{
          onChange: evt => props.handleOnChange("email", evt),
          value: props.user.email
        }}
      />

      <CustomInput
        labelText="Nombre"
        formControlProps={{
          fullWidth: true,
          margin: "dense"
        }}
        error={props.errors.firstName}
        inputProps={{
          onChange: evt => props.handleOnChange("firstName", evt),
          value: props.user.firstName
        }}
      />

      <CustomInput
        labelText="Apellido"
        formControlProps={{
          fullWidth: true,
          margin: "dense"
        }}
        error={props.errors.lastName}
        inputProps={{
          onChange: evt => props.handleOnChange("lastName", evt),
          value: props.user.lastName
        }}
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={props.onCancel}>Cancelar</Button>
      <Button onClick={props.onAccept} color="primary">
        Editar
      </Button>
    </DialogActions>
  </Dialog>
);

EditUserDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  onCancel: PropTypes.func.isRequired,
  onAccept: PropTypes.func.isRequired,
  errors: PropTypes.shape({
    email: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string
  }).isRequired,
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired
  }).isRequired,
  handleOnChange: PropTypes.func.isRequired
};

export default EditUserDialog;
