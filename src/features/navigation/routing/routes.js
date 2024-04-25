import { paths } from "./paths";
import WelcomeScreen from "../../../pages/WelcomeScreen";
import Register from "../../../pages/Register";
import Login from "../../../pages/Login";
import { useUsersContext } from "../../../context/UserContext";

const useRoutes = () => {
  const { user } = useUsersContext();
  const routes = [
    {
      path: paths.welcomescreen,
      component: WelcomeScreen,
    },
    {
      path: paths.register,
      component: Register,
    },
    {
      path: paths.login,
      component: Login,
    },

    /*{
      path: paths.forgotPassword,
      component: ForgotPassword,
    },
    {
      path: paths.profile,
      component: Profile,
      isProtected: !user.isLoggedIn,
      redirectTo: paths.login,
    },
    {
      path: paths.todos,
      component: Todos,
      isProtected: !user.isLoggedIn,
      redirectTo: paths.login,
    },
    {
      path: paths.calendar,
      component: Calendar,
      isProtected: !user.isLoggedIn,
      redirectTo: paths.login,
    },
    {
      path: paths.timer,
      component: Timer,
      isProtected: !user.isLoggedIn,
      redirectTo: paths.login,
    },
    {
      path: paths.notepad,
      component: Notepad,
      isProtected: !user.isLoggedIn,
      redirectTo: paths.login,
    },*/
  ];
  return routes;
};

export default useRoutes;
