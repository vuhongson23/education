import React, { useRef } from "react";
import ReactQuill from "react-quill";
import { useField, useFormikContext } from "formik";
import classNames from "classnames/bind";
import styles from "./CustomTextEditor.module.scss";

const cx = classNames.bind(styles);

interface CustomQuillEditorProps {
  name: string;
  label?: string;
  className?: string;
  required?: boolean;
  placeholder?: string;
}

const CustomQuillEditor: React.FC<CustomQuillEditorProps> = ({
  name,
  label,
  className,
  required = false,
  placeholder = "",
  ...props
}) => {
  const [field, meta] = useField(name);
  const { setFieldValue, setFieldTouched } = useFormikContext();
  const quillRef = useRef<ReactQuill>(null);

  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      ["code-block"],
      ["link", "image", "formula"],
      [{ header: 1 }, { header: 2 }],
      [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ size: ["small", false, "large", "huge"] }],
      [{ color: [] }],
      [{ font: [] }],
      [{ align: [] }],
    ],
  };

  const handleChange = (content: string) => {
    setFieldValue(name, content);
  };

  const handleBlur = () => {
    setFieldTouched(name, true);
  };

  return (
    <div
      className={cx("quill-wrapper", {
        [className || ""]: !!className,
      })}
    >
      {label && (
        <label htmlFor={name} className={cx("label")}>
          {label} {required && <span className={cx("required")}>*</span>}
        </label>
      )}

      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={field.value || ""}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        modules={modules}
        className={cx("editor", {
          error: meta.touched && meta.error,
        })}
        {...props}
      />

      {meta.touched && meta.error && (
        <div className={cx("error-message")}>{meta.error}</div>
      )}
    </div>
  );
};

export default CustomQuillEditor;
