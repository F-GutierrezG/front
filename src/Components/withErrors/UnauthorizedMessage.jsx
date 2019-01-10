import React from "react";
import PropTypes from "prop-types";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

import withStyles from "@material-ui/core/styles/withStyles";

import Button from "Components/CustomButtons/Button.jsx";

import extendedFormsStyle from "assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.jsx";

const UnauthorizedMessage = props => {
  return (
    <Dialog open={true} styles={{ overflow: "visible" }}>
      <DialogTitle>No Autorizado</DialogTitle>
      <DialogContent>
        Usted no se encuentra autorizado para realizar la acción que está
        intentando. Por favor contacte con su administrador.
      </DialogContent>
      <DialogActions>
        <Button onClick={props.closeError}>Aceptar</Button>
      </DialogActions>
    </Dialog>
  );
};

UnauthorizedMessage.propTypes = {
  error: PropTypes.object,
  closeError: PropTypes.func.isRequired
};

export default withStyles(extendedFormsStyle)(UnauthorizedMessage);
