import classNames from "classnames/bind";
import styles from "./Button.module.scss";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "third";
  className?: string;
}

const cx = classNames.bind(styles);

const Button = ({ children, variant, className }: ButtonProps) => {
  return (
    <button
      className={cx("wrapper", `wrapper--${variant}`, {
        [className || ""]: !!className,
      })}
    >
      {children}
    </button>
  );
};

export default Button;
