import classNames from "classnames/bind";
import parse from "html-react-parser";

import styles from "./PostDetailPage.module.scss";
import { useParams } from "react-router-dom";
import PostCard from "~/components/post-card";
import RelatedPosts from "~/modules/related-post";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getDataAPINoAuth } from "~/utils/api";
import { URL_GET_POST_BY_SLUG } from "~/api/end-point";
import type { PostDetailTypes } from "~/constant/type/type";

const cx = classNames.bind(styles);

const PostDetailPage = () => {
  const [postData, setPostData] = useState<PostDetailTypes | any>({});
  const { slug } = useParams();

  const fetchPostDetail = async () => {
    try {
      const response = await getDataAPINoAuth(URL_GET_POST_BY_SLUG + slug);
      if (response?.status === 200) {
        setPostData(response?.data);
      }
    } catch (error) {
      toast.error("Không thể lấy thông tin bài viết");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchPostDetail();
  }, []);
  return (
    <div className={cx("wrapper")}>
      <div className={cx("post-header")}>
        <PostCard
          variant="secondary"
          className="post-header-item"
          postData={postData}
        />
      </div>
      <div className={cx("post-content")}>
        <div className={cx("post-content--entry")}>
          {parse(postData?.content || "")}
        </div>
        <div className={cx("post-content--author")}>
          <img
            className={cx("author-avatar")}
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
          <div className={cx("author-info")}>
            <h3 className={cx("author-name")}>Thu Trang</h3>
            <p className={cx("author-bio")}>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Porro
              maxime ipsum dolor ea dignissimos consequuntur, nulla et ipsa.
              Molestiae qui modi fugit ratione eligendi sint eaque provident eum
              accusantium ea. Adipisci ab nihil ducimus consequuntur
              perferendis, vel aliquid dolorem qui iure ut necessitatibus,
              assumenda corrupti, voluptate ad optio nulla itaque atque
              similique! Quia sit at dolore rerum, doloribus eius commodi!
            </p>
          </div>
        </div>
      </div>
      <RelatedPosts />
    </div>
  );
};

export default PostDetailPage;
