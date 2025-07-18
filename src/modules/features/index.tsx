import classNames from "classnames/bind";

import styles from "./Feature.module.scss";
import Title from "~/components/title";
import PostCard from "~/components/post-card";

const cx = classNames.bind(styles);
const Feature = () => {
  return (
    <div className={cx("wrapper")}>
      <Title>Features</Title>
      <div className={cx("posts-list")}>
        <PostCard></PostCard>
        <PostCard></PostCard>
        <PostCard></PostCard>
      </div>
    </div>
  );
};

export default Feature;
