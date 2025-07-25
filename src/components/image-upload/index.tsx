import classNames from "classnames/bind";

import styles from "./Upload.module.scss";
import { isAuthenticated } from "~/utils/auth";
import { UserOutlined } from "@ant-design/icons";

const cx = classNames.bind(styles);

const Upload = () => {
  const user = isAuthenticated();

  return (
    <div className={cx("upload-image")}>
      <input type="file" id="file" className={cx("input-file")} />
      <label htmlFor="file" className={cx("label-file")}>
        {user && user?.avatar ? (
          <img src={user.avatar} alt="avatar" />
        ) : (
          <UserOutlined style={{ fontSize: 150 }} />
        )}
        <div className={cx("select-btn")}>Chọn ảnh</div>
      </label>
    </div>
  );
};

export default Upload;
