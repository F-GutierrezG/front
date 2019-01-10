import React from "react";
import PropTypes from "prop-types";

import GridContainer from "Components/Grid/GridContainer.jsx";
import GridItem from "Components/Grid/GridItem.jsx";

import Button from "Components/CustomButtons/Button.jsx";

const AddButton = ({ color, text, icon, onClick }) => (
  <GridContainer justify={"flex-end"}>
    <GridItem xs={12} md={4} lg={2}>
      <Button color={color} fullWidth onClick={onClick}>
        {icon} {text}
      </Button>
    </GridItem>
  </GridContainer>
);

AddButton.propTypes = {
  color: PropTypes.string.isRequired,
  text: PropTypes.string,
  icon: PropTypes.object,
  onClick: PropTypes.func
};

export default AddButton;
