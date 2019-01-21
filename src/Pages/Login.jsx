import React from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";

// @material-ui/icons
import Email from "@material-ui/icons/Email";
// import LockOutline from "@material-ui/icons/LockOutline";

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

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: "cardHidden",
      email: "",
      password: "",
      emailError: false,
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

  validateLogin(email, password) {
    let emailError = false;
    let passwordError = false;

    if (email.trim() === "") emailError = true;
    if (password.trim() === "") passwordError = true;

    this.setState({
      emailError,
      passwordError
    });

    return !(emailError && passwordError);
  }

  validateRecoverPassword(email) {
    let emailError = false;

    if (email.trim() === "") emailError = true;

    this.setState({
      emailError
    });

    return !emailError;
  }

  doLogin(email, password) {
    axios
      .post(`${process.env.REACT_APP_AUTH_SERVICE_URL}/login`, {
        email,
        password
      })
      .then(response => {
        localStorage.setItem("token", response.data);
        return axios.get(`${process.env.REACT_APP_AUTH_SERVICE_URL}/status`, {
          headers: { Authorization: "Bearer " + response.data }
        });
      })
      .then(response => {
        const { history } = this.props;
        localStorage.setItem("user", JSON.stringify(response.data));
        history.push("/dashboard");
      })
      .catch(() => {
        this.setState({
          emailError: true,
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
      .then(response => {
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

  handleOnLogin = () => {
    const { email, password } = this.state;
    if (this.validateLogin(email, password)) {
      this.doLogin(email, password);
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
      this.handleOnLogin();
    }
  };

  handleRecoverPassword = () => {
    const { email } = this.state;
    if (this.validateRecoverPassword(email)) {
      this.doRecoverPassword(email);
    }
  };

  render() {
    if (localStorage.getItem("token")) {
      // TODO: Validar la autenticidad del token contra el server
      return <Redirect to="/dashboard" />;
    }

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
                  <h4 className={classes.cardTitle}>Acceso de Clientes</h4>
                </CardHeader>
                <CardBody>
                  <CustomInput
                    labelText="E-Mail"
                    id="email"
                    formControlProps={{
                      fullWidth: true
                    }}
                    error={this.state.emailError}
                    inputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Email className={classes.inputAdornmentIcon} />
                        </InputAdornment>
                      ),
                      onChange: evt => this.handleOnChange("email", evt),
                      onKeyPress: evt => this.handleOnKeyPress(evt),
                      value: this.state.email
                    }}
                  />
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
                      Usuario y/o Contraseña incorrectas.
                    </GridContainer>
                  )}
                  <Button
                    color="rose"
                    simple
                    size="lg"
                    block
                    onClick={this.handleOnLogin}
                  >
                    Ingresar
                  </Button>
                </CardBody>
                <CardFooter className={classes.justifyContentCenter}>
                  <Button
                    color="default"
                    size="sm"
                    block
                    onClick={this.handleRecoverPassword}
                  >
                    Recuperar Contraseña
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

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default withStyles(loginPageStyle)(LoginPage);
