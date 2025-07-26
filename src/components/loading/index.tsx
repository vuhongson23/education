import classNames from "classnames/bind";

import styles from "./Loading.module.scss";

const cx = classNames.bind(styles);

const Loading = () => {
  return (
    <div className={cx("wrapper-loading")}>
      <div className={cx("spin")}></div>
      <img src="/logo.png" alt="logo" />
    </div>
  );
};

export default Loading;
