import React from "react";
import PropTypes from "prop-types";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

import Button from "Components/CustomButtons/Button.jsx";

import CustomInput from "Components/CustomInput/CustomInput.jsx";

import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

const EditCompanyDialog = props => (
  <Dialog open={props.open} onClose={props.onCancel}>
    <DialogTitle>Editar Empresa</DialogTitle>
    <DialogContent>
      <CustomInput
        labelText="RUT"
        formControlProps={{
          fullWidth: true,
          margin: "dense"
        }}
        error={props.errors.identifier}
        inputProps={{
          type: "text",
          disabled: true,
          onChange: evt => props.handleOnChange("identifier", evt),
          value: props.company.identifier
        }}
      />

      <CustomInput
        labelText="Razón Social"
        formControlProps={{
          fullWidth: true,
          margin: "dense"
        }}
        error={props.errors.name}
        inputProps={{
          type: "text",
          onChange: evt => props.handleOnChange("name", evt),
          value: props.company.name
        }}
      />
      <FormControl fullWidth error={props.errors.classification}>
        <InputLabel
          htmlFor="multiple-select"
          //className={classes.selectLabel}
        >
          Giros
        </InputLabel>
        <Select
          value={props.company.classificationId}
          onChange={event => props.handleOnChange("classificationId", event)}
          //MenuProps={{ className: classes.selectMenu }}
          //classes={{ select: classes.select }}
          inputProps={{
            name: "multipleSelect",
            id: "multiple-select"
          }}
        >
          <MenuItem disabled /*classes={{ root: classes.selectMenuItem }}*/>
            Giros
          </MenuItem>
          {props.classifications.map(classification => {
            return (
              <MenuItem
                key={classification.id}
                //classes={{ root: classes.selectMenuItem }}
                value={classification.id}
              >
                {classification.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>

      <FormControl fullWidth error={props.errors.plan}>
        <InputLabel
          htmlFor="plan-select"
          //className={classes.selectLabel}
        >
          Plan
        </InputLabel>
        <Select
          value={props.company.planId}
          onChange={event => props.handleOnChange("planId", event)}
          //MenuProps={{ className: classes.selectMenu }}
          //classes={{ select: classes.select }}
          inputProps={{
            name: "planSelect",
            id: "plan-select"
          }}
        >
          <MenuItem disabled /*classes={{ root: classes.selectMenuItem }}*/>
            Plan
          </MenuItem>
          {props.plans.map(plan => {
            return (
              <MenuItem
                key={plan.id}
                //classes={{ root: classes.selectMenuItem }}
                value={plan.id}
              >
                {plan.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>

      <CustomInput
        labelText="Fecha de corte de servicio"
        formControlProps={{
          fullWidth: true,
          margin: "dense"
        }}
        labelProps={{
          shrink: true
        }}
        inputProps={{
          type: "date",
          onChange: evt => props.handleOnChange("expiration", evt),
          value: props.company.expiration
        }}
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={props.onCancel}>Cancelar</Button>
      <Button onClick={props.onAccept} color="primary">
        Editar
      </Button>
    </DialogActions>
  </Dialog>
);

EditCompanyDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  company: PropTypes.shape({
    identifier: PropTypes.string,
    name: PropTypes.string,
    classificationId: PropTypes.number,
    expiration: PropTypes.string
  }).isRequired,
  errors: PropTypes.shape({
    identifier: PropTypes.bool,
    name: PropTypes.bool,
    classification: PropTypes.bool,
    expiration: PropTypes.string
  }).isRequired,
  classifications: PropTypes.array.isRequired,
  handleOnChange: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onAccept: PropTypes.func.isRequired
};

export default EditCompanyDialog;
