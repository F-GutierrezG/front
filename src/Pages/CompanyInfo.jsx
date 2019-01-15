import React from "react";
import PropTypes from "prop-types";

import RequireAuth from "Components/RequireAuth";
import Users from "Containers/ManageUsers";

const CompanyInfo = props => {
  const companyId = parseInt(props.location.pathname.split("/").pop(), 10);
  const listUsersURL = `${
    process.env.REACT_APP_COMPANIES_SERVICE_URL
  }/${companyId}/users`;
  const createUserURL = `${
    process.env.REACT_APP_COMPANIES_SERVICE_URL
  }/${companyId}/users`;

  const downloadURL = `${
    process.env.REACT_APP_EXPORTER_SERVICE_URL
  }/company/${companyId}/users`;

  return (
    <Users
      listUsersURL={listUsersURL}
      createUserURL={createUserURL}
      deactivateUserURL={process.env.REACT_APP_USERS_SERVICE_URL}
      activateUserURL={process.env.REACT_APP_USERS_SERVICE_URL}
      downloadURL={downloadURL}
    />
  );
};

CompanyInfo.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
};

export default RequireAuth(CompanyInfo);
