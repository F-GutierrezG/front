import React from "react";

import RequireAuth from "Components/RequireAuth";
import Calendar from "Containers/Calendar";

const Publications = () => <Calendar />;

export default RequireAuth(Publications);
