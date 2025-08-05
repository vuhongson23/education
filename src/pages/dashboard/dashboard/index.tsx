import classNames from "classnames/bind";

import styles from "./DashboardPage.module.scss";
import { UserSolidIcon } from "~/assets/icons";

const cx = classNames.bind(styles);

const DashboardPage = () => {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("summary")}>
        <div className={cx("card-info")}>
          <div className={cx("card-info--header")}>
            <span>
              <UserSolidIcon />
            </span>
            Users
          </div>
          <div className={cx("card-info--count")}>200</div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
