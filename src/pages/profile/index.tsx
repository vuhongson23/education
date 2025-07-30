import classNames from "classnames/bind";

import styles from "./ProfilePage.module.scss";
import { Outlet, useParams } from "react-router-dom";
import { GearIcon, HeartCircleIcon, PostIcon, UserIcon } from "~/assets/icons";
import { isAuthenticated } from "~/utils/auth";
import SideBar from "~/components/side-bar";

const cx = classNames.bind(styles);

const ProfileLayout = () => {
  const { id } = useParams();
  const user = isAuthenticated();

  const menus = [
    {
      icon: <UserIcon />,
      title: "Profile",
      to: `/profile/${id || user?.id || user}`,
    },
    {
      icon: <PostIcon />,
      title: "Posts",
      to: "/profile/posts",
    },
    {
      icon: <HeartCircleIcon />,
      title: "Favourite",
      to: "/profile/favourite",
    },
    {
      icon: <GearIcon />,
      title: "Setting",
      to: "/profile/setting",
    },
  ];

  return (
    <div className={cx("wrapper")}>
      <SideBar menu={menus}></SideBar>
      <div className={cx("content")}>
        <Outlet />
      </div>
    </div>
  );
};

export default ProfileLayout;
