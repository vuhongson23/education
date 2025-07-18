import classNames from "classnames/bind";
import { Outlet } from "react-router-dom";

import styles from "./Auth.module.scss";

const cx = classNames.bind(styles);

const AuthLayout = () => {
  return (
    <main className={cx("wrapper")}>
      <div className={cx("wrapper-logo")}>
        <img src="logo.png" alt="logo" className={cx("logo")} />
        <h2 className={cx("title")}>Monkey Blogging</h2>
      </div>
      <Outlet />
    </main>
  );
};

export default AuthLayout;
