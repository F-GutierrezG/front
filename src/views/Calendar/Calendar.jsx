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
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";

import buttonStyle from "assets/jss/material-dashboard-pro-react/components/buttonStyle.jsx";

import CreatePublicationDialog from "./CreatePublicationDialog";
import ViewPublicationDialog from "./ViewPublicationDialog";

import withErrors from "components/withErrors";

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
      />
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={10}>
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
