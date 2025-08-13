import classNames from "classnames/bind";

import styles from "./PostDetailPage.module.scss";
import { useParams } from "react-router-dom";
import PostCard from "~/components/post-card";
import RelatedPosts from "~/modules/related-post";
import { useEffect } from "react";

const cx = classNames.bind(styles);

const PostDetailPage = () => {
  const { slug } = useParams();
  console.log("🚀 ~ PostDetailPage ~ slug:", slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className={cx("wrapper")}>
      <div className={cx("post-header")}>
        <PostCard variant="secondary" className="post-header-item" />
      </div>
      <div className={cx("post-content")}>
        <div className={cx("post-content--entry")}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet delectus
          cupiditate sapiente eveniet sed quis asperiores consequuntur commodi
          enim repudiandae dolore aliquam beatae, fugit id distinctio ex autem
          placeat assumenda?
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
