import React from "react";
import PropTypes from "prop-types";
// react component used to create a calendar with events on it
import BigCalendar from "react-big-calendar";
// dependency plugin for react-big-calendar
import moment from "moment";
import "moment/locale/es";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import CloudDownloadOutlined from "@material-ui/icons/CloudDownloadOutlined";
import GridContainer from "Components/Grid/GridContainer.jsx";
import GridItem from "Components/Grid/GridItem.jsx";
import Card from "Components/Card/Card.jsx";
import CardBody from "Components/Card/CardBody.jsx";

import buttonStyle from "assets/jss/material-dashboard-pro-react/components/buttonStyle.jsx";

import LinkPublicationDialog from "./LinkPublicationDialog";
import ViewPublicationDialog from "./ViewPublicationDialog";
import CreatePublicationDialog from "./CreatePublicationDialog";
import EditPublicationDialog from "./EditPublicationDialog";
import RejectPublicationDialog from "./RejectPublicationDialog";
import DeletePublicationDialog from "./DeletePublicationDialog";

import withErrors from "Components/withErrors";

const localizer = BigCalendar.momentLocalizer(moment);

const messages = {
  today: "Hoy",
  previous: "<",
  next: ">",
  month: "Mes",
  week: "Sem.",
  day: "Día",
  date: "Fecha",
  time: "Hora",
  event: "Evento",
  agenda: "Agenda"
};

const Calendar = props => {
  return (
    <div>
      <LinkPublicationDialog
        open={props.openLinkPublication}
        link={props.link}
        errors={props.linkPublicationErrors}
        onChange={props.onChangeLink}
        buttonsDisabled={props.buttonsDisabled}
        onCancel={props.onCancelLink}
        onAccept={props.onAcceptLink}
      />
      <CreatePublicationDialog
        open={props.openCreatePublication}
        publication={props.createPublication}
        tag={props.tag}
        errors={props.createPublicationErrors}
        socialNetworks={props.socialNetworks}
        onChange={props.onChangeCreate}
        onChangeTag={props.onChangeTag}
        onTagKeyPress={props.onTagKeyPress}
        onCancel={props.onCancelCreate}
        onAccept={props.onAcceptCreate}
        buttonsDisabled={props.buttonsDisabled}
        onDeleteTag={props.onDeleteTag}
      />
      <ViewPublicationDialog
        open={props.openViewPublication}
        publication={props.selectedPublication}
        socialNetworks={props.socialNetworks}
        onClose={props.onCloseViewPublication}
        onReject={props.onRejectViewPublication}
        onAccept={props.onAcceptViewPublication}
        onCancelReject={props.onCancelRejectViewPublication}
        onAcceptReject={props.onAcceptRejectViewPublication}
        rejecting={props.rejecting}
        onChangeReject={props.onChangeReject}
        rejectReason={props.rejectReason}
        onLink={props.onLinkPublication}
        onEdit={props.onEditPublication}
        onDelete={props.onDeletePublication}
      />
      <EditPublicationDialog
        open={props.openEditPublication}
        publication={props.selectedPublication}
        errors={props.editPublicationErrors}
        socialNetworks={props.socialNetworks}
        onCancel={props.onCancelEdit}
        onAccept={props.onAcceptEdit}
        buttonsDisabled={props.buttonsDisabled}
        onChange={props.onChangeEdit}
        onChangeTag={props.onChangeTag}
        onTagKeyPress={props.onEditTagKeyPress}
        tag={props.tag}
        onDeleteTag={props.onEditDeleteTag}
      />
      <DeletePublicationDialog
        open={props.openDeletePublication}
        onCancel={props.onCancelDelete}
        onAccept={props.onAcceptDelete}
        buttonsDisabled={props.buttonsDisabled}
      />
      <RejectPublicationDialog
        open={props.rejecting}
        onCancelReject={props.onCancelRejectViewPublication}
        onAcceptReject={props.onAcceptRejectViewPublication}
        onChangeReject={props.onChangeReject}
        rejectReason={props.rejectReason}
        buttonsDisabled={props.buttonsDisabled}
      />
      <div style={{ "text-align": "right" }}>
        <Tooltip title="Descargar">
          <IconButton>
            <CloudDownloadOutlined style={{ color: "#26c6da" }} />
          </IconButton>
        </Tooltip>
      </div>
      <GridContainer justify="center">
        <GridItem xs={12}>
          <Card>
            <CardBody calendar>
              <BigCalendar
                messages={messages}
                selectable
                localizer={localizer}
                events={props.events}
                defaultView="month"
                scrollToTime={new Date(1970, 1, 1, 6)}
                defaultDate={new Date()}
                onSelectEvent={event => props.onSelectEvent(event)}
                onSelectSlot={slotInfo => props.onSelectSlot(slotInfo)}
                eventPropGetter={props.eventColors}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
};

Calendar.propTypes = {
  openLinkPublication: PropTypes.bool.isRequired,
  openCreatePublication: PropTypes.bool.isRequired,
  openEditPublication: PropTypes.bool.isRequired,
  openDeletePublication: PropTypes.bool.isRequired,
  createPublication: PropTypes.object.isRequired,
  createPublicationErrors: PropTypes.object.isRequired,
  socialNetworks: PropTypes.array.isRequired,
  onChangeCreate: PropTypes.func.isRequired,
  onCancelCreate: PropTypes.func.isRequired,
  onAcceptCreate: PropTypes.func.isRequired,
  buttonsDisabled: PropTypes.bool.isRequired,
  openViewPublication: PropTypes.bool.isRequired,
  selectedPublication: PropTypes.object.isRequired,
  onCloseViewPublication: PropTypes.func.isRequired,
  onRejectViewPublication: PropTypes.func.isRequired,
  onAcceptViewPublication: PropTypes.func.isRequired,
  onLinkPublication: PropTypes.func.isRequired,
  onEditPublication: PropTypes.func.isRequired,
  onDeletePublication: PropTypes.func.isRequired,
  onCancelRejectViewPublication: PropTypes.func.isRequired,
  onAcceptRejectViewPublication: PropTypes.func.isRequired,
  events: PropTypes.array.isRequired,
  onSelectEvent: PropTypes.func.isRequired,
  onSelectSlot: PropTypes.func.isRequired,
  eventColors: PropTypes.func.isRequired,
  rejecting: PropTypes.bool.isRequired,
  onChangeReject: PropTypes.func.isRequired,
  rejectReason: PropTypes.string.isRequired,
  onCancelDelete: PropTypes.func.isRequired,
  onAcceptDelete: PropTypes.func.isRequired,
  editPublicationErrors: PropTypes.object.isRequired,
  linkPublicationErrors: PropTypes.object.isRequired,
  onCancelEdit: PropTypes.func.isRequired,
  onAcceptEdit: PropTypes.func.isRequired,
  onChangeEdit: PropTypes.func.isRequired,
  onChangeLink: PropTypes.func.isRequired,
  link: PropTypes.string,
  onCancelLink: PropTypes.func.isRequired,
  onAcceptLink: PropTypes.func.isRequired,
  onChangeTag: PropTypes.func.isRequired,
  onTagKeyPress: PropTypes.func.isRequired,
  onEditTagKeyPress: PropTypes.func.isRequired,
  tag: PropTypes.string.isRequired,
  onDeleteTag: PropTypes.func.isRequired,
  onEditDeleteTag: PropTypes.func.isRequired
};

export default withErrors(withStyles(buttonStyle)(Calendar));
