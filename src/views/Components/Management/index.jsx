import React from "react";
import PropTypes from "prop-types";

import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardIcon from "components/Card/CardIcon.jsx";

import AddButton from "views/Components/AddButton.jsx";

import ReactTable from "react-table";

import "./TableStyle.css";

const Management = ({
  color,
  icon,
  elements,
  noDataText,
  columns,
  addButtonText,
  addButtonIcon,
  addButtonColor,
  addButtonOnClick
}) => (
  <GridContainer>
    <GridItem xs={12}>
      <Card>
        <CardHeader color={color} icon>
          <CardIcon color={color}>{icon}</CardIcon>
        </CardHeader>
        <CardBody>
          <ReactTable
            data={elements}
            noDataText={noDataText}
            minRows={0}
            filterable
            columns={columns}
            defaultPageSize={10}
            showPaginationTop
            showPaginationBottom={false}
            className="-striped -highlight"
            previousText={"<"}
            nextText={">"}
            pageText={"Página"}
            ofText={"de"}
            rowsText={"filas"}
          />
          <br />
          <AddButton
            text={addButtonText}
            icon={addButtonIcon}
            color={addButtonColor}
            onClick={addButtonOnClick}
          />
        </CardBody>
      </Card>
    </GridItem>
  </GridContainer>
);

Management.propTypes = {
  color: PropTypes.string.isRequired,
  icon: PropTypes.object.isRequired,
  elements: PropTypes.array.isRequired,
  noDataText: PropTypes.string.isRequired,
  columns: PropTypes.array.isRequired,
  addButtonText: PropTypes.string,
  addButtonIcon: PropTypes.object,
  addButtonColor: PropTypes.string.isRequired,
  addButtonOnClick: PropTypes.func.isRequired
};

export default Management;
export { default as ActionButton } from "./ActionButton";
