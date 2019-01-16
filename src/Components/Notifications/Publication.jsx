import React from "react";

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

const Publication = ({ notification, onDelete }) => {
  const { id, message } = notification;
  return (
    <div>
      <div style={{ textAlign: "right" }}>
        <Tooltip title="Descartar">
          <i className={"fas fa-times"} onClick={() => onDelete(id)} />
        </Tooltip>
      </div>
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
  );
};

export default Publication;
