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

const EditUserDialog = props => (
  <Dialog open={props.open} onClose={props.onCancel}>
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

      <CustomInput
        labelText="Fecha de corte de servicio"
        formControlProps={{
          fullWidth: true,
          margin: "dense"
        }}
        labelProps={{
          shrink: true
        }}
        inputProps={{
          type: "date",
          onChange: evt => props.handleOnChange("expiration", evt),
          value: props.user.expiration
        }}
      />
      <FormControl fullWidth>
        <InputLabel htmlFor="group-select">Perfil</InputLabel>
        <Select
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
      <Button onClick={props.onAccept} color="primary">
        Editar
      </Button>
    </DialogActions>
  </Dialog>
);

EditUserDialog.propTypes = {
  open: PropTypes.bool.isRequired,
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
    lastName: PropTypes.string.isRequired,
    expiration: PropTypes.string
  }).isRequired,
  handleOnChange: PropTypes.func.isRequired
};

export default EditUserDialog;
