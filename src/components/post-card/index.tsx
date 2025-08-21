import classNames from "classnames/bind";
import styles from "./PostCard.module.scss";
import PostContent from "~/components/post-content";
import { Link } from "react-router-dom";
import type { PostDetailTypes } from "~/constant/type/type";

interface PostCardProps {
  variant?: "primary" | "secondary";
  className?: string;
  postData?: PostDetailTypes | any;
}

const cx = classNames.bind(styles);

const PostCard = ({
  variant = "primary",
  className,
  postData,
}: PostCardProps) => {
  if (!postData) return;
  const { thumbnail, slug, ...content } = postData;
  return (
    <Link to={`/${slug}`} className={cx("link")}>
      <div
        className={cx("post-card", `post-card--${variant}`, {
          [className || ""]: !!className,
        })}
      >
        {variant === "primary" && <div className={cx("overlay")} />}
        <img
          src={import.meta.env.VITE_PREFIX_URL + thumbnail}
          alt=""
          className={cx("post-card__image", `post-card__image--${variant}`)}
        />
        <PostContent variant={variant} content={content} />
      </div>
    </Link>
  );
};

export default PostCard;
