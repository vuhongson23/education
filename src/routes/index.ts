import AuthLayout from "~/layouts/auth";
import MainLayout from "~/layouts/main-layout";
import BlogPage from "~/pages/blog";
import ContactPage from "~/pages/contact";
import HomePage from "~/pages/home";
import LoginPage from "~/pages/login";
import RegisterPage from "~/pages/register";
import { routes } from "~/constant/routes";
import Profile from "~/pages/profile/profile";
import Posts from "~/pages/profile/posts";
import Favourite from "~/pages/profile/favourite";
import Setting from "~/pages/profile/setting";
import UserManager from "~/pages/dashboard/users";
import CategoryManager from "~/pages/dashboard/category";
import DashboardPage from "~/pages/dashboard/dashboard";
import PostManager from "~/pages/dashboard/posts";

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

const dashboardRoute = [
  {
    path: routes.dashboardManager,
    element: DashboardPage,
  },
  {
    path: routes.userManager,
    element: UserManager,
  },
  {
    path: routes.postManager,
    element: PostManager,
  },
  {
    path: routes.categoryManager,
    element: CategoryManager,
  },
];

export { authRoute, publicRoutes, profileRoute, dashboardRoute };
