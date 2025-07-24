import classNames from "classnames/bind";

import styles from "./Header.module.scss";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "~/components/button";
import Search from "~/components/search";

const cx = classNames.bind(styles);

const Header = () => {
  const userInfor = localStorage.getItem("user_infor");
  const user = userInfor ? JSON.parse(userInfor) : null;
  const navigate = useNavigate();

  return (
    <div className={cx("wrapper")}>
      <div className={cx("wrapper-left")}>
        <img src="logo.png" alt="" className={cx("logo")} />
        <div className={cx("nav-bar")}>
          <NavLink to={"/"}>Home</NavLink>
          <NavLink to={"/blog"}>Blog</NavLink>
          <NavLink to={"/contact"}>Contact</NavLink>
        </div>
      </div>
      <div className={cx("wrapper-right")}>
        <Search />
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
