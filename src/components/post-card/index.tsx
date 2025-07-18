import classNames from "classnames/bind";
import styles from "./PostCard.module.scss";
import PostContent from "~/components/post-content";

interface PostCardProps {
  variant?: "primary" | "secondary";
  className?: string;
}

const cx = classNames.bind(styles);

const PostCard = ({ variant = "primary", className }: PostCardProps) => {
  return (
    <div
      className={cx("post-card", `post-card--${variant}`, {
        [className || ""]: !!className,
      })}
    >
      {variant === "primary" && <div className={cx("overlay")}></div>}
      <img
        src="https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt=""
        className={cx("post-card__image", `post-card__image--${variant}`)}
      />
      <PostContent variant={variant}></PostContent>
    </div>
  );
};

export default PostCard;
