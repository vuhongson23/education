import classNames from "classnames/bind";
import { Formik, type FormikProps } from "formik";

import styles from "./Profile.module.scss";
import Upload from "~/components/image-upload";
import FormRow from "~/components/form-row";
import Input from "~/components/input";
import Button from "~/components/button";
import { isAuthenticated } from "~/utils/auth";
import { toast } from "react-toastify";
import { getDataAPI, putDataAPI } from "~/utils/api";
import { URL_GET_USER_INFO, URL_UPDATE_USER } from "~/api/end-point";
import { useEffect, useState } from "react";
import Loading from "~/components/loading";

interface UserFormValue {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  avatar: string;
  phoneNumber: string;
  age: number;
}

const cx = classNames.bind(styles);

const Profile = () => {
  const [userInfo, setUserInfo] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const user = isAuthenticated();

  const handleUpdateUser = async (values: UserFormValue) => {
    const payload = {
      ...values,
      age: Number(values.age),
    };
    try {
      const response = await putDataAPI(URL_UPDATE_USER + user?.id, payload);
      if (response?.status === 200) {
        toast.success("Cập nhật thông tin thành công!");
      }
    } catch (error) {
      toast.error("Cập nhật thông tin thất bại");
    }
  };

  const fetchUserInfo = async () => {
    try {
      setIsLoading(true);
      const response = await getDataAPI(URL_GET_USER_INFO + user?.id);
      if (response?.status === 200) {
        setUserInfo(response?.data);
        setIsLoading(false);
      }
    } catch (error) {
      toast.error("Lấy thông tin người dùng thất bại");
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  if (!userInfo && isLoading) return <Loading />;

  return (
    <div className={cx("wrapper")}>
      <Formik
        initialValues={{
          firstName: userInfo?.firstName || "",
          lastName: userInfo?.lastName || "",
          email: userInfo?.email || "",
          address: userInfo?.address || "",
          avatar: userInfo?.avatar || "",
          phoneNumber: userInfo?.phoneNumber || "",
          age: userInfo?.age || "",
        }}
        onSubmit={handleUpdateUser}
      >
        {(formik: FormikProps<UserFormValue>) => (
          <form onSubmit={formik.handleSubmit}>
            <Upload name="avatar" />
            <div className={cx("user-name")}>{user?.userName}</div>
            <div className={cx("update-form")}>
              <FormRow>
                <Input
                  type="text"
                  name="firstName"
                  label="First name"
                  placeholder="Sơn"
                  className={cx("user-input")}
                />
                <Input
                  type="text"
                  name="lastName"
                  label="Last name"
                  placeholder="Vũ"
                  className={cx("user-input")}
                />
              </FormRow>
              <FormRow>
                <Input
                  type="text"
                  name="phoneNumber"
                  label="Phone"
                  placeholder="0864153753"
                  className={cx("user-input")}
                />
                <Input
                  type="text"
                  name="email"
                  label="Email"
                  placeholder="abc@gmail.com"
                  className={cx("user-input")}
                />
              </FormRow>
              <FormRow>
                <Input
                  type="text"
                  name="age"
                  label="Age"
                  placeholder="18"
                  className={cx("user-input")}
                />
                <Input
                  type="text"
                  name="address"
                  label="Address"
                  placeholder="Phường A, xã B, tỉnh D,..."
                  className={cx("user-input")}
                />
              </FormRow>
              <Button
                type="submit"
                variant="primary"
                className={cx("update-btn")}
              >
                Update
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Profile;
