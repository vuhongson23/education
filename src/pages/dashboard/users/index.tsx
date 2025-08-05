import classNames from "classnames/bind";

import styles from "./UserManager.module.scss";
import MultiInput from "~/components/multi-input";
import { GlassIcon } from "~/assets/icons";
import { useState, type ChangeEvent } from "react";
import useDebounce from "~/hooks/useDebounce";
import Button from "~/components/button";
import { Table } from "antd";
import ColumnUserTable from "./column";

const cx = classNames.bind(styles);

const fakeUsers = [
  {
    id: 1,
    username: "johndoe",
    avatar: "https://i.pravatar.cc/150?img=1",
    email: "johndoe@example.com",
    createdAt: "2025-07-01T10:20:30Z",
    status: "active",
  },
  {
    id: 2,
    username: "janedoe",
    avatar: "https://i.pravatar.cc/150?img=2",
    email: "janedoe@example.com",
    createdAt: "2025-06-15T08:10:00Z",
    status: "pending",
  },
  {
    id: 3,
    username: "michaelnguyen",
    avatar: "https://i.pravatar.cc/150?img=3",
    email: "michael@example.com",
    createdAt: "2025-05-25T15:45:00Z",
    status: "pending",
  },
  {
    id: 4,
    username: "ngoctran",
    avatar: "https://i.pravatar.cc/150?img=4",
    email: "ngoctran@example.com",
    createdAt: "2025-03-12T11:30:00Z",
    status: "banned",
  },
  {
    id: 5,
    username: "hoanglong",
    avatar: "https://i.pravatar.cc/150?img=5",
    email: "longhoang@example.com",
    createdAt: "2025-01-05T09:00:00Z",
    status: "active",
  },
];

const UserManager = () => {
  const [searchParams, setSearchParams] = useState<string>("");
  const debounceValue = useDebounce(searchParams, 500);
  console.log("🚀 ~ UserManager ~ debounceValue:", debounceValue);
  const userList = fakeUsers.map((user) => {
    return {
      ...user,
      key: user?.id,
    };
  });

  const handleViewInfo = (id: number) => {
    console.log("🚀 ~ handleViewInfo ~ id:", id);
  };
  const handleUpdateUser = (id: number) => {
    console.log("🚀 ~ handleUpdateUser ~ id:", id);
  };
  const handleDeleteUser = (id: number) => {
    console.log("🚀 ~ handleDeleteUser ~ id:", id);
  };

  const columns = ColumnUserTable(
    handleViewInfo,
    handleUpdateUser,
    handleDeleteUser
  );

  const handleSearchParams = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchParams(e.target.value);
  };

  return (
    <div className={cx("wrapper")}>
      <h1 className={cx("title")}>User manager</h1>
      <div className={cx("content")}>
        {/**Filter and create user button */}
        <div className={cx("content-filter")}>
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

        {/**Detail Table */}
        <div className={cx("content-table")}>
          <Table columns={columns} dataSource={userList}></Table>
        </div>
      </div>
    </div>
  );
};

export default UserManager;
