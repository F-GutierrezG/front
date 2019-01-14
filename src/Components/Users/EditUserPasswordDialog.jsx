import React from "react";
import PropTypes from "prop-types";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

import Button from "Components/CustomButtons/Button.jsx";

import CustomInput from "Components/CustomInput/CustomInput.jsx";

const EditUserPasswordDialog = props => (
  <Dialog open={props.open} onClose={props.onClose}>
    <DialogTitle>Editar Password</DialogTitle>
    <DialogContent>
      <CustomInput
        labelText="E-Mail"
        formControlProps={{
          fullWidth: true,
          disabled: true,
          margin: "dense"
        }}
        error={props.errors.email}
        inputProps={{
          value: props.user.email
        }}
      />

      <CustomInput
        labelText="Nombre"
        formControlProps={{
          fullWidth: true,
          disabled: true,
          margin: "dense"
        }}
        error={props.errors.firstName}
        inputProps={{

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

          value: props.user.lastName
        }}
      />

      <CustomInput
        labelText="Password"
        formControlProps={{
          fullWidth: true,
          margin: "dense"
        }}

        inputProps={{
          type: "password",
          onChange: evt => props.handleOnChange("password", evt),
          value: props.user.password
        }}
      />


    </DialogContent>
    <DialogActions>
      <Button onClick={props.onCancel}>Cancelar</Button>
      <Button onClick={props.onAccept} color="primary">
        Editar Password
      </Button>
    </DialogActions>
  </Dialog>
);

EditUserPasswordDialog.propTypes = {
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

export default EditUserPasswordDialog;
