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
  const { classes } = props;
  return (
    <Dialog open={props.open} styles={{ overflow: "visible" }}>
      <DialogTitle>Repetir Publicación</DialogTitle>
      <DialogContent>
        <GridContainer>
          <GridItem xs={12}>
            <FormControl fullWidth error={props.errors.periodicity}>
              <InputLabel>Periodicidad</InputLabel>
              <Select
                value={props.clone.periodicity}
                onChange={event => props.onChange("periodicity", event)}
                MenuProps={{ className: classes.selectMenu }}
                classes={{ select: classes.select }}
              >
                <MenuItem disabled>Periodicidad</MenuItem>
                {props.periodicities.map(periodicity => {
                  return (
                    <MenuItem key={periodicity.id} value={periodicity.id}>
                      {periodicity.name}
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
                value={props.clone.duration}
                onChange={event => props.onChange("duration", event)}
                MenuProps={{ className: classes.selectMenu }}
                classes={{ select: classes.select }}
              >
                <MenuItem disabled>Duración</MenuItem>
                {props.durations.map(duration => {
                  return (
                    <MenuItem key={duration.id} value={duration.id}>
                      {duration.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </GridItem>
          {props.clone.duration === "REPETITIONS" && (
            <GridItem xs={12}>
              <CustomInput
                labelText="Repeticiones"
                error={props.errors.repetitions}
                formControlProps={{
                  fullWidth: true,
                  margin: "dense"
                }}
                inputProps={{
                  type: "number",
                  step: 1,
                  min: 0,
                  value: props.clone.repetitions,
                  onChange: event => props.onChange("repetitions", event)
                }}
              />
            </GridItem>
          )}
          {props.clone.duration === "UNTIL" && (
            <GridItem xs={12}>
              <CustomInput
                labelText="Hasta"
                error={props.errors.until}
                formControlProps={{
                  fullWidth: true,
                  margin: "dense"
                }}
                labelProps={{
                  shrink: true
                }}
                inputProps={{
                  type: "date",
                  value: props.clone.until,
                  onChange: event => props.onChange("until", event)
                }}
              />
            </GridItem>
          )}
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
          Repetir
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ClonePublicationDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
  onAccept: PropTypes.func,
  buttonsDisabled: PropTypes.bool.isRequired,
  clone: PropTypes.shape({
    periodicity: PropTypes.string,
    duration: PropTypes.string,
    repetitions: PropTypes.string,
    until: PropTypes.string
  }).isRequired,
  errors: PropTypes.shape({
    periodicity: PropTypes.bool.isRequired,
    duration: PropTypes.bool.isRequired,
    repetitions: PropTypes.bool.isRequired,
    until: PropTypes.bool.isRequired
  }).isRequired,
  periodicities: PropTypes.array.isRequired,
  durations: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(extendedFormsStyle)(ClonePublicationDialog);
