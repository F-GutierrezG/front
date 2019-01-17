import React from "react";
import PropTypes from "prop-types";

import Tooltip from "@material-ui/core/Tooltip";

const mapStatus = status => {
  switch (status) {
    case "REJECTED":
      return <span style={{ color: "#f44336" }}>Rechazada</span>;
    case "ACCEPTED":
      return <span style={{ color: "#4caf50" }}>Aceptada</span>;
    default:
      return <span style={{ color: "#00bcd4" }}>Pendiente</span>;
  }
};

const Publication = ({ notification, onDelete, onNotificationClick }) => {
  const { id, message } = notification;
  return (
    <div>
      <div style={{ textAlign: "right" }}>
        <Tooltip title="Descartar">
          <i className={"fas fa-times"} onClick={() => onDelete(id)} />
        </Tooltip>
      </div>
      <div onClick={() => onNotificationClick(id)}>
        <div>
          {message.social_networks.map((network, key) => {
            return (
              <span key={key}>
                <i className={`fab fa-${network.toLowerCase()}`} />
                <span>&nbsp;</span>
              </span>
            );
          })}
        </div>
        <div>{message.title}</div>
        <div>{mapStatus(message.status)}</div>
      </div>
    </div>
  );
};

Publication.propTypes = {
  notification: PropTypes.shape({
    id: PropTypes.number.isRequired,
    message: PropTypes.shape({
      social_networks: PropTypes.array.isRequired,
      title: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onNotificationClick: PropTypes.func.isRequired
};

export default Publication;
