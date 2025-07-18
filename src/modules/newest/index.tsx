import classNames from "classnames/bind";

import styles from "./NewestUpdate.module.scss";
import Title from "~/components/title";
import PostCard from "~/components/post-card";

const cx = classNames.bind(styles);

const NewestUpdate = () => {
  return (
    <div className={cx("wrapper")}>
      <Title>Newest Updates</Title>
      <div className={cx("content")}>
        <PostCard variant="secondary"></PostCard>
        <div className={cx("sidebar-posts")}>
          {Array(3)
            .fill(0)
            .map((_, index) => (
              <div key={index}>
                <PostCard variant="secondary" className={cx("sidebar-post")} />
                <span className={cx("underline")}></span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default NewestUpdate;
