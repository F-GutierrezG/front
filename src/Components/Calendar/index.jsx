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
import GridContainer from "Components/Grid/GridContainer.jsx";
import GridItem from "Components/Grid/GridItem.jsx";
import Card from "Components/Card/Card.jsx";
import CardBody from "Components/Card/CardBody.jsx";

import buttonStyle from "assets/jss/material-dashboard-pro-react/components/buttonStyle.jsx";

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
      <CreatePublicationDialog
        open={props.openCreatePublication}
        publication={props.createPublication}
        errors={props.createPublicationErrors}
        socialNetworks={props.socialNetworks}
        onChange={props.onChangeCreate}
        onCancel={props.onCancelCreate}
        onAccept={props.onAcceptCreate}
        buttonsDisabled={props.buttonsDisabled}
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
      />
      <DeletePublicationDialog
        open={props.openDeletePublication}
        onCancel={props.onCancelDelete}
        onAccept={props.onAcceptDelete}
      />
      <RejectPublicationDialog
        open={props.rejecting}
        onCancelReject={props.onCancelRejectViewPublication}
        onAcceptReject={props.onAcceptRejectViewPublication}
        onChangeReject={props.onChangeReject}
        rejectReason={props.rejectReason}
      />
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
  rejectReason: PropTypes.string.isRequired
};

export default withErrors(withStyles(buttonStyle)(Calendar));
