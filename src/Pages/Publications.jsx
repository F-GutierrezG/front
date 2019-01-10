import React from "react";

import RequireAuth from "components/RequireAuth";
import Calendar from "Containers/Calendar";

const Publications = () => {
  return <Calendar />;
};

export default RequireAuth(Publications);
