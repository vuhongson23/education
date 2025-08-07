import classNames from "classnames/bind";

import styles from "./Modal.module.scss";
import { Formik, type FormikProps } from "formik";
import { CloseIcon } from "~/assets/icons";
import Button from "~/components/button";
import { useEffect, useRef } from "react";
import { ACTION_FORM } from "~/constant/constant";

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
  action?: string;
  onShowModal?: (v: boolean) => void;
  onSubmit?: (v: FormValues) => void;
  onSetValue?: (v: FormValues) => void;
}

const cx = classNames.bind(styles);

const Modal = ({
  children,
  initialValues = {},
  isShowCloseButton = false,
  validationSchema,
  className,
  action,
  onSubmit = () => {},
  onShowModal = () => {},
  onSetValue = () => {},
}: ModalProps) => {
  const divRef = useRef<HTMLDivElement>(null);
  let isShowSaveBtn: boolean = false;

  if (action === ACTION_FORM.CREATE || action === ACTION_FORM.UPDATE) {
    isShowSaveBtn = true;
  } else {
    isShowSaveBtn = false;
  }

  const handleCloseModal = () => {
    onShowModal(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (divRef.current && !divRef.current.contains(e.target as Node)) {
        handleCloseModal();
        onSetValue({});
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
      enableReinitialize
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
            {isShowSaveBtn && (
              <div className={cx("footer")}>
                <Button
                  type="submit"
                  variant="primary"
                  className={cx("save-btn")}
                >
                  Save
                </Button>
              </div>
            )}
          </div>
        </form>
      )}
    </Formik>
  );
};

export default Modal;
