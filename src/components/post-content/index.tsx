import classNames from "classnames/bind";

import styles from "./PostContent.module.scss";
import Tag from "~/components/tag";

interface PostContent {
  variant?: "primary" | "secondary";
}

const cx = classNames.bind(styles);

const PostContent = ({ variant = "primary" }: PostContent) => {
  if (variant === "primary") {
    return (
      <div
        className={cx("post-card__content", `post-card__content--${variant}`)}
      >
        <div className={cx("post-card__header")}>
          <Tag>Kiến thức</Tag>
          <div className={cx("post-card__meta")}>
            <span className={cx("post-card__date")}>Mar 23</span>
            <span className={cx("post-card__separator")} />
            <span className={cx("post-card__author")}>Andiez Le</span>
          </div>
        </div>
        <p className={cx("post-card__title")}>
          Hướng dẫn setup phòng cực chill dành cho người mới toàn tập
        </p>
      </div>
    );
  } else {
    return (
      <div
        className={cx("post-card__content", `post-card__content--${variant}`)}
      >
        <Tag>Kiến thức</Tag>
        <p className={cx("post-card__title")}>
          Hướng dẫn setup phòng cực chill dành cho người mới toàn tập
        </p>
        <div className={cx("post-card__meta", `post-card__meta--${variant}`)}>
          <span className={cx("post-card__date")}>Mar 23</span>
          <span
            className={cx(
              "post-card__separator",
              `post-card__separator--${variant}`
            )}
          />
          <span className={cx("post-card__author")}>Andiez Le</span>
        </div>
      </div>
    );
  }
};

export default PostContent;
