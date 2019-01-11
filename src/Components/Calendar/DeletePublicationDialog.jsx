import React from "react";
import PropTypes from "prop-types";

import withStyles from "@material-ui/core/styles/withStyles";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

import GridContainer from "Components/Grid/GridContainer.jsx";
import GridItem from "Components/Grid/GridItem.jsx";

import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import CustomInput from "Components/CustomInput/CustomInput.jsx";

import Button from "Components/CustomButtons/Button.jsx";

import extendedFormsStyle from "assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.jsx";

const DeletePublicationDialog = props => {
  const { classes } = props;
  return (
    <Dialog open={props.open} styles={{ overflow: "visible" }}>
      <DialogTitle>Eliminar Publicación</DialogTitle>
      <DialogContent>
        <GridContainer>
          <GridItem xs={6}>

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
  classes: PropTypes.object,
  open: PropTypes.bool.isRequired,
  publication: PropTypes.shape({
    date: PropTypes.string,
    time: PropTypes.string,
    title: PropTypes.string,
    socialNetworks: PropTypes.array,
    message: PropTypes.string,
    additional: PropTypes.string,
    image: PropTypes.string
  }).isRequired,
  errors: PropTypes.shape({
    date: PropTypes.bool.isRequired,
    time: PropTypes.bool.isRequired,
    title: PropTypes.bool.isRequired,
    socialNetworks: PropTypes.bool.isRequired,
    message: PropTypes.bool.isRequired,
    additional: PropTypes.bool.isRequired,
    image: PropTypes.bool.isRequired
  }).isRequired,
  onChange: PropTypes.func,
  onCancel: PropTypes.func,
  onAccept: PropTypes.func,
  buttonsDisabled: PropTypes.bool.isRequired,
  socialNetworks: PropTypes.array.isRequired
};

export default withStyles(extendedFormsStyle)(DeletePublicationDialog);
