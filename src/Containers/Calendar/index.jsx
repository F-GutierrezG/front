import React from "react";

import axios from "axios";

import CalendarWithErrors from "Components/Calendar";

import DownloadToolbar from "Components/DownloadToolbar";
import SearchCompany from "Components/SearchCompany";

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      publications: [],
      companies: [],
      hasError: false,
      error: "",
      selectedCompany: null
    };
  }

  loadCompanies = () => {
    const token = localStorage.getItem("token");

    axios
      .get(`${process.env.REACT_APP_COMPANIES_SERVICE_URL}`, {
        headers: { Authorization: "Bearer " + token }
      })
      .then(response => {
        this.setState({ companies: response.data }, () => {
          window.publicationActionsComponent.state.companies = this.state.companies;
        });
      })
      .catch(err => {
        this.setState({
          hasError: true,
          error: err
        });
      });
  };

  loadPublications = () => {
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
  };

  componentDidMount() {
    this.loadCompanies();
    this.loadPublications();

    const addTimer = setInterval(() => {
      if(window.publicationActionsComponent.state.onAddPublicationListeners.length === 0){
        window.publicationActionsComponent.addOnAddPublicationListener(
          this.handleOnAddPublication
        );
        clearInterval(addTimer);
      }
    }, 500);

    const updateTimer = setInterval(() => {
      if(window.publicationActionsComponent.state.onUpdatePublicationListeners.length === 0){
        window.publicationActionsComponent.addOnUpdatePublicationListener(
          this.handleOnUpdatePublication
        );
        clearInterval(updateTimer);
      }
    }, 500);

    const deleteTimer = setInterval(() => {
      if(window.publicationActionsComponent.state.onDeletePublicationListeners.length === 0){
        window.publicationActionsComponent.addOnDeletePublicationListener(
          this.handleOnDeletePublication
        );
        clearInterval(deleteTimer);
      }
    }, 500);
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

  closeError = () => {
    this.setState({
      hasError: false
    });
  };

  handleOnChangeSelectedCompany = event => {
    if (event.target.value) {
      this.loadPublications(event.target.value);
      this.setState({
        selectedCompany: this.state.companies.find(
          company => company.id === event.target.value
        )
      });
    } else {
      this.loadPublications();
      this.setState({ selectedCompany: null });
    }
  };

  loadPublications = companyId => {
    const token = localStorage.getItem("token");

    if (companyId) {
      axios
        .get(
          `${
            process.env.REACT_APP_SOCIAL_SERVICE_URL
          }/publications/${companyId}`,
          {
            headers: { Authorization: "Bearer " + token }
          }
        )
        .then(response => {
          this.setState({ publications: response.data });
        })
        .catch(err => {
          this.setState({
            hasError: true,
            error: err
          });
        });
    } else {
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
    }
  };

  render() {
    const userData = JSON.parse(localStorage.getItem("user"));
    return (
      <div>
        {userData &&
          userData.admin && (
            <div>
              <DownloadToolbar onClick={this.handleOnClickDownload} />
              <SearchCompany
                companies={this.state.companies}
                onChange={this.handleOnChangeSelectedCompany}
                company={this.state.selectedCompany}
              />
            </div>
          )}
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
