import classNames from "classnames/bind";
import styles from "./Button.module.scss";

interface ButtonProps {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "third";
  className?: string;
  onClick?: () => void;
}

const cx = classNames.bind(styles);

const Button = ({
  children,
  type = "button",
  variant,
  className,
  onClick,
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={cx("wrapper", `wrapper--${variant}`, {
        [className || ""]: !!className,
      })}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
