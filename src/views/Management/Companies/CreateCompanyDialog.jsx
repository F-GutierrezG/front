import React from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

import Button from "components/CustomButtons/Button.jsx";

import CustomInput from "components/CustomInput/CustomInput.jsx";

import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

const CreateCompanyDialog = props => (
  <Dialog open={props.open} onClose={props.onClose}>
    <DialogTitle>Crear Empresa</DialogTitle>
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
          value={props.company.classification}
          onChange={event => props.handleOnChange("classification", event)}
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
    </DialogContent>
    <DialogActions>
      <Button onClick={props.onCancel}>Cancelar</Button>
      <Button onClick={props.onAccept} color="success">
        Crear
      </Button>
    </DialogActions>
  </Dialog>
)

export default CreateCompanyDialog;
