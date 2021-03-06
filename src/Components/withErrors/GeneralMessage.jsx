import React from "react";
import PropTypes from "prop-types";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

import withStyles from "@material-ui/core/styles/withStyles";

import Button from "Components/CustomButtons/Button.jsx";

import extendedFormsStyle from "assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.jsx";

const GeneralMessage = props => {
  return (
    <Dialog open={true} styles={{ overflow: "visible" }}>
      <DialogTitle>Error</DialogTitle>
      <DialogContent>
        Ha ocurrido un error, por favor reintente. En caso de persistir el
        problema notifíquenos indicando la acción que estaba realizando y el
        siguiente mensaje de error:
        <br />
        <br />
        {props.error.response.status} {props.error.response.statusText}
      </DialogContent>
      <DialogActions>
        <Button onClick={props.closeError}>Aceptar</Button>
      </DialogActions>
    </Dialog>
  );
};

GeneralMessage.propTypes = {
  error: PropTypes.object,
  closeError: PropTypes.func.isRequired
};

export default withStyles(extendedFormsStyle)(GeneralMessage);
