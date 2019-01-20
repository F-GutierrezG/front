import React from "react";

import RequireAuth from "Components/RequireAuth";
import Users from "Containers/ManageUsers";

const ManageUsers = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  let listUsersURL = `${process.env.REACT_APP_COMPANIES_SERVICE_URL}/users`;
  let createUserURL = `${process.env.REACT_APP_COMPANIES_SERVICE_URL}/users`;

  if (user.admin) {
    listUsersURL = `${process.env.REACT_APP_USERS_SERVICE_URL}/admins`;
    createUserURL = `${process.env.REACT_APP_USERS_SERVICE_URL}/admins`;
  }
  return (
    <Users
      listUsersURL={listUsersURL}
      createUserURL={createUserURL}
      deactivateUserURL={process.env.REACT_APP_USERS_SERVICE_URL}
      activateUserURL={process.env.REACT_APP_USERS_SERVICE_URL}
      downloadURL={`${process.env.REACT_APP_EXPORTER_SERVICE_URL}/admins`}
    />
  );
};

export default RequireAuth(ManageUsers);
