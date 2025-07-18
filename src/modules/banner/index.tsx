import classNames from "classnames/bind";

import styles from "./Banner.module.scss";
import Button from "~/components/button";

const cx = classNames.bind(styles);

const Banner = () => {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("content")}>
        <h1 className={cx("title")}>Monkey Blogging</h1>
        <p className={cx("desc")}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi.
        </p>
        <Button variant="third">Get started</Button>
      </div>
      <img src="banner.png" alt="" className={cx("logo")} />
    </div>
  );
};

export default Banner;
