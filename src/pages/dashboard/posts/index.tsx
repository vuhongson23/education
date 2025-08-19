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
import { URL_GET_ALL_POST, URL_GET_POST_BY_SLUG } from "~/api/end-point";
import Modal from "~/modules/modal";
import { POST_STATUS } from "~/constant/constant";
import PostForm from "./post-form";

interface FormValues {
  [key: string]: any;
}

const cx = classNames.bind(styles);

const initValue: FormValues = {
  title: "",
  slug: "",
  thumbnail: "",
  author: "",
  categoryId: 0,
  status: POST_STATUS.PENDING,
  content: "",
};

const PostManager = () => {
  const [posts, setPosts] = useState<PostDetailTypes[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [titleForm, setTitleForm] = useState("");
  const [postInfo, setPostInfo] = useState({});
  console.log("🚀 ~ PostManager ~ postInfo:", postInfo);
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

  const handleViewInfo = async (slug: string) => {
    setShowModal(true);
    setTitleForm("Thông tin bài viết");
    try {
      const response = await getDataAPINoAuth(URL_GET_POST_BY_SLUG + slug);
      if (response?.status === 200) {
        const postData = response?.data;
        setPostInfo({ ...postData, author: postData.author.userName });
      }
    } catch (error) {
      toast.error("Lấy thông tin bài viết thất bại");
    }
  };

  const handleUpdatePost = (id: number) => {
    setShowModal(true);
    setTitleForm(`Cập nhật bài viết #${id}`);
    console.log("🚀 ~ handleViewInfo ~ id:", id);
  };
  const handleDeletePost = (id: number) => {
    console.log("🚀 ~ handleViewInfo ~ id:", id);
  };

  const handleSubmit = async (values: any) => {
    console.log("🚀 ~ handleSubmit ~ values:", values);
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
      {showModal && (
        <Modal
          initialValues={postInfo ? postInfo : initValue}
          onSubmit={handleSubmit}
          onShowModal={setShowModal}
          onSetValue={setPostInfo}
          className={cx("modal-post")}
        >
          <PostForm titleForm={titleForm} />
        </Modal>
      )}
    </div>
  );
};

export default PostManager;
