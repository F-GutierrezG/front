import React from "react";
import PropTypes from "prop-types";

import RequireAuth from "Components/RequireAuth";
import Brands from "Containers/ManageBrands";
import Users from "Containers/ManageUsers";

const CompanyInfo = props => {
  const companyId = parseInt(props.location.pathname.split("/").pop(), 10);
  const listUsersURL = `${process.env.REACT_APP_COMPANIES_SERVICE_URL}/${companyId}/users`;
  const createUserURL = `${process.env.REACT_APP_COMPANIES_SERVICE_URL}/${companyId}/users`;
  const downloadURL = `${process.env.REACT_APP_EXPORTER_SERVICE_URL}/company/${companyId}/users`;
  const listBrandsURL = `${process.env.REACT_APP_COMPANIES_SERVICE_URL}/${companyId}/brands`;
  const createBrandURL = `${process.env.REACT_APP_COMPANIES_SERVICE_URL}/${companyId}/brands`;

  return (
    <div>
      <Brands
        listBrandsURL={listBrandsURL}
        createBrandURL={createBrandURL}
        deactivateBrandURL={`${process.env.REACT_APP_COMPANIES_SERVICE_URL}/brands`}
        activateBrandURL={`${process.env.REACT_APP_COMPANIES_SERVICE_URL}/brands`}
        downloadURL={`${process.env.REACT_APP_EXPORTER_SERVICE_URL}/brands`}
      />
      <Users
        listUsersURL={listUsersURL}
        createUserURL={createUserURL}
        deactivateUserURL={process.env.REACT_APP_USERS_SERVICE_URL}
        activateUserURL={process.env.REACT_APP_USERS_SERVICE_URL}
        downloadURL={downloadURL}
      />
    </div>
  );
};

CompanyInfo.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
};

export default RequireAuth(CompanyInfo);
