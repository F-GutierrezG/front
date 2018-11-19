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
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

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
      passwordError: false
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

  doLogin(email, password) {
    axios
      .post(`${process.env.REACT_APP_USERS_SERVICE_URL}/auth/login`, {
        email,
        password
      })
      .then(response => {
        const { history } = this.props;
        localStorage.setItem("token", response.data);
        history.push("/dashboard");
      })
      .catch(error => {
        console.log("ERROR", error);
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
    this.setState(newState);
  };

  render() {
    if (localStorage.getItem("token")) {
      // TODO: Validar la autenticidad del token contra el server
      return <Redirect to="/dashboard" />
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
                      value: this.state.password
                    }}
                  />
                </CardBody>
                <CardFooter className={classes.justifyContentCenter}>
                  <Button
                    color="rose"
                    simple
                    size="lg"
                    block
                    onClick={this.handleOnLogin}
                  >
                    Ingresar
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
