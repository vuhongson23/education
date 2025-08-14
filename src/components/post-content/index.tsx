import classNames from "classnames/bind";

import styles from "./PostContent.module.scss";
import Tag from "~/components/tag";
import dayjs from "dayjs";
import type { PostDetailTypes } from "~/constant/type/type";

interface PostContent {
  variant?: "primary" | "secondary";
  content?: PostDetailTypes;
}

const cx = classNames.bind(styles);

const PostContent = ({ variant = "primary", content }: PostContent) => {
  if (!content) return;
  const createdAt = dayjs(content?.createdAt).format("DD/MM/YYYY");
  if (variant === "primary") {
    return (
      <div
        className={cx("post-card__content", `post-card__content--${variant}`)}
      >
        <div className={cx("post-card__header")}>
          <Tag>{content?.category?.title}</Tag>
          <div className={cx("post-card__meta")}>
            <span className={cx("post-card__date")}>{createdAt}</span>
            <span className={cx("post-card__separator")} />
            <span className={cx("post-card__author")}>
              {content?.author?.userName}
            </span>
          </div>
        </div>
        <p className={cx("post-card__title")}>{content?.title}</p>
      </div>
    );
  } else {
    return (
      <div
        className={cx("post-card__content", `post-card__content--${variant}`)}
      >
        <Tag>{content?.category?.title}</Tag>
        <p className={cx("post-card__title")}>{content?.title}</p>
        <div className={cx("post-card__meta", `post-card__meta--${variant}`)}>
          <span className={cx("post-card__date")}>{createdAt}</span>
          <span
            className={cx(
              "post-card__separator",
              `post-card__separator--${variant}`
            )}
          />
          <span className={cx("post-card__author")}>
            {content?.author?.userName}
          </span>
        </div>
      </div>
    );
  }
};

export default PostContent;
