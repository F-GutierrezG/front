// ##############################
// // // Dashboard View styles
// #############################

import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";

import hoverCardStyle from "assets/jss/material-dashboard-pro-react/hoverCardStyle.jsx";

const companyStyle = {
  ...hoverCardStyle,
  cardTitle: {
    ...cardTitle,
    marginTop: "0px",
    marginBottom: "3px"
  },
  cardCategory: {
    color: "#999999",
    fontSize: "14px",
    paddingTop: "10px",
    marginBottom: "0",
    marginTop: "0",
    margin: "0"
  },
  cardProductDesciprion: {
    textAlign: "center",
    color: "#999999"
  },
  stats: {
    color: "#999999",
    fontSize: "12px",
    lineHeight: "22px",
    display: "inline-flex",
    "& svg": {
      position: "relative",
      top: "4px",
      width: "16px",
      height: "16px",
      marginRight: "3px"
    },
    "& .fab,& .fas,& .far,& .fal,& .material-icons": {
      position: "relative",
      top: "4px",
      fontSize: "16px",
      marginRight: "3px"
    }
  },
  productStats: {
    paddingTop: "7px",
    paddingBottom: "7px",
    margin: "0"
  },
  underChartIcons: {
    width: "17px",
    height: "17px"
  }
};

export default companyStyle;
