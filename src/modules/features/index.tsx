import classNames from "classnames/bind";

import styles from "./Feature.module.scss";
import Title from "~/components/title";
import PostCard from "~/components/post-card";

interface FeatureProps {
  posts?: any;
}

const cx = classNames.bind(styles);

const Feature = ({ posts }: FeatureProps) => {
  return (
    <div className={cx("wrapper")}>
      <Title>Features</Title>
      <div className={cx("posts-list")}>
        {posts?.length > 0 &&
          posts?.map((post: any) => (
            <PostCard key={post?.id} postData={post}></PostCard>
          ))}
      </div>
    </div>
  );
};

export default Feature;
