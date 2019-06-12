import React from "react";
import PropTypes from "prop-types";

import withStyles from "@material-ui/core/styles/withStyles";

import Dialog from "@material-ui/core/Dialog";
import Tooltip from "@material-ui/core/Tooltip";
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

class AddEventDialog extends React.Component {
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

  render() {
    const {
      classes,
      open,
      onCancel,
      errors,
      publication,
      onChange,
      companies,
      brands,
      socialNetworks,
      tag,
      onChangeTag,
      onTagKeyPress,
      onDeleteTag,
      buttonsDisabled,
      onAccept,
      categories
    } = this.props;

    const autosuggestProps = {
      renderInputComponent,
      suggestions: this.state.suggestions,
      onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
      onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
      getSuggestionValue,
      renderSuggestion
    };

    return (
      <Dialog open={open} onClose={buttonsDisabled ? "" : onCancel}>
        <DialogTitle>Crear Publicación</DialogTitle>
        <DialogContent>
          <GridContainer>
            <GridItem xs={12}>
              <FormControl fullWidth error={errors.companyId}>
                <InputLabel
                  htmlFor="company-select"
                  className={classes.selectLabel}
                >
                  Empresa
                </InputLabel>
                <Select
                  value={publication.companyId}
                  onChange={event => onChange("companyId", event)}
                  MenuProps={{ className: classes.selectMenu }}
                  classes={{ select: classes.select }}
                >
                  <MenuItem disabled classes={{ root: classes.selectMenuItem }}>
                    Empresa
                  </MenuItem>
                  {companies.map(company => {
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
            <GridItem xs={12}>
              <FormControl fullWidth error={errors.brandId}>
                <InputLabel
                  htmlFor="brand-select"
                  className={classes.selectLabel}
                >
                  Marca
                </InputLabel>
                <Select
                  value={publication.brandId}
                  onChange={event => onChange("brandId", event)}
                  MenuProps={{ className: classes.selectMenu }}
                  classes={{ select: classes.select }}
                >
                  <MenuItem disabled classes={{ root: classes.selectMenuItem }}>
                    Marca
                  </MenuItem>
                  {brands.map(brand => {
                    return (
                      <MenuItem
                        key={brand.id}
                        classes={{ root: classes.selectMenuItem }}
                        value={brand.id}
                      >
                        {brand.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </GridItem>
            <GridItem xs={6}>
              <CustomInput
                labelText="Fecha"
                error={errors.date}
                formControlProps={{
                  fullWidth: true,
                  margin: "dense"
                }}
                labelProps={{
                  shrink: true
                }}
                inputProps={{
                  type: "date",
                  value: publication.date,
                  onChange: event => onChange("date", event)
                }}
              />
            </GridItem>
            <GridItem xs={6}>
              <CustomInput
                labelText="Hora"
                error={errors.time}
                formControlProps={{
                  fullWidth: true,
                  margin: "dense"
                }}
                labelProps={{
                  shrink: true
                }}
                inputProps={{
                  type: "time",
                  value: publication.time,
                  onChange: event => onChange("time", event)
                }}
              />
            </GridItem>
            <GridItem xs={6}>
              <FormControl fullWidth error={errors.category}>
                <InputLabel
                  htmlFor="multiple-select"
                  className={classes.selectLabel}
                >
                  Categoría
                </InputLabel>
                <Select
                  value={publication.category}
                  onChange={event => onChange("category", event)}
                  MenuProps={{ className: classes.selectMenu }}
                  classes={{ select: classes.select }}
                >
                  <MenuItem disabled classes={{ root: classes.selectMenuItem }}>
                    Categoría
                  </MenuItem>
                  {categories.map(category => {
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
                  value: publication.subcategory,
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
                error={errors.title}
                formControlProps={{
                  fullWidth: true,
                  margin: "dense"
                }}
                inputProps={{
                  type: "text",
                  value: publication.title,
                  onChange: event => onChange("title", event)
                }}
              />
            </GridItem>
            <GridItem xs={12}>
              <FormControl fullWidth error={errors.socialNetworks}>
                <InputLabel
                  htmlFor="multiple-select"
                  className={classes.selectLabel}
                >
                  Redes Sociales
                </InputLabel>
                <Select
                  multiple
                  value={publication.socialNetworks}
                  onChange={event => onChange("socialNetworks", event)}
                  MenuProps={{ className: classes.selectMenu }}
                  classes={{ select: classes.select }}
                >
                  <MenuItem disabled classes={{ root: classes.selectMenuItem }}>
                    Redes Sociales
                  </MenuItem>
                  {socialNetworks.map(socialNetwork => {
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
                error={errors.message}
                formControlProps={{
                  fullWidth: true,
                  margin: "dense"
                }}
                inputProps={{
                  multiline: true,
                  value: publication.message,
                  onChange: event => onChange("message", event)
                }}
              />
            </GridItem>
            <GridItem xs={12}>
              <CustomInput
                labelText="Información Adicional"
                error={errors.additional}
                formControlProps={{
                  fullWidth: true,
                  margin: "dense"
                }}
                inputProps={{
                  multiline: true,
                  value: publication.additional,
                  onChange: event => onChange("additional", event)
                }}
              />
            </GridItem>
            <GridItem xs={12}>
              <CustomInput
                labelText="Archivo"
                error={errors.image}
                formControlProps={{
                  fullWidth: true,
                  margin: "dense"
                }}
                labelProps={{
                  shrink: true
                }}
                inputProps={{
                  type: "file",
                  value: publication.image,
                  onChange: event => onChange("image", event)
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
                  value: tag,
                  onChange: event => onChangeTag(event),
                  onKeyPress: event => onTagKeyPress(event)
                }}
              />
              <Tooltip title="Escriba el tag que desee y presione la tecla Enter para agregarlo">
                <i className={"fas fa-question"} />
              </Tooltip>
            </GridItem>
            <GridItem xs={12}>
              {publication.tags.map((tag, key) => {
                return (
                  <Chip
                    key={key}
                    label={tag}
                    onDelete={() => onDeleteTag(tag)}
                  />
                );
              })}
            </GridItem>
          </GridContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCancel} disabled={buttonsDisabled}>
            Cancelar
          </Button>
          <Button onClick={onAccept} disabled={buttonsDisabled} color="success">
            Crear
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

AddEventDialog.propTypes = {
  classes: PropTypes.object,
  open: PropTypes.bool.isRequired,
  publication: PropTypes.shape({
    companyId: PropTypes.number,
    date: PropTypes.string,
    time: PropTypes.string,
    title: PropTypes.string,
    socialNetworks: PropTypes.array,
    message: PropTypes.string,
    additional: PropTypes.string,
    image: PropTypes.string,
    tags: PropTypes.array.isRequired
  }).isRequired,
  errors: PropTypes.shape({
    companyId: PropTypes.bool.isRequired,
    date: PropTypes.bool.isRequired,
    time: PropTypes.bool.isRequired,
    title: PropTypes.bool.isRequired,
    socialNetworks: PropTypes.bool.isRequired,
    message: PropTypes.bool.isRequired,
    additional: PropTypes.bool.isRequired,
    image: PropTypes.bool.isRequired
  }).isRequired,
  onChange: PropTypes.func,
  onCancel: PropTypes.func,
  onAccept: PropTypes.func,
  buttonsDisabled: PropTypes.bool.isRequired,
  socialNetworks: PropTypes.array.isRequired,
  companies: PropTypes.array.isRequired,
  brands: PropTypes.array.isRequired,
  onChangeTag: PropTypes.func.isRequired,
  onTagKeyPress: PropTypes.func.isRequired,
  tag: PropTypes.string.isRequired,
  onDeleteTag: PropTypes.func.isRequired
};

export default withStyles(styles)(
  withStyles(extendedFormsStyle)(AddEventDialog)
);
