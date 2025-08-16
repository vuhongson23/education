import classNames from "classnames/bind";

import FormRow from "~/components/form-row";
import Upload from "~/components/image-upload";
import MultiInput from "~/components/multi-input";
import styles from "./UserManager.module.scss";
import { ACTION_FORM, USER_STATUS } from "~/constant/constant";

interface UserFormProps {
  titleForm: string;
  action: string;
  userName: string;
}

const cx = classNames.bind(styles);

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

const roleOptions = [
  {
    label: "Admin",
    value: 1,
  },
  {
    label: "User",
    value: 0,
  },
];

const UserForm = ({ titleForm, action, userName }: UserFormProps) => {
  return (
    <>
      <h2>{titleForm}</h2>
      <Upload name="avatar" disabled={action === ACTION_FORM.VIEW} />

      {action === ACTION_FORM.CREATE || action === ACTION_FORM.UPDATE ? (
        <MultiInput
          type="text"
          name="userName"
          label="Username"
          placeholder="Sơn"
          className={cx("user-input")}
          disabled={action === ACTION_FORM.VIEW}
        />
      ) : (
        <div className={cx("user-name")}>{userName}</div>
      )}
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
      <FormRow>
        <MultiInput
          type="radio"
          name="status"
          label="Status"
          options={statusOptions}
          className={cx("user-input")}
          disabled={action === ACTION_FORM.VIEW}
        />
        <MultiInput
          type="radio"
          name="role"
          label="Role"
          options={roleOptions}
          className={cx("user-input")}
          disabled={action === ACTION_FORM.VIEW}
        />
      </FormRow>
    </>
  );
};

export default UserForm;
