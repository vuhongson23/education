import AuthLayout from "~/layouts/auth";
import MainLayout from "~/layouts/main-layout";
import BlogPage from "~/pages/blog";
import ContactPage from "~/pages/contact";
import DashboardPage from "~/pages/dashboard";
import HomePage from "~/pages/home";
import LoginPage from "~/pages/login";
import RegisterPage from "~/pages/register";
import { routes } from "~/constant/routes";
// import ProfileLayout from "~/pages/profile";
import SecondaryLayout from "~/layouts/secondary-layout";
import Profile from "~/pages/profile/profile";
import Posts from "~/pages/profile/posts";
import Favourite from "~/pages/profile/favourite";
import Setting from "~/pages/profile/setting";

const authRoute = [
  {
    path: routes.login,
    element: LoginPage,
    layout: AuthLayout,
  },
  {
    path: routes.register,
    element: RegisterPage,
    layout: AuthLayout,
  },
];

const publicRoutes = [
  {
    path: routes.home,
    element: HomePage,
    layout: MainLayout,
  },
  {
    path: routes.blog,
    element: BlogPage,
    layout: MainLayout,
  },
  {
    path: routes.contact,
    element: ContactPage,
    layout: MainLayout,
  },
];

const privateRoutes = [
  {
    path: routes.dashboard,
    element: DashboardPage,
    layout: SecondaryLayout,
  },
];

const profileRoute = [
  {
    path: routes.profileByUser,
    element: Profile,
  },
  {
    path: routes.profilePost,
    element: Posts,
  },
  {
    path: routes.profileFavourite,
    element: Favourite,
  },
  {
    path: routes.profileSetting,
    element: Setting,
  },
];

export { authRoute, publicRoutes, privateRoutes, profileRoute };
