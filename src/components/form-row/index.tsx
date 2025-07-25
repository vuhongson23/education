import classNames from "classnames/bind";

import styles from "./FormRow.module.scss";

const cx = classNames.bind(styles);
interface FormRowProps {
  children?: React.ReactNode;
}

const FormRow = ({ children }: FormRowProps) => {
  return <div className={cx("wrapper")}>{children}</div>;
};

export default FormRow;
