import React from "react";
import PropTypes from "prop-types";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

import withStyles from "@material-ui/core/styles/withStyles";

import Button from "Components/CustomButtons/Button.jsx";

import extendedFormsStyle from "assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.jsx";

const logout = () => {
  localStorage.clear();
  window.location.href = "/pages/login-page";
};

const ForbiddenMessage = () => {
  return (
    <Dialog open={true} styles={{ overflow: "visible" }}>
      <DialogTitle>Sesión Inactiva</DialogTitle>
      <DialogContent>
        Su sesión no se encuentra activa, por favor ingrese nuevamente.Si el
        error persiste contacte a su administrador.
      </DialogContent>
      <DialogActions>
        <Button onClick={() => logout()}>Aceptar</Button>
      </DialogActions>
    </Dialog>
  );
};

ForbiddenMessage.propTypes = {
  error: PropTypes.object,
  closeError: PropTypes.func.isRequired
};

export default withStyles(extendedFormsStyle)(ForbiddenMessage);
