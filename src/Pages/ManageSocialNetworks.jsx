import React from "react";

import RequireAuth from "Components/RequireAuth";
import SocialNetworks from "Containers/ManageSocialNetworks";

const ManageSocialNetworks = () => {
	return <SocialNetworks />;
};
export default RequireAuth(ManageSocialNetworks);