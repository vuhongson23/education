import classNames from "classnames/bind";
import { Outlet } from "react-router-dom";

import Header from "~/modules/header";
import styles from "./MainLayout.module.scss";

const cx = classNames.bind(styles);

const MainLayout = () => {
  return (
    <div className={cx("wrapper")}>
      <Header></Header>
      <Outlet />
    </div>
  );
};

export default MainLayout;
