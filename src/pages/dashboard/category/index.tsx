import classNames from "classnames/bind";
import { useEffect, useState, type ChangeEvent } from "react";

import styles from "./CategoryManager.module.scss";
import MultiInput from "~/components/multi-input";
import useDebounce from "~/hooks/useDebounce";
import Button from "~/components/button";
import { Table } from "antd";
import ColumnCategoryTable from "./column";
import Modal from "~/modules/modal";
import FormRow from "~/components/form-row";
import Search from "~/components/search";

const cx = classNames.bind(styles);

const initValue = {
  name: "",
  image: "",
  password: "",
};

const fakeCategoryList = [
  {
    id: 1,
    name: "Áo sơ mi nữ",
    image:
      "https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    createdAt: "2025-07-01T09:30:00Z",
    status: "active",
  },
  {
    id: 2,
    name: "Đầm công sở",
    image:
      "https://cdn.kkfashion.vn/18825-large_default/dam-cong-so-nu-vien-den-phoi-nut-kk119-31.jpg",
    createdAt: "2025-06-15T14:00:00Z",
    status: "active",
  },
  {
    id: 3,
    name: "Chân váy",
    image:
      "https://down-vn.img.susercontent.com/file/vn-11134207-7ras8-m3nd9jxsgn1xf2.webp",
    createdAt: "2025-05-28T08:45:00Z",
    status: "delete",
  },
  {
    id: 4,
    name: "Quần jean nữ",
    image:
      "https://product.hstatic.net/1000340796/product/z5758993730474_0d4401e0072d39371079d21fc82bd8d3_d7d9c5bfc7104e2095346048ec104b45.jpg",
    createdAt: "2025-05-01T11:20:00Z",
    status: "active",
  },
  {
    id: 5,
    name: "Áo khoác",
    image:
      "https://sakurafashion.vn/upload/sanpham/large/1059920671-ao-khoac-nu-hinh-chu-soc-ngo-nghinh-3.jpg",
    createdAt: "2025-04-20T17:10:00Z",
    status: "delete",
  },
];

const CategoryManager = () => {
  const [searchParams, setSearchParams] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const debounceValue = useDebounce(searchParams, 500);

  const cateList = fakeCategoryList.map((category) => {
    return {
      ...category,
      key: category.id,
    };
  });

  useEffect(() => {}, [debounceValue]);

  const handleViewInfo = (id: number) => {
    console.log("🚀 ~ handleViewInfo ~ id:", id);
  };

  const handleUpdateCategory = (id: number) => {
    console.log("🚀 ~ handleUpdateCategory ~ id:", id);
  };

  const handleDeleteCategory = (id: number) => {
    console.log("🚀 ~ handleDeleteCategory ~ id:", id);
  };

  const handleSearchParams = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchParams(e.target.value);
  };

  const columns = ColumnCategoryTable(
    handleViewInfo,
    handleUpdateCategory,
    handleDeleteCategory
  );

  const handleSubmit = (values: any) => {
    console.log("🚀 ~ handleSubmit ~ values:", values);
    setShowModal(false);
  };

  const handleShowModal = () => {
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
        <div className={cx("content-table")}>
          <Table dataSource={cateList} columns={columns}></Table>
        </div>
      </div>
      {showModal && (
        <Modal
          onSubmit={handleSubmit}
          isShow={showModal}
          onShowModal={setShowModal}
          initialValues={initValue}
          className={cx("category-form")}
        >
          <FormRow>
            <MultiInput
              type="text"
              name="image"
              placeholder="Enter your image..."
              label="Image"
            />
            <MultiInput
              type="text"
              name="name"
              placeholder="Enter your name..."
              label="Name"
            />
          </FormRow>
          <FormRow>
            <MultiInput
              type="text"
              name="password"
              placeholder="Enter your password..."
            />
          </FormRow>
        </Modal>
      )}
    </div>
  );
};

export default CategoryManager;
