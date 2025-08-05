import classNames from "classnames/bind";
import { useState, type ChangeEvent } from "react";

import styles from "./CategoryManager.module.scss";
import MultiInput from "~/components/multi-input";
import useDebounce from "~/hooks/useDebounce";
import { GlassIcon } from "~/assets/icons";
import Button from "~/components/button";
import { Table } from "antd";

const cx = classNames.bind(styles);

const CategoryManager = () => {
  const [searchParams, setSearchParams] = useState<string>("");
  const debounceValue = useDebounce(searchParams, 500);
  console.log("🚀 ~ UserManager ~ debounceValue:", debounceValue);

  const handleSearchParams = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchParams(e.target.value);
  };

  return (
    <div className={cx("wrapper")}>
      <h1 className={cx("title")}>Category manager</h1>
      <div className={cx("content")}>
        <div className={cx("content-filter")}>
          {/**Filter and create user button */}
          <MultiInput
            name="search"
            value={searchParams}
            type="text"
            rightIcon={<GlassIcon />}
            onChange={handleSearchParams}
            placeholder="Enter user name..."
            className={cx("search-input")}
          />
          <Button variant="primary" className={cx("cre-btn")}>
            Create new user
          </Button>
        </div>
        <div className={cx("content-table")}>
          <Table></Table>
        </div>
      </div>
    </div>
  );
};

export default CategoryManager;
