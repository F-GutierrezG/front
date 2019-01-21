import React from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";

// core components
import GridContainer from "Components/Grid/GridContainer.jsx";
import GridItem from "Components/Grid/GridItem.jsx";
import CustomInput from "Components/CustomInput/CustomInput.jsx";
import Button from "Components/CustomButtons/Button.jsx";
import Card from "Components/Card/Card.jsx";
import CardBody from "Components/Card/CardBody.jsx";
import CardHeader from "Components/Card/CardHeader.jsx";
import CardFooter from "Components/Card/CardFooter.jsx";

import loginPageStyle from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.jsx";

import axios from "axios";

class RecoverPasswordPage extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: "cardHidden",
      password: "",
      passwordError: false,
      userPasswordError: false
    };
  }
  componentDidMount() {
    // we add a hidden class to the card and after 700 ms we delete it and the transition appears
    this.timeOutFunction = setTimeout(
      function() {
        this.setState({ cardAnimaton: "" });
      }.bind(this),
      700
    );
  }
  componentWillUnmount() {
    clearTimeout(this.timeOutFunction);
    this.timeOutFunction = null;
  }

  validateChangePassword(password) {
    let passwordError = false;

    if (password.trim() === "") passwordError = true;

    this.setState({
      passwordError
    });

    return !passwordError;
  }

  doChangePassword(password) {
    axios
      .post(`${process.env.REACT_APP_AUTH_SERVICE_URL}/change-password`, {
        password,
        token: this.props.location.search.split("=")[1]
      })
      .then(() => {
        alert("Contraseña modificada");
        window.location.href = "/pages/login-page";
      })
      .catch(() => {
        this.setState({
          passwordError: true,
          userPasswordError: true
        });
      });
  }

  doRecoverPassword(email) {
    axios
      .post(`${process.env.REACT_APP_AUTH_SERVICE_URL}/recover-password`, {
        email
      })
      .then(() => {
        alert("Enviado correo de recuperación de contraseña");
      })
      .catch(() => {
        this.setState({
          emailError: true,
          passwordError: true,
          userPasswordError: true
        });
      });
  }

  handleOnChangePassword = () => {
    const { password } = this.state;
    if (this.validateChangePassword(password)) {
      this.doChangePassword(password);
    }
  };

  handleOnChange = (field, evt) => {
    const newState = {};
    newState[field] = evt.target.value;
    newState["userPasswordError"] = false;
    this.setState(newState);
  };

  handleOnKeyPress = evt => {
    if (evt.key === "Enter") {
      evt.preventDefault();
      this.handleOnChangePassword();
    }
  };

  handleRecoverPassword = () => {
    const { email } = this.state;
    if (this.validateRecoverPassword(email)) {
      this.doRecoverPassword(email);
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={4}>
            <form>
              <Card login className={classes[this.state.cardAnimaton]}>
                <CardHeader
                  className={`${classes.cardHeader} ${classes.textCenter}`}
                  color="rose"
                >
                  <h4 className={classes.cardTitle}>Cambiar Contraseña</h4>
                </CardHeader>
                <CardBody>
                  <CustomInput
                    labelText="Contraseña"
                    id="password"
                    formControlProps={{
                      fullWidth: true
                    }}
                    error={this.state.passwordError}
                    inputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Icon className={classes.inputAdornmentIcon}>
                            lock_outline
                          </Icon>
                        </InputAdornment>
                      ),
                      type: "password",
                      onChange: evt => this.handleOnChange("password", evt),
                      onKeyPress: evt => this.handleOnKeyPress(evt),
                      value: this.state.password
                    }}
                  />
                  {this.state.userPasswordError && (
                    <GridContainer
                      justify="center"
                      style={{ color: "#f44336" }}
                    >
                      El enlace de recuperación de contraseña expiró.
                    </GridContainer>
                  )}
                </CardBody>
                <CardFooter className={classes.justifyContentCenter}>
                  <Button
                    color="rose"
                    simple
                    size="lg"
                    block
                    onClick={this.handleOnChangePassword}
                  >
                    Cambiar Contraseña
                  </Button>
                </CardFooter>
              </Card>
            </form>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

RecoverPasswordPage.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export default withStyles(loginPageStyle)(RecoverPasswordPage);
