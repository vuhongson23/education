import classNames from "classnames/bind";
import { DatePicker } from "antd";
import dayjs from "dayjs";

import styles from "./PostItem.module.scss";
import { DeleteIcon, EditIcon, ViewIcon } from "~/assets/icons";

interface PostItemProps {
  title?: string;
  image?: string;
  status?: string;
  excerpt?: string;
  createdAt?: string;
  category?: string;
  id?: number;
}

const cx = classNames.bind(styles);

const PostItem = ({
  title,
  image,
  status,
  excerpt,
  createdAt,
  category,
}: PostItemProps) => {
  console.log("🚀 ~ PostItem ~ title:", title);
  return (
    <div className={cx("card")}>
      <div className={cx("card-header")}>
        <img src={image} alt="thumbnail" className={cx("thumbnail")} />
        <p className={cx("status")}>{status}</p>
      </div>
      <div className={cx("card-body")}>
        <p className={cx("tag")}>{category}</p>
        <p className={cx("title")}>{title}</p>
        <p className={cx("excerpt")}>{excerpt}</p>
        <div className={cx("card-footer")}>
          <DatePicker
            defaultValue={dayjs(createdAt)}
            format={"DD/MM/YYYY"}
            disabled
          />
          <div className={cx("action")}>
            <span>
              <ViewIcon />
            </span>
            <span>
              <EditIcon />
            </span>
            <span>
              <DeleteIcon />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
