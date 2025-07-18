import classNames from "classnames/bind";

import styles from "./LoginPage.module.scss";
import Input from "~/components/input";
import { OpenEyeIcon } from "~/assets/icons";
import Button from "~/components/button";

const cx = classNames.bind(styles);

const LoginPage = () => {
  return (
    <div className={cx("wrapper")}>
      <Input
        name="fullName"
        label="Fullname"
        placeholder="Please enter your fullname"
      />
      <Input
        name="email"
        label="Email"
        placeholder="Please enter your email address"
      />
      <Input
        name="password"
        label="Password"
        placeholder="Please enter your password"
        rightIcon={<OpenEyeIcon />}
      />
      <Button variant="primary">Register</Button>
    </div>
  );
};

export default LoginPage;
