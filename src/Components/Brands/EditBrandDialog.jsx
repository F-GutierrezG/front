import React from "react";
import PropTypes from "prop-types";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

import Button from "Components/CustomButtons/Button.jsx";

import CustomInput from "Components/CustomInput/CustomInput.jsx";

const EditUserDialog = props => (
  <Dialog open={props.open} onClose={props.onCancel}>
    <DialogTitle>Editar Marca</DialogTitle>
    <DialogContent>
      <CustomInput
        labelText="Nombre"
        formControlProps={{
          fullWidth: true,
          margin: "dense"
        }}
        error={props.errors.name}
        inputProps={{
          onChange: evt => props.handleOnChange("name", evt),
          value: props.brand.name
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
  onCancel: PropTypes.func.isRequired,
  onAccept: PropTypes.func.isRequired,
  errors: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
  brand: PropTypes.shape({
    name: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
  }).isRequired,
  handleOnChange: PropTypes.func.isRequired
};

export default EditUserDialog;
