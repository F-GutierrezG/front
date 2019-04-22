import React, { Component } from "react";

import GridContainer from "Components/Grid/GridContainer.jsx";
import GridItem from "Components/Grid/GridItem.jsx";

import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "Components/CustomButtons/Button.jsx";
import {Login} from "react-facebook";

import axios from "axios";

 
class FacebookButton extends Component{ 
  constructor(props){
    super(props);
    this.state = {
      auth: false,
      loading: true,
      activePage: "",
      pages: []};
  }

  componentDidMount() {
    this.loadStatus();
  }

  handleLoading(){
    if(this.state.loading){
    return <span><i className="fas fa-spinner fa-spin"></i></span>;
    }
  }

  handleResponse = (data) => {
    console.log(data.profile);
    this.doLogin(data);
  }
 
  handleError = (error) => {
    this.setState({ error });
  }

  handleChange = (response) => {
    console.log(response);
  } 
 
  handleChangeActivePage = event => {
    this.setState({ activePage: event.target.value });
    if(this.state.activePage !== event.target.value){
    const id = JSON.parse(localStorage.getItem("user")).id;

     axios
      .post(`${process.env.REACT_APP_FACEBOOK_SERVICE_URL}/user/page/`,{
      ol_id: id,
      pid: event.target.value
      })
      .then(response => {
        //console.log(response);
      })
      .catch(err => {
        this.setState({
          hasError: true,
          error: err
        });
      });
    }
  }
   
  loadStatus = () => {
    const id = JSON.parse(localStorage.getItem("user")).id;
    const token = localStorage.getItem("token");
    axios
      .get(`${process.env.REACT_APP_FACEBOOK_SERVICE_URL}/status/${id}`,{
        headers: { Authorization: "Bearer " + token }
      })
      .then(response => {
        if(response.data.is_valid){
          this.setState({auth: true,
          activePage: response.data.active_page});
          this.loadPages();
        }
        else{
          this.setState({auth: false, 
            activePage: ""});
        }
        });
   }

   loadPages = () =>{
    const id = JSON.parse(localStorage.getItem("user")).id;
    const token = localStorage.getItem("token");
    axios
      .get(`${process.env.REACT_APP_FACEBOOK_SERVICE_URL}/pages/${id}`,{
        headers: { Authorization: "Bearer " + token }
      })
      .then(response => {
        //console.log(response);
        const userPages = response.data;
        if(userPages.length){
          this.setState({pages: userPages});
        }
        });
   }

  showLogoutButton = () => {
      return (
                <Button 
                  size="sm"
                  color="facebook"
                  onClick={this.doLogout}>
                  <i className="fab fa-facebook-square"/>{" "}
                  Desconectar
                  </Button>
        );
  }

  showLoginButton = () => {
    return(
     <Login
          scope="email,manage_pages,publish_pages,pages_show_list"
          onCompleted={this.handleResponse}
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

  renderButton = () => {
    if(this.state.auth===true){
      return this.showLogoutButton();
    }
    else{
      return this.showLoginButton();
    }
  }

  renderPageList = () => {
    //TODO: fix initial state of select after login
    if(this.state.auth===true && this.state.pages.length && this.state.activePage !== ""){
    return(
          <FormControl
            fullWidth>
            <InputLabel
              htmlFor="simple-select">
              Página activa
            </InputLabel>
         <Select
              onChange={this.handleChangeActivePage}
              value={this.state.activePage}
            >
              {this.state.pages.map(page => {
                return (
                  <MenuItem
                    key={page.pid}
                    value={page.pid}
                  >
                    {page.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
    );
  }
  }

  doLogout = () => {
    const id = JSON.parse(localStorage.getItem("user")).id;
    const token = localStorage.getItem("token");
    axios
      .get(`${process.env.REACT_APP_FACEBOOK_SERVICE_URL}/logout/${id}`,{
        headers: { Authorization: "Bearer " + token }
      })
      .then(response => {
        if(response){
          this.setState({auth : false,
            activePage: ""});
        }
        });
  }

  doLogin = (data) => {
    const id = JSON.parse(localStorage.getItem("user")).id;
    axios
      .post(`${process.env.REACT_APP_FACEBOOK_SERVICE_URL}/login`,{
      uid: data.profile.id,
      ol_id: id,
      name: data.profile.name,
      email: data.profile.email,
      access_token: data.tokenDetail.accessToken,
      token_expiration: data.tokenDetail.expiresIn
      })
      .then(response => {
        if(response.data){
        this.setState({auth : true,
          pages: response.data.pages,
          activePage: response.data.active_page});
      }
      else{
        this.setState({auth : false});
      }
      })
      .catch(err => {
        this.setState({
          hasError: true,
          error: err,
          auth: false,
          pages: [],
          activePage: ""
        });
      });
  }

 render(){

return(
	<div id="fb-login">
            <GridContainer>
              <GridItem xs={12}>
              {this.renderPageList()}
              </GridItem>
              <GridItem xs={12}>
              {this.renderButton()}
              </GridItem>
            </GridContainer>
		</div> 
    );
	}
}

export default FacebookButton; 