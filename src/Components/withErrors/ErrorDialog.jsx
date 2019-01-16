import React from "react";
import PropTypes from "prop-types";

import UnknowMessage from "./UnknowMessage";
import GeneralMessage from "./GeneralMessage";
import ForbiddenMessage from "./ForbiddenMessage";
import UnauthorizedMessage from "./UnauthorizedMessage";

const ErrorDialog = props => {
  if (!props.error.response) {
    return <UnknowMessage closeError={props.closeError} />;
  }

  const status = props.error.response.status;

  if (status === 403) {
    return <ForbiddenMessage closeError={props.closeError} />;
  }
  if (status === 401) {
    return <UnauthorizedMessage closeError={props.closeError} />;
  }

  return <GeneralMessage error={props.error} closeError={props.closeError} />;
};

ErrorDialog.propTypes = {
  error: PropTypes.object,
  closeError: PropTypes.func.isRequired
};

export default ErrorDialog;
