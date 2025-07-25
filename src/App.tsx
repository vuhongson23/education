import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import PublicRoute from "~/routes/public/PublicRoute";
import { authRoute, privateRoutes, profileRoute, publicRoutes } from "~/routes";
import PrivateRoute from "~/routes/private/PrivateRoute";
import MainLayout from "~/layouts/main-layout";
import NotFoundPage from "~/pages/not-found";
import AuthLayout from "~/layouts/auth";
import SecondaryLayout from "~/layouts/secondary-layout";
import ProfileLayout from "~/pages/profile";
import { isAuthenticated } from "~/utils/auth";

function App() {
  const user = isAuthenticated();
  const profileLink = `/profile/${user?.id || "user"}`;
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
          {privateRoutes.map((route) => {
            const Elem = route.element;
            return (
              <Route element={<SecondaryLayout />}>
                <Route key={route.path} path={route.path} element={<Elem />} />
              </Route>
            );
          })}
          {/**Profile route */}
          <Route element={<SecondaryLayout />}>
            <Route element={<ProfileLayout />}>
              <Route
                path={"/profile"}
                element={<Navigate to={profileLink} replace />}
              />
              {profileRoute.map((route) => {
                const Elem = route.element;
                return (
                  <Route
                    key={route.path}
                    path={route.path}
                    element={<Elem />}
                  />
                );
              })}
            </Route>
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
