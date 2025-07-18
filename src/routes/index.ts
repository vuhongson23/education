import AuthLayout from "~/layouts/auth";
import MainLayout from "~/layouts/main-layout";
import BlogPage from "~/pages/blog";
import ContactPage from "~/pages/contact";
import DashboardPage from "~/pages/dashboard";
import HomePage from "~/pages/home";
import LoginPage from "~/pages/login";
import RegisterPage from "~/pages/register";

const publicRoutes = [
  {
    path: "/login",
    element: LoginPage,
    layout: AuthLayout,
  },
  {
    path: "/register",
    element: RegisterPage,
    layout: AuthLayout,
  },
  {
    path: "/",
    element: HomePage,
    layout: MainLayout,
  },
  {
    path: "/blog",
    element: BlogPage,
    layout: MainLayout,
  },
  {
    path: "/contact",
    element: ContactPage,
    layout: MainLayout,
  },
];

const privateRoutes = [
  {
    path: "/dashboard",
    element: DashboardPage,
    layout: MainLayout,
  },
];

export { publicRoutes, privateRoutes };
