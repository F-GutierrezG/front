  import React, { Component } from "react";
  import Button from "Components/CustomButtons/Button.jsx";
  import {Login} from "react-facebook";
   
  class FacebookButton extends Component{ 

    handleError = (error) => {
      this.setState({ error });
    } 

    logoutButton = () => {
        return (
                  <Button 
                    size="sm"
                    color="facebook"
                    onClick={this.props.doLogout}>
                    <i className="fab fa-facebook-square"/>{" "}
                    Desconectar
                    </Button>
          );
    }

    loginButton = () => {
      return(
       <Login
            scope="email,manage_pages,publish_pages,pages_show_list"
            onCompleted={this.props.doLogin}
            onError={this.handleError}>
            {({ loading, handleClick, error, data }) => (
                    <Button 
                    size="sm"
                    color="facebook" 
                    onClick={handleClick}>
                    <i className="fab fa-facebook-square"/>{" "}
                    Continuar con Facebook {" "}
                {loading && (
                  <span><i className="fas fa-spinner fa-spin"></i></span>
                )}
                    </Button>
            )}
          </Login>
          );
    }

    render(){
      const auth = this.props.auth;
      if(auth){
        return <div>{this.logoutButton()}</div>;
      }
      else{
        return <div>{this.loginButton()}</div>;
      }
    }
  }

  export default FacebookButton; 