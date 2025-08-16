import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import { toast } from "react-toastify";
import parse from "html-react-parser";

import styles from "./PostDetailPage.module.scss";
import PostCard from "~/components/post-card";
import RelatedPosts from "~/modules/related-post";
import { getDataAPINoAuth } from "~/utils/api";
import {
  URL_GET_POST_BY_CONDITION,
  URL_GET_POST_BY_SLUG,
} from "~/api/end-point";
import type { PostDetailTypes } from "~/constant/type/type";

const cx = classNames.bind(styles);

const PostDetailPage = () => {
  const [postData, setPostData] = useState<PostDetailTypes | any>({});
  const [relatedPosts, setRelatedPost] = useState<PostDetailTypes[]>([]);
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

  const fetchReletedPosts = async (categoryId: number) => {
    try {
      const response = await getDataAPINoAuth(URL_GET_POST_BY_CONDITION, {
        pageNo: 1,
        pageSize: 100,
        categoryId: categoryId,
      });
      if (response?.status === 200) {
        setRelatedPost(response?.data?.content);
      }
    } catch (error) {
      toast.error("Lấy danh sách bài viết liên quan thất bại");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchPostDetail();
    if (postData?.categoryId) {
      fetchReletedPosts(postData?.categoryId);
    }
  }, [postData?.categoryId, slug]);
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
            src={import.meta.env.VITE_PREFIX_URL + postData?.author?.avatar}
            alt=""
          />
          <div className={cx("author-info")}>
            <h3 className={cx("author-name")}>{postData?.author?.userName}</h3>
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
      <RelatedPosts posts={relatedPosts} />
    </div>
  );
};

export default PostDetailPage;
