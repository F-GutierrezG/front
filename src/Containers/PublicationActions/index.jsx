import React from "react";

import axios from "axios";

import PublicationActionsWithErrors from "Components/PublicationActions";

const socialNetworks = [
  { id: "FACEBOOK", name: "Facebook" },
  { id: "INSTAGRAM", name: "Instagram" },
  { id: "LINKEDIN", name: "LinkedIn" },
  { id: "TWITTER", name: "Twitter" },
  { id: "YOUTUBE", name: "YouTube" },
  { id: "PINTEREST", name: "Pinterest" },
  { id: "GOOGLE", name: "Google+" }
];

const clonePeriodicities = [
  { id: "DAILY", name: "Diariamente" },
  { id: "WEEKLY", name: "Semanalmente" }
];

const cloneDurations = [
  { id: "REPETITIONS", name: "Repeticiones" },
  { id: "UNTIL", name: "Hasta" }
];

class PublicationActions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: "",
      openCreatePublication: false,
      openLinkPublication: false,
      openViewPublication: false,
      openEditPublication: false,
      openDeletePublication: false,
      openClonePublication: false,
      publication: this.getCleanedPublication(),
      selectedPublication: this.getCleanedSelectedPublication(),
      publicationErrors: this.getCleanedPublicationErrors(),
      linkErrors: {
        link: false
      },
      cloneErrors: this.getCleanedCloneErrors(),
      rejectErrors: this.getCleanedRejectErrors(),
      events: [],
      publicationButtonsDisabled: false,
      rejecting: false,
      rejectReason: "",
      link: "",
      clone: this.getCleanedClone(),
      tag: "",
      onAddPublicationListeners: [],
      onDeletePublicationListeners: [],
      onUpdatePublicationListeners: [],
      companies: [],
      categories: []
    };
    window.publicationActionsComponent = this;
  }

  getCleanedClone = () => {
    return {
      periodicity: "",
      duration: "",
      repetitions: "",
      until: ""
    };
  };

  getCleanedPublication = () => {
    return {
      companyId: -1,
      date: "",
      time: "",
      title: "",
      socialNetworks: [],
      message: "",
      additional: "",
      image: "",
      file: "",
      tags: [],
      category: "",
      subcategory: ""
    };
  };

  getCleanedSelectedPublication = () => {
    return {
      id: 0,
      companyId: -1,
      date: "",
      time: "",
      title: "",
      socialNetworks: [],
      message: "",
      additional: "",
      image: "",
      file: {},
      status: "",
      tags: [],
      category: "",
      subcategory: "",
      rejectReason: ""
    };
  };

  getCleanedPublicationErrors = () => {
    return {
      companyId: false,
      date: false,
      time: false,
      title: false,
      socialNetworks: false,
      message: false,
      additional: false,
      image: false,
      category: false,
      subcategory: false
    };
  };

  getCleanedCloneErrors = () => {
    return {
      periodicity: false,
      duration: false,
      repetitions: false,
      until: false
    };
  };

  getCleanedRejectErrors = () => {
    return {
      rejectReason: false
    }
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
    publication.title = event.realTitle;
    publication.imageUrl = event.image;
    publication.image = "";
    publication.category = event.category;
    publication.subcategory = event.subcategory;
    publication.rejectReason = event.rejectReason;
    return publication;
  };

  selectedEvent = event => {
    this.setState(
      {
        openViewPublication: true,
        selectedPublication: this.mapToPublication(event)
      },
      () => {
        this.loadCategories(event.companyId);
      }
    );
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

  loadCategories = id => {
    const token = localStorage.getItem("token");

    axios
      .get(`${process.env.REACT_APP_SOCIAL_SERVICE_URL}/categories/${id}`, {
        headers: { Authorization: "Bearer " + token }
      })
      .then(response => {
        if (this.state.selectedPublication.category) {
          const category = response.data.find(
            category => category.name === this.state.selectedPublication.category
          );

          this.setState({
            categories: response.data,
            subcategories: category.subcategories
          });
        } else {
          this.setState({
            categories: response.data,
            subcategories: []
          });
        }
      })
      .catch(err => {
        this.setState({
          hasError: true,
          error: err
        });
      });
  };

  handleChangeValue = (field, event) => {
    const files = event.target.files;
    const publication = { ...this.state.publication };
    if (files) {
      publication["file"] = event.target.files[0];
    }
    publication[field] = event.target.value;
    this.setState({ publication });

    if (field === "companyId") {
      if (event.target.value !== "") this.loadCategories(event.target.value);
      else this.setState({ categories: [] });
    }

    if (field === "category") {
      const category = this.state.categories.find(
        category => category.name === event.target.value
      );

      this.setState({
        subcategories: category.subcategories
      });
    }
  };

  handleOnCancel = () => {
    this.setState({
      openCreatePublication: false,
      publication: this.getCleanedPublication(),
      publicationErrors: this.getCleanedPublicationErrors()
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
    errors.companyId = publication.companyId === "" || publication.companyId === -1;

    this.setState({ publicationErrors: errors });

    return !(
      errors.date ||
      errors.time ||
      errors.title ||
      errors.socialNetworks ||
      errors.message ||
      errors.image ||
      errors.companyId
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
                &nbsp
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

  createPublication = publication => {
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("company_id", publication.companyId);
    formData.append("date", publication.date);
    formData.append("time", publication.time);
    formData.append("title", publication.title);
    formData.append("social_networks", publication.socialNetworks);
    formData.append("message", publication.message);
    formData.append("additional", publication.additional);
    formData.append("image", publication.file);
    formData.append("tags", publication.tags.join(","));
    formData.append("category", publication.category);
    formData.append("subcategory", publication.subcategory);

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
        this.state.onAddPublicationListeners.forEach(listener => {
          listener(response.data);
        });
        this.setState({
          openCreatePublication: false,
          publication: this.getCleanedPublication(),
          publicationButtonsDisabled: false
        });
      })
      .catch(() => {
        this.setState({
          publicationButtonsDisabled: false
        });
      });
  };

  createFbPublication = () => {
    const id = JSON.parse(localStorage.getItem("user")).id;
    const publication = this.state.selectedPublication;
    var dateParts = publication.date.split("-");
    var timeParts = publication.time.split(":");
    var date = new Date(Date.UTC(dateParts[0], dateParts[1]-1, dateParts[2], timeParts[0], timeParts[1]));
    const datetime = (date/1000).toFixed(0);

     axios
      .post("https://localhost/facebook/pages/post/",{
      ol_id: id,
      photo: publication.imageUrl,
      msg: publication.message,
      time: datetime
      })
      .then(response => {
        console.log(response);
        if(response.data.link){
          const token = localStorage.getItem("token");
          axios
            .put(
              `${process.env.REACT_APP_SOCIAL_SERVICE_URL}/publications/${
                publication.id
              }/link`,
              {
                link: response.data.link
              },
              {
                headers: {
                  Authorization: "Bearer " + token
                }
              }
            )
            .catch(err => {
              this.setState({
                hasError: true,
                error: err
              });
            });
      }
      });
  }

  addOnAddPublicationListener = listener => {
    this.setState({
      onAddPublicationListeners: [
        ...this.state.onAddPublicationListeners,
        listener
      ]
    });
  };

  addOnUpdatePublicationListener = listener => {
    this.setState({
      onUpdatePublicationListeners: [
        ...this.state.onUpdatePublicationListeners,
        listener
      ]
    });
  };

  addOnDeletePublicationListener = listener => {
    this.setState({
      onDeletePublicationListeners: [
        ...this.state.onDeletePublicationListeners,
        listener
      ]
    });
  };

  removeOnAddPublicationListener = listener => {
    const listeners = this.state.onAddPublicationListeners.filter(
      l => l !== listener
    );
    this.setState({
      onAddPublicationListeners: listeners
    });
  };

  removeOnUpdatePublicationListener = listener => {
    const listeners = this.state.onUpdatePublicationListeners.filter(
      l => l !== listener
    );
    this.setState({
      onUpdatePublicationListeners: listeners
    });
  };

  removeOnDeletePublicationListener = listener => {
    const listeners = this.state.onDeletePublicationListeners.filter(
      l => l !== listener
    );
    this.setState({
      onDeletePublicationListeners: listeners
    });
  };

  handleOnAcceptCreate = () => {
    const publication = this.state.publication;
    if (this.validatePublication(publication)) {
      this.setState({
        publicationButtonsDisabled: true
      }, () => {
        this.createPublication(publication);
      });
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
    updatedEvent.status = status;

    return this.state.events.map(event => {
      if (event.id === this.state.selectedPublication.id) {
        return updatedEvent;
      } else {
        return event;
      }
    });
  };

  handleOnReject = () => {
    this.setState({
      rejecting: true,
      openViewPublication: false
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
      .then(response => {
        if(this.state.selectedPublication.socialNetworks.includes("FACEBOOK")){this.createFbPublication();}
        const updatedPublication = response.data;
        this.state.onUpdatePublicationListeners.forEach(listener => {
          listener(updatedPublication);
        });
        this.setState({
          openViewPublication: false,
          selectedPublication: this.getCleanedSelectedPublication()
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
      rejectReason: "",
      openViewPublication: true
    });
  };

  handleOnAcceptReject = () => {
    if (!this.state.rejectReason || this.state.rejectReason.trim() === '') {
      this.setState({ rejectErrors: { rejectReason: true } });
      return;
    }

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
      .then(response => {
        const updatedPublication = response.data;
        this.state.onUpdatePublicationListeners.forEach(listener => {
          listener(updatedPublication);
        });
        this.setState({
          openViewPublication: false,
          rejecting: false,
          rejectReason: "",
          selectedPublication: this.getCleanedSelectedPublication(),
          rejectErrors: { rejectReason: false }
        });
      })
      .catch(err => {
        this.setState({
          hasError: true,
          error: err,
          rejectErrors: { rejectReason: false }
        });
      });
  };

  handleChangeRejectReason = event => {
    this.setState({ rejectReason: event.target.value });
  };

  handleOnEdit = () => {
    this.setState({
      openViewPublication: false,
      openEditPublication: true
    });
  };

  handleOnCancelEdit = () => {
    this.setState({
      openEditPublication: false
    });
  };

  handleOnDelete = () => {
    this.setState({
      openViewPublication: false,
      openDeletePublication: true
    });
  };

  handleOnCancelDelete = () => {
    this.setState({
      openDeletePublication: false
    });
  };

  handleOnAcceptDelete = () => {
    this.setState({ publicationButtonsDisabled: true });

    const token = localStorage.getItem("token");

    axios
      .delete(
        `${process.env.REACT_APP_SOCIAL_SERVICE_URL}/publications/${
          this.state.selectedPublication.id
        }`,
        {
          headers: {
            Authorization: "Bearer " + token
          }
        }
      )
      .then(() => {
        this.state.onDeletePublicationListeners.forEach(listener => {
          listener(this.state.selectedPublication);
        });
        this.setState({
          openDeletePublication: false,
          selectedPublication: this.getCleanedSelectedPublication(),
          publicationButtonsDisabled: false
        });
      })
      .catch(err => {
        this.setState({
          hasError: true,
          error: err,
          publicationButtonsDisabled: false
        });
      });
  };

  handleOnAcceptEdit = () => {
    this.setState({
      publicationButtonsDisabled: true
    });

    const token = localStorage.getItem("token");
    const publication = this.state.selectedPublication;

    const formData = new FormData();
    formData.append("company_id", publication.companyId);
    formData.append("date", publication.date);
    formData.append("time", publication.time);
    formData.append("title", publication.title);
    formData.append("social_networks", publication.socialNetworks);
    formData.append("message", publication.message);
    formData.append("additional", publication.additional);
    formData.append("image", publication.file);
    formData.append("tags", publication.tags.join(","));
    formData.append("category", publication.category);
    formData.append("subcategory", publication.subcategory);

    axios
      .put(
        `${process.env.REACT_APP_SOCIAL_SERVICE_URL}/publications/${
          publication.id
        }`,
        formData,
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "multipart/form-data"
          }
        }
      )
      .then(response => {
        const updatedPublication = response.data;
        this.state.onUpdatePublicationListeners.forEach(listener => {
          listener(updatedPublication);
        });
        this.setState({
          openEditPublication: false,
          selectedPublication: this.getCleanedSelectedPublication(),
          publicationButtonsDisabled: false
        });
      })
      .catch(err => {
        this.setState({
          hasError: true,
          error: err,
          publicationButtonsDisabled: false
        });
      });
  };

  handleEditChangeValue = (field, event) => {
    const files = event.target.files;
    const publication = { ...this.state.selectedPublication };
    if (files) {
      publication["file"] = event.target.files[0];
    }
    publication[field] = event.target.value;
    this.setState({ selectedPublication: publication });

    if (field === "companyId") {
      if (event.target.value !== "") this.loadCategories(event.target.value);
      else this.setState({ categories: [] });
    }

    if (field === "category") {
      const category = this.state.categories.find(
        category => category.name === event.target.value
      );

      this.setState({
        subcategories: category.subcategories
      });
    }
  };

  handleOnLink = () => {
    this.setState({
      openViewPublication: false,
      openLinkPublication: true
    });
  };

  handleChangeLink = event => {
    this.setState({
      link: event.target.value
    });
  };

  handleOnCancelLink = () => {
    this.setState({
      openLinkPublication: false,
      link: ""
    });
  };

  handleOnAcceptLink = () => {
    this.setState({
      publicationButtonsDisabled: true
    });

    const token = localStorage.getItem("token");

    axios
      .put(
        `${process.env.REACT_APP_SOCIAL_SERVICE_URL}/publications/${
          this.state.selectedPublication.id
        }/link`,
        {
          link: this.state.link
        },
        {
          headers: {
            Authorization: "Bearer " + token
          }
        }
      )
      .then(response => {
        const updatedPublication = response.data;
        this.state.onUpdatePublicationListeners.forEach(listener => {
          listener(updatedPublication);
        });
        this.setState({
          openLinkPublication: false,
          publicationButtonsDisabled: false,
          link: ""
        });
      })
      .catch(err => {
        this.setState({
          hasError: true,
          error: err,
          publicationButtonsDisabled: false
        });
      });
  };

  handleOnChangeTag = event => {
    this.setState({ tag: event.target.value });
  };

  handleOnTagKeyPress = event => {
    if (event.key === "Enter") {
      const newTag = this.state.tag.toLowerCase();
      const tags = [...this.state.publication.tags];

      if (!this.state.publication.tags.find(tag => tag === newTag)) {
        tags.push(newTag);
      }
      this.setState({
        tag: "",
        publication: { ...this.state.publication, tags }
      });
    }
  };

  handleOnEditTagKeyPress = event => {
    if (event.key === "Enter") {
      const newTag = this.state.tag.toLowerCase();
      const tags = [...this.state.selectedPublication.tags];

      if (!this.state.selectedPublication.tags.find(tag => tag === newTag)) {
        tags.push(newTag);
      }
      this.setState({
        tag: "",
        selectedPublication: { ...this.state.selectedPublication, tags }
      });
    }
  };

  handleOnDeleteTag = tag => {
    const tags = this.state.publication.tags.filter(existingTag => {
      return existingTag !== tag;
    });

    this.setState({
      publication: { ...this.state.publication, tags }
    });
  };

  handleOnEditDeleteTag = tag => {
    const tags = this.state.selectedPublication.tags.filter(existingTag => {
      return existingTag !== tag;
    });

    this.setState({
      selectedPublication: { ...this.state.selectedPublication, tags }
    });
  };

  handleOnClone = () => {
    this.setState({
      openClonePublication: true,
      openViewPublication: false
    });
  };

  handleOnCancelClone = () => {
    this.setState({
      openClonePublication: false,
      clone: this.getCleanedClone()
    });
  };

  handleOnAcceptClone = () => {
    const token = localStorage.getItem("token");
    const clone = this.state.clone;
    clone.parent_id = this.state.selectedPublication.id;

    axios
      .post(
        `${process.env.REACT_APP_SOCIAL_SERVICE_URL}/publications/${
          this.state.selectedPublication.id
        }/clone`,
        clone,
        {
          headers: {
            Authorization: "Bearer " + token
          }
        }
      )
      .then(response => {
        response.data.forEach(publication => {
          this.state.onAddPublicationListeners.forEach(listener => {
            listener(publication);
          });
        });
        this.setState({
          openClonePublication: false,
          clone: this.getCleanedClone(),
          cloneErrors: this.getCleanedCloneErrors(),
          publicationButtonsDisabled: false
        });
      })
      .catch(err => {
        this.setState({
          hasError: true,
          error: err,
          publicationButtonsDisabled: false
        });
      });
  };

  handleOnChangeClone = (field, event) => {
    const clone = { ...this.state.clone };
    clone[field] = event.target.value;

    if (field === "duration") {
      clone.repetitions = "";
      clone.until = "";
    }

    this.setState({ clone });
  };

  render() {
    return (
      <PublicationActionsWithErrors
        hasError={this.state.hasError}
        error={this.state.error}
        closeError={this.closeError}
        openLinkPublication={this.state.openLinkPublication}
        openCreatePublication={this.state.openCreatePublication}
        openViewPublication={this.state.openViewPublication}
        openEditPublication={this.state.openEditPublication}
        openDeletePublication={this.state.openDeletePublication}
        openClonePublication={this.state.openClonePublication}
        createPublication={this.state.publication}
        createPublicationErrors={this.state.publicationErrors}
        socialNetworks={socialNetworks}
        onChangeCreate={this.handleChangeValue}
        onCancelCreate={this.handleOnCancel}
        onAcceptCreate={this.handleOnAcceptCreate}
        onChangeEdit={this.handleEditChangeValue}
        onCancelEdit={this.handleOnCancelEdit}
        onAcceptEdit={this.handleOnAcceptEdit}
        onCancelDelete={this.handleOnCancelDelete}
        onAcceptDelete={this.handleOnAcceptDelete}
        buttonsDisabled={this.state.publicationButtonsDisabled}
        selectedPublication={this.state.selectedPublication}
        onCloseViewPublication={this.handleOnClose}
        onRejectViewPublication={this.handleOnReject}
        onAcceptViewPublication={this.handleOnAccept}
        onLinkPublication={this.handleOnLink}
        onEditPublication={this.handleOnEdit}
        onClonePublication={this.handleOnClone}
        linkPublicationErrors={this.state.linkErrors}
        editPublicationErrors={this.state.publicationErrors}
        clonePublicationErrors={this.state.cloneErrors}
        rejectPublicationErrors={this.state.rejectErrors}
        onDeletePublication={this.handleOnDelete}
        onCancelRejectViewPublication={this.handleOnCancelReject}
        onAcceptRejectViewPublication={this.handleOnAcceptReject}
        onSelectEvent={this.selectedEvent}
        onSelectSlot={this.addNewPublication}
        events={this.state.events}
        eventColors={this.eventColors}
        rejecting={this.state.rejecting}
        onChangeReject={this.handleChangeRejectReason}
        rejectReason={this.state.rejectReason}
        onChangeLink={this.handleChangeLink}
        link={this.state.link}
        clone={this.state.clone}
        onCancelLink={this.handleOnCancelLink}
        onAcceptLink={this.handleOnAcceptLink}
        onCancelClone={this.handleOnCancelClone}
        onAcceptClone={this.handleOnAcceptClone}
        onChangeTag={this.handleOnChangeTag}
        onTagKeyPress={this.handleOnTagKeyPress}
        onEditTagKeyPress={this.handleOnEditTagKeyPress}
        tag={this.state.tag}
        onDeleteTag={this.handleOnDeleteTag}
        onEditDeleteTag={this.handleOnEditDeleteTag}
        clonePeriodicities={clonePeriodicities}
        cloneDurations={cloneDurations}
        onChangeClone={this.handleOnChangeClone}
        companies={this.state.companies}
        categories={this.state.categories}
        subcategories={this.state.subcategories}
      />
    );
  }
}

export default PublicationActions;
