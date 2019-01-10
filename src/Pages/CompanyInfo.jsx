import React from "react";
import PropTypes from "prop-types";

import RequireAuth from "Components/RequireAuth";
import Company from "Containers/Company";

const CompanyInfo = props => {
  const companyId = parseInt(props.location.pathname.split("/").pop(), 10);

  return <Company companyId={companyId} />;
};

CompanyInfo.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
};

export default RequireAuth(CompanyInfo);
