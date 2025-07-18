import classNames from "classnames/bind";
import styles from "./Input.module.scss";

interface InputProps {
  name?: string;
  label?: string;
  placeholder?: string;
  rightIcon?: React.ReactNode;
}

const cx = classNames.bind(styles);

const Input = ({ name, label, placeholder, rightIcon }: InputProps) => {
  return (
    <div className={cx("wrapper")}>
      <label className={cx("label")} htmlFor={name}>
        {label}
      </label>
      <div className={cx("wrapper-input")}>
        <input
          id={name}
          className={cx("input")}
          type="text"
          placeholder={placeholder}
        />
        <span className={cx("right-icon")}>{rightIcon}</span>
      </div>
    </div>
  );
};

export default Input;
