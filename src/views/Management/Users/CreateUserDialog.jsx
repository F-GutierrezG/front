import React from "react";
import PropTypes from "prop-types";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

import Button from "components/CustomButtons/Button.jsx";

import CustomInput from "components/CustomInput/CustomInput.jsx";

const CreateUserDialog = props => (
  <Dialog open={props.open} onClose={props.onClose}>
    <DialogTitle>Crear Usuario</DialogTitle>
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

      <CustomInput
        labelText="Contraseña"
        formControlProps={{
          fullWidth: true,
          margin: "dense"
        }}
        error={props.errors.password}
        inputProps={{
          type: "password",
          onChange: evt => props.handleOnChange("password", evt),
          value: props.user.password
        }}
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={props.onCancel}>Cancelar</Button>
      <Button onClick={props.onAccept} color="success">
        Crear
      </Button>
    </DialogActions>
  </Dialog>
);

CreateUserDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onAccept: PropTypes.func.isRequired,
  errors: PropTypes.shape({
    email: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    password: PropTypes.string
  }).isRequired,
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
  }).isRequired,
  handleOnChange: PropTypes.func.isRequired
};

export default CreateUserDialog;
