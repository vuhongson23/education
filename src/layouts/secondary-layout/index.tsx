import classNames from "classnames/bind";

import styles from "./SecondaryLayout.module.scss";
import { Outlet } from "react-router-dom";
import Header from "~/modules/header";

const cx = classNames.bind(styles);

const SecondaryLayout = () => {
  return (
    <div className={cx("wrapper")}>
      <Header kind="secondary" />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default SecondaryLayout;
