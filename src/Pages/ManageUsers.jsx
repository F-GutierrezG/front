import React from "react";

import RequireAuth from "Components/RequireAuth";
import Users from "Containers/ManageUsers";

const ManageUsers = () => {
  return (
    <Users
      listUsersURL={`${process.env.REACT_APP_USERS_SERVICE_URL}/admins`}
      createUserURL={process.env.REACT_APP_USERS_SERVICE_URL}
      deactivateUserURL={process.env.REACT_APP_USERS_SERVICE_URL}
      activateUserURL={process.env.REACT_APP_USERS_SERVICE_URL}
      downloadURL={`${process.env.REACT_APP_EXPORTER_SERVICE_URL}/admins`}
    />
  );
};

export default RequireAuth(ManageUsers);
