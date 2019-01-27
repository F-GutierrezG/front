import React from "react";
import PropTypes from "prop-types";
import axios from "axios";

import withStyles from "@material-ui/core/styles/withStyles";

import Tooltip from "@material-ui/core/Tooltip";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Chip from "@material-ui/core/Chip";

import GridContainer from "Components/Grid/GridContainer.jsx";
import GridItem from "Components/Grid/GridItem.jsx";

import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import CustomInput from "Components/CustomInput/CustomInput.jsx";

import Button from "Components/CustomButtons/Button.jsx";

import extendedFormsStyle from "assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.jsx";

import deburr from "lodash/deburr";
import Autosuggest from "react-autosuggest";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";

function renderInputComponent(inputProps) {
  const { classes, inputRef = () => {}, ref, ...other } = inputProps;

  return (
    <TextField
      fullWidth
      InputProps={{
        inputRef: node => {
          ref(node);
          inputRef(node);
        },
        classes: {
          input: classes.input
        }
      }}
      {...other}
    />
  );
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
  const matches = match(suggestion.name, query);
  const parts = parse(suggestion.name, matches);

  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {parts.map(
          (part, index) =>
            part.highlight ? (
              <span key={String(index)} style={{ fontWeight: 500 }}>
                {part.text}
              </span>
            ) : (
              <strong key={String(index)} style={{ fontWeight: 300 }}>
                {part.text}
              </strong>
            )
        )}
      </div>
    </MenuItem>
  );
}

function getSuggestionValue(suggestion) {
  return suggestion.name;
}

const styles = theme => ({
  container: {
    position: "relative"
  },
  suggestionsContainerOpen: {
    position: "absolute",
    zIndex: 1000,
    marginTop: theme.spacing.unit
  },
  suggestion: {
    display: "block"
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: "none"
  }
});

class EditPublicationDialog extends React.Component {
  state = {
    single: "",
    popper: "",
    suggestions: []
  };

  getSuggestions = value => {
    const inputValue = deburr(value.trim()).toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;

    return inputLength === 0
      ? []
      : this.props.subcategories.filter(suggestion => {
          const keep =
            count < 5 &&
            suggestion.name.slice(0, inputLength).toLowerCase() ===
              inputValue.toLowerCase();

          if (keep) {
            count += 1;
          }

          return keep;
        });
  };

  handleSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };

  handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  handleChange = name => (event, { newValue }) => {
    this.setState({
      [name]: newValue
    });
  };

  onChangeSuggestion = () => (event, { newValue }) => {
    const myEvent = { target: { value: newValue } };
    this.props.onChange("subcategory", myEvent);
  };

  loadCategories = () => {
    const token = localStorage.getItem("token");
    const id = this.props.publication.companyId;

    axios
      .get(`${process.env.REACT_APP_SOCIAL_SERVICE_URL}/categories/${id}`, {
        headers: { Authorization: "Bearer " + token }
      })
      .then(response => {
        this.setState({ categories: response.data });
      })
      .catch(err => {
        this.setState({
          hasError: true,
          error: err
        });
      });
  };

  render() {
    const { classes } = this.props;
    const userData = JSON.parse(localStorage.getItem("user"));

    const autosuggestProps = {
      renderInputComponent,
      suggestions: this.state.suggestions,
      onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
      onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
      getSuggestionValue,
      renderSuggestion
    };

    return (
      <Dialog
        open={this.props.open}
        styles={{ overflow: "visible" }}
        onClose={this.props.onCancel}
      >
        <DialogTitle>Editar Publicación</DialogTitle>
        <DialogContent>
          <GridContainer>
            {userData &&
              userData.admin && (
                <GridItem xs={12}>
                  <FormControl fullWidth>
                    <InputLabel
                      htmlFor="company-select"
                      className={classes.selectLabel}
                    >
                      Empresa
                    </InputLabel>
                    <Select
                      value={this.props.publication.companyId}
                      onChange={event =>
                        this.props.onChange("companyId", event)
                      }
                      MenuProps={{ className: classes.selectMenu }}
                      classes={{ select: classes.select }}
                    >
                      <MenuItem
                        disabled
                        classes={{ root: classes.selectMenuItem }}
                      >
                        Empresa
                      </MenuItem>
                      {this.props.companies.map(company => {
                        return (
                          <MenuItem
                            key={company.id}
                            classes={{ root: classes.selectMenuItem }}
                            value={company.id}
                          >
                            {company.identifier} - {company.name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </GridItem>
              )}
            <GridItem xs={6}>
              <CustomInput
                labelText="Fecha"
                error={this.props.errors.date}
                formControlProps={{
                  fullWidth: true,
                  margin: "dense"
                }}
                labelProps={{
                  shrink: true
                }}
                inputProps={{
                  type: "date",
                  value: this.props.publication.date,
                  onChange: event => this.props.onChange("date", event)
                }}
              />
            </GridItem>
            <GridItem xs={6}>
              <CustomInput
                labelText="Hora"
                error={this.props.errors.time}
                formControlProps={{
                  fullWidth: true,
                  margin: "dense"
                }}
                labelProps={{
                  shrink: true
                }}
                inputProps={{
                  type: "time",
                  value: this.props.publication.time,
                  onChange: event => this.props.onChange("time", event)
                }}
              />
            </GridItem>
            <GridItem xs={6}>
              <FormControl fullWidth error={this.props.errors.category}>
                <InputLabel
                  htmlFor="multiple-select"
                  className={classes.selectLabel}
                >
                  Categoría
                </InputLabel>
                <Select
                  value={this.props.publication.category}
                  onChange={event => this.props.onChange("category", event)}
                  MenuProps={{ className: classes.selectMenu }}
                  classes={{ select: classes.select }}
                >
                  <MenuItem disabled classes={{ root: classes.selectMenuItem }}>
                    Categoría
                  </MenuItem>
                  {this.props.categories.map(category => {
                    return (
                      <MenuItem
                        key={category.name}
                        classes={{ root: classes.selectMenuItem }}
                        value={category.name}
                      >
                        {category.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </GridItem>
            <GridItem xs={6}>
              <Autosuggest
                {...autosuggestProps}
                inputProps={{
                  classes,
                  className: classes.selectLabel,
                  label: "Subcategoría",
                  value: this.props.publication.subcategory,
                  onChange: this.onChangeSuggestion("subcategory")
                }}
                theme={{
                  suggestionsList: classes.suggestionsList,
                  suggestion: classes.suggestion,
                  suggestionsContainerOpen: classes.suggestionsContainerOpen
                }}
                renderSuggestionsContainer={options => (
                  <Paper {...options.containerProps} square>
                    {options.children}
                  </Paper>
                )}
              />
            </GridItem>
            <GridItem xs={12}>
              <CustomInput
                labelText="Título"
                error={this.props.errors.title}
                formControlProps={{
                  fullWidth: true,
                  margin: "dense"
                }}
                inputProps={{
                  type: "text",
                  value: this.props.publication.title,
                  onChange: event => this.props.onChange("title", event)
                }}
              />
            </GridItem>
            <GridItem xs={12}>
              <FormControl fullWidth error={this.props.errors.socialNetworks}>
                <InputLabel
                  htmlFor="multiple-select"
                  className={classes.selectLabel}
                >
                  Redes Sociales
                </InputLabel>
                <Select
                  multiple
                  value={this.props.publication.socialNetworks}
                  onChange={event =>
                    this.props.onChange("socialNetworks", event)
                  }
                  MenuProps={{ className: classes.selectMenu }}
                  classes={{ select: classes.select }}
                >
                  <MenuItem disabled classes={{ root: classes.selectMenuItem }}>
                    Redes Sociales
                  </MenuItem>
                  {this.props.socialNetworks.map(socialNetwork => {
                    return (
                      <MenuItem
                        key={socialNetwork.id}
                        classes={{ root: classes.selectMenuItem }}
                        value={socialNetwork.id}
                      >
                        {socialNetwork.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </GridItem>
            <GridItem xs={12}>
              <CustomInput
                labelText="Mensaje"
                error={this.props.errors.message}
                formControlProps={{
                  fullWidth: true,
                  margin: "dense"
                }}
                inputProps={{
                  multiline: true,
                  value: this.props.publication.message,
                  onChange: event => this.props.onChange("message", event)
                }}
              />
            </GridItem>
            <GridItem xs={12} className={classes.publicationImageContainer}>
              <a
                href={this.props.publication.imageUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {this.props.publication.imageUrl}
              </a>
            </GridItem>
            <GridItem xs={12}>
              <CustomInput
                labelText="Archivo"
                error={this.props.errors.image}
                formControlProps={{
                  fullWidth: true,
                  margin: "dense"
                }}
                labelProps={{
                  shrink: true
                }}
                inputProps={{
                  type: "file",
                  value: this.props.publication.image,
                  onChange: event => this.props.onChange("image", event)
                }}
              />
            </GridItem>
            <GridItem xs={12}>
              <CustomInput
                labelText="Tags"
                formControlProps={{
                  fullWidth: false,
                  margin: "dense"
                }}
                labelProps={{
                  shrink: true
                }}
                inputProps={{
                  type: "text",
                  value: this.props.tag,
                  onChange: event => this.props.onChangeTag(event),
                  onKeyPress: event => this.props.onTagKeyPress(event)
                }}
              />
              <Tooltip title="Escriba el tag que desee y presione la tecla Enter para agregarlo">
                <i className={"fas fa-question"} />
              </Tooltip>
            </GridItem>
            <GridItem xs={12}>
              {this.props.publication.tags.map((tag, key) => {
                return (
                  <Chip
                    key={key}
                    label={tag}
                    onDelete={() => this.props.onDeleteTag(tag)}
                  />
                );
              })}
            </GridItem>
          </GridContainer>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={this.props.onCancel}
            disabled={this.props.buttonsDisabled}
          >
            Cancelar
          </Button>
          <Button
            onClick={this.props.onAccept}
            disabled={this.props.buttonsDisabled}
            color="primary"
          >
            Editar
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

EditPublicationDialog.propTypes = {
  classes: PropTypes.object,
  open: PropTypes.bool.isRequired,
  publication: PropTypes.shape({
    date: PropTypes.string,
    time: PropTypes.string,
    title: PropTypes.string,
    socialNetworks: PropTypes.array,
    message: PropTypes.string,
    additional: PropTypes.string,
    image: PropTypes.string,
    file: PropTypes.object,
    imageUrl: PropTypes.string,
    tags: PropTypes.array.isRequired
  }).isRequired,
  errors: PropTypes.shape({
    date: PropTypes.bool.isRequired,
    time: PropTypes.bool.isRequired,
    title: PropTypes.bool.isRequired,
    socialNetworks: PropTypes.bool.isRequired,
    message: PropTypes.bool.isRequired,
    additional: PropTypes.bool.isRequired,
    image: PropTypes.bool.isRequired,
    imageUrl: PropTypes.string
  }).isRequired,
  onChange: PropTypes.func,
  onCancel: PropTypes.func,
  onAccept: PropTypes.func,
  buttonsDisabled: PropTypes.bool.isRequired,
  socialNetworks: PropTypes.array.isRequired,
  onChangeTag: PropTypes.func.isRequired,
  onTagKeyPress: PropTypes.func.isRequired,
  onDeleteTag: PropTypes.func.isRequired,
  tag: PropTypes.string
};

export default withStyles(styles)(
  withStyles(extendedFormsStyle)(EditPublicationDialog)
);
