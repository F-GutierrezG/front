import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import GridContainer from "Components/Grid/GridContainer.jsx";
import GridItem from "Components/Grid/GridItem.jsx";
import CustomInput from "Components/CustomInput/CustomInput.jsx";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "Components/CustomButtons/Button.jsx";
import Card from "Components/Card/Card.jsx";
import CardBody from "Components/Card/CardBody.jsx";
import CardHeader from "Components/Card/CardHeader.jsx";
import CardText from "Components/Card/CardText.jsx";
import CardFooter from "Components/Card/CardFooter.jsx";
import Person from "@material-ui/icons/Person";

import loginPageStyle from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.jsx";

class ProfileConfiguration extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			tag: ""
		};
	}

	handleOnChangeTag = event => {
		this.setState({ tag: event.target.value });
	};

	render(){
		const { classes} = this.props;
		return (
			<div className={classes.container}>
			<Card>
			<CardHeader color="info" text>
			<CardText color="info">
			<h4 className={classes.cardTitle}><Person /> Nuevo perfil</h4>
			</CardText>
			</CardHeader>
			<CardBody>
			<GridContainer justify="center">
			<GridItem xs={6}>
			<h4>Información de la marca:</h4>
			<CustomInput
			labelText="Nombre de la marca"
			id="profile_name"
			formControlProps={{
				fullWidth: true
			}}
			/>
			<CustomInput
			labelText="Logo"
			formControlProps={{
				fullWidth: true,
				margin: "dense"
			}}
			labelProps={{
				shrink: true
			}}
			inputProps={{
				type: "file"
			}}
			/>
			<strong>WorkMark CLP 35.000</strong>
			<h6>Logo compuesto por palabras</h6>
			<form name="btnPago" method="post"
			action="https://webpay3g.transbank.cl/filtroUnificado/buttonService">
			<input type="hidden" name="buttonId"
			value="e92b99dca5f526827b50253122651974"/>
			<input type="image"
			src="https://www.transbank.cl/public/img/botonwebpay.gif"/>
			</form>
			<strong>LetterMark CLP 35.000</strong>
			<h6>Logo compuesto por letras</h6>
			<form name="btnPago" method="post"
			action="https://webpay3g.transbank.cl/filtroUnificado/buttonService">
			<input type="hidden" name="buttonId"
			value="786b1dfc6e12297eb806afd0996d29d5"/>
			<input type="image"
			src="https://www.transbank.cl/public/img/botonwebpay.gif"/>
			</form>
			<strong>Isotipo CLP 50.500</strong>
			<h6>Símbolo de la marca</h6>
			<form name="btnPago" method="post"
			action="https://webpay3g.transbank.cl/filtroUnificado/buttonService">
			<input type="hidden" name="buttonId"
			value="f5c174a9113729bb546094b9994090cb"/>
			<input type="image"
			src="https://www.transbank.cl/public/img/botonwebpay.gif"/>
			</form>
			<strong>Imagotipo CLP 95.000</strong>
			<h6>Marca combinada</h6>
			<form name="btnPago" method="post"
			action="https://webpay3g.transbank.cl/filtroUnificado/buttonService">
			<input type="hidden" name="buttonId"
			value="c16c5eee878c77b45331311a02ab3114"/>
			<input type="image"
			src="https://www.transbank.cl/public/img/botonwebpay.gif"/>
			</form>
			<CustomInput
			labelText="Slogan"
			id="slogan"
			formControlProps={{
				fullWidth: true
			}}
			/>
			<CustomInput
			labelText="Dominio .com"
			id="url"
			formControlProps={{
				fullWidth: true
			}}
			/>
			<h4>Información de la empresa:</h4>
			<CustomInput
			labelText="Vision"
			id="company_vision"
			formControlProps={{
				fullWidth: true
			}}
			/>
			<CustomInput
			labelText="Mision"
			id="company_mision"
			formControlProps={{
				fullWidth: true
			}}
			/>
			<CustomInput
			labelText="Dirección Sucursal"
			id="company_address"
			formControlProps={{
				fullWidth: true
			}}
			/>
			<CustomInput
			labelText="Palabras claves de la empresa"
			id="company_keywords"
			formControlProps={{
				fullWidth: true
			}}
			/>
			<h4>Social Media:</h4>
			<CustomInput
			labelText="Perfil de FB"
			id="company_fb"
			formControlProps={{
				fullWidth: true
			}}
			/>
			<CustomInput
			labelText="Perfil de IG"
			id="company_ig"
			formControlProps={{
				fullWidth: true
			}}
			/>
			<CustomInput
			labelText="Perfil de Twitter"
			id="company_twt"
			formControlProps={{
				fullWidth: true
			}}
			/>
			<CustomInput
			labelText="Perfil de Google"
			id="company_google"
			formControlProps={{
				fullWidth: true
			}}
			/>
			<CustomInput
			labelText="Perfil de Linkedin"
			id="company_linkedin"
			formControlProps={{
				fullWidth: true
			}}
			/>
			<CustomInput
			labelText="Perfil de Pinterest"
			id="company_pinterest"
			formControlProps={{
				fullWidth: true
			}}
			/>
			</GridItem>
			<GridItem xs={6}>
			<CustomInput
			labelText="Palabras Claves"
			formControlProps={{
				fullWidth: false
			}}
			labelProps={{
				shrink: true
			}}
			inputProps={{
				type: "text",
				value: this.state.tag,
				onChange: event => this.handleOnChangeTag(event)
			}}
			/>
			<Tooltip title="Escriba el tag que desee y presione la tecla Enter para agregarlo">
			<i className={"fas fa-question"} />
			</Tooltip>

			<h4>Información de la competencia (Opcional):</h4>
			<CustomInput
			labelText="Perfil de FB"
			id="fb_comp"
			formControlProps={{
				fullWidth: true
			}}
			/>
			<CustomInput
			labelText="Perfil de IG"
			id="ig_comp"
			formControlProps={{
				fullWidth: true
			}}
			/>
			<CustomInput
			labelText="Perfil de Twitter"
			id="twt_comp"
			formControlProps={{
				fullWidth: true
			}}
			/>
			<CustomInput
			labelText="Perfil de Google"
			id="google_comp"
			formControlProps={{
				fullWidth: true
			}}
			/>
			<CustomInput
			labelText="Perfil de Linkedin"
			id="linkedin_comp"
			formControlProps={{
				fullWidth: true
			}}
			/>
			<CustomInput
			labelText="Perfil de Pinterest"
			id="pinterest_comp"
			formControlProps={{
				fullWidth: true
			}}
			/>
			<CustomInput
			labelText="Web"
			id="url_comp"
			formControlProps={{
				fullWidth: true
			}}
			/>
			<h4>Marketing:</h4>
			<CustomInput
			labelText="Agregar Promoción (Opcional)"
			id="promo"
			formControlProps={{
				fullWidth: true
			}}
			/>
			<CustomInput
			labelText="Imagen de la promoción"
			formControlProps={{
				fullWidth: true,
				margin: "dense"
			}}
			labelProps={{
				shrink: true
			}}
			inputProps={{
				type: "file"
			}}
			/>
			<CustomInput
			labelText="Fecha Promoción"
			id="promo_date"
			formControlProps={{
				fullWidth: true
			}}
			/>
			<CustomInput
			labelText="Precio Promoción"
			id="promo_price"
			formControlProps={{
				fullWidth: true
			}}
			/>
			</GridItem>
			</GridContainer>
			</CardBody>
			<CardFooter className={classes.justifyContentCenter}>
			<Button color="success">
			Enviar
			</Button>
			</CardFooter>
			</Card>
			</div>
			);
}
}

export default withStyles(loginPageStyle)(ProfileConfiguration);
