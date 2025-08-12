import { useOutletContext } from "react-router-dom";
import classNames from "classnames/bind";

import styles from "./ApprovedPosts.module.scss";
import PostItem from "~/components/post-item";

const cx = classNames.bind(styles);

const ApprovedPosts = () => {
  const value: any = useOutletContext();
  return (
    <div className={cx("wrapper")}>
      {value.map((item: any) => {
        return (
          <PostItem
            key={item.id}
            category={item.category}
            title={item.title}
            createdAt={item.createdAt}
            excerpt={item.excerpt}
            image={item.image}
            status={item.status}
          ></PostItem>
        );
      })}
    </div>
  );
};

export default ApprovedPosts;
