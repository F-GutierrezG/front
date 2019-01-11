import React from "react";
import PropTypes from "prop-types";

import withStyles from "@material-ui/core/styles/withStyles";

import Create from "@material-ui/icons/Create";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

import GridContainer from "Components/Grid/GridContainer.jsx";
import GridItem from "Components/Grid/GridItem.jsx";

import CustomInput from "Components/CustomInput/CustomInput.jsx";

import Button from "Components/CustomButtons/Button.jsx";

import viewPublicationDialogStyle from "./jss/viewPublicationDialogStyle.jsx";

const ViewPublicationDialog = props => {
  const { classes } = props;
  return (
    <Dialog open={props.open} styles={{ overflow: "visible" }}>
      <DialogTitle>
        <div>
          Publicación
          <Create
            style={{
              position: "absolute",
              right: "15px",
              color: "#9c27b0",
              cursor: "pointer"
            }}
            onClick={() => alert("Editar")}
          />
        </div>
      </DialogTitle>
      <DialogContent>
        <GridContainer>
          <GridItem xs={6}>
            <CustomInput
              labelText="Fecha"
              formControlProps={{
                fullWidth: true,
                margin: "dense"
              }}
              labelProps={{
                shrink: true
              }}
              inputProps={{
                type: "date",
                value: props.publication.date,
                disabled: true
              }}
            />
          </GridItem>
          <GridItem xs={6}>
            <CustomInput
              labelText="Hora"
              formControlProps={{
                fullWidth: true,
                margin: "dense"
              }}
              labelProps={{
                shrink: true
              }}
              inputProps={{
                type: "time",
                value: props.publication.time,
                disabled: true
              }}
            />
          </GridItem>
          <GridItem xs={12}>
            <CustomInput
              labelText="Título"
              formControlProps={{
                fullWidth: true,
                margin: "dense"
              }}
              labelProps={{
                shrink: true
              }}
              inputProps={{
                type: "text",
                value: props.publication.realTitle,
                disabled: true
              }}
            />
          </GridItem>
          <GridItem xs={12}>
            <CustomInput
              labelText="Redes Sociales"
              formControlProps={{
                fullWidth: true,
                margin: "dense"
              }}
              labelProps={{
                shrink: true
              }}
              inputProps={{
                type: "text",
                value: props.publication.socialNetworks
                  .map(network => {
                    return props.socialNetworks.find(options => {
                      return options.id === network;
                    }).name;
                  })
                  .join(", "),
                disabled: true
              }}
            />
          </GridItem>
          <GridItem xs={12}>
            <CustomInput
              labelText="Mensaje"
              formControlProps={{
                fullWidth: true,
                margin: "dense"
              }}
              inputProps={{
                multiline: true,
                value: props.publication.message,
                disabled: true
              }}
            />
          </GridItem>
          <GridItem xs={12} className={classes.publicationImageContainer}>
            <a
              href={props.publication.image}
              target="_blank"
              rel="noopener noreferrer"
            >
              {props.publication.image}
            </a>
          </GridItem>
        </GridContainer>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose}>Cerrar</Button>
        <Button onClick={props.onReject} color="danger">
          Rechazar
        </Button>
        <Button onClick={props.onAccept} color="success">
          Aceptar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ViewPublicationDialog.propTypes = {
  classes: PropTypes.object,
  open: PropTypes.bool.isRequired,
  publication: PropTypes.shape({
    date: PropTypes.string,
    time: PropTypes.string,
    title: PropTypes.string,
    realTitle: PropTypes.string,
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

export default withStyles(viewPublicationDialogStyle)(ViewPublicationDialog);
