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

import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import Button from "Components/CustomButtons/Button.jsx";

import extendedFormsStyle from "assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.jsx";

const ClonePublicationDialog = props => {
  return (
    <Dialog open={props.open} styles={{ overflow: "visible" }}>
      <DialogTitle>Clonar Publicación</DialogTitle>
      <DialogContent>
        <GridContainer>
          <GridItem xs={12}>
            <FormControl fullWidth error={props.errors.type}>
              <InputLabel>Tipo</InputLabel>
              <Select
                value={props.clone}
                onChange={event => props.handleOnChange("classification", event)}
                //MenuProps={{ className: classes.selectMenu }}
                //classes={{ select: classes.select }}
              >
                <MenuItem disabled>Tipo</MenuItem>
                {props.types.map(type => {
                  return (
                    <MenuItem key={type.id} value={type.id}>
                      {type.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </GridItem>
          <GridItem xs={12}>
            <FormControl fullWidth error={props.errors.duration}>
              <InputLabel>Duración</InputLabel>
              <Select
                value={props.clone}
                onChange={event => props.handleOnChange("classification", event)}
                //MenuProps={{ className: classes.selectMenu }}
                //classes={{ select: classes.select }}
              >
                <MenuItem disabled>Tipo</MenuItem>
                {props.durations.map(type => {
                  return (
                    <MenuItem key={type.id} value={type.id}>
                      {type.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
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
          color="success"
        >
          Clonar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ClonePublicationDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onChange: PropTypes.func,
  onCancel: PropTypes.func,
  onAccept: PropTypes.func,
  buttonsDisabled: PropTypes.bool.isRequired,
  link: PropTypes.string,
  errors: PropTypes.shape({
    clone: PropTypes.bool.isRequired
  }).isRequired,
  types: PropTypes.array.isRequired
};

export default withStyles(extendedFormsStyle)(ClonePublicationDialog);
