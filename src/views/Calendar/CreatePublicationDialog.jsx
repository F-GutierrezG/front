import React from "react";
import PropTypes from "prop-types";

import withStyles from "@material-ui/core/styles/withStyles";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import CustomInput from "components/CustomInput/CustomInput.jsx";

import Button from "components/CustomButtons/Button.jsx";

import extendedFormsStyle from "assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.jsx";

const AddEventDialog = props => {
  const { classes } = props;
  return (
    <Dialog open={props.open} styles={{ overflow: "visible" }}>
      <DialogTitle>Crear Publicación</DialogTitle>
      <DialogContent>
        <GridContainer>
          <GridItem xs={6}>
            <CustomInput
              labelText="Fecha"
              error={props.errors.date}
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
                onChange: event => props.onChange("date", event)
              }}
            />
          </GridItem>
          <GridItem xs={6}>
            <CustomInput
              labelText="Hora"
              error={props.errors.time}
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
                onChange: event => props.onChange("time", event)
              }}
            />
          </GridItem>
          <GridItem xs={12}>
            <CustomInput
              labelText="Título"
              error={props.errors.title}
              formControlProps={{
                fullWidth: true,
                margin: "dense"
              }}
              inputProps={{
                type: "title",
                value: props.publication.title,
                onChange: event => props.onChange("title", event)
              }}
            />
          </GridItem>
          <GridItem xs={12}>
            <FormControl fullWidth error={props.errors.socialNetworks}>
              <InputLabel
                htmlFor="multiple-select"
                className={classes.selectLabel}
              >
                Redes Sociales
              </InputLabel>
              <Select
                multiple
                value={props.publication.socialNetworks}
                onChange={event => props.onChange("socialNetworks", event)}
                MenuProps={{ className: classes.selectMenu }}
                classes={{ select: classes.select }}
              >
                <MenuItem disabled classes={{ root: classes.selectMenuItem }}>
                  Redes Sociales
                </MenuItem>
                {props.socialNetworks.map(socialNetwork => {
                  return (
                    <MenuItem
                      key={socialNetwork.id}
                      classes={{ root: classes.selectMenuItem }}
                      value={socialNetwork.id}
                    >
                      {socialNetwork.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </GridItem>
          <GridItem xs={12}>
            <CustomInput
              labelText="Mensaje"
              error={props.errors.message}
              formControlProps={{
                fullWidth: true,
                margin: "dense"
              }}
              inputProps={{
                multiline: true,
                value: props.publication.message,
                onChange: event => props.onChange("message", event)
              }}
            />
          </GridItem>
          <GridItem xs={12}>
            <CustomInput
              labelText="Información Adicional"
              error={props.errors.additional}
              formControlProps={{
                fullWidth: true,
                margin: "dense"
              }}
              inputProps={{
                multiline: true,
                value: props.publication.additional,
                onChange: event => props.onChange("additional", event)
              }}
            />
          </GridItem>
          <GridItem xs={12}>
            <CustomInput
              labelText="Archivo"
              error={props.errors.image}
              formControlProps={{
                fullWidth: true,
                margin: "dense"
              }}
              labelProps={{
                shrink: true
              }}
              inputProps={{
                type: "file",
                value: props.publication.image,
                onChange: event => props.onChange("image", event)
              }}
            />
          </GridItem>
        </GridContainer>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onCancel} disabled={props.buttonsDisabled}>Cancelar</Button>
        <Button
          onClick={props.onAccept}
          disabled={props.buttonsDisabled}
          color="success"
        >
          Crear
        </Button>
      </DialogActions>
    </Dialog>
  );
};

AddEventDialog.propTypes = {
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

export default withStyles(extendedFormsStyle)(AddEventDialog);
