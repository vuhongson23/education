import classNames from "classnames/bind";

import { GlassIcon } from "~/assets/icons";
import styles from "./Search.module.scss";

const cx = classNames.bind(styles);

const Search = () => {
  return (
    <div className={cx("wrapper")}>
      <input
        type="text"
        className={cx("input")}
        placeholder="Search posts..."
      />
      <span className={cx("icon")}>
        <GlassIcon />
      </span>
    </div>
  );
};

export default Search;
