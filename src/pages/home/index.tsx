import classNames from "classnames/bind";

import styles from "./Home.module.scss";
import Banner from "~/modules/banner";
import Feature from "~/modules/features";
import NewestUpdate from "~/modules/newest";
import RelatedPosts from "~/modules/related-post";

const cx = classNames.bind(styles);

const HomePage = () => {
  return (
    <div className={cx("wrapper")}>
      <Banner />
      <Feature />
      <NewestUpdate />
      <RelatedPosts />
    </div>
  );
};

export default HomePage;
