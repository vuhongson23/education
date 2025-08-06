import dayjs from "dayjs";
import classNames from "classnames/bind";

import styles from "./UserManager.module.scss";
import { DeleteIcon, EditIcon, ViewIcon } from "~/assets/icons";
import { USER_STATUS } from "~/constant/constant";
import { Tooltip } from "antd";

const cx = classNames.bind(styles);

const ColumnUserTable = (
  handleViewInfo: (id: number) => void,
  handleUpdateUser: (id: number) => void,
  handleDeleteUser: (id: number) => void
) => {
  return [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Username",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (value: string) => {
        const avatarUrl = value && import.meta.env.VITE_PREFIX_URL + value;
        return (
          <img
            src={avatarUrl}
            alt={"avatar"}
            style={{
              width: 50,
              height: 50,
              objectFit: "cover",
              borderRadius: "100px",
            }}
          />
        );
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Created at",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (value: string) => {
        const dayFormat = dayjs(value).format("DD/MM/YYYY");
        return <p>{dayFormat}</p>;
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (value: number) => {
        switch (value) {
          case USER_STATUS.ACTIVE: {
            return (
              <span
                className={cx("tag")}
                style={{
                  borderColor: "#b7eb8f",
                  backgroundColor: "#f6ffed",
                  color: "#389e0d",
                }}
              >
                active
              </span>
            );
          }

          case USER_STATUS.IN_ACTIVE: {
            return (
              <span
                className={cx("tag")}
                style={{
                  borderColor: "#91caff",
                  backgroundColor: "#e6f4ff",
                  color: "#0958d9",
                }}
              >
                pending
              </span>
            );
          }

          case USER_STATUS.BANNED: {
            return (
              <span
                className={cx("tag")}
                style={{
                  borderColor: "#ffa39e",
                  backgroundColor: "#fff1f0",
                  color: "#cf1322",
                }}
              >
                banned
              </span>
            );
          }

          default:
            break;
        }
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_: any, record: any) => {
        const userId = record?.id;
        return (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              columnGap: "20px",
            }}
          >
            <Tooltip title="View">
              <span
                style={{ cursor: "pointer" }}
                onClick={() => handleViewInfo(userId)}
              >
                <ViewIcon color="green"></ViewIcon>
              </span>
            </Tooltip>
            <Tooltip title="Edit">
              <span
                style={{ cursor: "pointer" }}
                onClick={() => handleUpdateUser(userId)}
              >
                <EditIcon color="blue"></EditIcon>
              </span>
            </Tooltip>
            <Tooltip title="Delete">
              <span
                style={{ cursor: "pointer" }}
                onClick={() => handleDeleteUser(userId)}
              >
                <DeleteIcon color="red"></DeleteIcon>
              </span>
            </Tooltip>
          </div>
        );
      },
    },
  ];
};

export default ColumnUserTable;
