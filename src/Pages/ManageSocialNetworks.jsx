import React from "react";

import RequireAuth from "Components/RequireAuth";
import SocialNetworks from "Containers/ManageSocialNetworks";

const ManageSocialNetworks = (props) => {
	return <SocialNetworks location={props.location}/>;
};
export default RequireAuth(ManageSocialNetworks);