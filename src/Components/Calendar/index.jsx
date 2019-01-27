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

import withErrors from "Components/withErrors";

const localizer = BigCalendar.momentLocalizer(moment);

const messages = {
  today: "Ahora",
  previous: "<",
  next: ">",
  month: "Mes",
  week: "Sem.",
  day: "Día",
  date: "Fecha",
  time: "Hora",
  event: "Evento",
  agenda: "Agenda",
  noEventsInRange: "No hay eventos en este periodo"
};

const getEventColor = status => {
  switch (status) {
    case "REJECTED":
      return "red";
    case "ACCEPTED":
      return "green";
    default:
      return "azure";
  }
};

const mapPublicationToEvent = publication => {
  const [year, month, day] = publication.date.split("-");
  const [hour, minute] = publication.time.split(":");
  const date = new Date(year, month - 1, day, hour, minute);

  const color = getEventColor(publication.status);

  const title = (
    <div>
      <div>
        {publication.social_networks.map((socialNetwork, key) => {
          return (
            <span key={key}>
              &nbsp;
              <i className={`fab fa-${socialNetwork.toLowerCase()}`} />
            </span>
          );
        })}
      </div>
      {publication.title}
    </div>
  );

  return {
    id: publication.id,
    title: title,
    realTitle: publication.title,
    date: publication.date,
    time: publication.time,
    message: publication.message,
    image: publication.image_url,
    socialNetworks: publication.social_networks,
    status: publication.status,
    start: date,
    end: date,
    color: color,
    link: publication.link,
    tags: publication.tags,
    companyIdentifier: publication.company_identifier,
    companyName: publication.company_name,
    category: publication.category,
    subcategory: publication.subcategory
  };
};

const mapPublicationsToEvents = publications => {
  return publications.map(publication => mapPublicationToEvent(publication));
};

const Calendar = props => {
  const events = mapPublicationsToEvents(props.publications);

  return (
    <GridContainer justify="center">
      <GridItem xs={12}>
        <Card>
          <CardBody calendar>
            <BigCalendar
              messages={messages}
              selectable
              localizer={localizer}
              events={events}
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
  );
};

Calendar.propTypes = {
  onSelectEvent: PropTypes.func.isRequired,
  onSelectSlot: PropTypes.func.isRequired,
  eventColors: PropTypes.func.isRequired,
  publications: PropTypes.array.isRequired
};

export default withErrors(withStyles(buttonStyle)(Calendar));
