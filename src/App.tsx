import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import PublicRoute from "~/routes/public/PublicRoute";
import { authRoute, privateRoutes, publicRoutes } from "~/routes";
import PrivateRoute from "~/routes/private/PrivateRoute";
import MainLayout from "~/layouts/main-layout";
import NotFoundPage from "~/pages/not-found";
import AuthLayout from "./layouts/auth";

function App() {
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Routes>
        {/*Public route: chỉ login và register */}
        <Route element={<PublicRoute />}>
          <Route element={<AuthLayout />}>
            {authRoute.map((route) => {
              const Page = route.element;
              return <Route path={route.path} element={<Page />} />;
            })}
          </Route>
        </Route>

        {/**Private Route */}
        <Route element={<PrivateRoute />}>
          <Route element={<MainLayout />}>
            {privateRoutes.map((route) => {
              const Elem = route.element;
              return (
                <Route key={route.path} path={route.path} element={<Elem />} />
              );
            })}
          </Route>
        </Route>

        {/**Public route: cho user có account và non-account  */}
        <Route element={<MainLayout />}>
          {publicRoutes.map((route) => {
            const Page = route.element;
            return <Route path={route.path} element={<Page />} />;
          })}
        </Route>

        {/**Route not found */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
