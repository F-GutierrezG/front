import Dashboard from "views/Dashboard/Dashboard.jsx";
import Calendar from "views/Calendar/Calendar.jsx";
import Users from "views/Management/Users";

// @material-ui/icons
import DashboardIcon from "@material-ui/icons/Dashboard";
// import ContentPaste from "@material-ui/icons/ContentPaste";
import DateRange from "@material-ui/icons/DateRange";

var dashRoutes = [
  {
    path: "/dashboard",
    name: "Panel",
    icon: DashboardIcon,
    component: Dashboard
  },
  {
    path: "/calendar",
    name: "Publicaciones",
    icon: DateRange,
    component: Calendar
  },
  {
    collapse: true,
    path: "/management",
    name: "Administración",
    state: "openManagement",
    icon: "settings",
    views: [
      {
        path: "/management/users",
        name: "Usuarios",
        mini: "US",
        component: Users
      }
    ]
  },
  { redirect: true, path: "/", pathTo: "/dashboard", name: "Dashboard" }
];
export default dashRoutes;
