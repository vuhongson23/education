import classNames from "classnames/bind";
import styles from "./Title.module.scss";

interface TitleProps {
  children: React.ReactNode;
}

const cx = classNames.bind(styles);

const Title = ({ children }: TitleProps) => {
  return <div className={cx("title")}>{children}</div>;
};

export default Title;
