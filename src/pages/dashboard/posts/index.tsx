import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import { toast } from "react-toastify";
import { Table } from "antd";

import styles from "./PostManager.module.scss";
import Search from "~/components/search";
import Button from "~/components/button";
import CategoryTableColumn from "./column";
import { routes } from "~/constant/routes";
import type { PostDetailTypes } from "~/constant/type/type";
import { getDataAPINoAuth } from "~/utils/api";
import { URL_GET_ALL_POST } from "~/api/end-point";

const cx = classNames.bind(styles);

const PostManager = () => {
  const [posts, setPosts] = useState<PostDetailTypes[]>([]);
  const [total, setTotal] = useState(1);
  const [page, setPage] = useState(1);

  const fetchData = async () => {
    try {
      const response = await getDataAPINoAuth(URL_GET_ALL_POST, {
        pageNo: page,
        pageSize: 3,
      });
      if (response?.status === 200) {
        const postList = response?.data?.content;
        if (postList?.length > 0) {
          const newPostList = postList.map((post: PostDetailTypes) => {
            return {
              ...post,
              key: post.id,
              author: post.author.userName,
            };
          });
          setPosts(newPostList);
        }
        setTotal(response?.data?.total);
      }
    } catch (error) {
      toast.error("Lấy danh sách bài viết thất bại");
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const navigate = useNavigate();

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

  return (
    <div className={cx("wrapper")}>
      <h1 className={cx("title")}>Post manager</h1>
      <div className={cx("content")}>
        <div className={cx("content-filter")}>
          <Search />

          <Button
            variant="primary"
            className={cx("cre-btn")}
            onClick={() => navigate(routes.postAddNew)}
          >
            Write new post
          </Button>
        </div>
        <div className={cx("content-table")}>
          <Table
            columns={columns}
            dataSource={posts}
            pagination={{
              pageSize: 3,
              total: total,
              onChange: (page) => {
                setPage(page);
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default PostManager;
