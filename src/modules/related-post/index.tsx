import classNames from "classnames/bind";

import styles from "./RelatedPost.module.scss";
import Title from "~/components/title";
import PostCard from "~/components/post-card";
import { Swiper, SwiperSlide } from "swiper/react";
import type { PostDetailTypes } from "~/constant/type/type";

interface RelatedProps {
  currentPostId?: number;
  posts?: PostDetailTypes[];
}

const cx = classNames.bind(styles);

const RelatedPosts = ({ posts, currentPostId }: RelatedProps) => {
  if (!posts || posts.length === 0) return null;

  const newPostList = posts?.filter((post: any) => post.id !== currentPostId);

  if (newPostList?.length <= 0) return null;
  return (
    <div className={cx("wrapper")}>
      <Title>Related posts</Title>
      <div className={cx("posts-list")}>
        <Swiper slidesPerView={3} className="mySwiper">
          {newPostList?.length > 0 &&
            newPostList?.map((post: any) => (
              <SwiperSlide key={post.id} virtualIndex={post.id}>
                <PostCard postData={post} />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
};

export default RelatedPosts;
