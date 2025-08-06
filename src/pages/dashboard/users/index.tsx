import { useEffect, useState, type ChangeEvent } from "react";
import classNames from "classnames/bind";
import { Table } from "antd";

import styles from "./UserManager.module.scss";
import useDebounce from "~/hooks/useDebounce";
import Button from "~/components/button";
import ColumnUserTable from "./column";
import Modal from "~/modules/modal";
import { toast } from "react-toastify";
import { deleteDataAPI, getDataAPINoAuth } from "~/utils/api";
import { URL_DELETE_USER, URL_GET_ALL_USER } from "~/api/end-point";
import Loading from "~/components/loading";
import Search from "~/components/search";

interface FormValues {
  [key: string]: any;
}

type Users = {
  id: number;
  userName: string;
  firstName: string;
  lastName: string;
  avatar: string;
  phoneNumber: string;
  address: string;
  age: number;
  status: number;
  createdAt: string;
};

const cx = classNames.bind(styles);

const initValue: FormValues = {
  userName: "",
  firstName: "",
  lastName: "",
  age: 18,
  email: "",
  avatar: "",
  phoneNumber: "",
  status: "",
  address: "",
};

const UserManager = () => {
  const [searchParams, setSearchParams] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [users, setUsers] = useState<Users[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const debounceValue = useDebounce(searchParams, 500);

  const fetchData = async () => {
    const payload = {
      pageNo: 1,
      pageSize: 10,
      search: searchParams ? searchParams : "",
    };
    setIsLoading(true);
    const response = await getDataAPINoAuth(URL_GET_ALL_USER, payload);

    if (response?.status === 200) {
      const data = response?.data?.content?.map((item: Users) => {
        return {
          ...item,
          key: item?.id,
        };
      });

      setUsers(data);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    try {
      fetchData();
    } catch (error) {
      console.log("🚀 ~ UserManager ~ error:", error);
      toast.error("Lỗi lấy danh sách người dùng!");
    }
  }, [debounceValue]);

  const handleViewInfo = (id: number) => {
    console.log("🚀 ~ handleViewInfo ~ id:", id);
  };
  const handleUpdateUser = (id: number) => {
    console.log("🚀 ~ handleUpdateUser ~ id:", id);
  };
  const handleDeleteUser = async (id: number) => {
    console.log("🚀 ~ handleDeleteUser ~ id:", id);
    try {
      setIsLoading(true);
      const response = await deleteDataAPI(URL_DELETE_USER + id);
      console.log("🚀 ~ handleDeleteUser ~ response:", response);
      if (response?.status === 200) {
        fetchData();
        toast.success(`Xóa người dùng #${id} thành công`);
      }
    } catch (error) {
      console.log("🚀 ~ handleDeleteUser ~ error:", error);
      toast.error(`Xóa người dùng #${id} không thành công`);
    }
  };

  const columns = ColumnUserTable(
    handleViewInfo,
    handleUpdateUser,
    handleDeleteUser
  );

  const handleSearchParams = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchParams(e.target.value);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleSubmit = (values: FormValues) => {
    console.log("🚀 ~ handleSubmit ~ values:", values);
    setShowModal(false);
  };

  return (
    <div className={cx("wrapper")}>
      <h1 className={cx("title")}>User manager</h1>
      <div className={cx("content")}>
        {/**Filter and create user button */}
        <div className={cx("content-filter")}>
          <Search onChange={handleSearchParams}></Search>

          <Button
            variant="primary"
            className={cx("cre-btn")}
            onClick={handleOpenModal}
          >
            Create new user
          </Button>
        </div>

        {/**Detail Table */}
        {isLoading ? (
          <Loading className={cx("loading")} />
        ) : (
          <div className={cx("content-table")}>
            <Table columns={columns} dataSource={users}></Table>
          </div>
        )}
      </div>
      {showModal && (
        <Modal
          initialValues={initValue}
          onSubmit={handleSubmit}
          onShowModal={setShowModal}
        ></Modal>
      )}
    </div>
  );
};

export default UserManager;
