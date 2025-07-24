import classNames from "classnames/bind";
import styles from "./Input.module.scss";
import { useField } from "formik";

interface InputProps {
  name: string;
  label?: string;
  placeholder?: string;
  rightIcon?: React.ReactNode;
  type?: "text" | "email" | "password" | "number";
  onClick?: () => void;
  [key: string]: any;
}

const cx = classNames.bind(styles);

const Input = ({
  name,
  label,
  placeholder,
  rightIcon,
  type = "text",
  onClick = () => {},
  ...props
}: InputProps) => {
  const [field, meta] = useField(name);
  return (
    <div className={cx("wrapper")}>
      <label className={cx("label")} htmlFor={name}>
        {label}
      </label>
      <div className={cx("wrapper-input")}>
        <input
          {...field}
          {...props}
          id={name}
          className={cx("input")}
          type={type}
          placeholder={placeholder}
        />
        <span onClick={onClick} className={cx("right-icon")}>
          {rightIcon}
        </span>
      </div>
      {meta.touched && meta.error ? (
        <div className={cx("error")}>{meta.error}</div>
      ) : null}
    </div>
  );
};

export default Input;
