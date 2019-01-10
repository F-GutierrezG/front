import React from "react";
import PropTypes from "prop-types";

import ErrorDialog from "./ErrorDialog";

function withErrors(Component) {
  function WrappedComponent({
    hasError,
    closeError,
    errorMessage,
    children,
    ...props
  }) {
    let errorDiv;

    if (hasError) {
      errorDiv = (
        <ErrorDialog errorMessage={errorMessage} closeError={closeError} />
      );
    }

    return (
      <div>
        {errorDiv}
        <Component {...props}>{children}</Component>;
      </div>
    );
  }

  return WrappedComponent;
}

withErrors.propTypes = {
  hasError: PropTypes.bool,
  closeError: PropTypes.func,
  errorMessage: PropTypes.string
};

export default withErrors;
