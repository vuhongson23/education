import classNames from "classnames/bind";

import styles from "./PostManager.module.scss";
import { POST_STATUS } from "~/constant/constant";
import { DeleteIcon, EditIcon, ViewIcon } from "~/assets/icons";
import { Tooltip } from "antd";

const cx = classNames.bind(styles);

const PostTableColumn = (
  handleViewInfo: (slug: string) => void,
  handleUpdatePost: (slug: string, id: number) => void,
  handleDeletePost: (id: number) => void
) => {
  return [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: 250,
      render: (value: string) => <p className={cx("title-post")}>{value}</p>,
    },
    {
      title: "Thumbnail",
      dataIndex: "thumbnail",
      key: "thumbnail",
      render: (value: string) => {
        return (
          <img
            src={import.meta.env.VITE_PREFIX_URL + value}
            alt="thumbnail"
            style={{ height: 60, width: 100, objectFit: "cover" }}
          />
        );
      },
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (value: number) => {
        switch (value) {
          case POST_STATUS.PUBLISHED: {
            return (
              <span
                className={cx("tag")}
                style={{
                  borderColor: "#b7eb8f",
                  backgroundColor: "#f6ffed",
                  color: "#389e0d",
                }}
              >
                published
              </span>
            );
          }

          case POST_STATUS.PENDING: {
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

          case POST_STATUS.DRAFT: {
            return (
              <span
                className={cx("tag")}
                style={{
                  borderColor: "#87e8de",
                  backgroundColor: "#e6fffb",
                  color: "#08979c",
                }}
              >
                draft
              </span>
            );
          }

          case POST_STATUS.REJECTED: {
            return (
              <span
                className={cx("tag")}
                style={{
                  borderColor: "#ffa39e",
                  backgroundColor: "#fff1f0",
                  color: "#cf1322",
                }}
              >
                rejected
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
        const { slug, id } = record;
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
                onClick={() => handleViewInfo(slug)}
              >
                <ViewIcon color="green"></ViewIcon>
              </span>
            </Tooltip>
            <Tooltip title="Edit">
              <span
                style={{ cursor: "pointer" }}
                onClick={() => handleUpdatePost(slug, id)}
              >
                <EditIcon color="blue"></EditIcon>
              </span>
            </Tooltip>
            <Tooltip title="Delete">
              <span
                style={{ cursor: "pointer" }}
                onClick={() => handleDeletePost(id)}
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

export default PostTableColumn;
