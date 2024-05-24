import { paths } from "./paths";
import WelcomeScreen from "../../../pages/WelcomeScreen";
import Register from "../../../pages/Register";
import Login from "../../../pages/Login";
import ForgotPassword from "../../../pages/ForgotPassword";
import ToDoList from "../../todo/toDoList";
import ResetPassword from "../../../pages/ResetPassword";
import { useUsersContext } from "../../../context/UserContext";
import ProfilePage from "../../../pages/ProfilePage";
import Calendar from "../../../components/Calendar";
import StopWatch from "../../../components/StopWatch";
import Home from "../../../pages/Home";
import Timer from "../../../components/timer";

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

    {
      path: paths.forgotPassword,
      component: ForgotPassword,
    },
    {
      path: paths.resetPassword,
      component: ResetPassword,
    },
    {
      path: paths.home,
      component: Home,
      isProtected: true,
      redirectTo: paths.login,
    },
    {
      path: paths.todos,
      component: ToDoList,
      isProtected: true,
      redirectTo: paths.login,
    },
    {
      path: paths.profilePage,
      component: ProfilePage,
      isProtected: true,
      redirectTo: paths.login,
    },
    {
      path: paths.calendar,
      component: Calendar,
      isProtected: true,
      redirectTo: paths.login,
    },
    {
      path: paths.timer,
      component: Timer,
      isProtected: true,
      redirectTo: paths.login,
    },
    {
      path: paths.stopWatch,
      component: StopWatch,
      isProtected: true,
      redirectTo: paths.login,
    },
  ];
  return routes;
};

export default useRoutes;
