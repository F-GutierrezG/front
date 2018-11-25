import React from "react";

import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/ActionsCard/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import { ActionButton } from "views/Components/Management";
import Delete from "@material-ui/icons/Delete";
import Settings from "@material-ui/icons/Settings";

const SocialNetwork = props => {
  const { classes } = props;

  return (
    <GridItem xs={12} sm={6} md={6} lg={3}>
      <Card>
        <CardHeader color="success" stats icon>
          <CardIcon color={props.color}>
            <i className={"fab " + props.icon} />
          </CardIcon>
          <p className={classes.cardCategory}>Opciones</p>
          <ActionButton
            onClick={props.onSetup}
            color="success"
            name="setup"
            icon={<Settings />}
          />
          <ActionButton
            onClick={props.onDelete}
            color="danger"
            name="delete"
            icon={<Delete />}
          />
        </CardHeader>
        <CardFooter stats>
          <div className={classes.stats}>Últimas 24 horas</div>
        </CardFooter>
      </Card>
    </GridItem>
  );
};

export default SocialNetwork;
