import Calendar from "views/Calendar/Calendar.jsx";
import Users from "views/Management/Users";
import Companies from "views/Management/Companies";
import Company from "views/Company";

// @material-ui/icons
// import ContentPaste from "@material-ui/icons/ContentPaste";
import DateRange from "@material-ui/icons/DateRange";

var dashRoutes = [
  {
    path: "/calendar",
    name: "Publicaciones",
    icon: DateRange,
    component: Calendar
  },
  {
    path: "/companies/:company_id",
    name: "Companía",
    invisible: true,
    component: Company
  },
  {
    path: "/management/users",
    name: "Usuarios",
    icon: "people",
    onlyUser: true,
    component: Users
  },
  {
    collapse: true,
    path: "/management",
    name: "Administración",
    state: "openManagement",
    icon: "settings",
    onlyAdmin: true,
    views: [
      {
        path: "/management/users",
        name: "Usuarios",
        mini: "US",
        component: Users
      },
      {
        path: "/management/companies",
        name: "Compañías",
        mini: "CO",
        component: Companies
      }
    ]
  },
  { redirect: true, path: "/", pathTo: "/calendar", name: "Publicaciones" }
];
export default dashRoutes;
