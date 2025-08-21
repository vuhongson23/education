import classNames from "classnames/bind";

import styles from "./CategoryManager.module.scss";
import Upload from "~/components/image-upload";
import MultiInput from "~/components/multi-input";
import { ACTION_FORM, CATEGORY_STATUS } from "~/constant/constant";

interface CategoryFormProps {
  titleForm?: string;
  action?: string;
}

const cx = classNames.bind(styles);

const statusCategory = [
  {
    label: "Active",
    value: CATEGORY_STATUS.ACTIVE,
  },
  {
    label: "Delete",
    value: CATEGORY_STATUS.DELETE,
  },
];

const CategoryForm = ({ titleForm, action }: CategoryFormProps) => {
  return (
    <>
      <h2>{titleForm}</h2>
      <Upload name="image"></Upload>
      <MultiInput
        type="text"
        name="name"
        placeholder="Enter your name..."
        label="Name"
      />
      <MultiInput
        type="radio"
        name="status"
        label="Status"
        options={statusCategory}
        className={cx("radio-form")}
        disabled={action === ACTION_FORM.VIEW ? true : false}
        required
      />
    </>
  );
};

export default CategoryForm;
