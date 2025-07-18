import classNames from "classnames/bind";

import styles from "./Header.module.scss";
import { NavLink } from "react-router-dom";
import Button from "~/components/button";
import Search from "~/components/search";

const cx = classNames.bind(styles);

const Header = () => {
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
        <div className={cx("action")}>
          <Button variant="secondary">Sign Up</Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
