import { paths } from "./paths";
import WelcomeScreen from "../../../pages/WelcomeScreen";
import Register from "../../../pages/Register";
import Login from "../../../pages/Login";
import ForgotPassword from "../../../pages/ForgotPassword";
import ToDoList from "../../todo/toDoList";
import ResetPassword from "../../../pages/ResetPassword";
import { useUsersContext } from "../../../context/UserContext";
import Stopwatch from "../../../components/StopWatch";
import profilePage from "../../../pages/ProfilePage";
import ImageUploader from "../../../pages/UploaderImage";

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
    }
    ,
    {
      path: paths.uploadimage,
      component: ImageUploader,
    },
    /*
    {
      path: paths.profile,
      component: Profile,
      isProtected: !user.isLoggedIn,
      redirectTo: paths.login,
    },*/ {
      path: paths.todos,
      component: ToDoList,
      isProtected: !user.isLoggedIn,
      redirectTo: paths.login,
    },
    {
      path: paths.profilePage,
      component: profilePage,
      isProtected: !user.isLoggedIn,
      redirectTo: paths.login,
    }

    /*{
      path: paths.calendar,
      component: Calendar,
      isProtected: !user.isLoggedIn,
      redirectTo: paths.login,
    },
    /*{
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
    },*/,
    {
      path: paths.stopWatch,
      component: Stopwatch,
      isProtected: !user.isLoggedIn,
      redirectTo: paths.login,
    },
  ];
  return routes;
};

export default useRoutes;
