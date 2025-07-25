import classNames from "classnames/bind";
import { useField } from "formik";

import styles from "./Upload.module.scss";
import { isAuthenticated } from "~/utils/auth";
import { UserOutlined } from "@ant-design/icons";

interface UploadProps {
  name?: string;
  [key: string]: any;
}

const cx = classNames.bind(styles);

const Upload = ({ name, ...props }: UploadProps) => {
  const [field, meta] = useField(name);
  const user = isAuthenticated();

  return (
    <div className={cx("upload-image")}>
      <input
        {...field}
        {...props}
        type="file"
        id="file"
        className={cx("input-file")}
      />
      <label htmlFor="file" className={cx("label-file")}>
        {user && user?.avatar ? (
          <img src={user.avatar} alt="avatar" />
        ) : (
          <UserOutlined style={{ fontSize: 120 }} />
        )}
        <div className={cx("select-btn")}>Chọn ảnh</div>
      </label>
      {meta?.error ? <div className={cx("error")}>{meta.error}</div> : null}
    </div>
  );
};

export default Upload;
