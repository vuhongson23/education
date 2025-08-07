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
import {
  URL_DELETE_USER,
  URL_GET_ALL_USER,
  URL_GET_USER_INFO,
} from "~/api/end-point";
import Loading from "~/components/loading";
import Search from "~/components/search";
import FormRow from "~/components/form-row";
import MultiInput from "~/components/multi-input";
import Upload from "~/components/image-upload";
import { ACTION_FORM, USER_STATUS } from "~/constant/constant";

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

const statusOptions = [
  {
    label: "Active",
    value: USER_STATUS.ACTIVE,
  },
  {
    label: "Pending",
    value: USER_STATUS.IN_ACTIVE,
  },
  {
    label: "Banned",
    value: USER_STATUS.BANNED,
  },
];

const UserManager = () => {
  const [searchParams, setSearchParams] = useState<string>("");
  const [userInfo, setUserInfo] = useState<FormValues>({});
  const [showModal, setShowModal] = useState<boolean>(false);
  const [users, setUsers] = useState<Users[]>([]);
  const [action, setAction] = useState(ACTION_FORM.VIEW);
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

  const fetchUserInfo = async (id: number) => {
    try {
      const response = await getDataAPINoAuth(URL_GET_USER_INFO + id);
      const userData = response?.data;

      if (response?.status === 200) {
        const { refreshToken, role, ...userDataNoRoleValueAndRefreshToken } =
          userData;
        return userDataNoRoleValueAndRefreshToken;
      }
    } catch (error) {
      console.log("🚀 ~ handleViewInfo ~ error:", error);
      toast.error(`Lấy thông tin người dùng #${id} thất bại!`);
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

  // Lấy thông tin người dùng
  const handleViewInfo = async (id: number) => {
    try {
      const userData = await fetchUserInfo(id);
      if (userData) {
        setUserInfo(userData);
        setShowModal(true);
      }
    } catch (error) {
      console.log("🚀 ~ handleViewInfo ~ error:", error);
      toast.error(`Lấy thông tin người dùng #${id} thất bại!`);
    }
  };

  // Update thông tin người dùng
  const handleUpdateUser = async (id: number) => {
    try {
      const userData = await fetchUserInfo(id);
      if (userData) {
        setUserInfo(userData);
        setShowModal(true);
        setAction(ACTION_FORM.UPDATE);
      }
    } catch (error) {
      console.log("🚀 ~ handleUpdateUser ~ error:", error);
    }
  };

  // Delete người dùng
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
          initialValues={userInfo?.id ? userInfo : initValue}
          onSubmit={handleSubmit}
          onShowModal={setShowModal}
          onSetValue={setUserInfo}
          className={cx("modal-user")}
        >
          <h2>Thông tin người dùng</h2>
          <Upload name="avatar" disabled={action === ACTION_FORM.VIEW} />
          <div className={cx("user-name")}>{userInfo?.userName}</div>
          <FormRow>
            <MultiInput
              type="text"
              name="firstName"
              label="First name"
              placeholder="Sơn"
              className={cx("user-input")}
              disabled={action === ACTION_FORM.VIEW}
            />
            <MultiInput
              type="text"
              name="lastName"
              label="Last name"
              placeholder="Vũ"
              className={cx("user-input")}
              disabled={action === ACTION_FORM.VIEW}
            />
          </FormRow>
          <FormRow>
            <MultiInput
              type="text"
              name="phoneNumber"
              label="Phone"
              placeholder="0864153753"
              className={cx("user-input")}
              disabled={action === ACTION_FORM.VIEW}
            />
            <MultiInput
              type="text"
              name="email"
              label="Email"
              placeholder="abc@gmail.com"
              className={cx("user-input")}
              disabled={action === ACTION_FORM.VIEW}
            />
          </FormRow>
          <FormRow>
            <MultiInput
              type="text"
              name="age"
              label="Age"
              placeholder="18"
              className={cx("user-input")}
              disabled={action === ACTION_FORM.VIEW}
            />
            <MultiInput
              type="text"
              name="address"
              label="Address"
              placeholder="Phường A, xã B, tỉnh D,..."
              className={cx("user-input")}
              disabled={action === ACTION_FORM.VIEW}
            />
          </FormRow>
          <MultiInput
            type="radio"
            name="status"
            label="Status"
            options={statusOptions}
            className={cx("user-input")}
            disabled={action === ACTION_FORM.VIEW}
          />
        </Modal>
      )}
    </div>
  );
};

export default UserManager;
