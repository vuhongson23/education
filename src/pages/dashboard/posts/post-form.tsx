import classNames from "classnames/bind";

import CustomTextEditor from "~/components/custom-text-editor";
import MultiInput from "~/components/multi-input";
import { ACTION_FORM, POST_STATUS } from "~/constant/constant";
import styles from "./PostManager.module.scss";
import FormRow from "~/components/form-row";
import Upload from "~/components/image-upload";
import Button from "~/components/button";

interface PostFormProps {
  titleForm: string;
  action?: string;
}

const cx = classNames.bind(styles);

const categoryList = [
  {
    label: "Khoa học",
    value: 1,
  },
  {
    label: "Công nghệ",
    value: 2,
  },
  {
    label: "Đời sống",
    value: 3,
  },
];

const postStatus = [
  {
    label: "Published",
    value: POST_STATUS.PUBLISHED,
  },
  {
    label: "Pending",
    value: POST_STATUS.PENDING,
  },
  {
    label: "Draft",
    value: POST_STATUS.DRAFT,
  },
  {
    label: "Rejected",
    value: POST_STATUS.REJECTED,
  },
];

const PostForm = ({ titleForm, action }: PostFormProps) => {
  return (
    <>
      <h2>{titleForm}</h2>
      <Upload name="thumbnail" className={cx("thumbnail-upload")} />
      <FormRow className={cx("form-row")}>
        <MultiInput
          type="text"
          name="title"
          label="Title"
          className={cx("input-form")}
          placeholder="Enter title of post..."
          required
        />
        <MultiInput
          type="text"
          name="slug"
          label="Slug"
          className={cx("input-form")}
          placeholder="Enter slug of post..."
        />
      </FormRow>
      <FormRow className={cx("form-row")}>
        <MultiInput
          type="text"
          name="author"
          label="Author"
          className={cx("input-form")}
          placeholder="Enter author of post..."
          required
        />
        <MultiInput
          type="select"
          name="categoryId"
          label="Category"
          options={categoryList}
          className={cx("select-form")}
          required
        />
      </FormRow>
      <MultiInput
        type="radio"
        name="status"
        label="Status"
        options={postStatus}
        className={cx("radio-form")}
        disabled={action === ACTION_FORM.VIEW ? true : false}
        required
      />
      <CustomTextEditor
        name="content"
        label="Content"
        className={cx("editor")}
        required
        placeholder="Write your post content here..."
      />
      <Button type="submit" variant="primary" className={cx("add-btn")}>
        Add
      </Button>
    </>
  );
};

export default PostForm;
