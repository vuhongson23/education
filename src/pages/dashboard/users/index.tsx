import { useEffect, useState, type ChangeEvent } from "react";
import classNames from "classnames/bind";
import { toast } from "react-toastify";
import { Table } from "antd";

import styles from "./UserManager.module.scss";
import useDebounce from "~/hooks/useDebounce";
import Button from "~/components/button";
import ColumnUserTable from "./column";
import Modal from "~/modules/modal";
import {
  deleteDataAPI,
  getDataAPINoAuth,
  postDataAPINoAuth,
  putDataAPI,
} from "~/utils/api";
import {
  URL_CREATE_NEW_USER_IN_DASHBOARD,
  URL_DELETE_USER,
  URL_GET_ALL_USER,
  URL_GET_USER_INFO,
  URL_UPDATE_USER,
} from "~/api/end-point";
import Loading from "~/components/loading";
import Search from "~/components/search";
import { ACTION_FORM } from "~/constant/constant";
import type { Users } from "~/constant/type/type";
import UserForm from "./user-form";

interface FormValues {
  [key: string]: any;
}

const cx = classNames.bind(styles);

const initValue: FormValues = {
  userName: "",
  firstName: "",
  lastName: "",
  age: 18,
  email: "",
  avatar: "",
  phoneNumber: "",
  status: 1,
  address: "",
  role: 0,
};

const UserManager = () => {
  const [searchParams, setSearchParams] = useState<string>("");
  const [userInfo, setUserInfo] = useState<FormValues>({});
  const [showModal, setShowModal] = useState<boolean>(false);
  const [users, setUsers] = useState<Users[]>([]);
  const [action, setAction] = useState(ACTION_FORM.VIEW);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [titleForm, setTitleForm] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);
  const debounceValue = useDebounce(searchParams, 500);

  const fetchData = async () => {
    try {
      const payload = {
        pageNo: page,
        pageSize: 3,
        search: debounceValue ? debounceValue : null,
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
        setTotal(response?.data?.total);
        setIsLoading(false);
      }
    } catch (error) {
      toast.error("Lỗi lấy danh sách người dùng!");
    }
  };

  const fetchUserInfo = async (id: number) => {
    try {
      const response = await getDataAPINoAuth(URL_GET_USER_INFO + id);
      const userData = response?.data;

      if (response?.status === 200) {
        const { refreshToken, ...userDataNoRoleValueAndRefreshToken } =
          userData;
        return userDataNoRoleValueAndRefreshToken;
      }
    } catch (error) {
      toast.error(`Lấy thông tin người dùng #${id} thất bại!`);
    }
  };

  useEffect(() => {
    fetchData();
  }, [debounceValue, page]);

  // Lấy thông tin người dùng
  const handleViewInfo = async (id: number) => {
    try {
      setTitleForm("Thông tin người dùng");
      const userData = await fetchUserInfo(id);
      if (userData) {
        setUserInfo(userData);
        setAction(ACTION_FORM.VIEW);
        setShowModal(true);
      }
    } catch (error) {
      toast.error(`Lấy thông tin người dùng #${id} thất bại!`);
    }
  };

  // Update thông tin người dùng
  const handleUpdateUser = async (id: number) => {
    setTitleForm("Cập nhật người dùng");
    try {
      const userData = await fetchUserInfo(id);
      if (userData) {
        setUserInfo(userData);
        setShowModal(true);
        setAction(ACTION_FORM.UPDATE);
      }
    } catch (error) {
      toast.error("Something went wrong!!!");
    }
  };

  // Tạo người dùng mới
  const handleCreateNewUser = () => {
    setTitleForm("Tạo người dùng mới");
    setShowModal(true);
    setAction(ACTION_FORM.CREATE);
  };

  // Delete người dùng
  const handleDeleteUser = async (id: number) => {
    try {
      setIsLoading(true);
      const response = await deleteDataAPI(URL_DELETE_USER + id);
      if (response?.status === 200) {
        fetchData();
        toast.success(`Xóa người dùng #${id} thành công`);
      }
    } catch (error) {
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

  const handleSubmit = async (values: FormValues) => {
    if (action === ACTION_FORM.UPDATE) {
      const userId = values?.id;
      try {
        const response = await putDataAPI(URL_UPDATE_USER + userId, values);
        if (response?.status === 200) {
          toast.success(`Cập nhật thông tin người dùng ${userId} thành công`);
          await fetchData();
          setShowModal(false);
        }
      } catch (error) {
        toast.error(`Cập nhật thông tin người dùng ${userId} thất bại`);
        setShowModal(false);
      }
    } else if (action === ACTION_FORM.CREATE) {
      try {
        const response = await postDataAPINoAuth(
          URL_CREATE_NEW_USER_IN_DASHBOARD,
          values
        );
        if (response?.status === 201) {
          toast.success("Tạo người dùng mới thành công");
          await fetchData();
          setShowModal(false);
        }
      } catch (error) {
        toast.error("Tạo người dùng mới thất bại");
        setShowModal(false);
      }
    }
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
            onClick={handleCreateNewUser}
          >
            Create new user
          </Button>
        </div>

        {/**Detail Table */}
        {isLoading ? (
          <Loading className={cx("loading")} />
        ) : (
          <div className={cx("content-table")}>
            <Table
              columns={columns}
              dataSource={users}
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
          initialValues={userInfo?.id ? userInfo : initValue}
          onSubmit={handleSubmit}
          onShowModal={setShowModal}
          onSetValue={setUserInfo}
          className={cx("modal-user")}
          action={action}
        >
          <UserForm
            titleForm={titleForm}
            action={action}
            userName={userInfo?.userName}
          />
        </Modal>
      )}
    </div>
  );
};

export default UserManager;
