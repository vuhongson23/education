import classNames from "classnames/bind";
import { Formik, type FormikProps } from "formik";

import styles from "./Profile.module.scss";
import Upload from "~/components/image-upload";
import FormRow from "~/components/form-row";
import Input from "~/components/input";
import Button from "~/components/button";
import { isAuthenticated } from "~/utils/auth";
import { toast } from "react-toastify";
import { putDataAPI } from "~/utils/api";
import { URL_UPDATE_USER } from "~/api/end-point";

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
  const user = isAuthenticated();

  const handleUpdateUser = async (values: UserFormValue) => {
    const payload = {
      ...values,
      age: Number(values.age),
    };
    try {
      const response = await putDataAPI(URL_UPDATE_USER + user?.id, payload);
      console.log("🚀 ~ handleUpdateUser ~ response:", response);
      if (response?.status === 200) {
        toast.success("Cập nhật thông tin thành công!");
      }
    } catch (error) {
      toast.error("Cập nhật thông tin thất bại");
    }
  };

  return (
    <div className={cx("wrapper")}>
      <Formik
        initialValues={{
          firstName: user?.firstName || "",
          lastName: user?.lastName || "",
          email: user?.email || "",
          address: user?.address || "",
          avatar: user?.avatar || "",
          phoneNumber: user?.phoneNumber || "",
          age: user?.age || "",
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
