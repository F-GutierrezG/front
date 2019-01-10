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

const ViewPublicationDialog = props => {
  const { classes } = props;
  return (
    <Dialog open={props.open} styles={{ overflow: "visible" }}>
      <DialogTitle>Publicación</DialogTitle>
      <DialogContent>
        <GridContainer>
          {!props.rejecting && (
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
          )}
          {!props.rejecting && (
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
          )}
          {!props.rejecting && (
            <div>
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
            </div>
          )}
          {props.rejecting && (
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
          )}
        </GridContainer>
      </DialogContent>
      <DialogActions>
        {!props.rejecting && (
          <div>
            <Button onClick={props.onClose}>Cerrar</Button>
            <Button onClick={props.onReject} color="danger">
              Rechazar
            </Button>
            <Button onClick={props.onAccept} color="success">
              Aceptar
            </Button>
          </div>
        )}
        {props.rejecting && (
          <div>
            <Button onClick={props.onCancelReject}>Cancelar</Button>
            <Button onClick={props.onAcceptReject} color="danger">
              Rechazar
            </Button>
          </div>
        )}
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
