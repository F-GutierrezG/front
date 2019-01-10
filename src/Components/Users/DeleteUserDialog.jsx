import React from "react";
import PropTypes from "prop-types";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

import Button from "Components/CustomButtons/Button.jsx";

const DeleteUserDialog = props => (
  <Dialog open={props.open} onClose={props.onClose}>
    <DialogTitle>Eliminar Usuario</DialogTitle>
    <DialogContent>
      <DialogContentText>
        ¿Está seguro que desea eliminar al usuario seleccionado?
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={props.onCancel}>Cancelar</Button>
      <Button onClick={props.onAccept} color="danger">
        Eliminar
      </Button>
    </DialogActions>
  </Dialog>
);

DeleteUserDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  onCancel: PropTypes.func.isRequired,
  onAccept: PropTypes.func.isRequired
};

export default DeleteUserDialog;
