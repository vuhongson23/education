import classNames from "classnames/bind";

import styles from "./Sidebar.module.scss";
import { NavLink } from "react-router-dom";
import { LogOutIcon } from "~/assets/icons";

interface SideBarProps {
  menu?: {
    icon: React.ReactElement;
    title: string;
    to: string;
  }[];
  title?: string;
}

const cx = classNames.bind(styles);

const SideBar = ({ menu, title }: SideBarProps) => {
  const handleLogOut = () => {
    localStorage.clear();
    sessionStorage.clear();
  };
  return (
    <div className={cx("side-bar")}>
      <h2 className={cx("side-bar--title")}>{title}</h2>
      <div className={cx("side-bar--menu-list")}>
        {menu?.map((item) => {
          return (
            <NavLink
              key={item.title}
              className={({ isActive }) =>
                cx("side-bar--menu-item", {
                  active: isActive,
                })
              }
              to={item.to}
            >
              <span>{item.icon}</span>
              {item.title}
            </NavLink>
          );
        })}
        <NavLink
          className={({ isActive }) =>
            cx("side-bar--menu-item", {
              active: isActive,
            })
          }
          to={"/logout"}
          onClick={handleLogOut}
        >
          <LogOutIcon />
          Log out
        </NavLink>
      </div>
    </div>
  );
};

export default SideBar;
