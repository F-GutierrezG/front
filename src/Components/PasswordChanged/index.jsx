import React from "react";
import PropTypes from "prop-types";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

import Button from "Components/CustomButtons/Button.jsx";

const PasswordChanged = props => (
  <Dialog open={props.open} onClose={props.onClose}>
    <DialogTitle>Contraseña Modificada</DialogTitle>
    <DialogContent>Su contraseña ha sido modificada con éxito.</DialogContent>
    <DialogActions>
      <Button color="rose" simple size="lg" block onClick={props.onClose}>
        Aceptar
      </Button>
    </DialogActions>
  </Dialog>
);

PasswordChanged.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default PasswordChanged;
