import React from "react";
import PropTypes from "prop-types";

import withStyles from "@material-ui/core/styles/withStyles";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

import CustomInput from "components/CustomInput/CustomInput.jsx";

import Button from "components/CustomButtons/Button.jsx";

import extendedFormsStyle from "assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.jsx";

const ViewPublicationDialog = props => {
  return (
    <Dialog open={props.open} styles={{ overflow: "visible" }}>
      <DialogTitle>Publicación</DialogTitle>
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
          <GridItem xs={12}>
            <img src="{props.publication.image}" />
          </GridItem>
        </GridContainer>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
};

ViewPublicationDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  publication: PropTypes.shape({
    date: PropTypes.string,
    time: PropTypes.string,
    socialNetworks: PropTypes.array,
    message: PropTypes.string,
    image: PropTypes.string
  }).isRequired,
  onClose: PropTypes.func,
  socialNetworks: PropTypes.array.isRequired
};

export default withStyles(extendedFormsStyle)(ViewPublicationDialog);
