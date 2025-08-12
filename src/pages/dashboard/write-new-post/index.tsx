import classNames from "classnames/bind";

import styles from "./WriteNewPost.module.scss";
import { Formik, type FormikProps } from "formik";
import MultiInput from "~/components/multi-input";
import Button from "~/components/button";
import FormRow from "~/components/form-row";
import { POST_STATUS } from "~/constant/constant";
import Upload from "~/components/image-upload";

interface FormValuesPost {
  title: string;
  slug: string;
  thumbnail: string;
  author: string;
  category: number;
  status: number;
}

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

const cx = classNames.bind(styles);

const WriteNewPost = () => {
  const handleAddNewPost = (values: FormValuesPost) => {
    console.log("🚀 ~ handleAddNewPost ~ values:", values);
  };

  return (
    <Formik
      initialValues={{
        title: "",
        slug: "",
        thumbnail: "",
        author: "",
        category: 0,
        status: POST_STATUS.PENDING,
      }}
      onSubmit={handleAddNewPost}
    >
      {(formik: FormikProps<FormValuesPost>) => (
        <div className={cx("wrapper")}>
          <h1 className={cx("title")}>Write new post</h1>
          <div className={cx("post-form")}>
            <form onSubmit={formik.handleSubmit}>
              <Upload name="thumbnail" className={cx("thumbnail-upload")} />
              <FormRow className={cx("form-row")}>
                <MultiInput
                  type="text"
                  name="title"
                  label="Title"
                  className={cx("input-form")}
                  required
                />
                <MultiInput
                  type="text"
                  name="slug"
                  label="Slug"
                  className={cx("input-form")}
                  required
                />
              </FormRow>
              <FormRow className={cx("form-row")}>
                <MultiInput
                  type="text"
                  name="author"
                  label="Author"
                  className={cx("input-form")}
                  required
                />
                <MultiInput
                  type="select"
                  name="category"
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
                required
              />
              <Button type="submit" variant="primary">
                Add
              </Button>
            </form>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default WriteNewPost;
