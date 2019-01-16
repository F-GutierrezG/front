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

import extendedFormsStyle from "assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.jsx";

const LinkPublicationDialog = props => {
  return (
    <Dialog open={props.open} styles={{ overflow: "visible" }}>
      <DialogTitle>Enlazar Publicación</DialogTitle>
      <DialogContent>
        <GridContainer>
          <GridItem xs={12}>
            <CustomInput
              labelText="Publicación"
              error={props.errors.link}
              formControlProps={{
                fullWidth: true,
                margin: "dense"
              }}
              inputProps={{
                type: "text",
                value: props.link,
                onChange: event => props.onChange(event)
              }}
            />
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
          color="primary"
        >
          Enlazar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

LinkPublicationDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onChange: PropTypes.func,
  onCancel: PropTypes.func,
  onAccept: PropTypes.func,
  buttonsDisabled: PropTypes.bool.isRequired,
  link: PropTypes.string,
  errors: PropTypes.shape({
    link: PropTypes.bool.isRequired
  }).isRequired
};

export default withStyles(extendedFormsStyle)(LinkPublicationDialog);
