import classNames from "classnames/bind";

import { GlassIcon } from "~/assets/icons";
import styles from "./Search.module.scss";

interface SearchProps {
  className?: string;
}

const cx = classNames.bind(styles);

const Search = ({ className }: SearchProps) => {
  return (
    <div
      className={cx("wrapper", {
        [className || ""]: !!className,
      })}
    >
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
