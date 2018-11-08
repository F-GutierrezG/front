import LoginPage from "views/Pages/LoginPage.jsx";

// @material-ui/icons
import Fingerprint from "@material-ui/icons/Fingerprint";

const pagesRoutes = [
  {
    path: "/pages/login-page",
    name: "Login",
    short: "Login",
    mini: "LO",
    icon: Fingerprint,
    component: LoginPage
  }
];

export default pagesRoutes;
