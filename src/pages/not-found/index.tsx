import classNames from "classnames/bind";

import styles from "./NotFoundPage.module.scss";
import Button from "~/components/button";

const cx = classNames.bind(styles);

const NotFoundPage = () => {
  return (
    <div className={cx("wrapper")}>
      <img src="logo.png" alt="" className={cx("logo")} />
      <p className={cx("desc")}>Page Not Found</p>
      <Button variant="primary" className={cx("back-home-btn")}>
        Go Home
      </Button>
    </div>
  );
};

export default NotFoundPage;
