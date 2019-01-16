import React from "react";

import axios from "axios";

import CalendarWithErrors from "Components/Calendar";

import DownloadToolbar from "Components/DownloadToolbar";

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      publications: [],
      hasError: false,
      error: ""
    };
  }

  componentDidMount() {
    const token = localStorage.getItem("token");
    axios
      .get(`${process.env.REACT_APP_SOCIAL_SERVICE_URL}/publications`, {
        headers: { Authorization: "Bearer " + token }
      })
      .then(response => {
        this.setState({ publications: response.data });
      })
      .catch(err => {
        this.setState({
          hasError: true,
          error: err
        });
      });

    window.publicationActionsComponent.addOnAddPublicationListener(
      this.handleOnAddPublication
    );
    window.publicationActionsComponent.addOnUpdatePublicationListener(
      this.handleOnUpdatePublication
    );
    window.publicationActionsComponent.addOnDeletePublicationListener(
      this.handleOnDeletePublication
    );
  }

  componentWillUnmount() {
    window.publicationActionsComponent.removeOnAddPublicationListener(
      this.handleOnAddPublication
    );
    window.publicationActionsComponent.removeOnUpdatePublicationListener(
      this.handleOnUpdatePublication
    );
    window.publicationActionsComponent.removeOnDeletePublicationListener(
      this.handleOnDeletePublication
    );
  }

  selectedEvent = event => {
    window.publicationActionsComponent.selectedEvent(event);
  };

  addNewPublication = event => {
    window.publicationActionsComponent.addNewPublication(event);
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

  handleOnClickDownload = () => {
    const token = localStorage.getItem("token");

    axios({
      url: `${process.env.REACT_APP_EXPORTER_SERVICE_URL}/publications`,
      method: "GET",
      responseType: "blob",
      headers: { Authorization: "Bearer " + token }
    })
      .then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "file.csv");
        document.body.appendChild(link);
        link.click();
      })
      .catch(err => {
        this.setState({
          hasError: true,
          error: err
        });
      });
  };

  handleOnUpdatePublication = updatedPublication => {
    const publications = this.state.publications.map(publication => {
      if (publication.id === updatedPublication.id) {
        return updatedPublication;
      }

      return publication;
    });

    this.setState({ publications });
  };

  handleOnDeletePublication = deletedPublication => {
    const publications = this.state.publications.filter(
      publication => publication.id !== deletedPublication.id
    );

    this.setState({ publications });
  };

  handleOnAddPublication = publication => {
    this.setState({
      publications: [...this.state.publications, publication]
    });
  };

  render() {
    return (
      <div>
        <DownloadToolbar onClick={this.handleOnClickDownload} />
        <CalendarWithErrors
          publications={this.state.publications}
          hasError={this.state.hasError}
          error={this.state.error}
          closeError={this.closeError}
          onSelectEvent={this.selectedEvent}
          onSelectSlot={this.addNewPublication}
          eventColors={this.eventColors}
        />
      </div>
    );
  }
}

export default Calendar;
