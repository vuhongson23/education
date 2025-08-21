import classNames from "classnames/bind";

import styles from "./CategoryManager.module.scss";
import Upload from "~/components/image-upload";
import MultiInput from "~/components/multi-input";
import { ACTION_FORM, CATEGORY_STATUS } from "~/constant/constant";
import Button from "~/components/button";

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
      <Upload name="image" />
      <MultiInput
        type="text"
        name="title"
        placeholder="Enter category name..."
        label="Name"
        required
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
      <Button type="submit" variant="primary" className={cx("submit-btn")}>
        Save
      </Button>
    </>
  );
};

export default CategoryForm;
