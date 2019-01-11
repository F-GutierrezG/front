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
    <Dialog open={props.open} styles={{ overflow: "visible" }}>
      <DialogTitle>Rechazar Publicación</DialogTitle>
      <DialogContent>
        <GridContainer>
          <GridItem xs={12}>
            <CustomInput
              labelText="Motivo de Rechazo"
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
  classes: PropTypes.object,
  open: PropTypes.bool.isRequired,
  publication: PropTypes.shape({
    date: PropTypes.string,
    time: PropTypes.string,
    title: PropTypes.string,
    socialNetworks: PropTypes.array,
    message: PropTypes.string,
    image: PropTypes.string
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  onReject: PropTypes.func,
  onAccept: PropTypes.func,
  onCancelReject: PropTypes.func,
  onAcceptReject: PropTypes.func,
  socialNetworks: PropTypes.array.isRequired,
  rejecting: PropTypes.bool.isRequired,
  onChangeReject: PropTypes.func.isRequired,
  rejectReason: PropTypes.string.isRequired
};

export default withStyles(viewPublicationDialogStyle)(RejectPublicationDialog);
