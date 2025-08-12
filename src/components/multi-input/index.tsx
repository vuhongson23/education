import React from "react";
import classNames from "classnames/bind";

import styles from "./MultiInput.module.scss";
import type { ChangeEvent, JSX } from "react";
import { useField, useFormikContext } from "formik";

type InputType =
  | "text"
  | "password"
  | "email"
  | "number"
  | "checkbox"
  | "radio"
  | "select"
  | "textarea";

type Options = {
  value: number | string;
  label: string;
};

interface BaseInputProps {
  type: InputType;
  name: string;
  label?: string;
  required?: boolean;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
}

interface TextInputProps extends BaseInputProps {
  type: "text" | "password" | "email";
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

interface NumberInputProps extends BaseInputProps {
  type: "number";
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  min?: number;
  max?: number;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

interface CheckboxInputProps extends BaseInputProps {
  type: "checkbox";
  value: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

interface RadioInputProps extends BaseInputProps {
  type: "radio";
  value?: number | string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  options: Options[];
}

interface SelectInputProps extends BaseInputProps {
  type: "select";
  value?: string;
  options: Options[];
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
}

interface TextAreaInputProps extends BaseInputProps {
  type: "textarea";
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  row?: number;
}

type UniversalInputProps =
  | TextInputProps
  | NumberInputProps
  | RadioInputProps
  | SelectInputProps
  | TextAreaInputProps
  | CheckboxInputProps;

const cx = classNames.bind(styles);

const MultiInput: React.FC<UniversalInputProps> = (props) => {
  const { type, name, label, required = false, className = "" } = props;

  // Kiểm tra xem Input có trong Formik context hay không
  const formikContext = useFormikContext();
  const isInFormikContext = Boolean(formikContext);

  const renderInputs = (): JSX.Element => {
    switch (type) {
      case "text":
      case "email":
      case "password": {
        const { value, onChange, placeholder, leftIcon, rightIcon, disabled } =
          props as TextInputProps;
        if (isInFormikContext) {
          const [field, _] = useField(name);
          return (
            <div
              className={cx("wrapper-text", {
                [className || ""]: !!className,
              })}
            >
              {leftIcon && <span className={cx("left-icon")}>{leftIcon}</span>}
              <input
                {...field}
                id={name}
                type={type}
                placeholder={placeholder}
                className={cx("text-input-type")}
                required={required}
                disabled={disabled}
              />
              {rightIcon && (
                <span className={cx("right-icon")}>{rightIcon}</span>
              )}
            </div>
          );
        } else {
          return (
            <div
              className={cx("wrapper-text", {
                [className || ""]: !!className,
              })}
            >
              {leftIcon && <span className={cx("left-icon")}>{leftIcon}</span>}
              <input
                type={type}
                name={name}
                value={value || ""}
                onChange={onChange}
                placeholder={placeholder}
                className={cx("text-input-type")}
                required={required}
                disabled={disabled}
              />
              {rightIcon && (
                <span className={cx("right-icon")}>{rightIcon}</span>
              )}
            </div>
          );
        }
      }

      case "number": {
        const { value, onChange, placeholder, min, max, rightIcon, leftIcon } =
          props as NumberInputProps;
        return (
          <div className={cx("wrapper-number")}>
            {leftIcon && <span className={cx("left-icon")}>{leftIcon}</span>}
            <input
              type={type}
              value={value}
              name={name}
              min={min}
              max={max}
              placeholder={placeholder}
              className={cx("number-input-type", {
                [className || ""]: !!className,
              })}
              onChange={onChange}
              required={required}
            />
            {rightIcon && <span className={cx("right-icon")}>{rightIcon}</span>}
          </div>
        );
      }

      case "checkbox": {
        const { value, onChange } = props as CheckboxInputProps;
        return (
          <div className={cx("wrapper-checkbox")}>
            <label className={cx("custom-checkbox")}>
              <input
                id={name}
                type={type}
                name={name}
                checked={value}
                onChange={onChange}
                required={required}
              />
              <div
                className={cx("checkbox-input-type", {
                  [className || ""]: !!className,
                })}
              />
              <span>{label}</span>
            </label>
          </div>
        );
      }

      case "radio": {
        const { value, onChange, options, disabled } = props as RadioInputProps;
        if (isInFormikContext) {
          const [field, _, helpers] = useField(name);
          return (
            <div
              className={cx("radio-list", {
                [className || ""]: !!className,
              })}
            >
              {options?.map((option) => {
                const radioId = `${name}_${option.value}`;
                return (
                  <div key={option.value} className={cx("radio-item")}>
                    <input
                      id={radioId}
                      type={type}
                      name={name}
                      value={option.value}
                      checked={Number(field.value) === option.value}
                      onChange={(e) => {
                        helpers.setValue(Number(e.target.value));
                      }}
                      className={cx("radio-input-type")}
                      required={required}
                      disabled={disabled}
                    />
                    <label htmlFor={radioId}>{option.label}</label>
                  </div>
                );
              })}
            </div>
          );
        } else {
          return (
            <div
              className={cx("radio-list", {
                [className || ""]: !!className,
              })}
            >
              {options?.map((option) => (
                <div key={option.value} className={cx("radio-item")}>
                  <input
                    id={"option.value"}
                    type={type}
                    value={option.value}
                    checked={value === option.value}
                    onChange={onChange}
                    className={cx("radio-input-type")}
                    required={required}
                    disabled={disabled}
                  />
                  <label htmlFor={"option.value"}>{option.label}</label>
                </div>
              ))}
            </div>
          );
        }
      }

      case "select": {
        const { value, onChange, options } = props as SelectInputProps;

        if (isInFormikContext) {
          const [field, _] = useField(name);
          return (
            <select
              {...field}
              name={name}
              required={required}
              className={cx("select-input-type", {
                [className || ""]: !!className,
              })}
            >
              <option className={cx("title")} value="">
                ----------{label}----------
              </option>
              {options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          );
        } else {
          return (
            <select
              name={name}
              value={value}
              onChange={onChange}
              required={required}
              className={cx("select-input-type", {
                [className || ""]: !!className,
              })}
            >
              <option className={cx("title")} value="">
                ----------{label}----------
              </option>
              {options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          );
        }
      }

      case "textarea": {
        const { value, onChange, row, placeholder } =
          props as TextAreaInputProps;
        return (
          <textarea
            name={name}
            value={value}
            rows={row}
            placeholder={placeholder}
            className={cx("textarea-input-type", {
              [className || ""]: !!className,
            })}
            onChange={onChange}
            required={required}
          />
        );
      }
      default:
        return <div>Dạng input không hỗ trợ</div>;
    }
  };
  return (
    <div className={cx("wrapper")}>
      {label && type !== "checkbox" && (
        <label htmlFor={name}>
          {label} {required && <span className={cx("required")}>*</span>}
        </label>
      )}
      {renderInputs()}
    </div>
  );
};

export default MultiInput;
