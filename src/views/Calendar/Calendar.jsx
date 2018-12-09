import React from "react";
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

import AddEventDialog from "./AddEventDialog";

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

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      publication: {
        date: "",
        time: "",
        socialNetworks: [],
        message: ""
      },
      socialNetworks: [],
      events: []
    };
  }
  selectedEvent(event) {
    alert(event.title);
  }
  addNewPublication = event => {
    const publication = { ...this.state.publication };
    const date = event.slots[0];
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    publication.date = `${year}-${month}-${day}`;
    this.setState({
      open: true,
      publication
    });
  };

  eventColors(event, start, end, isSelected) {
    var backgroundColor = "event-";
    event.color
      ? (backgroundColor = backgroundColor + event.color)
      : (backgroundColor = backgroundColor + "default");
    return {
      className: backgroundColor
    };
  }

  handleChangeValue = (field, event) => {
    const publication = { ...this.state.publication };
    publication[field] = event.target.value;
    this.setState({ publication });
  };

  handleOnCancel = () => {
    this.setState({ open: false });
  };

  handleOnAccept = () => {
    const [year, month, day] = this.state.publication.date.split("-");
    const [hour, minute] = this.state.publication.time.split(":");
    const date = new Date(year, month - 1, day, hour, minute);
    const event = {
      title: this.state.publication.message,
      start: date,
      end: date,
      color: "azure"
    };
    this.setState({
      events: [...this.state.events, event],
      open: false
    });
  };

  render() {
    return (
      <div>
        <AddEventDialog
          open={this.state.open}
          publication={this.state.publication}
          socialNetworks={this.state.socialNetworks}
          onChange={this.handleChangeValue}
          onCancel={this.handleOnCancel}
          onAccept={this.handleOnAccept}
        />
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={10}>
            <Card>
              <CardBody calendar>
                <BigCalendar
                  messages={messages}
                  selectable
                  localizer={localizer}
                  events={this.state.events}
                  defaultView="month"
                  scrollToTime={new Date(1970, 1, 1, 6)}
                  defaultDate={new Date()}
                  onSelectEvent={event => this.selectedEvent(event)}
                  onSelectSlot={slotInfo => this.addNewPublication(slotInfo)}
                  eventPropGetter={this.eventColors}
                />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default withStyles(buttonStyle)(Calendar);
