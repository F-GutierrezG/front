import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";

import { FacebookProvider} from "react-facebook";
import axios from "axios";
// core components
import GridContainer from "Components/Grid/GridContainer.jsx";
import GridItem from "Components/Grid/GridItem.jsx";
import Card from "Components/Card/Card.jsx";
import CardBody from "Components/Card/CardBody.jsx";
import FacebookButton  from "Components/FacebookButton";
import Button from "Components/CustomButtons/Button.jsx";

class SocialNetworks extends Component{

  loadFbPages = () =>{
    const id = JSON.parse(localStorage.getItem("user")).id;
    const token = localStorage.getItem("token");

    axios
      .get(`${process.env.REACT_APP_FACEBOOK_SERVICE_URL}/pages/${id}`, {
        headers: { Authorization: "Bearer " + token }
      })
      .then(response => {
        this.setState({ fbpages: response.data });
      })
      .catch(err => {
        this.setState({
          hasError: true,
          error: err
        });
      });
  }

	render(){
		return(
			<div>
			<GridContainer justify="center">
          <GridItem xs={12} sm={12} md={4}>
              <Card style={{textAlign : "center"}}>
                <CardBody>
                <span style={{color: "#3b5999"}}>
  					<i className="fab fa-facebook-square fa-7x"/>
				</span> 
                <p style={{textAlign : "justify"}}>Conecta tu página de Facebook para poder acceder a las funcionalidades de Calendario y Analytics	.</p>
                    <FacebookProvider 
                appId="287321418635324"
                version="v3.2"
                language="es_LA"
                debug="true">
                  <FacebookButton/>
                </FacebookProvider>
                </CardBody>
              </Card>
          </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
              <Card style={{textAlign : "center",background: "repeating-linear-gradient(-55deg,  #FFF,  #FFF 10px,  #e0e0e0 10px,  #e0e0e0 20px)"}}>
                <CardBody>
                <span style={{color: "#e4405f"}}>
  					<i className="fab fa-instagram fa-7x" style={{opacity:"0.6"}}/>
				</span> 
                <p style={{textAlign : "justify"}}>Conecta tu Instagram para poder acceder a las funcionalidades de Calendario y Analytics	.</p>
                  <Button
                  disabled
                  size="sm"
                  style={{backgroundColor: "#e4405f"}}>
              		<i className="fab fa-instagram" />{" "}
              		Pronto...
              		</Button>
                </CardBody>
              </Card>
          </GridItem>
			 <GridItem xs={12} sm={12} md={4} >
              <Card style={{textAlign : "center",background: "repeating-linear-gradient(-55deg,  #FFF,  #FFF 10px,  #e0e0e0 10px,  #e0e0e0 20px)"}}>
                <CardBody>
                <span style={{color: "#55acee"}}>
  					<i className="fab fa-twitter-square fa-7x" style={{opacity:"0.6"}}/>
				</span> 
                <p style={{textAlign : "justify"}}>Conecta con Twitter para poder acceder a las funcionalidades de Calendario y Analytics	.</p>
                  <Button
                  disabled
                  size="sm"
                  color="twitter">
              		<i className="fab fa-twitter"/>{" "}
              		Pronto...
              		</Button>
                </CardBody>
              </Card>
          </GridItem>
           <GridItem xs={12} sm={12} md={4}>
              <Card style={{textAlign : "center",background: "repeating-linear-gradient(-55deg,  #FFF,  #FFF 10px,  #e0e0e0 10px,  #e0e0e0 20px)"}}>
                <CardBody>
                <span style={{color: "#0077B5"}}>
  					<i className="fab fa-linkedin fa-7x" style={{opacity:"0.6"}}/>
				</span> 
                <p style={{textAlign : "justify"}}>Conecta tu LinkedIn para poder acceder a las funcionalidades de Calendario y Analytics	.</p>
                  <Button
                  disabled
                  size="sm"
                  color="linkedin">
              		<i className="fab fa-linkedin-in" />{" "}
              		Pronto... 
              		</Button>
                </CardBody>
              </Card>
          </GridItem>
        </GridContainer>
			</div>
			);
	}

}
export default withStyles()(SocialNetworks);
