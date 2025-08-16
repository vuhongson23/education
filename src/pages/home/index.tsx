import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import { toast } from "react-toastify";

import styles from "./Home.module.scss";
import Banner from "~/modules/banner";
import Feature from "~/modules/features";
import NewestUpdate from "~/modules/newest";
import RelatedPosts from "~/modules/related-post";
import { getDataAPINoAuth } from "~/utils/api";
import { URL_GET_ALL_POST } from "~/api/end-point";
import type { PostTypes } from "~/constant/type/type";

const cx = classNames.bind(styles);

const HomePage = () => {
  const [posts, setPosts] = useState<PostTypes[]>([]);

  const fetchData = async () => {
    try {
      const response = await getDataAPINoAuth(URL_GET_ALL_POST, {
        pageNo: 1,
        pageSize: 1000,
        search: "",
      });
      if (response?.status === 200) {
        setPosts(response?.data?.content);
      }
    } catch (error) {
      toast.error("Lấy danh sách bài viết không thành công");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className={cx("wrapper")}>
      <Banner />
      <Feature posts={posts} />
      <NewestUpdate />
      <RelatedPosts />
    </div>
  );
};

export default HomePage;
