import classNames from "classnames/bind";

import styles from "./ProfilePage.module.scss";
import { NavLink, Outlet, useParams } from "react-router-dom";
import {
  GearIcon,
  HeartCircleIcon,
  LogOutIcon,
  PostIcon,
  UserIcon,
} from "~/assets/icons";
import { isAuthenticated } from "~/utils/auth";

const cx = classNames.bind(styles);

const ProfileLayout = () => {
  const { id } = useParams();
  console.log("🚀 ~ ProfileLayout ~ id:", id);
  const user = isAuthenticated();

  const menus = [
    {
      icon: UserIcon,
      title: "Profile",
      to: `/profile/${id || user?.id || user}`,
    },
    {
      icon: PostIcon,
      title: "Posts",
      to: "/profile/posts",
    },
    {
      icon: HeartCircleIcon,
      title: "Favourite",
      to: "/profile/favourite",
    },
    {
      icon: GearIcon,
      title: "Setting",
      to: "/profile/setting",
    },
    {
      icon: LogOutIcon,
      title: "Log out",
      to: "",
    },
  ];

  return (
    <div className={cx("wrapper")}>
      <div className={cx("side-bar")}>
        <h2 className={cx("side-bar--title")}>Profile</h2>
        <div className={cx("side-bar--menu-list")}>
          {menus.map((menu) => {
            const Icon = menu.icon;
            return (
              <NavLink
                key={menu.title}
                className={({ isActive }) =>
                  cx("side-bar--menu-item", {
                    active: isActive,
                  })
                }
                to={menu.to}
              >
                <Icon />
                {menu.title}
              </NavLink>
            );
          })}
        </div>
      </div>
      <div className={cx("content")}>
        <Outlet />
      </div>
    </div>
  );
};

export default ProfileLayout;
