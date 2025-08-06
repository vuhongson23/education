import classNames from "classnames/bind";

import styles from "./Modal.module.scss";
import { Formik, type FormikProps } from "formik";
import { CloseIcon } from "~/assets/icons";
import Button from "~/components/button";
import { useEffect, useRef } from "react";

type FormValues = {
  [key: string]: any;
};

interface ModalProps {
  children?: React.ReactNode;
  initialValues?: FormValues;
  isShow?: boolean;
  isShowCloseButton?: boolean;
  validationSchema?: any;
  className?: string;
  onShowModal?: (v: boolean) => void;
  onSubmit: (v: FormValues) => void;
}

const cx = classNames.bind(styles);

const Modal = ({
  children,
  initialValues = {},
  isShowCloseButton = false,
  validationSchema,
  className,
  onSubmit = () => {},
  onShowModal = () => {},
}: ModalProps) => {
  const divRef = useRef<HTMLDivElement>(null);

  const handleCloseModal = () => {
    onShowModal(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (divRef.current && !divRef.current.contains(e.target as Node)) {
        handleCloseModal();
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.body.style.overflow = "unset";
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik: FormikProps<FormValues>) => (
        <form
          onSubmit={formik.handleSubmit}
          className={cx("modal", {
            [className || ""]: !!className,
          })}
        >
          <div className={cx("wrapper")} ref={divRef}>
            {isShowCloseButton && (
              <div className={cx("header")}>
                <span onClick={handleCloseModal} style={{ cursor: "pointer" }}>
                  <CloseIcon size={27} />
                </span>
              </div>
            )}
            <div className={cx("form")}>{children}</div>
            <div className={cx("footer")}>
              <Button
                type="submit"
                variant="primary"
                className={cx("save-btn")}
              >
                Save
              </Button>
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default Modal;
