import PricingPage from "views/Pages/PricingPage.jsx";
import LoginPage from "views/Pages/LoginPage.jsx";
import RegisterPage from "views/Pages/RegisterPage.jsx";
import LockScreenPage from "views/Pages/LockScreenPage.jsx";

// @material-ui/icons
import PersonAdd from "@material-ui/icons/PersonAdd";
import Fingerprint from "@material-ui/icons/Fingerprint";
import MonetizationOn from "@material-ui/icons/MonetizationOn";
import LockOpen from "@material-ui/icons/LockOpen";

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
