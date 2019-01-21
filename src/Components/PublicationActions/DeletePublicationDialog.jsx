import React from "react";
import PropTypes from "prop-types";

import withStyles from "@material-ui/core/styles/withStyles";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

import GridContainer from "Components/Grid/GridContainer.jsx";
import GridItem from "Components/Grid/GridItem.jsx";

import Button from "Components/CustomButtons/Button.jsx";

import extendedFormsStyle from "assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.jsx";

const DeletePublicationDialog = props => {
  return (
    <Dialog
      open={props.open}
      styles={{ overflow: "visible" }}
      onClose={props.onCancel}
    >
      <DialogTitle>Eliminar Publicación</DialogTitle>
      <DialogContent>
        <GridContainer>
          <GridItem xs={12}>
            ¿Está seguro que desea eliminar esta publicación? Esta acción no
            puede deshacerse.
          </GridItem>
        </GridContainer>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onCancel} disabled={props.buttonsDisabled}>
          Cancelar
        </Button>
        <Button
          onClick={props.onAccept}
          disabled={props.buttonsDisabled}
          color="danger"
        >
          Eliminar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

DeletePublicationDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onChange: PropTypes.func,
  onCancel: PropTypes.func,
  onAccept: PropTypes.func,
  buttonsDisabled: PropTypes.bool.isRequired
};

export default withStyles(extendedFormsStyle)(DeletePublicationDialog);
