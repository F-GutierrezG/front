import React from "react";

import axios from "axios";

import CalendarWithErrors from "Components/Calendar";

const socialNetworks = [
  { id: "FACEBOOK", name: "Facebook" },
  { id: "INSTAGRAM", name: "Instagram" },
  { id: "LINKEDIN", name: "LinkedIn" },
  { id: "TWITTER", name: "Twitter" },
  { id: "YOUTUBE", name: "YouTube" },
  { id: "PINTEREST", name: "Pinterest" },
  { id: "GOOGLE", name: "Google+" }
];

class Calendar extends React.Component {
  state = {
    hasError: false,
    error: "",
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
    events: [],
    publicationButtonsDisabled: false,
    rejecting: false,
    rejectReason: ""
  };

  closeError = () => {
    this.setState({
      hasError: false
    });
  };

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
    publication.socialNetworks = event.socialNetworks;
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

  eventColors = event => {
    var backgroundColor = "event-";
    event.color
      ? (backgroundColor = backgroundColor + event.color)
      : (backgroundColor = backgroundColor + "default");
    return {
      className: backgroundColor
    };
  };

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

  handleOnAcceptCreate = () => {
    const publication = this.state.publication;
    if (this.validatePublication(publication)) {
      this.setState({
        publicationButtonsDisabled: true
      });
      this.createPublication(publication);
    }
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
    this.setState({ rejecting: true });
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
        this.setState({
          hasError: true,
          error: err
        });
      });
  };

  handleOnCancelReject = () => {
    this.setState({
      rejecting: false,
      rejectReason: ""
    });
  };

  handleOnAcceptReject = () => {
    const token = localStorage.getItem("token");

    axios
      .put(
        `${process.env.REACT_APP_SOCIAL_SERVICE_URL}/publications/${
          this.state.selectedPublication.id
        }/reject`,
        {
          message: this.state.rejectReason
        },
        {
          headers: {
            Authorization: "Bearer " + token
          }
        }
      )
      .then(() => {
        this.setState({
          events: this.updateEvents("REJECTED"),
          openViewPublication: false,
          rejecting: false,
          rejectReason: "",
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
        this.setState({
          hasError: true,
          error: err
        });
      });
  };

  handleChangeRejectReason = event => {
    this.setState({ rejectReason: event.target.value });
  };

  render() {
    return (
      <CalendarWithErrors
        hasError={this.state.hasError}
        error={this.state.error}
        closeError={this.closeError}
        openCreatePublication={this.state.openCreatePublication}
        createPublication={this.state.publication}
        createPublicationErrors={this.state.publicationErrors}
        socialNetworks={socialNetworks}
        onChangeCreate={this.handleChangeValue}
        onCancelCreate={this.handleOnCancel}
        onAcceptCreate={this.handleOnAcceptCreate}
        buttonsDisabled={this.state.publicationButtonsDisabled}
        openViewPublication={this.state.openViewPublication}
        selectedPublication={this.state.selectedPublication}
        onCloseViewPublication={this.handleOnClose}
        onRejectViewPublication={this.handleOnReject}
        onAcceptViewPublication={this.handleOnAccept}
        onCancelRejectViewPublication={this.handleOnCancelReject}
        onAcceptRejectViewPublication={this.handleOnAcceptReject}
        onSelectEvent={this.selectedEvent}
        onSelectSlot={this.addNewPublication}
        events={this.state.events}
        eventColors={this.eventColors}
        rejecting={this.state.rejecting}
        onChangeReject={this.handleChangeRejectReason}
        rejectReason={this.state.rejectReason}
      />
    );
  }
}

export default Calendar;
