import classNames from "classnames/bind";

import styles from "./PostManager.module.scss";
import Search from "~/components/search";
import Button from "~/components/button";
import { Table } from "antd";
import CategoryTableColumn from "./column";

const cx = classNames.bind(styles);

export const fakePostData = [
  {
    id: 1,
    title: "Hướng dẫn React căn bản",
    thumbnail:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    author: "Nguyễn Văn A",
    status: "published",
  },
  {
    id: 2,
    title: "Tối ưu hiệu năng với useMemo",
    thumbnail:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    author: "Trần Thị B",
    status: "draft",
  },
  {
    id: 3,
    title: "Tạo blog cá nhân với Next.js",
    thumbnail:
      "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    author: "Lê Văn C",
    status: "pending",
  },
  {
    id: 4,
    title: "Giới thiệu Redux Toolkit",
    thumbnail:
      "https://plus.unsplash.com/premium_photo-1681399975135-252eab5fd2db?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    author: "Phạm Thị D",
    status: "rejected",
  },
  {
    id: 5,
    title: "Sử dụng Zustand thay thế Redux",
    thumbnail:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    author: "Ngô Văn E",
    status: "published",
  },
  {
    id: 6,
    title: "Triển khai CI/CD với GitHub Actions",
    thumbnail:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    author: "Lê Thị F",
    status: "draft",
  },
  {
    id: 7,
    title: "Tối ưu SEO trong ứng dụng Next.js",
    thumbnail:
      "https://plus.unsplash.com/premium_photo-1661963874418-df1110ee39c1?q=80&w=1086&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    author: "Võ Văn G",
    status: "pending",
  },
  {
    id: 8,
    title: "Xây dựng trang admin bằng Ant Design",
    thumbnail:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    author: "Phan Thị H",
    status: "rejected",
  },
  {
    id: 9,
    title: "Authentication với Firebase",
    thumbnail:
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    author: "Đặng Văn I",
    status: "published",
  },
  {
    id: 10,
    title: "Sử dụng Tailwind CSS với React",
    thumbnail:
      "https://plus.unsplash.com/premium_photo-1683121696175-d05600fefb85?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    author: "Nguyễn Thị K",
    status: "draft",
  },
];

const PostManager = () => {
  const handleViewInfo = (id: number) => {
    console.log("🚀 ~ handleViewInfo ~ id:", id);
  };
  const handleUpdatePost = (id: number) => {
    console.log("🚀 ~ handleViewInfo ~ id:", id);
  };
  const handleDeletePost = (id: number) => {
    console.log("🚀 ~ handleViewInfo ~ id:", id);
  };

  const columns = CategoryTableColumn(
    handleViewInfo,
    handleUpdatePost,
    handleDeletePost
  );

  const fakeData = fakePostData.map((item: any) => {
    return {
      ...item,
      key: item.id,
    };
  });

  return (
    <div className={cx("wrapper")}>
      <h1 className={cx("title")}>Post manager</h1>
      <div className={cx("content")}>
        <div className={cx("content-filter")}>
          <Search />

          <Button variant="primary" className={cx("cre-btn")}>
            Write new post
          </Button>
        </div>
        <div className={cx("content-table")}>
          <Table columns={columns} dataSource={fakeData}></Table>
        </div>
      </div>
    </div>
  );
};

export default PostManager;
