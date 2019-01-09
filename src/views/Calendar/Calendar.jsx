import React from "react";
// react component used to create a calendar with events on it
import BigCalendar from "react-big-calendar";
// dependency plugin for react-big-calendar
import axios from "axios";
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

import RequireAuth from "components/RequireAuth";

import CreatePublicationDialog from "./CreatePublicationDialog";
import ViewPublicationDialog from "./ViewPublicationDialog";

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
      openCreatePublication: false,
      openViewPublication: false,
      publication: {
        date: "",
        time: "",
        title: "",
        socialNetworks: [],
        message: "",
        additional: "",
        image: "",
        file: ""
      },
      selectedPublication: {
        id: 0,
        date: "",
        time: "",
        title: "",
        socialNetworks: [],
        message: "",
        additional: "",
        image: ""
      },
      publicationErrors: {
        date: false,
        time: false,
        title: false,
        socialNetworks: false,
        message: false,
        additional: false,
        image: false
      },
      socialNetworks: [
        {
          id: "FACEBOOK",
          name: "Facebook"
        },
        {
          id: "INSTAGRAM",
          name: "Instagram"
        },
        {
          id: "LINKEDIN",
          name: "LinkedIn"
        },
        {
          id: "TWITTER",
          name: "Twitter"
        },
        {
          id: "YOUTUBE",
          name: "YouTube"
        },
        {
          id: "PINTEREST",
          name: "Pinterest"
        },
        {
          id: "GOOGLEPLUS",
          name: "Google+"
        }
      ],
      events: [],
      publicationButtonsDisabled: false
    };
  }

  componentDidMount() {
    const token = localStorage.getItem("token");
    axios
      .get(`${process.env.REACT_APP_SOCIAL_SERVICE_URL}/publications`, {
        headers: { Authorization: "Bearer " + token }
      })
      .then(publications => {
        this.setState({
          events: publications.data.map(publication =>
            this.mapToEvent(publication)
          )
        });
      });
  }

  mapToPublication = event => {
    const publication = { ...event };
    publication.socialNetworks = event.social_networks;
    return publication;
  };

  selectedEvent = event => {
    this.setState({
      openViewPublication: true,
      selectedPublication: this.mapToPublication(event)
    });
  };

  addNewPublication = event => {
    const publication = { ...this.state.publication };
    const date = event.slots[0];
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    publication.date = `${year}-${month}-${day}`;
    this.setState({
      openCreatePublication: true,
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
    const files = event.target.files;
    const publication = { ...this.state.publication };
    if (files) {
      publication["file"] = event.target.files[0];
    }
    publication[field] = event.target.value;
    this.setState({ publication });
  };

  handleOnCancel = () => {
    this.setState({
      openCreatePublication: false,
      publication: {
        date: "",
        time: "",
        title: "",
        socialNetworks: [],
        message: "",
        additional: "",
        image: []
      },
      publicationErrors: {
        date: false,
        time: false,
        title: false,
        socialNetworks: false,
        message: false,
        additional: false,
        image: false
      }
    });
  };

  validatePublication = publication => {
    const errors = { ...this.state.publicationErrors };
    errors.date = publication.date.trim() === "";
    errors.time = publication.time.trim() === "";
    errors.title = publication.title.trim() === "";
    errors.socialNetworks = publication.socialNetworks.length === 0;
    errors.message = publication.message.trim() === "";
    errors.image = publication.image === "";

    this.setState({ publicationErrors: errors });

    return !(
      errors.date ||
      errors.time ||
      errors.title ||
      errors.socialNetworks ||
      errors.message ||
      errors.image
    );
  };

  getEventColor = status => {
    switch (status) {
      case "REJECTED":
        return "red";
      case "ACCEPTED":
        return "green";
      default:
        return "azure";
    }
  };

  mapToEvent = publication => {
    const [year, month, day] = publication.date.split("-");
    const [hour, minute] = publication.time.split(":");
    const date = new Date(year, month - 1, day, hour, minute);

    const color = this.getEventColor(publication.status);

    return {
      id: publication.id,
      title: publication.title,
      date: publication.date,
      time: publication.time,
      message: publication.message,
      image: publication.image_url,
      social_networks: publication.social_networks,
      start: date,
      end: date,
      color: color
    };
  };

  createPublication = publication => {
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("date", publication.date);
    formData.append("time", publication.time);
    formData.append("title", publication.title);
    formData.append("social_networks", publication.socialNetworks);
    formData.append("message", publication.message);
    formData.append("additional", publication.additional);
    formData.append("image", publication.file);

    axios
      .post(
        `${process.env.REACT_APP_SOCIAL_SERVICE_URL}/publications`,
        formData,
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "multipart/form-data"
          }
        }
      )
      .then(response => {
        const event = this.mapToEvent(response.data);
        this.setState({
          events: [...this.state.events, event],
          openCreatePublication: false,
          publication: {
            date: "",
            time: "",
            title: "",
            socialNetworks: [],
            message: "",
            additional: "",
            image: []
          },
          publicationButtonsDisabled: false
        });
      })
      .catch(() => {
        this.setState({
          publicationButtonsDisabled: false
        });
      });
  };

  handleOnAccept = () => {
    const publication = this.state.publication;
    if (this.validatePublication(publication)) {
      this.setState({
        publicationButtonsDisabled: true
      });
      this.createPublication(publication);
    }
  };

  handleOnDropImage = image => {
    const publication = { ...this.state.publication };
    const publicationErrors = { ...this.state.publicationErrors };
    publication.image = image;
    publicationErrors.image = false;
    this.setState({ publication, publicationErrors });
  };

  handleOnClose = () => {
    this.setState({
      openViewPublication: false
    });
  };

  updateEvents = status => {
    const updatedEvent = {
      ...this.state.events.find(event => {
        return event.id === this.state.selectedPublication.id;
      })
    };

    updatedEvent.color = this.getEventColor(status);

    return this.state.events.map(event => {
      if (event.id === this.state.selectedPublication.id) {
        return updatedEvent;
      } else {
        return event;
      }
    });
  };

  handleOnReject = () => {
    const token = localStorage.getItem("token");

    axios
      .put(
        `${process.env.REACT_APP_SOCIAL_SERVICE_URL}/publications/${
          this.state.selectedPublication.id
        }/reject`,
        {},
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "multipart/form-data"
          }
        }
      )
      .then(() => {
        this.setState({
          events: this.updateEvents("REJECTED"),
          openViewPublication: false,
          selectedPublication: {
            id: 0,
            date: "",
            time: "",
            title: "",
            socialNetworks: [],
            message: "",
            additional: "",
            image: ""
          }
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleOnAccept = () => {
    const token = localStorage.getItem("token");

    axios
      .put(
        `${process.env.REACT_APP_SOCIAL_SERVICE_URL}/publications/${
          this.state.selectedPublication.id
        }/accept`,
        {},
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "multipart/form-data"
          }
        }
      )
      .then(() => {
        this.setState({
          events: this.updateEvents("ACCEPTED"),
          openViewPublication: false,
          selectedPublication: {
            id: 0,
            date: "",
            time: "",
            title: "",
            socialNetworks: [],
            message: "",
            additional: "",
            image: ""
          }
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        <CreatePublicationDialog
          open={this.state.openCreatePublication}
          publication={this.state.publication}
          errors={this.state.publicationErrors}
          socialNetworks={this.state.socialNetworks}
          onChange={this.handleChangeValue}
          onCancel={this.handleOnCancel}
          onAccept={this.handleOnAccept}
          buttonsDisabled={this.state.publicationButtonsDisabled}
        />
        <ViewPublicationDialog
          open={this.state.openViewPublication}
          publication={this.state.selectedPublication}
          socialNetworks={this.state.socialNetworks}
          onClose={this.handleOnClose}
          onReject={this.handleOnReject}
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

export default RequireAuth(withStyles(buttonStyle)(Calendar));
