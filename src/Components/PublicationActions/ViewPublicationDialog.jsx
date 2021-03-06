import React from "react";
import PropTypes from "prop-types";

import withStyles from "@material-ui/core/styles/withStyles";

import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Create from "@material-ui/icons/Create";
import Delete from "@material-ui/icons/Delete";
import CompareArrows from "@material-ui/icons/CompareArrows";
import AddToPhotosOutlined from "@material-ui/icons/AddToPhotosOutlined";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Chip from "@material-ui/core/Chip";

import GridContainer from "Components/Grid/GridContainer.jsx";
import GridItem from "Components/Grid/GridItem.jsx";

import CustomInput from "Components/CustomInput/CustomInput.jsx";

import Button from "Components/CustomButtons/Button.jsx";

import viewPublicationDialogStyle from "./jss/viewPublicationDialogStyle.jsx";

const ViewPublicationDialog = props => {
  const { classes } = props;
  const userData = JSON.parse(localStorage.getItem("user"));
  const editPermission = userData && userData.permissions.indexOf("EDIT_PUBLICATION") > -1;
  return (
    <Dialog
      open={props.open}
      styles={{ overflow: "visible" }}
      onClose={props.onClose}
    >
      <DialogTitle>
        Publicación
        <span
          style={{
            position: "absolute",
            right: "15px",
            color: "#9c27b0",
            cursor: "pointer"
          }}
        >
          {editPermission &&
            props.publication.status === "ACCEPTED" && (
              <span>
                <Tooltip title="Enlazar">
                  <IconButton arial-label="Enlazar">
                    <CompareArrows
                      style={{ color: "#9c27b0" }}
                      onClick={props.onLink}
                    />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Repetir Publicación">
                  <IconButton arial-label="Repetir Publicación">
                    <AddToPhotosOutlined
                      style={{ color: "green" }}
                      onClick={props.onClone}
                    />
                  </IconButton>
                </Tooltip>
              </span>
            )}
          {editPermission &&
            props.publication.status !== "ACCEPTED" && (
              <Tooltip title="Editar">
                <IconButton arial-label="Editar">
                  <Create style={{ color: "#9c27b0" }} onClick={props.onEdit} />
                </IconButton>
              </Tooltip>
            )}
          {editPermission &&
            props.publication.status === "PENDING" && (
              <Tooltip title="Eliminar">
                <IconButton arial-label="Eliminar">
                  <Delete
                    style={{ color: "#f44336" }}
                    onClick={props.onDelete}
                  />
                </IconButton>
              </Tooltip>
            )}
        </span>
      </DialogTitle>
      <DialogContent>
        <GridContainer>
          {userData &&
            userData.admin && (
              <GridItem xs={12}>
                <CustomInput
                  labelText="Empresa"
                  formControlProps={{
                    fullWidth: true,
                    margin: "dense"
                  }}
                  labelProps={{
                    shrink: true
                  }}
                  inputProps={{
                    type: "text",
                    value: `${props.publication.companyIdentifier} - ${
                      props.publication.companyName
                    }`,
                    disabled: true
                  }}
                />
              </GridItem>
            )}
          <GridItem xs={12}>
            <CustomInput
              labelText="Marca"
              formControlProps={{
                fullWidth: true,
                margin: "dense"
              }}
              labelProps={{
                shrink: true
              }}
              inputProps={{
                type: "text",
                value: `${
                  props.publication.brandName
                }`,
                disabled: true
              }}
            />
          </GridItem>
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
          {props.publication.rejectReason && (
            <GridItem xs={12}>
              <CustomInput
                labelText="Motivo de Rechazo"
                formControlProps={{
                  fullWidth: true,
                  margin: "dense"
                }}
                labelProps={{
                  shrink: true
                }}
                inputProps={{
                  type: "text",
                  value: props.publication.rejectReason,
                  disabled: true
                }}
              />
            </GridItem>
          )}
          <GridItem xs={6}>
            <CustomInput
              labelText="Categoría"
              formControlProps={{
                fullWidth: true,
                margin: "dense"
              }}
              labelProps={{
                shrink: true
              }}
              inputProps={{
                type: "text",
                value: props.publication.category,
                disabled: true
              }}
            />
          </GridItem>
          <GridItem xs={6}>
            <CustomInput
              labelText="Subcategoría"
              formControlProps={{
                fullWidth: true,
                margin: "dense"
              }}
              labelProps={{
                shrink: true
              }}
              inputProps={{
                type: "text",
                value: props.publication.subcategory,
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
                value: props.publication.title,
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
              href={props.publication.imageUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                style={{ width: "400px" }}
                alt={props.publication.imageUrl}
                src={props.publication.imageUrl}
              />
            </a>
          </GridItem>
          <GridItem xs={12}>
            {props.publication.tags.map((tag, key) => (
              <Chip key={key} label={tag} />
            ))}
          </GridItem>
        </GridContainer>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose}>Cerrar</Button>
        {editPermission &&
          props.publication.status === "PENDING" && (
            <Button
              onClick={props.onReject}
              color="danger"
              disabled={props.buttonsDisabled}
            >
              Rechazar
            </Button>
          )}
        {editPermission &&
          props.publication.status === "PENDING" && (
            <Button
              onClick={props.onAccept}
              color="success"
              disabled={props.buttonsDisabled}
            >
              Aceptar
            </Button>
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
    image: PropTypes.string,
    imageUrl: PropTypes.string,
    status: PropTypes.string,
    tags: PropTypes.array.isRequired,
    companyIdentifier: PropTypes.string,
    companyName: PropTypes.string,
    brandName: PropTypes.string,
    category: PropTypes.string,
    subcategory: PropTypes.string
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  onReject: PropTypes.func,
  onAccept: PropTypes.func,
  onCancelReject: PropTypes.func,
  onAcceptReject: PropTypes.func,
  socialNetworks: PropTypes.array.isRequired,
  rejecting: PropTypes.bool.isRequired,
  onChangeReject: PropTypes.func.isRequired,
  rejectReason: PropTypes.string.isRequired,
  onLink: PropTypes.func.isRequired,
  onClone: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  buttonsDisabled: PropTypes.bool
};

export default withStyles(viewPublicationDialogStyle)(ViewPublicationDialog);
