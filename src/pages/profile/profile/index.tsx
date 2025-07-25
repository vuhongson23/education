import classNames from "classnames/bind";
import { Formik, type FormikProps } from "formik";

import styles from "./Profile.module.scss";
import Upload from "~/components/image-upload";
import FormRow from "~/components/form-row";
import Input from "~/components/input";
import Button from "~/components/button";
import { isAuthenticated } from "~/utils/auth";

interface UserFormValue {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  avatar: string;
  age: number;
}

const cx = classNames.bind(styles);

const Profile = () => {
  const user = isAuthenticated();
  console.log("🚀 ~ Profile ~ user:", user);
  const handleUpdateUser = (values: UserFormValue) => {
    const payload = {
      ...values,
      age: Number(values.age),
    };
    console.log("🚀 ~ handleUpdateUser ~ payload:", payload);
  };
  return (
    <div className={cx("wrapper")}>
      <Formik
        initialValues={{
          firstName: user?.firstName,
          lastName: user?.lastName,
          email: user?.email,
          address: user?.address,
          avatar: user?.avatar,
          age: 18,
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
                  name="age"
                  label="Age"
                  placeholder="18"
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
              <Input
                type="text"
                name="address"
                label="Address"
                placeholder="Phường A, xã B, tỉnh D,..."
                className={cx("user-input")}
              />
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
