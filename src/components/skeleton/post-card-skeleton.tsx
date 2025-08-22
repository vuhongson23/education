import classNames from "classnames/bind";

import styles from "./Skeleton.module.scss";

interface PostCardSkeletonProps {
  variant?: "primary" | "secondary" | "ternary";
}

const cx = classNames.bind(styles);

const PostCardSkeleton = ({ variant = "primary" }: PostCardSkeletonProps) => {
  switch (variant) {
    case "primary":
      return (
        <div className={cx("post-card")}>
          <div className={cx("thumbnail")} />
          <div className={cx("post-content")}>
            <div className={cx("post-content__header")}>
              <div className={cx("tag")} />
              <div className={cx("meta")} />
            </div>
            <div className={cx("title")}>
              <div className={cx("title-1")} />
              <div className={cx("title-2")} />
              <div className={cx("title-3")} />
            </div>
          </div>
        </div>
      );

    case "secondary":
      return (
        <div className={cx("post-card--secondary")}>
          <div className={cx("thumbnail--secondary")} />
          <div className={cx("post-content--secondary")}>
            <div className={cx("tag--secondary")} />
            <div className={cx("title--secondary")}>
              <div className={cx("title-1--secondary")} />
              <div className={cx("title-2--secondary")} />
              <div className={cx("title-3--secondary")} />
            </div>
            <div className={cx("meta--secondary")} />
          </div>
        </div>
      );

    case "ternary":
      return (
        <div className={cx("post-card--ternary")}>
          <div className={cx("thumbnail--ternary")} />
          <div className={cx("post-content--ternary")}>
            <div className={cx("tag--ternary")} />
            <div className={cx("title--ternary")}>
              <div className={cx("title-1--ternary")} />
              <div className={cx("title-2--ternary")} />
            </div>
            <div className={cx("meta--ternary")} />
          </div>
        </div>
      );

    default:
      break;
  }
};

export default PostCardSkeleton;
