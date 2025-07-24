import { Formik, type FormikProps } from "formik";
import classNames from "classnames/bind";
import { useState } from "react";
import * as Yup from "yup";

import styles from "./RegisterPage.module.scss";
import { CloseEyeIcon, OpenEyeIcon } from "~/assets/icons";
import Button from "~/components/button";
import Input from "~/components/input";
import { postDataAPI } from "~/utils/api";
import { URL_REGISTER_ACCOUNT } from "~/api/end-point";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { routes } from "~/constant/routes";

interface FormValuesRegister {
  userName: string;
  email: string;
  password: string;
}

const cx = classNames.bind(styles);

const signupSchema = Yup.object().shape({
  userName: Yup.string()
    .min(2, "User name tối thiểu 10 kí tự")
    .max(50, "User name tối đa chứa 50 kí tự")
    .required("Không được bỏ trống"),
  email: Yup.string()
    .email("Email không hợp lệ")
    .required("Không được bỏ trống"),
  password: Yup.string()
    .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^A-Za-z0-9]).{8,}$/, {
      message:
        "Mật khẩu phải có ít nhất 1 kí tự in hoa, 1 kí tự in thường, 1 số và 1 kí tự đặc biệt",
    })
    .min(8, "Mật khẩu phải có tối thiểu 8 kí tự")
    .required("Không được bỏ trống"),
});

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (value: FormValuesRegister) => {
    const payload = {
      userName: value.userName,
      email: value.email,
      password: value.password,
    };
    try {
      const response = await postDataAPI(URL_REGISTER_ACCOUNT, payload);
      console.log("🚀 ~ handleRegister ~ response:", response);
      if (response?.status === 201) {
        localStorage.setItem("accessToken", response?.data?.token?.accessToken);
        localStorage.setItem(
          "refreshToken",
          response?.data?.token?.refreshToken
        );
        localStorage.setItem("user_infor", JSON.stringify(response?.data));

        toast.success("Đăng kí tài khoản thành công");
        navigate(routes.home);
      }
    } catch (error) {
      toast.error("Đăng kí tài khoản không thành công");
      return error;
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Formik
      initialValues={{
        userName: "",
        email: "",
        password: "",
      }}
      validationSchema={signupSchema}
      onSubmit={handleRegister}
    >
      {(formik: FormikProps<FormValuesRegister>) => (
        <form onSubmit={formik.handleSubmit}>
          <div className={cx("wrapper")}>
            <Input
              type="text"
              name="userName"
              label="User name"
              placeholder="Please enter your username..."
            />
            <Input
              type="text"
              name="email"
              label="Email"
              placeholder="Please enter your email address..."
            />
            <Input
              type={showPassword ? "text" : "password"}
              name="password"
              label="Password"
              onClick={handleShowPassword}
              placeholder="Please enter your password..."
              rightIcon={showPassword ? <OpenEyeIcon /> : <CloseEyeIcon />}
            />
            <div
              className={cx("login_btn")}
              onClick={() => navigate(routes.login)}
            >
              Bạn đã có tài khoản?
            </div>
            <Button type="submit" variant="primary">
              Register
            </Button>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default RegisterPage;
