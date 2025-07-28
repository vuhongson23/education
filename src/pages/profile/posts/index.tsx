import classNames from "classnames/bind";

import styles from "./Posts.module.scss";
import Search from "~/components/search";
import Button from "~/components/button";
import { NavLink, Outlet } from "react-router-dom";
import { useState } from "react";

const cx = classNames.bind(styles);

type PostType = "all" | "approved" | "pending";

const postTab: {
  to: string;
  title: string;
  count: number;
  type: PostType;
}[] = [
  {
    to: "/profile/posts/all",
    title: "All",
    count: 24,
    type: "all",
  },
  {
    to: "/profile/posts/approved",
    title: "Approved",
    count: 5,
    type: "approved",
  },
  {
    to: "/profile/posts/pending",
    title: "Pending",
    count: 1,
    type: "pending",
  },
];

const Posts = () => {
  const [typePost, setTypePost] = useState<PostType>("all");
  console.log("🚀 ~ Posts ~ typePost:", typePost);
  const posts = [
    {
      id: 1,
      title: "Hướng dẫn xây dựng blog cá nhân với React và Node.js",
      excerpt:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
      category: "Technology",
      status: "published",
      createdAt: "2025-07-28",
      image:
        "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      author: "Vũ Hồng Sơn",
    },
    {
      id: 2,
      title: "10 mẹo để tăng năng suất làm việc từ xa",
      excerpt:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat...",
      category: "Lifestyle",
      status: "draft",
      createdAt: "2025-07-27",
      image:
        "https://plus.unsplash.com/premium_photo-1676823553207-758c7a66e9bb?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      author: "Vũ Hồng Sơn",
    },
    {
      id: 3,
      title: "Xu hướng thiết kế UI/UX năm 2025",
      excerpt:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur...",
      category: "Design",
      status: "published",
      createdAt: "2025-07-25",
      image:
        "https://plus.unsplash.com/premium_photo-1661766077694-6e3750b0fb97?q=80&w=1331&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      author: "Vũ Hồng Sơn",
    },
    {
      id: 4,
      title: "Cách tối ưu hóa website cho tốc độ tải nhanh",
      excerpt:
        "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum...",
      category: "Tutorial",
      status: "pending",
      createdAt: "2025-07-24",
      image:
        "https://plus.unsplash.com/premium_photo-1664301231899-5a7b1a621238?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      author: "Vũ Hồng Sơn",
    },
    {
      id: 5,
      title: "Khởi nghiệp trong thời đại số - Những điều cần biết",
      excerpt:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium...",
      category: "Business",
      status: "published",
      createdAt: "2025-07-22",
      image:
        "https://images.unsplash.com/photo-1602595688238-9fffe12d5af3?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      author: "Vũ Hồng Sơn",
    },
  ];

  const handleNavigate = (type: PostType) => {
    setTypePost(type);
  };
  return (
    <div className={cx("wrapper")}>
      <h2 className={cx("title")}>My Posts</h2>
      <div className={cx("filter-wrapper")}>
        <div className={cx("filter-bar")}>
          <Search className={cx("filter-search")} />
          <Button variant="primary" className={cx("filter-btn")}>
            Write new post
          </Button>
        </div>
        <div className={cx("filter-tab")}>
          {postTab.map((tab) => (
            <NavLink
              key={tab.to}
              to={tab.to}
              className={({ isActive }) =>
                cx("filter-item", {
                  active: isActive,
                })
              }
              onClick={() => handleNavigate(tab.type)}
            >
              <p className={cx("filter-item--title")}>{tab.title}</p>
              <span className={cx("count")}>{tab.count}</span>
            </NavLink>
          ))}
        </div>
      </div>
      <div className={cx("content")}>
        <Outlet context={posts} />
      </div>
    </div>
  );
};

export default Posts;
