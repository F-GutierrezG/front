import React from "react";

import RequireAuth from "Components/RequireAuth";
import Company from "Containers/Company";

const CompanyInfo = () => {
  return <Company />;
};

export default RequireAuth(CompanyInfo);
