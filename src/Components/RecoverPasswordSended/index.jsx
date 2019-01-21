import React from "react";
import PropTypes from "prop-types";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

import Button from "Components/CustomButtons/Button.jsx";

const RecoverPasswordSended = props => (
  <Dialog open={props.open} onClose={props.onClose}>
    <DialogTitle>Recuperar Contraseña</DialogTitle>
    <DialogContent>
      En caso de estar registrado el correo indicado, recibirá un e-mail con las
      instrucciones para restaurar su contraseña.
    </DialogContent>
    <DialogActions>
      <Button color="rose" simple size="lg" block onClick={props.onClose}>
        Aceptar
      </Button>
    </DialogActions>
  </Dialog>
);

RecoverPasswordSended.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default RecoverPasswordSended;
