import React from "react";
import PropTypes from "prop-types";

import withStyles from "@material-ui/core/styles/withStyles";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

import Button from "components/CustomButtons/Button.jsx";

import extendedFormsStyle from "assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.jsx";

const ErrorDialog = props => {
  return (
    <Dialog open={true} styles={{ overflow: "visible" }}>
      <DialogTitle>Error</DialogTitle>
      <DialogContent>
        Ha ocurrido un error, por favor reintente, en caso de persistir el
        problema notifíquenos indicando el siguiente mensaje de error:
        <br />
        <br />
        {props.errorMessage}
      </DialogContent>
      <DialogActions>
        <Button onClick={props.closeError}>Aceptar</Button>
      </DialogActions>
    </Dialog>
  );
};

ErrorDialog.propTypes = {
  errorMessage: PropTypes.string,
  closeError: PropTypes.func.isRequired
};

export default withStyles(extendedFormsStyle)(ErrorDialog);
