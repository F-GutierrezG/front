import React from "react";

import RequireAuth from "Components/RequireAuth";
import Users from "Containers/ManageUsers";

const ManageUsers = () => {
  return <Users />;
};

export default RequireAuth(ManageUsers);
