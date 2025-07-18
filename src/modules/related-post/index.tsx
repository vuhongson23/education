import classNames from "classnames/bind";

import styles from "./RelatedPost.module.scss";
import Title from "~/components/title";
import PostCard from "~/components/post-card";

const cx = classNames.bind(styles);

const RelatedPosts = () => {
  return (
    <div className={cx("wrapper")}>
      <Title>Related posts</Title>
      <div className={cx("posts-list")}>
        {Array(4)
          .fill(0)
          .map((_, index) => (
            <PostCard
              key={index}
              variant="secondary"
              className={cx("post-item")}
            ></PostCard>
          ))}
      </div>
    </div>
  );
};

export default RelatedPosts;
