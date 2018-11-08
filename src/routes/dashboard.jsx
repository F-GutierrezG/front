import Dashboard from "views/Dashboard/Dashboard.jsx";
import Calendar from "views/Calendar/Calendar.jsx";

import pagesRoutes from "./pages.jsx";

// @material-ui/icons
import DashboardIcon from "@material-ui/icons/Dashboard";
import Image from "@material-ui/icons/Image";
// import ContentPaste from "@material-ui/icons/ContentPaste";
import DateRange from "@material-ui/icons/DateRange";

var pages = pagesRoutes;

var dashRoutes = [
  {
    path: "/dashboard",
    name: "Panel",
    icon: DashboardIcon,
    component: Dashboard
  },
  {
    collapse: true,
    path: "-page",
    name: "Páginas",
    state: "openPages",
    icon: Image,
    views: pages
  },
  {
    path: "/calendar",
    name: "Publicaciones",
    icon: DateRange,
    component: Calendar
  },
  { redirect: true, path: "/", pathTo: "/dashboard", name: "Dashboard" }
];
export default dashRoutes;
