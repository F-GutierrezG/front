import React from "react";
import PropTypes from "prop-types";

import Button from "components/CustomButtons/Button.jsx";

const ActionButton = ({ onClick, color, name, icon }) => (
  <Button
    justIcon
    round
    simple
    onClick={onClick}
    color={color}
    className={name}
  >
    {icon}
  </Button>
);

ActionButton.propTypes = {
  color: PropTypes.string.isRequired,
  icon: PropTypes.object.isRequired,
  name: PropTypes.string,
  onClick: PropTypes.func
};

export default ActionButton;
