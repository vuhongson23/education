import classNames from "classnames/bind";

import styles from "./Profile.module.scss";
import Upload from "~/components/image-upload";
import FormRow from "~/components/form-row";

const cx = classNames.bind(styles);

const Profile = () => {
  return (
    <div className={cx("wrapper")}>
      <Upload></Upload>
      <div></div>
    </div>
  );
};

export default Profile;
