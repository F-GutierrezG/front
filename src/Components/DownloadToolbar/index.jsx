import React from "react";
import PropTypes from "prop-types";

import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import CloudDownloadOutlined from "@material-ui/icons/CloudDownloadOutlined";

const DownloadToolbar = props => {
  return (
    <div style={{ "text-align": "right" }}>
      <Tooltip title="Descargar">
        <IconButton>
          <CloudDownloadOutlined style={{ color: "#26c6da" }} />
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default DownloadToolbar;
