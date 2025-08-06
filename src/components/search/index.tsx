import classNames from "classnames/bind";

import { GlassIcon } from "~/assets/icons";
import styles from "./Search.module.scss";
import type { ChangeEvent } from "react";

interface SearchProps {
  className?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const cx = classNames.bind(styles);

const Search = ({ className, onChange = () => {} }: SearchProps) => {
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
        onChange={onChange}
      />
      <span className={cx("icon")}>
        <GlassIcon />
      </span>
    </div>
  );
};

export default Search;
