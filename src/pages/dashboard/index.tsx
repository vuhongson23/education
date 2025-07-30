import classNames from "classnames/bind";

import styles from "./Dashboard.module.scss";
import SideBar from "~/components/side-bar";
import { CategoryIcon, DashboardIcon, UserGroupIcon } from "~/assets/icons";
import { Outlet } from "react-router-dom";

const cx = classNames.bind(styles);

const DashboardLayout = () => {
  const menus = [
    {
      icon: <DashboardIcon />,
      title: "Dashboard",
      to: "/dashboard/manage",
    },
    {
      icon: <UserGroupIcon />,
      title: "Users",
      to: "/dashboard/users",
    },
    {
      icon: <CategoryIcon />,
      title: "Category",
      to: "/dashboard/category",
    },
  ];
  return (
    <div className={cx("wrapper")}>
      <SideBar title="Dashboard" menu={menus} />
      <div className={cx("content")}>
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
