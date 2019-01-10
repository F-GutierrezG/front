import React from "react";
import PropTypes from "prop-types";

import ErrorDialog from "./ErrorDialog";

function withErrors(Component) {
  function WrappedComponent({
    hasError,
    closeError,
    error,
    children,
    ...props
  }) {
    let errorDiv;

    if (hasError) {
      errorDiv = <ErrorDialog error={error} closeError={closeError} />;
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
  error: PropTypes.string
};

export default withErrors;
