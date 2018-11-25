import {
  warningCardHeader,
  successCardHeader,
  dangerCardHeader,
  infoCardHeader,
  primaryCardHeader,
  roseCardHeader
} from "assets/jss/material-dashboard-pro-react.jsx";
const cardHeaderStyle = {
  cardHeader: {
    marginBottom: "0",
    borderBottom: "none",
    background: "transparent",
    zIndex: "3 !important",
    "&$cardHeaderPlain,&$cardHeaderImage,&$cardHeaderContact,&$cardHeaderSignup,&$cardHeaderIcon,&$cardHeaderStats,&$warningCardHeader,&$successCardHeader,&$dangerCardHeader,&$infoCardHeader,&$primaryCardHeader,&$roseCardHeader": {
      margin: "0 15px",
      padding: "0",
      position: "relative",
      color: "#FFFFFF"
    },
    "&:first-child": {
      borderRadius: "calc(.25rem - 1px) calc(.25rem - 1px) 0 0"
    },
    "&$warningCardHeader,&$successCardHeader,&$dangerCardHeader,&$infoCardHeader,&$primaryCardHeader,&$roseCardHeader": {
      "&:not($cardHeaderIcon):not($cardHeaderImage):not($cardHeaderText)": {
        borderRadius: "3px",
        marginTop: "-25px"
      }
    },
    "&$cardHeaderStats svg": {
      marginTop: "-4px",
      fontSize: "26px",
      textAlign: "center",
      width: "26px",
      height: "26px"
    },
    "&$cardHeaderStats .fab,&$cardHeaderStats .fas,&$cardHeaderStats .far,&$cardHeaderStats .fal,&$cardHeaderStats .material-icons": {
      fontSize: "36px",
      lineHeight: "56px",
      width: "56px",
      height: "56px",
      textAlign: "center",
      overflow: "unset",
      marginBottom: "1px"
    },
    "&$cardHeaderStats$cardHeaderIcon": {
      textAlign: "right"
    }
  },
  cardHeaderStats: {
    "& $cardHeaderIcon": {
      textAlign: "right"
    },
    "& h1,& h2,& h3,& h4,& h5,& h6": {
      margin: "0 !important"
    }
  },
  cardHeaderIcon: {
    "&$warningCardHeader,&$successCardHeader,&$dangerCardHeader,&$infoCardHeader,&$primaryCardHeader,&$roseCardHeader": {
      background: "transparent",
      boxShadow: "none"
    },
    "& .fab,& .fas,& .far,& .fal,& .material-icons": {
      width: "13px",
      height: "13px",
      textAlign: "center",
      lineHeight: "33px"
    },
    "& svg": {
      width: "14px",
      height: "14px",
      textAlign: "center",
      lineHeight: "33px"
    }
  },
  cardHeaderText: {},
  warningCardHeader: {
    color: "#FFFFFF",
    "&:not($cardHeaderText):not($cardHeaderIcon)": {
      ...warningCardHeader
    }
  },
  successCardHeader: {
    color: "#FFFFFF",
    "&:not($cardHeaderText):not($cardHeaderIcon)": {
      ...successCardHeader
    }
  },
  dangerCardHeader: {
    color: "#FFFFFF",
    "&:not($cardHeaderText):not($cardHeaderIcon)": {
      ...dangerCardHeader
    }
  },
  infoCardHeader: {
    color: "#FFFFFF",
    "&:not($cardHeaderText):not($cardHeaderIcon)": {
      ...infoCardHeader
    }
  },
  primaryCardHeader: {
    color: "#FFFFFF",
    "&:not($cardHeaderText):not($cardHeaderIcon)": {
      ...primaryCardHeader
    }
  },
  roseCardHeader: {
    color: "#FFFFFF",
    "&:not($cardHeaderText):not($cardHeaderIcon)": {
      ...roseCardHeader
    }
  }
};

export default cardHeaderStyle;
