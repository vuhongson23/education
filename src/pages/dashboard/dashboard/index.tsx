import classNames from "classnames/bind";
import { Empty } from "antd";

import styles from "./DashboardPage.module.scss";
import CardInfo from "~/components/card-dashboard";

const cx = classNames.bind(styles);

const DashboardPage = () => {
  return (
    <div className={cx("wrapper")}>
      <h1 className={cx("title")}>Dashboard</h1>
      <div className={cx("summary")}>
        {Array(4)
          .fill(0)
          .map((_, index) => (
            <CardInfo key={index} />
          ))}
      </div>
      <div className={cx("content")}>
        <Empty />
      </div>
    </div>
  );
};

export default DashboardPage;
