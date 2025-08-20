import dayjs from "dayjs";
import classNames from "classnames/bind";

import styles from "./CategoryManager.module.scss";
import { DeleteIcon, EditIcon, ViewIcon } from "~/assets/icons";
import { CATEGORY_STATUS } from "~/constant/constant";
import { Tooltip } from "antd";

const cx = classNames.bind(styles);

const ColumnCategoryTable = (
  handleViewInfo: (id: number) => void,
  handleUpdateCategory: (id: number) => void,
  handleDeleteCategory: (id: number) => void
) => {
  return [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Thumbnail",
      dataIndex: "image",
      key: "image",
      render: (value: string) => {
        // const avatarUrl = value ? import.meta.env.VITE_PREFIX_URL + value : "";
        return (
          <img
            src={value}
            alt={"thumbnail-category"}
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
          case CATEGORY_STATUS.ACTIVE: {
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

          case CATEGORY_STATUS.DELETE: {
            return (
              <span
                className={cx("tag")}
                style={{
                  borderColor: "#ffa39e",
                  backgroundColor: "#fff1f0",
                  color: "#cf1322",
                }}
              >
                delete
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
                onClick={() => handleUpdateCategory(userId)}
              >
                <EditIcon color="blue"></EditIcon>
              </span>
            </Tooltip>
            <Tooltip title="Delete">
              <span
                style={{ cursor: "pointer" }}
                onClick={() => handleDeleteCategory(userId)}
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

export default ColumnCategoryTable;
