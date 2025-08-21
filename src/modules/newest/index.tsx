import classNames from "classnames/bind";

import styles from "./NewestUpdate.module.scss";
import Title from "~/components/title";
import PostCard from "~/components/post-card";
import type { PostTypes } from "~/constant/type/type";
import PostCardSkeleton from "~/components/skeleton";

interface NewestPostsProps {
  posts: PostTypes[];
  isLoading?: boolean;
}

const cx = classNames.bind(styles);

const NewestUpdate = ({ posts, isLoading }: NewestPostsProps) => {
  if (!posts) return;
  const [primaryPosts, ...secondaryPosts] = posts;

  return (
    <div className={cx("wrapper")}>
      <Title>Newest Updates</Title>
      <div className={cx("content")}>
        {!isLoading ? (
          <PostCard postData={primaryPosts} variant="secondary" />
        ) : (
          <PostCardSkeleton variant="secondary" />
        )}

        <div className={cx("sidebar-posts")}>
          {secondaryPosts.length !== 0 &&
            secondaryPosts.map((post: PostTypes) => (
              <div key={post.id}>
                {!isLoading ? (
                  <PostCard
                    postData={post}
                    variant="secondary"
                    className={cx("sidebar-post")}
                  />
                ) : (
                  <PostCardSkeleton variant="ternary" />
                )}
                <span className={cx("underline")} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default NewestUpdate;
