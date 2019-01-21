import LoginPage from "Pages/Login.jsx";
import ChangePasswordPage from "Pages/ChangePassword.jsx";

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
  },
  {
    path: "/pages/change-password",
    name: "Recuperar Contraseña",
    short: "Recuperar Contraseña",
    mini: "RC",
    icon: Fingerprint,
    component: ChangePasswordPage
  }
];

export default pagesRoutes;
