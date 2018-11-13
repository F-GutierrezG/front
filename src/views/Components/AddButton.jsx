import React from "react";
import PropTypes from "prop-types";

import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

import Button from "components/CustomButtons/Button.jsx";

const AddButton = ({ color, text, icon }) => (
  <GridContainer justify={"flex-end"}>
    <GridItem xs={12} md={4} lg={2} xl={1}>
      <Button color={color} fullWidth>
        {icon} {text}
      </Button>
    </GridItem>
  </GridContainer>
);

AddButton.propTypes = {
  color: PropTypes.string.isRequired,
  text: PropTypes.string,
  icon: PropTypes.object
};

export default AddButton;