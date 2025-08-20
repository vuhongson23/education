import { useNavigate } from "react-router-dom";
import { useEffect, useState, type ChangeEvent } from "react";
import classNames from "classnames/bind";
import { toast } from "react-toastify";
import { Table } from "antd";

import styles from "./PostManager.module.scss";
import Search from "~/components/search";
import Button from "~/components/button";
import PostTableColumn from "./column";
import { routes } from "~/constant/routes";
import type { PostDetailTypes } from "~/constant/type/type";
import { deleteDataAPI, getDataAPINoAuth, putDataAPI } from "~/utils/api";
import {
  URL_DELETE_POST,
  URL_GET_ALL_POST,
  URL_GET_POST_BY_CONDITION,
  URL_GET_POST_BY_SLUG,
  URL_UPDATE_POST,
} from "~/api/end-point";
import Modal from "~/modules/modal";
import { ACTION_FORM, POST_STATUS } from "~/constant/constant";
import PostForm from "./post-form";
import useDebounce from "~/hooks/useDebounce";
import Loading from "~/components/loading";

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
  const [postInfo, setPostInfo] = useState<FormValues>({});
  const [searchValue, setSearchValue] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [titleForm, setTitleForm] = useState("");
  const [action, setAction] = useState(ACTION_FORM.VIEW);
  const [total, setTotal] = useState(1);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const debouncedValue = useDebounce(searchValue, 500);

  const fetchAllData = async () => {
    try {
      setIsLoading(true);
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
        setIsLoading(false);
      }
    } catch (error) {
      toast.error("Lấy danh sách bài viết thất bại");
    }
  };

  const fetchPostBySearch = async () => {
    try {
      setIsLoading(true);
      const response = await getDataAPINoAuth(URL_GET_POST_BY_CONDITION, {
        pageNo: page,
        pageSize: 3,
        title: debouncedValue ? debouncedValue : "",
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
        } else {
          toast.info("Not found your post");
        }
        setTotal(response?.data?.total);
        setIsLoading(false);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const fetchPostDetail = async (slug: string) => {
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

  useEffect(() => {
    fetchAllData();
  }, [page]);

  useEffect(() => {
    fetchPostBySearch();
  }, [debouncedValue]);

  // Get post infomation
  const handleViewInfo = async (slug: string) => {
    try {
      await fetchPostDetail(slug);
      setTitleForm("Thông tin bài viết");
      setAction(ACTION_FORM.VIEW);
      setShowModal(true);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  // Open update post modal
  const handleUpdatePost = async (slug: string, id: number) => {
    try {
      await fetchPostDetail(slug);
      setTitleForm(`Cập nhật bài viết #${id}`);
      setAction(ACTION_FORM.UPDATE);
      setShowModal(true);
    } catch (error) {
      toast.error("Lấy thông tin bài viết thất bại");
    }
  };

  // Delete post
  const handleDeletePost = async (id: number) => {
    try {
      const response = await deleteDataAPI(URL_DELETE_POST + id);
      if (response?.status === 200) {
        await fetchAllData();
        toast.success("Xóa bài viết thành công");
      }
    } catch (error) {
      toast.error("Xóa bài viết không thành công");
    }
  };

  const handleSearchPosts = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSubmit = async (values: any) => {
    const payload = {
      title: values?.title,
      slug: values?.slug,
      thumbnail: values?.thumbnail,
      content: values?.content,
      status: values?.status,
      categoryId: values?.categoryId,
    };
    try {
      const response = await putDataAPI(
        URL_UPDATE_POST + postInfo?.id,
        payload
      );
      if (response?.status === 200) {
        await fetchAllData();
        setShowModal(false);
        toast.success("Cập nhật bài viết thành công");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const columns = PostTableColumn(
    handleViewInfo,
    handleUpdatePost,
    handleDeletePost
  );

  return (
    <div className={cx("wrapper")}>
      <h1 className={cx("title")}>Post manager</h1>
      <div className={cx("content")}>
        <div className={cx("content-filter")}>
          <Search onChange={handleSearchPosts} />

          <Button
            variant="primary"
            className={cx("cre-btn")}
            onClick={() => navigate(routes.postAddNew)}
          >
            Write new post
          </Button>
        </div>
        {isLoading ? (
          <Loading className={cx("loading")} />
        ) : (
          <div className={cx("content-table")}>
            <Table
              columns={columns}
              dataSource={posts}
              pagination={{
                current: page,
                pageSize: 3,
                total: total,
                onChange: (page) => {
                  setPage(page);
                },
              }}
            />
          </div>
        )}
      </div>
      {showModal && (
        <Modal
          initialValues={postInfo ? postInfo : initValue}
          onSubmit={handleSubmit}
          onShowModal={setShowModal}
          onSetValue={setPostInfo}
          className={cx("modal-post")}
        >
          <PostForm titleForm={titleForm} action={action} />
        </Modal>
      )}
    </div>
  );
};

export default PostManager;
