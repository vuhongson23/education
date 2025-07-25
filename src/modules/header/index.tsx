import classNames from "classnames/bind";
import { NavLink, useNavigate } from "react-router-dom";

import styles from "./Header.module.scss";
import Button from "~/components/button";
import Search from "~/components/search";
import { routes } from "~/constant/routes";
import { isAuthenticated } from "~/utils/auth";
import { DashboardIcon, LogOutIcon, UserIcon } from "~/assets/icons";

interface HeaderProps {
  kind?: "primary" | "secondary";
}

const cx = classNames.bind(styles);

const Header = ({ kind = "primary" }: HeaderProps) => {
  const navigate = useNavigate();
  const user = isAuthenticated();

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
  };

  const profileLink = user?.id ? `/profile/${user.id}` : routes.profileByUser;

  return (
    <div className={cx("wrapper", `wrapper--${kind}`)}>
      <div className={cx("wrapper-left")}>
        <img
          src="/logo.png"
          alt=""
          className={cx("logo")}
          onClick={() => navigate("/")}
        />
        {kind === "primary" ? (
          <div className={cx("nav-bar")}>
            <NavLink to={routes.home}>Home</NavLink>
            <NavLink to={routes.blog}>Blog</NavLink>
            <NavLink to={routes.contact}>Contact</NavLink>
          </div>
        ) : (
          <div onClick={() => navigate("/")} className={cx("brand-title")}>
            Monkey blogging
          </div>
        )}
      </div>
      <div className={cx("wrapper-right")}>
        {kind === "primary" && <Search />}
        {user && user?.userName ? (
          <div className={cx("user-action")}>
            <p>
              Xin chào,{" "}
              <span className={cx("user-name")}>{user?.userName}</span>
            </p>
            <img
              src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?q=80&w=765&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="avatar"
              className={cx("user-avatar")}
            />
            <div className={cx("controller-list")}>
              <NavLink to={profileLink} className={cx("controller-item")}>
                <UserIcon /> Profile
              </NavLink>
              <NavLink to={routes.dashboard} className={cx("controller-item")}>
                <DashboardIcon /> Dashboard
              </NavLink>
              <NavLink
                to={routes.dashboard}
                className={cx("controller-item")}
                onClick={handleLogout}
              >
                <LogOutIcon /> Log out
              </NavLink>
            </div>
          </div>
        ) : (
          <Button variant="secondary" onClick={() => navigate("/register")}>
            Sign Up
          </Button>
        )}
      </div>
    </div>
  );
};

export default Header;
