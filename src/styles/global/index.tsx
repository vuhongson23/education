import classNames from "classnames/bind";
import styles from "./GlobalStyles.module.scss";
import "./globalStyles.scss";

const cx = classNames.bind(styles);

interface GlobalStylesProps {
  children: React.ReactNode;
}

const GlobalStyles = ({ children }: GlobalStylesProps) => {
  return <div className={cx("wrapper")}>{children}</div>;
};

export default GlobalStyles;
