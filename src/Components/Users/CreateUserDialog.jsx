import React from "react";
import PropTypes from "prop-types";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import Button from "Components/CustomButtons/Button.jsx";

import CustomInput from "Components/CustomInput/CustomInput.jsx";

const CreateUserDialog = props => (
  <Dialog open={props.open} onClose={props.onCancel}>
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
          type: "email",
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

      <FormControl fullWidth>
        <InputLabel htmlFor="group-select">Perfil</InputLabel>
        <Select
          error={props.errors.firstName}
          value={props.user.groupId}
          onChange={evt => props.handleOnChange("groupId", evt)}
        >
          <MenuItem disabled>Perfil</MenuItem>
          {props.groups.map(group => {
            return (
              <MenuItem key={group.id} value={group.id}>
                {group.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
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
  onCancel: PropTypes.func.isRequired,
  onAccept: PropTypes.func.isRequired,
  errors: PropTypes.shape({
    email: PropTypes.bool,
    firstName: PropTypes.bool,
    lastName: PropTypes.bool,
    password: PropTypes.bool,
    groupId: PropTypes.bool
  }).isRequired,
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    groupId: PropTypes.string.isRequired
  }).isRequired,
  handleOnChange: PropTypes.func.isRequired,
  groups: PropTypes.array.isRequired
};

export default CreateUserDialog;
