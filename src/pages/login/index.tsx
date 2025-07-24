import { Formik, type FormikProps } from "formik";
import { useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import * as Yup from "yup";

import styles from "./LoginPage.module.scss";
import { OpenEyeIcon } from "~/assets/icons";
import Button from "~/components/button";
import Input from "~/components/input";
import { routes } from "~/constant/routes";
import { toast } from "react-toastify";
import { postDataAPI } from "~/utils/api";
import { URL_LOGIN } from "~/api/end-point";

interface FormValuesLogin {
  email: string;
  password: string;
}

const cx = classNames.bind(styles);

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Vui lòng nhập đúng định dạng email")
    .required("Không được bỏ trống"),
  password: Yup.string()
    .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^A-Za-z0-9]).{8,}$/, {
      message:
        "Mật khẩu phải có ít nhất 1 kí tự in hoa, 1 kí tự in thường, 1 số và 1 kí tự đặc biệt",
    })
    .required("Không được bỏ trống"),
});

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = async (values: FormValuesLogin) => {
    const payload = {
      email: values.email,
      password: values.password,
    };
    try {
      const response = await postDataAPI(URL_LOGIN, payload);
      console.log("🚀 ~ handleLogin ~ response:", response);
      if (response?.data?.code === 200) {
        localStorage.setItem("accessToken", response?.data?.token?.accessToken);
        localStorage.setItem(
          "refreshToken",
          response?.data?.token?.refreshToken
        );
        localStorage.setItem("user_infor", JSON.stringify(response?.data));

        toast.success(`Xin chào ${response?.data?.userName}`);
        navigate(routes.home);
      }
    } catch (error) {
      toast.error("Đăng nhập thất bại");
    }
  };
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={loginSchema}
      onSubmit={handleLogin}
    >
      {(formik: FormikProps<FormValuesLogin>) => (
        <form onSubmit={formik.handleSubmit}>
          <div className={cx("wrapper")}>
            <Input
              type="text"
              name="email"
              label="Email"
              placeholder="Please enter your email address"
            />
            <Input
              type="password"
              name="password"
              label="Password"
              placeholder="Please enter your password"
              rightIcon={<OpenEyeIcon />}
            />
            <div
              className={cx("register-btn")}
              onClick={() => navigate(routes.register)}
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

export default LoginPage;
