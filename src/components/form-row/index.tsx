import classNames from "classnames/bind";

import styles from "./FormRow.module.scss";

const cx = classNames.bind(styles);

interface FormRowProps {
  children?: React.ReactNode;
  className?: string;
}

const FormRow = ({ children, className }: FormRowProps) => {
  return (
    <div
      className={cx("wrapper", {
        [className || ""]: !!className,
      })}
    >
      {children}
    </div>
  );
};

export default FormRow;
