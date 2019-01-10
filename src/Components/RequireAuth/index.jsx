import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

export default function(WrappedComponent) {
  return class RequireAuth extends Component {
    constructor() {
      super();
      this.state = {
        validUser: true
      };
    }

    componentDidMount() {
      const token = localStorage.getItem("token");
      if (token) {
        axios
          .get(`${process.env.REACT_APP_AUTH_SERVICE_URL}/status`, {
            headers: { Authorization: "Bearer " + token }
          })
          .then(response => {
            localStorage.setItem("user", JSON.stringify(response.data));
          })
          .catch(() => {
            localStorage.clear();
            this.setState({ validUser: false });
          });
      } else {
        localStorage.clear();
        this.setState({ validUser: false });
      }
    }

    render() {
      if (this.state.validUser) {
        return <WrappedComponent {...this.props} />;
      } else {
        return <Redirect to="/pages/login-page" />;
      }
    }
  };
}
