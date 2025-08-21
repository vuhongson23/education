import classNames from "classnames/bind";
import { useEffect, useState, type ChangeEvent } from "react";

import styles from "./CategoryManager.module.scss";
import useDebounce from "~/hooks/useDebounce";
import Button from "~/components/button";
import { Table } from "antd";
import ColumnCategoryTable from "./column";
import Modal from "~/modules/modal";
import Search from "~/components/search";
import type { Category } from "~/constant/type/type";
import { toast } from "react-toastify";
import {
  deleteDataAPI,
  getDataAPINoAuth,
  postDataAPINoAuth,
  putDataAPI,
} from "~/utils/api";
import {
  URL_CREATE_CATEGORY,
  URL_DELETE_CATEGORY,
  URL_GET_ALL_CATEGORY,
  URL_GET_ALL_CATEGORY_BY_CONDITION,
  URL_GET_INFO_CATEGORY,
  URL_UPDATE_CATEGORY,
} from "~/api/end-point";
import Loading from "~/components/loading";
import CategoryForm from "./category-form";
import { ACTION_FORM, CATEGORY_STATUS } from "~/constant/constant";

interface FormValues {
  [key: string]: any;
}

const cx = classNames.bind(styles);

const initValue: FormValues = {
  name: "",
  image: "",
  status: CATEGORY_STATUS.ACTIVE,
};

const CategoryManager = () => {
  const [action, setAction] = useState<string>(ACTION_FORM.VIEW);
  const [categoryInfo, setCategoryInfo] = useState<Category | any>({});
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchParams, setSearchParams] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [titleForm, setTitleForm] = useState<string>("");
  const [total, setTotal] = useState<number>(1);
  const [page, setPage] = useState<number>(1);
  const debounceValue = useDebounce(searchParams, 500);

  // Get all category
  const fetchAllCategory = async () => {
    try {
      setIsLoading(true);
      const response = await getDataAPINoAuth(URL_GET_ALL_CATEGORY, {
        pageNo: page,
        pageSize: 3,
      });
      if (response?.status === 200) {
        const newCategoryList = response?.data?.content?.map(
          (category: Category) => {
            return {
              key: category.id,
              ...category,
            };
          }
        );
        setCategories(newCategoryList);
        setTotal(response?.data?.total);
        setIsLoading(false);
      }
    } catch (error) {
      toast.error("Lấy danh sách danh mục thất bại");
    }
  };

  // Search category
  const fetchAllCategoryByName = async () => {
    try {
      const response = await getDataAPINoAuth(
        URL_GET_ALL_CATEGORY_BY_CONDITION,
        {
          pageNo: page,
          pageSize: 3,
          search: debounceValue,
        }
      );
      if (response?.status === 200) {
        if (response?.data?.content.length <= 0) {
          toast.info("Không tìm thấy bài viết");
        } else {
          const newCategoryList = response?.data?.content?.map(
            (category: Category) => {
              return {
                key: category.id,
                ...category,
              };
            }
          );
          setCategories(newCategoryList);
          setTotal(response?.data?.total);
          setIsLoading(false);
        }
      }
    } catch (error) {
      toast.error("Xảy ra lỗi!!!");
    }
  };

  // Get information category
  const fetchCategoryInfo = async (categoryId: number) => {
    try {
      const response = await getDataAPINoAuth(
        URL_GET_INFO_CATEGORY + categoryId
      );
      if (response?.status === 200) {
        setCategoryInfo(response?.data);
      }
    } catch (error) {
      toast.error("Không tìm thấy danh mục");
    }
  };

  useEffect(() => {
    fetchAllCategory();
  }, [page]);

  useEffect(() => {
    fetchAllCategoryByName();
  }, [debounceValue]);

  // View infomation category
  const handleViewInfo = async (id: number) => {
    setTitleForm("Thông tin danh mục");
    await fetchCategoryInfo(id);
    setAction(ACTION_FORM.VIEW);
    setShowModal(true);
  };

  // Update category
  const handleUpdateCategory = async (id: number) => {
    setTitleForm(`Cập nhật danh mục số #${id}`);
    await fetchCategoryInfo(id);
    setAction(ACTION_FORM.UPDATE);
    setShowModal(true);
  };

  // Delete category
  const handleDeleteCategory = async (id: number) => {
    try {
      const response = await deleteDataAPI(URL_DELETE_CATEGORY + id);
      if (response?.status === 200) {
        await fetchAllCategory();
        toast.success(`Xóa danh mục số #${id} thành công`);
      }
    } catch (error) {
      toast.error(`Xóa danh mục số #${id} không thành công`);
    }
  };

  const handleSearchParams = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchParams(e.target.value);
  };

  const columns = ColumnCategoryTable(
    handleViewInfo,
    handleUpdateCategory,
    handleDeleteCategory
  );

  // Create category
  const handleSubmit = async (values: FormValues) => {
    if (action === ACTION_FORM.CREATE) {
      try {
        const response = await postDataAPINoAuth(URL_CREATE_CATEGORY, values);
        if (response?.status === 201) {
          toast.success("Tạo danh mục mới thành công");
          await fetchAllCategory();
          setShowModal(false);
        }
      } catch (error) {
        toast.error("Tạo danh mục không thành công");
      }
    } else if (action === ACTION_FORM.UPDATE) {
      try {
        const response = await putDataAPI(
          URL_UPDATE_CATEGORY + categoryInfo?.id,
          values
        );
        if (response?.status === 200) {
          toast.success("Cập nhật danh mục thành công");
          await fetchAllCategory();
          setShowModal(false);
        }
      } catch (error) {
        toast.error("Cập nhật danh mục thất bại");
      }
    }
  };

  const handleShowModal = () => {
    setCategoryInfo({ status: CATEGORY_STATUS.ACTIVE });
    setTitleForm("Tạo danh mục");
    setAction(ACTION_FORM.CREATE);
    setShowModal(true);
  };

  return (
    <div className={cx("wrapper")}>
      <h1 className={cx("title")}>Category manager</h1>
      <div className={cx("content")}>
        <div className={cx("content-filter")}>
          {/**Filter and create user button */}
          <Search onChange={handleSearchParams}></Search>
          <Button
            variant="primary"
            className={cx("cre-btn")}
            onClick={handleShowModal}
          >
            Create new
          </Button>
        </div>
        {isLoading ? (
          <Loading className={cx("loading")} />
        ) : (
          <div className={cx("content-table")}>
            <Table
              dataSource={categories}
              columns={columns}
              pagination={{
                pageSize: 3,
                total: total,
                current: page,
                onChange: (page) => {
                  setPage(page);
                },
              }}
            ></Table>
          </div>
        )}
      </div>
      {showModal && (
        <Modal
          onSubmit={handleSubmit}
          isShow={showModal}
          onShowModal={setShowModal}
          initialValues={categoryInfo ? categoryInfo : initValue}
          className={cx("category-form")}
        >
          <CategoryForm titleForm={titleForm} action={action} />
        </Modal>
      )}
    </div>
  );
};

export default CategoryManager;
