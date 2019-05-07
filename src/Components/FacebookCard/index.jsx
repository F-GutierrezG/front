import React, { Component } from "react";
import { FacebookProvider} from "react-facebook";

import Card from "Components/Card/Card.jsx";
import CardBody from "Components/Card/CardBody.jsx";
import GridContainer from "Components/Grid/GridContainer.jsx";
import GridItem from "Components/Grid/GridItem.jsx";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FacebookButton from "Components/FacebookButton";

import axios from "axios";

class FacebookCard extends Component{
  constructor(props){
    super(props);

    this.state = {
      auth: false,
      loading: true,
      activePage: "",
      pages: []};
    }


    componentDidMount() {
      setTimeout(() => {
      this.loadStatus();
      }, 1000)
    }

    handleLoading(){
      if(this.state.loading){
        return <span><i className="fas fa-spinner fa-spin"></i></span>;
      }
    }

    handleChangeActivePage = (event) => {
      this.setState({ activePage: event.target.value });
      if(this.state.activePage !== event.target.value){
        const id = this.props.companyId.toString;

        axios
        .post(`${process.env.REACT_APP_FACEBOOK_SERVICE_URL}/company/page/`,{
          company_id: id,
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
      const id = this.props.companyId;
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
      const id = this.props.companyId;
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

    doLogout = () => {
      const id = this.props.companyId;
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
      const compId = this.props.companyId;
      const id = JSON.parse(localStorage.getItem("user")).id;
      axios
      .post(`${process.env.REACT_APP_FACEBOOK_SERVICE_URL}/login`,{
        uid: data.profile.id,
        ol_id: id,
        company_id: compId.toString(),
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
          let k = page.pid + "k";
          return (
            <MenuItem
            key={k}
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

  render(){

    const auth = this.state.auth;
    const appId = process.env.REACT_APP_FACEBOOK_ID;
    const appVer = process.env.REACT_APP_FACEBOOK_VERSION;

    return(
   <Card style={{textAlign : "center"}}>
   <CardBody>
   <span style={{color: "#3b5999"}}>
   <i className="fab fa-facebook-square fa-7x"/>
   </span> 
   <p style={{textAlign : "justify"}}>Conecta tu página de Facebook para poder acceder a las funcionalidades de Calendario y Analytics .</p>
   <GridContainer>
   <GridItem xs={12}>
   {this.renderPageList()}
   </GridItem>
   <GridItem xs={12}>
   <FacebookProvider 
   appId={appId}
   version={appVer}
   language="es_LA"
   debug="true">
   
   <FacebookButton
   auth={auth}
   doLogin={this.doLogin}
   doLogout={this.doLogout}/>

   </FacebookProvider>
   </GridItem>
   </GridContainer>
   </CardBody>
   </Card>
   );
 }
}

export default FacebookCard;