import classNames from "classnames/bind";
import { useField } from "formik";

import styles from "./Upload.module.scss";
import { isAuthenticated } from "~/utils/auth";
import { UserOutlined } from "@ant-design/icons";
import type { ChangeEvent } from "react";
import { toast } from "react-toastify";
import { postDataAPI } from "~/utils/api";
import { URL_UPLOAD_IMAGE } from "~/api/end-point";

interface UploadProps {
  name?: string;
  [key: string]: any;
}

const cx = classNames.bind(styles);

const Upload = ({ name, ...props }: UploadProps) => {
  const [_, meta, helpers] = useField(name);
  const user = isAuthenticated();

  const handleUploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const MAX_SIZE_UPLOAD = 5;
    const MB_UNIT = 1024;
    const fileUpload = e?.target?.files?.[0];

    if (!fileUpload || fileUpload?.size > MAX_SIZE_UPLOAD * MB_UNIT * MB_UNIT) {
      toast.error("Kích thước file không được vượt quá 5Mb");
    } else {
      const formData = new FormData();
      formData.append("file", fileUpload);

      try {
        const response = await postDataAPI(URL_UPLOAD_IMAGE, formData);
        if (response?.data?.filename) {
          const fileName = response?.data?.filename;
          helpers.setValue(fileName);
        }
      } catch (err) {
        toast.error("Upload ảnh không thành công");
      }
    }
  };

  return (
    <div className={cx("upload-image")}>
      <input
        {...props}
        type="file"
        id="file"
        className={cx("input-file")}
        onChange={handleUploadImage}
        accept="image/*"
      />
      <label htmlFor="file" className={cx("label-file")}>
        {user && user?.avatar ? (
          <img
            src={import.meta.env.VITE_PREFIX_URL + user.avatar}
            alt="avatar"
            className={cx("avatar")}
          />
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
