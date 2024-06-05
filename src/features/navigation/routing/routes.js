import { paths } from "./paths";
import WelcomeScreen from "../../../pages/WelcomeScreen";
import Register from "../../../pages/Register";
import Login from "../../../pages/Login";
import ForgotPassword from "../../../pages/ForgotPassword";
import ToDoList from "../../todo/toDoList";
import ResetPassword from "../../../pages/ResetPassword";
import { useUsersContext } from "../../../context/UserContext";
import ProfilePage from "../../../pages/ProfilePage";
import StopWatch from "../../../components/StopWatch";
import Home from "../../../pages/Home";
import Timer from "../../../components/timer";
import CalendarComponent from "../../../components/Calendar";
import ImageUploader from "../../../pages/UploaderImage";
import StatisticIndex from "../../../pages/StatisticIndex";
import Notepad from "../../../pages/Notepad";
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
      path: paths.notepad,
      component: Notepad,
      isProtected: true,
      redirectTo: paths.login,
    },
    {
      path: paths.statistic,
      component: StatisticIndex,
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
      component: CalendarComponent,
      isProtected: !user.isLoggedIn,
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
    {
      path: paths.uploadimage,
      component: ImageUploader,
    },
  ];
  return routes;
};

export default useRoutes;
