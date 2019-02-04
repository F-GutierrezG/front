import React from "react";
import PropTypes from "prop-types";

import withStyles from "@material-ui/core/styles/withStyles";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

import GridContainer from "Components/Grid/GridContainer.jsx";
import GridItem from "Components/Grid/GridItem.jsx";

import CustomInput from "Components/CustomInput/CustomInput.jsx";

import Button from "Components/CustomButtons/Button.jsx";

import viewPublicationDialogStyle from "./jss/viewPublicationDialogStyle.jsx";

const RejectPublicationDialog = props => {
  return (
    <Dialog
      open={props.open}
      styles={{ overflow: "visible" }}
      onClose={props.onCancelReject}
    >
      <DialogTitle>Rechazar Publicación</DialogTitle>
      <DialogContent>
        <GridContainer>
          <GridItem xs={12}>
            <CustomInput
              labelText="Motivo de Rechazo"
              error={props.errors.rejectReason}
              formControlProps={{
                fullWidth: true,
                margin: "dense"
              }}
              inputProps={{
                type: "text",
                value: props.rejectReason,
                onChange: event => props.onChangeReject(event)
              }}
            />
          </GridItem>
        </GridContainer>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onCancelReject}>Cancelar</Button>
        <Button onClick={props.onAcceptReject} color="danger">
          Rechazar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

RejectPublicationDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onCancelReject: PropTypes.func,
  onAcceptReject: PropTypes.func,
  onChangeReject: PropTypes.func.isRequired,
  rejectReason: PropTypes.string.isRequired
};

export default withStyles(viewPublicationDialogStyle)(RejectPublicationDialog);
