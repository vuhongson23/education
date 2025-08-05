import classNames from "classnames/bind";

import styles from "./CardInfo.module.scss";
import { UserSolidIcon } from "~/assets/icons";

const cx = classNames.bind(styles);

const CardInfo = () => {
  return (
    <div className={cx("card-info")}>
      <span className={cx("card-info--icon")}>
        <UserSolidIcon size={30} />
      </span>
      <div className={cx("card-info--content")}>
        <h3 className={cx("card-info--content__title")}>Total Users</h3>
        <p className={cx("card-info--content__count")}>1,234</p>
      </div>
    </div>
  );
};

export default CardInfo;
