import AuthLayout from "~/layouts/auth";
import MainLayout from "~/layouts/main-layout";
import BlogPage from "~/pages/blog";
import ContactPage from "~/pages/contact";
import DashboardPage from "~/pages/dashboard";
import HomePage from "~/pages/home";
import LoginPage from "~/pages/login";
import RegisterPage from "~/pages/register";
import { routes } from "~/constant/routes";
import ProfilePage from "~/pages/profile";

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
    layout: MainLayout,
  },
  {
    path: routes.profile,
    element: ProfilePage,
    layout: MainLayout,
  },
];

export { authRoute, publicRoutes, privateRoutes };
