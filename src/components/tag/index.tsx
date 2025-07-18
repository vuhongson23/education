import classNames from "classnames/bind";

import styles from "./Tag.module.scss";

const cx = classNames.bind(styles);

const Tag = ({ children }: { children: React.ReactNode }) => {
  return <div className={cx("tag")}>{children}</div>;
};

export default Tag;
