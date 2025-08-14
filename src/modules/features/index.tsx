import classNames from "classnames/bind";
import { Swiper, SwiperSlide } from "swiper/react";

import styles from "./Feature.module.scss";
import Title from "~/components/title";
import PostCard from "~/components/post-card";
import type { PostTypes } from "~/constant/type/type";

interface FeatureProps {
  posts?: PostTypes[];
}

const cx = classNames.bind(styles);

const Feature = ({ posts }: FeatureProps) => {
  if (!posts) return;
  return (
    <div className={cx("wrapper")}>
      <Title>Features</Title>
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

export default Feature;
