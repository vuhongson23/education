import { Route, Routes } from "react-router-dom";

import PublicRoute from "~/routes/public/PublicRoute";
import { privateRoutes, publicRoutes } from "~/routes";
import PrivateRoute from "~/routes/private/PrivateRoute";
import MainLayout from "~/layouts/main-layout";
import NotFoundPage from "~/pages/not-found";

function App() {
  return (
    <div>
      <Routes>
        {/**Public route */}
        <Route element={<PublicRoute />}>
          {publicRoutes.map((route) => {
            const Layout = route.layout;
            const Page = route.element;
            return (
              <Route key={route.path} element={<Layout />}>
                <Route path={route.path} element={<Page />} />;
              </Route>
            );
          })}
        </Route>
        {/**Private route */}
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
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
