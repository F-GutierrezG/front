import React from "react";

import Button from "Components/CustomButtons/Button.jsx";
import { FacebookProvider, Login} from "react-facebook";


const FacebookButton = () => ( 
	<div id="fb-login">
	<FacebookProvider 
	appId="287321418635324"
	version="v3.2"
	language="es_LA"
	debug="true">
        <Login
          scope="email"
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
                <span> Cargando...</span>
              )}
                  </Button>
          )}
        </Login>
	</FacebookProvider>
		</div> 
	);

export default FacebookButton; 