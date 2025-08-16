import classNames from "classnames/bind";

import styles from "./RelatedPost.module.scss";
import Title from "~/components/title";
import PostCard from "~/components/post-card";
import { Swiper, SwiperSlide } from "swiper/react";
import type { PostDetailTypes } from "~/constant/type/type";

interface RelatedProps {
  posts?: PostDetailTypes[];
}

const cx = classNames.bind(styles);

const RelatedPosts = ({ posts }: RelatedProps) => {
  if (!posts) return;
  return (
    <div className={cx("wrapper")}>
      <Title>Related posts</Title>
      <div className={cx("posts-list")}>
        <Swiper slidesPerView={3} className="mySwiper">
          {posts?.length > 0 &&
            posts?.map((post: any) => (
              <SwiperSlide key={post.id} virtualIndex={post.id}>
                <PostCard postData={post}></PostCard>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
};

export default RelatedPosts;
