import React from "react";

import RequireAuth from "Components/RequireAuth";
import Companies from "Containers/ManageCompanies";

const ManageCompanies = () => {
  return <Companies />;
};

export default RequireAuth(ManageCompanies);
